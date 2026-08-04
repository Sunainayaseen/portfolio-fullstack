import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved !== null) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    } catch {}
  }, [darkMode])

  const toggleTheme = () => setDarkMode((d) => !d)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
