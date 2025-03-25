
import * as z from "zod";

export const bankDetailsSchema = z.object({
  accountType: z.enum(["checking", "savings"]),
  accountHolder: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(8, "Account number must be at least 8 digits"),
  routingNumber: z.string().length(9, "Routing number must be 9 digits"),
  confirmAccountNumber: z.string()
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers do not match",
  path: ["confirmAccountNumber"],
});

export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
