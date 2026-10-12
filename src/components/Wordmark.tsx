// The NextBucket wordmark in text. The home page pairs it with the
// "Fast Break" mark (Mark.tsx).
export default function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className="text-white font-condensed font-bold uppercase"
        style={{
          fontSize: big ? "3.5rem" : "1.8rem",
          letterSpacing: "0.08em",
        }}
      >
        Next<span className="text-[var(--accent)]">Bucket</span>
      </span>
      {/* Stacked visually; the space keeps the text "NextBucket by BallDuty"
          for screen readers, copy and paste, and search results. */}{" "}
      <span
        className="text-white/60 font-semibold uppercase"
        style={{
          fontSize: big ? "0.95rem" : "0.7rem",
          letterSpacing: "0.25em",
          marginTop: big ? "0.5rem" : "0.25rem",
        }}
      >
        by BallDuty
      </span>
    </span>
  );
}
