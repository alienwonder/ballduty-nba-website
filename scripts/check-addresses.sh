#!/usr/bin/env bash
# Checks every address the WC26 app, its store listing and old posts link to.
#
#   bash scripts/check-addresses.sh https://wc26.ballduty.com   # step 1: the old site on its new address
#   bash scripts/check-addresses.sh https://ballduty.com        # step 4: after the domain moves
#
# On wc26.ballduty.com every page should answer 200. On ballduty.com, World
# Cup pages should redirect to the same path on wc26.ballduty.com, and the
# NextBucket pages and app-ads.txt should answer 200.
# The list came from a search of the ballduty-wc26 repo on Oct 6, 2026.
set -u
BASE="${1:?usage: check-addresses.sh <base URL>}"
BASE="${BASE%/}"

PATHS=(
  /privacy /terms /support /rules /leaderboard /guidelines
  /bold-calls /claim /humans-vs-agents /humans-vs-agents/chronicle
  /humans-vs-agents/chronicle/day-9 /humans-vs-agents/results
  /humans-vs-agents/transparency
  /wc26 /wc26/club-pass-promo /faq /about /pricing
)
NBA_PATHS=(/ /privacy/nba /terms/nba)

fail=0
check() {
  local path="$1" want="$2"
  local out code loc
  out=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$BASE$path")
  code="${out%% *}"; loc="${out#* }"
  case "$want" in
    ok)   [[ "$code" == 200 ]] ;;
    wc26) [[ "$code" =~ ^30[78]$ && "$loc" == "https://wc26.ballduty.com$path" ]] ;;
  esac
  if [[ $? -eq 0 ]]; then
    printf "  ok    %-40s %s %s\n" "$path" "$code" "$loc"
  else
    printf "  FAIL  %-40s %s %s  (wanted %s)\n" "$path" "$code" "$loc" "$want"
    fail=1
  fi
}

# app-ads.txt must sit at the root of whichever host this is, with AdMob's line.
ads=$(curl -s "$BASE/app-ads.txt")
if [[ "$ads" == *"pub-1848020322973613"* ]]; then
  echo "  ok    /app-ads.txt has the AdMob publisher line"
else
  echo "  FAIL  /app-ads.txt is missing the AdMob publisher line"; fail=1
fi

if [[ "$BASE" == *"wc26.ballduty.com"* ]]; then
  for p in "${PATHS[@]}"; do check "$p" ok; done
else
  for p in "${PATHS[@]}"; do
    case "$p" in
      /privacy|/terms|/support) check "$p" ok ;;
      *) check "$p" wc26 ;;
    esac
  done
  for p in "${NBA_PATHS[@]}"; do check "$p" ok; done
fi

if [[ $fail -eq 0 ]]; then echo "All addresses OK on $BASE"; else echo "Some addresses FAILED on $BASE"; fi
exit $fail
