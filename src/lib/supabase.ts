
import { createClient } from '@supabase/supabase-js';

// Make sure URL starts with https:// protocol
const supabaseUrl = 'https://xndvrjgheguqysltlheg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZHZyamdoZWd1cXlzbHRsaGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2OTg2MDgsImV4cCI6MjA1ODI3NDYwOH0.opkQn5J3rSf1n5FO0Ds4pY5Lur8nrgsaGQwnHvjaLaM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
});
