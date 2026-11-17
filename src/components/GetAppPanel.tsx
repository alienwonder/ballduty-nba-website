"use client";

// The panel that slides up when a visitor taps Back, Join in the app, or Get
// the app (plan section 3, "Tapping Back"). It sends them to the store for
// their phone, or shows a QR code on a computer.
//
// The site never records a side. Taps on a website can't be tied to a real
// player, so a side only counts once it's backed in the app.
//
// The email box for Fan Battle reminders goes under the store buttons, where
// the comment marks its place. It comes after the first Fan Battle (plan
// section 10), with its own privacy wording.

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { APP_STORE, GOOGLE_PLAY, platformFrom, type Platform } from "@/lib/stores";

type Reason = { kind: "back"; code: string } | { kind: "join" } | { kind: "app" };

const OpenPanel = createContext<(reason: Reason) => void>(() => {});

export function GetAppProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState<Reason>({ kind: "app" });
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    setPlatform(platformFrom(navigator.userAgent, navigator.maxTouchPoints));
  }, []);

  const open = useCallback((r: Reason) => {
    setReason(r);
    dialog.current?.showModal();
  }, []);

  const close = () => dialog.current?.close();

  return (
    <OpenPanel.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="get-app-title"
        // A tap on the dimmed page behind the panel closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="get-app-panel fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-2xl p-0 bg-white text-[var(--charcoal)] shadow-2xl backdrop:bg-black/60 sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-2xl"
      >
        <div className="relative px-6 pt-7 pb-8 sm:px-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 h-10 w-10 rounded-full text-2xl leading-none text-[var(--muted)] hover:bg-[var(--surface)]"
          >
            &times;
          </button>
          <PanelText reason={reason} />
          <div className="mt-6">
            <StoreChoice platform={platform} />
          </div>
          {/* The email box for Fan Battle reminders goes here, after the first Fan Battle. */}
          <p className="mt-6 text-xs leading-relaxed text-[var(--muted)]">
            Fan Battle results, with each player&rsquo;s leaderboard name and points, are
            published on our{" "}
            <Link href="/results" onClick={close} className="text-[var(--accent-ink)] underline underline-offset-2">
              Results
            </Link>{" "}
            page.
          </p>
        </div>
      </dialog>
    </OpenPanel.Provider>
  );
}

function PanelText({ reason }: { reason: Reason }) {
  const title =
    reason.kind === "back"
      ? `You're backing ${reason.code}.`
      : reason.kind === "join"
        ? "Join the Fan Battle."
        : "Get NextBucket.";
  return (
    <>
      <h2 id="get-app-title" className="font-display text-3xl pr-8">
        {title}
      </h2>
      {reason.kind === "back" && (
        <>
          <p className="mt-3 text-lg leading-snug">
            Get NextBucket and tap <strong>Back {reason.code}</strong> on the game at the top.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Nothing is saved on this website. Your side counts once you back it in the app, and
            you can change it until tip-off. Already have NextBucket? Just open it.
          </p>
        </>
      )}
      {reason.kind === "join" && (
        <p className="mt-3 text-lg leading-snug">
          The game&rsquo;s on now. Get NextBucket and back a side on the game at the top. You can
          join mid-game, and your side is fixed as soon as you pick it.
        </p>
      )}
      {reason.kind === "app" && (
        <p className="mt-3 text-lg leading-snug">
          Free on iPhone and Android. Watch the game, and call who scores the next basket.
        </p>
      )}
    </>
  );
}

function StoreChoice({ platform }: { platform: Platform }) {
  if (platform !== "other") {
    const store = platform === "ios" ? APP_STORE : GOOGLE_PLAY;
    return (
      <a href={store.href} className="inline-block hover:opacity-90">
        <Image src={store.src} alt={store.name} width={Math.round(store.width * 1.15)} height={64} />
      </a>
    );
  }
  return (
    <div className="flex items-center gap-5">
      <Image
        src="/get-the-app-qr.svg"
        alt="QR code that opens NextBucket in your phone's app store"
        width={132}
        height={132}
        className="shrink-0 rounded-md border border-[var(--border)]"
        unoptimized
      />
      <div>
        <p className="text-sm leading-snug">Scan with your phone&rsquo;s camera, or pick your store:</p>
        <div className="mt-3 flex flex-col gap-2">
          {[APP_STORE, GOOGLE_PLAY].map((s) => (
            <a key={s.name} href={s.href} className="inline-block hover:opacity-90">
              <Image src={s.src} alt={s.name} width={s.width * 0.75} height={42} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── The buttons that open it ───────────────────────────────────────────────

const orange =
  "inline-flex items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-[var(--night)] hover:bg-[var(--accent-hover)] transition-colors";

export function GetAppButton() {
  const open = useContext(OpenPanel);
  return (
    <button type="button" onClick={() => open({ kind: "app" })} className={`${orange} h-10 px-4 text-sm`}>
      Get the app
    </button>
  );
}

export function JoinButton() {
  const open = useContext(OpenPanel);
  return (
    <button type="button" onClick={() => open({ kind: "join" })} className={`${orange} h-12 px-8 text-base`}>
      Join in the app
    </button>
  );
}

export function BackButton({
  code,
  colour,
  size = "lg",
}: {
  code: string;
  colour: string;
  size?: "lg" | "sm";
}) {
  const open = useContext(OpenPanel);
  return (
    <button
      type="button"
      onClick={() => open({ kind: "back", code })}
      className={`${orange} w-full gap-2 ${size === "lg" ? "h-12 text-base" : "h-10 text-sm"}`}
    >
      <span aria-hidden className="h-2.5 w-2.5 rounded-full ring-1 ring-black/20" style={{ background: colour }} />
      Back {code}
    </button>
  );
}

/**
 * The Back button on the home page's poster: white, with the team's poster
 * colour as its text, so it reads on that team's half. `colour` always has
 * enough contrast with white (posterColours in teams.ts makes sure of it).
 */
export function PosterBackButton({ code, label, colour }: { code: string; label: string; colour: string }) {
  const open = useContext(OpenPanel);
  return (
    <button
      type="button"
      onClick={() => open({ kind: "back", code })}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-white px-3 sm:px-5 h-11 sm:h-12 font-condensed font-black uppercase tracking-wide text-[15px] sm:text-lg hover:bg-white/90 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] transition-colors"
      style={{ color: colour }}
    >
      {label}
    </button>
  );
}
