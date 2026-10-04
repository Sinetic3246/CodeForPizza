import { createClient } from '@supabase/supabase-js';

// Note: the current build authenticates against a local demo store
// (localStorage) rather than Supabase, so this client isn't wired into
// App.jsx yet. It's kept here, ready to swap in once you connect a
// real Supabase project — add VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY to a .env file rather than hardcoding them.
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://yjeyizckrukrchtbkgqt.supabase.co/rest/v1/';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZXlpemNrcnVrcmNodGJrZ3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMDQ1NTYsImV4cCI6MjEwNjU4MDU1Nn0.eRz9JH_MN5SCN7cJE0fEItvEzRFkJn9kD2NT96JCsFI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
