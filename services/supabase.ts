import { createClient } from '@supabase/supabase-js';

// The environment variables are loaded from the .env file automatically by the build tool (e.g., Vite/React Scripts)
// Ensure your .env file has:
// SUPABASE_URL=...
// SUPABASE_ANON_KEY=...

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Key missing. Database features will not work correctly.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
