# Changelog — NextBucket website

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
