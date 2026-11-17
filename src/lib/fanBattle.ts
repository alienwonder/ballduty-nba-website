// The Fan Battle file: its shape, a check that a file really has that shape,
// and the small rules the pages share for arranging and wording it.
//
// The server writes the file to the public bucket ballduty-nba-schedule
// (plan: ballduty-nba/docs/Claude Code - Era/Plans/2026-11-13-Fan-Battle-Plan.md,
// sections 3 and 6). The site never reads Firestore. The shape is the draft
// agreed with the server session on Nov 13, 2026, so if the server changes it,
// change `parseFanBattle` and the samples in src/data/fan-battle-samples/.
//
// This file is safe to use in the browser. Fetching lives in fanBattleSource.ts.

import { nickname } from "@/lib/teams";

export const FAN_BATTLE_URL =
  "https://storage.googleapis.com/ballduty-nba-schedule/fan-battle.json";

export type GameState = "upcoming" | "live" | "final";
export type Side = { code: string; name: string };
export type TopEntry = { name: string; points: number };

export type Game = {
  gameId: string;
  scheduled: string; // ISO time in UTC
  state: GameState;
  away: Side;
  home: Side;
  clock: { period: number; display: string } | null;
  fans: Record<string, number>;
  best10: Record<string, number>;
  top: Record<string, TopEntry[]>;
  winner: string | null;
  /**
   * Hearts from website visitors, by team code (Nov 18, 2026). Cheering only:
   * never part of the best 10 or the winner. Null in a file written before
   * hearts existed, and the page then shows no hearts.
   */
  hearts: Record<string, number> | null;
};

export type FanBattleFile = {
  updatedAt: string | null;
  games: Game[]; // this week's Fan Battles
  results: Game[]; // every finished Fan Battle, newest first
};

export const EMPTY_FILE: FanBattleFile = { updatedAt: null, games: [], results: [] };

// ─── Checking the file ──────────────────────────────────────────────────────
// A game that doesn't have the right shape is left out rather than breaking
// the page, so one bad record can't take the home page down.

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string" && v.length > 0;
const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

function parseSide(v: unknown): Side | null {
  if (!isObj(v) || !isStr(v.code) || !isStr(v.name)) return null;
  return { code: v.code.toUpperCase(), name: v.name };
}

function numbersFor(v: unknown, codes: string[]): Record<string, number> {
  const src = isObj(v) ? v : {};
  return Object.fromEntries(codes.map((c) => [c, isNum(src[c]) ? src[c] : 0]));
}

function topFor(v: unknown, codes: string[]): Record<string, TopEntry[]> {
  const src = isObj(v) ? v : {};
  return Object.fromEntries(
    codes.map((c) => {
      const list = Array.isArray(src[c]) ? (src[c] as unknown[]) : [];
      const entries = list
        .filter((e): e is Record<string, unknown> => isObj(e) && isStr(e.name) && isNum(e.points))
        .map((e) => ({ name: e.name as string, points: e.points as number }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);
      return [c, entries];
    }),
  );
}

function parseGame(v: unknown): Game | null {
  if (!isObj(v) || !isStr(v.gameId) || !isStr(v.scheduled)) return null;
  if (Number.isNaN(Date.parse(v.scheduled))) return null;
  if (v.state !== "upcoming" && v.state !== "live" && v.state !== "final") return null;
  const away = parseSide(v.away);
  const home = parseSide(v.home);
  if (!away || !home) return null;
  const codes = [away.code, home.code];
  const clock =
    isObj(v.clock) && isNum(v.clock.period) && typeof v.clock.display === "string"
      ? { period: v.clock.period, display: v.clock.display }
      : null;
  const winner = isStr(v.winner) && codes.includes(v.winner.toUpperCase()) ? v.winner.toUpperCase() : null;
  return {
    gameId: v.gameId,
    scheduled: v.scheduled,
    state: v.state,
    away,
    home,
    clock,
    fans: numbersFor(v.fans, codes),
    best10: numbersFor(v.best10, codes),
    top: topFor(v.top, codes),
    winner,
    hearts: isObj(v.hearts) ? numbersFor(v.hearts, codes) : null,
  };
}

function parseGames(v: unknown): Game[] {
  return Array.isArray(v) ? v.map(parseGame).filter((g): g is Game => g !== null) : [];
}

export function parseFanBattle(v: unknown): FanBattleFile {
  if (!isObj(v)) return EMPTY_FILE;
  const byTime = (a: Game, b: Game) => Date.parse(a.scheduled) - Date.parse(b.scheduled);
  return {
    updatedAt: isStr(v.updatedAt) ? v.updatedAt : null,
    games: parseGames(v.games).sort(byTime),
    results: parseGames(v.results)
      .filter((g) => g.state === "final")
      .sort((a, b) => byTime(b, a)),
  };
}

// ─── Arranging the home page ────────────────────────────────────────────────

export type HomeLayout = {
  featured: Game | null; // the top card
  next: Game | null; // shown under the top card when it's a result
  others: Game[]; // the rest of this week's Fan Battles
  lastResult: Game | null; // the newest result, unless the top card already shows it
};

/**
 * The top card is a live game if there is one. Otherwise it's a game that has
 * just finished, which the server keeps in `games` for a day or two, with the
 * next Fan Battle underneath. Otherwise it's the next game to start.
 *
 * A finished game only goes at the top, or in "Last result", when it had
 * enough fans (`ENOUGH_FANS`). A quiet one is left to the Results page.
 */
export function arrangeHome(file: FanBattleFile): HomeLayout {
  const { games, results } = file;
  const live = games.filter((g) => g.state === "live");
  const upcoming = games.filter((g) => g.state === "upcoming");
  const finals = games.filter((g) => g.state === "final" && hasEnoughFans(g));
  const featured = live[0] ?? finals[finals.length - 1] ?? upcoming[0] ?? null;
  const next = featured?.state === "final" ? (upcoming[0] ?? null) : null;
  const others = games.filter((g) => g !== featured && g !== next && g.state !== "final");
  const newest = results.find(hasEnoughFans) ?? null;
  const lastResult = newest && newest.gameId !== featured?.gameId ? newest : null;
  return { featured, next, others, lastResult };
}

/** Whether the page should keep asking for a fresh file: a game is on, or about to be. */
export function needsLiveUpdates(file: FanBattleFile, now = Date.now()): boolean {
  const HOUR = 60 * 60 * 1000;
  return file.games.some(
    (g) => g.state === "live" || (g.state === "upcoming" && Date.parse(g.scheduled) - now < HOUR),
  );
}

// ─── Wording ────────────────────────────────────────────────────────────────

export const fmt = (n: number) => n.toLocaleString("en-US");

export function fanbase(side: Side): string {
  return `${nickname(side.code, side.name)} fans`;
}

// ─── Headlines and thin numbers ─────────────────────────────────────────────

export type Headline = { headline: string; line: string };
export type Headlines = Record<string, Headline>;

/**
 * The headline above a Fan Battle: the approved one from
 * src/data/fan-battle-headlines.json if there is one (see headlines.ts),
 * otherwise plain wording built from the two fanbases.
 */
export function headlineFor(game: Game, headlines: Headlines): Headline {
  const written = headlines[game.gameId];
  if (written) return written;
  const a = fanbase(game.away);
  const h = fanbase(game.home);
  if (game.state === "live") {
    return {
      headline: `${a} against ${h}, live now.`,
      line: "Every call counts for your side. Each side's best 10 players are added up, and the bigger total wins.",
    };
  }
  return {
    headline: `${a} against ${h}.`,
    line: "Pick your side, call the next basket all game, and your side's best 10 players decide who wins.",
  };
}

/** The short line for a smaller card, or null when nobody has written one. */
export function cardLineFor(game: Game, headlines: Headlines): string | null {
  return headlines[game.gameId]?.line ?? null;
}

/**
 * Below this many fans across both sides, the home page doesn't show fan
 * counts or put the result at the top, because a quiet game ("1 fan v 0 fans")
 * makes the whole site look empty. The Results pages still list every game.
 */
export const ENOUGH_FANS = 20;

export function totalFans(game: Game): number {
  return game.fans[game.away.code] + game.fans[game.home.code];
}

export function hasEnoughFans(game: Game): boolean {
  return totalFans(game) >= ENOUGH_FANS;
}

/** "Q3", then "OT", "2OT" for overtimes. */
export function periodLabel(period: number): string {
  if (period <= 4) return `Q${period}`;
  return period === 5 ? "OT" : `${period - 4}OT`;
}

/**
 * The result in two parts, such as "Blazers fans win" and
 * "Best 10: 1,902 to 1,876, outnumbered 23 to 19". "Outnumbered" only shows
 * when the winning side had fewer fans, because that's the story.
 */
export function resultLine(game: Game): { headline: string; detail: string } {
  const { away, home, best10, fans, winner } = game;
  if (!winner) {
    return {
      headline: "It's a tie",
      detail: `Best 10: ${fmt(best10[away.code])} each, with ${fmt(fans[away.code])} ${away.code} fans and ${fmt(fans[home.code])} ${home.code} fans`,
    };
  }
  const win = winner === away.code ? away : home;
  const lose = winner === away.code ? home : away;
  const wf = fans[win.code];
  const lf = fans[lose.code];
  const crowd =
    wf < lf
      ? `, outnumbered ${fmt(lf)} to ${fmt(wf)}`
      : `, with ${fmt(wf)} fans to ${fmt(lf)}`;
  return {
    headline: `${fanbase(win)} win`,
    detail: `Best 10: ${fmt(best10[win.code])} to ${fmt(best10[lose.code])}${crowd}`,
  };
}

/** Wins by fanbase across every result, most first. Ties don't count for anyone. */
export function winCounts(results: Game[]): { code: string; name: string; wins: number }[] {
  const tally = new Map<string, { code: string; name: string; wins: number }>();
  for (const g of results) {
    if (!g.winner) continue;
    const side = g.winner === g.away.code ? g.away : g.home;
    const row = tally.get(side.code) ?? { code: side.code, name: side.name, wins: 0 };
    row.wins += 1;
    tally.set(side.code, row);
  }
  return [...tally.values()].sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));
}
