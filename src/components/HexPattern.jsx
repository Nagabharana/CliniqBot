export default function HexPattern() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <pattern id="hex-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon
            points="30,2 58,17 58,47 30,62 2,47 2,17"
            fill="none"
            stroke="#00C9A7"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}
