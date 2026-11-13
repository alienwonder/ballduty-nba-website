// The pieces of a Fan Battle the home page and the results pages share: the
// big card at the top of the home page in its three states, the smaller card
// for the week's other games, the bar comparing the best-10 totals, and a
// side's top players.

import Link from "next/link";
import { BackButton, JoinButton } from "@/components/GetAppPanel";
import LocalTime from "@/components/LocalTime";
import { fanbase, fmt, periodLabel, resultLine, type Game, type Side, type TopEntry } from "@/lib/fanBattle";
import { sideColours } from "@/lib/teams";

export const BEST_10_RULE = "Each side's best 10 players are added up. The bigger total wins.";

export function resultsHref(game: Game) {
  return `/results/${encodeURIComponent(game.gameId)}`;
}

function Dot({ colour, className = "h-3 w-3" }: { colour: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ring-1 ring-white/30 ${className}`}
      style={{ background: colour }}
    />
  );
}

function fansText(n: number) {
  return n === 1 ? "1 fan" : `${fmt(n)} fans`;
}

/** "Blazers fans v Knicks fans", with each side's colour. */
function Fanbases({ game, colours }: { game: Game; colours: [string, string] }) {
  return (
    <h2 className="font-display text-4xl sm:text-6xl leading-[1.05]">
      <span className="inline-flex items-center gap-3">
        <Dot colour={colours[0]} className="h-4 w-4 sm:h-5 sm:w-5" />
        {fanbase(game.away)}
      </span>
      {/* On a phone the two fanbases stack, with the v on its own line. */}
      <span className="block my-1 sm:inline sm:my-0 sm:mx-3 text-white/40 text-2xl sm:text-4xl align-middle">v</span>
      <span className="inline-flex items-center gap-3">
        <Dot colour={colours[1]} className="h-4 w-4 sm:h-5 sm:w-5" />
        {fanbase(game.home)}
      </span>
    </h2>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-condensed font-bold uppercase tracking-[0.2em] text-[var(--accent)] text-sm sm:text-base">
      {children}
    </p>
  );
}

// ─── The top card ───────────────────────────────────────────────────────────

export function FeaturedCard({ game }: { game: Game }) {
  const colours = sideColours(game.away.code, game.home.code);
  return (
    <div className="text-center">
      {game.state === "upcoming" && <Upcoming game={game} colours={colours} />}
      {game.state === "live" && <Live game={game} colours={colours} />}
      {game.state === "final" && <Final game={game} colours={colours} />}
    </div>
  );
}

function Upcoming({ game, colours }: { game: Game; colours: [string, string] }) {
  return (
    <>
      <Label>Next NBA Fan Battle</Label>
      <div className="mt-4">
        <Fanbases game={game} colours={colours} />
      </div>
      <p className="mt-4 text-white/70">
        {game.away.name} at {game.home.name}
      </p>
      <p className="mt-1 text-lg sm:text-xl font-semibold">
        <LocalTime iso={game.scheduled} />
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 max-w-[520px] mx-auto">
        {[game.away, game.home].map((side, i) => (
          <div key={side.code} className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 sm:p-5">
            <p className="font-condensed font-bold text-3xl sm:text-4xl tracking-wide">{side.code}</p>
            <p className="text-sm text-white/70 mb-4">{fansText(game.fans[side.code])} so far</p>
            <BackButton code={side.code} colour={colours[i]} />
          </div>
        ))}
      </div>
      <p className="mt-6 text-white/70 max-w-[520px] mx-auto">{BEST_10_RULE}</p>
    </>
  );
}

function Live({ game, colours }: { game: Game; colours: [string, string] }) {
  return (
    <>
      <Label>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden />
          Live now
          {game.clock && (
            <span className="text-white/80">
              {" "}
              · {periodLabel(game.clock.period)} {game.clock.display}
            </span>
          )}
        </span>
      </Label>
      <div className="mt-4">
        <Fanbases game={game} colours={colours} />
      </div>
      <p className="mt-4 text-white/70">
        {game.away.name} at {game.home.name}
      </p>
      <div className="mt-8 max-w-[640px] mx-auto">
        <BestTenBar game={game} colours={colours} />
      </div>
      <p className="mt-6 text-white/70 max-w-[520px] mx-auto">{BEST_10_RULE}</p>
      <div className="mt-6">
        <JoinButton />
      </div>
    </>
  );
}

function Final({ game, colours }: { game: Game; colours: [string, string] }) {
  const line = resultLine(game);
  return (
    <>
      <Label>Fan Battle result</Label>
      <h2 className="mt-4 font-display text-4xl sm:text-6xl leading-[1.05]">{line.headline}</h2>
      <p className="mt-4 text-lg sm:text-xl text-white/85">{line.detail}</p>
      <p className="mt-2 text-white/60">
        {game.away.name} at {game.home.name}, <LocalTime iso={game.scheduled} variant="day" />
      </p>
      <div className="mt-8 max-w-[640px] mx-auto">
        <BestTenBar game={game} colours={colours} />
      </div>
      <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-[640px] mx-auto text-left">
        {[game.away, game.home].map((side, i) => (
          <TopList key={side.code} side={side} entries={game.top[side.code].slice(0, 3)} colour={colours[i]} onDark title={`Top 3 for ${side.code}`} />
        ))}
      </div>
      <Link
        href={resultsHref(game)}
        className="mt-8 inline-block font-semibold text-[var(--accent)] underline underline-offset-4 hover:text-white"
      >
        See both top 10s
      </Link>
    </>
  );
}

// ─── The bar ────────────────────────────────────────────────────────────────

/**
 * Two best-10 totals side by side. A total can be below zero, because a wrong
 * call takes points away (plan section 8a), so the bar measures each side from
 * zero and gives a side under water no width at all.
 */
export function BestTenBar({ game, colours }: { game: Game; colours: [string, string] }) {
  const a = game.best10[game.away.code];
  const h = game.best10[game.home.code];
  const total = Math.max(a, 0) + Math.max(h, 0);
  const awayShare = total === 0 ? 50 : (Math.max(a, 0) / total) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <SideTotal side={game.away} total={a} fans={game.fans[game.away.code]} />
        <p className="font-condensed font-bold uppercase tracking-[0.2em] text-xs text-white/50 pb-2">
          Best 10
        </p>
        <SideTotal side={game.home} total={h} fans={game.fans[game.home.code]} alignRight />
      </div>
      <div
        className="mt-3 flex h-4 overflow-hidden rounded-full bg-white/10"
        role="img"
        aria-label={`Best 10: ${game.away.code} ${fmt(a)}, ${game.home.code} ${fmt(h)}`}
      >
        <div style={{ width: `${awayShare}%`, background: colours[0] }} className="transition-[width] duration-700" />
        <div className="w-[3px] bg-[var(--night)]" />
        <div style={{ background: colours[1] }} className="flex-1" />
      </div>
    </div>
  );
}

function SideTotal({ side, total, fans, alignRight = false }: { side: Side; total: number; fans: number; alignRight?: boolean }) {
  return (
    <div className={alignRight ? "text-right" : "text-left"}>
      <p className="font-condensed font-bold text-lg tracking-wide text-white/70">{side.code}</p>
      <p className="font-condensed font-bold text-4xl sm:text-5xl leading-none tabular-nums">{fmt(total)}</p>
      <p className="mt-1 text-xs text-white/60">{fansText(fans)}</p>
    </div>
  );
}

// ─── A side's top players ───────────────────────────────────────────────────

export function TopList({
  side,
  entries,
  colour,
  title,
  onDark = false,
}: {
  side: Side;
  entries: TopEntry[];
  colour: string;
  title: string;
  onDark?: boolean;
}) {
  const box = onDark ? "bg-white/[0.06] border-white/10" : "bg-[var(--night)] border-transparent text-white";
  return (
    <div className={`rounded-2xl border p-5 ${box}`}>
      <p className="flex items-center gap-2 font-semibold">
        <Dot colour={colour} />
        {title}
      </p>
      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-white/60">Nobody played for {side.code}.</p>
      ) : (
        <ol className="mt-3 space-y-1.5">
          {entries.map((e, i) => (
            <li key={`${e.name}-${i}`} className="flex items-baseline gap-3 text-sm">
              <span className="w-5 text-right tabular-nums text-white/50">{i + 1}</span>
              <span className="flex-1 truncate">{e.name}</span>
              <span className="tabular-nums font-semibold">{fmt(e.points)}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ─── The smaller card, for the week's other Fan Battles ─────────────────────

export function GameRow({ game }: { game: Game }) {
  const colours = sideColours(game.away.code, game.home.code);
  return (
    <div className="rounded-2xl bg-[var(--night)] text-white p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-condensed font-bold text-2xl tracking-wide">
          {game.away.code} <span className="text-white/40">@</span> {game.home.code}
        </p>
        <p className="text-sm text-white/70">
          {game.state === "live" ? (
            <span className="font-semibold text-[var(--accent)]">
              Live now{game.clock ? ` · ${periodLabel(game.clock.period)} ${game.clock.display}` : ""}
            </span>
          ) : (
            <LocalTime iso={game.scheduled} />
          )}
        </p>
      </div>
      <p className="mt-1 text-sm text-white/60">
        {fanbase(game.away)} v {fanbase(game.home)}
      </p>
      {game.state === "live" ? (
        <div className="mt-5">
          <BestTenBar game={game} colours={colours} />
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[game.away, game.home].map((side, i) => (
            <div key={side.code}>
              <p className="text-xs text-white/60 mb-2">
                {fansText(game.fans[side.code])} for {side.code}
              </p>
              <BackButton code={side.code} colour={colours[i]} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
