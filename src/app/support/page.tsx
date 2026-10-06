import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with NextBucket by BallDuty.",
};

export default function SupportPage() {
  return (
    <LegalPage title="Support">
      <p>
        The quickest way to reach us is <strong>Contact support</strong> in the app&rsquo;s menu,
        because it tells us which account you&rsquo;re writing about. You can also email{" "}
        <a href="mailto:support@ballduty.com">support@ballduty.com</a>. We&rsquo;re in Melbourne,
        so replies come in Australian business hours.
      </p>

      <h2>A call was scored wrongly</h2>
      <p>
        Live game data sometimes changes after a basket, when it&rsquo;s withdrawn or credited to a
        different player, and the app corrects calls when that happens. If something still looks
        wrong after the game, use Contact support and tell us the game and roughly when it
        happened.
      </p>

      <h2>The app shows baskets before my TV does</h2>
      <p>
        Most TV broadcasts and streams run behind live. Tap <strong>Sync now</strong> in the strip
        at the top of a game and follow the steps, and the app will wait for your TV.
      </p>

      <h2>Changing my leaderboard name</h2>
      <p>
        Go to Profile, open Settings with the gear, and tap <strong>Leaderboard name</strong>.
        Names are checked when you choose them, and you can change yours once every 7 days. Your
        player number never changes, so rivals can still find you.
      </p>

      <h2>Deleting my account</h2>
      <p>
        Open the menu and tap <strong>Delete my data</strong>. It happens straight away and
        can&rsquo;t be undone. If you can&rsquo;t get into the app, email us from the address on
        your account with the subject &ldquo;Delete my account&rdquo;. The{" "}
        <Link href="/privacy/nba">Privacy Policy</Link> says exactly what&rsquo;s removed.
      </p>

      <h2>BallDuty Football &lsquo;26</h2>
      <p>
        Looking for help with the World Cup app? Its support page is at{" "}
        <a href="https://wc26.ballduty.com/support">wc26.ballduty.com/support</a>.
      </p>
    </LegalPage>
  );
}
