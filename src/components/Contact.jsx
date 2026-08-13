import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { company } from '../company'
import { PinIcon, PhoneIcon } from './icons'

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t
  const [sent, setSent] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
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
                value={values.message}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn btn-primary">
              {contact.form.submit}
            </button>
            {sent && <p className="form-thanks">{contact.form.thanks}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
