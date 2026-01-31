import { supabase } from "../supabase";

export async function loadUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
