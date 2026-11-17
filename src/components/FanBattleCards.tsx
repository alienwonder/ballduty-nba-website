// The pieces of a Fan Battle the home page and the results pages share: the
// big card at the top of the home page in its three states, the smaller card
// for the week's other games, the bar comparing the best-10 totals, and a
// side's top players.

import Link from "next/link";
import { BackButton, JoinButton, PosterBackButton } from "@/components/GetAppPanel";
import GameTime from "@/components/GameTime";
import { HeartButton, HeartsResult, useHeartsOpen } from "@/components/Hearts";
import {
  cardLineFor,
  fanbase,
  fmt,
  hasEnoughFans,
  headlineFor,
  periodLabel,
  resultLine,
  type Game,
  type Headline,
  type Headlines,
  type Side,
  type TopEntry,
} from "@/lib/fanBattle";
import { nickname, posterColours, sideColours } from "@/lib/teams";

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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-condensed font-bold uppercase tracking-[0.2em] text-[var(--accent)] text-sm sm:text-base">
      {children}
    </p>
  );
}

// ─── The top card ───────────────────────────────────────────────────────────

/**
 * Before and during a game the top card is a fight poster: a headline, then
 * the two teams' colours split down a half-court line, with a Back button on
 * each half before tip-off and the best-10 bar once it's live. After the game
 * it's the result.
 */
export function FeaturedCard({ game, headlines }: { game: Game; headlines: Headlines }) {
  const colours = sideColours(game.away.code, game.home.code);
  if (game.state === "final") {
    return (
      <div className="text-center">
        <Final game={game} colours={colours} />
      </div>
    );
  }
  return <Poster game={game} colours={colours} headline={headlineFor(game, headlines)} />;
}

function Poster({ game, colours, headline }: { game: Game; colours: [string, string]; headline: Headline }) {
  const poster = posterColours(game.away.code, game.home.code);
  const live = game.state === "live";
  const heartsOpen = useHeartsOpen(game);
  return (
    <div>
      <Label>
        {live ? (
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
        ) : (
          "Next NBA Fan Battle"
        )}
      </Label>
      <h2 className="mt-3 font-condensed italic font-black uppercase leading-[0.92] tracking-[-0.01em] text-[2.2rem] sm:text-5xl lg:text-6xl max-w-[22ch] [text-wrap:balance]">
        {headline.headline}
      </h2>
      <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-[60ch]">{headline.line}</p>

      <div
        className="relative mt-8 overflow-hidden rounded-lg"
        style={{ background: `linear-gradient(100deg, ${poster.fill[0]} 0 50%, ${poster.fill[1]} 50% 100%)` }}
      >
        <CourtLines />
        <div className="relative grid grid-cols-2 sm:grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-4 px-4 pt-6 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
          <Versus />
          <PosterSide game={game} side={game.away} colour={poster.fill[0]} shadow={poster.shadow[0]} align="left" />
          <PosterSide game={game} side={game.home} colour={poster.fill[1]} shadow={poster.shadow[1]} align="right" />
        </div>
        <div className="relative bg-black/55 px-4 py-4 sm:px-8 sm:py-5">
          {live ? (
            <div className="grid gap-5">
              <BestTenBar game={game} colours={colours} />
              <div className="text-center">
                <JoinButton />
              </div>
            </div>
          ) : (
            <FanTug game={game} colours={colours} />
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-white/60">
        {game.away.name} at {game.home.name}
        {!live && (
          <>
            {" · "}
            <GameTime iso={game.scheduled} />
          </>
        )}
        {" · "}
        {BEST_10_RULE}
        {heartsOpen && " Tap a heart to cheer your team. Hearts are cheers, not points, and don't count in the Fan Battle."}
      </p>
    </div>
  );
}

/** Half-court lines over the poster: halfway line, centre circle, both keys. */
function CourtLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3">
        <line x1="535" y1="-10" x2="465" y2="410" />
        <circle cx="500" cy="200" r="90" />
        <circle cx="500" cy="200" r="30" />
        <path d="M -10 60 H 150 V 340 H -10" />
        <path d="M 150 30 A 250 250 0 0 1 150 370" />
        <path d="M 1010 60 H 850 V 340 H 1010" />
        <path d="M 850 30 A 250 250 0 0 0 850 370" />
      </g>
    </svg>
  );
}

function Versus() {
  // Between the two sides on a computer; above them, centred, on a phone.
  return (
    <div className="col-span-2 row-start-1 justify-self-center sm:col-span-1 sm:col-start-2 sm:row-start-1">
      <div className="grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-full border-[3px] border-white bg-[var(--night)] font-condensed italic font-black text-lg sm:text-2xl text-[var(--accent)]">
        VS
      </div>
    </div>
  );
}

function PosterSide({
  game,
  side,
  colour,
  shadow,
  align,
}: {
  game: Game;
  side: Side;
  colour: string;
  shadow: string;
  align: "left" | "right";
}) {
  const right = align === "right";
  const place = right ? "sm:col-start-3" : "sm:col-start-1";
  const heartsOpen = useHeartsOpen(game);
  return (
    <div className={`row-start-2 sm:row-start-1 ${place} grid gap-1 min-w-0 ${right ? "justify-items-end text-right" : "justify-items-start text-left"}`}>
      <p className="font-condensed font-bold uppercase tracking-[0.15em] text-[11px] sm:text-sm leading-tight text-white/90 max-w-full">
        {side.name}
      </p>
      <p
        className="font-condensed italic font-black leading-[0.8] tracking-[-0.02em] text-[4.2rem] sm:text-[7rem] lg:text-[9rem] text-white"
        style={{ textShadow: `${right ? -4 : 4}px 4px 0 ${shadow}` }}
      >
        {side.code}
      </p>
      {(game.state === "upcoming" || heartsOpen) && (
        <div className={`mt-3 flex flex-wrap items-center gap-2 ${right ? "justify-end" : "justify-start"}`}>
          {game.state === "upcoming" && (
            <PosterBackButton code={side.code} label={`Back the ${nickname(side.code, side.name)}`} colour={colour} />
          )}
          {heartsOpen && <HeartButton game={game} side={side} />}
        </div>
      )}
    </div>
  );
}

/**
 * Before tip-off: how many fans each side has, as a tug of war. While the
 * game has fewer than ENOUGH_FANS it says so in words instead, because "1 fan
 * v 0 fans" looks like nobody's here.
 */
function FanTug({ game, colours }: { game: Game; colours: [string, string] }) {
  const a = game.fans[game.away.code];
  const h = game.fans[game.home.code];
  if (!hasEnoughFans(game)) {
    return (
      <p className="text-center font-condensed font-bold uppercase tracking-[0.15em] text-sm sm:text-base text-white/90">
        Sides just opened. Be one of the first to back yours.
      </p>
    );
  }
  const awayShare = (a / (a + h)) * 100;
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm text-white/85 tabular-nums">
        <span>
          <b className="font-condensed text-2xl text-white mr-1">{fmt(a)}</b> {fanbase(game.away)} in
        </span>
        <span>
          <b className="font-condensed text-2xl text-white mr-1">{fmt(h)}</b> {fanbase(game.home)} in
        </span>
      </div>
      <div
        className="relative mt-2 flex h-3 overflow-hidden rounded-full bg-white/10"
        role="img"
        aria-label={`${fanbase(game.away)}: ${fmt(a)}. ${fanbase(game.home)}: ${fmt(h)}.`}
      >
        <div style={{ width: `${awayShare}%`, background: colours[0] }} className="transition-[width] duration-700" />
        <div style={{ background: colours[1] }} className="flex-1" />
        <span aria-hidden className="absolute left-1/2 -top-1 -bottom-1 w-[2px] bg-white" />
      </div>
    </div>
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
        {game.away.name} at {game.home.name}, <GameTime iso={game.scheduled} variant="day" />
      </p>
      <div className="mt-8 max-w-[640px] mx-auto">
        <BestTenBar game={game} colours={colours} />
      </div>
      <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-[640px] mx-auto text-left">
        {[game.away, game.home].map((side, i) => (
          <TopList key={side.code} side={side} entries={game.top[side.code].slice(0, 3)} colour={colours[i]} onDark title={`Top 3 for ${side.code}`} />
        ))}
      </div>
      <div className="mt-6 max-w-[640px] mx-auto">
        <HeartsResult game={game} />
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

export function GameRow({ game, headlines = {} }: { game: Game; headlines?: Headlines }) {
  const colours = sideColours(game.away.code, game.home.code);
  const poster = posterColours(game.away.code, game.home.code);
  const line = cardLineFor(game, headlines);
  const showCounts = hasEnoughFans(game);
  return (
    <div className="overflow-hidden rounded-2xl bg-[var(--night)] text-white">
      <div
        aria-hidden
        className="h-1.5"
        style={{ background: `linear-gradient(90deg, ${poster.fill[0]} 50%, ${poster.fill[1]} 50%)` }}
      />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-condensed italic font-black text-3xl tracking-tight">
            {game.away.code} <span className="not-italic font-bold text-xl text-white/40">@</span> {game.home.code}
          </p>
          <p className="text-sm text-white/70">
            {game.state === "live" ? (
              <span className="font-semibold text-[var(--accent)]">
                Live now{game.clock ? ` · ${periodLabel(game.clock.period)} ${game.clock.display}` : ""}
              </span>
            ) : (
              <GameTime iso={game.scheduled} />
            )}
          </p>
        </div>
        <p className="mt-1 text-sm text-white/60">
          {fanbase(game.away)} v {fanbase(game.home)}
        </p>
        {line && <p className="mt-3 text-[15px] leading-relaxed text-white/85">{line}</p>}
        {game.state === "live" ? (
          <div className="mt-5">
            <BestTenBar game={game} colours={colours} />
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[game.away, game.home].map((side, i) => (
              <div key={side.code}>
                {showCounts && (
                  <p className="text-xs text-white/60 mb-2">
                    {fansText(game.fans[side.code])} for {side.code}
                  </p>
                )}
                <BackButton code={side.code} colour={colours[i]} size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
