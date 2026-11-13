import type { Metadata } from "next";
import Link from "next/link";
import { resultsHref } from "@/components/FanBattleCards";
import LocalTime from "@/components/LocalTime";
import { fanbase, fmt, winCounts } from "@/lib/fanBattle";
import { getFanBattle } from "@/lib/fanBattleSource";
import { nickname, sideColours } from "@/lib/teams";

// Every Fan Battle so far, newest first, with wins by fanbase at the top
// (plan section 3). Each row opens the game's own page, which is the link
// posted back to both subreddits after the game.
export const revalidate = 30;

export const metadata: Metadata = {
  title: "Fan Battle results",
  description: "Every NBA Fan Battle on NextBucket so far, and which fanbases have won the most.",
};

export default async function ResultsPage() {
  const { results } = await getFanBattle();
  const wins = winCounts(results);

  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">Fan Battle results</h1>
      <p className="mt-4 text-[var(--muted)] max-w-[640px] leading-relaxed">
        Every Fan Battle so far, newest first. Results are published here with the leaderboard
        name and points of each side&rsquo;s top 10 players.
      </p>

      {results.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-white border border-[var(--border)] p-6 sm:p-8 text-lg">
          No Fan Battles have been played yet. The first result will be here the moment it&rsquo;s
          in.{" "}
          <Link href="/" className="text-[var(--accent-ink)] underline underline-offset-2">
            See the next Fan Battle
          </Link>
          .
        </p>
      ) : (
        <>
          <section className="mt-10" aria-labelledby="wins">
            <h2 id="wins" className="font-condensed font-bold uppercase tracking-[0.2em] text-sm text-[var(--muted)]">
              Wins by fanbase
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {wins.map((w) => (
                <li
                  key={w.code}
                  className="rounded-full bg-[var(--night)] text-white px-4 py-1.5 text-sm font-semibold"
                >
                  {nickname(w.code, w.name)} <span className="text-[var(--accent)] tabular-nums">{w.wins}</span>
                </li>
              ))}
            </ul>
          </section>

          <ol className="mt-10 space-y-3">
            {results.map((g) => {
              const winner = g.winner === g.away.code ? g.away : g.winner === g.home.code ? g.home : null;
              const [ca, ch] = sideColours(g.away.code, g.home.code);
              return (
                <li key={g.gameId}>
                  <Link
                    href={resultsHref(g)}
                    className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 rounded-2xl bg-white border border-[var(--border)] p-5 hover:border-[var(--accent)] transition-colors"
                  >
                    <span className="text-sm text-[var(--muted)] sm:w-36 shrink-0">
                      <LocalTime iso={g.scheduled} variant="date" />
                    </span>
                    <span className="font-condensed font-bold text-xl tracking-wide sm:w-32 shrink-0">
                      <span className="inline-block h-2.5 w-2.5 rounded-full mr-1.5 align-middle" style={{ background: ca }} aria-hidden />
                      {g.away.code} <span className="text-[var(--muted)]">@</span> {g.home.code}
                      <span className="inline-block h-2.5 w-2.5 rounded-full ml-1.5 align-middle" style={{ background: ch }} aria-hidden />
                    </span>
                    <span className="flex-1 font-semibold">{winner ? `${fanbase(winner)} win` : "Tie"}</span>
                    <span className="tabular-nums text-[var(--muted)]">
                      Best 10: {fmt(g.best10[g.away.code])} to {fmt(g.best10[g.home.code])}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
