import type { Metadata } from "next";
import { WaitlistForm } from "@/components/public/ContactForm";
import { PublicPageHero } from "@/components/public/PublicPageHero";
import { problendAssets } from "@/content/assets";
import { publicCtas, routeMetadata } from "@/content/site";

export const metadata: Metadata = routeMetadata.cityWaitlist;

export default function CityWaitlistPage() {
  return (
    <main>
      <PublicPageHero
        body="Register city, venue, or community demand before ProBlend has availability in that market."
        image={problendAssets.generatedShakeDispensing}
        imagePosition="center"
        primaryLink={{ href: "#city-waitlist-form", label: "Join Waitlist" }}
        secondaryLink={publicCtas.partner}
        title="Join a City Waitlist"
      />

      <div className="scroll-mt-28" id="city-waitlist-form">
        <WaitlistForm
          body="Share the market and type of demand ProBlend should keep in view."
          sourcePath="/city-waitlist"
          title="City Waitlist"
        />
      </div>
    </main>
  );
}
