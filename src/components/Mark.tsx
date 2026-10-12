// The NextBucket "Fast Break" mark (Oct 7, 2026): four speed lines and the
// ball. Shapes and colours are copied from the app's
// ballduty-nba/mobile_app/assets/brand/svg/mark.svg, so change both together.
// Drawn for a dark background; the speed lines are near-white.
export default function Mark({ size = 112 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="NextBucket"
    >
      <rect x="20" y="33" width="16" height="6" rx="3" fill="#F4F2EE" />
      <rect x="10" y="43" width="26" height="6" rx="3" fill="#F4F2EE" />
      <rect x="10" y="53" width="26" height="6" rx="3" fill="#F4F2EE" />
      <rect x="20" y="63" width="16" height="6" rx="3" fill="#F4F2EE" />
      <circle cx="64" cy="51" r="23" fill="#FFA319" />
    </svg>
  );
}
