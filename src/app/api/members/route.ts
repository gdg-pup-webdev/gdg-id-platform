import { consumeLimiter } from "@/lib/server/rateLimiter";
import { supabase } from "@/lib/server/supabase";
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

  try {
    const { data, error: supabaseError } = await supabase.rpc("verify_member", {
      search_term: email.trim(),
    });

    if (supabaseError) {
      console.error(supabaseError);
      return NextResponse.json(
        { error: "Failed to verify member" },
        { status: 500 },
      );
    }

    // Handle potential array response from RPC
    const userData = Array.isArray(data) ? data[0] : data;

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = {
      gdgId: userData.gdg_id || "",
      email: userData.email || "",
      program: userData.program?.trim() || "",
      department: userData.department?.trim() || "",
      displayName: userData.display_name?.trim() || "",
      firstName: userData.first_name?.trim() || "",
      lastName: userData.last_name?.trim() || "",
      suffix: userData.suffix?.trim() || "",
    };

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
