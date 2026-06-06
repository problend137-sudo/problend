import { headers } from "next/headers";

export async function getRequestMetadata() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for") ?? "";
  const ipAddress = forwardedFor.split(",")[0]?.trim() || "0.0.0.0";
  const userAgent = headerStore.get("user-agent") ?? "unknown";

  return { ipAddress, userAgent };
}
