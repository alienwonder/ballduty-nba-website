"use client";

// The home page's Fan Battle sections (plan section 3). The server hands over
// the file as it was when the page was built, and while a game is on, or
// starts within the hour, the browser fetches a fresh copy every 25 seconds.
// It stops when the tab is hidden, and if a fetch fails it keeps what it has.
//
// On the live site the browser reads the file straight from the bucket, which
// needs the bucket's CORS rule for ballduty.com (plan section 8a). Until that
// rule is in, the fetch fails quietly and the page updates only when it's
// reloaded.

import Link from "next/link";
import { useEffect, useState } from "react";
import { CourtLines, FeaturedCard, GameRow, Label, TopList, Versus, resultsHref } from "@/components/FanBattleCards";
import GameTime from "@/components/GameTime";
import { HeartsProvider } from "@/components/Hearts";
import type { HeartsConfig } from "@/lib/heartsConfig";
import StoreBadges from "@/components/StoreBadges";
import { arrangeHome, needsLiveUpdates, parseFanBattle, resultLine, type FanBattleFile, type Headlines } from "@/lib/fanBattle";
import { sideColours } from "@/lib/teams";

const EVERY = 25_000;

function useLiveFile(initial: FanBattleFile, url: string): FanBattleFile {
  const [file, setFile] = useState(initial);
  const live = needsLiveUpdates(file);

  useEffect(() => {
    if (!live) return;
    let stopped = false;
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return;
        const next = parseFanBattle(await res.json());
        if (!stopped) setFile(next);
      } catch {
        // Offline, or the bucket won't share the file with this site yet.
      }
    };
    const timer = setInterval(refresh, EVERY);
    // Coming back to the tab after a while fetches straight away.
    document.addEventListener("visibilitychange", refresh);
    return () => {
      stopped = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [live, url]);

  return file;
}

const section = "max-w-site mx-auto px-4 sm:px-6 lg:px-8";
const h2 = "font-display text-3xl sm:text-4xl";

export default function FanBattleHome({
  initial,
  liveUpdateUrl,
  headlines,
  hearts,
}: {
  initial: FanBattleFile;
  liveUpdateUrl: string;
  headlines: Headlines;
  hearts: HeartsConfig | null;
}) {
  const file = useLiveFile(initial, liveUpdateUrl);
  const { featured, next, others, lastResult } = arrangeHome(file);

  return (
    <HeartsProvider config={hearts}>
      <div>
        <section className="bg-[var(--night)] text-white">
          <div className={`${section} pt-10 pb-14 sm:pt-16 sm:pb-20`}>
            {featured ? <FeaturedCard game={featured} headlines={headlines} /> : <NothingScheduled />}
            {next && (
              <div className="mt-14 max-w-[640px] mx-auto text-left">
                <p className="font-condensed font-bold uppercase tracking-[0.2em] text-sm text-white/60 mb-3">
                  Next Fan Battle
                </p>
                <div className="border border-white/15 rounded-2xl">
                  <GameRow game={next} headlines={headlines} />
                </div>
              </div>
            )}
          </div>
        </section>

        {others.length > 0 && (
          <section className={`${section} pt-14 sm:pt-20`}>
            <h2 className={h2}>This week&rsquo;s Fan Battles</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {others.map((g) => (
                <GameRow key={g.gameId} game={g} headlines={headlines} />
              ))}
            </div>
          </section>
        )}

        {lastResult && (
          <section className={`${section} pt-14 sm:pt-20`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h2 className={h2}>Last result</h2>
              <Link href="/results" className="font-semibold text-[var(--accent-ink)] underline underline-offset-4">
                All results
              </Link>
            </div>
            <LastResult game={lastResult} />
          </section>
        )}

        <section className={`${section} py-14 sm:py-20`}>
          <div id="get-the-app" className="scroll-mt-32 rounded-2xl bg-white border border-[var(--border)] p-6 sm:p-10 text-center">
            <h2 className={h2}>New to NextBucket?</h2>
            <p className="mt-4 text-lg leading-relaxed max-w-[640px] mx-auto">
              NextBucket is a free game you play on your phone while you watch the NBA. Every time
              the ball goes in, you call who scores the next basket, and the earlier you call it,
              the more it pays.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              <Link href="/how-to-play" className="text-[var(--accent-ink)] underline underline-offset-2">
                How to play
              </Link>
            </p>
            <div className="mt-8">
              <StoreBadges />
            </div>
          </div>
        </section>
      </div>
    </HeartsProvider>
  );
}

// No Fan Battle to show: every game in the file has finished (and quiet
// finals are hidden), and the next one isn't nominated yet. Rather than a
// near-empty block, a poster in the same style as a real one, with "you" and
// "them" for the sides, then the three steps of a Fan Battle.
const COMING_SOON_FILL = ["#C2410C", "#3730A3"] as const;
const COMING_SOON_SHADOW = ["#7C2D12", "#1E1B4B"] as const;

const STEPS = [
  { title: "Pick your side", text: "Back your team in NextBucket before tip-off. It's free." },
  { title: "Call the next basket", text: "While you watch, call who scores next. Every call you land adds to your side's score." },
  { title: "The best 10 decide it", text: "Each side's best 10 players are added up, and the bigger total wins." },
];

function NothingScheduled() {
  return (
    <div>
      <Label>NBA Fan Battles</Label>
      <h2 className="mt-3 font-condensed italic font-black uppercase leading-[0.92] tracking-[-0.01em] text-[2.2rem] sm:text-5xl lg:text-6xl max-w-[22ch] [text-wrap:balance]">
        Your fanbase against theirs.
      </h2>
      <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-[60ch]">
        We pick an NBA game, and the fans of both teams battle it out in NextBucket while they watch.
      </p>

      <div
        className="relative mt-8 overflow-hidden rounded-lg"
        style={{ background: `linear-gradient(100deg, ${COMING_SOON_FILL[0]} 0 50%, ${COMING_SOON_FILL[1]} 50% 100%)` }}
      >
        <CourtLines />
        <div className="relative grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-4 px-4 pt-6 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
          <Versus />
          <ComingSoonSide label="Your fanbase" word="You" shadow={COMING_SOON_SHADOW[0]} align="left" />
          <ComingSoonSide label="Their fanbase" word="Them" shadow={COMING_SOON_SHADOW[1]} align="right" />
        </div>
        <div className="relative bg-black/55 px-4 py-4 sm:px-8 sm:py-5">
          <p className="text-center font-condensed font-bold uppercase tracking-[0.15em] text-sm sm:text-base text-white/90">
            Next Fan Battle coming soon. It goes up here before tip-off.
          </p>
        </div>
      </div>

      <ol className="mt-10 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[var(--accent)] font-condensed font-black text-xl text-[var(--accent)]">
              {i + 1}
            </span>
            <div>
              <p className="font-condensed font-bold uppercase tracking-[0.08em] text-lg text-white">{step.title}</p>
              <p className="mt-1 text-white/70">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <StoreBadges priority />
      </div>
    </div>
  );
}

function ComingSoonSide({ label, word, shadow, align }: { label: string; word: string; shadow: string; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <div className={`row-start-2 sm:row-start-1 ${right ? "sm:col-start-3 justify-items-end text-right" : "sm:col-start-1 justify-items-start text-left"} grid gap-1 min-w-0`}>
      <p className="font-condensed font-bold uppercase tracking-[0.15em] text-[11px] sm:text-sm leading-tight text-white/90">{label}</p>
      <p
        className="font-condensed italic font-black uppercase leading-[0.8] tracking-[-0.02em] text-[4.2rem] sm:text-[7rem] lg:text-[9rem] text-white"
        style={{ textShadow: `${right ? -4 : 4}px 4px 0 ${shadow}` }}
      >
        {word}
      </p>
    </div>
  );
}

function LastResult({ game }: { game: FanBattleFile["results"][number] }) {
  const line = resultLine(game);
  const colours = sideColours(game.away.code, game.home.code);
  return (
    <Link
      href={resultsHref(game)}
      className="mt-6 block rounded-2xl bg-[var(--night)] text-white p-6 sm:p-8 hover:ring-2 hover:ring-[var(--accent)] transition"
    >
      <p className="text-sm text-white/60">
        {game.away.code} @ {game.home.code}, <GameTime iso={game.scheduled} variant="day" />
      </p>
      <p className="mt-2 font-display text-3xl sm:text-4xl">{line.headline}</p>
      <p className="mt-2 text-white/80">{line.detail}</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {[game.away, game.home].map((side, i) => (
          <TopList
            key={side.code}
            side={side}
            entries={game.top[side.code].slice(0, 3)}
            colour={colours[i]}
            onDark
            title={`Top 3 for ${side.code}`}
          />
        ))}
      </div>
    </Link>
  );
}
