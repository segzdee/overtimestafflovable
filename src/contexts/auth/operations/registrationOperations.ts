
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
    async () => registrationService.register({
      email,
      password,
      role,
      name,
      category
    }),
    { criticalOperation: true }
  );
  
  if (!result.success) {
    throw new Error(result.message);
  }
  
  return {
    success: true,
    userId: result.userId,
    message: result.message
  };
};
