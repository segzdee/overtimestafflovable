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
          highlight: boolean | null
          id: string
          location: string
          rate: string
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          highlight?: boolean | null
          id?: string
          location: string
          rate: string
          title: string
          type: string
        }
        Update: {
          created_at?: string
          highlight?: boolean | null
          id?: string
          location?: string
          rate?: string
          title?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          agency_name: string | null
          category: string | null
          commission_rate: number | null
          created_at: string
          email: string
          id: string
          location: Json | null
          name: string
          payment_info: Json | null
          phone_number: string | null
          profile_complete: boolean | null
          role: string
          specialization: string | null
          staffing_capacity: number | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          agency_name?: string | null
          category?: string | null
          commission_rate?: number | null
          created_at?: string
          email: string
          id: string
          location?: Json | null
          name: string
          payment_info?: Json | null
          phone_number?: string | null
          profile_complete?: boolean | null
          role: string
          specialization?: string | null
          staffing_capacity?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          agency_name?: string | null
          category?: string | null
          commission_rate?: number | null
          created_at?: string
          email?: string
          id?: string
          location?: Json | null
          name?: string
          payment_info?: Json | null
          phone_number?: string | null
          profile_complete?: boolean | null
          role?: string
          specialization?: string | null
          staffing_capacity?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Relationships: []
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
