import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase configuration
// These must be prefixed with VITE_ to be accessible in the client
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ypxynublvmtuuqpahqve.supabase.co";
const SUPABASE_PUBLIC_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweHludWJsdm10dXVxcGFocXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjk3MzAsImV4cCI6MjA4OTg0NTczMH0.25FBDOM8UMZ10NPzeN6B9ShMFg7ex543giyCQqmSAkE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
