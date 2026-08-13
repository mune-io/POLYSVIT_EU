import { useLanguage } from '../i18n/LanguageContext'

export default function Partners() {
  const { t } = useLanguage()
  const { partners } = t

  return (
    <section id="partners" className="section section-dark">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow eyebrow-light">{partners.eyebrow}</span>
          <h2>{partners.title}</h2>
          <p className="section-subtitle section-subtitle-light">{partners.subtitle}</p>
        </div>
        <div className="card-grid card-grid-3">
          {partners.items.map((p) => (
            <div className="partner-card" key={p.name}>
              <span className="partner-name">{p.name}</span>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
