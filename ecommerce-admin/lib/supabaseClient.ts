// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Remplace ces valeurs par les informations de ton projet Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! ;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
