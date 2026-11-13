import type { Metadata } from "next";
import FanBattleHome from "@/components/FanBattleHome";
import { getFanBattle, liveUpdateUrl } from "@/lib/fanBattleSource";

// Fan Battle is the home page (plan section 3, Nov 13, 2026). Until then the
// home page was the game in four steps, which moved to /how-to-play.
//
// The page is rebuilt at most every 30 seconds with a fresh copy of the Fan
// Battle file, and while a game is on the browser keeps it fresh itself.
export const revalidate = 30;

export const metadata: Metadata = {
  title: { absolute: "NBA Fan Battles | NextBucket" },
  description:
    "Your fanbase against theirs. Back your team, call the next basket in NextBucket while you watch the NBA, and each side's best 10 players are added up.",
};

export default async function HomePage() {
  const file = await getFanBattle();
  return (
    <>
      <h1 className="sr-only">NBA Fan Battles on NextBucket</h1>
      <FanBattleHome initial={file} liveUpdateUrl={liveUpdateUrl()} />
    </>
  );
}
