
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: "admin" | "shift-worker" | "company" | "agency" | "aiagent"
          name: string
          category?: string
          profile_complete: boolean
          agency_name?: string
          address?: string
          phone_number?: string
          specialization?: string
          staffing_capacity?: number
          theme_preference: "light" | "dark"
          last_login?: Date
          current_currency: string
          preferred_currency: string
          created_at: Date
          updated_at: Date
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      // Add other tables as needed
    }
  }
}
