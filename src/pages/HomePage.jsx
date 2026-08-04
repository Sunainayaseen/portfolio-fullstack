import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ABOUT_STATS, PROCESS_STEPS, PROJECTS, TECH_STACK_PREVIEW, TESTIMONIALS,
} from '../data'

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
            <p className="hero-reveal hero-status">
              <span className="status-dot" aria-hidden="true" />
              Currently building at Softerio Solutions · Lahore, Pakistan
            </p>
            <a href="/Sunaina_Yaseen_Resume_Energetic.pdf" download className="hero-reveal hero-resume-link" target="_blank" rel="noopener noreferrer">
              Download Resume ↓
            </a>
          </div>

          <div className="hero-photo-wrap hero-reveal">
            <div className="hero-photo-card">
              <img src="/profile-photo.jpg" alt="Sunaina Yaseen" loading="eager" />
            </div>
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
          <div className="techstack-pillbar">
            <div className="techstack-pills">
              {TECH_STACK_PREVIEW.map((tool) => (
                <span key={tool} className="techstack-pill">{tool}</span>
              ))}
            </div>
            <Link to="/skills" className="techstack-see-all">See Full Skill Set →</Link>
          </div>
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
    </>
  )
}
