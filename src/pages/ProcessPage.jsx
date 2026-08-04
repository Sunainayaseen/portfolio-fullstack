import { useEffect } from 'react'
import { PROCESS_STEPS } from '../data'

export default function ProcessPage() {
  useEffect(() => {
    document.title = 'Process | Sunaina Yaseen'
  }, [])

  return (
    <section className="section process visible page-section">
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
    </section>
  )
}
