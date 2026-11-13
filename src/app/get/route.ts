// ballduty.com/get sends a phone to its own store. The QR code in the Back
// panel points here (public/get-the-app-qr.svg, made by scripts/make-qr.mjs),
// so one code works for iPhone and Android. Anything else lands on the home
// page's store badges.

import { APP_STORE, GOOGLE_PLAY, platformFrom } from "@/lib/stores";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const platform = platformFrom(request.headers.get("user-agent") ?? "");
  const to =
    platform === "ios"
      ? APP_STORE.href
      : platform === "android"
        ? GOOGLE_PLAY.href
        : new URL("/#get-the-app", request.url).toString();
  // Temporary, so a browser never remembers where it was sent.
  return Response.redirect(to, 302);
}
