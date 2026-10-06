import Link from "next/link";
import Wordmark from "@/components/Wordmark";

// Stage 1 has few pages, so the header carries only Support. How to play and
// the leaderboard join it in stage 2.
export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--night)] border-b border-white/10">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Wordmark />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/support"
              className="text-sm font-medium text-white/80 hover:text-[var(--accent)] transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
