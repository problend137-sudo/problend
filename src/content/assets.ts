export type ProBlendImage = {
  src: string;
  alt: string;
};

export const problendAssets = {
  logo: {
    src: "/images/problend/problend-logo-cropped.jpg",
    alt: "ProBlend logo"
  },
  generatedHeroGymMachineWide: {
    src: "/images/problend/generated/hero-gym-machine-wide.png",
    alt: "Green ProBlend protein shake machine inside a dark gym"
  },
  generatedMachineInteractionPayment: {
    src: "/images/problend/generated/machine-interaction-payment.png",
    alt: "Customer selecting a shake on the ProBlend touchscreen and cashless payment area"
  },
  generatedOperationsRestocking: {
    src: "/images/problend/generated/operations-restocking.png",
    alt: "ProBlend operator servicing and cleaning a protein shake machine"
  },
  generatedMachineProductPortrait: {
    src: "/images/problend/generated/machine-product-portrait.png",
    alt: "Front view of a green ProBlend smart protein shake machine"
  },
  generatedShakeDispensing: {
    src: "/images/problend/generated/shake-dispensing.png",
    alt: "ProBlend machine dispensing a fresh protein shake"
  },
  generatedMachineUpiGym: {
    src: "/images/problend/generated/machine-upi-gym.png",
    alt: "Customer paying by UPI at a ProBlend machine in a gym"
  },
  generatedVenuePlacementProof: {
    src: "/images/problend/generated/venue-placement-proof.png",
    alt: "ProBlend machine placed in a fitness venue reception area"
  },
  heroGymMachine: {
    src: "/images/problend/generated/hero-gym-machine-wide.png",
    alt: "Green ProBlend protein shake machine inside a dark gym"
  },
  machineCloseup: {
    src: "/images/problend/generated/machine-interaction-payment.png",
    alt: "Customer selecting a shake on the ProBlend touchscreen and cashless payment area"
  },
  machineFront: {
    src: "/images/problend/generated/machine-product-portrait.png",
    alt: "Front view of a green ProBlend smart protein shake machine"
  }
} as const satisfies Record<string, ProBlendImage>;
