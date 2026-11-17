// The headline and one line above each Fan Battle on the home page. Server
// only: the page hands what this returns to the browser.
//
// They live in src/data/fan-battle-headlines.json, keyed by gameId, and ship
// with the site, so a new headline goes live with the next deploy. That's the
// approval step: CC drafts the words from the news before each battle, Pete
// reads them, and nothing reaches the site until he's happy. Fan Battles run
// once or twice a week, so a file in the repo is all this needs.
//
// A game with no entry gets plain wording (`headlineFor` in fanBattle.ts), so
// the page never waits on a headline.
//
// An entry whose text starts with "SAMPLE:" is for the sample files only, and
// is dropped on the production site.

import raw from "@/data/fan-battle-headlines.json";
import type { Headlines } from "@/lib/fanBattle";

const SAMPLE = /^SAMPLE:\s*/;

export function loadHeadlines(): Headlines {
  const isProduction = process.env.VERCEL_ENV === "production";
  const out: Headlines = {};
  for (const [gameId, e] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof e !== "object" || e === null) continue;
    const { headline, line } = e as Record<string, unknown>;
    if (typeof headline !== "string" || typeof line !== "string") continue;
    if (!headline.trim() || !line.trim()) continue;
    const isSample = SAMPLE.test(headline) || SAMPLE.test(line);
    if (isSample && isProduction) continue;
    out[gameId] = { headline: headline.replace(SAMPLE, ""), line: line.replace(SAMPLE, "") };
  }
  return out;
}
