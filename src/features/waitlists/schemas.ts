import { z } from "zod";

const optionalText = (maxLength = 600) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(maxLength).optional()
  );

const sourcePath = (fallback: string) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().min(1).max(220).default(fallback)
  );

export const waitlistSubmissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(180),
  email: z.string().trim().email("Enter a valid email address.").max(220),
  phone: optionalText(80),
  city: z.string().trim().min(1, "City is required.").max(140),
  state: z.string().trim().min(1, "State is required.").max(140),
  interestType: z.enum(["customer", "venue", "operator", "distributor", "other"]),
  notes: optionalText(1200),
  sourcePath: sourcePath("/contact"),
  honeypot: z.union([z.literal(""), z.undefined()]).optional()
});

export type WaitlistSubmissionInput = z.infer<typeof waitlistSubmissionSchema>;
