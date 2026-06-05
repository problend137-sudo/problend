import { describe, expect, it } from "vitest";
import { problendAssets } from "@/content/assets";
import { caseStudies } from "@/content/case-studies";
import { legalPages } from "@/content/legal";
import { contactDetails, preservedCopy, publicNavigation } from "@/content/site";
import { products } from "@/content/products";

describe("ProBlend content preservation", () => {
  it("preserves core public copy from the original website", () => {
    expect(preservedCopy.heroHeadline).toBe("Fuel your fitness, one shake at a time.");
    expect(preservedCopy.heroBody).toContain("fresh protein shakes");
    expect(preservedCopy.positioning).toContain("Not Just Another Vending Machine");
    expect(preservedCopy.premiumLine).toBe("Premium Nutrition, On Demand.");
  });

  it("preserves official contact details and fixes the malformed phone number", () => {
    expect(contactDetails.email).toBe("problend0@gmail.com");
    expect(contactDetails.address).toBe("K-18 Green Park Extension, New Delhi-110016");
    expect(contactDetails.phones).toEqual(["+91 9810427184", "+91 8586097112", "+91 9810341994"]);
  });

  it("keeps real ProBlend products and excludes Wix demo store products", () => {
    expect(products.map((product) => product.name)).toEqual([
      "Belgian Chocolate Protein Shake",
      "Vanilla Protein Shake",
      "Mango Protein Shake",
      "Cola Electrolyte Shake"
    ]);
    expect(products).toHaveLength(4);
    expect(new Set(products.map((product) => product.slug)).size).toBe(products.length);

    const migratedProductText = products
      .flatMap((product) => [product.name, product.description, product.slug, ...product.tags])
      .join(" ");
    expect(migratedProductText).not.toMatch(
      /golf|baseball|cap|vase|tote|bag|eyeglasses|serum|diffuser|chair|t-shirt|sweater/i
    );
  });

  it("uses local ProBlend website imagery instead of hotlinked or placeholder public assets", () => {
    expect(Object.values(problendAssets)).toHaveLength(8);

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
      "Business Solutions",
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

  it("keeps the footer policy set and leaves case studies CMS-ready", () => {
    expect(legalPages.map((page) => page.slug)).toEqual([
      "privacy-policy",
      "terms-and-conditions",
      "cancellation-and-refunds",
      "shipping-policy"
    ]);
    expect(legalPages.map((page) => page.title)).toEqual([
      "Privacy Policy",
      "Terms & Conditions",
      "Cancellation & Refunds",
      "Shipping Policy"
    ]);
    expect(caseStudies).toEqual([]);
  });
});
