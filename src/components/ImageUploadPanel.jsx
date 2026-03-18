// ─────────────────────────────────────────────────────────────────────────────
// src/components/ImageUploadPanel.jsx
// Left panel of Chat page: drag-drop zone, upload button, suggested chips.
// Updated to support X-rays, MRI, CT scans, and medicine images.
// Props: image, handleFile, resetImage, setInput
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback } from "react";
import { Upload, RefreshCw, ScanLine } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "../data/constants";
import { FONTS, COLORS } from "../styles/globalStyles";

export default function ImageUploadPanel({ image, handleFile, resetImage, setInput }) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div
      style={{
        borderRight: "1px solid rgba(255,255,255,0.07)",
        padding: 24,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Header */}
      <div>
        <h3 style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 600, marginBottom: 6 }}>
          Upload Medical Image
        </h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6 }}>
          Supports X-rays, MRI, CT scans, medicine packaging & prescription labels
        </p>
      </div>

      {/* Supported types badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["🦴 X-Ray", "🧠 MRI", "🔬 CT Scan", "💊 Medicine"].map((label) => (
          <span
            key={label}
            style={{
              background: "rgba(0,201,167,0.08)",
              border: "1px solid rgba(0,201,167,0.2)",
              borderRadius: 20,
              padding: "3px 10px",
              fontSize: 11,
              color: "rgba(0,201,167,0.85)",
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Drop zone */}
      <div
        className={`upload-zone ${dragging ? "glow-border" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? COLORS.teal : "rgba(0,201,167,0.35)"}`,
          borderRadius: 16,
          padding: "30px 20px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(0,201,167,0.05)" : "transparent",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Medical image preview"
            style={{
              maxWidth: "100%", maxHeight: 200,
              borderRadius: 10,
              border: `2px solid ${COLORS.teal}`,
              boxShadow: "0 0 20px rgba(0,201,167,0.3)",
            }}
          />
        ) : (
          <div>
            <ScanLine size={36} color="rgba(0,201,167,0.5)" style={{ margin: "0 auto 12px", display: "block" }} />
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>
              Drag & drop your medical image here
              <br />
              <span style={{ color: COLORS.teal }}>or click to browse</span>
            </p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 8 }}>
              JPG, PNG, WebP — X-ray, MRI, CT, Medicine
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="teal-btn"
          style={{
            flex: 1, padding: "10px", borderRadius: 8,
            border: "none", color: "#fff",
            fontFamily: FONTS.body, fontWeight: 500, fontSize: 13,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Upload size={15} /> Upload
        </button>
        <button
          onClick={resetImage}
          className="outline-btn"
          style={{
            flex: 1, padding: "10px", borderRadius: 8,
            fontFamily: FONTS.body, fontWeight: 500, fontSize: 13,
            cursor: "pointer", background: "transparent",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <RefreshCw size={15} /> Clear
        </button>
      </div>

      {/* Suggested question chips — split by category */}
      <div>
        <p
          style={{
            color: "rgba(255,255,255,0.45)", fontSize: 12,
            marginBottom: 8, textTransform: "uppercase", letterSpacing: 1,
          }}
        >
          🦴 Imaging Questions
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
            <span
              key={i}
              className="chip"
              onClick={() => setInput(q)}
              style={{
                background: "rgba(0,201,167,0.1)",
                border: "1px solid rgba(0,201,167,0.25)",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                color: COLORS.teal,
                userSelect: "none",
              }}
            >
              {q}
            </span>
          ))}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.45)", fontSize: 12,
            marginBottom: 8, textTransform: "uppercase", letterSpacing: 1,
          }}
        >
          💊 Medicine Questions
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {SUGGESTED_QUESTIONS.slice(4).map((q, i) => (
            <span
              key={i}
              className="chip"
              onClick={() => setInput(q)}
              style={{
                background: "rgba(0,201,167,0.1)",
                border: "1px solid rgba(0,201,167,0.25)",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                color: COLORS.teal,
                userSelect: "none",
              }}
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          marginTop: "auto",
          padding: 16,
          background: "rgba(230,57,70,0.08)",
          border: "1px solid rgba(230,57,70,0.2)",
          borderRadius: 10,
        }}
      >
        <p style={{ color: "rgba(230,57,70,0.85)", fontSize: 12, lineHeight: 1.6 }}>
          ⚕️ <strong>Medical Disclaimer:</strong> CliniqBot provides informational support only.
          Always consult a licensed physician or radiologist for medical decisions.
        </p>
      </div>
    </div>
  );
}
