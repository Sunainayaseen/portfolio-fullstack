import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = 'Page Not Found | Sunaina Yaseen'
  }, [])

  return (
    <section className="section visible page-section not-found">
      <div className="container not-found-inner">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1 className="section-title">Bug Found: This Page Doesn&apos;t Exist</h1>
        <p className="not-found-report">
          <span className="not-found-label">Steps to reproduce</span>
          <code>GET {pathname}</code>
          <span className="not-found-label">Expected</span> a page · <span className="not-found-label">Actual</span> nothing here
        </p>
        <div className="hero-buttons not-found-actions">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/projects" className="btn btn-outline">View QA Projects</Link>
        </div>
      </div>
    </section>
  )
}
