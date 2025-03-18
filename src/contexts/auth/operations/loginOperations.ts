
import { supabase } from "@/lib/supabase/client";
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";
import { NavigateFunction } from "react-router-dom";
import { AuthUser } from "../types";

export const login = async (email: string, password: string, navigate?: NavigateFunction, toast?: any) => {
  try {
    const result = await executeWithConnectionRetry(
      async () => {
        const response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        // Handle error properly for the new API format
        if (response.error) {
          throw response.error;
        }
        
        return response;
      },
      { criticalOperation: true }
    );

    if (navigate && toast) {
      toast({
        title: "Login successful",
        description: "Welcome back!"
      });
      navigate("/dashboard");
    }

    return {
      user: result.data?.user || null,
      session: result.data?.session || null,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    if (toast) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials"
      });
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await supabase.auth.signOut();
    
    if (response.error) {
      throw response.error;
    }
    
    return true;
  } catch (error: any) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (response.error) {
      throw response.error;
    }
    
    return true;
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const response = await supabase.auth.updateUser({
      password,
    });
    
    // Handle the response data correctly
    if (response.error) {
      throw response.error;
    }
    
    return {
      user: response.data?.user || null,
    };
  } catch (error: any) {
    console.error("Update password error:", error);
    throw error;
  }
};
