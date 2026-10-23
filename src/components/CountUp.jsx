import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Counts up the numeric part of values like "10+"; non-numeric values ("E2E") render as-is.
export default function CountUp({ value, duration = 1.4 }) {
  const match = /^(\d+)(.*)$/.exec(value)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(match && !reduceMotion ? `0${match[2]}` : value)

  useEffect(() => {
    if (!match || !inView || reduceMotion) return
    const target = Number(match[1])
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${match[2]}`),
    })
    return () => controls.stop()
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{display}</span>
}
