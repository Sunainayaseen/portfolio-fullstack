import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ABOUT_STATS, PROCESS_STEPS, PROJECTS, TECH_STACK_ICONS, TESTIMONIALS, SkillIcons,
} from '../data'
import ContactSection from '../components/ContactSection'

const HERO_TAGLINES = [
  'AI Agentic Web Developer',
  'Building Autonomous AI Agents',
  'LLMs · RAG · Full-Stack Web Apps',
  'From Prompt to Production',
  'Agents That Plan, Reason & Act',
  'React · Node.js · Python · LangChain',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function HomePage() {
  const navigate = useNavigate()
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0)

  useEffect(() => {
    document.title = 'Sunaina Yaseen | AI Agentic Web Developer'
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setHeroTaglineIndex((i) => (i + 1) % HERO_TAGLINES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const featuredProjects = PROJECTS.slice(0, 3)

  return (
    <>
      <section className="hero hero-ready">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
        </div>
        <div className="hero-panel">
          <div className="hero-container">
            <h1 className="hero-reveal hero-name">Sunaina Yaseen</h1>
            <div className="hero-reveal hero-title-wrap" aria-live="polite">
              <h2 className="hero-title hero-title-rotating" key={heroTaglineIndex}>
                {HERO_TAGLINES[heroTaglineIndex]}
              </h2>
            </div>
            <p className="hero-reveal hero-tagline">
              AI Agentic Developer crafting autonomous systems, LLM-powered tools, and smart web experiences that go beyond chatbots.
            </p>
            <div className="hero-reveal hero-buttons">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/projects')}>
                View Projects
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/contact')}>
                Get In Touch
              </button>
            </div>
            <a href="/Sunaina_Yaseen_Resume_Energetic.pdf" download className="hero-reveal hero-resume-link" target="_blank" rel="noopener noreferrer">
              Download Resume ↓
            </a>
          </div>

          <div className="hero-graphic-wrap hero-reveal" aria-hidden="true">
            <svg className="hero-graphic" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="heroCoreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--primary-light)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>

              <circle cx="160" cy="180" r="110" fill="url(#heroCoreGlow)" />

              <g className="hero-graphic-lines" stroke="url(#heroLineGrad)" strokeWidth="1.4" opacity="0.55">
                <line x1="160" y1="180" x2="70" y2="80" />
                <line x1="160" y1="180" x2="250" y2="70" />
                <line x1="160" y1="180" x2="272" y2="200" />
                <line x1="160" y1="180" x2="218" y2="300" />
                <line x1="160" y1="180" x2="92" y2="292" />
                <line x1="160" y1="180" x2="48" y2="190" />
              </g>

              {[[70, 80], [250, 70], [272, 200], [218, 300], [92, 292], [48, 190]].map(([x, y], i) => (
                <g key={`${x}-${y}`} className="hero-graphic-node" style={{ '--node-delay': `${i * 0.35}s` }} transform={`translate(${x} ${y})`}>
                  <circle r="17" fill="var(--bg-card-solid)" stroke="var(--border)" strokeWidth="1.5" />
                  <circle r="17" className="hero-graphic-node-ring" fill="none" stroke="url(#heroLineGrad)" strokeWidth="1.5" />
                </g>
              ))}

              <circle className="hero-graphic-core" cx="160" cy="180" r="32" fill="var(--bg-card-solid)" stroke="url(#heroLineGrad)" strokeWidth="2" />
              <path
                d="M160 152 L165 175 L188 180 L165 185 L160 208 L155 185 L132 180 L155 175 Z"
                fill="url(#heroLineGrad)"
              />
            </svg>
          </div>
        </div>

        <div className="hero-stats hero-reveal">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        className="section techstack visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="container techstack-container">
          <span className="techstack-eyebrow" aria-hidden="true">&lt;/&gt;</span>
          <h2 className="section-title">Tech Stack</h2>
          <p className="section-subtitle">A snapshot of the tools I reach for most.</p>
          <div className="techstack-icon-grid">
            {TECH_STACK_ICONS.map((tool, i) => {
              const Icon = SkillIcons[tool.icon]
              return (
                <motion.div
                  key={tool.name}
                  className="techstack-icon-card card-shine"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="techstack-icon-badge">{Icon ? <Icon /> : null}</span>
                  <span className="techstack-icon-name">{tool.name}</span>
                </motion.div>
              )
            })}
          </div>
          <Link to="/skills" className="techstack-see-all">See Full Skill Set →</Link>
        </div>
      </motion.section>

      <motion.section
        className="section projects visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A few of the agents and systems I&apos;ve shipped recently.</p>
          <div className="projects-grid">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className="project-card card-shine"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="project-card-top">
                  {project.icon && <span className="project-icon-badge" aria-hidden="true">{project.icon}</span>}
                </div>
                {project.category && <span className="project-category">{project.category}</span>}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <Link to="/projects" className="project-link">View project ↗</Link>
              </motion.div>
            ))}
          </div>
          <div className="projects-footer">
            <Link to="/projects" className="btn btn-primary">
              View All Projects
              <span className="btn-arrow" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section process visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">How I Bring Agents To Life</h2>
          <p className="section-subtitle">From idea to a shipped, reliable agent</p>
          <div className="process-timeline">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="process-step card-shine" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="process-step-number">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section testimonials visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">Feedback from clients &amp; collaborators</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="testimonial-card card-shine" style={{ '--delay': `${i * 0.12}s` }}>
                <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar" aria-hidden="true">{t.name.charAt(0)}</span>
                  <div>
                    <span className="testimonial-name">{t.name}</span>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <ContactSection />
    </>
  )
}
