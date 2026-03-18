import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/constants";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section style={{ padding: "100px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      <h2
        style={{
          fontFamily: FONTS.heading,
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          marginBottom: 50,
        }}
      >
        Trusted by <span style={{ color: COLORS.teal }}>Thousands</span>
      </h2>

      <div className="glass-card" style={{ padding: 40, borderRadius: 20, minHeight: 200 }}>
        {/* Stars */}
        <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 20 }}>
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={18} fill={COLORS.teal} color={COLORS.teal} />
          ))}
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: 18, lineHeight: 1.8,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 24, fontStyle: "italic",
          }}
        >
          "{t.text}"
        </p>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
          <div
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 13, color: "#fff",
            }}
          >
            {t.initials}
          </div>
          <span style={{ color: COLORS.teal, fontWeight: 500, fontFamily: FONTS.body }}>{t.name}</span>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 24 : 8,
                height: 8, borderRadius: 4,
                background: i === idx ? COLORS.teal : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
