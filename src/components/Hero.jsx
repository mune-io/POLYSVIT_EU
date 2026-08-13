import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>
      <div className="container hero-inner">
        <span className="badge">{t.hero.badge}</span>
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#products" className="btn btn-ghost">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  )
}
