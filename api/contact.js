// Vercel serverless function: POST /api/contact
// Mirrors portfolio-backend/app.py so the deployed site can send mail without a separate server.
// Required Vercel env vars: SMTP_USER, SMTP_PASSWORD (Gmail App Password), OWNER_EMAIL.
// Optional: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 587), MAIL_FROM_NAME.
import nodemailer from 'nodemailer'

const NAME_MAX = 100
const SUBJECT_MAX = 150
const MESSAGE_MIN = 10
const MESSAGE_MAX = 5000
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function validate(data) {
  const errors = {}
  const name = String(data.name || '').trim()
  const email = String(data.email || '').trim()
  const subject = String(data.subject || '').trim()
  const message = String(data.message || '').trim()

  if (!name) errors.name = 'Name is required.'
  else if (name.length > NAME_MAX) errors.name = `Name must be ${NAME_MAX} characters or fewer.`

  if (!email) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'

  if (subject.length > SUBJECT_MAX) errors.subject = `Subject must be ${SUBJECT_MAX} characters or fewer.`

  if (!message) errors.message = 'Message is required.'
  else if (message.length < MESSAGE_MIN) errors.message = `Message must be at least ${MESSAGE_MIN} characters.`
  else if (message.length > MESSAGE_MAX) errors.message = `Message must be ${MESSAGE_MAX} characters or fewer.`

  return {
    errors,
    cleaned: { name, email, subject: subject || `New message from ${name || 'website visitor'}`, message },
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Use POST with JSON: name, email, message (optional: subject)' })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ status: 'error', msg: 'Method not allowed' })
  }

  let data = req.body || {}
  if (typeof data === 'string') {
    try { data = JSON.parse(data) } catch { data = {} }
  }

  // Honeypot: bots fill hidden fields, humans never see them.
  if (String(data.website || '').trim()) {
    return res.status(201).json({ status: 'success', msg: 'Message received!' })
  }

  const { errors, cleaned } = validate(data)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ status: 'error', errors })
  }

  const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '587', SMTP_USER, SMTP_PASSWORD, MAIL_FROM_NAME = 'Sunaina Yaseen Portfolio' } = process.env
  const OWNER_EMAIL = process.env.OWNER_EMAIL || SMTP_USER
  if (!SMTP_USER || !SMTP_PASSWORD || !OWNER_EMAIL) {
    console.error('Contact form: SMTP env vars are not configured on Vercel')
    return res.status(500).json({ status: 'error', errors: { _global: 'Email service is not configured yet. Please email me directly.' } })
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })
  const from = `${MAIL_FROM_NAME} <${SMTP_USER}>`

  try {
    await transporter.sendMail({
      from,
      to: OWNER_EMAIL,
      replyTo: cleaned.email,
      subject: `[Portfolio Contact] ${cleaned.subject}`,
      text: `New contact form submission\n\nName: ${cleaned.name}\nEmail: ${cleaned.email}\nSubject: ${cleaned.subject}\n\nMessage:\n${cleaned.message}\n`,
    })
  } catch (err) {
    console.error('Contact form: failed to send owner email', err)
    return res.status(502).json({ status: 'error', errors: { _global: 'Could not send your message right now. Please email me directly.' } })
  }

  // Confirmation to the visitor is best-effort; the owner already has the message.
  try {
    await transporter.sendMail({
      from,
      to: cleaned.email,
      subject: 'Thanks for reaching out — Sunaina Yaseen',
      text: `Hi ${cleaned.name},\n\nThanks for reaching out! I've received your message and will get back to you as soon as possible.\n\nFor your records, here's what you sent:\nSubject: ${cleaned.subject}\nMessage: ${cleaned.message}\n\nBest,\nSunaina Yaseen`,
    })
  } catch (err) {
    console.error('Contact form: failed to send visitor confirmation', err)
  }

  return res.status(201).json({ status: 'success', msg: "Message received! I'll get back to you soon." })
}
