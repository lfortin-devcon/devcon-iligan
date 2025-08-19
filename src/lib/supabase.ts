import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jkqpjzjqeqdcekvszlyf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcXBqempxZXFkY2VrdnN6bHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODczMzAsImV4cCI6MjA3MTE2MzMzMH0.8gvHhRvC-T0w_zvqQGSwYjHQfFh3yLCiQlmag6JFIKY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type VolunteerApplication = {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  event: string
  skills: string
  experience?: string
  motivation: string
  availability?: string
  created_at?: string
  updated_at?: string
}