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
      admin_actions: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          target_entity_id: string | null
          target_entity_type: string | null
          target_user_id: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_user_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_actions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_actions_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_audit_log: {
        Row: {
          action_details: Json
          action_type: string
          admin_id: string
          affected_record_id: string | null
          affected_table: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          status: string | null
          user_agent: string | null
        }
        Insert: {
          action_details: Json
          action_type: string
          admin_id: string
          affected_record_id?: string | null
          affected_table?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          status?: string | null
          user_agent?: string | null
        }
        Update: {
          action_details?: Json
          action_type?: string
          admin_id?: string
          affected_record_id?: string | null
          affected_table?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          status?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_audit_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_notifications: {
        Row: {
          action_url: string | null
          admin_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          notification_type: string
          priority: string | null
          title: string
        }
        Insert: {
          action_url?: string | null
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          notification_type: string
          priority?: string | null
          title: string
        }
        Update: {
          action_url?: string | null
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          notification_type?: string
          priority?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_sessions: {
        Row: {
          actions_performed: number | null
          active: boolean | null
          admin_id: string
          created_at: string | null
          id: string
          ip_address: string | null
          session_end: string | null
          session_start: string | null
          user_agent: string | null
        }
        Insert: {
          actions_performed?: number | null
          active?: boolean | null
          admin_id: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          session_end?: string | null
          session_start?: string | null
          user_agent?: string | null
        }
        Update: {
          actions_performed?: number | null
          active?: boolean | null
          admin_id?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          session_end?: string | null
          session_start?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_sessions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_settings: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_sensitive: boolean | null
          setting_group: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_sensitive?: boolean | null
          setting_group: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_sensitive?: boolean | null
          setting_group?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
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
          agency_code: string
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string | null
          profile_id: string
          status: string
          updated_at: string
          verification_status: string
          website: string | null
        }
        Insert: {
          agency_code: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          profile_id: string
          status: string
          updated_at?: string
          verification_status: string
          website?: string | null
        }
        Update: {
          agency_code?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          profile_id?: string
          status?: string
          updated_at?: string
          verification_status?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agencies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_company_relationships: {
        Row: {
          agency_id: string
          company_id: string
          created_at: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          company_id: string
          created_at?: string
          id?: string
          status: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          company_id?: string
          created_at?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_company_relationships_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_company_relationships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_profiles: {
        Row: {
          agency_description: string | null
          agency_type: string | null
          bank_details: Json | null
          billing_address: Json | null
          business_number: string | null
          business_verification_date: string | null
          commission_rate: number | null
          company_rating: number | null
          compliance_certifications: string[] | null
          created_at: string | null
          default_currency: string | null
          fee_structure: Json | null
          headquarters_address: Json | null
          incorporation_date: string | null
          industries_served: string[] | null
          insurance_details: Json | null
          last_active_at: string | null
          license_number: string | null
          logo_url: string | null
          notification_preferences: Json | null
          office_address: Json | null
          onboarding_requirements: Json | null
          payment_terms: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          profile_id: string
          response_time_avg: number | null
          service_areas: string[] | null
          shifts_filled: number | null
          social_media_links: Json | null
          specializations: string[] | null
          status: string | null
          tags: string[] | null
          tax_id: string | null
          tenant_id: string
          updated_at: string | null
          vat_number: string | null
          verification_documents: Json | null
          verification_status: string | null
          website_url: string | null
          worker_count: number | null
          worker_types: string[] | null
        }
        Insert: {
          agency_description?: string | null
          agency_type?: string | null
          bank_details?: Json | null
          billing_address?: Json | null
          business_number?: string | null
          business_verification_date?: string | null
          commission_rate?: number | null
          company_rating?: number | null
          compliance_certifications?: string[] | null
          created_at?: string | null
          default_currency?: string | null
          fee_structure?: Json | null
          headquarters_address?: Json | null
          incorporation_date?: string | null
          industries_served?: string[] | null
          insurance_details?: Json | null
          last_active_at?: string | null
          license_number?: string | null
          logo_url?: string | null
          notification_preferences?: Json | null
          office_address?: Json | null
          onboarding_requirements?: Json | null
          payment_terms?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          profile_id?: string
          response_time_avg?: number | null
          service_areas?: string[] | null
          shifts_filled?: number | null
          social_media_links?: Json | null
          specializations?: string[] | null
          status?: string | null
          tags?: string[] | null
          tax_id?: string | null
          tenant_id: string
          updated_at?: string | null
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          website_url?: string | null
          worker_count?: number | null
          worker_types?: string[] | null
        }
        Update: {
          agency_description?: string | null
          agency_type?: string | null
          bank_details?: Json | null
          billing_address?: Json | null
          business_number?: string | null
          business_verification_date?: string | null
          commission_rate?: number | null
          company_rating?: number | null
          compliance_certifications?: string[] | null
          created_at?: string | null
          default_currency?: string | null
          fee_structure?: Json | null
          headquarters_address?: Json | null
          incorporation_date?: string | null
          industries_served?: string[] | null
          insurance_details?: Json | null
          last_active_at?: string | null
          license_number?: string | null
          logo_url?: string | null
          notification_preferences?: Json | null
          office_address?: Json | null
          onboarding_requirements?: Json | null
          payment_terms?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          profile_id?: string
          response_time_avg?: number | null
          service_areas?: string[] | null
          shifts_filled?: number | null
          social_media_links?: Json | null
          specializations?: string[] | null
          status?: string | null
          tags?: string[] | null
          tax_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          website_url?: string | null
          worker_count?: number | null
          worker_types?: string[] | null
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
      agency_staff: {
        Row: {
          agency_id: string
          created_at: string
          id: string
          profile_id: string
          role: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          id?: string
          profile_id: string
          role: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_staff_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agency_workers: {
        Row: {
          agency_id: string
          created_at: string
          exclusive: boolean | null
          id: string
          status: string
          updated_at: string
          worker_profile_id: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          exclusive?: boolean | null
          id?: string
          status: string
          updated_at?: string
          worker_profile_id: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          exclusive?: boolean | null
          id?: string
          status?: string
          updated_at?: string
          worker_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_workers_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_workers_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "shift_worker_profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      ai_agent_subscriptions: {
        Row: {
          agency_id: string | null
          api_token: string
          company_id: string | null
          created_at: string
          id: string
          monthly_fee: number | null
          payment_status: string
          status: string
          subscriber_profile_id: string
          subscriber_type: string
          subscription_end: string
          subscription_start: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          api_token: string
          company_id?: string | null
          created_at?: string
          id?: string
          monthly_fee?: number | null
          payment_status: string
          status: string
          subscriber_profile_id: string
          subscriber_type: string
          subscription_end: string
          subscription_start: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          api_token?: string
          company_id?: string | null
          created_at?: string
          id?: string
          monthly_fee?: number | null
          payment_status?: string
          status?: string
          subscriber_profile_id?: string
          subscriber_type?: string
          subscription_end?: string
          subscription_start?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_subscriptions_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_subscriptions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_agent_subscriptions_subscriber_profile_id_fkey"
            columns: ["subscriber_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      auth_diagnostics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: number
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: number
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: number
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string
          device_info: Json | null
          expires_at: string
          id: number
          ip_address: string | null
          last_active_at: string | null
          revoked: boolean | null
          revoked_at: string | null
          session_token: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          expires_at: string
          id?: number
          ip_address?: string | null
          last_active_at?: string | null
          revoked?: boolean | null
          revoked_at?: string | null
          session_token?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          expires_at?: string
          id?: number
          ip_address?: string | null
          last_active_at?: string | null
          revoked?: boolean | null
          revoked_at?: string | null
          session_token?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auth_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          category_description: string | null
          category_name: string
          created_at: string
          id: number
          is_active: boolean
          role: string
          updated_at: string
        }
        Insert: {
          category_description?: string | null
          category_name: string
          created_at?: string
          id?: number
          is_active?: boolean
          role: string
          updated_at?: string
        }
        Update: {
          category_description?: string | null
          category_name?: string
          created_at?: string
          id?: number
          is_active?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          company_code: string
          created_at: string
          description: string | null
          email: string
          id: string
          industry: string | null
          name: string
          phone: string | null
          profile_id: string
          status: string
          updated_at: string
          verification_status: string
          website: string | null
        }
        Insert: {
          company_code: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          industry?: string | null
          name: string
          phone?: string | null
          profile_id: string
          status: string
          updated_at?: string
          verification_status: string
          website?: string | null
        }
        Update: {
          company_code?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          industry?: string | null
          name?: string
          phone?: string | null
          profile_id?: string
          status?: string
          updated_at?: string
          verification_status?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          billing_address: Json | null
          business_number: string | null
          business_type: string | null
          business_verification_date: string | null
          company_description: string | null
          company_size: string | null
          compliance_certifications: string[] | null
          created_at: string | null
          credit_rating: string | null
          default_currency: string | null
          headquarters_address: Json | null
          incorporation_date: string | null
          industry: string | null
          last_active_at: string | null
          logo_url: string | null
          notification_preferences: Json | null
          operating_regions: string[] | null
          payment_terms: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          primary_contact_phone: string | null
          profile_id: string
          shift_posting_preferences: Json | null
          shipping_address: Json | null
          social_media_links: Json | null
          status: string | null
          tags: string[] | null
          tax_id: string | null
          tenant_id: string
          updated_at: string | null
          vat_number: string | null
          verification_documents: Json | null
          verification_status: string | null
          website_url: string | null
        }
        Insert: {
          billing_address?: Json | null
          business_number?: string | null
          business_type?: string | null
          business_verification_date?: string | null
          company_description?: string | null
          company_size?: string | null
          compliance_certifications?: string[] | null
          created_at?: string | null
          credit_rating?: string | null
          default_currency?: string | null
          headquarters_address?: Json | null
          incorporation_date?: string | null
          industry?: string | null
          last_active_at?: string | null
          logo_url?: string | null
          notification_preferences?: Json | null
          operating_regions?: string[] | null
          payment_terms?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          profile_id?: string
          shift_posting_preferences?: Json | null
          shipping_address?: Json | null
          social_media_links?: Json | null
          status?: string | null
          tags?: string[] | null
          tax_id?: string | null
          tenant_id: string
          updated_at?: string | null
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          website_url?: string | null
        }
        Update: {
          billing_address?: Json | null
          business_number?: string | null
          business_type?: string | null
          business_verification_date?: string | null
          company_description?: string | null
          company_size?: string | null
          compliance_certifications?: string[] | null
          created_at?: string | null
          credit_rating?: string | null
          default_currency?: string | null
          headquarters_address?: Json | null
          incorporation_date?: string | null
          industry?: string | null
          last_active_at?: string | null
          logo_url?: string | null
          notification_preferences?: Json | null
          operating_regions?: string[] | null
          payment_terms?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          primary_contact_phone?: string | null
          profile_id?: string
          shift_posting_preferences?: Json | null
          shipping_address?: Json | null
          social_media_links?: Json | null
          status?: string | null
          tags?: string[] | null
          tax_id?: string | null
          tenant_id?: string
          updated_at?: string | null
          vat_number?: string | null
          verification_documents?: Json | null
          verification_status?: string | null
          website_url?: string | null
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
      company_staff: {
        Row: {
          company_id: string
          created_at: string
          id: string
          profile_id: string
          role: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          profile_id: string
          role: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          profile_id?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_staff_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      connection_diagnostics: {
        Row: {
          created_at: string
          device_info: Json | null
          error_details: string | null
          event_type: string
          id: number
          ip_address: string | null
          latency_ms: number | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          device_info?: Json | null
          error_details?: string | null
          event_type: string
          id?: number
          ip_address?: string | null
          latency_ms?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          device_info?: Json | null
          error_details?: string | null
          event_type?: string
          id?: number
          ip_address?: string | null
          latency_ms?: number | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connection_diagnostics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          created_at: string | null
          profile_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          profile_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      id_counters: {
        Row: {
          admin_counter: number | null
          agency_counter: number | null
          ai_counter: number | null
          company_counter: number | null
          id: number
          invoice_counter: number | null
          shift_counter: number | null
          worker_counter: number | null
        }
        Insert: {
          admin_counter?: number | null
          agency_counter?: number | null
          ai_counter?: number | null
          company_counter?: number | null
          id?: number
          invoice_counter?: number | null
          shift_counter?: number | null
          worker_counter?: number | null
        }
        Update: {
          admin_counter?: number | null
          agency_counter?: number | null
          ai_counter?: number | null
          company_counter?: number | null
          id?: number
          invoice_counter?: number | null
          shift_counter?: number | null
          worker_counter?: number | null
        }
        Relationships: []
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number
          shift_id: string | null
          unit_price: number
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity: number
          shift_id?: string | null
          unit_price: number
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
          shift_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          agency_id: string | null
          company_id: string
          created_at: string
          due_date: string
          id: string
          invoice_code: string
          invoice_number: string
          invoice_period_end: string
          invoice_period_start: string
          payment_date: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          company_id: string
          created_at?: string
          due_date: string
          id?: string
          invoice_code?: string
          invoice_number: string
          invoice_period_end: string
          invoice_period_start: string
          payment_date?: string | null
          status: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          company_id?: string
          created_at?: string
          due_date?: string
          id?: string
          invoice_code?: string
          invoice_number?: string
          invoice_period_end?: string
          invoice_period_start?: string
          payment_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          read: boolean | null
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          auth_alerts: boolean | null
          created_at: string
          device_notifications: boolean | null
          email: boolean | null
          id: number
          login_notifications: boolean | null
          push: boolean | null
          sms: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auth_alerts?: boolean | null
          created_at?: string
          device_notifications?: boolean | null
          email?: boolean | null
          id?: number
          login_notifications?: boolean | null
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auth_alerts?: boolean | null
          created_at?: string
          device_notifications?: boolean | null
          email?: boolean | null
          id?: number
          login_notifications?: boolean | null
          push?: boolean | null
          sms?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          profile_id: string
          read: boolean | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          profile_id: string
          read?: boolean | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          profile_id?: string
          read?: boolean | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_requests: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          email: string
          expires_at: string
          id: number
          ip_address: string | null
          requested_at: string
          reset_token: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          email: string
          expires_at: string
          id?: number
          ip_address?: string | null
          requested_at?: string
          reset_token: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          email?: string
          expires_at?: string
          id?: number
          ip_address?: string | null
          requested_at?: string
          reset_token?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "password_reset_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string | null
          payer_id: string | null
          payment_date: string | null
          payment_method: string
          recipient_id: string | null
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payer_id?: string | null
          payment_date?: string | null
          payment_method: string
          recipient_id?: string | null
          status: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          payer_id?: string | null
          payment_date?: string | null
          payment_method?: string
          recipient_id?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payer_id_fkey"
            columns: ["payer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string | null
          auth_provider: string | null
          auth_provider_id: string | null
          avatar_url: string | null
          category: string | null
          created_at: string
          email: string
          email_verified: boolean | null
          failed_login_attempts: number | null
          id: string
          last_login_timestamp: string | null
          last_verification_sent: string | null
          locked_until: string | null
          login_count: number | null
          name: string
          phone: string | null
          profile_complete: boolean | null
          registration_ip: string | null
          registration_status: string | null
          registration_timestamp: string | null
          role: string
          timezone: string | null
          updated_at: string
          user_code: string | null
        }
        Insert: {
          account_status?: string | null
          auth_provider?: string | null
          auth_provider_id?: string | null
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          email: string
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          id: string
          last_login_timestamp?: string | null
          last_verification_sent?: string | null
          locked_until?: string | null
          login_count?: number | null
          name: string
          phone?: string | null
          profile_complete?: boolean | null
          registration_ip?: string | null
          registration_status?: string | null
          registration_timestamp?: string | null
          role: string
          timezone?: string | null
          updated_at?: string
          user_code?: string | null
        }
        Update: {
          account_status?: string | null
          auth_provider?: string | null
          auth_provider_id?: string | null
          avatar_url?: string | null
          category?: string | null
          created_at?: string
          email?: string
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          id?: string
          last_login_timestamp?: string | null
          last_verification_sent?: string | null
          locked_until?: string | null
          login_count?: number | null
          name?: string
          phone?: string | null
          profile_complete?: boolean | null
          registration_ip?: string | null
          registration_status?: string | null
          registration_timestamp?: string | null
          role?: string
          timezone?: string | null
          updated_at?: string
          user_code?: string | null
        }
        Relationships: []
      }
      protected_routes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          required_role: string
          route_path: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          required_role?: string
          route_path: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          required_role?: string
          route_path?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action: string
          count: number
          expires_at: string
          first_attempt: string
          id: number
          ip_address: string
          last_attempt: string
        }
        Insert: {
          action: string
          count?: number
          expires_at: string
          first_attempt?: string
          id?: number
          ip_address: string
          last_attempt?: string
        }
        Update: {
          action?: string
          count?: number
          expires_at?: string
          first_attempt?: string
          id?: number
          ip_address?: string
          last_attempt?: string
        }
        Relationships: []
      }
      registration_attempts: {
        Row: {
          attempt_timestamp: string
          email: string
          error_message: string | null
          id: number
          ip_address: string | null
          success: boolean | null
          user_agent: string | null
        }
        Insert: {
          attempt_timestamp?: string
          email: string
          error_message?: string | null
          id?: number
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Update: {
          attempt_timestamp?: string
          email?: string
          error_message?: string | null
          id?: number
          ip_address?: string | null
          success?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      registration_backups: {
        Row: {
          attempts: number
          category: string | null
          created_at: string
          email: string
          id: number
          name: string
          processed: boolean
          registration_data: Json | null
          role: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          category?: string | null
          created_at?: string
          email: string
          id?: number
          name: string
          processed?: boolean
          registration_data?: Json | null
          role: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          category?: string | null
          created_at?: string
          email?: string
          id?: number
          name?: string
          processed?: boolean
          registration_data?: Json | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          id: string
          ip_address: string | null
          profile_data: Json | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          id?: string
          ip_address?: string | null
          profile_data?: Json | null
          role: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          id?: string
          ip_address?: string | null
          profile_data?: Json | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      registrations_backup_20250319_0921: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          email: string | null
          email_verified: boolean | null
          id: string | null
          ip_address: string | null
          profile_data: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          status: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: string | null
          ip_address?: string | null
          profile_data?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: string | null
          ip_address?: string | null
          profile_data?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      security_violations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          ip_address: string | null
          resolution_status: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          violation_type: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          violation_type: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          ip_address?: string | null
          resolution_status?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          violation_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_violations_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_violations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_applications: {
        Row: {
          agency_id: string | null
          applicant_type: string
          created_at: string
          id: string
          shift_id: string
          status: string
          updated_at: string
          worker_profile_id: string | null
        }
        Insert: {
          agency_id?: string | null
          applicant_type: string
          created_at?: string
          id?: string
          shift_id: string
          status: string
          updated_at?: string
          worker_profile_id?: string | null
        }
        Update: {
          agency_id?: string | null
          applicant_type?: string
          created_at?: string
          id?: string
          shift_id?: string
          status?: string
          updated_at?: string
          worker_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_applications_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_applications_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_applications_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "shift_worker_profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      shift_assignments: {
        Row: {
          agency_id: string | null
          clock_in: string | null
          clock_out: string | null
          company_feedback: string | null
          created_at: string
          hourly_rate: number
          id: string
          rating_to_company: number | null
          rating_to_worker: number | null
          shift_id: string
          status: string
          total_hours: number | null
          total_pay: number | null
          updated_at: string
          worker_feedback: string | null
          worker_profile_id: string
        }
        Insert: {
          agency_id?: string | null
          clock_in?: string | null
          clock_out?: string | null
          company_feedback?: string | null
          created_at?: string
          hourly_rate: number
          id?: string
          rating_to_company?: number | null
          rating_to_worker?: number | null
          shift_id: string
          status: string
          total_hours?: number | null
          total_pay?: number | null
          updated_at?: string
          worker_feedback?: string | null
          worker_profile_id: string
        }
        Update: {
          agency_id?: string | null
          clock_in?: string | null
          clock_out?: string | null
          company_feedback?: string | null
          created_at?: string
          hourly_rate?: number
          id?: string
          rating_to_company?: number | null
          rating_to_worker?: number | null
          shift_id?: string
          status?: string
          total_hours?: number | null
          total_pay?: number | null
          updated_at?: string
          worker_feedback?: string | null
          worker_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_assignments_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
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
            foreignKeyName: "shift_assignments_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "shift_worker_profiles"
            referencedColumns: ["profile_id"]
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
        ]
      }
      shift_worker_profiles: {
        Row: {
          availability: Json | null
          availability_calendar: Json | null
          availability_notes: string | null
          background_check_date: string | null
          bio: string | null
          canceled_shifts: number | null
          certifications: string[] | null
          completed_shifts: number | null
          created_at: string
          education: string | null
          employment_status: string | null
          experience_years: number | null
          hourly_rate: number | null
          identity_verified: boolean | null
          is_independent: boolean | null
          languages: string[] | null
          last_active_at: string | null
          max_distance: number | null
          min_hourly_rate: number | null
          notification_preferences: Json | null
          payment_details: Json | null
          phone: string | null
          preferred_locations: string[] | null
          preferred_roles: string[] | null
          preferred_shift_types: string[] | null
          profile_id: string
          profile_photo_url: string | null
          rating: number | null
          references_verified: boolean | null
          reliability_score: number | null
          skills: string[] | null
          specializations: string[] | null
          status: string | null
          tags: string[] | null
          tax_information: Json | null
          updated_at: string
          verification_status: string
          worker_code: string
        }
        Insert: {
          availability?: Json | null
          availability_calendar?: Json | null
          availability_notes?: string | null
          background_check_date?: string | null
          bio?: string | null
          canceled_shifts?: number | null
          certifications?: string[] | null
          completed_shifts?: number | null
          created_at?: string
          education?: string | null
          employment_status?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          identity_verified?: boolean | null
          is_independent?: boolean | null
          languages?: string[] | null
          last_active_at?: string | null
          max_distance?: number | null
          min_hourly_rate?: number | null
          notification_preferences?: Json | null
          payment_details?: Json | null
          phone?: string | null
          preferred_locations?: string[] | null
          preferred_roles?: string[] | null
          preferred_shift_types?: string[] | null
          profile_id: string
          profile_photo_url?: string | null
          rating?: number | null
          references_verified?: boolean | null
          reliability_score?: number | null
          skills?: string[] | null
          specializations?: string[] | null
          status?: string | null
          tags?: string[] | null
          tax_information?: Json | null
          updated_at?: string
          verification_status: string
          worker_code: string
        }
        Update: {
          availability?: Json | null
          availability_calendar?: Json | null
          availability_notes?: string | null
          background_check_date?: string | null
          bio?: string | null
          canceled_shifts?: number | null
          certifications?: string[] | null
          completed_shifts?: number | null
          created_at?: string
          education?: string | null
          employment_status?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          identity_verified?: boolean | null
          is_independent?: boolean | null
          languages?: string[] | null
          last_active_at?: string | null
          max_distance?: number | null
          min_hourly_rate?: number | null
          notification_preferences?: Json | null
          payment_details?: Json | null
          phone?: string | null
          preferred_locations?: string[] | null
          preferred_roles?: string[] | null
          preferred_shift_types?: string[] | null
          profile_id?: string
          profile_photo_url?: string | null
          rating?: number | null
          references_verified?: boolean | null
          reliability_score?: number | null
          skills?: string[] | null
          specializations?: string[] | null
          status?: string | null
          tags?: string[] | null
          tax_information?: Json | null
          updated_at?: string
          verification_status?: string
          worker_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_worker_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_workers: {
        Row: {
          availability: Json | null
          background_check_status: string | null
          certifications: Json | null
          completed_shifts: number | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          identity_verified: boolean | null
          preferred_locations: string[] | null
          rating: number | null
          skills: string[] | null
          tenant_id: string | null
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          availability?: Json | null
          background_check_status?: string | null
          certifications?: Json | null
          completed_shifts?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          identity_verified?: boolean | null
          preferred_locations?: string[] | null
          rating?: number | null
          skills?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          availability?: Json | null
          background_check_status?: string | null
          certifications?: Json | null
          completed_shifts?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          identity_verified?: boolean | null
          preferred_locations?: string[] | null
          rating?: number | null
          skills?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
          verification_status?: string | null
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
          agency_id: string | null
          company_id: string
          created_at: string
          date: string
          description: string | null
          end_time: string
          hourly_rate: number
          id: string
          location: string
          position: string
          shift_code: string
          staff_confirmed: number | null
          staff_needed: number
          start_time: string
          status: string
          updated_at: string
        }
        Insert: {
          agency_id?: string | null
          company_id: string
          created_at?: string
          date: string
          description?: string | null
          end_time: string
          hourly_rate: number
          id?: string
          location: string
          position: string
          shift_code?: string
          staff_confirmed?: number | null
          staff_needed: number
          start_time: string
          status: string
          updated_at?: string
        }
        Update: {
          agency_id?: string | null
          company_id?: string
          created_at?: string
          date?: string
          description?: string | null
          end_time?: string
          hourly_rate?: number
          id?: string
          location?: string
          position?: string
          shift_code?: string
          staff_confirmed?: number | null
          staff_needed?: number
          start_time?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shifts_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_performance_metrics: {
        Row: {
          cancellation_rate: number | null
          completion_rate: number | null
          created_at: string
          id: string
          on_time_rate: number | null
          overall_rating: number | null
          reliability_score: number | null
          response_time_avg: number | null
          total_shifts_completed: number | null
          updated_at: string
          worker_profile_id: string
        }
        Insert: {
          cancellation_rate?: number | null
          completion_rate?: number | null
          created_at?: string
          id?: string
          on_time_rate?: number | null
          overall_rating?: number | null
          reliability_score?: number | null
          response_time_avg?: number | null
          total_shifts_completed?: number | null
          updated_at?: string
          worker_profile_id: string
        }
        Update: {
          cancellation_rate?: number | null
          completion_rate?: number | null
          created_at?: string
          id?: string
          on_time_rate?: number | null
          overall_rating?: number | null
          reliability_score?: number | null
          response_time_avg?: number | null
          total_shifts_completed?: number | null
          updated_at?: string
          worker_profile_id?: string
        }
        Relationships: []
      }
      tenant_verification_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          document_links: Json | null
          id: string
          requested_by: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          verification_type: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          document_links?: Json | null
          id?: string
          requested_by: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          verification_type: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          document_links?: Json | null
          id?: string
          requested_by?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          verification_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_verification_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_verification_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_verification_requests_tenant_id_fkey"
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
            foreignKeyName: "time_entries_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_log: {
        Row: {
          action: string
          created_at: string
          id: number
          ip_address: string | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: number
          ip_address?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: number
          ip_address?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_complaints: {
        Row: {
          assigned_to: string | null
          complainant_id: string
          complaint_type: string
          created_at: string | null
          description: string
          evidence_links: Json | null
          id: string
          resolution: string | null
          status: string | null
          subject_id: string | null
          subject_type: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          complainant_id: string
          complaint_type: string
          created_at?: string | null
          description: string
          evidence_links?: Json | null
          id?: string
          resolution?: string | null
          status?: string | null
          subject_id?: string | null
          subject_type?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          complainant_id?: string
          complaint_type?: string
          created_at?: string | null
          description?: string
          evidence_links?: Json | null
          id?: string
          resolution?: string | null
          status?: string | null
          subject_id?: string | null
          subject_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_complaints_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_complaints_complainant_id_fkey"
            columns: ["complainant_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_complaints_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          browser_name: string | null
          browser_version: string | null
          created_at: string
          device_id: string
          device_name: string | null
          device_type: string | null
          id: number
          is_trusted: boolean | null
          last_used_at: string
          os_name: string | null
          os_version: string | null
          user_id: string
        }
        Insert: {
          browser_name?: string | null
          browser_version?: string | null
          created_at?: string
          device_id: string
          device_name?: string | null
          device_type?: string | null
          id?: number
          is_trusted?: boolean | null
          last_used_at?: string
          os_name?: string | null
          os_version?: string | null
          user_id: string
        }
        Update: {
          browser_name?: string | null
          browser_version?: string | null
          created_at?: string
          device_id?: string
          device_name?: string | null
          device_type?: string | null
          id?: number
          is_trusted?: boolean | null
          last_used_at?: string
          os_name?: string | null
          os_version?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_verification_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: number
          token: string
          token_type: string
          updated_at: string | null
          used: boolean | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: number
          token: string
          token_type: string
          updated_at?: string | null
          used?: boolean | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: number
          token?: string
          token_type?: string
          updated_at?: string | null
          used?: boolean | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_verification_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          admin_notes: string | null
          admin_restricted: boolean | null
          auth_id: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          impersonated_by_admin_id: string | null
          last_admin_action_at: string | null
          phone: string | null
          role: string
          tenant_id: string
          updated_at: string | null
          verified_by_admin_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          admin_restricted?: boolean | null
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          impersonated_by_admin_id?: string | null
          last_admin_action_at?: string | null
          phone?: string | null
          role: string
          tenant_id: string
          updated_at?: string | null
          verified_by_admin_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          admin_restricted?: boolean | null
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          impersonated_by_admin_id?: string | null
          last_admin_action_at?: string | null
          phone?: string | null
          role?: string
          tenant_id?: string
          updated_at?: string | null
          verified_by_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_impersonated_by_admin_id_fkey"
            columns: ["impersonated_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_verified_by_admin_id_fkey"
            columns: ["verified_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          event_type: string
          id: number
          record_id: string | null
          request_payload: Json | null
          response_body: string | null
          response_status: number | null
          triggered_table: string
          webhook_name: string
        }
        Insert: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          event_type: string
          id?: number
          record_id?: string | null
          request_payload?: Json | null
          response_body?: string | null
          response_status?: number | null
          triggered_table: string
          webhook_name: string
        }
        Update: {
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          event_type?: string
          id?: number
          record_id?: string | null
          request_payload?: Json | null
          response_body?: string | null
          response_status?: number | null
          triggered_table?: string
          webhook_name?: string
        }
        Relationships: []
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
      registration_analytics: {
        Row: {
          day: string | null
          success_rate: number | null
          successful_attempts: number | null
          total_attempts: number | null
          unique_emails: number | null
          unique_ips: number | null
        }
        Relationships: []
      }
      registration_errors: {
        Row: {
          created_at: string | null
          error_details: Json | null
          error_id: string | null
          error_message: string | null
          error_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_details?: Json | null
          error_id?: string | null
          error_message?: string | null
          error_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_details?: Json | null
          error_id?: string | null
          error_message?: string | null
          error_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      admin_handle_complaint: {
        Args: {
          admin_id: string
          complaint_id: string
          new_status: string
          resolution?: string
        }
        Returns: undefined
      }
      admin_impersonate_user: {
        Args: { admin_id: string; user_id: string }
        Returns: undefined
      }
      admin_restrict_user: {
        Args: { admin_id: string; user_id: string; restriction_reason: string }
        Returns: undefined
      }
      admin_unrestrict_user: {
        Args: {
          admin_id: string
          user_id: string
          unrestriction_reason: string
        }
        Returns: undefined
      }
      admin_verify_tenant: {
        Args: {
          admin_id: string
          tenant_id: string
          verification_notes?: string
        }
        Returns: undefined
      }
      admin_verify_user: {
        Args: { admin_id: string; user_id: string; verification_notes?: string }
        Returns: undefined
      }
      assign_admin_role: {
        Args: { tenant_id: string }
        Returns: undefined
      }
      auto_assign_workers_to_shift: {
        Args: { p_shift_id: string; p_count?: number }
        Returns: {
          worker_id: string
          assignment_id: string
        }[]
      }
      check_rate_limit: {
        Args: {
          p_ip_address: string
          p_action: string
          p_max_attempts: number
          p_window_seconds: number
        }
        Returns: boolean
      }
      check_registration_rate_limit: {
        Args: { p_email: string; p_ip_address: string }
        Returns: Json
      }
      current_user_is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      end_admin_session: {
        Args: { session_id: string }
        Returns: undefined
      }
      generate_unique_id: {
        Args: { prefix: string; counter_table: string; counter_column: string }
        Returns: string
      }
      generate_verification_token: {
        Args: {
          p_user_id: string
          p_token_type: string
          p_expires_hours?: number
        }
        Returns: string
      }
      get_admin_actions_for_user: {
        Args: { user_id: string }
        Returns: {
          id: string
          admin_id: string
          admin_email: string
          action_type: string
          details: Json
          created_at: string
        }[]
      }
      get_admin_dashboard_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_available_workers: {
        Args: { shift_id: string }
        Returns: {
          worker_id: string
          name: string
          rating: number
          experience_years: number
        }[]
      }
      get_current_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_registration_errors: {
        Args: Record<PropertyKey, never>
        Returns: {
          error_id: string
          user_id: string
          error_type: string
          error_message: string
          error_details: Json
          created_at: string
        }[]
      }
      get_worker_performance_metrics: {
        Args: {
          p_worker_id: string
          p_start_date?: string
          p_end_date?: string
        }
        Returns: {
          metric_name: string
          metric_value: number
          comparison_to_avg: number
        }[]
      }
      handle_failed_login: {
        Args: {
          p_user_id: string
          p_max_attempts?: number
          p_lockout_minutes?: number
        }
        Returns: boolean
      }
      is_account_locked: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          admin_id: string
          action_type: string
          affected_table: string
          affected_record_id: string
          action_details: Json
        }
        Returns: undefined
      }
      process_registration_backup: {
        Args: { backup_id: number }
        Returns: boolean
      }
      process_webhook: {
        Args: {
          webhook_name: string
          edge_function_name: string
          triggered_table: string
          record_id: string
          event_type: string
          payload: Json
        }
        Returns: undefined
      }
      record_admin_session_action: {
        Args: { session_id: string }
        Returns: undefined
      }
      record_successful_login: {
        Args: { p_user_id: string; p_ip_address?: string }
        Returns: undefined
      }
      record_user_login: {
        Args: {
          p_user_id: string
          p_session_token: string
          p_ip_address: string
          p_user_agent: string
          p_device_info?: Json
          p_session_hours?: number
        }
        Returns: number
      }
      register_user: {
        Args: {
          p_user_id: string
          p_email: string
          p_role: string
          p_name: string
          p_category: string
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: Json
      }
      reset_and_install_schema: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_failed_login_attempts: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      safe_create_policy: {
        Args: {
          policy_name: string
          table_name: string
          policy_statement: string
        }
        Returns: undefined
      }
      safe_create_single_column_index: {
        Args: { index_name: string; table_name: string; column_name: string }
        Returns: undefined
      }
      send_verification_email: {
        Args: {
          p_user_id: string
          p_email: string
          p_verification_type: string
          p_token: string
          p_redirect_url?: string
        }
        Returns: boolean
      }
      start_admin_session: {
        Args: { admin_id: string }
        Returns: string
      }
      stop_admin_impersonation: {
        Args: { user_id: string }
        Returns: undefined
      }
      store_supabase_settings: {
        Args: {
          supabase_url: string
          anon_key: string
          service_role_key: string
        }
        Returns: undefined
      }
      track_auth_event: {
        Args: { event_type: string; user_id: string; event_data?: Json }
        Returns: undefined
      }
      track_connection_event: {
        Args: {
          p_user_id: string
          p_event_type: string
          p_error_details?: string
          p_latency_ms?: number
          p_ip_address?: string
          p_user_agent?: string
          p_device_info?: Json
        }
        Returns: undefined
      }
      track_user_activity: {
        Args: {
          p_user_id: string
          p_action: string
          p_resource_type?: string
          p_resource_id?: string
          p_metadata?: Json
          p_ip_address?: string
          p_user_agent?: string
        }
        Returns: undefined
      }
      validate_business_hours: {
        Args: { p_shift_id: string }
        Returns: boolean
      }
      validate_category: {
        Args: { p_role: string; p_category: string }
        Returns: boolean
      }
      verify_user_token: {
        Args: { p_token: string; p_token_type: string }
        Returns: Json
      }
    }
    Enums: {
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
      registration_status: "pending" | "approved" | "rejected"
      shift_status:
        | "draft"
        | "open"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
      subscription_status: "inactive" | "active" | "expired"
      subscription_tier: "free" | "basic" | "premium" | "enterprise"
      tenant_status: "active" | "inactive" | "suspended" | "pending"
      tenant_type: "company" | "agency"
      user_role: "admin" | "shift_worker" | "agency" | "company"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
      ],
      registration_status: ["pending", "approved", "rejected"],
      shift_status: [
        "draft",
        "open",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
      ],
      subscription_status: ["inactive", "active", "expired"],
      subscription_tier: ["free", "basic", "premium", "enterprise"],
      tenant_status: ["active", "inactive", "suspended", "pending"],
      tenant_type: ["company", "agency"],
      user_role: ["admin", "shift_worker", "agency", "company"],
    },
  },
} as const
