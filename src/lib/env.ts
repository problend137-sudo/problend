import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  ADMIN_SETUP_KEY: z.string().min(12),
  SESSION_COOKIE_NAME: z.string().min(6).default("problend_admin_session")
});

export const env = serverEnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ADMIN_SETUP_KEY: process.env.ADMIN_SETUP_KEY ?? "local-dev-setup-key",
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME
});
