import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VUE_APP_HOSTED_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_HOSTED_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)