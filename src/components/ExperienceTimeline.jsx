import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { EXPERIENCE } from '../data'

export default function ExperienceTimeline({ compact = false }) {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <ol className={`xp-timeline ${compact ? 'xp-timeline--compact' : ''}`} ref={listRef}>
      <span className="xp-rail" aria-hidden="true">
        <motion.span className="xp-rail-fill" style={{ scaleY: progress }} />
      </span>
      {EXPERIENCE.map((job, i) => (
        <motion.li
          key={job.company}
          className="xp-item"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={`xp-node ${job.current ? 'xp-node--current' : ''}`} aria-hidden="true" />
          <article className="xp-card card-shine">
            <header className="xp-head">
              <div>
                <h3 className="xp-role">{job.role}</h3>
                <p className="xp-company">
                  {job.href ? (
                    <a href={job.href} target="_blank" rel="noopener noreferrer" className="exp-link">{job.company} ↗</a>
                  ) : job.company}
                  {job.location && <span className="xp-location"> · {job.location}</span>}
                </p>
              </div>
              <div className="xp-badges">
                <span className={`xp-type xp-type--${job.type.toLowerCase().replace(/[^a-z]/g, '')}`}>{job.type}</span>
                <span className="xp-period">{job.current && <span className="xp-live-dot" aria-hidden="true" />}{job.period}</span>
              </div>
            </header>
            <p className="xp-focus">{job.focus}</p>
            <ul className="xp-points">
              {(compact ? job.points.slice(0, 2) : job.points).map((point) => <li key={point}>{point}</li>)}
            </ul>
            {!compact && job.tools?.length > 0 && (
              <ul className="xp-tools" aria-label="Tools used">
                {job.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            )}
          </article>
        </motion.li>
      ))}
    </ol>
  )
}
