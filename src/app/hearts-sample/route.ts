// A stand-in for the giveFanBattleHearts function, for trying hearts on a
// computer with a sample file (src/lib/heartsConfig.ts). It answers the way
// the real one does: a pass on the first burst, then up to 20 hearts a burst
// accepted. It keeps nothing, so the counts on the page only move with the
// visitor's own taps. Only answers when FAN_BATTLE_SAMPLE is set, which the
// production site ignores; everywhere else it's a plain 404.

import { sampleName } from "@/lib/fanBattleSource";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const name = sampleName();
  if (!name || name === "none") return new Response("Not found", { status: 404 });
  const body = await request.json().catch(() => ({}));
  const count = Number(body.count);
  if (!Number.isInteger(count) || count < 1) {
    return Response.json({ ok: false, reason: "bad-request" });
  }
  if (!body.pass && !body.turnstile) return Response.json({ ok: false, reason: "check-needed" });
  const accepted = Math.min(count, 20);
  return Response.json(
    body.pass ? { ok: true, accepted } : { ok: true, accepted, pass: "sample-pass" },
  );
}
