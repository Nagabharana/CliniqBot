export default function LogoSVG({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-label="CliniqBot logo">
      <circle cx="18" cy="18" r="17" stroke="#00C9A7" strokeWidth="1.5" fill="rgba(0,201,167,0.08)" />
      <path
        d="M12 14c0-2.2 1.8-4 4-4s4 1.8 4 4v4c0 2.2-1.8 4-4 4s-4-1.8-4-4v-4z"
        stroke="#00C9A7" strokeWidth="1.5" fill="none"
      />
      <path
        d="M20 18h2a4 4 0 004-4"
        stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" fill="none"
      />
      <circle cx="26" cy="14" r="1.5" fill="#00C9A7" />
      <path d="M14 26v-4M18 26v-4" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="13" y="25" width="7" height="2.5" rx="1.25" fill="#00C9A7" opacity="0.6" />
    </svg>
  );
}
