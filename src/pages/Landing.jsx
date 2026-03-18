// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Landing.jsx
// Full landing / home page.
// Props: setPage (fn)
// ─────────────────────────────────────────────────────────────────────────────

import { ArrowRight } from "lucide-react";
import { STATS } from "../data/constants";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FONTS, COLORS } from "../styles/globalStyles";
import HowItWorks from "../components/HowItWorks";
import FeatureCards from "../components/FeatureCards";
import TestimonialCarousel from "../components/TestimonialCarousel";
import HealthTipsMarquee from "../components/HealthTipsMarquee";

export default function Landing({ setPage }) {
  const { addRevealRef } = useScrollReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="hero-gradient"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating decorative icons */}
        <div style={{ position: "absolute", top: "10%", left: "8%", opacity: 0.15 }} className="float-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="38" stroke="#00C9A7" strokeWidth="1" fill="none" />
            <rect x="36" y="20" width="8" height="40" rx="4" fill="#00C9A7" />
            <rect x="20" y="36" width="40" height="8" rx="4" fill="#00C9A7" />
          </svg>
        </div>
        <div
          style={{ position: "absolute", bottom: "15%", right: "8%", opacity: 0.12, animationDelay: "1.5s" }}
          className="float-icon"
        >
          <svg width="100" height="60" viewBox="0 0 100 60" aria-hidden="true">
            <ellipse cx="50" cy="30" rx="45" ry="22" stroke="#00C9A7" strokeWidth="1" fill="none" />
            <ellipse cx="50" cy="30" rx="20" ry="10" fill="rgba(0,201,167,0.2)" />
          </svg>
        </div>

        {/* Hero content */}
        <div className="fade-in" style={{ maxWidth: 780 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,201,167,0.12)",
              border: "1px solid rgba(0,201,167,0.3)",
              borderRadius: 20,
              padding: "6px 16px", marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: COLORS.teal,
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ color: COLORS.teal, fontSize: 13, fontWeight: 500 }}>
              AI-Powered Medical Assistant
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Scan Any Medicine.<br />
            <span style={{ color: COLORS.teal }}>Ask Anything.</span><br />
            Get Accurate Answers.
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(16px, 2vw, 20px)",
              marginBottom: 40, lineHeight: 1.7, fontWeight: 300,
            }}
          >
            Powered by advanced AI vision — your pocket medical intelligence assistant.
            Understand dosage, side effects, drug interactions and more.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="teal-btn"
              onClick={() => setPage("chat")}
              style={{
                padding: "14px 32px", borderRadius: 10,
                border: "none", color: "#fff",
                fontFamily: FONTS.body, fontWeight: 600, fontSize: 16,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              Start Scanning <ArrowRight size={18} />
            </button>
            <button
              className="outline-btn"
              style={{
                padding: "14px 32px", borderRadius: 10,
                background: "transparent",
                fontFamily: FONTS.body, fontWeight: 600, fontSize: 16,
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap", justifyContent: "center" }}>
          {STATS.map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FONTS.heading, fontSize: 32, fontWeight: 700, color: COLORS.teal }}>
                {value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sections ── */}
      <HowItWorks />
      <FeatureCards />
      <TestimonialCarousel />
      <HealthTipsMarquee />

      {/* ── Bottom CTA ── */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div ref={addRevealRef} className="scroll-reveal" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700, marginBottom: 20,
            }}
          >
            Ready to Scan Your <span style={{ color: COLORS.teal }}>Medicine?</span>
          </h2>
          <p style={{ color: COLORS.textMuted, marginBottom: 36, fontSize: 16 }}>
            Free, instant, AI-powered medical information at your fingertips.
          </p>
          <button
            className="teal-btn"
            onClick={() => setPage("chat")}
            style={{
              padding: "16px 40px", borderRadius: 12,
              border: "none", color: "#fff",
              fontFamily: FONTS.body, fontWeight: 700, fontSize: 18,
              cursor: "pointer",
            }}
          >
            Get Started — It's Free
          </button>
        </div>
      </section>
    </div>
  );
}
