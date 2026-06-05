export type ProBlendImage = {
  src: string;
  alt: string;
};

export const problendAssets = {
  logo: {
    src: "/images/problend/problend-logo-cropped.jpg",
    alt: "ProBlend logo"
  },
  heroGymMachine: {
    src: "/images/problend/hero-gym-machine.jpg",
    alt: "Green ProBlend vending machine inside a gym"
  },
  proteinPowder: {
    src: "/images/problend/protein-powder.jpg",
    alt: "Protein powder for fresh shake preparation"
  },
  machineInteraction: {
    src: "/images/problend/machine-interaction.jpg",
    alt: "Customer using a vending machine interface"
  },
  machinePurchase: {
    src: "/images/problend/machine-purchase.jpg",
    alt: "Cashless vending machine purchase keypad"
  },
  machineCloseup: {
    src: "/images/problend/machine-closeup.jpg",
    alt: "Close-up of ProBlend vending machine product selection"
  },
  machineFront: {
    src: "/images/problend/machine-front.jpg",
    alt: "Front view of a ProBlend protein vending machine"
  },
  behindScenes: {
    src: "/images/problend/behind-scenes.jpg",
    alt: "Behind-the-scenes wellness training moment"
  }
} as const satisfies Record<string, ProBlendImage>;

export const featureMoments = [
  {
    title: "Tailored to You",
    body:
      "Every individual has unique needs. ProBlend machines support variety and customization so each space can feel more wellness-oriented.",
    image: problendAssets.proteinPowder
  },
  {
    title: "Fuel Your Goals, Anytime",
    body:
      "Around-the-clock access to protein-rich nutrition keeps refueling quick and convenient without an extra staffed counter.",
    image: problendAssets.machineInteraction
  },
  {
    title: "Smart & Hygienic",
    body:
      "Automated, contactless, and technology-driven machines support freshness, reliability, and seamless operation.",
    image: problendAssets.machinePurchase
  }
] as const;

export const pageVisuals = {
  about: problendAssets.machineFront,
  howItWorks: problendAssets.machineInteraction,
  products: problendAssets.machineCloseup,
  business: problendAssets.heroGymMachine,
  contact: problendAssets.behindScenes
} as const;
