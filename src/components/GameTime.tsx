"use client";

// A game's time: ET for visitors in the US and Canada, and the visitor's own
// time everywhere else (the rule is in src/lib/gameTime.ts). The server
// doesn't know the visitor's zone, so the page first shows ET, and a browser
// outside North America swaps in its own time as soon as it loads.

import { useEffect, useState } from "react";
import { gameTimeFor, type Variant } from "@/lib/gameTime";

export default function GameTime({ iso, variant = "full" }: { iso: string; variant?: Variant }) {
  const [text, setText] = useState(() => gameTimeFor(iso, variant, undefined, []));

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locales = [...navigator.languages, "en-US", "en-AU", "en-GB"];
    setText(gameTimeFor(iso, variant, zone, locales));
  }, [iso, variant]);

  return <time dateTime={iso}>{text}</time>;
}
