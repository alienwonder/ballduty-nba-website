"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetAppButton } from "@/components/GetAppPanel";
import Wordmark from "@/components/Wordmark";

// Fan Battle, Results, How to play and Support, with the orange Get the app
// button (plan section 3, Nov 13, 2026). On a computer the links sit beside
// the wordmark. A phone hasn't the width, so they get a row of their own
// under it, where they stay visible rather than hiding in a menu.
const links = [
  { href: "/", label: "Fan Battle" },
  { href: "/results", label: "Results" },
  { href: "/how-to-play", label: "How to play" },
  { href: "/support", label: "Support" },
];

function NavLinks({ className }: { className: string }) {
  const path = usePathname();
  return (
    <nav aria-label="Main" className={className}>
      {links.map((l) => {
        const here = l.href === "/" ? path === "/" : path.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={here ? "page" : undefined}
            className={`text-sm font-medium transition-colors whitespace-nowrap ${
              here ? "text-[var(--accent)]" : "text-white/80 hover:text-[var(--accent)]"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--night)] border-b border-white/10">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-8">
            <NavLinks className="hidden md:flex items-center gap-7" />
            <GetAppButton />
          </div>
        </div>
        <NavLinks className="md:hidden flex items-center justify-between gap-4 h-11 border-t border-white/10" />
      </div>
    </header>
  );
}
