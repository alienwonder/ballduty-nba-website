# Changelog — NextBucket website

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
