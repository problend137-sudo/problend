import { problendAssets } from "@/content/assets";

export const products = [
  {
    slug: "belgian-chocolate",
    name: "Belgian Chocolate Protein Shake",
    description: "Rich, indulgent, and packed with protein.",
    accent: "#a8ff5e",
    visual: problendAssets.generatedShakeDispensing
  },
  {
    slug: "vanilla",
    name: "Vanilla Protein Shake",
    description: "Smooth, classic, and perfect for daily nutrition.",
    accent: "#dfffc2",
    visual: problendAssets.generatedMachineProductPortrait
  },
  {
    slug: "mango",
    name: "Mango Protein Shake",
    description: "Fruity, refreshing, and energizing.",
    accent: "#f6b34d",
    visual: problendAssets.generatedMachineInteractionPayment
  },
  {
    slug: "cola-electrolyte",
    name: "Cola Electrolyte Shake",
    description: "Unique blend with electrolytes to hydrate and energize.",
    accent: "#7cff4f",
    visual: problendAssets.generatedMachineUpiGym
  }
] as const;

export const productOfferingCategories = [
  {
    number: "01",
    title: "Protein Shakes",
    intro: "Fresh, high quality protein shakes available in multiple flavors:",
    items: [
      "Belgian Chocolate Protein Shake – Rich, indulgent, and packed with protein.",
      "Vanilla Protein Shake – Smooth, classic, and perfect for daily nutrition.",
      "Mango Protein Shake – Fruity, refreshing, and energizing.",
      "Cola Electrolyte Shake – Unique blend with electrolytes to hydrate and energize."
    ],
    outro: "All shakes are customizable in terms of protein content and flavor intensity."
  },
  {
    number: "02",
    title: "Vending Machine Placement Solutions",
    items: [
      "Smart Vending Machines: Designed for quick, hygienic, and seamless dispensing.",
      "Technology Integration: Cashless payments, GPRS tracking, inventory monitoring, and analytics.",
      "Turnkey Setup: Pro Blend handles installation, stocking, and maintenance, allowing partners to focus on their business."
    ]
  },
  {
    number: "03",
    title: "Customization Options",
    items: [
      "Personalized Nutrition: Adjust protein levels, sugar content, or add functional ingredients.",
      "Branded Experiences: Co-branding opportunities for partners (gyms, offices, universities).",
      "Special Promotions: Limited-edition flavors or seasonal offerings for engagement campaigns."
    ]
  },
  {
    number: "04",
    title: "Health & Wellness Add-ons",
    items: [
      "Nutritional information displayed for all shakes.",
      "Low-sugar, high-protein, and diet-friendly options.",
      "Functional blends including electrolytes, vitamins, or energy boosters."
    ]
  }
] as const;

