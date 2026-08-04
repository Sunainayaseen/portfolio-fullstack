import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ProcessPage from './pages/ProcessPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
