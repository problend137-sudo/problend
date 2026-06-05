export type LegalPage = {
  slug: "privacy-policy" | "terms-and-conditions" | "cancellation-and-refunds" | "shipping-policy";
  title: string;
  summary: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary:
      "This policy explains how JKK Enterprises and ProBlend collect, use, and protect information shared through public business enquiries and website interactions.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We may collect contact information such as name, phone number, email address, company or institution, and messages submitted to ProBlend.",
          "We may collect usage data such as pages visited, device information, browser type, approximate location, and interaction timestamps."
        ]
      },
      {
        heading: "How information is used",
        body: [
          "Information is used to respond to enquiries, evaluate business placement conversations, improve website experience, and communicate about ProBlend products and services.",
          "Usage data may help us understand public interest, maintain website reliability, and improve customer and partner communication."
        ]
      },
      {
        heading: "Cookies and third-party links",
        body: [
          "The website may use cookies or similar technologies to support basic functionality and understand usage patterns.",
          "External links may lead to third-party websites. ProBlend is not responsible for the privacy practices or content of those third-party sites."
        ]
      },
      {
        heading: "Security, rights, and changes",
        body: [
          "We use reasonable safeguards to protect submitted information, but no internet transmission or storage system can be guaranteed as completely secure.",
          "Users may contact ProBlend to request corrections or raise questions about information shared with us.",
          "This policy may be updated from time to time. Updated content will be posted on this page."
        ]
      },
      {
        heading: "Contact",
        body: ["For privacy questions, contact ProBlend at problend0@gmail.com or K-18 Green Park Extension, New Delhi-110016."]
      }
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    summary:
      "These terms describe public website use, ProBlend product access, and business placement discussions with JKK Enterprises.",
    sections: [
      {
        heading: "Business and partner terms",
        body: [
          "Machine placement, revenue sharing, commission, lease, purchase, distribution, co-branding, and sampling discussions are subject to written commercial terms agreed with ProBlend.",
          "Venue partners are expected to provide suitable space, utilities, access permissions, and site readiness where applicable."
        ]
      },
      {
        heading: "Machine placement and operations",
        body: [
          "ProBlend may handle installation, stocking, maintenance, updates, and hygiene processes according to the agreed placement model.",
          "Commercial terms, machine ownership, servicing responsibilities, branding rights, and operational timelines must be confirmed in writing before deployment."
        ]
      },
      {
        heading: "End-customer product and payment terms",
        body: [
          "Customers should review available product, nutritional, allergen, price, and payment information before purchase.",
          "Digital payments may be processed through UPI, cards, wallets, or other available payment methods at the machine or approved interface."
        ]
      },
      {
        heading: "Health, liability, and intellectual property",
        body: [
          "ProBlend products are wellness and nutrition products, not medical advice. Customers with allergies, medical conditions, or dietary restrictions should consult appropriate professionals before consumption.",
          "ProBlend names, marks, machine experience, content, and branding belong to JKK Enterprises or their respective owners and may not be copied or reused without permission."
        ]
      },
      {
        heading: "Termination, jurisdiction, and contact",
        body: [
          "Business relationships may be terminated according to the written agreement between the parties.",
          "These terms are governed by the laws of India, with jurisdiction in New Delhi unless otherwise agreed in writing.",
          "For terms-related questions, contact ProBlend at problend0@gmail.com."
        ]
      }
    ]
  },
  {
    slug: "cancellation-and-refunds",
    title: "Cancellation & Refunds",
    summary:
      "This policy explains cancellation and refund handling for ProBlend product orders, machine placements, and installation-linked services.",
    sections: [
      {
        heading: "Cancellation before processing",
        body: [
          "Cancellations may be considered before an order, machine placement, delivery, or installation request has entered processing.",
          "Once processing begins, cancellation may be limited by procurement, preparation, logistics, or site-work already initiated."
        ]
      },
      {
        heading: "Partial refunds after processing",
        body: [
          "Where a cancellation is accepted after processing has begun, ProBlend may provide a partial refund after deducting applicable processing, logistics, installation, or service costs.",
          "Refund eligibility depends on the nature of the order, installation status, and agreed commercial terms."
        ]
      },
      {
        heading: "Refund timeline",
        body: [
          "Approved refunds are generally processed within 14-21 working days through the applicable payment or settlement method.",
          "Banking, payment gateway, or reconciliation delays may affect the exact credit date."
        ]
      },
      {
        heading: "No general refund after delivery or installation",
        body: [
          "General refunds are not available after delivery or installation unless required by written agreement or applicable law.",
          "For refund questions, contact ProBlend at problend0@gmail.com with relevant order or placement details."
        ]
      }
    ]
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    summary:
      "This policy outlines processing, delivery, installation, site readiness, and acceptance expectations for ProBlend machine and product logistics.",
    sections: [
      {
        heading: "Processing timeline",
        body: [
          "Orders and placement requests generally require 3-4 working days for processing before dispatch, installation scheduling, or next operational steps.",
          "Processing timelines may vary depending on product availability, machine readiness, location, documentation, and site requirements."
        ]
      },
      {
        heading: "Delivery and installation",
        body: [
          "Machine delivery or installation may take approximately 30-45 days, depending on site readiness, logistics, installation planning, and commercial agreement terms.",
          "Partners are expected to support site access, space allocation, electricity readiness, and other installation prerequisites."
        ]
      },
      {
        heading: "Inspection and acceptance",
        body: [
          "Delivery, installation, or handover may require inspection and acceptance by the relevant site or business representative.",
          "Any visible delivery or installation concerns should be raised promptly with ProBlend for review."
        ]
      },
      {
        heading: "Delivery liability",
        body: [
          "Delivery liability, risk transfer, and installation responsibilities are handled according to the applicable commercial agreement.",
          "For logistics questions, contact ProBlend at problend0@gmail.com."
        ]
      }
    ]
  }
] as const satisfies readonly LegalPage[];

export const getLegalPage = (slug: LegalPage["slug"]) => {
  const page = legalPages.find((item) => item.slug === slug);

  if (!page) {
    throw new Error(`Missing legal page content for ${slug}`);
  }

  return page;
};
