// Both listings went live Oct 20, 2026. The App Store link has no country in it,
// so Apple sends each visitor to their own country's store.
// Badges are the official artwork, downloaded Oct 26, 2026 from Apple's marketing
// toolbox and Google Play's badge page. Google's PNG ships with a 41px transparent
// border, trimmed off so both badges can share one height; the artwork is unchanged.
export const APP_STORE = {
  name: "Download on the App Store",
  href: "https://apps.apple.com/app/id6759211498",
  src: "/badges/app-store.svg",
  width: 168,
};

export const GOOGLE_PLAY = {
  name: "Get it on Google Play",
  href: "https://play.google.com/store/apps/details?id=com.ballduty.app",
  src: "/badges/google-play.png",
  width: 188,
};

export const STORES = [APP_STORE, GOOGLE_PLAY];

export type Platform = "ios" | "android" | "other";

/** Which phone a visitor is on, from the browser's description of itself. */
export function platformFrom(userAgent: string, touchPoints = 0): Platform {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  // iPads ask for the desktop site and describe themselves as a Mac, but a
  // Mac has no touch screen.
  if (/Macintosh/i.test(userAgent) && touchPoints > 1) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "other";
}
