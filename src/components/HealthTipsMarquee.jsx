// ─────────────────────────────────────────────────────────────────────────────
import { HEALTH_TIPS } from "../data/constants";

export default function HealthTipsMarquee() {
  // Duplicate tips so the marquee loops seamlessly
  const doubled = [...HEALTH_TIPS, ...HEALTH_TIPS];

  return (
    <div
      style={{
        padding: "20px 0",
        background: "rgba(0,201,167,0.06)",
        borderTop: "1px solid rgba(0,201,167,0.12)",
        borderBottom: "1px solid rgba(0,201,167,0.12)",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {doubled.map((tip, i) => (
          <span
            key={i}
            style={{
              whiteSpace: "nowrap",
              padding: "0 40px",
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              borderRight: "1px solid rgba(0,201,167,0.2)",
            }}
          >
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
}
