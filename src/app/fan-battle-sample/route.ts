// Serves the sample Fan Battle file to the browser, so the live-update code
// can be tried on a computer before the real file exists. Only answers when
// FAN_BATTLE_SAMPLE is set, which the production site ignores
// (see src/lib/fanBattleSource.ts). Everywhere else it's a plain 404.
//
// The file is read fresh on every request, so editing a sample while
// `npm run dev` is running shows up on an open page within one update.

import { readSample, sampleName } from "@/lib/fanBattleSource";

export const dynamic = "force-dynamic";

export async function GET() {
  const name = sampleName();
  if (!name || name === "none") return new Response("Not found", { status: 404 });
  return Response.json(await readSample(name), {
    headers: { "Cache-Control": "no-store" },
  });
}
