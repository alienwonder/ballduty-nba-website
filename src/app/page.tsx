import Image from "next/image";
import Link from "next/link";
import Mark from "@/components/Mark";
import Wordmark from "@/components/Wordmark";

// Wording follows the app's intro pages (mobile_app/lib/screens/onboarding_screen.dart).
// Points values are left to the How to play page in stage 2, where they'll be
// written from scoring_copy.dart, so there's one place for them to go stale.
const steps = [
  {
    title: "Watch the game. Call the next basket.",
    body: "While you watch a live basketball game on TV or a stream, use your phone or tablet to call who will score the next field goal.",
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

// Both listings went live Oct 20, 2026. The App Store link has no country in it,
// so Apple sends each visitor to their own country's store.
// Badges are the official artwork, downloaded Oct 26, 2026 from Apple's marketing
// toolbox and Google Play's badge page. Google's PNG ships with a 41px transparent
// border, trimmed off so both badges can share one height; the artwork is unchanged.
const stores = [
  {
    name: "Download on the App Store",
    href: "https://apps.apple.com/app/id6759211498",
    src: "/badges/app-store.svg",
    width: 168,
  },
  {
    name: "Get it on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.ballduty.app",
    src: "/badges/google-play.png",
    width: 188,
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-[var(--night)] text-white">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 sm:pt-14 sm:pb-24 text-center">
          {/* Stacked like the app's launch screen: the mark above the wordmark. */}
          <div className="flex justify-center mb-6">
            <Mark size={112} />
          </div>
          <Wordmark size="lg" />
          <h1 className="font-display text-3xl sm:text-5xl mt-10 mb-5">
            Call the next basket.
          </h1>
          <p className="text-lg sm:text-xl text-white/75 max-w-[600px] mx-auto">
            A second-screen game for live basketball games. Watch on TV or a stream, and call who scores next on your phone.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {stores.map((s) => (
              <a key={s.name} href={s.href} className="inline-block hover:opacity-90">
                <Image src={s.src} alt={s.name} width={s.width} height={56} priority />
              </a>
            ))}
          </div>
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
