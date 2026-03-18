import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "../data/constants";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function FaqAccordion({ faqs = FAQS }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((faq, i) => (
        <div key={i} className="glass-card" style={{ borderRadius: 14, overflow: "hidden" }}>
          {/* Question button */}
          <button
            onClick={() => toggle(i)}
            style={{
              width: "100%",
              padding: "18px 24px",
              background: "none", border: "none",
              color: "#fff",
              fontFamily: FONTS.body,
              fontSize: 15, fontWeight: 500,
              cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              textAlign: "left", gap: 12,
            }}
            aria-expanded={openIdx === i}
          >
            <span>{faq.q}</span>
            {openIdx === i
              ? <ChevronUp size={18} color={COLORS.teal} />
              : <ChevronDown size={18} color="rgba(255,255,255,0.4)" />
            }
          </button>

          {/* Answer — animated via max-height */}
          <div
            className="accordion-content"
            style={{
              maxHeight: openIdx === i ? 300 : 0,
              opacity: openIdx === i ? 1 : 0,
            }}
          >
            <div
              style={{
                padding: "0 24px 20px",
                color: COLORS.textMuted,
                fontSize: 14, lineHeight: 1.8,
              }}
            >
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
