export const contactDetails = {
  email: "problend0@gmail.com",
  address: "K-18 Green park Extension New Delhi-110016",
  phones: ["+919810427184", "=918586097112", "+919810341994"]
} as const;

export const publicNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/product-offerings", label: "Product Offerings" },
  { href: "/business-solutions", label: "Partnership Platform" },
  { href: "/contact", label: "Contact Us" }
] as const;

export const publicCtas = {
  howItWorks: { href: "/how-it-works", label: "How it Works" },
  exploreFeatures: { href: "/product-offerings", label: "Explore Features" },
  contact: { href: "/contact", label: "Contact Us" },
  placementEstimate: { href: "/placement-estimate", label: "Run Placement Estimate" },
  partner: { href: "/business-solutions", label: "Share an opportunity" },
  submitVenue: { href: "/submit-venue", label: "Submit a Venue" },
  cityWaitlist: { href: "/city-waitlist", label: "Join a City Waitlist" },
  publishedOpportunities: { href: "/published-opportunities", label: "See open opportunities" },
  submitOpportunity: { href: "/business-solutions", label: "Share an opportunity" }
} as const;

export const publicRoutePaths = [
  "/",
  "/about",
  "/how-it-works",
  "/product-offerings",
  "/business-solutions",
  "/contact",
  "/placement-estimate",
  "/partner-with-problend",
  "/submit-venue",
  "/city-waitlist",
  "/published-opportunities",
  "/submit-opportunity",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cancellation-and-refunds",
  "/shipping-policy"
] as const;

export const workingHours = [
  { days: "Mon - Fri", hours: "9:00 am – 7:00 pm" },
  { days: "Saturday", hours: "9:00 am – 7:00 pm" },
  { days: "Sunday", hours: "9:00 am – 7:00 pm" }
] as const;

export const formContent = {
  title: "Let’s Work Together",
  body: "Get in touch so we can start working together.",
  fields: ["First Name", "Last Name", "Email", "Message"],
  submit: "Send",
  successText: "Thanks for submitting!"
} as const;

export const homeContent = {
  hero: {
    title: "Fuel your fitness, one shake at a time.",
    body: "Discover fresh protein shakes at your fingertips, anytime and anywhere."
  },
  positioning: {
    title: "Not Just Another Vending Machine",
    body:
      "A smart, customizable solution designed to bring health, convenience, and innovation to any space— redefining the way people access nutrition."
  },
  featureMoments: [
    {
      title: "Tailored to You",
      body:
        "Every individual has unique needs. Our machines allow full variety of shakes, ensuring everyone gets exactly what they want—making your space more engaging and wellness-oriented."
    },
    {
      title: "Fuel Your Goals, Anytime",
      body:
        "Around-the-clock access to protein-rich, nutritious shakes—providing quick, convenient refueling without the need for cafeterias or extra staff"
    },
    {
      title: "Smart & Hygienic",
      body:
        "Automated, contactless, and technology-driven machines ensure maximum hygiene, freshness, and reliability, with seamless operation and real-time monitoring"
    }
  ],
  story: {
    title: "Our Story",
    body:
      "ProBlend specializes in customizable protein shake vending machines, ensuring easy access to fresh, high-quality nutrition. Our automated, hygienic, and cashless solutions cater to various locations, from gyms to residences, providing 24/7 shake availability.",
    mediaQuotes: [
      "\"Here’s a closer look at our protein vending machine\"",
      "\"Behind the scenes: Where innovation meets wellness\""
    ]
  }
} as const;

export const aboutContent = {
  title: "About Us",
  heading: "Fueling Health, Anytime, Anywhere",
  body: [
    "At Pro Blend, we’re redefining how people access protein shakes. Our state-of-the-art vending machines bring high-quality, customizable shakes directly to gyms, offices, colleges, and other active spaces so you can enjoy nutrition on the go, anytime you want.",
    "We combine technology, convenience, and wellness:",
    "Founded on the belief that healthy living should be effortless, Pro Blend partners with businesses to make wellness accessible to everyone. Whether you’re hitting the gym, working late at the office, or on campus, our vending machines are here to keep you energized and on track.",
    "ProBlend – Premium Nutrition, On Demand."
  ],
  bullets: [
    "Smart Vending: Our machines are designed to serve fresh, delicious shakes quickly and hygienically.",
    "Customizable Nutrition: Choose from a variety of flavors and protein blends to match your fitness goals.",
    "Seamless Experience: Cashless, contactless, and easy-to-use — just select, pay, and enjoy."
  ],
  form: formContent
} as const;

export const howItWorksContent = {
  title: "How it Works",
  subhead: "“From selection to sip, Pro Blend makes healthy living effortless in just a few simple steps\"",
  cta: "Explore Features",
  intro: "Steps to follow",
  steps: [
    {
      number: "Step 1",
      title: "Choose Your Shake",
      body: [
        "Select from a variety of protein shakes — chocolate, vanilla, mango, or our cola electrolyte blend.",
        "Customize protein levels or add-ons if available."
      ]
    },
    {
      number: "Step 2",
      title: "Make Payment",
      body: [
        "Pay securely using cashless options like UPI, card, or mobile wallets.",
        "Payment is processed instantly and confirmed on the machine display."
      ]
    },
    {
      number: "Step 3",
      title: "Shake is Prepared",
      body: [
        "The vending machine mixes fresh ingredients on demand.",
        "Hygienic, fast, and precise — your shake is ready in under a minute."
      ]
    },
    {
      number: "Step 4",
      title: "Enjoy & Track",
      body: [
        "Take your shake and enjoy instant nutrition anywhere, anytime.",
        "Pro Blend handles all stocking, cleaning, and maintenance.",
        "Partners don’t need to worry about operations — machines are always ready for customers."
      ]
    }
  ],
  maintenanceTitle: "Machine Maintenance",
  maintenanceSubhead: "(Behind the Scenes)"
} as const;

export const productOfferingsContent = {
  title: "Our Product Offerings",
  heading: "What We Offer",
  conclusion:
    "Pro Blend delivers premium, on-demand nutrition, combining convenience, technology, and health in a fully automated solution."
} as const;

export const businessSolutionsContent = {
  title: "Partnership Platform",
  body:
    "Share a venue, city, network, or introduction. We'll review it and get back if it fits."
} as const;

export const platformAcquisitionContent = {
  hero: {
    title: "Help bring ProBlend to the right place.",
    body:
      "Share a venue, city, network, or introduction. We'll review it and get back if it fits."
  },
  actions: {
    primary: "Share an opportunity",
    secondary: "See open opportunities",
    estimate: "Run placement estimate"
  },
  formPrompt: "What do you have?",
  opportunityTypes: [
    {
      value: "venue",
      label: "A venue",
      body: "A gym, campus, office, residence, hospital, retail site, or other place ProBlend should review."
    },
    {
      value: "city_network",
      label: "A city or network",
      body: "A market, distributor network, operator group, or community where ProBlend should expand."
    },
    {
      value: "introduction",
      label: "An introduction",
      body: "A decision-maker, institution, company, or venue contact you can introduce to ProBlend."
    },
    {
      value: "open_brief",
      label: "An open ProBlend brief to answer",
      body: "A specific request from ProBlend that matches your access or capabilities."
    }
  ],
  board: {
    title: "Open Opportunities",
    body: "Places and partners ProBlend is looking for right now.",
    empty: "No open opportunities right now. You can still share one with us."
  },
  credibility: {
    statement: "You bring access. ProBlend brings the machine, setup, stocking, cleaning, payments, and support.",
    points: [
      "Built for gyms, campuses, offices, residences, and other active spaces.",
      "Cashless vending with fresh shakes prepared on demand.",
      "ProBlend handles setup, stocking, cleaning, and machine upkeep.",
      "Partners bring access, space, demand, or market reach."
    ]
  }
} as const;

export const contactPageContent = {
  title: "Contact Us",
  heading: "We’d love to hear from you!",
  body: "Whether you’re interested in our vending solutions, need support, or have business inquiries, our team is here to help.",
  socialLinks: ["Instagram", "Gmail"],
  workingHoursTitle: "Working Hours",
  form: formContent
} as const;

export const routeMetadata = {
  home: {
    title: "Home",
    description:
      "At ProBlend, we’re redefining how people access protein shakes. Our state-of-the-art vending machines bring high-quality, customizable shakes directly to gyms, offices, colleges, and other active spaces so you can enjoy nutrition on the go, anytime you want."
  },
  about: {
    title: "About Us",
    description:
      "Learn about ProBlend, helping businesses bring customizable protein shake vending machines to their spaces. Premium nutrition made simple & on demand."
  },
  howItWorks: {
    title: "How It Works",
    description:
      "Discover how ProBlend’s smart protein shake vending machines work — simple steps to customize, pay, and enjoy fresh nutrition on demand."
  },
  productOfferings: {
    title: "Product Offerings",
    description:
      "Explore ProBlend’s customizable protein shake vending machine solutions. Tailored for businesses, our smart machines deliver on-demand nutrition with convenience, hygiene, and variety."
  },
  businessSolutions: {
    title: "Partnership Platform",
    description:
      "Share a venue, city, network, or introduction with ProBlend, or respond to open ProBlend opportunities."
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with ProBlend to explore customizable protein shake vending machine solutions for your business. Let’s build smarter wellness together."
  },
  placementEstimate: {
    title: "Placement Estimate",
    description: "Prepare venue details for a ProBlend placement estimate conversation."
  },
  partnerWithProBlend: {
    title: "Partner with ProBlend",
    description: "Share a venue, city, network, or introduction with ProBlend."
  },
  submitVenue: {
    title: "Submit a Venue",
    description: "Submit a specific venue for ProBlend placement consideration."
  },
  cityWaitlist: {
    title: "Join a City Waitlist",
    description: "Register city or venue demand for future ProBlend availability."
  },
  publishedOpportunities: {
    title: "Open Opportunities",
    description: "Browse places and partners ProBlend is looking for right now."
  },
  submitOpportunity: {
    title: "Submit Opportunity",
    description: "Redirects to the ProBlend venue submission path."
  }
} as const;

export const venueTypes = ["Gyms", "Offices", "Universities", "Fitness centers"] as const;

export const placementModels = ["Revenue Sharing & Commission Models:", "lease-based placement"] as const;

export const currentCollaborationNeeds = platformAcquisitionContent.opportunityTypes.slice(0, 3).map((opportunityType) => ({
  title: opportunityType.label,
  body: opportunityType.body
}));
