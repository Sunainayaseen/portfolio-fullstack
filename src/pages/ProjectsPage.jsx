import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getProjects, addProject } from '../api'
import { ContactIcons, PROJECTS } from '../data'

export default function ProjectsPage() {
  const [projects, setProjects] = useState(PROJECTS)
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [expandedProject, setExpandedProject] = useState(null)

  useEffect(() => {
    document.title = 'Projects | Sunaina Yaseen'
  }, [])

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

  return (
    <section className="section projects visible page-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Agents I&apos;ve Built, Problems I&apos;ve Solved
        </motion.h2>
        <p className="section-subtitle">AI agent &amp; full-stack development projects</p>
        {projectsLoading && <p className="section-subtitle" style={{ marginTop: '-1rem' }}>Loading projects…</p>}
        <div className="projects-grid">
          {projects.map((project, i) => {
            const isExpanded = expandedProject === i
            const toolTags = project.tools ? project.tools.split(',').map((t) => t.trim()) : []
            return (
              <motion.div
                key={project.title + i}
                className="project-card card-shine"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                {project.imageUrl && (
                  <div className="project-card-image-wrap">
                    <img src={project.imageUrl} alt="" className="project-card-image" />
                  </div>
                )}

                <div className="project-card-top">
                  {project.icon && <span className="project-icon-badge" aria-hidden="true">{project.icon}</span>}
                  {(project.link || project.linkUrl) && (
                    <div className="project-card-links">
                      <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="project-icon-link">
                        <ContactIcons.GitHub />
                      </a>
                      <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} external link`} className="project-icon-link">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    </div>
                  )}
                </div>

                {project.category && <span className="project-category">{project.category}</span>}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {toolTags.length > 0 && (
                  <div className="project-tags">
                    {toolTags.map((tool) => (
                      <span key={tool} className="project-tag-pill">{tool}</span>
                    ))}
                  </div>
                )}

                {project.caseStudy && isExpanded && (
                  <div className="project-case-study">
                    <p><strong>Problem</strong><br />{project.caseStudy.problem}</p>
                    <p><strong>Solution</strong><br />{project.caseStudy.solution}</p>
                    <p><strong>Impact</strong></p>
                    <ul>
                      {project.caseStudy.impact.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(project.year || project.scope || project.type) && (
                  <div className="project-meta-grid">
                    {project.year && <div><span className="project-meta-label">YEAR</span><span className="project-meta-value">{project.year}</span></div>}
                    {project.scope && <div><span className="project-meta-label">SCOPE</span><span className="project-meta-value">{project.scope}</span></div>}
                    {project.type && <div><span className="project-meta-label">TYPE</span><span className="project-meta-value">{project.type}</span></div>}
                  </div>
                )}

                {project.caseStudy ? (
                  <button
                    type="button"
                    className="project-link project-link-btn"
                    onClick={() => setExpandedProject(isExpanded ? null : i)}
                  >
                    {isExpanded ? 'Hide Case Study' : project.linkLabel} {isExpanded ? '↑' : '↗'}
                  </button>
                ) : (
                  (project.link || project.linkUrl) && (
                    <a href={project.link || project.linkUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      {project.linkLabel || 'View project'} ↗
                    </a>
                  )
                )}
              </motion.div>
            )
          })}
        </div>
        <div className="projects-footer">
          <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            View on GitHub
            <span className="btn-arrow" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </span>
          </a>
          
        </div>
      </div>
    </section>
  )
}
