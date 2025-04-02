import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = String(import.meta.env.VITE_SUPABASE_URL)
const supabaseKey = String(import.meta.env.VITE_SUPABASE_ANON_KEY)
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase