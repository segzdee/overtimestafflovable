export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login: string | null
          name: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login?: string | null
          name: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login?: string | null
          name?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      affiliations: {
        Row: {
          affiliated_tenant_id: string | null
          contract_details: Json | null
          created_at: string | null
          end_date: string | null
          id: string
          primary_tenant_id: string | null
          relationship_type: string
          start_date: string
          status: Database["public"]["Enums"]["tenant_status"] | null
          updated_at: string | null
        }
        Insert: {
          affiliated_tenant_id?: string | null
          contract_details?: Json | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          primary_tenant_id?: string | null
          relationship_type: string
          start_date: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          updated_at?: string | null
        }
        Update: {
          affiliated_tenant_id?: string | null
          contract_details?: Json | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          primary_tenant_id?: string | null
          relationship_type?: string
          start_date?: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliations_affiliated_tenant_id_fkey"
            columns: ["affiliated_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "affiliations_primary_tenant_id_fkey"
            columns: ["primary_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agencies: {
        Row: {
          commission_rate: number | null
          created_at: string | null
          id: string
          license_number: string | null
          metadata: Json | null
          service_areas: string[] | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          metadata?: Json | null
          service_areas?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          metadata?: Json | null
          service_areas?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_profiles: {
        Row: {
          billing_address: Json | null
          business_number: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          license_number: string | null
          service_areas: string[] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          billing_address?: Json | null
          business_number?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          service_areas?: string[] | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json | null
          business_number?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          service_areas?: string[] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tokens: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          permissions: Json | null
          tenant_id: string | null
          token: string
          updated_at: string | null
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          permissions?: Json | null
          tenant_id?: string | null
          token: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          permissions?: Json | null
          tenant_id?: string | null
          token?: string
          updated_at?: string | null
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_tokens_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          business_number: string | null
          created_at: string | null
          id: string
          industry: string | null
          metadata: Json | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          business_number?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          metadata?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          business_number?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          metadata?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          billing_address: Json | null
          business_number: string | null
          company_size: string | null
          created_at: string | null
          id: string
          industry: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          billing_address?: Json | null
          business_number?: string | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json | null
          business_number?: string | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          due_date: string | null
          from_user_id: string | null
          id: string
          items: Json | null
          payment_id: string | null
          status: string | null
          tenant_id: string
          to_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          from_user_id?: string | null
          id?: string
          items?: Json | null
          payment_id?: string | null
          status?: string | null
          tenant_id: string
          to_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          from_user_id?: string | null
          id?: string
          items?: Json | null
          payment_id?: string | null
          status?: string | null
          tenant_id?: string
          to_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "shift_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string
          email: boolean | null
          id: number
          push: boolean | null
          sms: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: boolean | null
          id?: number
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: boolean | null
          id?: number
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          profile_complete: boolean | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          profile_complete?: boolean | null
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          profile_complete?: boolean | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      shift_applications: {
        Row: {
          agency_id: string | null
          applicant_id: string | null
          cover_note: string | null
          created_at: string | null
          id: string
          shift_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agency_id?: string | null
          applicant_id?: string | null
          cover_note?: string | null
          created_at?: string | null
          id?: string
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agency_id?: string | null
          applicant_id?: string | null
          cover_note?: string | null
          created_at?: string | null
          id?: string
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_applications_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_applications_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_assignments: {
        Row: {
          agency_id: string | null
          created_at: string | null
          hourly_rate: number | null
          id: string
          metadata: Json | null
          shift_id: string | null
          status: string | null
          updated_at: string | null
          worker_id: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          metadata?: Json | null
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          metadata?: Json | null
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_assignments_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_assignments_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_assignments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          from_tenant_id: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          shift_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          to_tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          from_tenant_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          to_tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          from_tenant_id?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          to_tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_payments_from_tenant_id_fkey"
            columns: ["from_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_payments_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_payments_to_tenant_id_fkey"
            columns: ["to_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_reviews: {
        Row: {
          created_at: string | null
          id: string
          rating: number | null
          review_text: string | null
          reviewer_id: string | null
          shift_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          shift_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number | null
          review_text?: string | null
          reviewer_id?: string | null
          shift_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_reviews_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_worker_profiles: {
        Row: {
          availability: Json | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          preferred_locations: string[] | null
          skills: string[] | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          preferred_locations?: string[] | null
          skills?: string[] | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          preferred_locations?: string[] | null
          skills?: string[] | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_worker_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_workers: {
        Row: {
          availability: Json | null
          certifications: Json | null
          completed_shifts: number | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          preferred_locations: string[] | null
          rating: number | null
          skills: string[] | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          certifications?: Json | null
          completed_shifts?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          preferred_locations?: string[] | null
          rating?: number | null
          skills?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          certifications?: Json | null
          completed_shifts?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          preferred_locations?: string[] | null
          rating?: number | null
          skills?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_workers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          filled_count: number | null
          hourly_rate: number
          id: string
          location: string
          metadata: Json | null
          required_skills: string[] | null
          staff_needed: number | null
          start_time: string
          status: Database["public"]["Enums"]["shift_status"] | null
          tenant_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          filled_count?: number | null
          hourly_rate: number
          id?: string
          location: string
          metadata?: Json | null
          required_skills?: string[] | null
          staff_needed?: number | null
          start_time: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          tenant_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          filled_count?: number | null
          hourly_rate?: number
          id?: string
          location?: string
          metadata?: Json | null
          required_skills?: string[] | null
          staff_needed?: number | null
          start_time?: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          tenant_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          email: string
          id: string
          metadata: Json | null
          name: string
          status: Database["public"]["Enums"]["tenant_status"] | null
          subscription_ends_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          type: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          metadata?: Json | null
          name: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subscription_ends_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          type: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          name?: string
          status?: Database["public"]["Enums"]["tenant_status"] | null
          subscription_ends_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          type?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      time_entries: {
        Row: {
          break_minutes: number | null
          clock_in: string
          clock_out: string | null
          created_at: string | null
          id: string
          notes: string | null
          shift_id: string | null
          status: string | null
          updated_at: string | null
          worker_id: string | null
        }
        Insert: {
          break_minutes?: number | null
          clock_in: string
          clock_out?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Update: {
          break_minutes?: number | null
          clock_in?: string
          clock_out?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          shift_id?: string | null
          status?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_certifications: {
        Row: {
          certification_number: string | null
          created_at: string | null
          document_url: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_body: string | null
          name: string
          status: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certification_number?: string | null
          created_at?: string | null
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          name: string
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certification_number?: string | null
          created_at?: string | null
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_body?: string | null
          name?: string
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role: {
        Args: {
          tenant_id: string
        }
        Returns: undefined
      }
      get_current_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      shift_status:
        | "draft"
        | "open"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
      subscription_tier: "free" | "basic" | "premium" | "enterprise"
      tenant_status: "active" | "inactive" | "suspended" | "pending"
      user_role: "admin" | "shift_worker" | "agency" | "company"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
