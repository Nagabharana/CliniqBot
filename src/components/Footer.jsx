import LogoSVG from "./LogoSVG";
import { NAV_LINKS } from "../data/constants";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function Footer({ setPage }) {
  return (
    <footer
      style={{
        background: "rgba(0,0,0,0.4)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <LogoSVG />
              <span style={{ fontFamily: FONTS.heading, fontSize: 20, fontWeight: 700 }}>CliniqBot</span>
            </div>
            <p style={{ color: COLORS.textDim, fontSize: 13, lineHeight: 1.7 }}>
              AI-powered medical image and query assistant. For informational purposes only.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: FONTS.heading, fontSize: 16, marginBottom: 16, color: COLORS.teal }}>
              Quick Links
            </h4>
            {NAV_LINKS.map((label) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => setPage(label.toLowerCase())}
                  style={{
                    background: "none", border: "none",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: FONTS.body, fontSize: 14,
                    cursor: "pointer", padding: 0,
                  }}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div>
            <h4 style={{ fontFamily: FONTS.heading, fontSize: 16, marginBottom: 16, color: COLORS.teal }}>
              Disclaimer
            </h4>
            <p style={{ color: COLORS.textDim, fontSize: 12, lineHeight: 1.7 }}>
              AI-powered answers are for informational purposes only. Always consult a licensed physician
              before making any medical decisions.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            textAlign: "center",
            color: COLORS.textDim,
            fontSize: 12,
          }}
        >
          © {new Date().getFullYear()} CliniqBot — Built with Claude AI by Anthropic
        </div>
      </div>
    </footer>
  );
}
