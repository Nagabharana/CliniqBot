import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LogoSVG from "./LogoSVG";
import { NAV_LINKS } from "../data/constants";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    padding: "0 24px",
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: scrolled ? "rgba(10,22,40,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? `1px solid rgba(0,201,167,0.1)` : "none",
    transition: "all 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        <div className="pulse-logo"><LogoSVG /></div>
        <span style={{ fontFamily: FONTS.heading, fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>
          CliniqBot
        </span>
      </div>

      {/* Desktop links */}
      <div className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((label) => {
          const active = page === label.toLowerCase();
          return (
            <button
              key={label}
              onClick={() => setPage(label.toLowerCase())}
              style={{
                background: "none", border: "none",
                color: active ? COLORS.teal : "rgba(255,255,255,0.7)",
                fontFamily: FONTS.body,
                fontSize: 15, fontWeight: 500,
                cursor: "pointer",
                padding: "4px 0",
                transition: "color 0.2s",
              }}
            >
              <div className={active ? "active-link" : ""}>{label}</div>
            </button>
          );
        })}
      </div>

      {/* CTA + Hamburger */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          className="teal-btn hide-mobile"
          onClick={() => setPage("chat")}
          style={{
            padding: "9px 20px", borderRadius: 8,
            border: "none", color: "#fff",
            fontFamily: FONTS.body, fontWeight: 600, fontSize: 14,
            cursor: "pointer",
          }}
        >
          Try CliniqBot
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="mobile-menu glass"
          style={{
            position: "absolute", top: 68, left: 0, right: 0,
            padding: "20px 24px",
            display: "flex", flexDirection: "column", gap: 16,
          }}
        >
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              onClick={() => { setPage(label.toLowerCase()); setMenuOpen(false); }}
              style={{
                background: "none", border: "none",
                color: page === label.toLowerCase() ? COLORS.teal : "#fff",
                fontFamily: FONTS.body, fontSize: 16, fontWeight: 500,
                cursor: "pointer", textAlign: "left",
              }}
            >
              {label}
            </button>
          ))}
          <button
            className="teal-btn"
            onClick={() => { setPage("chat"); setMenuOpen(false); }}
            style={{
              padding: "10px 20px", borderRadius: 8,
              border: "none", color: "#fff",
              fontFamily: FONTS.body, fontWeight: 600, cursor: "pointer",
            }}
          >
            Try CliniqBot
          </button>
        </div>
      )}
    </nav>
  );
}
