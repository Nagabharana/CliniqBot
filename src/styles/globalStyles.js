// ─────────────────────────────────────────────────────────────────────────────
// src/styles/globalStyles.js
// All CSS keyframes, animations, utility classes, and global resets.
// Inject via: useEffect(() => injectGlobalStyles(), []) in App.jsx
// Or import GLOBAL_CSS and place in a <style> tag.
// ─────────────────────────────────────────────────────────────────────────────

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── Reset & Base ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0A1628;
    color: #ffffff;
    overflow-x: hidden;
  }

  /* ── Keyframes ── */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.05); opacity: 0.8; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-18px); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes typing {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40%           { transform: scale(1); opacity: 1; }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 10px rgba(0,201,167,0.3); }
    50%       { box-shadow: 0 0 25px rgba(0,201,167,0.7); }
  }

  /* ── Utility Animation Classes ── */
  .fade-in       { animation: fadeIn 0.7s ease forwards; }
  .pulse-logo    { animation: pulse 3s ease-in-out infinite; }
  .float-icon    { animation: float 4s ease-in-out infinite; }
  .glow-border   { animation: glow 2s ease-in-out infinite; }

  /* ── Marquee ── */
  .marquee-track {
    display: flex;
    animation: marquee 30s linear infinite;
    width: max-content;
  }

  /* ── Typing Indicator ── */
  .typing-dot {
    display: inline-block;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #00C9A7;
    margin: 0 2px;
    animation: typing 1.2s ease-in-out infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }

  /* ── Hero Gradient Background ── */
  .hero-gradient {
    background: linear-gradient(135deg, #0A1628 0%, #0d2340 40%, #0a2e2a 70%, #0A1628 100%);
    background-size: 300% 300%;
    animation: gradientShift 8s ease infinite;
  }

  /* ── Glassmorphism ── */
  .glass {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .glass-card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(0,201,167,0.15);
  }

  /* ── Buttons ── */
  .teal-btn {
    background: linear-gradient(135deg, #00C9A7, #00a88c);
    transition: all 0.3s ease;
  }
  .teal-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,201,167,0.4);
  }
  .outline-btn {
    border: 1.5px solid #00C9A7;
    color: #00C9A7;
    transition: all 0.3s ease;
  }
  .outline-btn:hover {
    background: rgba(0,201,167,0.1);
    transform: translateY(-2px);
  }

  /* ── Cards ── */
  .feature-card { transition: all 0.3s ease; }
  .feature-card:hover {
    transform: translateY(-5px);
    border-color: rgba(0,201,167,0.4) !important;
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
  }

  /* ── Chips ── */
  .chip { transition: all 0.2s ease; cursor: pointer; }
  .chip:hover { background: rgba(0,201,167,0.25); transform: scale(1.03); }

  /* ── Upload Zone ── */
  .upload-zone { transition: all 0.3s ease; }
  .upload-zone:hover {
    border-color: #00C9A7 !important;
    box-shadow: 0 0 20px rgba(0,201,167,0.2);
  }

  /* ── Chat Bubbles ── */
  .user-bubble { background: linear-gradient(135deg, #00C9A7, #00a88c); }
  .ai-bubble {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
  }

  /* ── Navbar active link underline ── */
  .active-link::after {
    content: '';
    display: block;
    height: 2px;
    background: #00C9A7;
    animation: fadeIn 0.3s ease;
  }

  /* ── Mobile menu slide ── */
  .mobile-menu { animation: slideDown 0.3s ease; }

  /* ── Accordion ── */
  .accordion-content {
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.3s ease;
  }

  /* ── Scroll Reveal ── */
  .scroll-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0A1628; }
  ::-webkit-scrollbar-thumb { background: #00C9A7; border-radius: 3px; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .desktop-nav  { display: none !important; }
    .hamburger    { display: flex !important; }
    .chat-layout  { grid-template-columns: 1fr !important; height: auto !important; }
    .hide-mobile  { display: none !important; }
  }
`;

// Inject styles into document <head> — call once in App.jsx
export function injectGlobalStyles() {
  if (document.getElementById("cliniqbot-global-styles")) return;
  const tag = document.createElement("style");
  tag.id = "cliniqbot-global-styles";
  tag.textContent = GLOBAL_CSS;
  document.head.appendChild(tag);
}

// Design tokens — import these in components for consistent theming
export const COLORS = {
  navy:      "#0A1628",
  teal:      "#00C9A7",
  tealDark:  "#00a88c",
  red:       "#E63946",
  white:     "#FFFFFF",
  textMuted: "rgba(255,255,255,0.55)",
  textDim:   "rgba(255,255,255,0.35)",
  border:    "rgba(0,201,167,0.15)",
  cardBg:    "rgba(255,255,255,0.05)",
};

export const FONTS = {
  heading: "'Playfair Display', serif",
  body:    "'DM Sans', sans-serif",
};
