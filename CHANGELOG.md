# Changelog — NextBucket website

## Nov 18, 2026 — Privacy policy covers hearts (Pete approved the wording)

Pete approved the wording in section 8 of the hearts plan on Nov 18, 2026, and it's now in the NextBucket privacy policy, dated Nov 18, 2026. Section 1 says what hearts keep (each team's total only), that the IP address behind a tap is held in memory for at most 12 hours and never saved, that Cloudflare Turnstile checks the visitor is a person, and that the browser remembers whether it has thanked them. Section 4 adds Cloudflare Turnstile, and section 6 says how long hearts and the IP address are kept. It has to be live before `TURNSTILE_SITE_KEY` is set, and it's safe to go live first, because hearts stay off until then.

## Nov 18, 2026 — Hearts on the Fan Battle poster, and a thank-you that invites visitors into the app (not switched on)

Pete wanted visitors to be able to give a team some love without signing in, with additions only and a guard against bots. He approved the plan with all seven suggestions (`ballduty-nba/docs/Claude Code - Era/Plans/2026-11-18-Fan-Battle-Hearts-Plan.md`). The backend function, `giveFanBattleHearts`, is in the app repo.

Each half of the poster gets a heart button with that team's count, before and during the game. Taps show at once and are sent together after a 2-second pause, at most 20 to a message. The first message of a visit runs Cloudflare Turnstile, which most people never see, and later ones carry the pass the function hands back. The count never goes down on the visitor's screen, and taps the function drops over its limits still show there, so a cheater can't easily tell what got through (`src/components/Hearts.tsx`). The caption under the poster says hearts are cheers, not points, and don't count in the Fan Battle.

After a visitor's first hearts go through, the Back panel opens once per Fan Battle per browser: "You sent 12 hearts to Knicks fans", then an invitation to get NextBucket, back the team and call baskets, with the store buttons and "Keep cheering". During the game the invitation says the game's on. The browser remembers it has shown, and if it forgets, the visitor just sees it again.

Finished games show the totals on the home page's result and on each game's results page: "Visitors sent 1,240 hearts to the Lakers and 980 to the Warriors. Hearts are cheers, not points." The Fan Battle file's new `hearts` field is read by `src/lib/fanBattle.ts`, and a file without it shows no hearts.

Hearts stay off until `TURNSTILE_SITE_KEY` is set in Vercel (`src/lib/heartsConfig.ts`), so this can go live before the backend is deployed. With a sample file, hearts go to `/hearts-sample`, a stand-in that answers like the function, and the samples now carry hearts. Checked locally with Cloudflare's always-pass test key on a computer and a phone: 25 quick taps went out as one message with the check and one with the pass, the count added up exactly, and the thank-you showed once with the right wording. The NextBucket privacy policy needs the wording in the plan's section 8 before the key is set.

## Nov 18, 2026 — Game times in ET for the US and Canada, local time elsewhere

Pete saw AEDT on the poster and asked for ET, because the site's audience is NBA fans in the US. Until now every game time showed in the visitor's own time zone. Now a visitor whose browser is set to a US or Canadian time zone sees Eastern time ("Sat, Nov 21 · 7:30 PM ET"), whichever of those zones they're in, because that's how the league and its fans talk about tip-off. Everyone else still sees their own time ("Sun, Nov 22 · 11:30 AM AEDT"). Pete chose to count Canada with the US, since Canadian fans follow the same schedule.

The browser's time-zone setting decides it, so the site never works out where a visitor is, and the privacy policy doesn't change. The page leaves the server in ET, and a browser outside North America swaps in its own time when it loads. The rule and the list of US and Canadian zones are in `src/lib/gameTime.ts`. The component was `LocalTime` and is now `GameTime`. Checked across twelve zones (New York, Los Angeles, Indianapolis, Honolulu, Toronto, Vancouver, St John's, Sydney, London, Mexico City and the server), and on the local site with the sample file in a Melbourne browser.

## Nov 17, 2026 — The home page's top section becomes a fight poster (branch `fan-battle-poster`, not live)

Pete felt the home page looked neat but AI-made, and too quiet for people arriving from NBA subreddits. He also noticed the top of the page could show a result like "It's a tie, 1 PHX fan and 0 DEN fans", which makes the whole site look empty. Pete approved the mock-up on Nov 17, 2026, and this builds it.

Before and during a game, the top of the home page is now a poster. A big slanted headline sits above a block split down a half-court line, in each team's colours, with each team's code in huge letters. Before tip-off each half has a white "Back the Knicks" button, which opens the same Back panel as before. Under that, a tug-of-war bar shows how many fans each side has. During the game the bar becomes the best-10 bar, with "Join in the app". After the game the result shows as it did before. The smaller cards for the week's other Fan Battles get a strip in the two teams' colours.

The headline and its one line come from a new file, `src/data/fan-battle-headlines.json`, keyed by game ID. CC drafts them from the news before each Fan Battle, Pete approves them, and they go live with the next deploy, which is the approval step. A game with no entry gets plain wording such as "Knicks fans against Raptors fans." Entries starting with "SAMPLE:" only show with the sample files, and the production site drops them (`src/lib/headlines.ts`). That check runs on the server, because the browser can't tell which site it's on.

Quiet games no longer make the site look empty. Until a game has 20 fans across both sides (`ENOUGH_FANS` in `src/lib/fanBattle.ts`), the poster says "Sides just opened. Be one of the first to back yours." instead of showing counts, and the smaller cards leave the counts out. A finished game with fewer than 20 fans isn't put at the top or in "Last result", though the Results pages still list it.

New: `posterColours` in `src/lib/teams.ts` picks each half's colour so white text reads on it (the Spurs' silver falls back to their black), and moves the home side off a colour that looks like the away side's. Barlow Condensed now loads in italic too. Checked locally on the upcoming and live samples and on the real file, on a phone and a computer, with no sideways scrolling, and the Back panel still opens.

## Nov 13, 2026 — Fan Battle pages and privacy policy go live

Pete said yes to putting the Fan Battle work live on Nov 13, 2026, so `fan-battle-website` is merged into `main` and deployed to ballduty.com. That covers the three entries below. The privacy policy's date is Nov 13, 2026. Until the server writes `fan-battle.json`, the home page says the next Fan Battle is coming soon and the Results page says no Fan Battles have been played yet.

## Nov 13, 2026 — Pete approved the Fan Battle privacy wording (not live)

Pete approved the privacy policy draft below on Nov 13, 2026, including "Deleted player" on published results and 7 days for unconfirmed website sign-ups. He chose 24 hours for keeping the IP address of a website sign-up, so the policy now says 24 hours where it said "briefly", and the "How long we keep it" section says so too. The date at the top is still Nov 13, 2026, and it changes to the day this goes live.

## Nov 13, 2026 — Privacy policy draft for Fan Battles (waiting for Pete, not live)

The NextBucket privacy policy now covers the three things plan section 8a found missing. The side a player backs in a Fan Battle is recorded, and the Results page publishes each side's top 10 with their leaderboard name, side and points. Fan Battle emails are optional, and when a player turns on the app's switch they go to the email address the player signed in with. People can also sign up on the website without an account, and the policy says what we keep about them. It also says that deleting an account removes the player's name from published results ("Deleted player"), that unconfirmed website sign-ups are deleted after 7 days, and that Resend sends sign-in codes as well as support messages. The date is Nov 13, 2026, and it changes to the day this goes live. Pete has to approve the wording, and it has to be live before app build 21 is submitted.

## Nov 13, 2026 — Fan Battle pages (not live)

Fan Battle is now the home page, built from section 3 of the plan in the app repo (`Plans/2026-11-13-Fan-Battle-Plan.md`). The menu reads Fan Battle, Results, How to play and Support, with an orange "Get the app" button. On a phone the links get their own row under the wordmark, so they stay visible.

The top of the home page shows the next Fan Battle in three states. Before the game it names the two fanbases ("Blazers fans v Knicks fans"), the start time in the visitor's own time zone, each side's fan count and a Back button for each side. During the game it shows "Live now" with the quarter and clock, a bar comparing the two best-10 totals, and "Join in the app". After the game it shows the result line ("Blazers fans win", "Best 10: 1,902 to 1,876, outnumbered 23 to 19"), both sides' top three, and the next Fan Battle underneath. Below that come the week's other Fan Battles, the last result with its top three, two lines for newcomers and the store badges. With no Fan Battle in the file, the page says the next one is coming soon.

Tapping Back opens a panel: "You're backing NYK. Get NextBucket and tap Back NYK on the game at the top." It slides up from the bottom on a phone and shows that phone's store. On a computer it shows a QR code and both badges. The QR code points at the new address `/get`, which sends an iPhone to the App Store, an Android phone to Google Play, and anything else to the home page's badges. The site never records a side, and the panel says so. The email box comes after the first Fan Battle, and the panel has a marked place for it.

The Results page lists every Fan Battle, newest first, with wins by fanbase at the top, and each game has its own page with both sides' top 10 and the turnout. That's the page posted back to Reddit, so its title is the result. Both pages, the panel and How to play say that results are published with players' leaderboard names.

How to play is a new page. It has the four steps that used to be the home page, and the Fan Battle rules from section 2 of the plan.

All of it reads one public file, `fan-battle.json` in the `ballduty-nba-schedule` bucket, which the server will write. The site never reads Firestore. Pages are rebuilt with a fresh copy at most every 30 seconds, and while a game is on, or starts within the hour, the browser fetches the file itself every 25 seconds. That needs a CORS rule on the bucket, which is written in `scripts/fan-battle-cors.json` and waiting for Pete's go-ahead. Until then, the page updates only when it's reloaded. Three sample files in `src/data/fan-battle-samples/` stand in for the real file on a computer (`FAN_BATTLE_SAMPLE=live npm run dev`), and the production site ignores them.

The site now names the NBA, its teams and the league on the Fan Battle pages, because Pete decided on Nov 13 to sell that side hard on the website. `CLAUDE.md` records the change. Team colours and nicknames are copied from the app. The footer and the terms keep their wording.

`qrcode` is a new development tool, used once by `scripts/make-qr.mjs` to make `public/get-the-app-qr.svg`. The live site doesn't load it. `scripts/check-addresses.sh` now checks `/results` and `/how-to-play` too.

## Oct 26, 2026 — The home page links to both stores

The home page no longer says "Coming soon to the App Store", because NextBucket has been live on the App Store and Google Play since Oct 20. Apple's "Download on the App Store" badge and Google's "Get it on Google Play" badge take its place. They sit side by side on a computer and stack on a phone. The App Store link carries no country, so Apple sends each visitor to their own country's store. Both links were checked and open the NextBucket listing.

The badges are the official artwork, saved in `public/badges/`. Apple's black SVG came from Apple's marketing toolbox, and Google's PNG came from Google Play's badge page. Google's PNG comes with a wide transparent border, which was trimmed off so the two badges can share one height. The badge itself is unchanged. Both load straight away rather than lazily, because they're on the first screen.

The opening line now says "Watch on TV or a stream", and the first of the four steps says "on TV or a stream", because plenty of players watch the game streamed rather than on TV (Pete).

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
