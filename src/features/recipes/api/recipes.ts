import supabase from "@/utils/supabase"

export async function getRecipes () {
  return supabase
    .from('recipe')
    .select()
}
