
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://emtebosiacxihwrfcylr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtdGVib3NpYWN4aWh3cmZjeWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzQwNDAsImV4cCI6MjA1NTQ1MDA0MH0.i1oNvzxBJcZWfM14Ye-q5nwiLOtSHoVCCfDjcOjk4Ck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
