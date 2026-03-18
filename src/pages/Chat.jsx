// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Chat.jsx
// Updated for Google Gemini API — header bar updated with Gemini branding + link
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useChat } from "../hooks/useChat";
import ImageUploadPanel from "../components/ImageUploadPanel";
import ChatPanel from "../components/ChatPanel";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function Chat() {
  const [apiKey, setApiKey] = useState("");
  const chat = useChat(apiKey);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 68, display: "flex", flexDirection: "column" }}>

      {/* ── Gemini API Key Bar ── */}
      <div
        style={{
          background: "rgba(0,201,167,0.06)",
          borderBottom: "1px solid rgba(0,201,167,0.12)",
          padding: "10px 24px",
          display: "flex", alignItems: "center", gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Gemini badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div style={{
            background: "linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)",
            borderRadius: 4, width: 14, height: 14,
          }} />
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: FONTS.body }}>
            Gemini API Key:
          </span>
        </div>

        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIza..."
          style={{
            flex: 1, minWidth: 200, maxWidth: 420,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(0,201,167,0.2)`,
            borderRadius: 8,
            padding: "7px 14px",
            color: "#fff",
            fontFamily: FONTS.body,
            fontSize: 13, outline: "none",
          }}
        />

        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: COLORS.teal, fontSize: 12,
            textDecoration: "none",
            border: `1px solid rgba(0,201,167,0.25)`,
            borderRadius: 6, padding: "4px 10px",
            fontFamily: FONTS.body,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Get Free Key →
        </a>

        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          Free · No credit card required
        </span>
      </div>

      {/* ── Split Layout ── */}
      <div
        className="chat-layout"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "clamp(260px, 35%, 380px) 1fr",
          height: "calc(100vh - 108px)",
        }}
      >
        <ImageUploadPanel
          image={chat.image}
          handleFile={chat.handleFile}
          resetImage={chat.resetImage}
          setInput={chat.setInput}
        />
        <ChatPanel
          messages={chat.messages}
          input={chat.input}
          setInput={chat.setInput}
          isTyping={chat.isTyping}
          chatEndRef={chat.chatEndRef}
          sendMessage={chat.sendMessage}
        />
      </div>
    </div>
  );
}
