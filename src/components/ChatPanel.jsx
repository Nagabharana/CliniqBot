import { Stethoscope, Send } from "lucide-react";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function ChatPanel({
  messages,
  input,
  setInput,
  isTyping,
  chatEndRef,
  sendMessage,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 8px" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                maxWidth: "80%",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
              }}
            >
              {/* AI avatar */}
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "rgba(0,201,167,0.15)",
                    border: "1px solid rgba(0,201,167,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Stethoscope size={16} color={COLORS.teal} />
                </div>
              )}

              <div>
                {/* Attached image thumbnail */}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt=""
                    style={{ maxWidth: 160, borderRadius: 8, marginBottom: 6, display: "block" }}
                  />
                )}

                {/* Bubble */}
                <div
                  className={msg.role === "user" ? "user-bubble" : "ai-bubble"}
                  style={{
                    padding: "12px 16px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    fontSize: 14,
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                    fontFamily: FONTS.body,
                  }}
                >
                  {msg.content}
                </div>

                {/* Timestamp */}
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 11, marginTop: 4,
                    display: "block",
                    textAlign: msg.role === "user" ? "right" : "left",
                  }}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
            <div
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(0,201,167,0.15)",
                border: "1px solid rgba(0,201,167,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Stethoscope size={16} color={COLORS.teal} />
            </div>
            <div
              className="ai-bubble"
              style={{
                padding: "14px 18px",
                borderRadius: "4px 16px 16px 16px",
                display: "flex", gap: 4, alignItems: "center",
              }}
            >
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", gap: 12, alignItems: "center",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about dosage, side effects, interactions..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            padding: "13px 18px",
            color: "#fff",
            fontFamily: FONTS.body,
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          className="send-btn teal-btn"
          onClick={() => sendMessage()}
          aria-label="Send message"
          style={{
            width: 48, height: 48, borderRadius: 12,
            border: "none", color: "#fff",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
