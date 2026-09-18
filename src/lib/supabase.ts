import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * Browser Supabase client, or null when the env vars are missing so the
 * site still builds and renders without a backend configured.
 * The publishable key is safe to ship: row-level security (see
 * supabase/contact_messages.sql) only lets it insert contact messages.
 */
export const supabase = url && publishableKey ? createClient(url, publishableKey) : null;
