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
          {
            foreignKeyName: "agencies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
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
          {
            foreignKeyName: "agency_staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
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
          {
            foreignKeyName: "ai_agent_subscriptions_subscriber_profile_id_fkey"
            columns: ["subscriber_profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
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
          {
            foreignKeyName: "companies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
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
          {
            foreignKeyName: "company_staff_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
          },
        ]
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
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
          },
        ]
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
          user_code: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name: string
          profile_complete?: boolean | null
          role: string
          updated_at?: string
          user_code?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          profile_complete?: boolean | null
          role?: string
          updated_at?: string
          user_code?: string | null
        }
        Relationships: []
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
          created_at: string
          experience_years: number | null
          is_independent: boolean | null
          phone: string | null
          preferred_roles: string[] | null
          profile_id: string
          rating: number | null
          skills: string[] | null
          updated_at: string
          verification_status: string
          worker_code: string
        }
        Insert: {
          availability?: Json | null
          created_at?: string
          experience_years?: number | null
          is_independent?: boolean | null
          phone?: string | null
          preferred_roles?: string[] | null
          profile_id: string
          rating?: number | null
          skills?: string[] | null
          updated_at?: string
          verification_status: string
          worker_code: string
        }
        Update: {
          availability?: Json | null
          created_at?: string
          experience_years?: number | null
          is_independent?: boolean | null
          phone?: string | null
          preferred_roles?: string[] | null
          profile_id?: string
          rating?: number | null
          skills?: string[] | null
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
          {
            foreignKeyName: "shift_worker_profiles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "worker_performance_view"
            referencedColumns: ["profile_id"]
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
        Relationships: [
          {
            foreignKeyName: "staff_performance_metrics_worker_profile_id_fkey"
            columns: ["worker_profile_id"]
            isOneToOne: false
            referencedRelation: "shift_worker_profiles"
            referencedColumns: ["profile_id"]
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
      worker_performance_view: {
        Row: {
          email: string | null
          name: string | null
          overall_rating: number | null
          profile_id: string | null
          reliability_score: number | null
          total_shifts_completed: number | null
          user_code: string | null
          worker_code: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_admin_role: {
        Args: {
          tenant_id: string
        }
        Returns: undefined
      }
      generate_unique_id: {
        Args: {
          prefix: string
          counter_table: string
          counter_column: string
        }
        Returns: string
      }
      get_current_tenant_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      reset_and_install_schema: {
        Args: Record<PropertyKey, never>
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
        Args: {
          index_name: string
          table_name: string
          column_name: string
        }
        Returns: undefined
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
