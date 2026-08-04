import { useEffect } from 'react'
import ContactSection from '../components/ContactSection'

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Sunaina Yaseen'
  }, [])

  return <ContactSection className="page-section" />
}
