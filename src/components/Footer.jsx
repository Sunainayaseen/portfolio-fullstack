import { Link } from 'react-router-dom'
import Logo from './Logo'
import { ContactIcons, FOOTER_SPECIALIZATIONS, NAV_LINKS } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <Logo />
              <span className="footer-brand-name">Sunaina Yaseen</span>
            </div>
            <p className="footer-brand-tagline">
              Building autonomous AI agents, intelligent automation, and production-grade full-stack software.
            </p>
            <span className="footer-availability">
              <span className="status-dot" aria-hidden="true" />
              Available for AI projects
            </span>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-col-list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Specializations</h4>
            <ul className="footer-col-list">
              {FOOTER_SPECIALIZATIONS.map((item) => (
                <li key={item}><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Let&apos;s Connect</h4>
            <ul className="footer-connect-list">
              <li>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sunainayaseen561@gmail.com" target="_blank" rel="noopener noreferrer">
                  <span className="footer-connect-icon"><ContactIcons.Email /></span>
                  Email
                </a>
              </li>
              <li>
                <a href="tel:+923201436593">
                  <span className="footer-connect-icon"><ContactIcons.Phone /></span>
                  Phone
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sunaina-yaseen-160695277" target="_blank" rel="noopener noreferrer">
                  <span className="footer-connect-icon"><ContactIcons.LinkedIn /></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer">
                  <span className="footer-connect-icon"><ContactIcons.GitHub /></span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">© {new Date().getFullYear()} Sunaina Yaseen. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Built with care &amp; AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
