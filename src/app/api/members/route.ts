import { consumeLimiter } from "@/lib/server/rateLimiter";
import { NextRequest, NextResponse } from "next/server";

import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 4, // 5 requests
  duration: 6, // per 6 seconds by IP
});

export async function GET(req: NextRequest) {
  // RATE LIMITER
  const limitResult = await consumeLimiter(rateLimiter, req);
  if (limitResult) return limitResult;

  // retrieving requested member
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email)
    return NextResponse.json({ error: "Email required" }, { status: 400 });

  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID; // store in .env.local
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    // Google Sheets returns JSONP, not pure JSON — so we need to clean it:
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    // Extract data into array of objects

   const users = rows.map((r: { c: { v: string }[] }) => ({
  gdgId: r.c[0]?.v?.trim() || "",
  email: r.c[1]?.v?.trim() || "",
  program: r.c[2]?.v?.trim() || "",
  department: r.c[3]?.v?.trim() || "",
  displayName: r.c[4]?.v?.trim() || "",
  firstName: r.c[5]?.v?.trim() || "",
  lastName: r.c[6]?.v?.trim() || "",
  middleName: r.c[7]?.v?.trim() || "",
}));

    // const users = rows.map((r: { c: {  v: string }[] }) => ({
    //   displayName: r.c[0]?.v || "",
    //   gdgId: r.c[1]?.v || "",
    //   name: r.c[2]?.v || "",
    //   email: r.c[3]?.v || "",
    //   course: r.c[4]?.v || "",
    // }));

    const user = users.find(
      (u: { email: string }) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch sheet" },
      { status: 500 }
    );
  }
}
