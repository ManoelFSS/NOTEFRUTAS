import { createClient } from '@supabase/supabase-js';

// Carrega variáveis de ambiente do arquivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        storage: localStorage,
        detectSessionInUrl: true
    },
});