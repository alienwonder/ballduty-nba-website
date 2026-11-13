"use client";

// A game time in the visitor's own time zone, in US style: "Sun, Nov 22 ·
// 11:30 AM AEDT". The server doesn't know the visitor's zone, so the page
// first shows New York time ("ET"), and the browser swaps in its own zone as
// soon as it loads. Visitors on US Eastern time see no change.

import { useEffect, useState } from "react";

type Variant = "full" | "day" | "date";

const NEW_YORK = "America/New_York";

function zoneName(d: Date, timeZone: string | undefined, locales: string[]): string {
  // en-US calls Sydney "GMT+11", while en-AU calls it "AEDT". Try the
  // visitor's own languages first, then a few English ones, and take the
  // first that gives a real name.
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

function format(iso: string, variant: Variant, timeZone: string | undefined, zone: string): string {
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
  return `${day} · ${time} ${zone}`;
}

export default function LocalTime({ iso, variant = "full" }: { iso: string; variant?: Variant }) {
  const [text, setText] = useState(() => format(iso, variant, NEW_YORK, "ET"));

  useEffect(() => {
    const locales = [...navigator.languages, "en-US", "en-AU", "en-GB"];
    setText(format(iso, variant, undefined, zoneName(new Date(iso), undefined, locales)));
  }, [iso, variant]);

  return (
    <time dateTime={iso}>{text}</time>
  );
}
