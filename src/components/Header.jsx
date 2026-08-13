import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { languages } from '../i18n/translations'
import { company } from '../company'

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '#overview', label: t.nav.overview },
    { href: '#products', label: t.nav.products },
    { href: '#industries', label: t.nav.industries },
    { href: '#partners', label: t.nav.partners },
    { href: '#contact', label: t.nav.contact },
  ]

  const handleNav = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={handleNav}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">{company.brand}</span>
        </a>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={handleNav}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={handleNav}>
            {t.hero.ctaPrimary}
          </a>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={l.code === lang ? 'is-active' : ''}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
