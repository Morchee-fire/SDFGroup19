import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Non-USD / Non-EUR Stablecoins",
  description:
    "A directory of stablecoins outside the USD and EUR pairs — chains, TVL, and corridors.",
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
