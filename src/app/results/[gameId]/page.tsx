import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BestTenBar, TopList } from "@/components/FanBattleCards";
import GameTime from "@/components/GameTime";
import { fmt, resultLine, type Game } from "@/lib/fanBattle";
import { getFanBattle } from "@/lib/fanBattleSource";
import { sideColours } from "@/lib/teams";

// One Fan Battle's result: both sides' top 10 and the turnout. This is the
// page posted back to both teams' subreddits the morning after (plan
// section 3), so its title and description are the result, for the preview
// Reddit shows under the link.
export const revalidate = 30;

type Props = { params: Promise<{ gameId: string }> };

// Listing the results known at build time makes these pages cached like the
// others (rebuilt at most every 30 seconds) rather than built on every visit.
// A game that finishes after the build is built on its first visit, then cached.
export async function generateStaticParams() {
  const { results } = await getFanBattle();
  return results.map((g) => ({ gameId: g.gameId }));
}

async function findResult(gameId: string): Promise<Game | null> {
  const { results } = await getFanBattle();
  return results.find((g) => g.gameId === decodeURIComponent(gameId)) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await findResult((await params).gameId);
  if (!game) return { title: "Fan Battle result" };
  const line = resultLine(game);
  return {
    title: `${line.headline}: ${game.away.code} @ ${game.home.code}`,
    description: `${line.detail}. ${game.away.name} at ${game.home.name}, an NBA Fan Battle on NextBucket.`,
  };
}

export default async function ResultPage({ params }: Props) {
  const game = await findResult((await params).gameId);
  if (!game) notFound();
  const line = resultLine(game);
  const colours = sideColours(game.away.code, game.home.code);
  const sides = [game.away, game.home];

  return (
    <div>
      <section className="bg-[var(--night)] text-white">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-16 text-center">
          <p className="font-condensed font-bold uppercase tracking-[0.2em] text-[var(--accent)] text-sm sm:text-base">
            NBA Fan Battle · {game.away.code} @ {game.home.code}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl leading-[1.05]">{line.headline}</h1>
          <p className="mt-4 text-lg sm:text-xl text-white/85">{line.detail}</p>
          <p className="mt-2 text-white/60">
            {game.away.name} at {game.home.name}, <GameTime iso={game.scheduled} variant="day" />
          </p>
          <div className="mt-10 max-w-[640px] mx-auto">
            <BestTenBar game={game} colours={colours} />
          </div>
        </div>
      </section>

      <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="font-display text-3xl sm:text-4xl">Turnout</h2>
        <p className="mt-3 text-lg">
          {sides.map((s, i) => (
            <span key={s.code}>
              {i > 0 && " and "}
              <strong>{fmt(game.fans[s.code])}</strong> backed {s.code}
            </span>
          ))}
          .
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sides.map((s, i) => (
            <TopList
              key={s.code}
              side={s}
              entries={game.top[s.code]}
              colour={colours[i]}
              title={`Top 10 for ${s.code} · ${fmt(game.best10[s.code])}`}
            />
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--muted)] max-w-[640px] leading-relaxed">
          Fan Battle points are points from calls plus any TV sync bonus. Players show by their
          leaderboard name, or their player number if they haven&rsquo;t chosen one.
        </p>
        <p className="mt-6">
          <Link href="/results" className="font-semibold text-[var(--accent-ink)] underline underline-offset-4">
            All results
          </Link>
        </p>
      </section>
    </div>
  );
}
