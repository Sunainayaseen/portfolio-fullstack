import { useState } from 'react'
import { motion } from 'framer-motion'
import { ContactIcons } from '../data'

// Same-origin by default: Vercel serves /api/contact, and Vite proxies /api to Flask in dev.
const API_BASE = import.meta.env.VITE_API_URL || ''
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function validateContactForm(data) {
  const errors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()

  if (!name) errors.name = 'Name is required.'
  else if (name.length > 100) errors.name = 'Name must be 100 characters or fewer.'

  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  if (data.subject && data.subject.trim().length > 150) errors.subject = 'Subject must be 150 characters or fewer.'

  if (!message) errors.message = 'Message is required.'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (message.length > 5000) errors.message = 'Message must be 5000 characters or fewer.'

  return errors
}

export default function ContactSection({ className = '', isPage = false }) {
  const Title = isPage ? motion.h1 : motion.h2
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formError, setFormError] = useState(false)
  const [formErrorMsg, setFormErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const updateField = (field) => (e) => {
    const { value } = e.target
    setFormData((p) => ({ ...p, [field]: value }))
    if (fieldErrors[field]) setFieldErrors((errs) => ({ ...errs, [field]: undefined }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setFormError(false)
    setFormErrorMsg('')

    const errors = validateContactForm(formData)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setFormError(true)
      setFormErrorMsg('Please fix the highlighted fields below.')
      return
    }

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
          website: formData.website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setFormSubmitted(true)
        setFieldErrors({})
        setFormData({ name: '', email: '', subject: '', message: '', website: '' })
      } else if (res.status === 400 && data.errors) {
        setFieldErrors(data.errors)
        setFormError(true)
        setFormErrorMsg('Please fix the highlighted fields below.')
      } else {
        setFormError(true)
        setFormErrorMsg((data.errors && data.errors._global) || data.msg || `Server error ${res.status}`)
      }
    } catch {
      setFormError(true)
      setFormErrorMsg(
        import.meta.env.DEV
          ? 'Backend not reachable. Start Flask: cd portfolio-backend && python app.py'
          : 'Network error. Please check your connection, or email me directly at sunainayaseen561@gmail.com.',
      )
    } finally {
      setFormSubmitting(false)
    }
  }

  return (
    <section className={`section contact visible ${className}`}>
      <div className="container">
        <Title
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          Need a Release You Can Trust? Let&apos;s Talk.
        </Title>
        <p className="section-subtitle">Whether it's an SQA role, a test strategy, or an automation suite, I'd love to hear about it.</p>

        <div className="contact-layout">
          <motion.div
            className="contact-form-wrapper card-shine"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="contact-panel-title">Send a message</h3>
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="contact-form-inner">
                {/* Honeypot field – hidden from real users, bots tend to fill every field */}
                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className={`form-input ${fieldErrors.name ? 'field-invalid' : ''}`}
                      placeholder="Your name"
                      autoComplete="name"
                      maxLength={100}
                      value={formData.name}
                      onChange={updateField('name')}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                      required
                    />
                    {fieldErrors.name && <span id="contact-name-error" className="field-error">{fieldErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`form-input ${fieldErrors.email ? 'field-invalid' : ''}`}
                      placeholder="your@email.com"
                      autoComplete="email"
                      value={formData.email}
                      onChange={updateField('email')}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                      required
                    />
                    {fieldErrors.email && <span id="contact-email-error" className="field-error">{fieldErrors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className={`form-input ${fieldErrors.subject ? 'field-invalid' : ''}`}
                    placeholder="e.g. SQA role at your company"
                    maxLength={150}
                    value={formData.subject}
                    onChange={updateField('subject')}
                    aria-invalid={!!fieldErrors.subject}
                    aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                  />
                  {fieldErrors.subject && <span id="contact-subject-error" className="field-error">{fieldErrors.subject}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    className={`form-textarea ${fieldErrors.message ? 'field-invalid' : ''}`}
                    placeholder="Tell me about the role or project (at least 10 characters)"
                    rows={5}
                    maxLength={5000}
                    value={formData.message}
                    onChange={updateField('message')}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                    required
                  />
                  {fieldErrors.message && <span id="contact-message-error" className="field-error">{fieldErrors.message}</span>}
                </div>
                {formSubmitted ? (
                  <div className="form-success" role="status" aria-live="polite">
                    <span className="form-success-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </span>
                    <div className="form-success-content">
                      <strong className="form-success-title">Message sent</strong>
                      <p className="form-success-text">Thanks for reaching out. I&apos;ll get back to you at your email soon.</p>
                      <button type="button" className="form-success-again" onClick={() => setFormSubmitted(false)}>
                        Send another message
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {formError && (
                      <p className="form-error" role="alert">{formErrorMsg || 'Could not send. Try again or email me directly below.'}</p>
                    )}
                    <button type="submit" className="form-submit btn-primary" disabled={formSubmitting} aria-busy={formSubmitting}>
                      {formSubmitting ? 'Sending…' : 'Send message'}
                    </button>
                  </>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            className="contact-direct-wrapper card-shine"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="contact-panel-title">Reach out directly</h3>
            <div className="contact-direct">
              <div className="contact-cards">
                <a href="mailto:sunainayaseen561@gmail.com" className="contact-card card-shine">
                  <span className="contact-icon">
                    <ContactIcons.Email />
                  </span>
                  <h3>Email</h3>
                  <p>sunainayaseen561@gmail.com</p>
                </a>
                <a href="https://www.linkedin.com/in/sunaina-yaseen-160695277" target="_blank" rel="noopener noreferrer" className="contact-card card-shine">
                  <span className="contact-icon">
                    <ContactIcons.LinkedIn />
                  </span>
                  <h3>LinkedIn</h3>
                  <p>Connect with me</p>
                </a>
                <a href="https://github.com/Sunainayaseen" target="_blank" rel="noopener noreferrer" className="contact-card card-shine">
                  <span className="contact-icon">
                    <ContactIcons.GitHub />
                  </span>
                  <h3>GitHub</h3>
                  <p>View my repositories</p>
                </a>
                <a href="tel:+923201436593" className="contact-card card-shine">
                  <span className="contact-icon">
                    <ContactIcons.Phone />
                  </span>
                  <h3>Phone</h3>
                  <p>+92 320 1436593</p>
                </a>
                <div className="contact-card contact-card-static">
                  <span className="contact-icon">
                    <ContactIcons.Location />
                  </span>
                  <h3>Location</h3>
                  <p>Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
