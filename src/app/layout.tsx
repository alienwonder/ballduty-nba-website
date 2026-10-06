import type { Metadata, Viewport } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NextBucket — call the next basket",
    template: "%s | NextBucket",
  },
  description:
    "NextBucket by BallDuty: watch a live NBA game and call who scores the next basket. The earlier you call it, the more it pays.",
  metadataBase: new URL("https://ballduty.com"),
  openGraph: {
    siteName: "NextBucket by BallDuty",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A1A1A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
