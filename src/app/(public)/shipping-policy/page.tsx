import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/PolicyPage";
import { getLegalPage } from "@/content/legal";

const page = getLegalPage("shipping-policy");

export const metadata: Metadata = {
  title: page.title,
  description: page.summary
};

export default function ShippingPolicyPage() {
  return <PolicyPage page={page} />;
}
