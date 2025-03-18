
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
  const registrationResult = await executeWithConnectionRetry(
    async () => registrationService.register({
      email,
      password,
      role,
      name,
      category
    }),
    { criticalOperation: true }
  );
  
  if (!registrationResult.success) {
    throw new Error(registrationResult.message);
  }
  
  return {
    success: true,
    userId: registrationResult.userId,
    message: registrationResult.message
  };
};
