import { supabase } from "../supabase";

export async function loadActivities(userId) {
  const { data, error } = await supabase
    .from("activities")
    .select("id, name")
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addActivity(userId, name) {
  const { error } = await supabase
    .from("activities")
    .insert({ user_id: userId, name });

  if (error) console.error(error);
}

export async function deleteActivity(id) {
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id);

  if (error) console.error(error);
}
