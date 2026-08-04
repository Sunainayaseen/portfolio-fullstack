import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { useTheme } from '../ThemeContext'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function Layout() {
  const location = useLocation()
  const { darkMode } = useTheme()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = height > 0 ? (winScroll / height) * 100 : 0
      const bar = document.getElementById('scroll-progress')
      if (bar) bar.style.width = `${progress}%`
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <div className={`app loaded ${darkMode ? 'dark' : 'light'}`}>
      <ScrollToTop />
      <div className="scroll-progress" id="scroll-progress" />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      {showBackToTop && (
        <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
        </button>
      )}
    </div>
  )
}
