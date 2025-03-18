
import { executeWithConnectionRetry } from "@/lib/robust-connection-handler";
import { BaseRole } from "@/lib/types";
import { registrationService } from "@/lib/registration/registration-service";

export const register = async (
  email: string,
  password: string,
  role: BaseRole,
  name: string,
  category?: string
) => {
  // Use the registration service for improved reliability
  const result = await executeWithConnectionRetry(
    async () => {
      const response = await registrationService.register({
        email,
        password,
        role,
        name,
        category
      });
      
      if (!response.success) {
        throw new Error(response.message || "Registration failed");
      }
      
      return response;
    },
    { criticalOperation: true }
  );
  
  return {
    success: true,
    userId: result.userId,
    message: result.message
  };
};
