# NextBucket website (ballduty.com) — Claude Code context

The public website for **NextBucket by BallDuty**, the live NBA "call the next basket" app. It
serves ballduty.com from Vercel (project `ballduty-nba-website`). Next.js 15, Tailwind 3,
TypeScript.

The app, its backend and its docs live in the main repo,
`/Users/Pete/Documents/GitHub/BallDuty_Release/ballduty-nba`. That repo's `CLAUDE.md` holds Pete's
working rules (AEST times, US-style dates, ZTD, cost guardrails) and they apply here too. The plan
this site was built from is
`ballduty-nba/docs/Claude Code - Era/Plans/2026-10-06-BallDuty-NBA-Website.md`.

## The World Cup site

The old World Cup site (`alienwonder/ballduty-website`, folder `BallDuty_Release/Website_Ballduty`)
is frozen and lives at **wc26.ballduty.com**. Don't change it for NBA work.

The WC26 app is still in the stores with ballduty.com links built in, so `next.config.ts` forwards
every World Cup address to the same path on wc26.ballduty.com. Before removing or adding a page,
check it against that list, and run

```
bash scripts/check-addresses.sh https://ballduty.com
```

after any deploy that touches routes. Three things must always stay true:

- `/privacy` and `/terms` list each app's policy. The NextBucket policies are `/privacy/nba` and
  `/terms/nba`, and those are what the NextBucket app and its store listings link to.
- `public/app-ads.txt` stays at the root, word for word. AdMob checks it for the WC26 app's ads.
- Addresses this site will reuse later (`/rules`, `/leaderboard`, `/faq`, `/about`, `/pricing`)
  forward with temporary redirects, because browsers remember permanent ones.

## The legal pages

The privacy policy and terms were written on Oct 6, 2026 from what the app actually stores. Each
page's top comment names the code they were written from. **When the app starts collecting
anything new** (purchases, ads, analytics, push notifications), the policy has to change before
that release ships, and the date at the top changes with it.

## Look

Layout and fonts follow the WC26 design reference
(`ballduty-wc26/Docs/Design/website/WEBSITE_DESIGN_REFERENCE.md`), with the app's colours:
orange `#FF9F0A` on near-black `#1A1A1A`. Bright orange fails contrast as text on white, so
links on light backgrounds use `--accent-ink`. Colours are CSS variables in `globals.css`.

## Change tracking

Update `CHANGELOG.md` before every commit.

## Running it

```
npm run dev     # http://localhost:3000
npm run build
```
