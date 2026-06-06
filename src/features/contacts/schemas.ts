import { z } from "zod";

const optionalText = (maxLength = 500) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(maxLength).optional()
  );

const sourcePath = (fallback: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().min(1).max(220).default(fallback)
  );

export const contactSubmissionSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required.").max(120),
  lastName: z.string().trim().min(1, "Last Name is required.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(220),
  phone: optionalText(80),
  message: z.string().trim().min(1, "Message is required.").max(3000),
  sourcePath: sourcePath("/contact"),
  honeypot: z.union([z.literal(""), z.undefined()]).optional()
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
