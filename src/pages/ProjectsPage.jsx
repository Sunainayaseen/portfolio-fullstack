import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ContactIcons, PROJECTS } from '../data'

export default function ProjectsPage() {
  const projects = PROJECTS

  useEffect(() => {
    document.title = 'Projects | Sunaina Yaseen'
  }, [])

  return (
    <section className="section projects visible page-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          QA Projects &amp; Test Suites
        </motion.h2>
        <p className="section-subtitle">Automation frameworks, API test suites and performance testing</p>
        <div className="projects-grid">
          {projects.map((project, i) => {
            const toolTags = project.tools ? project.tools.split(',').map((t) => t.trim()) : []
            const githubHref = project.githubLink || project.link || project.linkUrl
            const demoHref = project.demoLink
            const problem = project.problem || project.caseStudy?.problem
            const solution = project.solution || project.caseStudy?.solution
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
                </div>

                {project.category && <span className="project-category">{project.category}</span>}
                <h3 className="project-title">{project.title}</h3>

                <div className="project-breakdown">
                  {problem && (
                    <div className="project-breakdown-item">
                      <span className="project-breakdown-label">Problem</span>
                      <p className="project-breakdown-text">{problem}</p>
                    </div>
                  )}
                  {solution && (
                    <div className="project-breakdown-item">
                      <span className="project-breakdown-label">Solution</span>
                      <p className="project-breakdown-text">{solution}</p>
                    </div>
                  )}
                  {toolTags.length > 0 && (
                    <div className="project-breakdown-item">
                      <span className="project-breakdown-label">Tech Stack</span>
                      <div className="project-tags">
                        {toolTags.map((tool) => (
                          <span key={tool} className="project-tag-pill">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {(project.year || project.scope || project.type) && (
                  <div className="project-meta-grid">
                    {project.year && <div><span className="project-meta-label">YEAR</span><span className="project-meta-value">{project.year}</span></div>}
                    {project.scope && <div><span className="project-meta-label">SCOPE</span><span className="project-meta-value">{project.scope}</span></div>}
                    {project.type && <div><span className="project-meta-label">TYPE</span><span className="project-meta-value">{project.type}</span></div>}
                  </div>
                )}

                <div className="project-card-actions">
                  {demoHref && (
                    <a href={demoHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary project-action-btn">
                      Live Demo
                    </a>
                  )}
                  {githubHref && (
                    <a href={githubHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline project-action-btn">
                      <ContactIcons.GitHub />
                      GitHub
                    </a>
                  )}
                </div>
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
