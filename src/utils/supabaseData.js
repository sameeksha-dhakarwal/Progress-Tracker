import { supabase } from "../supabase";

const CURRENT_YEAR = new Date().getFullYear();

/* ---------- LOAD USER YEAR DATA ---------- */
export async function loadUserYearData(userId) {
  const { data, error } = await supabase
    .from("daily_logs")
    .select("data")
    .eq("user_id", userId)
    .eq("year", CURRENT_YEAR)
    .maybeSingle(); // ✅ safer than .single()

  if (error) {
    console.error("LOAD YEAR DATA ERROR:", error);
    return {};
  }

  return data?.data || {};
}

/* ---------- SAVE USER YEAR DATA ---------- */
export async function saveUserYearData(userId, yearData) {
  const { error } = await supabase
    .from("daily_logs")
    .upsert(
      {
        user_id: userId,
        year: CURRENT_YEAR,
        data: yearData,
        updated_at: new Date().toISOString(), // ✅ important
      },
      {
        onConflict: "user_id,year", // ✅ CRITICAL
      }
    );

  if (error) {
    console.error("SAVE YEAR DATA ERROR:", error);
  }
}
