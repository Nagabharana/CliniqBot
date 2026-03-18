// ─────────────────────────────────────────────────────────────────────────────
// src/pages/About.jsx
// About page with mission, how AI works, disclaimer, and FAQ accordion.
// ─────────────────────────────────────────────────────────────────────────────

import { Stethoscope } from "lucide-react";
import FaqAccordion from "../components/FaqAccordion";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function About() {
  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>

        {/* ── Hero ── */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 80 }}>
          <div
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "rgba(0,201,167,0.1)",
              border: "2px solid rgba(0,201,167,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Stethoscope size={36} color={COLORS.teal} />
          </div>
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700, marginBottom: 20,
            }}
          >
            About <span style={{ color: COLORS.teal }}>CliniqBot</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)", fontSize: 18,
              lineHeight: 1.8, maxWidth: 600, margin: "0 auto",
            }}
          >
            CliniqBot is an AI-powered medical image and query assistant designed to make medical
            information accessible, understandable, and instant for everyone.
          </p>
        </div>

        {/* ── Mission ── */}
        <div className="glass-card" style={{ padding: 40, borderRadius: 20, marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: FONTS.heading, fontSize: 28,
              fontWeight: 700, marginBottom: 20, color: COLORS.teal,
            }}
          >
            Our Mission
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 16 }}>
            We believe everyone deserves clear, accurate, and immediate access to medical information.
            Confusion about medications, dosages, and side effects can lead to dangerous mistakes.
            CliniqBot bridges the gap between the complexity of medical literature and everyday
            understanding — putting the power of AI-driven medical knowledge directly in your hands.
          </p>
        </div>

        {/* ── How AI Works ── */}
        <div className="glass-card" style={{ padding: 40, borderRadius: 20, marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: FONTS.heading, fontSize: 28,
              fontWeight: 700, marginBottom: 20, color: COLORS.teal,
            }}
          >
            How Our AI Works
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 16 }}>
            CliniqBot uses Claude by Anthropic — one of the world's most advanced large language models
            with vision capabilities. When you upload an image of a medicine, the AI analyzes the visual
            content, identifies the medication, and cross-references its training data to provide
            comprehensive information about uses, dosage, side effects, drug interactions, and precautions.
            Text queries are handled with the same level of medical accuracy and empathy.
          </p>
        </div>

        {/* ── Disclaimer ── */}
        <div
          style={{
            padding: 28, borderRadius: 16,
            background: "rgba(230,57,70,0.07)",
            border: "1px solid rgba(230,57,70,0.25)",
            marginBottom: 60,
          }}
        >
          <h3
            style={{
              color: COLORS.red,
              fontFamily: FONTS.heading, fontSize: 20, marginBottom: 12,
            }}
          >
            ⚕️ Important Medical Disclaimer
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 14 }}>
            CliniqBot provides AI-generated informational content only. It is not a licensed medical
            professional, and its responses should not be used as a substitute for professional medical
            advice, diagnosis, or treatment. Always consult a qualified physician, pharmacist, or
            healthcare provider before making any medical decisions.
          </p>
        </div>

        {/* ── FAQ ── */}
        <h2
          style={{
            fontFamily: FONTS.heading, fontSize: 34,
            fontWeight: 700, marginBottom: 32,
          }}
        >
          Frequently Asked <span style={{ color: COLORS.teal }}>Questions</span>
        </h2>
        <FaqAccordion />

      </div>
    </div>
  );
}
