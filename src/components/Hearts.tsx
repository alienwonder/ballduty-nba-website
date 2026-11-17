"use client";

// Hearts on the Fan Battle poster (Nov 18, 2026, ballduty-nba/docs/
// Claude Code - Era/Plans/2026-11-18-Fan-Battle-Hearts-Plan.md). Anyone can
// tap a heart for a team, signed in or not. Hearts only ever add, and they
// never count towards who wins.
//
// HOW A TAP TRAVELS. Taps are counted here and sent in one go after a
// 2-second pause, at most 20 to a message, so a fan tapping fast sends a few
// messages, not dozens. The first message of a visit runs Cloudflare
// Turnstile, which most people never see, and the function hands back a pass
// that the later messages carry. If the visitor leaves mid-burst, the last
// taps go with the page as it closes.
//
// WHAT THE VISITOR SEES. The count on the button is the public file's,
// plus the visitor's own taps straight away, and it never goes down. When the
// file catches up it overtakes. Taps the function drops over a limit still
// show on the visitor's own screen, so a cheater can't easily tell what got
// through.
//
// THE THANK-YOU. After the first message goes through, the Back panel opens
// to thank them and invite them into the app, once per Fan Battle per
// browser. The browser remembers it has shown; if it forgets, the visitor
// just sees it again.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useOpenPanel } from "@/components/GetAppPanel";
import { fmt, type Game, type Side } from "@/lib/fanBattle";
import type { HeartsConfig } from "@/lib/heartsConfig";
import { nickname } from "@/lib/teams";

const HeartsContext = createContext<HeartsConfig | null>(null);

export function HeartsProvider({ config, children }: { config: HeartsConfig | null; children: React.ReactNode }) {
  return <HeartsContext.Provider value={config}>{children}</HeartsContext.Provider>;
}

/** Whether hearts show for this game: switched on, in the file, and still open. */
export function useHeartsOpen(game: Game): boolean {
  const config = useContext(HeartsContext);
  return Boolean(config && game.hearts && game.state !== "final");
}

const PAUSE_MS = 2000;
const PER_MESSAGE = 20;

// ─── Turnstile and the pass, shared by every button on the page ─────────────

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widget: string) => void;
  reset: (widget: string) => void;
  remove: (widget: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let pass: string | null = null;
let scriptLoading: Promise<Turnstile> | null = null;

function loadTurnstile(): Promise<Turnstile> {
  if (scriptLoading) return scriptLoading;
  scriptLoading = new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile")));
    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("turnstile didn't load"));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

/** One Turnstile token. If Cloudflare needs the visitor to tick a box, it shows at the bottom of the screen. */
async function turnstileToken(siteKey: string): Promise<string> {
  const turnstile = await loadTurnstile();
  const box = document.createElement("div");
  box.className = "fixed bottom-4 left-1/2 -translate-x-1/2 z-50";
  document.body.appendChild(box);
  let widget: string | null = null;
  try {
    return await new Promise<string>((resolve, reject) => {
      widget = turnstile.render(box, {
        sitekey: siteKey,
        appearance: "interaction-only",
        execution: "execute",
        callback: (token: string) => resolve(token),
        "error-callback": () => reject(new Error("turnstile error")),
        "timeout-callback": () => reject(new Error("turnstile timeout")),
      });
      turnstile.execute(widget);
    });
  } finally {
    if (widget) turnstile.remove(widget);
    box.remove();
  }
}

type Answer = { ok: boolean; accepted?: number; pass?: string; reason?: string };

// Messages go one at a time across the whole page, so two buttons tapped
// together don't both run the check before either has a pass.
let queue: Promise<unknown> = Promise.resolve();

function send(config: HeartsConfig, gameId: string, team: string, count: number, keepalive = false): Promise<Answer | null> {
  if (keepalive) return sendNow(config, gameId, team, count, true);
  const next = queue.then(() => sendNow(config, gameId, team, count));
  queue = next.catch(() => null);
  return next;
}

/** Sends one message, running the check when there's no pass or it's run out. */
async function sendNow(config: HeartsConfig, gameId: string, team: string, count: number, keepalive = false): Promise<Answer | null> {
  const post = async (extra: Record<string, string>) => {
    const res = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, team, count, ...extra }),
      keepalive,
    });
    return (await res.json()) as Answer;
  };
  try {
    let answer = pass ? await post({ pass }) : null;
    if (!answer || answer.reason === "pass-expired" || answer.reason === "check-needed") {
      if (keepalive) return answer; // No time to run the check as the page closes.
      pass = null;
      answer = await post({ turnstile: await turnstileToken(config.siteKey) });
    }
    if (answer.pass) pass = answer.pass;
    return answer;
  } catch {
    return null; // Offline, or Cloudflare didn't load: the taps just don't count.
  }
}

// ─── The thank-you, once per Fan Battle per browser ─────────────────────────

function thanked(gameId: string): boolean {
  try {
    return localStorage.getItem(`hearts-thanked:${gameId}`) === "1";
  } catch {
    return false;
  }
}

function rememberThanks(gameId: string) {
  try {
    localStorage.setItem(`hearts-thanked:${gameId}`, "1");
  } catch {
    // Private window or blocked storage: they may see it again, which is fine.
  }
}

// ─── The button ─────────────────────────────────────────────────────────────

export function HeartButton({ game, side }: { game: Game; side: Side }) {
  const config = useContext(HeartsContext);
  const openPanel = useOpenPanel();
  const fileCount = game.hearts?.[side.code] ?? 0;
  const [shown, setShown] = useState(fileCount);
  const [bump, setBump] = useState(0);
  const pending = useRef(0);
  const mine = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sending = useRef(false);

  // The file's count moves on; the shown count never goes down.
  useEffect(() => setShown((n) => Math.max(n, fileCount)), [fileCount]);

  const flush = useCallback(async () => {
    if (!config || sending.current || pending.current === 0) return;
    sending.current = true;
    let firstOk = false;
    while (pending.current > 0) {
      const count = Math.min(pending.current, PER_MESSAGE);
      pending.current -= count;
      const answer = await send(config, game.gameId, side.code, count);
      if (answer?.ok) firstOk = true;
      else if (answer?.reason === "closed") break;
    }
    sending.current = false;
    if (firstOk && !thanked(game.gameId)) {
      rememberThanks(game.gameId);
      openPanel({
        kind: "hearts",
        code: side.code,
        team: nickname(side.code, side.name),
        sent: mine.current,
        live: game.state === "live",
      });
    }
  }, [config, game.gameId, game.state, side.code, side.name, openPanel]);

  // Taps still waiting when the page closes go with it.
  useEffect(() => {
    const leaving = () => {
      if (!config || pending.current === 0 || !pass) return;
      const count = Math.min(pending.current, PER_MESSAGE);
      pending.current = 0;
      void send(config, game.gameId, side.code, count, true);
    };
    window.addEventListener("pagehide", leaving);
    return () => window.removeEventListener("pagehide", leaving);
  }, [config, game.gameId, side.code]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const tap = () => {
    pending.current += 1;
    mine.current += 1;
    setShown((n) => n + 1);
    setBump((b) => b + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void flush(), PAUSE_MS);
  };

  const team = nickname(side.code, side.name);
  return (
    <button
      type="button"
      onClick={tap}
      aria-label={`Send a heart to ${team} fans. ${fmt(shown)} so far.`}
      className="group inline-flex items-center gap-2 rounded-full bg-black/35 hover:bg-black/50 px-3.5 h-10 text-white font-condensed font-bold text-lg tabular-nums transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <svg
        key={bump}
        aria-hidden
        viewBox="0 0 24 24"
        className="h-5 w-5 fill-[#ff4d6d] motion-safe:animate-[heart-pop_300ms_ease-out]"
      >
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 4.4 2.5.8-1.4 2.3-2.5 4.4-2.5 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
      {fmt(shown)}
    </button>
  );
}

/** The hearts on a finished game: "Fans sent 1,240 hearts to the Blazers and 980 to the Knicks." */
export function HeartsResult({ game }: { game: Game }) {
  if (!game.hearts) return null;
  const a = game.hearts[game.away.code];
  const h = game.hearts[game.home.code];
  if (a + h === 0) return null;
  const word = (n: number) => (n === 1 ? "heart" : "hearts");
  return (
    <p className="text-white/70">
      Visitors sent {fmt(a)} {word(a)} to the {nickname(game.away.code, game.away.name)} and {fmt(h)}{" "}
      to the {nickname(game.home.code, game.home.name)}. Hearts are cheers, not points.
    </p>
  );
}
