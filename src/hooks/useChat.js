import { useState, useRef, useEffect, useCallback } from "react";
import { AI_CONFIG, WELCOME_MESSAGE } from "../data/constants";

export function useChat(apiKey) {
  const [messages, setMessages] = useState([
    {
      ...WELCOME_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState("image/jpeg");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Refs — always hold latest values, eliminates stale closure bugs
  const inputRef = useRef(input);
  const imageRef = useRef(image);
  const image64Ref = useRef(imageBase64);
  const mimeRef = useRef(imageMimeType);
  const apiKeyRef = useRef(apiKey);

  useEffect(() => { inputRef.current = input; }, [input]);
  useEffect(() => { imageRef.current = image; }, [image]);
  useEffect(() => { image64Ref.current = imageBase64; }, [imageBase64]);
  useEffect(() => { mimeRef.current = imageMimeType; }, [imageMimeType]);
  useEffect(() => { apiKeyRef.current = apiKey; }, [apiKey]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Load image file → base64
  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageBase64(e.target.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }, []);

  const resetImage = useCallback(() => {
    setImage(null);
    setImageBase64(null);
  }, []);

  // ── Build Gemini API request body ──────────────────────────────────────────
  // Gemini format:
  // {
  //   "system_instruction": { "parts": [{ "text": "..." }] },
  //   "contents": [{
  //     "role": "user",
  //     "parts": [
  //       { "inline_data": { "mime_type": "image/jpeg", "data": "<base64>" } },
  //       { "text": "question" }
  //     ]
  //   }],
  //   "generationConfig": { "maxOutputTokens": 1500 }
  // }
  const buildGeminiBody = (msgText, currentB64, currentMime, conversationHistory) => {
    const parts = [];

    // Add image if present
    if (currentB64) {
      parts.push({
        inline_data: {
          mime_type: currentMime,
          data: currentB64,
        },
      });
    }

    // Add text
    parts.push({ text: msgText || "Please analyze this medical image and provide full details." });

    // Build contents array — include conversation history for context
    const contents = [
      // Previous messages for context (skip the welcome message)
      ...conversationHistory
        .filter((m) => m.role !== "assistant" || m.content !== WELCOME_MESSAGE.content)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      // Current user message
      { role: "user", parts },
    ];

    return {
      system_instruction: {
        parts: [{ text: AI_CONFIG.systemPrompt }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: AI_CONFIG.maxTokens,
        temperature: 0.4,
      },
    };
  };

  // ── Main send function ─────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const currentInput = inputRef.current;
    const currentImage = imageRef.current;
    const currentB64 = image64Ref.current;
    const currentMime = mimeRef.current;
    const currentApiKey = apiKeyRef.current;

    const msgText = (text !== undefined ? text : currentInput).trim();

    if (!msgText && !currentB64) return;

    if (!currentApiKey) {
      alert("Please enter your Google Gemini API key in the header bar.\n\nGet a free key at: https://aistudio.google.com/apikey");
      return;
    }

    // Capture current messages for history before state update
    const historySnapshot = messages;

    // Add user message immediately
    const userMsg = {
      role: "user",
      content: msgText || "Please analyze this medical image.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: currentImage,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Reset image immediately after capturing
    setImage(null);
    setImageBase64(null);

    try {
      await new Promise((r) => setTimeout(r, AI_CONFIG.typingDelayMs));

      const body = buildGeminiBody(msgText, currentB64, currentMime, historySnapshot);
      const endpoint = AI_CONFIG.getEndpoint(currentApiKey);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // Gemini error handling
      if (data.error) {
        throw new Error(`${data.error.message} (code: ${data.error.code})`);
      }

      // Extract text from Gemini response
      // Response shape: data.candidates[0].content.parts[0].text
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't process that. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      let friendlyError = err.message;

      // Gemini-specific error guidance
      if (err.message.includes("API_KEY_INVALID") || err.message.includes("400")) {
        friendlyError = "Invalid API key. Please check your Gemini API key and try again. Get one free at https://aistudio.google.com/apikey";
      } else if (err.message.includes("429")) {
        friendlyError = "Rate limit reached. You've hit the free tier limit. Please wait a moment and try again.";
      } else if (err.message.includes("SAFETY")) {
        friendlyError = "The image was blocked by Gemini's safety filters. Please try a clearer or different medical image.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Error: ${friendlyError}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  return {
    messages,
    input,
    setInput,
    image,
    isTyping,
    chatEndRef,
    handleFile,
    resetImage,
    sendMessage,
  };
}
