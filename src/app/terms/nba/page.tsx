import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "NextBucket Terms & Conditions",
  description: "The terms for using NextBucket by BallDuty.",
};

// Written Oct 6, 2026. Kept general about scoring on purpose: the numbers live
// in the app (scoring_copy.dart) and on How to play, so they can't disagree
// with a legal page. When paid Passes arrive (planned from Dec 1, 2026),
// section 5 has to be rewritten before that release ships.
export default function NextBucketTermsPage() {
  return (
    <LegalPage title="NextBucket Terms & Conditions" lastUpdated="Oct 6, 2026">
      <p>
        These terms cover your use of the NextBucket app, made by BallDuty Pty Ltd
        (&ldquo;BallDuty&rdquo;, &ldquo;we&rdquo;). By using the app you agree to them, so if you
        don&rsquo;t agree, please don&rsquo;t use it.
      </p>

      <h2>1. What NextBucket is</h2>
      <p>
        NextBucket is a free-to-play game of skill. While you watch a live NBA game, you call
        which player will score the next field goal, and you earn points for right calls and lose
        points for wrong ones.
      </p>
      <ul>
        <li>
          <strong>It isn&rsquo;t gambling.</strong> You can&rsquo;t stake money, and points have no
          cash value. There are no cash prizes or prizes of real-world value. What you win is your
          place on the leaderboard.
        </li>
        <li>
          <strong>It&rsquo;s independent.</strong> NextBucket is not affiliated with, endorsed by
          or sponsored by the NBA or any team. All team names and logos belong to their
          respective owners. Apple and Google are not sponsors of the game and are not involved
          in it.
        </li>
      </ul>

      <h2>2. Who can play</h2>
      <ul>
        <li>You must be at least 16 years old, or older if the law where you live requires it.</li>
        <li>You&rsquo;re responsible for making sure playing is lawful where you are.</li>
      </ul>

      <h2>3. Your account</h2>
      <ul>
        <li>One account per person. Keep your sign-in to yourself.</li>
        <li>
          Your leaderboard name has to follow our rules. Names are checked when you choose them,
          including by Google&rsquo;s Gemini AI, and we may change or remove a name that breaks
          the rules or causes offence. There&rsquo;s a limit on how often you can change your
          name, which the app shows you.
        </li>
        <li>
          You can delete your account at any time in the app, under <strong>Delete my data</strong>.
          The <Link href="/privacy/nba">Privacy Policy</Link> says what that removes.
        </li>
      </ul>

      <h2>4. Fair play</h2>
      <p>
        The game only works if everyone calls baskets they haven&rsquo;t seen yet. You must not:
      </p>
      <ul>
        <li>use bots, scripts or any automated tool to make calls;</li>
        <li>run more than one account, or play on someone else&rsquo;s;</li>
        <li>
          claim a TV delay you don&rsquo;t have, or otherwise make calls after you already know the
          result;
        </li>
        <li>interfere with the app, its servers or other players.</li>
      </ul>
      <p>
        We look at results after games for signs of this. If we&rsquo;re satisfied an account has
        broken these rules, we may turn off TV sync for it, adjust or remove its points, or
        suspend or close it.
      </p>

      <h2>5. Price</h2>
      <p>
        NextBucket is free to play right now. If we introduce paid features, we&rsquo;ll update
        these terms before they&rsquo;re offered, and anything you buy will be sold through the
        App Store or Google Play under their terms.
      </p>

      <h2>6. Scoring and results</h2>
      <ul>
        <li>
          How calls are scored is explained in the app. Scoring uses official play-by-play data
          from our data provider, Sportradar.
        </li>
        <li>
          Live sports data sometimes changes after the fact. A basket can be withdrawn or
          reassigned, or a game can stop. When that happens we may void calls, or take back or
          correct points, so that results match what actually happened.
        </li>
        <li>
          Our record of calls and points is final for the leaderboard. If you think something is
          wrong, tell us through Contact support and we&rsquo;ll look into it.
        </li>
      </ul>

      <h2>7. The service</h2>
      <p>
        The app depends on live data and on services we don&rsquo;t control, so we can&rsquo;t
        promise it will always be available, on time or error-free. We may change features, or
        pause the game during a game night, when we need to.
      </p>

      <h2>8. Liability</h2>
      <p>
        The app is provided &ldquo;as is&rdquo;. As far as the law allows, BallDuty isn&rsquo;t
        liable for any indirect loss, or for lost points, rank or data. Nothing in these terms
        takes away rights you have under the Australian Consumer Law or other laws that
        can&rsquo;t be excluded.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may update these terms. We&rsquo;ll change the date at the top when we do, and tell
        you in the app if the change is significant. If you keep playing after a change, you
        accept the new terms.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of Victoria, Australia, and the courts of Victoria
        have exclusive jurisdiction over any dispute about them.
      </p>

      <h2>11. Contact</h2>
      <p>
        Support: Contact support in the app, or our <Link href="/support">Support page</Link>.
        <br />
        Legal notices: <a href="mailto:privacy@ballduty.com">privacy@ballduty.com</a>
      </p>
      <p>NextBucket is operated by BallDuty Pty Ltd, Melbourne, Australia.</p>
    </LegalPage>
  );
}
