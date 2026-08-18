import { createClient } from '@supabase/supabase-js'

// Vite exposes anything prefixed with VITE_ from your .env file through
// import.meta.env. This is how the app reads your Supabase URL and key
// without hardcoding them into the source code.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Did you create a .env file from .env.example?',
  )
}

// Every component that needs to talk to Supabase imports this same
// client, so there's only ever one connection configuration in the app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
