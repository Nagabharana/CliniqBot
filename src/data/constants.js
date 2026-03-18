export const TESTIMONIALS = [
  { name: "Sarah M.", initials: "SM", rating: 5, text: "CliniqBot identified my medication instantly and explained the side effects clearly. Absolutely incredible tool!" },
  { name: "James R.", initials: "JR", rating: 5, text: "As a caregiver for my elderly mother, this app has been a lifesaver. Quick, accurate, and easy to use." },
  { name: "Priya K.", initials: "PK", rating: 5, text: "I uploaded my hand X-ray and CliniqBot gave me a detailed analysis before my doctor's appointment. Amazing!" },
  { name: "David L.", initials: "DL", rating: 4, text: "Great tool for a quick reference. Always tells me to consult my doctor which I appreciate — responsible AI." },
  { name: "Nina W.", initials: "NW", rating: 5, text: "Used it to understand my MRI report. The explanations were clear, compassionate, and thorough." },
  { name: "Omar A.", initials: "OA", rating: 5, text: "10/10 experience. Uploaded an X-ray of my fractured wrist — the analysis was spot on and very detailed." },
];

export const HEALTH_TIPS = [
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
  "🦴 Calcium and Vitamin D are essential for strong bones — especially after age 40.",
  "🔬 Early detection of fractures via X-ray prevents long-term complications.",
];

export const FAQS = [
  {
    q: "Is CliniqBot a replacement for a real doctor?",
    a: "No. CliniqBot provides informational support powered by AI. It is not a licensed medical professional and should not replace consultation with a qualified physician, radiologist, or specialist for diagnosis or treatment.",
  },
  {
    q: "Can CliniqBot analyze X-rays and MRI scans?",
    a: "Yes! CliniqBot uses Google Gemini's advanced AI vision to analyze medical imaging including X-rays, MRI scans, CT scans, and ultrasound images. It can identify visible structures, describe potential abnormalities, and provide clinical context.",
  },
  {
    q: "Can CliniqBot detect fractures from an X-ray?",
    a: "CliniqBot can analyze X-ray images and describe visible bone structures, potential fracture lines, displacement, and affected areas. However, fracture diagnosis must be confirmed by a licensed radiologist or orthopedic specialist.",
  },
  {
    q: "Which AI powers CliniqBot?",
    a: "CliniqBot is powered by Google Gemini — Google's most capable multimodal AI model, available free via Google AI Studio.",
  },
  {
    q: "What types of images can I upload?",
    a: "You can upload JPG, PNG, or WebP images of X-rays, MRI scans, CT scans, ultrasound images, medicine boxes, pill bottles, blister packs, or prescription labels.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. Images and chat data are processed in real-time and sent directly to Google's Gemini API over encrypted HTTPS. Nothing is stored on our servers.",
  },
  {
    q: "Is the Gemini API really free?",
    a: "Yes! Google Gemini has a free tier via Google AI Studio with generous rate limits — no credit card required. Perfect for personal use.",
  },
  {
    q: "How accurate is the medical image analysis?",
    a: "Google Gemini is trained on vast medical data and performs well on medical image analysis. However, always consult a radiologist or specialist for official diagnosis.",
  },
  {
    q: "What should I do in a medical emergency?",
    a: "Immediately call your local emergency number (e.g., 911 in the US, 112 in Europe). CliniqBot is not designed for emergency situations.",
  },
  {
    q: "How do I get the best results from CliniqBot?",
    a: "Upload clear, in-focus, well-lit images. For X-rays, use the original digital image if possible. Ask specific questions and provide relevant context like age and symptoms.",
  },
];

export const FEATURES = [
  { iconName: "ScanLine", title: "X-Ray & Scan Analysis", desc: "Upload X-rays, MRIs, and CT scans for detailed Gemini AI-powered visual analysis." },
  { iconName: "Pill", title: "Medicine Recognition", desc: "Identify pills, capsules, packaging, and prescription labels with high accuracy." },
  { iconName: "Activity", title: "Fracture Detection", desc: "AI analyzes bone structures in X-rays and describes visible fractures and severity." },
  { iconName: "Brain", title: "Instant Medical Info", desc: "Get comprehensive details on conditions, dosage, interactions, and treatments instantly." },
  { iconName: "Stethoscope", title: "Symptom & Condition Guidance", desc: "Ask about symptoms and receive clear, empathetic, evidence-based guidance." },
  { iconName: "Lock", title: "Safe & Private", desc: "Your health data and images are processed securely and never stored on our servers." },
];

export const SUGGESTED_QUESTIONS = [
  "Is there a visible fracture?",
  "What bones are affected?",
  "How severe does this look?",
  "What treatment is typically needed?",
  "What are the side effects?",
  "What is the correct dosage?",
  "Are there drug interactions?",
  "Is this safe during pregnancy?",
];

export const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    iconName: "Upload",
    title: "Upload Any Medical Image",
    desc: "Upload an X-ray, MRI, CT scan, medicine photo, or prescription label — any medical image works.",
  },
  {
    num: "02",
    iconName: "Brain",
    title: "Ask Your Question",
    desc: "Type your question or pick from AI-suggested queries tailored to your image type.",
  },
  {
    num: "03",
    iconName: "Stethoscope",
    title: "Get AI Analysis",
    desc: "Receive detailed, accurate medical information powered by Google Gemini AI vision.",
  },
];

export const STATS = [
  { value: "50K+", label: "Images Analyzed" },
  { value: "99.2%", label: "Accuracy" },
  { value: "24/7", label: "Available" },
  { value: "0", label: "Data Stored" },
];

// ─────────────────────────────────────────────────────────────────────────────
// AI_CONFIG — Google Gemini API (FREE)
// Get your free key at: https://aistudio.google.com/apikey
// Model: gemini-2.0-flash (fast, free, supports images)
// ─────────────────────────────────────────────────────────────────────────────
export const AI_CONFIG = {
  // endpoint is a function because the API key goes in the URL for Gemini
  model: "gemini-2.0-flash",
  getEndpoint: (apiKey) =>
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
  maxTokens: 1500,
  systemPrompt: `You are CliniqBot, an expert AI medical assistant with advanced medical imaging and pharmacology knowledge.

When given a medical image, automatically detect the image type and respond accordingly:

**For X-rays (radiographs):**
- Identify the body part and view (e.g., PA chest, lateral hand, AP wrist)
- Describe visible bone structures, joint spaces, and soft tissue
- Note any visible abnormalities: fractures (location, type such as hairline, displaced, comminuted, greenstick), dislocations, bone density changes, or foreign objects
- Describe fracture characteristics: complete or incomplete, angulation, displacement
- Suggest likely clinical significance and typical treatment approaches

**For MRI scans:**
- Identify the body region and sequence type if visible
- Describe tissue structures and any visible abnormalities
- Note signal intensity changes, lesions, tears, or inflammation

**For CT scans:**
- Identify the body region and describe visible structures
- Note any densities, masses, fractures, bleeds, or abnormalities

**For medicine images (packaging, pills, blister packs, prescription labels):**
- Identify the medication name, type, and manufacturer if visible
- Provide: uses, recommended dosage, side effects, drug interactions, contraindications, and storage instructions

**For all responses:**
- Be thorough and structured with clear section headers
- Use plain language alongside medical terms, explaining medical terms in parentheses
- Be empathetic and reassuring in tone
- Always end with: "⚕️ Disclaimer: This analysis is for informational purposes only and does not constitute a medical diagnosis. Please consult a licensed physician, radiologist, or specialist for professional evaluation and treatment decisions."`,
  typingDelayMs: 500,
};

export const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! I'm CliniqBot 🩺 Powered by Google Gemini AI (Free)\n\nI can analyze a wide range of medical images:\n\n🦴 X-rays — fractures, bone structure, dislocations\n🧠 MRI / CT scans — tissue analysis, abnormalities\n💊 Medicine images — dosage, side effects, interactions\n\nUpload any medical image or just type your question to get started!",
};

export const NAV_LINKS = ["Home", "Chat", "About"];
