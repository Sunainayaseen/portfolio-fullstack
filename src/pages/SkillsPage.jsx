import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { SKILL_GROUPS, SKILLS_STATS, SkillIcons } from '../data'
import CountUp from '../components/CountUp'

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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
            </span>
            <h1 className="skills-header-title section-title">Testing &amp; QA Skills</h1>
            <p className="section-subtitle skills-intro">
              Manual testing depth, automation that scales, and the tools that keep quality inside every sprint.
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
              <span className="skills-stat-value"><CountUp value={stat.value} /></span>
              <span className="skills-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="skill-group-grid">
          {SKILL_GROUPS.map((group, i) => {
            const GroupIcon = SkillIcons[group.icon]
            return (
              <motion.article
                key={group.title}
                className="skill-group-card card-shine"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <header className="skill-group-head">
                  <span className="skill-group-icon">{GroupIcon ? <GroupIcon /> : null}</span>
                  <div>
                    <h3 className="skill-group-title">{group.title}</h3>
                    <p className="skill-group-desc">{group.desc}</p>
                  </div>
                </header>
                <ul className="skill-chip-list">
                  {group.items.map((item) => {
                    const Icon = SkillIcons[item.icon]
                    return (
                      <li key={item.name} className="skill-chip">
                        <span className="skill-chip-icon">{Icon ? <Icon /> : null}</span>
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
