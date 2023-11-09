export interface IUser {
    id: string;
    app_metadata: {
        [x: string]: any;
        provider?: string | undefined;
    };
    user_metadata: import("@supabase/supabase-js").UserMetadata;
    aud: string;
    confirmation_sent_at?: string | undefined;
    recovery_sent_at?: string | undefined;
    email_change_sent_at?: string | undefined;
    new_email?: string | undefined;
    new_phone?: string | undefined;
    invited_at?: string | undefined;
    action_link?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    created_at: string;
    confirmed_at?: string | undefined;
    email_confirmed_at?: string | undefined;
    phone_confirmed_at?: string | undefined;
    last_sign_in_at?: string | undefined;
    role?: string | undefined;
    updated_at?: string | undefined;
    identities?: {
        id: string;
        user_id: string;
        identity_data?: {
            [key: string]: any;
        } | undefined;
        provider: string;
        created_at?: string | undefined;
        last_sign_in_at?: string | undefined;
        updated_at?: string | undefined;
    }[] | undefined;
    factors?: {
        id: string;
        friendly_name?: string | undefined;
        factor_type: string;
        status: "verified" | "unverified";
        created_at: string;
        updated_at: string;
    }[] | undefined;
}