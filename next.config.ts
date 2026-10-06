import type { NextConfig } from "next";

// The World Cup site moved to wc26.ballduty.com on the day this site took over
// ballduty.com. The WC26 app (still in the stores) and old social posts carry
// ballduty.com links, so every World Cup address is sent on to the same path
// there. The full list came from a search of the ballduty-wc26 repo on
// Oct 6, 2026 — see ballduty-nba/docs/Claude Code - Era/Plans/2026-10-06-BallDuty-NBA-Website.md.
const WC26 = "https://wc26.ballduty.com";

// Addresses that belong to the World Cup for good. Permanent, so search
// engines learn the new home.
const wc26Forever = [
  "/bold-calls",
  "/bold",
  "/claim",
  "/claim/:path*",
  "/club",
  "/clubpromo",
  "/guidelines",
  "/humans-vs-agents",
  "/humans-vs-agents/:path*",
  "/humans-vs-bots",
  "/wc26",
  "/wc26/:path*",
  "/b2b/:path*",
  "/api/notify",
  // Old site's images, shared in posts and emails.
  "/wc26-poster.png",
  "/competition-flyer-english.png",
  "/creative-a-english.png",
  "/hvb-banner.png",
  "/screenshots/:path*",
  "/marketing/:path*",
  "/upgrades/:path*",
  "/brand/:path*",
];

// Addresses this site will want for itself later (stage 2 builds /rules and
// /leaderboard). Temporary, because browsers remember a permanent redirect
// and would keep sending people to the World Cup page after ours exists.
const wc26ForNow = ["/rules", "/leaderboard", "/faq", "/about", "/pricing"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...wc26Forever.map((source) => ({
        source,
        destination: `${WC26}${source}`,
        permanent: true,
      })),
      ...wc26ForNow.map((source) => ({
        source,
        destination: `${WC26}${source}`,
        permanent: false,
      })),
      // The old site's one NBA page. The whole site is NBA now.
      { source: "/nba", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
