import type { Metadata } from "next";
import { Manrope, Saira_Condensed } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body"
});

const sairaCondensed = Saira_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: {
    default: "ProBlend | Premium Nutrition On Demand",
    template: "%s | ProBlend"
  },
  description:
    "Fresh, customizable protein shakes through smart, hygienic, cashless vending machines for gyms, offices, colleges, residences, and high-footfall venues.",
  metadataBase: new URL("https://www.problend.co.in")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${sairaCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
