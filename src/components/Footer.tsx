import Link from "next/link";

const linkClass =
  "text-sm text-[var(--muted)] hover:text-[var(--accent-ink)] transition-colors";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white mt-auto">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-condensed font-bold text-lg text-[var(--charcoal)] tracking-[0.15em]">
              BallDuty
            </span>
            <span className="text-xs text-[var(--muted)]">© 2026 BallDuty Pty Ltd</span>
            <span className="text-xs text-[var(--muted)]">Melbourne, Australia</span>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--charcoal)] mb-3">
                Legal
              </p>
              <ul className="space-y-2">
                <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
                <li><Link href="/terms" className={linkClass}>Terms &amp; Conditions</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--charcoal)] mb-3">
                Help
              </p>
              <ul className="space-y-2">
                <li><Link href="/support" className={linkClass}>Support</Link></li>
                <li>
                  <a href="https://wc26.ballduty.com" className={linkClass}>
                    BallDuty Football &lsquo;26
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[var(--muted)] max-w-prose">
          NextBucket is an independent app. It is not affiliated with, endorsed by or sponsored by
          the NBA or any team. All team names and logos belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
