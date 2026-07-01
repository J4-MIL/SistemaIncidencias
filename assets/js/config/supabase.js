import {
 createClient 
}
 from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const SUPABASE_URL = 'https://hahngneuasuxmvfymiyp.supabase.co';

export const SUPABASE_KEY = 'sb_publishable_x62pIOb3lu3rSuwohoWq1Q_axrHdChg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

