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
      admin_profiles: {
        Row: {
          admin_level: string
          created_at: string | null
          departments: string[] | null
          id: string
          permissions: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_level: string
          created_at?: string | null
          departments?: string[] | null
          id?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_level?: string
          created_at?: string | null
          departments?: string[] | null
          id?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      agency_profiles: {
        Row: {
          agency_name: string
          billing_authority: boolean | null
          can_create_users: boolean | null
          client_management_authority: boolean | null
          contact_phone: string | null
          created_at: string | null
          department: string | null
          id: string
          notification_settings: Json | null
          position_title: string | null
          specializations: string[] | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string
          worker_management_authority: boolean | null
        }
        Insert: {
          agency_name: string
          billing_authority?: boolean | null
          can_create_users?: boolean | null
          client_management_authority?: boolean | null
          contact_phone?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          notification_settings?: Json | null
          position_title?: string | null
          specializations?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id: string
          worker_management_authority?: boolean | null
        }
        Update: {
          agency_name?: string
          billing_authority?: boolean | null
          can_create_users?: boolean | null
          client_management_authority?: boolean | null
          contact_phone?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          notification_settings?: Json | null
          position_title?: string | null
          specializations?: string[] | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string
          worker_management_authority?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "agency_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agent_profiles: {
        Row: {
          agent_name: string
          agent_type: string
          api_key: string | null
          api_key_expires_at: string | null
          capabilities: string[] | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          settings: Json | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_name: string
          agent_type: string
          api_key?: string | null
          api_key_expires_at?: string | null
          capabilities?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          settings?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_name?: string
          agent_type?: string
          api_key?: string | null
          api_key_expires_at?: string | null
          capabilities?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          settings?: Json | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agent_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at: string | null
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          record_id: string | null
          table_name: string | null
          tenant_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          created_at?: string | null
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string | null
          table_name?: string | null
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          billing_authority: boolean | null
          can_create_users: boolean | null
          company_name: string
          contact_phone: string | null
          created_at: string | null
          department: string | null
          hiring_authority: boolean | null
          id: string
          notification_settings: Json | null
          position_title: string | null
          shift_approval_authority: boolean | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_authority?: boolean | null
          can_create_users?: boolean | null
          company_name: string
          contact_phone?: string | null
          created_at?: string | null
          department?: string | null
          hiring_authority?: boolean | null
          id?: string
          notification_settings?: Json | null
          position_title?: string | null
          shift_approval_authority?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_authority?: boolean | null
          can_create_users?: boolean | null
          company_name?: string
          contact_phone?: string | null
          created_at?: string | null
          department?: string | null
          hiring_authority?: boolean | null
          id?: string
          notification_settings?: Json | null
          position_title?: string | null
          shift_approval_authority?: boolean | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      configuration_presets: {
        Row: {
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          tenant_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          configuration: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          tenant_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          tenant_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "configuration_presets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          is_admin: boolean | null
          joined_at: string | null
          last_read_at: string | null
          left_at: string | null
          muted: boolean | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          left_at?: string | null
          muted?: boolean | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_admin?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          left_at?: string | null
          muted?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          last_message_at: string | null
          shift_id: string | null
          tenant_id: string | null
          title: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_message_at?: string | null
          shift_id?: string | null
          tenant_id?: string | null
          title?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          last_message_at?: string | null
          shift_id?: string | null
          tenant_id?: string | null
          title?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      email_log: {
        Row: {
          body: string
          clicked_at: string | null
          created_at: string | null
          delivered_at: string | null
          email: string
          error_message: string | null
          id: string
          opened_at: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_id: string | null
          user_id: string | null
          variables: Json | null
        }
        Insert: {
          body: string
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email: string
          error_message?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_id?: string | null
          user_id?: string | null
          variables?: Json | null
        }
        Update: {
          body?: string
          clicked_at?: string | null
          created_at?: string | null
          delivered_at?: string | null
          email?: string
          error_message?: string | null
          id?: string
          opened_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_id?: string | null
          user_id?: string | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "email_log_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          end_at: string | null
          id: string
          key: string
          percentage: number | null
          role_access: Database["public"]["Enums"]["user_role"][] | null
          start_at: string | null
          tenant_ids: string[] | null
          updated_at: string | null
          user_ids: string[] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          end_at?: string | null
          id?: string
          key: string
          percentage?: number | null
          role_access?: Database["public"]["Enums"]["user_role"][] | null
          start_at?: string | null
          tenant_ids?: string[] | null
          updated_at?: string | null
          user_ids?: string[] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          end_at?: string | null
          id?: string
          key?: string
          percentage?: number | null
          role_access?: Database["public"]["Enums"]["user_role"][] | null
          start_at?: string | null
          tenant_ids?: string[] | null
          updated_at?: string | null
          user_ids?: string[] | null
        }
        Relationships: []
      }
      identity_verifications: {
        Row: {
          documents: Json | null
          expiry_date: string | null
          id: string
          metadata: Json | null
          rejected_at: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          submitted_at: string | null
          user_id: string
          verification_notes: string | null
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          documents?: Json | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id: string
          verification_notes?: string | null
          verification_type: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          documents?: Json | null
          expiry_date?: string | null
          id?: string
          metadata?: Json | null
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id?: string
          verification_notes?: string | null
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          created_by: string | null
          currency: string | null
          due_date: string
          id: string
          invoice_number: string
          issued_date: string
          line_items: Json | null
          notes: string | null
          paid_date: string | null
          payment_id: string | null
          recipient_id: string | null
          status: string | null
          tax_amount: number | null
          tenant_id: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issued_date: string
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_id?: string | null
          recipient_id?: string | null
          status?: string | null
          tax_amount?: number | null
          tenant_id: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issued_date?: string
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_id?: string | null
          recipient_id?: string | null
          status?: string | null
          tax_amount?: number | null
          tenant_id?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_access_list: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          ip_address: string
          tenant_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          ip_address: string
          tenant_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          ip_address?: string
          tenant_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_access_list_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempt_timestamp: string | null
          email: string | null
          error_message: string | null
          id: string
          ip_address: string | null
          login_method: Database["public"]["Enums"]["login_method"] | null
          success: boolean
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          attempt_timestamp?: string | null
          email?: string | null
          error_message?: string | null
          id?: string
          ip_address?: string | null
          login_method?: Database["public"]["Enums"]["login_method"] | null
          success: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          attempt_timestamp?: string | null
          email?: string | null
          error_message?: string | null
          id?: string
          ip_address?: string | null
          login_method?: Database["public"]["Enums"]["login_method"] | null
          success?: boolean
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          content: string
          conversation_id: string
          created_at: string | null
          deleted_by_recipient: boolean | null
          deleted_by_sender: boolean | null
          id: string
          read: boolean | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string
          updated_at: string | null
        }
        Insert: {
          attachments?: Json | null
          content: string
          conversation_id: string
          created_at?: string | null
          deleted_by_recipient?: boolean | null
          deleted_by_sender?: boolean | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id: string
          updated_at?: string | null
        }
        Update: {
          attachments?: Json | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          deleted_by_recipient?: boolean | null
          deleted_by_sender?: boolean | null
          id?: string
          read?: boolean | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mfa_methods: {
        Row: {
          backup_codes: string[] | null
          created_at: string | null
          id: string
          identifier: string | null
          last_used_at: string | null
          secret: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          identifier?: string | null
          last_used_at?: string | null
          secret?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          identifier?: string | null
          last_used_at?: string | null
          secret?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content: string
          created_at: string | null
          expires_at: string | null
          for_role: Database["public"]["Enums"]["user_role"] | null
          icon: string | null
          id: string
          metadata: Json | null
          read: boolean | null
          read_at: string | null
          tenant_id: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          content: string
          created_at?: string | null
          expires_at?: string | null
          for_role?: Database["public"]["Enums"]["user_role"] | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          read?: boolean | null
          read_at?: string | null
          tenant_id?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          content?: string
          created_at?: string | null
          expires_at?: string | null
          for_role?: Database["public"]["Enums"]["user_role"] | null
          icon?: string | null
          id?: string
          metadata?: Json | null
          read?: boolean | null
          read_at?: string | null
          tenant_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          token: string
          used: boolean | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          token: string
          used?: boolean | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          token?: string
          used?: boolean | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          billing_address: Json | null
          billing_name: string | null
          created_at: string | null
          expiry_month: number | null
          expiry_year: number | null
          id: string
          is_default: boolean | null
          last_four: string | null
          metadata: Json | null
          provider: string
          provider_payment_method_id: string | null
          tenant_id: string | null
          type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          billing_name?: string | null
          created_at?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          metadata?: Json | null
          provider: string
          provider_payment_method_id?: string | null
          tenant_id?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          billing_name?: string | null
          created_at?: string | null
          expiry_month?: number | null
          expiry_year?: number | null
          id?: string
          is_default?: boolean | null
          last_four?: string | null
          metadata?: Json | null
          provider?: string
          provider_payment_method_id?: string | null
          tenant_id?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          description: string | null
          fee_amount: number | null
          id: string
          invoice_id: string | null
          metadata: Json | null
          payer_tenant_id: string | null
          payer_user_id: string | null
          payment_date: string | null
          payment_method_id: string | null
          provider: string
          provider_payment_id: string | null
          recipient_tenant_id: string | null
          recipient_user_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          fee_amount?: number | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          payer_tenant_id?: string | null
          payer_user_id?: string | null
          payment_date?: string | null
          payment_method_id?: string | null
          provider: string
          provider_payment_id?: string | null
          recipient_tenant_id?: string | null
          recipient_user_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          fee_amount?: number | null
          id?: string
          invoice_id?: string | null
          metadata?: Json | null
          payer_tenant_id?: string | null
          payer_user_id?: string | null
          payment_date?: string | null
          payment_method_id?: string | null
          provider?: string
          provider_payment_id?: string | null
          recipient_tenant_id?: string | null
          recipient_user_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          tax_amount?: number | null
          total_amount?: number
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
            foreignKeyName: "payments_payer_tenant_id_fkey"
            columns: ["payer_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_recipient_tenant_id_fkey"
            columns: ["recipient_tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          avatar_url: string | null
          created_at: string | null
          default_language: string | null
          email: string
          email_verified: boolean | null
          full_name: string
          id: string
          last_active_at: string | null
          last_login_at: string | null
          marketing_consent: boolean | null
          mfa_enabled: boolean | null
          notification_preferences: Json | null
          phone: string | null
          phone_verified: boolean | null
          privacy_accepted: boolean | null
          profile_completed: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          tenant_id: string | null
          terms_accepted: boolean | null
          timezone: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          default_language?: string | null
          email: string
          email_verified?: boolean | null
          full_name: string
          id: string
          last_active_at?: string | null
          last_login_at?: string | null
          marketing_consent?: boolean | null
          mfa_enabled?: boolean | null
          notification_preferences?: Json | null
          phone?: string | null
          phone_verified?: boolean | null
          privacy_accepted?: boolean | null
          profile_completed?: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          terms_accepted?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          default_language?: string | null
          email?: string
          email_verified?: boolean | null
          full_name?: string
          id?: string
          last_active_at?: string | null
          last_login_at?: string | null
          marketing_consent?: boolean | null
          mfa_enabled?: boolean | null
          notification_preferences?: Json | null
          phone?: string | null
          phone_verified?: boolean | null
          privacy_accepted?: boolean | null
          profile_completed?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          tenant_id?: string | null
          terms_accepted?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action: string
          count: number | null
          expires_at: string
          id: string
          ip_address: string
          last_attempt: string | null
        }
        Insert: {
          action: string
          count?: number | null
          expires_at: string
          id?: string
          ip_address: string
          last_attempt?: string | null
        }
        Update: {
          action?: string
          count?: number | null
          expires_at?: string
          id?: string
          ip_address?: string
          last_attempt?: string | null
        }
        Relationships: []
      }
      recurring_shifts: {
        Row: {
          created_at: string | null
          created_by: string | null
          days_of_week: number[] | null
          description: string | null
          end_date: string | null
          end_time: string
          frequency: string
          id: string
          is_active: boolean | null
          start_date: string
          start_time: string
          template: Json
          tenant_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          days_of_week?: number[] | null
          description?: string | null
          end_date?: string | null
          end_time: string
          frequency: string
          id?: string
          is_active?: boolean | null
          start_date: string
          start_time: string
          template: Json
          tenant_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          days_of_week?: number[] | null
          description?: string | null
          end_date?: string | null
          end_time?: string
          frequency?: string
          id?: string
          is_active?: boolean | null
          start_date?: string
          start_time?: string
          template?: Json
          tenant_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recurring_shifts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      registration_attempts: {
        Row: {
          attempt_timestamp: string | null
          email: string
          error_message: string | null
          id: string
          ip_address: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          success: boolean | null
          user_agent: string | null
        }
        Insert: {
          attempt_timestamp?: string | null
          email: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          success?: boolean | null
          user_agent?: string | null
        }
        Update: {
          attempt_timestamp?: string | null
          email?: string
          error_message?: string | null
          id?: string
          ip_address?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          success?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          id: string
          invited_by: string | null
          ip_address: string | null
          profile_data: Json | null
          rejected_at: string | null
          rejected_reason: string | null
          requires_approval: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          id?: string
          invited_by?: string | null
          ip_address?: string | null
          profile_data?: Json | null
          rejected_at?: string | null
          rejected_reason?: string | null
          requires_approval?: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          id?: string
          invited_by?: string | null
          ip_address?: string | null
          profile_data?: Json | null
          rejected_at?: string | null
          rejected_reason?: string | null
          requires_approval?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["registration_status"] | null
          supabase_uid?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      security_events: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          tenant_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          device_info: Json | null
          expires_at: string
          id: string
          ip_address: string | null
          last_active_at: string | null
          refresh_token: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: Json | null
          expires_at: string
          id?: string
          ip_address?: string | null
          last_active_at?: string | null
          refresh_token?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: Json | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_active_at?: string | null
          refresh_token?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      shift_applications: {
        Row: {
          cover_note: string | null
          distance: number | null
          hourly_rate_requested: number | null
          id: string
          metadata: Json | null
          processed_at: string | null
          processed_by: string | null
          rejection_reason: string | null
          shift_id: string
          status: Database["public"]["Enums"]["application_status"] | null
          submitted_at: string | null
          tenant_id: string
          worker_id: string
        }
        Insert: {
          cover_note?: string | null
          distance?: number | null
          hourly_rate_requested?: number | null
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          shift_id: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          tenant_id: string
          worker_id: string
        }
        Update: {
          cover_note?: string | null
          distance?: number | null
          hourly_rate_requested?: number | null
          id?: string
          metadata?: Json | null
          processed_at?: string | null
          processed_by?: string | null
          rejection_reason?: string | null
          shift_id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submitted_at?: string | null
          tenant_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_applications_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_applications_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_assignments: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          application_id: string | null
          assigned_at: string | null
          assigned_by: string | null
          break_minutes: number | null
          cancellation_reason: string | null
          cancelled_at: string | null
          checked_in_at: string | null
          checked_out_at: string | null
          company_feedback: string | null
          hourly_rate: number
          id: string
          metadata: Json | null
          no_show_notes: string | null
          no_show_reported_at: string | null
          rating_by_company: number | null
          rating_by_worker: number | null
          shift_id: string
          status: Database["public"]["Enums"]["assignment_status"] | null
          supervisor_notes: string | null
          tenant_id: string
          total_hours: number | null
          worker_feedback: string | null
          worker_id: string
          worker_notes: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          application_id?: string | null
          assigned_at?: string | null
          assigned_by?: string | null
          break_minutes?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          company_feedback?: string | null
          hourly_rate: number
          id?: string
          metadata?: Json | null
          no_show_notes?: string | null
          no_show_reported_at?: string | null
          rating_by_company?: number | null
          rating_by_worker?: number | null
          shift_id: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
          supervisor_notes?: string | null
          tenant_id: string
          total_hours?: number | null
          worker_feedback?: string | null
          worker_id: string
          worker_notes?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          application_id?: string | null
          assigned_at?: string | null
          assigned_by?: string | null
          break_minutes?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          checked_in_at?: string | null
          checked_out_at?: string | null
          company_feedback?: string | null
          hourly_rate?: number
          id?: string
          metadata?: Json | null
          no_show_notes?: string | null
          no_show_reported_at?: string | null
          rating_by_company?: number | null
          rating_by_worker?: number | null
          shift_id?: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
          supervisor_notes?: string | null
          tenant_id?: string
          total_hours?: number | null
          worker_feedback?: string | null
          worker_id?: string
          worker_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shift_assignments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "shift_applications"
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
            foreignKeyName: "shift_assignments_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_timesheets: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          assignment_id: string
          break_minutes: number | null
          created_at: string | null
          end_time: string
          hourly_rate: number
          id: string
          notes: string | null
          payment_id: string | null
          rejection_reason: string | null
          shift_id: string
          start_time: string
          status: string | null
          tenant_id: string
          total_amount: number
          total_hours: number
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id: string
          break_minutes?: number | null
          created_at?: string | null
          end_time: string
          hourly_rate: number
          id?: string
          notes?: string | null
          payment_id?: string | null
          rejection_reason?: string | null
          shift_id: string
          start_time: string
          status?: string | null
          tenant_id: string
          total_amount: number
          total_hours: number
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          assignment_id?: string
          break_minutes?: number | null
          created_at?: string | null
          end_time?: string
          hourly_rate?: number
          id?: string
          notes?: string | null
          payment_id?: string | null
          rejection_reason?: string | null
          shift_id?: string
          start_time?: string
          status?: string | null
          tenant_id?: string
          total_amount?: number
          total_hours?: number
          updated_at?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_timesheets_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "shift_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_timesheets_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_timesheets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_worker_profiles: {
        Row: {
          address: string | null
          availability: Json | null
          availability_status: string | null
          background_check_status: string | null
          bank_account_info: Json | null
          bio: string | null
          certifications: Json | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          education: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_years: number | null
          hourly_rate_max: number | null
          hourly_rate_min: number | null
          id: string
          id_documents: Json | null
          identity_verified: boolean | null
          max_distance: number | null
          phone: string | null
          preferred_industries: string[] | null
          preferred_locations: Json | null
          rating: number | null
          skills: string[] | null
          state: string | null
          tax_information: Json | null
          total_hours_worked: number | null
          total_shifts_completed: number | null
          transportation: string | null
          updated_at: string | null
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          availability?: Json | null
          availability_status?: string | null
          background_check_status?: string | null
          bank_account_info?: Json | null
          bio?: string | null
          certifications?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          education?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          hourly_rate_max?: number | null
          hourly_rate_min?: number | null
          id?: string
          id_documents?: Json | null
          identity_verified?: boolean | null
          max_distance?: number | null
          phone?: string | null
          preferred_industries?: string[] | null
          preferred_locations?: Json | null
          rating?: number | null
          skills?: string[] | null
          state?: string | null
          tax_information?: Json | null
          total_hours_worked?: number | null
          total_shifts_completed?: number | null
          transportation?: string | null
          updated_at?: string | null
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          availability?: Json | null
          availability_status?: string | null
          background_check_status?: string | null
          bank_account_info?: Json | null
          bio?: string | null
          certifications?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          education?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_years?: number | null
          hourly_rate_max?: number | null
          hourly_rate_min?: number | null
          id?: string
          id_documents?: Json | null
          identity_verified?: boolean | null
          max_distance?: number | null
          phone?: string | null
          preferred_industries?: string[] | null
          preferred_locations?: Json | null
          rating?: number | null
          skills?: string[] | null
          state?: string | null
          tax_information?: Json | null
          total_hours_worked?: number | null
          total_shifts_completed?: number | null
          transportation?: string | null
          updated_at?: string | null
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          zip?: string | null
        }
        Relationships: []
      }
      shifts: {
        Row: {
          address: string | null
          agency_fee_percentage: number | null
          agency_id: string | null
          auto_approve_applications: boolean | null
          break_time: number | null
          cancellation_reason: string | null
          cancelled_at: string | null
          certifications_required: Json | null
          city: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          dress_code: string | null
          end_time: string
          hourly_rate: number
          id: string
          is_recurring: boolean | null
          latitude: number | null
          location_id: string | null
          longitude: number | null
          max_applicants: number | null
          metadata: Json | null
          parking_instructions: string | null
          positions_available: number
          positions_filled: number
          recurring_pattern: Json | null
          requires_background_check: boolean | null
          requires_certification: boolean | null
          skills_required: string[] | null
          special_instructions: string | null
          start_time: string
          state: string | null
          status: Database["public"]["Enums"]["shift_status"] | null
          supervisor_contact: string | null
          supervisor_name: string | null
          tenant_id: string
          title: string
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          agency_fee_percentage?: number | null
          agency_id?: string | null
          auto_approve_applications?: boolean | null
          break_time?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          certifications_required?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          dress_code?: string | null
          end_time: string
          hourly_rate: number
          id?: string
          is_recurring?: boolean | null
          latitude?: number | null
          location_id?: string | null
          longitude?: number | null
          max_applicants?: number | null
          metadata?: Json | null
          parking_instructions?: string | null
          positions_available?: number
          positions_filled?: number
          recurring_pattern?: Json | null
          requires_background_check?: boolean | null
          requires_certification?: boolean | null
          skills_required?: string[] | null
          special_instructions?: string | null
          start_time: string
          state?: string | null
          status?: Database["public"]["Enums"]["shift_status"] | null
          supervisor_contact?: string | null
          supervisor_name?: string | null
          tenant_id: string
          title: string
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          agency_fee_percentage?: number | null
          agency_id?: string | null
          auto_approve_applications?: boolean | null
          break_time?: number | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          certifications_required?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          dress_code?: string | null
          end_time?: string
          hourly_rate?: number
          id?: string
          is_recurring?: boolean | null
          latitude?: number | null
          location_id?: string | null
          longitude?: number | null
          max_applicants?: number | null
          metadata?: Json | null
          parking_instructions?: string | null
          positions_available?: number
          positions_filled?: number
          recurring_pattern?: Json | null
          requires_background_check?: boolean | null
          requires_certification?: boolean | null
          skills_required?: string[] | null
          special_instructions?: string | null
          start_time?: string
          state?: string | null
          status?: Database["public"]["Enums"]["shift_status"] | null
          supervisor_contact?: string | null
          supervisor_name?: string | null
          tenant_id?: string
          title?: string
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "tenant_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          billing_cycle: string | null
          cancel_at_period_end: boolean | null
          cancelled_at: string | null
          created_at: string | null
          currency: string | null
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          payment_method_id: string | null
          plan_id: string | null
          provider: string
          provider_subscription_id: string | null
          start_date: string
          status: string | null
          tenant_id: string
          trial_end: string | null
          trial_start: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end: string
          current_period_start: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          plan_id?: string | null
          provider: string
          provider_subscription_id?: string | null
          start_date: string
          status?: string | null
          tenant_id: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          plan_id?: string | null
          provider?: string
          provider_subscription_id?: string | null
          start_date?: string
          status?: string | null
          tenant_id?: string
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      tenant_invitations: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          department: string | null
          email: string
          expires_at: string
          id: string
          invitation_token: string
          invited_by: string | null
          invited_role: Database["public"]["Enums"]["user_role"]
          job_title: string | null
          location_id: string | null
          message: string | null
          permissions: Json | null
          relationship_type: string
          status: string | null
          tenant_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          expires_at: string
          id?: string
          invitation_token: string
          invited_by?: string | null
          invited_role: Database["public"]["Enums"]["user_role"]
          job_title?: string | null
          location_id?: string | null
          message?: string | null
          permissions?: Json | null
          relationship_type: string
          status?: string | null
          tenant_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_by?: string | null
          invited_role?: Database["public"]["Enums"]["user_role"]
          job_title?: string | null
          location_id?: string | null
          message?: string | null
          permissions?: Json | null
          relationship_type?: string
          status?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_invitations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "tenant_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_invitations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          is_primary: boolean | null
          manager_id: string | null
          name: string
          phone: string | null
          state: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          manager_id?: string | null
          name: string
          phone?: string | null
          state?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_primary?: boolean | null
          manager_id?: string | null
          name?: string
          phone?: string | null
          state?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_locations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_user_relationships: {
        Row: {
          created_at: string | null
          created_by: string | null
          department: string | null
          employee_id: string | null
          end_date: string | null
          id: string
          job_title: string | null
          location_id: string | null
          permissions: Json | null
          relationship_type: string
          start_date: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          job_title?: string | null
          location_id?: string | null
          permissions?: Json | null
          relationship_type: string
          start_date?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          job_title?: string | null
          location_id?: string | null
          permissions?: Json | null
          relationship_type?: string
          start_date?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_user_relationships_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "tenant_locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_user_relationships_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          address: string | null
          banner_url: string | null
          billing_details: Json | null
          business_type: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string
          id: string
          industry: string | null
          logo_url: string | null
          metadata: Json | null
          name: string
          phone: string | null
          settings: Json | null
          state: string | null
          status: string | null
          subscription_ends_at: string | null
          subscription_starts_at: string | null
          subscription_tier: string | null
          tax_id: string | null
          type: Database["public"]["Enums"]["tenant_type"]
          updated_at: string | null
          verification_documents: Json | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          banner_url?: string | null
          billing_details?: Json | null
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          metadata?: Json | null
          name: string
          phone?: string | null
          settings?: Json | null
          state?: string | null
          status?: string | null
          subscription_ends_at?: string | null
          subscription_starts_at?: string | null
          subscription_tier?: string | null
          tax_id?: string | null
          type: Database["public"]["Enums"]["tenant_type"]
          updated_at?: string | null
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          banner_url?: string | null
          billing_details?: Json | null
          business_type?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          logo_url?: string | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          settings?: Json | null
          state?: string | null
          status?: string | null
          subscription_ends_at?: string | null
          subscription_starts_at?: string | null
          subscription_tier?: string | null
          tax_id?: string | null
          type?: Database["public"]["Enums"]["tenant_type"]
          updated_at?: string | null
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          browser: string | null
          created_at: string | null
          device_id: string
          device_name: string | null
          device_type: string | null
          id: string
          ip_address: string | null
          is_trusted: boolean | null
          last_used_at: string | null
          os: string | null
          trust_expires_at: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string | null
          device_id: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_trusted?: boolean | null
          last_used_at?: string | null
          os?: string | null
          trust_expires_at?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string | null
          device_id?: string
          device_name?: string | null
          device_type?: string | null
          id?: string
          ip_address?: string | null
          is_trusted?: boolean | null
          last_used_at?: string | null
          os?: string | null
          trust_expires_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verification_challenges: {
        Row: {
          challenge_token: string
          challenge_type: string
          created_at: string | null
          expires_at: string
          id: string
          ip_address: string | null
          metadata: Json | null
          registration_id: string | null
          user_agent: string | null
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
        }
        Insert: {
          challenge_token: string
          challenge_type: string
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          registration_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Update: {
          challenge_token?: string
          challenge_type?: string
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          registration_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_challenges_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_status:
        | "pending_verification"
        | "active"
        | "suspended"
        | "locked"
        | "deactivated"
      application_status: "pending" | "accepted" | "rejected" | "withdrawn"
      assignment_status:
        | "assigned"
        | "confirmed"
        | "checked_in"
        | "completed"
        | "no_show"
        | "cancelled"
      audit_action:
        | "insert"
        | "update"
        | "delete"
        | "login"
        | "logout"
        | "password_reset"
        | "email_verification"
        | "profile_update"
        | "role_change"
        | "permission_change"
      login_method:
        | "password"
        | "magic_link"
        | "oauth_google"
        | "oauth_apple"
        | "oauth_facebook"
        | "oauth_linkedin"
      notification_type:
        | "welcome"
        | "shift_invite"
        | "shift_application"
        | "shift_assignment"
        | "verification_update"
        | "account_update"
        | "payment_update"
        | "security_alert"
        | "system_alert"
      payment_status: "pending" | "processing" | "paid" | "failed" | "refunded"
      registration_status: "pending" | "approved" | "rejected"
      shift_status:
        | "draft"
        | "open"
        | "filled"
        | "in_progress"
        | "completed"
        | "cancelled"
      tenant_type: "company" | "agency"
      user_role: "admin" | "shift_worker" | "agency" | "company" | "ai_agent"
      verification_status: "unverified" | "pending" | "verified" | "rejected"
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
