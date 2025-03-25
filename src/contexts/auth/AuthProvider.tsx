
import { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useAuthState } from "./hooks/useAuthState";
import { useAuthMethods } from "./operations/authMethods";
import { useTokenMethods } from "./operations/tokenMethods";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use extracted hooks for state and methods
  const { user, setUser, aiTokens, setAiTokens, loading, error } = useAuthState();
  const { register, login, logout, updateProfile } = useAuthMethods(setUser, setAiTokens);
  const { generateAiToken, revokeAiToken, updateNotificationPreferences } = useTokenMethods(setAiTokens);

  // Placeholder methods that show toast notifications
  const loginWithToken = async (token: string) => {
    console.log("Token login not implemented", token);
  };

  const devLogin = async (password: string) => {
    console.log("Dev login not implemented", password);
  };

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Authentication Error</h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider
        value={{
          user,
          aiTokens,
          loading,
          register,
          login,
          loginWithToken,
          devLogin,
          logout,
          updateProfile,
          updateNotificationPreferences,
          generateAiToken,
          revokeAiToken
        }}
      >
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}
