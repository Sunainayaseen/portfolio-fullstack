import { useState, useEffect } from 'react'
import { getProjects, addProject } from './api'
import './App.css'

const SKILLS = [
  'Manual Testing',
  'Test Case Writing',
  'Bug Reporting',
  'SDLC & STLC',
  'Functional Testing',
  'Regression Testing',
  'UI Testing',
  'API Testing (Basic)',
  'SQL (Basic)',
  'HTML, CSS, JavaScript (Basic)',
]

const ToolIcons = {
  JIRA: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M11.571 2L3 6.5v11L11.571 22l8.572-4.5V6.5L11.571 2z" fill="#2684FF" />
      <path d="M11.571 2v20l8.572-4.5V6.5L11.571 2z" fill="#0052CC" fillOpacity="0.85" />
    </svg>
  ),
  Bugzilla: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M12 2c-2.5 0-4.5 1.5-5.5 3.5C5 7 4 9.5 4 12c0 2 .8 3.8 2 5.2L3 22h5l2.5-4 2.5 4h5l-3-4.8c1.2-1.4 2-3.2 2-5.2 0-2.5-1-5-2.5-6.5C16.5 3.5 14.5 2 12 2z" fill="#E34F26" />
      <circle cx="9" cy="11" r="1.5" fill="#fff" />
      <circle cx="15" cy="11" r="1.5" fill="#fff" />
    </svg>
  ),
  Postman: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#FF6C37" />
      <path d="M12 7l-3 3 3 3 3-3-3-3z" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11v5M9 13.5h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Selenium: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#43B02A" />
      <path d="M8 8h8v1.5H8V8zm0 3.5h8v1.5H8v-1.5zm0 3.5h6v1.5H8V15z" fill="#fff" />
    </svg>
  ),
  ChromeDevTools: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4" />
      <path d="M12 6l-3.5 6h2v3h3v-3h2L12 6z" fill="#fff" />
      <path d="M8 17l2-2.5 2 2.5H8zm8 0l-2-2.5 2-2.5h2l-2 5h-2z" fill="#fff" fillOpacity="0.9" />
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z" fill="currentColor" />
    </svg>
  ),
  VSCode: () => (
    <svg viewBox="0 0 24 24" className="tool-svg" aria-hidden="true">
      <path fill="#007ACC" d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479l1.324 1.201a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z" />
      <path fill="#fff" d="M13.5 12l7.5 6.5V5.5L13.5 12z" opacity="0.9" />
    </svg>
  ),
}

const TOOLS = [
  { name: 'JIRA', iconKey: 'JIRA' },
  { name: 'Bugzilla', iconKey: 'Bugzilla' },
  { name: 'Postman', iconKey: 'Postman' },
  { name: 'Selenium (Basic)', iconKey: 'Selenium' },
  { name: 'Chrome DevTools', iconKey: 'ChromeDevTools' },
  { name: 'Git/GitHub', iconKey: 'Git' },
  { name: 'VS Code', iconKey: 'VSCode' },
]

const PROJECTS = [
  {
    title: 'Web Application Testing Project',
    description: 'End-to-end testing of a web application covering functional, UI, and regression scenarios. Documented test cases and reported defects with clear steps to reproduce.',
    testingType: 'Functional, UI, Regression Testing',
    tools: 'JIRA, Chrome DevTools, Test Case Documentation',
    link: 'https://github.com',
    linkLabel: 'View on GitHub',
  },
  {
    title: 'E-commerce Website Testing',
    description: 'Comprehensive testing of an e-commerce platform including checkout flow, product search, cart functionality, and cross-browser compatibility.',
    testingType: 'Functional, UI, End-to-End Testing',
    tools: 'JIRA, Postman, Bugzilla, Chrome DevTools',
    link: 'https://github.com',
    linkLabel: 'View Documentation',
  },
  {
    title: 'Test Case & Bug Report Documentation',
    description: 'Created structured test case documents and bug reports following industry standards. Includes traceability matrix and defect lifecycle management.',
    testingType: 'Test Design, Bug Reporting, Documentation',
    tools: 'JIRA, Excel/Sheets, Confluence-style docs',
    link: 'https://github.com',
    linkLabel: 'View on GitHub',
  },
]

const CertIcon = () => (
  <svg viewBox="0 0 24 24" className="cert-icon-svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 3h10v14l-5 3-5-3V3z" />
    <path d="M7 7h10M7 11h7" />
    <circle cx="12" cy="14" r="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12.5v2l1 1" />
  </svg>
)

const ContactIcons = {
  Email: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="contact-icon-svg" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
}

const CERTIFICATIONS = [
  { name: 'Software Testing Fundamentals', provider: 'Online Course' },
  { name: 'Manual Testing Course', provider: 'QA Training' },
  { name: 'QA Basics / Selenium Basics', provider: 'Automation Fundamentals' },
]

// Dev me hamesha same-origin (Vite proxy) – mobile se bhi form chalega jab same WiFi par Network URL use karo
const API_BASE = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000')

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [navOpen, setNavOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')
  const [projects, setProjects] = useState(PROJECTS)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved !== null) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return true
    }
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = height > 0 ? (winScroll / height) * 100 : 0
      const bar = document.getElementById('scroll-progress')
      if (bar) bar.style.width = `${progress}%`
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 150
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    } catch {}
  }, [darkMode])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      } catch {
        setProjects(PROJECTS)
      } finally {
        setProjectsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleAddProject = async () => {
    const title = prompt('Project title?')
    if (!title) return
    const description = prompt('Description?') || ''
    const imageUrl = prompt('Image URL? (optional)') || ''
    try {
      await addProject({ title, description, imageUrl })
      const data = await getProjects()
      setProjects(Array.isArray(data) ? data : [])
    } catch (err) {
      alert(err.message || 'Could not add project')
    }
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => setDarkMode((d) => !d)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormError(false)
    setFormErrorMsg('')
    setFormSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Message from ${formData.name || 'Portfolio'}`,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setFormSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormError(true)
        const t = await res.text()
        setFormErrorMsg(t || `Server error ${res.status}`)
      }
    } catch (err) {
      setFormError(true)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const msg = isMobile
        ? 'Network error. Same WiFi par computer ka URL use karein (e.g. http://192.168.x.x:5173), ya backend ko live deploy karke .env me VITE_API_URL set karein.'
        : (err.message || 'Backend not reachable. Start Flask: cd portfolio-backend && python app.py')
      setFormErrorMsg(msg)
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''} ${darkMode ? 'dark' : 'light'}`}>
      <div className="scroll-progress" id="scroll-progress" />

      <nav className={`navbar ${navOpen ? 'nav-open' : ''}`}>
        <div className="nav-container">
          <button type="button" className="nav-logo" onClick={() => { scrollToSection('home'); setNavOpen(false); }} aria-label="Sunaina Yaseen - Home">
            <span className="nav-logo-text">
              <span className="nav-logo-first">SUNAINA</span>
              <span className="nav-logo-sep" aria-hidden="true">·</span>
              <span className="nav-logo-last">YASEEN</span>
            </span>
          </button>
          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setNavOpen((o) => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
          >
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
          </button>
          <ul className="nav-menu">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home'); setNavOpen(false); }}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); setNavOpen(false); }}>About</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); setNavOpen(false); }}>Skills</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); setNavOpen(false); }}>Projects</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setNavOpen(false); }}>Contact</a></li>
          </ul>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-inner" data-dark={darkMode}>
              <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      <section id="home" className={`hero ${isLoaded ? 'hero-ready' : ''}`}>
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-container">
          <p className="hero-reveal hero-greeting">Hello, I'm</p>
          <h1 className="hero-reveal hero-name">
            <span className="hero-name-line">Sunaina</span>
            <span className="hero-name-line hero-name-accent">Yaseen</span>
          </h1>
          <h2 className="hero-reveal hero-title">Junior QA Engineer | Software Quality Assurance</h2>
          <p className="hero-reveal hero-tagline">
            Detail-oriented Junior QA Engineer with a strong foundation in manual testing, bug reporting, and web application testing.
          </p>
          <div className="hero-reveal hero-buttons">
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('projects')}>
              View Projects
            </button>
            <a href="/resume.pdf" className="btn btn-outline" download>
              Download Resume
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('contact')}>
              Contact Me
            </button>
          </div>
        </div>
        <div className="scroll-hint" onClick={() => scrollToSection('about')}>
          <span className="scroll-hint-label">Scroll</span>
          <span className="scroll-hint-mouse">
            <span className="scroll-hint-wheel" />
          </span>
        </div>
      </section>

      <section id="about" className={`section about ${isVisible.about ? 'visible' : ''}`}>
        <div className="about-bg" aria-hidden="true" />
        <div className="container container--about">
          <header className="about-header">
            <h2 className="section-title about-title reveal-title">About Me</h2>
            <p className="about-intro reveal-subtitle">
              Junior QA Engineer focused on manual testing, test design, and defect reporting to help ship reliable software.
            </p>
            <div className="about-header-decoration">
              <span className="about-header-line" aria-hidden="true" />
              <span className="about-header-dot" aria-hidden="true" />
              <span className="about-header-line" aria-hidden="true" />
            </div>
          </header>

          <div className="about-layout reveal-card">
            <div className="about-card about-card--main card-shine">
              <div className="about-card-accent" aria-hidden="true" />
              <div className="about-card-glow" aria-hidden="true" />
              <p className="about-lead">
                I specialize in <strong>Software Testing and Quality Assurance</strong>, with a clear grasp of <strong>SDLC</strong> and <strong>STLC</strong>. I use this to plan and execute testing that catches issues early and supports delivery quality.
              </p>
              <p className="about-text">
                My experience includes testing <strong>web applications</strong>, writing <strong>traceable test cases</strong>, and <strong>reporting defects</strong> with clear steps to reproduce. I combine attention to detail with analytical thinking and a structured approach, and I am committed to growing as a QA professional and contributing to teams that value quality.
              </p>
            </div>

            <aside className="about-highlights">
              <div className="about-highlights-accent" aria-hidden="true" />
              <h3 className="about-highlights-title">Core Strengths</h3>
              <ul className="about-highlights-list">
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>SDLC &amp; STLC</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Test cases &amp; bug reports</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Attention to detail</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Analytical &amp; problem-solving</li>
                <li><span className="about-highlight-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Continuous learning</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section id="skills" className={`section skills ${isVisible.skills ? 'visible' : ''}`}>
        <div className="container container--skills">
          <header className="skills-header">
            <div className="skills-header-inner">
              <h2 className="skills-header-title section-title reveal-title">Skills & Tools</h2>
              <p className="section-subtitle reveal-subtitle skills-intro">
                Testing and quality assurance competencies, plus the technologies I use every day.
              </p>
              <span className="skills-header-line" aria-hidden="true" />
            </div>
          </header>

          <div className="skills-block reveal-card">
            <div className="skills-block-header">
              <span className="skills-block-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </span>
              <div className="skills-block-heading">
                <h3 className="skills-block-title">Testing & QA Skills</h3>
                <span className="skills-block-count">{SKILLS.length} skills</span>
              </div>
            </div>
            <div className="skills-grid">
              {SKILLS.map((skill, i) => (
                <div
                  key={skill}
                  className="skill-card card-shine"
                  style={{ '--delay': `${i * 0.05}s` }}
                >
                  <span className="skill-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tools-block reveal-card">
            <div className="tools-block-header">
              <span className="tools-block-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </span>
              <div className="tools-block-heading">
                <h3 className="tools-block-title">Tools I Use</h3>
                <span className="tools-block-count">{TOOLS.length} tools</span>
              </div>
            </div>
            <div className="tools-grid">
              {TOOLS.map((tool, i) => {
                const ToolIcon = ToolIcons[tool.iconKey]
                return (
                  <div
                    key={tool.name}
                    className="tool-card card-shine"
                    style={{ '--delay': `${i * 0.06}s` }}
                  >
                    <span className="tool-card-icon-wrap">
                      <span className="tool-card-icon">
                        {ToolIcon ? <ToolIcon /> : null}
                      </span>
                    </span>
                    <span className="tool-card-name">{tool.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={`section projects ${isVisible.projects ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Projects</h2>
          <p className="section-subtitle reveal-subtitle">QA-focused testing projects</p>
          {projectsLoading && <p className="section-subtitle" style={{ marginTop: '-1rem' }}>Loading projects…</p>}
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={project.title + i} className="project-card reveal-card card-shine" style={{ '--delay': `${i * 0.12}s` }}>
                {project.imageUrl && (
                  <div className="project-card-image-wrap">
                    <img src={project.imageUrl} alt="" className="project-card-image" />
                  </div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                {(project.testingType || project.tools) && (
                  <div className="project-meta">
                    {project.testingType && <p><strong>Testing type:</strong> {project.testingType}</p>}
                    {project.tools && <p><strong>Tools:</strong> {project.tools}</p>}
                  </div>
                )}
                {(project.link || project.linkUrl) && (
                  <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    {project.linkLabel || 'View project'} →
                  </a>
                )}
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-outline" onClick={handleAddProject} style={{ marginTop: '1rem' }}>
            + Add project (test)
          </button>
        </div>
      </section>

      <section id="experience" className={`section experience ${isVisible.experience ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Experience</h2>
          <p className="section-subtitle reveal-subtitle">My QA journey</p>
          <div className="experience-card reveal-card card-shine">
            <h3 className="exp-role">Freelance / Practice QA Testing</h3>
            <ul className="exp-list">
              <li>Web testing practice on different websites</li>
              <li>Bug reporting and test case creation</li>
              <li>Applying manual testing techniques and documentation best practices</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="certifications" className={`section certifications ${isVisible.certifications ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Certifications & Learning</h2>
          <p className="section-subtitle reveal-subtitle">Courses and continuous learning</p>
          <div className="certs-grid">
            {CERTIFICATIONS.map((c, i) => (
              <div key={c.name} className="cert-card reveal-card card-shine" style={{ '--delay': `${i * 0.1}s` }}>
                <span className="cert-icon-wrap">
                  <CertIcon />
                </span>
                <h4 className="cert-name">{c.name}</h4>
                <p className="cert-provider">{c.provider}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`section contact ${isVisible.contact ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title reveal-title">Contact</h2>
          <p className="section-subtitle reveal-subtitle">Get in touch</p>

          <div className="contact-layout">
            <div className="contact-form-wrapper reveal-card">
              <h3 className="contact-panel-title">Send a message</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form-inner">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Project inquiry, QA opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Message</label>
                    <textarea
                      id="contact-message"
                      className="form-textarea"
                      placeholder="Your message..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      required
                    />
                  </div>
                  {formSubmitted ? (
                    <div className="form-success" role="status" aria-live="polite">
                      <span className="form-success-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      </span>
                      <div className="form-success-content">
                        <strong className="form-success-title">Message sent</strong>
                        <p className="form-success-text">Thanks for reaching out. I&apos;ll get back to you at your email soon.</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {formError && (
                        <p className="form-error">{formErrorMsg || 'Could not send. Try again or email me directly below.'}</p>
                      )}
                      <button type="submit" className="form-submit btn-primary" disabled={formSubmitting}>
                        {formSubmitting ? 'Sending…' : 'Send message'}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>

            <div className="contact-direct-wrapper reveal-card">
              <h3 className="contact-panel-title">Reach out directly</h3>
              <div className="contact-direct">
                <div className="contact-cards">
                <a href="mailto:sunainayaseen561@gmail.com" className="contact-card reveal-card card-shine" style={{ '--delay': '0s' }}>
                  <span className="contact-icon">
                    <ContactIcons.Email />
                  </span>
                  <h3>Email</h3>
                  <p>sunainayaseen561@gmail.com</p>
                </a>
                <a href="https://www.linkedin.com/in/sunaina-yaseen-160695277" target="_blank" rel="noopener noreferrer" className="contact-card reveal-card card-shine" style={{ '--delay': '0.1s' }}>
                  <span className="contact-icon">
                    <ContactIcons.LinkedIn />
                  </span>
                  <h3>LinkedIn</h3>
                  <p>Connect with me</p>
                </a>
                <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer" className="contact-card reveal-card card-shine" style={{ '--delay': '0.2s' }}>
                  <span className="contact-icon">
                    <ContactIcons.GitHub />
                  </span>
                  <h3>GitHub</h3>
                  <p>View my repositories</p>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">© {new Date().getFullYear()} Sunaina Yaseen. Junior QA Engineer Portfolio.</p>
        </div>
      </footer>

      {showBackToTop && (
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
        </button>
      )}
    </div>
  )
}

export default App
