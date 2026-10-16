import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ABOUT_STATS, HERO_TAGLINES, PROCESS_STEPS, PROJECTS, TECH_STACK_ICONS, SkillIcons,
} from '../data'
import ContactSection from '../components/ContactSection'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const HERO_TEST_ROWS = [
  { label: 'auth.login', detail: 'valid credentials' },
  { label: 'api.contact', detail: 'POST → 200 OK' },
  { label: 'checkout.flow', detail: 'chromium · firefox · webkit' },
  { label: 'load.homepage', detail: '100 users · p95 < 800ms' },
]

function HeroTestRunner() {
  return (
    <svg className="hero-graphic" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heroCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary-light)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary-light)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="180" r="150" fill="url(#heroCoreGlow)" />

      <rect x="16" y="44" width="288" height="252" rx="18" fill="var(--bg-card-solid)" stroke="var(--border)" strokeWidth="1.5" />
      <path d="M16 62a18 18 0 0 1 18-18h252a18 18 0 0 1 18 18v20H16z" fill="var(--bg-elevated)" />
      <circle cx="36" cy="63" r="4" fill="#ff5f57" />
      <circle cx="50" cy="63" r="4" fill="#febc2e" />
      <circle cx="64" cy="63" r="4" fill="#28c840" />
      <text x="84" y="67" className="hero-runner-mono" fontSize="11" fill="var(--text-muted)">qa-suite › regression</text>

      {HERO_TEST_ROWS.map((row, i) => (
        <g key={row.label} transform={`translate(34 ${110 + i * 38})`}>
          <g className="hero-test-row" style={{ '--d': `${0.4 + i * 0.45}s` }}>
            <circle r="9" fill="var(--success-glow)" />
            <path d="M-4 0.5l2.6 2.6L4.2-2.6" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="20" y="-1" className="hero-runner-mono" fontSize="11.5" fontWeight="700" fill="var(--text)">{row.label}</text>
            <text x="20" y="13" className="hero-runner-mono" fontSize="9.5" fill="var(--text-muted)">{row.detail}</text>
            <text x="252" y="4" textAnchor="end" className="hero-runner-mono" fontSize="9.5" fontWeight="700" fill="var(--success)">PASS</text>
          </g>
        </g>
      ))}

      <g transform="translate(34 262)">
        <g className="hero-test-row" style={{ '--d': '2.3s' }}>
          <circle r="8" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle className="hero-runner-spinner" r="8" fill="none" stroke="url(#heroLineGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 40" />
          <text x="20" y="4" className="hero-runner-mono" fontSize="11" fill="var(--text-muted)">running regression suite…</text>
        </g>
      </g>

      <rect x="34" y="280" width="252" height="4" rx="2" fill="var(--bg-elevated)" />
      <rect className="hero-runner-progress" x="34" y="280" width="252" height="4" rx="2" fill="url(#heroLineGrad)" />

      <g className="hero-runner-badge" transform="translate(160 324)">
        <rect x="-78" y="-15" width="156" height="30" rx="15" fill="var(--bg-card-solid)" stroke="var(--success)" strokeOpacity="0.45" strokeWidth="1.5" />
        <path d="M-58 0.5l3 3 6-6.5" stroke="var(--success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="-40" y="4.5" fontSize="12" fontWeight="700" fill="var(--text)">All checks passed</text>
      </g>

      <g className="hero-runner-lens" transform="translate(276 40)">
        <circle r="24" fill="var(--bg-card-solid)" stroke="url(#heroLineGrad)" strokeWidth="2.5" />
        <path d="M17 17l12 12" stroke="url(#heroLineGrad)" strokeWidth="5" strokeLinecap="round" />
        <g stroke="var(--primary-light)" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <rect x="-6" y="-6" width="12" height="15" rx="6" />
          <path d="M-3 -6v-2a3 3 0 0 1 6 0v2M0 -1v10M-6 2h-4M6 2h4M-6 -3l-3-2M6 -3l3-2M-6 7l-3 2M6 7l3 2" />
        </g>
      </g>
    </svg>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0)

  useEffect(() => {
    document.title = 'Sunaina Yaseen | SQA Engineer | QA Automation'
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
            <span className="hero-reveal hero-eyebrow">
              <span className="hero-eyebrow-dot" aria-hidden="true" />
              Open to SQA &amp; QA Automation roles
            </span>
            <h1 className="hero-reveal hero-name">Sunaina Yaseen</h1>
            <div className="hero-reveal hero-title-wrap" aria-live="polite">
              <h2 className="hero-title hero-title-rotating" key={heroTaglineIndex}>
                {HERO_TAGLINES[heroTaglineIndex]}
              </h2>
            </div>
            <p className="hero-reveal hero-tagline">
              I make sure software works before your users find out it doesn&apos;t. I combine thorough manual testing with automation in Selenium, Cypress and Playwright, API testing in Postman, and performance testing in JMeter, so teams can ship every release with confidence.
            </p>
            <div className="hero-reveal hero-buttons">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/projects')}>
                View QA Projects
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/contact')}>
                Get In Touch
              </button>
            </div>
            <a href="/Sunaina_Yaseen_SQA_Engineer_CV.pdf" download className="hero-reveal hero-resume-link" target="_blank" rel="noopener noreferrer">
              Download CV ↓
            </a>
          </div>

          <div className="hero-graphic-wrap hero-reveal" aria-hidden="true">
            <HeroTestRunner />
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
          <span className="techstack-eyebrow" aria-hidden="true">✓ ✓ ✓</span>
          <h2 className="section-title">QA Toolkit</h2>
          <p className="section-subtitle">The testing tools I reach for most.</p>
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
          <h2 className="section-title">Featured QA Projects</h2>
          <p className="section-subtitle">Test automation, API and performance testing work.</p>
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
          <h2 className="section-title">How I Test</h2>
          <p className="section-subtitle">A structured STLC, from requirements to release sign-off</p>
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

      <ContactSection />
    </>
  )
}
