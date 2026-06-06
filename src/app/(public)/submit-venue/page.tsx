import type { Route } from "next";
import { redirect } from "next/navigation";

export default function SubmitVenueRedirectPage() {
  redirect("/business-solutions#opportunity-intake" as Route);
}
