import { useId } from 'react'

export default function Logo({ size = 40 }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className="brand-logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="100%" height="100%">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6AAE91" />
            <stop offset="55%" stopColor="#4E9176" />
            <stop offset="100%" stopColor="#2F6E55" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="40" height="40" rx="12" fill={`url(#${id}-bg)`} />
        <rect x="2.5" y="2.5" width="39" height="39" rx="11.5" fill="none" stroke="#fff" strokeOpacity="0.14" />
        <text x="22" y="28.6" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="-0.8" fill="#F5EED2">SY</text>
        <circle cx="39" cy="39" r="8" fill="#EBAE29" stroke="var(--bg-card-solid, #0B0B0F)" strokeWidth="2.5" />
        <path d="M35.4 39.2l2.4 2.4 4.6-4.8" fill="none" stroke="#132228" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
