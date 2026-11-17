// Where the page sends hearts, and the Cloudflare Turnstile site key. Server
// only: the home page reads this and hands it to the browser.
//
// Hearts (Nov 18, 2026, ballduty-nba/docs/Claude Code - Era/Plans/
// 2026-11-18-Fan-Battle-Hearts-Plan.md) only show when TURNSTILE_SITE_KEY is
// set in Vercel. Without it the page shows no hearts at all, so the site can go
// live before the backend function and the key exist.
//
// With a sample file (FAN_BATTLE_SAMPLE), hearts go to /hearts-sample, a
// stand-in that answers like the real function, so the hearts and the pop-up
// can be tried on a computer without the backend. Cloudflare's test key
// 1x00000000000000000000BB always passes without showing anything.

import { sampleName } from "@/lib/fanBattleSource";

export type HeartsConfig = { url: string; siteKey: string };

const FUNCTION_URL =
  "https://us-central1-ballduty-webhook-test.cloudfunctions.net/giveFanBattleHearts";

export function heartsConfig(): HeartsConfig | null {
  const siteKey = process.env.TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return { url: sampleName() ? "/hearts-sample" : FUNCTION_URL, siteKey };
}
