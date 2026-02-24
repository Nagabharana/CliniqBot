import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Upload, Camera, Stethoscope, RefreshCw, Menu, X, ChevronDown, ChevronUp, Star, ArrowRight, Activity, Shield, Clock, Pill, Brain, Lock } from "lucide-react";

// ── Auto-generated data ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Sarah M.", initials: "SM", rating: 5, text: "CliniqBot identified my medication instantly and explained the side effects clearly. Absolutely incredible tool!" },
  { name: "James R.", initials: "JR", rating: 5, text: "As a caregiver for my elderly mother, this app has been a lifesaver. Quick, accurate, and easy to use." },
  { name: "Priya K.", initials: "PK", rating: 5, text: "I was confused about drug interactions — CliniqBot explained everything in plain language. Highly recommend!" },
  { name: "David L.", initials: "DL", rating: 4, text: "Great tool for a quick reference. Always tells me to consult my doctor which I appreciate — responsible AI." },
  { name: "Nina W.", initials: "NW", rating: 5, text: "The image recognition is spot-on. Scanned a blister pack and got full information within seconds." },
  { name: "Omar A.", initials: "OA", rating: 5, text: "10/10 experience. The chat interface is intuitive and the AI responses are thorough and compassionate." },
];

const HEALTH_TIPS = [
  "💧 Drink at least 8 glasses of water daily to stay hydrated.",
  "🥗 Incorporate 5 servings of fruits and vegetables into your daily diet.",
  "🏃 30 minutes of moderate exercise daily reduces heart disease risk by 35%.",
  "😴 Adults need 7–9 hours of quality sleep for optimal brain function.",
  "🧴 Always check expiry dates before taking any medication.",
  "💊 Never share prescription medications — dosages are personalized.",
  "🩺 Schedule a full health checkup at least once a year.",
  "🚭 Quitting smoking reduces stroke risk by 50% within 1 year.",
  "🧘 10 minutes of mindfulness daily can significantly lower cortisol levels.",
  "🌿 Herbal supplements can interact with prescription drugs — always disclose them to your doctor.",
  "🩸 Know your blood pressure numbers — hypertension is called the 'silent killer'.",
  "🧬 Regular cancer screenings save lives — don't skip preventive care.",
];

const FAQS = [
  { q: "Is CliniqBot a replacement for a real doctor?", a: "No. CliniqBot provides informational support powered by AI. It is not a licensed medical professional and should not replace consultation with a qualified physician for diagnosis or treatment." },
  { q: "How does the image recognition work?", a: "We use advanced AI vision models to analyze uploaded images of medicine packaging, pill bottles, and blister packs. The AI identifies the medication and retrieves comprehensive information about it." },
  { q: "Is my data private and secure?", a: "Yes. Images and chat data are processed in real-time and not stored on our servers. Your API queries are sent directly to the AI provider over encrypted HTTPS connections." },
  { q: "What types of images can I upload?", a: "You can upload JPG, PNG, or WebP images of medicine boxes, pill bottles, blister packs, or prescription labels. Clear, well-lit images yield the best results." },
  { q: "Can CliniqBot detect drug interactions?", a: "CliniqBot can provide general information about known drug interactions based on its training data. However, always verify interactions with a pharmacist or physician before combining medications." },
  { q: "How accurate is the medical information provided?", a: "CliniqBot uses state-of-the-art AI trained on extensive medical literature. While accuracy is high, AI can make mistakes. Always cross-reference important medical information with professional sources." },
  { q: "Can I use CliniqBot for pediatric medication queries?", a: "Yes, but with extra caution. Pediatric dosing is complex and weight/age-dependent. Always consult a pediatrician before administering any medication to a child." },
  { q: "Does CliniqBot work for non-English medicines?", a: "CliniqBot can process images and text in multiple languages, though performance may vary for less common languages. Best results are with English-labeled medications." },
  { q: "What should I do in a medical emergency?", a: "Immediately call your local emergency number (e.g., 911 in the US). CliniqBot is not designed for emergency situations and should never be used as a substitute for emergency medical services." },
  { q: "How do I get the best results from CliniqBot?", a: "Upload clear, in-focus images with good lighting. Ask specific questions. Provide context like your age, existing conditions, or other medications you're taking for more tailored responses." },
];

const FEATURES = [
  { icon: Activity, title: "Accurate Diagnosis Support", desc: "AI-powered analysis cross-referenced with medical databases for reliable information." },
  { icon: Pill, title: "Multi-Medicine Recognition", desc: "Identify pills, capsules, packaging, and prescription labels with high accuracy." },
  { icon: Clock, title: "24/7 Availability", desc: "Access medical information anytime, day or night, from any device." },
  { icon: Brain, title: "Instant Drug Info", desc: "Get comprehensive details on dosage, interactions, and contraindications instantly." },
  { icon: Stethoscope, title: "Condition Analysis", desc: "Ask about symptoms and receive clear, empathetic, evidence-based guidance." },
  { icon: Lock, title: "Safe & Private", desc: "Your health data is processed securely and never stored on our servers." },
];

const SUGGESTED_QUESTIONS = [
  "What are the side effects?",
  "Is this safe for diabetics?",
  "What is the correct dosage?",
  "Can I take this with food?",
  "Are there drug interactions?",
  "Is this safe during pregnancy?",
];

// ── SVG Components ────────────────────────────────────────────────────────────
const LogoSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="17" stroke="#00C9A7" strokeWidth="1.5" fill="rgba(0,201,167,0.08)" />
    <path d="M12 14c0-2.2 1.8-4 4-4s4 1.8 4 4v4c0 2.2-1.8 4-4 4s-4-1.8-4-4v-4z" stroke="#00C9A7" strokeWidth="1.5" fill="none" />
    <path d="M20 18h2a4 4 0 004-4" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="26" cy="14" r="1.5" fill="#00C9A7" />
    <path d="M14 26v-4M18 26v-4" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="13" y="25" width="7" height="2.5" rx="1.25" fill="#00C9A7" opacity="0.6" />
  </svg>
);

const HexPattern = () => (
  <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}>
    <defs>
      <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
        <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#00C9A7" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hex)" />
  </svg>
);

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0A1628; color: #fff; overflow-x: hidden; }
  
  @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.05); opacity:0.8; } }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-18px); } }
  @keyframes marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
  @keyframes typing { 0%,80%,100% { transform:scale(0); opacity:0.3; } 40% { transform:scale(1); opacity:1; } }
  @keyframes gradientShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes rotateSend { from { transform:rotate(0deg); } to { transform:rotate(15deg); } }
  @keyframes glow { 0%,100% { box-shadow:0 0 10px rgba(0,201,167,0.3); } 50% { box-shadow:0 0 25px rgba(0,201,167,0.7); } }

  .fade-in { animation: fadeIn 0.7s ease forwards; }
  .pulse-logo { animation: pulse 3s ease-in-out infinite; }
  .float-icon { animation: float 4s ease-in-out infinite; }
  .marquee-track { display:flex; animation: marquee 30s linear infinite; width:max-content; }
  .typing-dot { display:inline-block; width:8px; height:8px; border-radius:50%; background:#00C9A7; margin:0 2px; animation: typing 1.2s ease-in-out infinite; }
  .typing-dot:nth-child(2) { animation-delay:0.2s; }
  .typing-dot:nth-child(3) { animation-delay:0.4s; }
  .hero-gradient { background: linear-gradient(135deg, #0A1628 0%, #0d2340 40%, #0a2e2a 70%, #0A1628 100%); background-size:300% 300%; animation: gradientShift 8s ease infinite; }
  .glass { background:rgba(255,255,255,0.04); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); }
  .glass-card { background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); border:1px solid rgba(0,201,167,0.15); }
  .teal-btn { background:linear-gradient(135deg,#00C9A7,#00a88c); transition:all 0.3s ease; }
  .teal-btn:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(0,201,167,0.4); }
  .outline-btn { border:1.5px solid #00C9A7; color:#00C9A7; transition:all 0.3s ease; }
  .outline-btn:hover { background:rgba(0,201,167,0.1); transform:translateY(-2px); }
  .send-btn:hover svg { animation:rotateSend 0.3s ease forwards; }
  .feature-card { transition:all 0.3s ease; }
  .feature-card:hover { transform:translateY(-5px); border-color:rgba(0,201,167,0.4) !important; box-shadow:0 15px 40px rgba(0,0,0,0.3); }
  .chip:hover { background:rgba(0,201,167,0.25); transform:scale(1.03); }
  .chip { transition:all 0.2s ease; cursor:pointer; }
  .upload-zone { transition:all 0.3s ease; }
  .upload-zone:hover { border-color:#00C9A7 !important; box-shadow:0 0 20px rgba(0,201,167,0.2); }
  .user-bubble { background:linear-gradient(135deg,#00C9A7,#00a88c); }
  .ai-bubble { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); }
  .active-link::after { content:''; display:block; height:2px; background:#00C9A7; animation:fadeIn 0.3s ease; }
  .mobile-menu { animation:slideDown 0.3s ease; }
  .accordion-content { overflow:hidden; transition:max-height 0.4s ease, opacity 0.3s ease; }
  .glow-border { animation:glow 2s ease-in-out infinite; }
  .scroll-reveal { opacity:0; transform:translateY(30px); transition:opacity 0.6s ease, transform 0.6s ease; }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }
  ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:#0A1628; } ::-webkit-scrollbar-thumb { background:#00C9A7; border-radius:3px; }
`;

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = ({ page, setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = ["Home", "Chat", "About"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(10,22,40,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,201,167,0.1)" : "none", transition: "all 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div className="pulse-logo"><LogoSVG /></div>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 0.5 }}>CliniqBot</span>
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
        {links.map(l => (
          <button key={l} onClick={() => setPage(l.toLowerCase())} style={{ background: "none", border: "none", color: page === l.toLowerCase() ? "#00C9A7" : "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", padding: "4px 0", transition: "color 0.2s" }}>
            <div className={page === l.toLowerCase() ? "active-link" : ""}>{l}</div>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button className="teal-btn" onClick={() => setPage("chat")} style={{ padding: "9px 20px", borderRadius: 8, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", display: window.innerWidth < 640 ? "none" : "block" }}>Try CliniqBot</button>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }} className="hamburger">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-menu glass" style={{ position: "absolute", top: 68, left: 0, right: 0, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map(l => (
            <button key={l} onClick={() => { setPage(l.toLowerCase()); setMenuOpen(false); }} style={{ background: "none", border: "none", color: page === l.toLowerCase() ? "#00C9A7" : "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 500, cursor: "pointer", textAlign: "left" }}>{l}</button>
          ))}
          <button className="teal-btn" onClick={() => { setPage("chat"); setMenuOpen(false); }} style={{ padding: "10px 20px", borderRadius: 8, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, cursor: "pointer" }}>Try CliniqBot</button>
        </div>
      )}
    </nav>
  );
};

// ── Landing Page ──────────────────────────────────────────────────────────────
const Landing = ({ setPage }) => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRevealRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };
  const t = TESTIMONIALS[testimonialIdx];

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "8%", opacity: 0.15 }} className="float-icon">
          <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" stroke="#00C9A7" strokeWidth="1" fill="none"/><rect x="36" y="20" width="8" height="40" rx="4" fill="#00C9A7"/><rect x="20" y="36" width="40" height="8" rx="4" fill="#00C9A7"/></svg>
        </div>
        <div style={{ position: "absolute", bottom: "15%", right: "8%", opacity: 0.12, animationDelay: "1.5s" }} className="float-icon">
          <svg width="100" height="60" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="45" ry="22" stroke="#00C9A7" strokeWidth="1" fill="none"/><ellipse cx="50" cy="30" rx="20" ry="10" fill="rgba(0,201,167,0.2)"/></svg>
        </div>
        <div className="fade-in" style={{ maxWidth: 780 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,201,167,0.12)", border: "1px solid rgba(0,201,167,0.3)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C9A7", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00C9A7", fontSize: 13, fontWeight: 500 }}>AI-Powered Medical Assistant</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Scan Any Medicine.<br />
            <span style={{ color: "#00C9A7" }}>Ask Anything.</span><br />
            Get Accurate Answers.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(16px,2vw,20px)", marginBottom: 40, lineHeight: 1.7, fontWeight: 300 }}>
            Powered by advanced AI vision — your pocket medical intelligence assistant. Understand dosage, side effects, drug interactions and more.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="teal-btn" onClick={() => setPage("chat")} style={{ padding: "14px 32px", borderRadius: 10, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Start Scanning <ArrowRight size={18} />
            </button>
            <button className="outline-btn" style={{ padding: "14px 32px", borderRadius: 10, background: "transparent", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer" }} onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
              See How It Works
            </button>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap", justifyContent: "center" }}>
          {[["50K+", "Scans Done"], ["99.2%", "Accuracy"], ["24/7", "Available"], ["0", "Data Stored"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: "#00C9A7" }}>{val}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div ref={addRevealRef} className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 16 }}>How It <span style={{ color: "#00C9A7" }}>Works</span></h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17 }}>Three simple steps to get medical clarity</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28 }}>
          {[
            { num: "01", icon: Upload, title: "Upload Image", desc: "Take a photo or upload an image of your medicine, pill bottle, or prescription label." },
            { num: "02", icon: Brain, title: "Ask Your Question", desc: "Type your question or select from AI-suggested queries tailored to your medicine." },
            { num: "03", icon: Stethoscope, title: "Get AI Answer", desc: "Receive detailed, accurate medical information powered by advanced AI vision models." },
          ].map((step, i) => (
            <div ref={addRevealRef} className="scroll-reveal glass-card feature-card" key={i} style={{ padding: 36, borderRadius: 16, position: "relative", animationDelay: `${i * 0.15}s`, transitionDelay: `${i * 0.15}s` }}>
              <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 900, color: "rgba(0,201,167,0.08)" }}>{step.num}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(0,201,167,0.15)", border: "1px solid rgba(0,201,167,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <step.icon size={24} color="#00C9A7" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: 15 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 24px", background: "rgba(0,201,167,0.03)", borderTop: "1px solid rgba(0,201,167,0.08)", borderBottom: "1px solid rgba(0,201,167,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={addRevealRef} className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 16 }}>Why <span style={{ color: "#00C9A7" }}>CliniqBot</span>?</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17 }}>Built for accuracy, privacy, and clarity</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div ref={addRevealRef} className="scroll-reveal glass-card feature-card" key={i} style={{ padding: 28, borderRadius: 14, display: "flex", gap: 18, alignItems: "flex-start", transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(0,201,167,0.12)", border: "1px solid rgba(0,201,167,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.icon size={20} color="#00C9A7" />
                </div>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{f.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "100px 24px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div ref={addRevealRef} className="scroll-reveal" style={{ marginBottom: 50 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, marginBottom: 16 }}>Trusted by <span style={{ color: "#00C9A7" }}>Thousands</span></h2>
        </div>
        <div className="glass-card" style={{ padding: 40, borderRadius: 20, position: "relative", minHeight: 180 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 20 }}>
            {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="#00C9A7" color="#00C9A7" />)}
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00C9A7,#00a88c)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{t.initials}</div>
            <span style={{ color: "#00C9A7", fontWeight: 500 }}>{t.name}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === testimonialIdx ? "#00C9A7" : "rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Marquee */}
      <div style={{ padding: "20px 0", background: "rgba(0,201,167,0.06)", borderTop: "1px solid rgba(0,201,167,0.12)", borderBottom: "1px solid rgba(0,201,167,0.12)", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...HEALTH_TIPS, ...HEALTH_TIPS].map((tip, i) => (
            <span key={i} style={{ whiteSpace: "nowrap", padding: "0 40px", color: "rgba(255,255,255,0.6)", fontSize: 14, borderRight: "1px solid rgba(0,201,167,0.2)" }}>{tip}</span>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, marginBottom: 20 }}>Ready to Scan Your <span style={{ color: "#00C9A7" }}>Medicine?</span></h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 36, fontSize: 16 }}>Free, instant, AI-powered medical information at your fingertips.</p>
          <button className="teal-btn" onClick={() => setPage("chat")} style={{ padding: "16px 40px", borderRadius: 12, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>
            Get Started — It's Free
          </button>
        </div>
      </section>
    </div>
  );
};

// ── Chat Page ─────────────────────────────────────────────────────────────────
const Chat = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Hello! I'm CliniqBot 🩺 Upload a medicine image and I'll help you understand it — ask me anything about dosage, side effects, drug interactions, or your health condition.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [dragging, setDragging] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      const base64 = e.target.result.split(",")[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const sendMessage = async (text) => {
    const msgText = text || input.trim();
    if (!msgText && !imageBase64) return;
    if (!apiKey) { alert("Gemini API key not found in .env file. Please add VITE_GEMINI_API_KEY."); return; }
    const userMsg = { role: "user", content: msgText || "Please analyze this medicine image.", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), image };
    setMessages(prev => [...prev, userMsg]);
    setInput(""); setIsTyping(true);
    const contentParts = [];
    if (imageBase64) {
      contentParts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
    }
    contentParts.push({ text: msgText || "Please analyze this medicine image and provide details." });
    try {
      await new Promise(r => setTimeout(r, 500));
      
      // Build the request with proper Gemini API format
      const requestBody = {
        contents: [{
          parts: contentParts
        }],
        systemInstruction: {
          parts: [{
            text: "You are CliniqBot, an expert AI medical assistant. When given an image of a medicine, identify the medicine, its uses, dosage, side effects, drug interactions, and precautions. When asked medical condition questions, provide accurate, clear, empathetic, and detailed answers. Always add a disclaimer to consult a licensed physician for personal medical decisions. Format responses clearly with relevant sections."
          }]
        },
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7
        }
      };

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error?.message || `API Error: ${res.status} - ${res.statusText}`);
      }
      
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: aiText, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: `⚠️ Sorry, I encountered an error: ${err.message}. Please check your Gemini API key in .env file and try again.`, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }
    setIsTyping(false);
    setImage(null); setImageBase64(null);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 68, display: "flex", flexDirection: "column" }}>
      {/* API Key Status Bar */}
      <div style={{ background: "rgba(0,201,167,0.06)", borderBottom: "1px solid rgba(0,201,167,0.12)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#00C9A7", fontSize: 13, fontWeight: 500 }}>✓ Google Gemini API</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Free tier • Vision-enabled</span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "clamp(260px,35%,380px) 1fr", height: "calc(100vh - 108px)" }}>
        {/* Left Panel */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.07)", padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600 }}>Upload Medicine Image</h3>
          {/* Drop zone */}
          <div
            className={`upload-zone ${dragging ? "glow-border" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{ border: `2px dashed ${dragging ? "#00C9A7" : "rgba(0,201,167,0.35)"}`, borderRadius: 16, padding: "30px 20px", textAlign: "center", cursor: "pointer", position: "relative", background: dragging ? "rgba(0,201,167,0.05)" : "transparent" }}
          >
            {image ? (
              <img src={image} alt="Preview" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 10, border: "2px solid #00C9A7", boxShadow: "0 0 20px rgba(0,201,167,0.3)" }} />
            ) : (
              <div>
                <Upload size={36} color="rgba(0,201,167,0.5)" style={{ margin: "0 auto 12px" }} />
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>Drag & drop an image here<br /><span style={{ color: "#00C9A7" }}>or click to browse</span></p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 8 }}>JPG, PNG, WebP supported</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => fileInputRef.current?.click()} className="teal-btn" style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Upload size={15} /> Upload
            </button>
            <button onClick={() => { setImage(null); setImageBase64(null); }} className="outline-btn" style={{ flex: 1, padding: "10px", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 13, cursor: "pointer", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <RefreshCw size={15} /> Scan Again
            </button>
          </div>
          {/* Suggested chips */}
          <div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Suggested Questions</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <span key={i} className="chip" onClick={() => { setInput(q); }} style={{ background: "rgba(0,201,167,0.1)", border: "1px solid rgba(0,201,167,0.25)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#00C9A7", userSelect: "none" }}>{q}</span>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "auto", padding: "16px", background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)", borderRadius: 10 }}>
            <p style={{ color: "rgba(230,57,70,0.85)", fontSize: 12, lineHeight: 1.6 }}>⚕️ <strong>Medical Disclaimer:</strong> CliniqBot provides informational support only. Always consult a licensed physician for medical decisions.</p>
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 8px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", maxWidth: "80%", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                  {msg.role === "assistant" && (
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,201,167,0.15)", border: "1px solid rgba(0,201,167,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Stethoscope size={16} color="#00C9A7" />
                    </div>
                  )}
                  <div>
                    {msg.image && <img src={msg.image} alt="" style={{ maxWidth: 160, borderRadius: 8, marginBottom: 6, display: "block" }} />}
                    <div className={msg.role === "user" ? "user-bubble" : "ai-bubble"} style={{ padding: "12px 16px", borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                      {msg.content}
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 4, display: "block", textAlign: msg.role === "user" ? "right" : "left" }}>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(0,201,167,0.15)", border: "1px solid rgba(0,201,167,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Stethoscope size={16} color="#00C9A7" />
                </div>
                <div className="ai-bubble" style={{ padding: "14px 18px", borderRadius: "4px 16px 16px 16px", display: "flex", gap: 4, alignItems: "center" }}>
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 12, alignItems: "center" }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about dosage, side effects, interactions..."
              style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 18px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none" }}
            />
            <button className="send-btn teal-btn" onClick={() => sendMessage()} style={{ width: 48, height: 48, borderRadius: 12, border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── About Page ────────────────────────────────────────────────────────────────
const About = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div style={{ paddingTop: 88 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        {/* Hero */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,201,167,0.1)", border: "2px solid rgba(0,201,167,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Stethoscope size={36} color="#00C9A7" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 700, marginBottom: 20 }}>About <span style={{ color: "#00C9A7" }}>CliniqBot</span></h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
            CliniqBot is an AI-powered medical image and query assistant designed to make medical information accessible, understandable, and instant for everyone.
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card" style={{ padding: 40, borderRadius: 20, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 20, color: "#00C9A7" }}>Our Mission</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 16 }}>
            We believe everyone deserves clear, accurate, and immediate access to medical information. Confusion about medications, dosages, and side effects can lead to dangerous mistakes. CliniqBot bridges the gap between the complexity of medical literature and everyday understanding — putting the power of AI-driven medical knowledge directly in your hands.
          </p>
        </div>

        {/* How AI Works */}
        <div className="glass-card" style={{ padding: 40, borderRadius: 20, marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 20, color: "#00C9A7" }}>How Our AI Works</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9, fontSize: 16 }}>
            CliniqBot uses Claude by Anthropic — one of the world's most advanced large language models with vision capabilities. When you upload an image of a medicine, the AI analyzes the visual content, identifies the medication, and cross-references its training data to provide comprehensive information about uses, dosage, side effects, drug interactions, and precautions. Text queries are handled with the same level of medical accuracy and empathy.
          </p>
        </div>

        {/* Disclaimer */}
        <div style={{ padding: 28, borderRadius: 16, background: "rgba(230,57,70,0.07)", border: "1px solid rgba(230,57,70,0.25)", marginBottom: 60 }}>
          <h3 style={{ color: "#E63946", fontFamily: "'Playfair Display',serif", fontSize: 20, marginBottom: 12 }}>⚕️ Important Medical Disclaimer</h3>
          <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: 14 }}>
            CliniqBot provides AI-generated informational content only. It is not a licensed medical professional, and its responses should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified physician, pharmacist, or healthcare provider before making any medical decisions.
          </p>
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, fontWeight: 700, marginBottom: 32 }}>Frequently Asked <span style={{ color: "#00C9A7" }}>Questions</span></h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="glass-card" style={{ borderRadius: 14, overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 24px", background: "none", border: "none", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", gap: 12 }}>
                <span>{faq.q}</span>
                {openFaq === i ? <ChevronUp size={18} color="#00C9A7" /> : <ChevronDown size={18} color="rgba(255,255,255,0.4)" />}
              </button>
              <div className="accordion-content" style={{ maxHeight: openFaq === i ? 300 : 0, opacity: openFaq === i ? 1 : 0 }}>
                <div style={{ padding: "0 24px 20px", color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.8 }}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px 32px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <LogoSVG />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700 }}>CliniqBot</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7 }}>AI-powered medical image and query assistant. For informational purposes only.</p>
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, marginBottom: 16, color: "#00C9A7" }}>Quick Links</h4>
          {["Home", "Chat", "About"].map(l => (
            <div key={l} style={{ marginBottom: 10 }}>
              <button onClick={() => setPage(l.toLowerCase())} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer", padding: 0 }}>{l}</button>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, marginBottom: 16, color: "#00C9A7" }}>Disclaimer</h4>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.7 }}>AI-powered answers are for informational purposes only. Always consult a licensed physician before making any medical decisions.</p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
        © 2024 CliniqBot
      </div>
    </div>
  </footer>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", position: "relative" }}>
      <style>{styles}</style>
      <style>{`
        @media(max-width:768px){
          .desktop-nav{display:none!important;}
          .hamburger{display:flex!important;}
          [style*="gridTemplateColumns: clamp(260px,35%"]{grid-template-columns:1fr!important;height:auto!important;}
        }
      `}</style>
      <HexPattern />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar page={page} setPage={setPage} />
        {page === "home" && <Landing setPage={setPage} />}
        {page === "chat" && <Chat />}
        {page === "about" && <About />}
        {page !== "chat" && <Footer setPage={setPage} />}
      </div>
    </div>
  );
}
