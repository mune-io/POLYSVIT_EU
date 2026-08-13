import { useLanguage } from '../i18n/LanguageContext'
import { company } from '../company'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">{company.brand}</span>
          </div>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>
        <div className="footer-meta">
          <span>{company.address}</span>
          <span>{company.phone}</span>
          <span>{company.website}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} {company.legalName}. {t.footer.rights}
        </span>
      </div>
    </footer>
  )
}
