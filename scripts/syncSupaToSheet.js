import { createClient } from "@supabase/supabase-js";
import 'dotenv/config'; 

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SECRET_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);

 

  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;  
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  const res = await fetch(url);
    const text = await res.text();
 
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows; 
   const users = rows.map((r ) => {
    return {
  gdg_id: r.c[0]?.v?.trim() || "",
  email: r.c[1]?.v?.trim() || "",
  program: r.c[2]?.v?.trim() || "",
  department: r.c[3]?.v?.trim() || "",
  display_name: r.c[4]?.v?.trim() || "",
  first_name: r.c[5]?.v?.trim() || "",
  last_name: r.c[6]?.v?.trim() || "",
  // middleName: r.c[7]?.v?.trim() || "",
}
   });
  


  const BATCH_SIZE = 500;

console.log(`Starting sync for ${users.length} users...`);

for (let i = 0; i < users.length; i += BATCH_SIZE) {
  // Create a chunk of 500 users
  const batch = users.slice(i, i + BATCH_SIZE);
  
  console.log(`Processing batch: ${i} to ${Math.min(i + BATCH_SIZE, users.length)}`);

  const { data, error } = await supabase
    .from("gdg_members")
    .upsert(batch, { 
      onConflict: 'email', 
      ignoreDuplicates: true 
    });

  if (error) {
    console.error(`❌ Error in batch starting at ${i}:`, error.message);
    // Optional: break the loop if a major error occurs
    // break; 
  } else {
    console.log(`✅ Batch successful.`);
  }
}

console.log("Sync process finished.");