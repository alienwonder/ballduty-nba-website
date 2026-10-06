import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "NextBucket Privacy Policy",
  description: "How NextBucket by BallDuty collects, uses and protects your data.",
};

// Written Oct 6, 2026 from what the app and its Cloud Functions actually store
// (ballduty-nba repo: auth_service.dart, deleteMyData.js, contactForm.js,
// setLeaderboardName.js, userFlags.js, leagues.js). When the app starts
// collecting something new — purchases, ads, analytics, push notifications —
// this page has to change before that release ships.
export default function NextBucketPrivacyPage() {
  return (
    <LegalPage title="NextBucket Privacy Policy" lastUpdated="Oct 6, 2026">
      <p>
        This policy explains what the NextBucket app collects, why, who else handles it, and how
        to delete it. NextBucket is made by BallDuty Pty Ltd, an Australian company
        (&ldquo;BallDuty&rdquo;, &ldquo;we&rdquo;). If anything here is unclear, write to{" "}
        <a href="mailto:privacy@ballduty.com">privacy@ballduty.com</a>.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li>
          <strong>Your account.</strong> When you sign in with Apple, Google or an email address,
          we keep your email address, the name and profile photo address your sign-in provider
          gives us (if any), and when you joined and last signed in. Apple lets you hide your real
          email address, and if you do, we only ever see the relay address Apple gives us.
        </li>
        <li>
          <strong>Your leaderboard identity.</strong> Every account gets a permanent player number,
          such as BD047382, and you can choose a leaderboard name. Your leaderboard name, player
          number, rank and points are public: anyone using the app can see them, and they may also
          appear on leaderboards on this website. Your email address and sign-in name are never
          shown to other players.
        </li>
        <li>
          <strong>Your play.</strong> The calls you make in each game, when you made them, how they
          were scored, your points and stats, your game-winner picks, and the leagues you belong
          to. Other members of a league can see your leaderboard name, number and points in that
          league.
        </li>
        <li>
          <strong>TV sync.</strong> If you sync the app to a delayed TV picture, each call you make
          carries the delay your phone reported, so we can judge it against what you were watching.
        </li>
        <li>
          <strong>Messages to support.</strong> If you use Contact support in the app, we keep
          your message, its category, and the email address we reply to.
        </li>
        <li>
          <strong>Technical data.</strong> Like any online service, our servers and Google&rsquo;s
          record basic technical details such as IP addresses and request times in their logs.
          The app also keeps a few settings on your phone itself, such as whether you&rsquo;ve
          seen the intro, and those never leave your device.
        </li>
      </ul>
      <p>
        We don&rsquo;t collect your location, contacts, photos or payment card details. The app
        has no advertising, no ad tracking and no third-party analytics, and it doesn&rsquo;t sell
        or share your data with advertisers.
      </p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To run the game: record and score your calls, keep the leaderboards and leagues, and
          show your stats.</li>
        <li>To keep the game fair. We look at results after games to spot accounts that seem to
          be calling baskets they&rsquo;ve already seen, for example by claiming a TV delay they
          don&rsquo;t have. If we&rsquo;re satisfied that has happened, we may turn TV sync off for
          that account, so its calls are judged live. A person makes that decision, not an
          automated system.</li>
        <li>To check leaderboard names. When you choose a name, it is checked against our rules,
          including by Google&rsquo;s Gemini AI, to keep offensive names off the leaderboard. Only
          the name you typed is sent for that check.</li>
        <li>To answer you when you contact support.</li>
      </ul>

      <h2>3. Who else handles your data</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>What it does for us</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Firebase and Google Cloud</td>
              <td>Sign-in, the database, and the servers the app talks to</td>
            </tr>
            <tr>
              <td>Google Gemini (through Google Cloud&rsquo;s Vertex AI)</td>
              <td>Checks leaderboard names</td>
            </tr>
            <tr>
              <td>Apple and Google sign-in</td>
              <td>Let you sign in with your existing account, if you choose to</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Delivers your support messages to our inbox</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Hosts this website</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Live game data comes from Sportradar. We send Sportradar nothing about you.
      </p>

      <h2>4. Where your data is kept</h2>
      <p>
        Our database and servers run on Google Cloud in the United States. If you live in
        Australia, the European Union, the United Kingdom or elsewhere, your data is transferred
        to the US. Google protects these transfers with its standard contractual commitments,
        including the Standard Contractual Clauses recognised under the GDPR.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>Your account and play history: until you delete your account.</li>
        <li>Messages to support: 12 months, then deleted automatically. The support inbox also
          keeps a copy of the email, which we delete if you ask.</li>
        <li>Server logs: kept by Google and Vercel for their standard periods, then deleted.</li>
      </ul>

      <h2>6. Deleting your account</h2>
      <p>
        You can delete your account and data at any time in the app: open the menu and tap{" "}
        <strong>Delete my data</strong>. It is also in Profile, under Settings.
      </p>
      <p>
        Deletion happens straight away and can&rsquo;t be undone. It removes your profile, email
        address, calls, points, stats, game-winner picks, leaderboard name and player number,
        support messages, and your place in every league. If you own a league, it passes to the
        longest-standing member, and a league with nobody left in it is deleted.
      </p>
      <p>
        The games themselves aren&rsquo;t personal data, so the record of what happened on court
        stays. If you can&rsquo;t get into the app, email{" "}
        <a href="mailto:support@ballduty.com">support@ballduty.com</a> from the address on your
        account with the subject &ldquo;Delete my account&rdquo;, and we&rsquo;ll do it within
        30 days.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Wherever you live, you can ask us for a copy of your data, ask us to correct it, or ask us
        to delete it, by writing to{" "}
        <a href="mailto:privacy@ballduty.com">privacy@ballduty.com</a>. We reply within 30 days.
        You can change your leaderboard name in the app, within the limits on how often names
        can change.
      </p>
      <p>
        <strong>Australia.</strong> We handle personal information under the Privacy Act 1988 and
        the Australian Privacy Principles. If you&rsquo;re unhappy with how we&rsquo;ve handled a
        complaint, you can contact the Office of the Australian Information Commissioner
        (oaic.gov.au).
      </p>
      <p>
        <strong>European Union and United Kingdom.</strong> We process your account and play data
        because it&rsquo;s needed to provide the game you signed up for. We check names, keep the
        game fair and answer support messages because we have a legitimate interest in doing so.
        You can also object to processing, ask us to restrict it, ask for your data in a portable
        format, and complain to your local data protection authority.
      </p>
      <p>
        <strong>California.</strong> You have the right to know what we collect, to have it
        deleted, and not to be treated differently for asking. We don&rsquo;t sell or share
        personal information as California law defines those terms.
      </p>

      <h2>8. Children</h2>
      <p>
        NextBucket is for people aged 16 and over. We don&rsquo;t knowingly collect data from
        anyone younger. If you think a child has an account, write to us and we&rsquo;ll delete it.
      </p>

      <h2>9. Security</h2>
      <p>
        Data travels encrypted between the app and our servers. Database rules mean each player
        can read only their own private account details, and our servers do the scoring, so
        nobody can change their points from the app.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        If we change what we collect or how we use it, we&rsquo;ll update this page and its date
        before the change reaches the app. If the change is significant, we&rsquo;ll also tell
        you in the app.
      </p>

      <h2>11. Contact</h2>
      <p>
        Privacy questions: <a href="mailto:privacy@ballduty.com">privacy@ballduty.com</a>
        <br />
        Everything else: Contact support in the app, or our{" "}
        <Link href="/support">Support page</Link>.
      </p>
      <p>NextBucket is operated by BallDuty Pty Ltd, Melbourne, Australia.</p>
    </LegalPage>
  );
}
