import { createClient } from '@supabase/supabase-js';

// Helper to safely get environment variables (works with Vite import.meta.env or standard process.env)
const getEnv = (key: string) => {
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    return import.meta.env[key] || import.meta.env[`VITE_${key}`];
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return '';
};

// Fallbacks from your provided configuration to ensure it works immediately
// (In a real production app, you would rely solely on env vars)
const FALLBACK_URL = "https://dlhmjdsztyvuvvdcdxoy.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsaG1qZHN6dHl2dXZ2ZGNkeG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Nzg1NjYsImV4cCI6MjA4NTE1NDU2Nn0.tNCrY16chNA3C_dL9Fsc33IDQu8lXvggIzPcPN1MmeM";

const supabaseUrl = getEnv('SUPABASE_URL') || getEnv('VITE_SUPABASE_URL') || FALLBACK_URL;
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY') || FALLBACK_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Key missing. Database features will not work correctly.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
