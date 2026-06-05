import { problendAssets } from "@/content/assets";

export const products = [
  {
    slug: "belgian-chocolate",
    name: "Belgian Chocolate Protein Shake",
    description: "A rich chocolate protein shake for fresh, on-demand recovery.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["High protein", "Customizable", "Cashless"],
    accent: "#6b321f",
    visual: problendAssets.proteinPowder
  },
  {
    slug: "vanilla",
    name: "Vanilla Protein Shake",
    description: "A clean vanilla protein shake designed for daily fitness routines.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["Everyday", "Customizable", "Fresh"],
    accent: "#efe0c4",
    visual: problendAssets.machineCloseup
  },
  {
    slug: "mango",
    name: "Mango Protein Shake",
    description: "A fruit-forward protein shake for active campuses, gyms, and offices.",
    nutrition: { protein: "Configurable", sugar: "Low-sugar option", format: "Fresh shake" },
    tags: ["Refreshing", "Campus friendly", "Customizable"],
    accent: "#f1a93b",
    visual: problendAssets.heroGymMachine
  },
  {
    slug: "cola-electrolyte",
    name: "Cola Electrolyte Shake",
    description: "A functional electrolyte shake for hydration-led use cases.",
    nutrition: { protein: "Functional blend", sugar: "Diet-friendly option", format: "Fresh shake" },
    tags: ["Electrolytes", "Functional", "On demand"],
    accent: "#76252d",
    visual: problendAssets.machinePurchase
  }
] as const;

export const productCapabilities = [
  "Customizable protein content",
  "Customizable flavour intensity",
  "Branded experiences and co-branding",
  "Special promotions and seasonal offerings",
  "Functional blends with electrolytes, vitamins, and energy boosters"
] as const;
