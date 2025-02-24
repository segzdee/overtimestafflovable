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
      admin_activity_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          admin_id: string | null
          log_id: string
          performed_at: string
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          admin_id?: string | null
          log_id?: string
          performed_at?: string
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          admin_id?: string | null
          log_id?: string
          performed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["admin_id"]
          },
        ]
      }
      admin_users: {
        Row: {
          admin_id: string
          created_at: string
          email: string
          is_active: boolean | null
          last_login: string | null
          name: string
          password_hash: string
          role: string
          updated_at: string
        }
        Insert: {
          admin_id?: string
          created_at?: string
          email: string
          is_active?: boolean | null
          last_login?: string | null
          name: string
          password_hash: string
          role?: string
          updated_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          email?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string
          password_hash?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      agency_client_relationships: {
        Row: {
          agency_id: string | null
          client_id: string | null
          created_at: string
          id: string
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_client_relationships_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_client_relationships_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_commission_structures: {
        Row: {
          agency_id: string
          base_rate: number
          created_at: string | null
          id: string
          name: string
          special_conditions: Json | null
          updated_at: string | null
          volume_discounts: Json | null
        }
        Insert: {
          agency_id: string
          base_rate: number
          created_at?: string | null
          id?: string
          name: string
          special_conditions?: Json | null
          updated_at?: string | null
          volume_discounts?: Json | null
        }
        Update: {
          agency_id?: string
          base_rate?: number
          created_at?: string | null
          id?: string
          name?: string
          special_conditions?: Json | null
          updated_at?: string | null
          volume_discounts?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_commission_structures_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_worker_relationships: {
        Row: {
          agency_id: string | null
          created_at: string
          id: string
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
          worker_id: string | null
        }
        Insert: {
          agency_id?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
          worker_id?: string | null
        }
        Update: {
          agency_id?: string | null
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_worker_relationships_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_worker_relationships_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_audit_logs: {
        Row: {
          action: string
          agent_id: string
          details: string | null
          id: number
          ip_address: string | null
          status: string
          timestamp: string | null
        }
        Insert: {
          action: string
          agent_id: string
          details?: string | null
          id?: number
          ip_address?: string | null
          status: string
          timestamp?: string | null
        }
        Update: {
          action?: string
          agent_id?: string
          details?: string | null
          id?: number
          ip_address?: string | null
          status?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      ai_agent_permissions: {
        Row: {
          agent_id: string
          company_id: string
          created_at: string | null
          id: number
          is_active: boolean | null
          permissions: string[]
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          company_id: string
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          permissions: string[]
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          company_id?: string
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          permissions?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_agent_tokens: {
        Row: {
          agent_id: string
          created_at: string | null
          expires_at: string
          id: number
          is_revoked: boolean | null
          last_used: string | null
          token: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          expires_at: string
          id?: number
          is_revoked?: boolean | null
          last_used?: string | null
          token: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          expires_at?: string
          id?: number
          is_revoked?: boolean | null
          last_used?: string | null
          token?: string
        }
        Relationships: []
      }
      ai_agents: {
        Row: {
          activation_date: string | null
          created_at: string
          id: string
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          token: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activation_date?: string | null
          created_at?: string
          id?: string
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activation_date?: string | null
          created_at?: string
          id?: string
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          token?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_agents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clock_records: {
        Row: {
          clock_id: string
          clock_in_time: string | null
          clock_out_time: string | null
          created_at: string
          notes: string | null
          shift_id: string | null
          status: Database["public"]["Enums"]["clock_status"] | null
          updated_at: string
        }
        Insert: {
          clock_id?: string
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          notes?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["clock_status"] | null
          updated_at?: string
        }
        Update: {
          clock_id?: string
          clock_in_time?: string | null
          clock_out_time?: string | null
          created_at?: string
          notes?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["clock_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clock_records_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["shift_id"]
          },
        ]
      }
      companies: {
        Row: {}
        Insert: {}
        Update: {}
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      market_updates: {
        Row: {
          created_at: string
          currency: string
          currency_rate: number
          highlight: boolean | null
          id: string
          location: string
          original_rate: number
          rate: string
          region: string
          title: string
          type: string
          urgency_level: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          currency_rate?: number
          highlight?: boolean | null
          id?: string
          location: string
          original_rate?: number
          rate: string
          region?: string
          title: string
          type: string
          urgency_level?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          currency_rate?: number
          highlight?: boolean | null
          id?: string
          location?: string
          original_rate?: number
          rate?: string
          region?: string
          title?: string
          type?: string
          urgency_level?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email: boolean | null
          id: number
          push: boolean | null
          sms: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: boolean | null
          id?: number
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: boolean | null
          id?: number
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          payment_id: string
          payment_method: Json | null
          shift_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          transaction_date: string | null
          updated_at: string
          worker_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          payment_id?: string
          payment_method?: Json | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_date?: string | null
          updated_at?: string
          worker_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          payment_id?: string
          payment_method?: Json | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          transaction_date?: string | null
          updated_at?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["shift_id"]
          },
          {
            foreignKeyName: "payments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_documents: {
        Row: {
          document_path: string
          document_type: string
          id: string
          metadata: Json | null
          profile_id: string
          uploaded_at: string | null
          verification_date: string | null
          verified: boolean | null
        }
        Insert: {
          document_path: string
          document_type: string
          id?: string
          metadata?: Json | null
          profile_id: string
          uploaded_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Update: {
          document_path?: string
          document_type?: string
          id?: string
          metadata?: Json | null
          profile_id?: string
          uploaded_at?: string | null
          verification_date?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          agency_name: string | null
          category: string | null
          commission_rate: number | null
          created_at: string
          current_currency: string | null
          email: string
          email_verified: boolean | null
          id: string
          last_login: string | null
          location: Json | null
          name: string
          payment_info: Json | null
          phone_number: string | null
          preferred_currency: string | null
          profile_complete: boolean | null
          review_notes: string | null
          role: string
          specialization: string | null
          staffing_capacity: number | null
          status: Database["public"]["Enums"]["user_status"] | null
          theme_preference: string | null
          updated_at: string
          verification_completed_at: string | null
          verification_sent_at: string | null
          verification_status:
            | Database["public"]["Enums"]["profile_verification_status"]
            | null
        }
        Insert: {
          address?: string | null
          agency_name?: string | null
          category?: string | null
          commission_rate?: number | null
          created_at?: string
          current_currency?: string | null
          email: string
          email_verified?: boolean | null
          id: string
          last_login?: string | null
          location?: Json | null
          name: string
          payment_info?: Json | null
          phone_number?: string | null
          preferred_currency?: string | null
          profile_complete?: boolean | null
          review_notes?: string | null
          role: string
          specialization?: string | null
          staffing_capacity?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          theme_preference?: string | null
          updated_at?: string
          verification_completed_at?: string | null
          verification_sent_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["profile_verification_status"]
            | null
        }
        Update: {
          address?: string | null
          agency_name?: string | null
          category?: string | null
          commission_rate?: number | null
          created_at?: string
          current_currency?: string | null
          email?: string
          email_verified?: boolean | null
          id?: string
          last_login?: string | null
          location?: Json | null
          name?: string
          payment_info?: Json | null
          phone_number?: string | null
          preferred_currency?: string | null
          profile_complete?: boolean | null
          review_notes?: string | null
          role?: string
          specialization?: string | null
          staffing_capacity?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          theme_preference?: string | null
          updated_at?: string
          verification_completed_at?: string | null
          verification_sent_at?: string | null
          verification_status?:
            | Database["public"]["Enums"]["profile_verification_status"]
            | null
        }
        Relationships: []
      }
      role_aliases: {
        Row: {
          alias: string
          base_role: Database["public"]["Enums"]["base_role"]
          created_at: string
          id: string
          is_canonical: boolean | null
          updated_at: string
        }
        Insert: {
          alias: string
          base_role: Database["public"]["Enums"]["base_role"]
          created_at?: string
          id?: string
          is_canonical?: boolean | null
          updated_at?: string
        }
        Update: {
          alias?: string
          base_role?: Database["public"]["Enums"]["base_role"]
          created_at?: string
          id?: string
          is_canonical?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      shifts: {
        Row: {
          created_at: string
          date_time: string
          location: Json | null
          poster_id: string | null
          rate: number
          requirements: string[] | null
          role: string
          shift_id: string
          status: Database["public"]["Enums"]["shift_status"] | null
          updated_at: string
          worker_id: string | null
        }
        Insert: {
          created_at?: string
          date_time: string
          location?: Json | null
          poster_id?: string | null
          rate: number
          requirements?: string[] | null
          role: string
          shift_id?: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          updated_at?: string
          worker_id?: string | null
        }
        Update: {
          created_at?: string
          date_time?: string
          location?: Json | null
          poster_id?: string | null
          rate?: number
          requirements?: string[] | null
          role?: string
          shift_id?: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          updated_at?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_poster_id_fkey"
            columns: ["poster_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          access_level: string
          company_id: string
          created_at: string | null
          email: string
          id: string
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          access_level: string
          company_id: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          role: string
          updated_at?: string | null
        }
        Update: {
          access_level?: string
          company_id?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          profile_id: string | null
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          profile_id?: string | null
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          profile_id?: string | null
          start_time?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_profile_skills: {
        Row: {
          created_at: string
          profile_id: string
          skill_id: string
        }
        Insert: {
          created_at?: string
          profile_id: string
          skill_id: string
        }
        Update: {
          created_at?: string
          profile_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_profile_skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_profile_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "worker_skills"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_skills: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      log_admin_activity: {
        Args: {
          p_admin_id: string
          p_action_type: string
          p_action_details: Json
        }
        Returns: string
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      base_role: "shift-worker" | "agency" | "company" | "aiagent" | "admin"
      clock_status: "pending" | "approved" | "rejected"
      payment_status: "pending" | "paid" | "failed"
      profile_verification_status:
        | "pending"
        | "verified"
        | "under_review"
        | "rejected"
      shift_status: "posted" | "picked" | "completed" | "cancelled"
      subscription_status: "active" | "inactive"
      user_status: "active" | "inactive" | "pending" | "verified"
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
