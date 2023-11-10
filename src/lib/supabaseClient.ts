import {createClient} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_LINK;
const supabaseSecret = import.meta.env.VITE_SUPABASE_SECRET;
const supabaseAdminSecret = import.meta.env.VITE_SERVICE_ROLE_KEY;
export const supabaseClient = createClient(
    supabaseUrl,
    supabaseSecret
);

export const adminSupabseCLient = createClient(
    supabaseUrl,
    supabaseAdminSecret
)