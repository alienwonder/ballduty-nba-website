import Link from "next/link";
import LegalPage from "@/components/LegalPage";

// /privacy and /terms list each app's own policy. The WC26 app (still in the
// stores) has ballduty.com/privacy and /terms built in, so those addresses
// can't show NextBucket's policy, or a WC26 player would read terms that
// don't describe their app. Store listings link straight to the per-app page.
interface Props {
  title: string;
  nbaHref: string;
  wc26Href: string;
}

export default function AppPolicyList({ title, nbaHref, wc26Href }: Props) {
  const card =
    "block bg-white border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)] transition-colors no-underline";
  return (
    <LegalPage title={title}>
      <p>BallDuty makes two apps, and each has its own {title.toLowerCase()}. Choose yours:</p>
      <div className="grid gap-4 mt-6">
        <Link href={nbaHref} className={card} style={{ textDecoration: "none" }}>
          <span className="block font-semibold text-[var(--charcoal)]">NextBucket</span>
          <span className="block text-sm text-[var(--muted)] mt-1">
            The live NBA game, where you call the next basket
          </span>
        </Link>
        <a href={wc26Href} className={card} style={{ textDecoration: "none" }}>
          <span className="block font-semibold text-[var(--charcoal)]">
            BallDuty Football &lsquo;26
          </span>
          <span className="block text-sm text-[var(--muted)] mt-1">
            The 2026 FIFA World Cup prediction app
          </span>
        </a>
      </div>
    </LegalPage>
  );
}
