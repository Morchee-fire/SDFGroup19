import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stable Reef — Non-USD / Non-EUR Stablecoins",
  description:
    "A directory of fiat- and treasury-backed stablecoins outside of USD and EUR — chains, TVL, and payment corridors.",
  openGraph: {
    title: "Stable Reef",
    description:
      "Stablecoins beyond the dollar — chains, TVL, and corridors at a glance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
