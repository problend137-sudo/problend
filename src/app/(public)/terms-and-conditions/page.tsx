import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/PolicyPage";
import { getLegalPage } from "@/content/legal";

const page = getLegalPage("terms-and-conditions");

export const metadata: Metadata = {
  title: page.title,
  description: page.summary
};

export default function TermsAndConditionsPage() {
  return <PolicyPage page={page} />;
}
