import type { Metadata } from "next";
import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";

export const metadata: Metadata = {
  title: "How to play",
  description:
    "Call the next basket while you watch the NBA, and back your team in a Fan Battle, where each side's best 10 players are added up.",
};

// The four steps were the home page until Nov 13, 2026. Their wording follows
// the app's intro pages (mobile_app/lib/screens/onboarding_screen.dart in the
// ballduty-nba repo). Points values are left out on purpose, so there's one
// place for them (the app) and nothing here to go stale.
const steps = [
  {
    title: "Watch the game. Call the next basket.",
    body: "While you watch a live NBA game on TV or a stream, use your phone or tablet to call who will score the next field goal.",
  },
  {
    title: "Each basket, a new call",
    body: "When the ball goes in, it settles the call you just made and opens the next one straight away, from tip-off to the buzzer. Only two-pointers and three-pointers count.",
  },
  {
    title: "The earlier you call it, the more it pays",
    body: "Points depend on how early you made your call, and nobody knows how long until the next basket, so there's no safe moment to wait for.",
  },
  {
    title: "Play people you know",
    body: "The leaderboard ranks everyone who plays, and you can start a league for your friends, family or workmates and see how you stack up.",
  },
];

// The Fan Battle rules come from the plan, section 2
// (ballduty-nba/docs/Claude Code - Era/Plans/2026-11-13-Fan-Battle-Plan.md).
const rules = [
  "We pick a game, usually between two teams with loud fanbases, and post it on the Fan Battle page.",
  "Back one side for that game, in the NextBucket app. You can change sides until tip-off, and then your side is fixed. Arrive mid-game and you can still back a side, and it's fixed as soon as you pick it.",
  "Play as normal. Your Fan Battle points are your points from calls plus any bonus for syncing to your TV. Your pick for who wins the game doesn't count.",
  "Each side's best 10 players are added up, and the bigger total wins. So a smaller fanbase can beat a bigger one, and getting into your side's top 10 is a win of its own.",
  "Calls are free and there's no limit, so play every basket.",
  "If you don't back a side, you still play as normal. You just don't count for either fanbase.",
];

export default function HowToPlayPage() {
  return (
    <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">How to play</h1>
      <p className="mt-4 text-lg text-[var(--muted)] max-w-[640px]">
        NextBucket is a free game for your phone that you play while you watch the NBA.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {steps.map((s, i) => (
          <div key={s.title} className="bg-white border border-[var(--border)] rounded-xl p-6">
            <p className="font-condensed font-bold text-[var(--accent-ink)] text-lg tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="font-display text-2xl mt-2 mb-3">{s.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-2xl bg-[var(--night)] text-white p-6 sm:p-10">
        <p className="font-condensed font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
          Fan Battles
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">Your fanbase against theirs</h2>
        <ul className="mt-6 space-y-4 max-w-[720px]">
          {rules.map((r) => (
            <li key={r} className="flex gap-3 leading-relaxed text-white/85">
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-white/65 max-w-[720px] leading-relaxed">
          Fan Battle results are published on our{" "}
          <Link href="/results" className="text-[var(--accent)] underline underline-offset-2">
            Results
          </Link>{" "}
          page, with the leaderboard name, side and points of each side&rsquo;s top 10. If you
          haven&rsquo;t chosen a leaderboard name, your player number shows instead, such as
          Player BD047382. Your email and sign-in name never appear.
        </p>
      </section>

      <div className="mt-14 text-center">
        <StoreBadges />
        <p className="text-[var(--muted)] mt-8">
          Questions? Visit{" "}
          <Link href="/support" className="text-[var(--accent-ink)] underline underline-offset-2">
            Support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
