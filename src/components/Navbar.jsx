import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { NAV_LINKS } from '../data'
import { useTheme } from '../ThemeContext'

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false)
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const goContact = () => {
    navigate('/contact')
    setNavOpen(false)
  }

  return (
    <nav className={`navbar ${navOpen ? 'nav-open' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={() => setNavOpen(false)} aria-label="Sunaina Yaseen - Home">
          <Logo />
          <span className="nav-logo-text">
            <span className="nav-logo-first">Sunaina</span>
            <span className="nav-logo-last">Yaseen</span>
          </span>
        </NavLink>
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
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setNavOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav-menu-cta-item">
            <button type="button" className="nav-cta" onClick={goContact}>
              Let&apos;s Build →
            </button>
          </li>
        </ul>
        <button type="button" className="nav-cta nav-cta-desktop" onClick={goContact}>
          Let&apos;s Build →
        </button>
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
  )
}
