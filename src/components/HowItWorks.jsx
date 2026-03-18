import { Upload, Brain, Stethoscope } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "../data/constants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FONTS, COLORS } from "../styles/globalStyles";

// Map icon names (strings from constants) to lucide components
const ICON_MAP = { Upload, Brain, Stethoscope };

export default function HowItWorks() {
  const { addRevealRef } = useScrollReveal();

  return (
    <section
      id="how-it-works"
      style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}
    >
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
          How It <span style={{ color: COLORS.teal }}>Works</span>
        </h2>
        <p style={{ color: COLORS.textMuted, fontSize: 17 }}>Three simple steps to get medical clarity</p>
      </div>

      {/* Step cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 28,
        }}
      >
        {HOW_IT_WORKS_STEPS.map((step, i) => {
          const Icon = ICON_MAP[step.iconName] || Brain;
          return (
            <div
              ref={addRevealRef}
              className="scroll-reveal glass-card feature-card"
              key={i}
              style={{
                padding: 36, borderRadius: 16,
                position: "relative",
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              {/* Large ghost number */}
              <div
                style={{
                  position: "absolute", top: 20, right: 24,
                  fontFamily: FONTS.heading,
                  fontSize: 48, fontWeight: 900,
                  color: "rgba(0,201,167,0.08)",
                }}
              >
                {step.num}
              </div>

              {/* Icon badge */}
              <div
                style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(0,201,167,0.15)",
                  border: `1px solid rgba(0,201,167,0.3)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Icon size={24} color={COLORS.teal} />
              </div>

              <h3 style={{ fontFamily: FONTS.heading, fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
                {step.title}
              </h3>
              <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: 15 }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
