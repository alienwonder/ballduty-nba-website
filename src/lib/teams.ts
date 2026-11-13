// The 30 teams, keyed by the three-letter code the app and the Fan Battle file
// use. Nicknames are copied from the app's mobile_app/lib/utils/team_names.dart
// (the names fans use: "Blazers", "Wolves"), and colours from
// ballduty-webhook-test/scripts/archive/seed-team-colors.js, both in the
// ballduty-nba repo. Change them there and here together.
//
// A code that isn't here falls back to the file's own full name and a neutral
// grey, so a renamed team never breaks a page.
type Team = { nickname: string; primary: string; accent: string };

const TEAMS: Record<string, Team> = {
  ATL: { nickname: "Hawks", primary: "#E03A3E", accent: "#FDB927" },
  BKN: { nickname: "Nets", primary: "#000000", accent: "#FFFFFF" },
  BOS: { nickname: "Celtics", primary: "#007A33", accent: "#FFFFFF" },
  CHA: { nickname: "Hornets", primary: "#1D1160", accent: "#00788C" },
  CHI: { nickname: "Bulls", primary: "#CE1141", accent: "#000000" },
  CLE: { nickname: "Cavaliers", primary: "#860038", accent: "#FDBB30" },
  DAL: { nickname: "Mavericks", primary: "#00538C", accent: "#B8C4CA" },
  DEN: { nickname: "Nuggets", primary: "#0E2240", accent: "#FEC524" },
  DET: { nickname: "Pistons", primary: "#C8102E", accent: "#1D42BA" },
  GSW: { nickname: "Warriors", primary: "#1D428A", accent: "#FFC72C" },
  HOU: { nickname: "Rockets", primary: "#CE1141", accent: "#C4CED4" },
  IND: { nickname: "Pacers", primary: "#002D62", accent: "#FDBB30" },
  LAC: { nickname: "Clippers", primary: "#C8102E", accent: "#1D428A" },
  LAL: { nickname: "Lakers", primary: "#552583", accent: "#FDB927" },
  MEM: { nickname: "Grizzlies", primary: "#5D76A9", accent: "#12173F" },
  MIA: { nickname: "Heat", primary: "#98002E", accent: "#F9A01B" },
  MIL: { nickname: "Bucks", primary: "#00471B", accent: "#EEE1C6" },
  MIN: { nickname: "Wolves", primary: "#0C2340", accent: "#78BE20" },
  NOP: { nickname: "Pelicans", primary: "#0C2340", accent: "#C8102E" },
  NYK: { nickname: "Knicks", primary: "#006BB6", accent: "#F58426" },
  OKC: { nickname: "Thunder", primary: "#007AC1", accent: "#EF3B24" },
  ORL: { nickname: "Magic", primary: "#0077C0", accent: "#000000" },
  PHI: { nickname: "76ers", primary: "#006BB6", accent: "#ED174C" },
  PHX: { nickname: "Suns", primary: "#1D1160", accent: "#E56020" },
  POR: { nickname: "Blazers", primary: "#E03A3E", accent: "#000000" },
  SAC: { nickname: "Kings", primary: "#5A2D81", accent: "#63727A" },
  SAS: { nickname: "Spurs", primary: "#C4CED4", accent: "#000000" },
  TOR: { nickname: "Raptors", primary: "#CE1141", accent: "#000000" },
  UTA: { nickname: "Jazz", primary: "#002B5C", accent: "#F9A01B" },
  WAS: { nickname: "Wizards", primary: "#002B5C", accent: "#E31837" },
};

const FALLBACK: Team = { nickname: "", primary: "#9CA3AF", accent: "#FFFFFF" };
// The site's near-black, which every team colour sits on.
const NIGHT = "#1A1A1A";

/** "Knicks" for NYK. Falls back to the last word of the full name. */
export function nickname(code: string, fullName: string): string {
  return TEAMS[code]?.nickname || fullName.split(" ").pop() || code;
}

/**
 * The colours for the two sides of one game, for bars and dots on the dark
 * background. Team colours are only ever decoration, never the colour of text.
 *
 * Each side uses its main colour unless that's too dark to see on near-black
 * (navy, black, dark purple), when it uses its second colour (the Warriors'
 * gold, the Lakers' gold). If the two sides still look alike (Bulls and
 * Raptors are both red), the home side moves to its second colour, and if
 * that doesn't help either, to white.
 */
export function sideColours(awayCode: string, homeCode: string): [string, string] {
  const awayTeam = TEAMS[awayCode] ?? FALLBACK;
  const homeTeam = TEAMS[homeCode] ?? FALLBACK;
  const away = onDark(awayTeam);
  let home = onDark(homeTeam);
  if (alike(away, home)) {
    home = [homeTeam.accent, homeTeam.primary, "#FFFFFF"].find(
      (c) => contrast(c, NIGHT) >= 2 && !alike(away, c),
    ) ?? "#FFFFFF";
  }
  return [away, home];
}

function onDark(team: Team): string {
  return contrast(team.primary, NIGHT) >= 2 ? team.primary : team.accent;
}

function rgb(hex: string): number[] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function alike(a: string, b: string): boolean {
  const [r1, g1, b1] = rgb(a);
  const [r2, g2, b2] = rgb(b);
  return Math.hypot(r1 - r2, g1 - g2, b1 - b2) < 90;
}

// WCAG contrast ratio between two colours.
function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = rgb(hex).map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
