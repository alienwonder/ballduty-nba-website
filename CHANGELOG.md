# Changelog — NextBucket website

## Oct 12, 2026 — The site no longer names its data supplier

The terms' scoring section now says scoring uses "play-by-play data from a commercial sports data provider", with no supplier named and no "official". The privacy policy no longer has the note under its list of services that named the supplier. We send the supplier no personal information, so it doesn't belong there. The TV sync section now says sync taps are used to check that TV sync is "accurate and fair". Both pages already carried today's date, so they stay Oct 12, 2026.

The home page logo's label for screen readers is now "NextBucket" instead of "NextBucket logo". A search of the site for "Sportradar", "NBA", "logo" and "official" now finds them only in developer notes and in the forwarding rules for the old `/nba` addresses, none of which a visitor sees.

## Oct 12, 2026 — The terms cover the sync bonus

Section 6 of the terms now says a player who watches on TV and syncs the app can earn bonus points for syncing, that the app explains when and how many, and that we may change the bonus or stop offering it. Section 4 now says the points we may take away from a cheating account include sync bonus points. The terms name no amounts, so the app stays the one place the numbers live. The bonus's server half went out this morning with its switch off, and these lines are in place before the switch goes on. The terms' date stays Oct 12, 2026.

## Oct 12, 2026 — The terms no longer mention logos

Section 1 of the terms now says "All team names belong to their respective owners.", matching the footer, because the app and the site have shown no team logos since Oct 11. The terms already carried today's date from this morning's change, so it stays Oct 12, 2026.

## Oct 12, 2026 — The privacy policy covers sync taps; footer and header fixes

The privacy policy's TV sync section now says the app also records each sync tap: which basket the player synced to, when its card appeared on the phone, and when they tapped. We use these records to check that TV sync is accurate. The app has stored them since Oct 6 (`sync_recorder.dart`). The policy's date changed to Oct 12, 2026.

The footer on every page now says "All team names belong to their respective owners." and no longer mentions logos, because the app and the site have shown no team logos since Oct 11. The header's wordmark now reads "NextBucket by BallDuty" to screen readers and search engines, where it used to run together as "NextBucketby BallDuty". It looks the same on screen.

## Oct 12, 2026 — "Basketball" instead of "NBA" on the home page

The first of the four steps on the home page now says "a live basketball game", and so does the site's description, which search results show under the site's name. No page on the site names the NBA now. `CLAUDE.md` records the new policy addresses and the rule about not naming the NBA.

## Oct 12, 2026 — The logo on the home page, and the policies move to /nextbucket

The home page now shows the NextBucket "Fast Break" mark above the wordmark, stacked the way the app's launch screen shows it. The shapes and colours are copied from the app's `mark.svg`. The home page content also sits higher on the screen, and the opening line now says "live basketball games" instead of "live NBA".

The NextBucket privacy policy moved from `/privacy/nba` to `/privacy/nextbucket`, and the terms moved from `/terms/nba` to `/terms/nextbucket`. The old addresses forward permanently to the new ones, because App Store Connect and the review notes may still carry them. `scripts/check-addresses.sh` checks the new addresses and the forwarding.

Pete asked for no mention of the NBA on the policy pages. The terms now say "a live basketball game", and the independence line in the terms and the footer now says NextBucket isn't connected to "any basketball league or team". The terms' date changed to Oct 12, 2026. The privacy policy's text didn't change, so its date stays Oct 6.

## Oct 7, 2026 — ballduty.com now serves this site

Pete took ballduty.com and www.ballduty.com off the old World Cup project in Vercel's settings, and CC added them to this project, with ballduty.com redirecting to www.ballduty.com as before. `scripts/check-addresses.sh` passes against the live domain: every World Cup address forwards to wc26.ballduty.com, the NextBucket pages answer, and `app-ads.txt` is served word for word through the bare-domain hop. The script now checks that hop once and then checks the pages on www.

## Oct 6, 2026 — Stage 1: the site, the legal pages and the World Cup redirects

**Feature.** The first version of the NextBucket website, built to take over ballduty.com from the
World Cup site, which moves to wc26.ballduty.com.

- A home page with the game in four steps, worded from the app's intro pages, and "Coming soon to
  the App Store".
- The NextBucket privacy policy (`/privacy/nba`) and terms (`/terms/nba`), written from what the
  app and its Cloud Functions actually store. Apple needs the privacy policy at a public address
  before the app can be submitted. A lawyer should read both before ballduty.com moves here.
- `/privacy` and `/terms` list both apps' policies, because the WC26 app has those two addresses
  built in.
- A support page covering the common questions, with support@ballduty.com.
- `next.config.ts` forwards every World Cup address to the same path on wc26.ballduty.com:
  permanently for World Cup-only pages, and temporarily for `/rules`, `/leaderboard`, `/faq`,
  `/about` and `/pricing`, which this site will want back.
- `public/app-ads.txt`, copied word for word, because AdMob checks it for the WC26 app's ads.
- `scripts/check-addresses.sh` checks every address on a given host, for use before and after the
  domain moves.

The package versions and the base config were copied from the World Cup site, so both run the
same Next.js. Nothing is live yet.
