// How the site writes a game's time. Safe to use on the server and in the
// browser. The component that shows it is src/components/GameTime.tsx.
//
// Pete's rule (Nov 18, 2026): visitors in the US and Canada see Eastern time
// ("7:30 PM ET"), because that's how the league and its fans talk about
// tip-off, whichever zone they're in. Everyone else sees their own time
// ("11:30 AM AEDT"). The browser's time-zone setting decides which, so the
// site never has to work out where a visitor is.

export type Variant = "full" | "day" | "date";

export const EASTERN = "America/New_York";

// US and Canadian zones, as browsers name them. Prefixes cover whole groups
// ("America/Indiana/Indianapolis", "Canada/Pacific"). Older aliases browsers
// can still report are included, so a US or Canadian visitor never falls
// through to local time by accident.
const NORTH_AMERICA_PREFIXES = [
  "US/",
  "Canada/",
  "America/Indiana/",
  "America/Kentucky/",
  "America/North_Dakota/",
];

const NORTH_AMERICA_ZONES = new Set([
  // United States
  "America/New_York", "America/Detroit", "America/Louisville", "America/Fort_Wayne",
  "America/Indianapolis", "America/Knox_IN", "America/Chicago", "America/Menominee",
  "America/Denver", "America/Boise", "America/Shiprock", "America/Phoenix",
  "America/Los_Angeles", "America/Anchorage", "America/Juneau", "America/Sitka",
  "America/Metlakatla", "America/Yakutat", "America/Nome", "America/Adak", "America/Atka",
  "Pacific/Honolulu", "Pacific/Johnston", "Navajo", "EST5EDT", "CST6CDT", "MST7MDT", "PST8PDT",
  // Canada
  "America/Toronto", "America/Montreal", "America/Nipigon", "America/Thunder_Bay",
  "America/Iqaluit", "America/Pangnirtung", "America/Atikokan", "America/Coral_Harbour",
  "America/Winnipeg", "America/Rainy_River", "America/Rankin_Inlet", "America/Resolute",
  "America/Regina", "America/Swift_Current", "America/Edmonton", "America/Cambridge_Bay",
  "America/Yellowknife", "America/Inuvik", "America/Dawson_Creek", "America/Fort_Nelson",
  "America/Creston", "America/Vancouver", "America/Whitehorse", "America/Dawson",
  "America/Halifax", "America/Glace_Bay", "America/Moncton", "America/Goose_Bay",
  "America/St_Johns", "America/Blanc-Sablon",
]);

/** Whether a browser time zone is in the US or Canada. */
export function isNorthAmerican(timeZone: string | undefined): boolean {
  if (!timeZone) return false;
  return NORTH_AMERICA_ZONES.has(timeZone) || NORTH_AMERICA_PREFIXES.some((p) => timeZone.startsWith(p));
}

/**
 * A zone's short name, such as "AEDT". en-US calls Sydney "GMT+11", while
 * en-AU calls it "AEDT", so this tries the visitor's own languages first, then
 * a few English ones, and takes the first that gives a real name.
 */
export function zoneName(d: Date, timeZone: string | undefined, locales: readonly string[]): string {
  let fallback = "";
  for (const locale of locales) {
    try {
      const part = new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "short" })
        .formatToParts(d)
        .find((p) => p.type === "timeZoneName")?.value;
      if (!part) continue;
      if (!/^(GMT|UTC)[+−-]/.test(part)) return part;
      fallback ||= part;
    } catch {
      // An odd locale string from the browser; try the next.
    }
  }
  return fallback;
}

/** "Sun, Nov 22 · 7:30 PM ET", "Sun, Nov 22, 2026" or "Nov 22, 2026", in US style. */
export function formatGameTime(iso: string, variant: Variant, timeZone: string | undefined, zoneLabel: string): string {
  const d = new Date(iso);
  if (variant === "date") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone });
  }
  const day = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    ...(variant === "day" ? { year: "numeric" } : {}),
    timeZone,
  });
  if (variant === "day") return day;
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
  return `${day} · ${time} ${zoneLabel}`;
}

/** What a visitor in `timeZone` sees. With no zone (on the server) it's ET. */
export function gameTimeFor(iso: string, variant: Variant, timeZone: string | undefined, locales: readonly string[]): string {
  if (!timeZone || isNorthAmerican(timeZone)) return formatGameTime(iso, variant, EASTERN, "ET");
  return formatGameTime(iso, variant, timeZone, zoneName(new Date(iso), timeZone, locales));
}
