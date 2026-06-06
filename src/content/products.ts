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

export const productNutritionProfiles = [
  {
    slug: "belgian-chocolate",
    serving: "300 ml shake",
    protein: "24-30 g",
    calories: "180-240 kcal",
    sugar: "Low-sugar configuration available",
    functionalBlend: "Cocoa flavour with whey protein and optional vitamin booster"
  },
  {
    slug: "vanilla",
    serving: "300 ml shake",
    protein: "22-28 g",
    calories: "170-230 kcal",
    sugar: "Low-sugar configuration available",
    functionalBlend: "Classic vanilla with balanced protein and daily nutrition add-ons"
  },
  {
    slug: "mango",
    serving: "300 ml shake",
    protein: "20-26 g",
    calories: "175-235 kcal",
    sugar: "Low-sugar configuration available",
    functionalBlend: "Fruit-forward mango profile with optional energy booster"
  },
  {
    slug: "cola-electrolyte",
    serving: "300 ml shake",
    protein: "16-22 g",
    calories: "150-210 kcal",
    sugar: "Low-sugar configuration available",
    functionalBlend: "Electrolyte-forward blend for hydration and active spaces"
  }
] as const satisfies ReadonlyArray<{
  slug: (typeof products)[number]["slug"];
  serving: string;
  protein: string;
  calories: string;
  sugar: string;
  functionalBlend: string;
}>;

export const machineCapabilities = [
  {
    title: "Cashless payments",
    body: "UPI, card, and mobile wallet flows keep purchase friction low in gyms, campuses, offices, and residences."
  },
  {
    title: "GPRS tracking",
    body: "Connected machines report operational status so ProBlend can monitor availability across deployment locations."
  },
  {
    title: "Inventory monitoring",
    body: "Ingredient and consumable signals help the operations team plan stocking before a machine runs low."
  },
  {
    title: "Analytics",
    body: "Public-safe demand patterns help ProBlend tune flavour mix, service cadence, and placement conversations."
  },
  {
    title: "Remote monitoring",
    body: "Machine health and usage signals support faster support decisions without requiring venue teams to manage operations."
  },
  {
    title: "Predictive restocking",
    body: "Restocking plans can be aligned to expected demand, seasonal usage, and venue-specific consumption patterns."
  }
] as const;

export const productCustomizationNotes = [
  "Protein content can be configured for daily nutrition, post-workout recovery, or lighter refreshment use cases.",
  "Flavour intensity can be tuned for venue preference, audience profile, and seasonal product campaigns."
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
