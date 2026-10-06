// Text wordmark until NextBucket has a finished logo. The app's current icon
// is a placeholder that reads "Play NBA", which can't go on the site.
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
