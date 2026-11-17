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
import { FeaturedCard, GameRow, TopList, resultsHref } from "@/components/FanBattleCards";
import GameTime from "@/components/GameTime";
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
}: {
  initial: FanBattleFile;
  liveUpdateUrl: string;
  headlines: Headlines;
}) {
  const file = useLiveFile(initial, liveUpdateUrl);
  const { featured, next, others, lastResult } = arrangeHome(file);

  return (
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
  );
}

function NothingScheduled() {
  return (
    <div className="text-center">
      <p className="font-condensed font-bold uppercase tracking-[0.2em] text-[var(--accent)] text-sm sm:text-base">
        NBA Fan Battles
      </p>
      <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-[1.05]">Your fanbase against theirs.</h2>
      <p className="mt-5 text-lg text-white/75 max-w-[600px] mx-auto">
        We pick a game, and the fans of both teams call the next basket in NextBucket while they
        watch. Each side&rsquo;s best 10 players are added up, and the bigger total wins. The next
        Fan Battle is coming soon.
      </p>
      <div className="mt-10">
        <StoreBadges priority />
      </div>
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
