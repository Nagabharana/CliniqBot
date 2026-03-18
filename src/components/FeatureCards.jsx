import { Activity, Pill, Clock, Brain, Stethoscope, Lock, ScanLine } from "lucide-react";
import { FEATURES } from "../data/constants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FONTS, COLORS } from "../styles/globalStyles";

const ICON_MAP = { Activity, Pill, Clock, Brain, Stethoscope, Lock, ScanLine };

export default function FeatureCards() {
  const { addRevealRef } = useScrollReveal();

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "rgba(0,201,167,0.03)",
        borderTop: "1px solid rgba(0,201,167,0.08)",
        borderBottom: "1px solid rgba(0,201,167,0.08)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div
          ref={addRevealRef}
          className="scroll-reveal"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700, marginBottom: 16,
            }}
          >
            Why <span style={{ color: COLORS.teal }}>CliniqBot</span>?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 17 }}>
            Built for accuracy, privacy, and clarity
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = ICON_MAP[f.iconName] || Activity;
            return (
              <div
                ref={addRevealRef}
                className="scroll-reveal glass-card feature-card"
                key={i}
                style={{
                  padding: 28, borderRadius: 14,
                  display: "flex", gap: 18, alignItems: "flex-start",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(0,201,167,0.12)",
                    border: "1px solid rgba(0,201,167,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={COLORS.teal} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: FONTS.heading,
                      fontSize: 17, fontWeight: 600, marginBottom: 6,
                    }}
                  >
                    {f.title}
                  </h4>
                  <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
