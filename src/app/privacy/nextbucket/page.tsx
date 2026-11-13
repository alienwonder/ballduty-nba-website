import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "NextBucket Privacy Policy",
  description: "How NextBucket by BallDuty collects, uses and protects your data.",
};

// Written Oct 6, 2026 from what the app and its Cloud Functions actually store
// (ballduty-nba repo: auth_service.dart, deleteMyData.js, contactForm.js,
// setLeaderboardName.js, userFlags.js, leagues.js). Sync taps added Oct 12, 2026
// from mobile_app/lib/services/sync_recorder.dart. Adverts added Oct 26, 2026,
// before build 1.2.0 (15) went to review, from stoppage_ad_service.dart and
// ios/Runner/PrivacyInfo.xcprivacy. Crashlytics and Analytics added for build 18,
// and Second Chances earned from adverts, pushed Nov 2, 2026 before 1.3.0 (19)
// went to review, from the approved wording in the ballduty-nba repo's
// Plans/2026-10-28-Privacy-Wording-Draft.md. Fan Battles (the side a player
// backs, published results, Fan Battle emails, and website sign-ups without an
// account) added Nov 13, 2026 from plan section 8a in the ballduty-nba repo's
// Plans/2026-11-13-Fan-Battle-Plan.md, to be live before build 21 goes to
// review. When the app starts collecting
// something new — purchases, push notifications — this page has to change
// before that release ships.
export default function NextBucketPrivacyPage() {
  return (
    <LegalPage title="NextBucket Privacy Policy" lastUpdated="Nov 13, 2026">
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
          appear on leaderboards and Fan Battle results on this website. Your email address and
          sign-in name are never shown to other players or published.
        </li>
        <li>
          <strong>Your play.</strong> The calls you make in each game, when you made them, how they
          were scored, your points and stats, your game-winner picks, and the leagues you belong
          to. Other members of a league can see your leaderboard name, number and points in that
          league.
        </li>
        <li>
          <strong>Fan Battles.</strong> A Fan Battle is a game where fans of the two teams play
          against each other. If you back a side in a Fan Battle, we record which side you backed
          and when. After the game, the Results page on this website publishes the top 10 players
          on each side, with their leaderboard name (or player number), the side they backed and
          their Fan Battle points, and the app shows the same to other players. If you&rsquo;re
          not in your side&rsquo;s top 10, only the number of fans on each side is published,
          not who they are.
        </li>
        <li>
          <strong>Fan Battle emails.</strong> These are optional, and off unless you turn them on.
          If you turn on &ldquo;Email me about Fan Battles&rdquo; in the app, we send them to the
          email address you signed in with (if you hid your email from us with Apple, that&rsquo;s
          the relay address Apple gave us). We keep a record that you turned them on, when, and
          which games you asked to be reminded about. You get a weekly email with results and
          the coming Fan Battles, a reminder before games you asked about, and the result of
          games you played.
        </li>
        <li>
          <strong>Signing up on this website.</strong> You can also ask for Fan Battle emails on
          this website without having a NextBucket account. Then we keep only your email address,
          when you signed up, whether you&rsquo;ve confirmed it, which games you asked about, and
          when you unsubscribe. The first email asks you to confirm the address, and we send
          nothing else to it until you do. To stop one person signing up someone else&rsquo;s
          address over and over, our servers also keep the IP address each sign-up came from for
          24 hours, then delete it.
        </li>
        <li>
          <strong>TV sync.</strong> If you sync the app to a delayed TV picture, each call you make
          carries the delay your phone reported, so we can judge it against what you were watching.
          The app also records each sync tap: which basket you synced to, when its card appeared
          on your phone, and when you tapped. We use these records to check that TV sync is
          accurate and fair.
        </li>
        <li>
          <strong>Adverts.</strong> The app shows adverts from Google AdMob during breaks in
          play. To choose and measure them, Google&rsquo;s advertising software collects your
          device&rsquo;s advertising identifier (if you allow it), a rough location worked out
          from your IP address, which adverts you see and tap, and crash and performance details
          from the advertising software itself. Google receives this directly. If you choose to
          watch an advert to earn a Second Chance, the app also gives Google your account&rsquo;s
          ID, a random code that isn&rsquo;t your email, name or player number. Google passes it
          back to us when the advert finishes, so we can credit the right account, and we keep a
          record of each of these adverts with your account: when it ran, how it ended and what
          it earned. Apart from that, we don&rsquo;t link Google&rsquo;s advertising data to your
          account, and we never send Google your email address, name or player number.
        </li>
        <li>
          <strong>Crash reports and usage counts.</strong> We use Google&rsquo;s Firebase
          Crashlytics to receive a report when the app crashes or hits an error. Each report says
          what went wrong in the code, and includes your phone&rsquo;s model, its operating
          system, its free memory and storage, the app&rsquo;s version, and a random ID for that
          installation of the app. We use Firebase Analytics to count how the app is used, such as
          how many people open it, how often and for how long. It records your phone&rsquo;s
          model, operating system and language, the app&rsquo;s version, a random ID for that
          installation, and the rough location Google works out from your IP address. Neither is
          linked to your account, and neither uses your advertising identifier. Before a crash
          report is sent, the app removes your account ID, email address and player number from
          any error message. If Google&rsquo;s consent form asks for your consent (in the European
          Union, the United Kingdom and Switzerland), Analytics stays off on your phone, whatever
          you answer. Crash reports are still sent, so we can fix problems.
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
        Apart from the rough location Google&rsquo;s advertising and analytics software works out
        from your IP address, we don&rsquo;t collect your location, and we never collect your
        contacts, photos or payment card details.
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
        <li>To run Fan Battles: count each side&rsquo;s fans and points, and publish the result.</li>
        <li>To send Fan Battle emails, only if you&rsquo;ve asked for them. Every one says why you
          got it and has a link that stops all of them in one tap. Turning the switch off in the
          app does the same.</li>
        <li>To find and fix crashes and errors, and to see how many people use the app and for
          how long, so we can improve it.</li>
        <li>To show adverts during breaks in play, which keeps the app free.</li>
      </ul>

      <h2>3. Your choices about adverts</h2>
      <ul>
        <li><strong>iPhone and iPad.</strong> The first time you open a game, Apple asks whether
          NextBucket may track you. If you choose &ldquo;Ask App Not to Track&rdquo;, Google
          can&rsquo;t use your advertising identifier and the adverts aren&rsquo;t personalised.
          You can change this at any time in Settings, then Privacy &amp; Security, then
          Tracking.</li>
        <li><strong>Android.</strong> You can delete or reset your advertising identifier in your
          phone&rsquo;s Settings, under Google, then Ads (on some phones, Google, then All services, then Ads).</li>
        <li><strong>European Union, the United Kingdom and Switzerland.</strong> The app asks for
          your consent through Google&rsquo;s consent form before personalised adverts are shown.</li>
      </ul>
      <p>
        Adverts appear whichever you choose, and the game works exactly the same. How Google uses
        advertising data is explained at{" "}
        <a href="https://policies.google.com/technologies/ads">policies.google.com/technologies/ads</a>.
      </p>

      <h2>4. Who else handles your data</h2>
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
              <td>Google AdMob</td>
              <td>Shows adverts in the app during breaks in play</td>
            </tr>
            <tr>
              <td>Google Firebase Crashlytics and Firebase Analytics</td>
              <td>Crash reports, and counts of how the app is used</td>
            </tr>
            <tr>
              <td>Resend</td>
              <td>Sends sign-in codes and Fan Battle emails, and delivers your support messages to
                our inbox</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Hosts this website</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>5. Where your data is kept</h2>
      <p>
        Our database and servers run on Google Cloud in the United States. If you live in
        Australia, the European Union, the United Kingdom or elsewhere, your data is transferred
        to the US. Google protects these transfers with its standard contractual commitments,
        including the Standard Contractual Clauses recognised under the GDPR.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li>Your account and play history, including the sides you backed in Fan Battles: until
          you delete your account.</li>
        <li>Published Fan Battle results: kept on this website as a record of each game. If you
          delete your account, your name comes off them, as section 7 explains.</li>
        <li>Fan Battle emails: we keep your address on the list until you unsubscribe or delete
          your account. After you unsubscribe, we keep the address and the date you did, only so
          we never email it again by mistake. An address signed up on this website that
          isn&rsquo;t confirmed within 7 days is deleted. The IP address a website sign-up came
          from is deleted after 24 hours.</li>
        <li>Messages to support: 12 months, then deleted automatically. The support inbox also
          keeps a copy of the email, which we delete if you ask.</li>
        <li>Server logs: kept by Google and Vercel for their standard periods, then deleted.</li>
        <li>Crash reports: kept by Google for 90 days, then deleted.</li>
        <li>Usage counts: Google keeps the detailed records for 2 months, the shortest period it
          offers. Totals worked out from them, such as how many people used the app in a week,
          are kept longer.</li>
        <li>Advertising data: kept by Google under its own policies. Our record of adverts watched
          for Second Chances stays with your account until you delete it, and our server logs
          keep it for 30 days.</li>
      </ul>

      <h2>7. Deleting your account</h2>
      <p>
        You can delete your account and data at any time in the app: open the Profile tab, tap the
        gear icon for Settings, and tap <strong>Delete my data</strong>.
      </p>
      <p>
        Deletion happens straight away and can&rsquo;t be undone. It removes your profile, email
        address, calls, points, stats, game-winner picks, Second Chances and the record of
        adverts watched for them, leaderboard name and player number, support messages, the sides
        you backed in Fan Battles and your Fan Battle email choices, and your place in every
        league. On published Fan Battle results, your name is replaced with &ldquo;Deleted
        player&rdquo;, so the totals still add up but nobody can tell it was you. If you own a league, it passes to the longest-standing member, and
        a league with nobody left in it is deleted.
      </p>
      <p>
        Crash reports and usage counts aren&rsquo;t linked to your account, so there&rsquo;s
        nothing in them we could find to delete. They expire as section 6 describes.
      </p>
      <p>
        The games themselves aren&rsquo;t personal data, so the record of what happened on court
        stays. If you can&rsquo;t get into the app, email{" "}
        <a href="mailto:support@ballduty.com">support@ballduty.com</a> from the address on your
        account with the subject &ldquo;Delete my account&rdquo;, and we&rsquo;ll do it within
        30 days.
      </p>

      <h2>8. Your rights</h2>
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
        We publish Fan Battle results because they&rsquo;re part of the game you chose to play.
        We send Fan Battle emails only with your consent, and you can withdraw it at any time with
        the link in any email.
        You can also object to processing, ask us to restrict it, ask for your data in a portable
        format, and complain to your local data protection authority.
      </p>
      <p>
        <strong>California.</strong> You have the right to know what we collect, to have it
        deleted, and not to be treated differently for asking. We don&rsquo;t sell personal
        information. Personalised adverts may count as &ldquo;sharing&rdquo; under California
        law, and you can opt out of them with the choices in section 3.
      </p>

      <h2>9. Children</h2>
      <p>
        NextBucket and its Fan Battle emails are for people aged 16 and over. We don&rsquo;t
        knowingly collect data from anyone younger. If you think a child has an account, write to us and we&rsquo;ll delete it.
      </p>

      <h2>10. Security</h2>
      <p>
        Data travels encrypted between the app and our servers. Database rules mean each player
        can read only their own private account details, and our servers do the scoring, so
        nobody can change their points from the app.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        If we change what we collect or how we use it, we&rsquo;ll update this page and its date
        before the change reaches the app. If the change is significant, we&rsquo;ll also tell
        you in the app.
      </p>

      <h2>12. Contact</h2>
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
