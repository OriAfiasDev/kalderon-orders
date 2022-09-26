import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jdltypannffhvympueau.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkbHR5cGFubmZmaHZ5bXB1ZWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM1NzQzNTIsImV4cCI6MTk3OTE1MDM1Mn0.T2vjLupYrRsS9gGU4EjrBi-DOjcVMMayLcGRRf9JwWs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)