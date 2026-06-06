import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().email();
const passwordSchema = z.string().min(12, "Password must be at least 12 characters.").max(128);

export const adminLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const adminSetupSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(120),
  email: emailSchema,
  password: passwordSchema,
  setupKey: z.string().min(1, "Setup key is required.")
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type AdminSetupInput = z.infer<typeof adminSetupSchema>;
