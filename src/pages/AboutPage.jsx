import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ABOUT_BEYOND, ABOUT_EDUCATION, ABOUT_GOALS, ABOUT_INFO, ABOUT_JOURNEY, ABOUT_STRENGTHS, CERTIFICATIONS, CertIcon,
} from '../data'
import ExperienceTimeline from '../components/ExperienceTimeline'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function AboutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'About | Sunaina Yaseen'
  }, [])

  return (
    <>
      <section className="section about visible page-section">
        <div className="about-bg" aria-hidden="true" />
        <div className="container container--about">
          <header className="about-header">
            <h2 className="section-title about-title">I Break Things Before Your Users Do</h2>
            <p className="about-intro">
              I'm Sunaina Yaseen, an SQA Engineer who makes sure software works the way it should, and keeps working after every release. I pair hands-on manual testing with automation in Selenium, PyTest, Cypress and Playwright, plus API testing in Postman and performance testing in JMeter.
            </p>
            <div className="about-header-decoration">
              <span className="about-header-line" aria-hidden="true" />
              <span className="about-header-dot" aria-hidden="true" />
              <span className="about-header-line" aria-hidden="true" />
            </div>
            <div className="about-header-actions">
              <button type="button" className="btn btn-primary about-header-cta" onClick={() => navigate('/contact')}>
                Get In Touch
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
              </button>
              <a href="/Sunaina_Yaseen_SQA_Engineer_CV.pdf" download className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </div>
          </header>

          <div className="about-layout">
            <div className="about-card about-card--main card-shine">
              <div className="about-card-accent" aria-hidden="true" />
              <div className="about-card-glow" aria-hidden="true" />
              <p className="about-lead">
                From <strong>test plans</strong> to <strong>automated regression suites</strong>, I help teams ship with confidence by combining <strong>manual &amp; exploratory testing</strong>, <strong>UI test automation</strong>, and <strong>API &amp; performance testing</strong>.
              </p>
              <p className="about-text">
                My background in <strong>software development</strong> means I read code, understand how features are built, and write <strong>bug reports developers can act on immediately</strong>, with clear steps, expected vs. actual results, logs and screenshots. I work closely with developers and product teams across the full <strong>STLC</strong>, from requirement analysis to release sign-off.
              </p>
            </div>

            <aside className="about-highlights">
              <div className="about-highlights-accent" aria-hidden="true" />
              <h3 className="about-highlights-title">Core Strengths</h3>
              <ul className="about-highlights-list">
                {ABOUT_STRENGTHS.map((item) => (
                  <li key={item}><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>{item}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="about-info-panel card-shine">
            {ABOUT_INFO.map((item) => (
              <div key={item.label} className="about-info-item">
                <span className="about-info-label">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="about-info-value about-info-link">{item.value}</a>
                ) : (
                  <span className="about-info-value">{item.value}</span>
                )}
              </div>
            ))}
          </div>

          <div className="about-journey card-shine">
            <h3 className="about-journey-title">My Journey</h3>
            <p className="about-journey-text">{ABOUT_JOURNEY}</p>
          </div>

          <div className="about-beyond">
            <h3 className="about-beyond-title">What I Bring</h3>
            <div className="about-beyond-grid">
              {ABOUT_BEYOND.map((item, i) => (
                <div key={item.title} className="about-beyond-card card-shine" style={{ '--delay': `${i * 0.08}s` }}>
                  <span className="about-beyond-icon" aria-hidden="true">{item.icon}</span>
                  <h4 className="about-beyond-card-title">{item.title}</h4>
                  <p className="about-beyond-card-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="section education visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic background</p>
          <div className="education-list">
            {ABOUT_EDUCATION.map((item) => (
              <div key={item.degree} className="education-item card-shine">
                <div>
                  <h3 className="education-degree">{item.degree}</h3>
                  <p className="education-school">{item.school}</p>
                </div>
                <span className="education-period">{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section experience visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Where I&apos;ve applied quality engineering</p>
          <ExperienceTimeline />
        </div>
      </motion.section>

      <motion.section
        className="section goals visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">Goals</h2>
          <p className="section-subtitle">Where I&apos;m headed next</p>
          <ul className="goals-list card-shine">
            {ABOUT_GOALS.map((goal) => (
              <li key={goal}>
                <span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      <motion.section
        className="section certifications visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
      >
        <div className="container">
          <h2 className="section-title">Certifications &amp; Learning</h2>
          <p className="section-subtitle">Courses and continuous learning</p>
          <div className="certs-grid">
            {CERTIFICATIONS.map((c, i) => (
              <div key={c.name} className="cert-card card-shine" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="cert-card-inner">
                  <span className="cert-icon-wrap" aria-hidden="true">
                    <CertIcon />
                  </span>
                  <div className="cert-content">
                    <h4 className="cert-name">{c.name}</h4>
                    <span className="cert-issued">Issued by</span>
                    <p className="cert-provider">{c.provider}</p>
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
