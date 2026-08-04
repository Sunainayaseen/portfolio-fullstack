import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_DETAILED, SKILLS_STATS, SkillIcons } from '../data'

export default function SkillsPage() {
  useEffect(() => {
    document.title = 'Skills | Sunaina Yaseen'
  }, [])

  return (
    <section className="section skills visible page-section">
      <div className="container container--skills">
        <header className="skills-header">
          <div className="skills-header-inner">
            <span className="skills-header-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" /></svg>
            </span>
            <h2 className="skills-header-title section-title">AI, Agents &amp; Full-Stack Skills</h2>
            <p className="section-subtitle skills-intro">
              Technical expertise and tooling used to build agentic AI systems and full-stack products.
            </p>
          </div>
        </header>

        <div className="skills-stats">
          {SKILLS_STATS.map((stat) => (
            <div key={stat.label} className="skills-stat">
              <span className="skills-stat-icon" aria-hidden="true">
                {stat.icon === 'code' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>}
                {stat.icon === 'cube' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>}
                {stat.icon === 'db' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /></svg>}
                {stat.icon === 'git' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>}
              </span>
              <span className="skills-stat-value">{stat.value}</span>
              <span className="skills-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="skills-progress-grid">
          {SKILLS_DETAILED.map((skill, i) => {
            const Icon = SkillIcons[skill.icon]
            return (
              <motion.div
                key={skill.name}
                className="skill-progress-card card-shine"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <span className="skill-progress-icon">{Icon ? <Icon /> : null}</span>
                <div className="skill-progress-info">
                  <span className="skill-progress-name">{skill.name}</span>
                  <span className="skill-progress-percent">{skill.percent}%</span>
                </div>
                <div className="skill-progress-track">
                  <motion.div
                    className="skill-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percent}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.04, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
