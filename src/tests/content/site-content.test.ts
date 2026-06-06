import { describe, expect, it } from "vitest";
import { problendAssets } from "@/content/assets";
import { caseStudies, publishedCaseStudies } from "@/content/case-studies";
import { legalPages } from "@/content/legal";
import nextConfig from "../../../next.config";
import {
  aboutContent,
  businessSolutionsContent,
  contactDetails,
  contactPageContent,
  homeContent,
  howItWorksContent,
  platformAcquisitionContent,
  productOfferingsContent,
  publicNavigation,
  workingHours
} from "@/content/site";
import { products, productOfferingCategories } from "@/content/products";

describe("ProBlend content preservation", () => {
  it("preserves exact live homepage copy anchors", () => {
    expect(homeContent.hero.title).toBe("Fuel your fitness, one shake at a time.");
    expect(homeContent.hero.body).toBe("Discover fresh protein shakes at your fingertips, anytime and anywhere.");
    expect(homeContent.positioning.title).toBe("Not Just Another Vending Machine");
    expect(homeContent.positioning.body).toBe(
      "A smart, customizable solution designed to bring health, convenience, and innovation to any space— redefining the way people access nutrition."
    );
    expect(homeContent.featureMoments.map((item) => [item.title, item.body])).toEqual([
      [
        "Tailored to You",
        "Every individual has unique needs. Our machines allow full variety of shakes, ensuring everyone gets exactly what they want—making your space more engaging and wellness-oriented."
      ],
      [
        "Fuel Your Goals, Anytime",
        "Around-the-clock access to protein-rich, nutritious shakes—providing quick, convenient refueling without the need for cafeterias or extra staff"
      ],
      [
        "Smart & Hygienic",
        "Automated, contactless, and technology-driven machines ensure maximum hygiene, freshness, and reliability, with seamless operation and real-time monitoring"
      ]
    ]);
    expect(homeContent.story.body).toBe(
      "ProBlend specializes in customizable protein shake vending machines, ensuring easy access to fresh, high-quality nutrition. Our automated, hygienic, and cashless solutions cater to various locations, from gyms to residences, providing 24/7 shake availability."
    );
    expect(homeContent.story.mediaQuotes).toEqual([
      "\"Here’s a closer look at our protein vending machine\"",
      "\"Behind the scenes: Where innovation meets wellness\""
    ]);
  });

  it("preserves exact live About, How It Works, and Contact copy anchors", () => {
    expect(aboutContent.title).toBe("About Us");
    expect(aboutContent.heading).toBe("Fueling Health, Anytime, Anywhere");
    expect(aboutContent.body[0]).toBe(
      "At Pro Blend, we’re redefining how people access protein shakes. Our state-of-the-art vending machines bring high-quality, customizable shakes directly to gyms, offices, colleges, and other active spaces so you can enjoy nutrition on the go, anytime you want."
    );
    expect(aboutContent.form.successText).toBe("Thanks for submitting!");

    expect(howItWorksContent.title).toBe("How it Works");
    expect(howItWorksContent.subhead).toBe("“From selection to sip, Pro Blend makes healthy living effortless in just a few simple steps\"");
    expect(howItWorksContent.steps.map((step) => step.title)).toEqual([
      "Choose Your Shake",
      "Make Payment",
      "Shake is Prepared",
      "Enjoy & Track"
    ]);

    expect(contactPageContent.title).toBe("Contact Us");
    expect(contactPageContent.heading).toBe("We’d love to hear from you!");
    expect(contactPageContent.body).toBe(
      "Whether you’re interested in our vending solutions, need support, or have business inquiries, our team is here to help."
    );
  });

  it("positions Business Solutions as the Partnership Platform", () => {
    expect(businessSolutionsContent.title).toBe("Partnership Platform");
    expect(businessSolutionsContent.body).toBe(
      "Share a venue, city, network, or introduction. We'll review it and get back if it fits."
    );
    expect(platformAcquisitionContent.hero.title).toBe("Help bring ProBlend to the right place.");
    expect(platformAcquisitionContent.hero.body).toBe(
      "Share a venue, city, network, or introduction. We'll review it and get back if it fits."
    );
    expect(platformAcquisitionContent.formPrompt).toBe("What do you have?");
    expect(platformAcquisitionContent.actions).toEqual({
      primary: "Share an opportunity",
      secondary: "See open opportunities",
      estimate: "Run placement estimate"
    });
    expect(platformAcquisitionContent.opportunityTypes.map((item) => item.label)).toEqual([
      "A venue",
      "A city or network",
      "An introduction",
      "An open ProBlend brief to answer"
    ]);
    expect(platformAcquisitionContent.board.title).toBe("Open Opportunities");
    expect(platformAcquisitionContent.board.body).toBe("Places and partners ProBlend is looking for right now.");
    expect(platformAcquisitionContent.board.empty).toBe("No open opportunities right now. You can still share one with us.");
    expect(platformAcquisitionContent.credibility.statement).toBe(
      "You bring access. ProBlend brings the machine, setup, stocking, cleaning, payments, and support."
    );

    const publicPlatformText = [
      businessSolutionsContent.title,
      businessSolutionsContent.body,
      platformAcquisitionContent.hero.title,
      platformAcquisitionContent.hero.body,
      platformAcquisitionContent.formPrompt,
      platformAcquisitionContent.actions.primary,
      platformAcquisitionContent.actions.secondary,
      platformAcquisitionContent.actions.estimate,
      ...platformAcquisitionContent.opportunityTypes.flatMap((item) => [item.label, item.body]),
      platformAcquisitionContent.board.title,
      platformAcquisitionContent.board.body,
      platformAcquisitionContent.board.empty,
      platformAcquisitionContent.credibility.statement,
      ...platformAcquisitionContent.credibility.points
    ].join(" ");

    expect(publicPlatformText).not.toMatch(
      /Smart Vending Solutions|Customizable Nutrition for Consumers|Technology-Driven Operations|Health & Wellness Solutions|Marketing & Engagement Support|Remote Monitoring|Data Insights|Curated board|Direct intake|City signals|View Board|Start Questionnaire|pathway|intent|clearly routed|published opportunity response|real commercial next step/i
    );
  });

  it("preserves official contact details including live-site typo and working hours", () => {
    expect(contactDetails.email).toBe("problend0@gmail.com");
    expect(contactDetails.address).toBe("K-18 Green park Extension New Delhi-110016");
    expect(contactDetails.phones).toEqual(["+919810427184", "=918586097112", "+919810341994"]);
    expect(workingHours).toEqual([
      { days: "Mon - Fri", hours: "9:00 am – 7:00 pm" },
      { days: "Saturday", hours: "9:00 am – 7:00 pm" },
      { days: "Sunday", hours: "9:00 am – 7:00 pm" }
    ]);
  });

  it("keeps Product Offerings category-led while treating flavours as supporting copy", () => {
    expect(productOfferingCategories.map((category) => category.title)).toEqual([
      "Protein Shakes",
      "Vending Machine Placement Solutions",
      "Customization Options",
      "Health & Wellness Add-ons"
    ]);
    expect(productOfferingsContent.title).toBe("Our Product Offerings");
    expect(productOfferingsContent.heading).toBe("What We Offer");
    expect(productOfferingCategories[0].items).toContain(
      "Belgian Chocolate Protein Shake – Rich, indulgent, and packed with protein."
    );
    expect(productOfferingCategories[1].items).toContain(
      "Technology Integration: Cashless payments, GPRS tracking, inventory monitoring, and analytics."
    );
    expect(productOfferingsContent.conclusion).toBe(
      "Pro Blend delivers premium, on-demand nutrition, combining convenience, technology, and health in a fully automated solution."
    );

    expect(products.map((product) => product.name)).toEqual([
      "Belgian Chocolate Protein Shake",
      "Vanilla Protein Shake",
      "Mango Protein Shake",
      "Cola Electrolyte Shake"
    ]);
    expect(products).toHaveLength(4);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);

    const migratedProductText = products
      .flatMap((product) => [product.name, product.description, product.slug])
      .join(" ");
    expect(migratedProductText).not.toMatch(
      /golf|baseball|cap|vase|tote|bag|eyeglasses|serum|diffuser|chair|t-shirt|sweater/i
    );
  });

  it("uses local ProBlend generated imagery as first-class public assets", () => {
    const generatedKeys = [
      "generatedHeroGymMachineWide",
      "generatedMachineInteractionPayment",
      "generatedOperationsRestocking",
      "generatedMachineProductPortrait",
      "generatedShakeDispensing",
      "generatedMachineUpiGym",
      "generatedVenuePlacementProof"
    ] as const;

    for (const key of generatedKeys) {
      expect(problendAssets[key].src).toMatch(/^\/images\/problend\/generated\/.+\.png$/);
      expect(problendAssets[key].alt.length).toBeGreaterThan(20);
    }

    for (const asset of Object.values(problendAssets)) {
      expect(asset.src).toMatch(/^\/images\/problend\/.+\.(jpg|jpeg|png|svg)$/);
      expect(asset.alt.length).toBeGreaterThan(10);
    }

    expect(products.every((product) => product.visual.src.startsWith("/images/problend/"))).toBe(true);
  });

  it("keeps public navigation close to the original website", () => {
    expect(publicNavigation.map((item) => item.label)).toEqual([
      "Home",
      "About Us",
      "How It Works",
      "Product Offerings",
      "Partnership Platform",
      "Contact Us"
    ]);
    expect(publicNavigation.map((item) => item.href)).toEqual([
      "/",
      "/about",
      "/how-it-works",
      "/product-offerings",
      "/business-solutions",
      "/contact"
    ]);
  });

  it("keeps the footer policy set and leaves case studies publication-ready", () => {
    expect(legalPages.map((page) => page.slug)).toEqual([
      "privacy-policy",
      "terms-and-conditions",
      "cancellation-and-refunds",
      "shipping-policy"
    ]);
    expect(legalPages.map((page) => page.title)).toEqual([
      "Privacy Policy",
      "Terms & Conditions",
      "Refund Policy",
      "Shipping & Delivery Policy"
    ]);
    expect(legalPages[0].sections[0].body[0]).toBe("Effective Date: 24th August 2025");
    expect(legalPages[1].sections.flatMap((section) => section.body)).toContain(
      "These terms are governed by the laws of [Insert Country/State]."
    );
    expect(legalPages[1].sections.flatMap((section) => section.body)).toContain(
      "Disputes fall under the jurisdiction of courts in [Insert City]."
    );
    expect(legalPages[2].sections.flatMap((section) => section.body)).toContain(
      "Refunds are processed within 14–21 working days after approval, minus any costs incurred for customization, transport, or installation."
    );
    expect(legalPages[3].sections.flatMap((section) => section.body)).toContain(
      "Standard delivery and installation of machines takes 30–45 days from order confirmation."
    );
    expect(caseStudies.length).toBeGreaterThan(0);
    expect(publishedCaseStudies).toEqual(caseStudies.filter((caseStudy) => caseStudy.published));
    expect(caseStudies.every((caseStudy) => caseStudy.slug && caseStudy.title && caseStudy.venueType && caseStudy.city)).toBe(true);
    expect(caseStudies.every((caseStudy) => caseStudy.summary && caseStudy.metrics.length > 0 && caseStudy.body.length > 0)).toBe(true);
  });

  it("keeps legacy Wix routes compatible with canonical public pages", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        { source: "/about-us", destination: "/about", permanent: true },
        { source: "/how-it-works-1", destination: "/how-it-works", permanent: true },
        { source: "/contact-us", destination: "/contact", permanent: true },
        { source: "/blank", destination: "/privacy-policy", permanent: true },
        { source: "/blank-2", destination: "/terms-and-conditions", permanent: true },
        { source: "/blank-4", destination: "/shipping-policy", permanent: true }
      ])
    );
  });
});
