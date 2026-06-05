export const preservedCopy = {
  heroHeadline: "Fuel your fitness, one shake at a time.",
  heroBody: "Discover fresh protein shakes at your fingertips, anytime and anywhere.",
  positioning: "Not Just Another Vending Machine",
  positioningBody:
    "A smart, customizable solution designed to bring health, convenience, and innovation to any space, redefining the way people access nutrition.",
  premiumLine: "Premium Nutrition, On Demand.",
  companyStory:
    "ProBlend specializes in customizable protein shake vending machines that make fresh, high-quality nutrition easier to access in active spaces.",
  wellnessMission:
    "ProBlend partners with gyms, offices, colleges, residences, and high-footfall venues to make wellness more accessible through automated, hygienic, cashless machines available 24/7.",
  operationsPromise:
    "Choose a shake, pay securely, receive a fresh preparation on demand, and enjoy while ProBlend handles stocking, cleaning, maintenance, and machine updates."
} as const;

export const contactDetails = {
  email: "problend0@gmail.com",
  address: "K-18 Green Park Extension, New Delhi-110016",
  phones: ["+91 9810427184", "+91 8586097112", "+91 9810341994"]
} as const;

export const publicNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/product-offerings", label: "Product Offerings" },
  { href: "/business-solutions", label: "Business Solutions" },
  { href: "/contact", label: "Contact Us" }
] as const;

export const publicCtas = {
  exploreProducts: { href: "/product-offerings", label: "Explore Product Offerings" },
  howItWorks: { href: "/how-it-works", label: "How It Works" },
  placementEstimate: { href: "/placement-estimate", label: "Run Placement Estimate" },
  submitOpportunity: { href: "/submit-opportunity", label: "Submit Opportunity" },
  contact: { href: "/contact", label: "Contact Us" }
} as const;

export const workingHours = [
  { days: "Monday-Friday", hours: "9:00 am - 7:00 pm" },
  { days: "Saturday", hours: "9:00 am - 7:00 pm" },
  { days: "Sunday", hours: "Closed" }
] as const;

export const howItWorksSteps = [
  {
    title: "Choose a shake",
    body: "Select a fresh protein shake, flavour, and customization level from the machine interface."
  },
  {
    title: "Pay securely",
    body: "Pay through UPI, card, or mobile wallet without handling cash or slowing down the venue."
  },
  {
    title: "Prepared on demand",
    body: "The smart vending machine prepares the shake fresh with hygienic automated dispensing."
  },
  {
    title: "Enjoy and track",
    body: "Customers enjoy premium nutrition while ProBlend handles stocking, cleaning, maintenance, and remote updates."
  }
] as const;

export const machineCapabilities = [
  "Smart vending machines",
  "Cashless payments",
  "GPRS tracking",
  "Inventory monitoring",
  "Analytics for partner benefit",
  "Installation, stocking, and maintenance",
  "Nutritional information",
  "Low-sugar, high-protein, diet-friendly options",
  "Functional blends with electrolytes, vitamins, and energy boosters"
] as const;

export const placementModels = [
  "Revenue sharing",
  "Commission",
  "Lease-based models",
  "Purchase discussions",
  "Distribution partnerships",
  "Open commercial discussions"
] as const;

export const venueTypes = [
  "Gyms",
  "Offices",
  "Universities",
  "Fitness centers",
  "Residences",
  "Hospitals",
  "Malls",
  "Other high-footfall locations"
] as const;

export const currentCollaborationNeeds = [
  {
    title: "High-footfall wellness venues",
    body: "Gyms, offices, campuses, residences, hospitals, and malls with reliable space, utilities, and active consumer demand."
  },
  {
    title: "Regional introductions",
    body: "Entrepreneurs, distributors, and strategic introducers who can open credible access to multiple sites."
  },
  {
    title: "Co-branded nutrition moments",
    body: "Sampling, seasonal promotions, and branded wellness experiences for active communities."
  }
] as const;

export const routeMetadata = {
  home: {
    title: "Premium Nutrition On Demand",
    description: "Fresh, customizable protein shakes through smart, hygienic, cashless vending machines."
  },
  about: {
    title: "About Us",
    description: "Learn how ProBlend makes premium nutrition accessible through smart vending machines."
  },
  howItWorks: {
    title: "How It Works",
    description: "Choose, pay, receive a fresh shake, and let ProBlend manage operations."
  },
  productOfferings: {
    title: "Product Offerings",
    description: "Explore ProBlend protein shake flavours, customization, and smart machine capabilities."
  },
  businessSolutions: {
    title: "Business Solutions",
    description: "Bring ProBlend machines to gyms, offices, campuses, residences, and high-footfall venues."
  },
  contact: {
    title: "Contact Us",
    description: "Reach ProBlend for business placement, product, and partnership conversations."
  },
  placementEstimate: {
    title: "Placement Estimate",
    description: "Prepare venue details for a ProBlend placement estimate conversation."
  },
  submitOpportunity: {
    title: "Submit Opportunity",
    description: "Share a venue, distribution, or strategic introduction opportunity with ProBlend."
  }
} as const;
