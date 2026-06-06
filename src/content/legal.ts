export type LegalPage = {
  slug: "privacy-policy" | "terms-and-conditions" | "cancellation-and-refunds" | "shipping-policy";
  title: string;
  description: string;
  sections: {
    heading?: string;
    body: string[];
  }[];
};

export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "Read ProBlend’s Privacy Policy to understand how we collect, use, and protect your data while ensuring a safe browsing experience.",
    sections: [
      {
        body: [
          "Effective Date: 24th August 2025",
          "At JKK Enterprises (“Company,” “we,” “our,” or “us”), we are committed to protecting the privacy of all visitors, partners, and customers who use our website and vending machine services. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website."
        ]
      },
      {
        heading: "Information We Collect",
        body: [
          "Personal Information: Name, email address, phone number, company details (only if you fill out forms, request demos, or contact us).",
          "Usage Information: IP address, browser type, device details, pages visited, and time spent on the site.",
          "Cookies & Tracking Data: To analyze website traffic, improve performance, and personalize user experience."
        ]
      },
      {
        heading: "Data Sharing & Disclosure",
        body: [
          "We respect your privacy and will never sell your personal data. Information may only be shared with:",
          "Service Providers: For hosting, analytics, payments, or technical support.",
          "Business Partners: For delivering our vending machine services and support.",
          "Legal Requirements: If disclosure is necessary to comply with applicable laws."
        ]
      },
      {
        heading: "Data Security",
        body: [
          "We use encryption, secure servers, and industry-standard practices to protect your personal information. While no system is completely foolproof, we regularly review and upgrade our security measures."
        ]
      },
      {
        heading: "Cookies & Analytics",
        body: [
          "Our website may use cookies and third-party analytics tools (like Google Analytics) to improve performance and provide insights into visitor behavior. You can manage or disable cookies through your browser settings."
        ]
      },
      {
        heading: "Your Rights",
        body: [
          "Depending on your location, you may have rights to:",
          "Access, correct, or request deletion of your personal information.",
          "Opt out of marketing communications at any time.",
          "Restrict or object to certain types of data processing.",
          "To exercise these rights, please contact us directly."
        ]
      },
      {
        heading: "Third-Party Links",
        body: [
          "Our website may include links to third-party websites. We are not responsible for the privacy practices or content of external sites."
        ]
      },
      {
        heading: "8. Changes to this Policy",
        body: ["We may update this Privacy Policy from time to time. The revised version will be posted on this page with a new “Effective Date.”"]
      },
      {
        heading: "Contact Us",
        body: [
          "If you have any questions about this Privacy Policy, please reach out to us:",
          "📩 problend0@gmail.com",
          "📞 +919810427184, +918586097112, +919810341994",
          "🏢 K-18 Green park Extension New Delhi-110016"
        ]
      }
    ]
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "Read ProBlend’s Terms & Conditions to understand our policies on orders, payments, shipping, installation, and returns. Clear guidelines for businesses partnering with our protein shake vending machine solutions",
    sections: [
      {
        body: [
          "These Terms & Conditions (“Terms”) govern all operations, placements, and purchases related to Pro Blend protein shake vending machines (“Machines”).",
          "By partnering with us or purchasing a shake, you agree to these Terms."
        ]
      },
      {
        heading: "Partner / B2B Terms",
        body: ["These terms apply to gyms, offices, colleges, or other locations where Pro Blend Machines are placed:"]
      },
      {
        heading: "1.1 Machine Placement",
        body: [
          "All Machines remain the property of Pro Blend.",
          "Placement locations must be mutually agreed for visibility and accessibility."
        ]
      },
      {
        heading: "1.2 Revenue & Commercial Terms",
        body: [
          "Revenue-sharing, commission, or rental agreements are defined in a separate placement agreement.",
          "All consumer payments are collected digitally via the Machine."
        ]
      },
      {
        heading: "1.3 Maintenance & Operation",
        body: [
          "Pro Blend is responsible for stocking, servicing, and maintenance.",
          "Partners provide access to power supply, internet (if required), and general site security."
        ]
      },
      {
        heading: "1.4 Branding & Intellectual Property",
        body: [
          "Machines display Pro Blend branding. Alterations require prior approval.",
          "All intellectual property (logos, software, recipes) remains the property of Pro Blend."
        ]
      },
      {
        heading: "1.5 Liability",
        body: [
          "Pro Blend is responsible for product quality and machine performance.",
          "Partners are not liable for consumer complaints unless caused by failure to provide utilities.",
          "Pro Blend is not liable for indirect losses or business disruptions."
        ]
      },
      {
        heading: "1.6 Termination",
        body: [
          "Either party may terminate with written notice, as per the agreed notice period.",
          "Pro Blend may remove Machines if terms are breached or the location is unsuitable."
        ]
      },
      {
        heading: "1.7 Governing Law",
        body: [
          "These terms are governed by the laws of [Insert Country/State].",
          "Disputes fall under the jurisdiction of courts in [Insert City]."
        ]
      },
      {
        heading: "End-Customer Terms",
        body: ["These terms apply to all consumers purchasing shakes from Pro Blend vending machines:"]
      },
      {
        heading: "2.1 Product Use",
        body: ["Shakes are for personal consumption only. Follow all instructions and warnings displayed."]
      },
      {
        heading: "2.2 Payment",
        body: [
          "All payments are processed digitally via the vending machine. Pro Blend is not responsible for payment failures caused by banks or networks."
        ]
      },
      {
        heading: "2.3 Health & Safety",
        body: ["Consume shakes responsibly. Check ingredients if you have allergies or dietary restrictions."]
      },
      {
        heading: "2.4 Machine Care",
        body: ["Do not tamper with or damage the machine. Misuse may be reported to authorities."]
      },
      {
        heading: "2.5 Liability",
        body: [
          "Pro Blend is not liable for indirect damages, personal injury from misuse, or allergic reactions.",
          "Liability is limited to replacement if a shake is faulty or defective."
        ]
      },
      {
        heading: "General Terms",
        body: [
          "Pro Blend reserves the right to update these Terms at any time. Updated terms will be posted on the website.",
          "By using our services or products, you agree to comply with the most recent version of these Terms."
        ]
      }
    ]
  },
  {
    slug: "cancellation-and-refunds",
    title: "Refund Policy",
    description:
      "Learn about ProBlend’s Cancellation & Refund Policy, including eligibility and procedures for vending machine orders.",
    sections: [
      {
        body: [
          "Placement orders can be canceled before processing begins; cancellations after processing may be partially refundable.",
          "Refunds are processed within 14–21 working days after approval, minus any costs incurred for customization, transport, or installation.",
          "Once a machine has been delivered or installed, cancellations or refunds are generally not available."
        ]
      }
    ]
  },
  {
    slug: "shipping-policy",
    title: "Shipping & Delivery Policy",
    description:
      "“Read ProBlend’s shipping policy for protein vending machines. Learn about delivery timelines, installation support, costs & smooth order fulfillment.",
    sections: [
      {
        body: ["At Pro Blend, we ensure timely delivery and professional placement of our protein shake vending machines at partner locations."]
      },
      {
        heading: "Order Processing",
        body: [
          "Once a placement agreement is confirmed, orders are processed within 3–4 working days.",
          "Any customizations or special requirements may slightly extend processing time."
        ]
      },
      {
        heading: "2. Delivery Time",
        body: [
          "Standard delivery and installation of machines takes 30–45 days from order confirmation.",
          "Delivery timelines may vary due to factors beyond our control, including transportation delays, customs (if applicable), or site accessibility."
        ]
      },
      {
        heading: "3. Installation & Setup",
        body: [
          "Pro Blend provides professional installation and basic training for staff (if required).",
          "Partners must ensure site readiness, including adequate space, power supply, and internet (if required)."
        ]
      },
      {
        heading: "4. Inspection & Acceptance",
        body: [
          "Upon delivery, partners should inspect the machine and report any visible damage immediately.",
          "Any operational issues will be addressed promptly by Pro Blend’s support team."
        ]
      },
      {
        heading: "5. Liability During Delivery",
        body: [
          "Pro Blend is responsible for ensuring machines are delivered in good working condition.",
          "Partners must provide access to the delivery site; delays or access issues may affect delivery schedules."
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

