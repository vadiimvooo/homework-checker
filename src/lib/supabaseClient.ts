import {createClient} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_LINK;
const supabaseSecret = import.meta.env.VITE_SUPABASE_SECRET;
export const supabaseClient = createClient(
    supabaseUrl,
    supabaseSecret
);