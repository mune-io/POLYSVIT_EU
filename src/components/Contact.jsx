import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { company } from '../company'
import { PinIcon, PhoneIcon } from './icons'

// Populated by Terraform after `terraform apply` (see terraform/mail.tf,
// resource aws_s3_object.runtime_config) — decouples the Lambda Function
// URL (only known once the infra exists) from this pre-built JS bundle.
async function getContactEndpoint() {
  try {
    const res = await fetch('/config.json', { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.contactEndpoint || null
  } catch {
    return null
  }
}

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [endpoint, setEndpoint] = useState(null)

  useEffect(() => {
    getContactEndpoint().then(setEndpoint)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!endpoint) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p className="section-subtitle">{contact.subtitle}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-line">
              <PinIcon />
              <div>
                <span className="contact-label">{contact.addressLabel}</span>
                <span>{company.address}</span>
              </div>
            </div>
            <div className="contact-line">
              <PhoneIcon />
              <div>
                <span className="contact-label">{contact.phoneLabel}</span>
                <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
              </div>
            </div>

            <div className="registry-card">
              <span className="contact-label">{contact.companyDataTitle}</span>
              <ul className="registry-list">
                <li>
                  <strong>{company.legalName}</strong>
                </li>
                <li>
                  {contact.legalFormLabel}: {company.legalForm}
                </li>
                <li>{company.register}</li>
                <li>KRS: {company.krs}</li>
                <li>NIP: {company.nip}</li>
                <li>REGON: {company.regon}</li>
              </ul>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              {contact.form.name}
              <input
                type="text"
                name="name"
                required
                maxLength={200}
                value={values.name}
                onChange={handleChange}
              />
            </label>
            <label>
              {contact.form.email}
              <input
                type="email"
                name="email"
                required
                maxLength={200}
                value={values.email}
                onChange={handleChange}
              />
            </label>
            <label>
              {contact.form.message}
              <textarea
                name="message"
                rows={4}
                required
                maxLength={5000}
                value={values.message}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? contact.form.sending : contact.form.submit}
            </button>
            {status === 'sent' && <p className="form-thanks">{contact.form.thanks}</p>}
            {status === 'error' && <p className="form-error">{contact.form.error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
