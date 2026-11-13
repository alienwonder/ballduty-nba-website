// Where the pages get the Fan Battle file. Server only.
//
// On the live site it's the public file in the bucket, fetched when a page is
// built and again at most every 30 seconds after that. If the file is missing
// or broken, the pages show "the next Fan Battle is coming soon" rather than
// an error, so the site works before the server writes its first file.
//
// For local work and preview builds, FAN_BATTLE_SAMPLE swaps in one of the
// sample files in src/data/fan-battle-samples/:
//
//   FAN_BATTLE_SAMPLE=upcoming npm run dev   # before the game
//   FAN_BATTLE_SAMPLE=live npm run dev       # during it
//   FAN_BATTLE_SAMPLE=final npm run dev      # after it
//   FAN_BATTLE_SAMPLE=none npm run dev       # no file yet
//
// It's ignored on the production site, whatever it's set to.

import fs from "node:fs/promises";
import path from "node:path";
import { EMPTY_FILE, FAN_BATTLE_URL, parseFanBattle, type FanBattleFile } from "@/lib/fanBattle";

const SAMPLES = ["upcoming", "live", "final", "none"] as const;
export type SampleName = (typeof SAMPLES)[number];

/** The sample in use, or null on the live site. */
export function sampleName(): SampleName | null {
  if (process.env.VERCEL_ENV === "production") return null;
  const name = process.env.FAN_BATTLE_SAMPLE as SampleName | undefined;
  return name && SAMPLES.includes(name) ? name : null;
}

/** Where the browser goes for a fresh copy while a game is on. */
export function liveUpdateUrl(): string {
  return sampleName() ? "/fan-battle-sample" : FAN_BATTLE_URL;
}

export async function readSample(name: SampleName): Promise<unknown> {
  if (name === "none") return null;
  const file = path.join(process.cwd(), "src", "data", "fan-battle-samples", `${name}.json`);
  return JSON.parse(await fs.readFile(file, "utf8"));
}

export async function getFanBattle(): Promise<FanBattleFile> {
  const sample = sampleName();
  if (sample) return parseFanBattle(await readSample(sample));
  try {
    const res = await fetch(FAN_BATTLE_URL, { next: { revalidate: 30 } });
    if (!res.ok) return EMPTY_FILE;
    return parseFanBattle(await res.json());
  } catch {
    return EMPTY_FILE;
  }
}
