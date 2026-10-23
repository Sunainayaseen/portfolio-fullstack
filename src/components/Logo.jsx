import { useId } from 'react'

export default function Logo({ size = 40 }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className="brand-logo" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="100%" height="100%">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="42" height="42" rx="13" fill={`url(#${id}-bg)`} />
        <rect x="3.5" y="3.5" width="41" height="41" rx="12.5" fill="none" stroke="#fff" strokeOpacity="0.35" />
        <text x="24" y="30.4" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.9" fill="#0A0A0A">SY</text>
      </svg>
    </span>
  )
}
