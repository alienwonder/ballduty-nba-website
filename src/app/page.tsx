import Link from "next/link";
import Wordmark from "@/components/Wordmark";

// Wording follows the app's intro pages (mobile_app/lib/screens/onboarding_screen.dart).
// Points values are left to the How to play page in stage 2, where they'll be
// written from scoring_copy.dart, so there's one place for them to go stale.
const steps = [
  {
    title: "Watch the game. Call the next basket.",
    body: "While you watch a live NBA game on TV, use your phone or tablet to call who will score the next field goal.",
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

export default function HomePage() {
  return (
    <div>
      <section className="bg-[var(--night)] text-white">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <Wordmark size="lg" />
          <h1 className="font-display text-3xl sm:text-5xl mt-10 mb-5">
            Call the next basket.
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-[600px] mx-auto">
            A second-screen game for live NBA. Watch on TV, and call who scores next on your phone.
          </p>
          <p className="mt-10 inline-block rounded-full border border-[var(--accent)] px-5 py-2 text-sm font-semibold text-[var(--accent)]">
            Coming soon to the App Store
          </p>
        </div>
      </section>

      <section className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
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

        <p className="text-center text-[var(--muted)] mt-12">
          Questions? Visit{" "}
          <Link href="/support" className="text-[var(--accent-ink)] underline underline-offset-2">
            Support
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
