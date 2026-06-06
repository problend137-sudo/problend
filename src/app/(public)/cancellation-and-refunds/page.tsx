import type { Metadata } from "next";
import { PolicyPage } from "@/components/public/PolicyPage";
import { getLegalPage } from "@/content/legal";

const page = getLegalPage("cancellation-and-refunds");

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function CancellationAndRefundsPage() {
  return <PolicyPage page={page} />;
}
