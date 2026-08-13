import { useLanguage } from '../i18n/LanguageContext'

export default function Overview() {
  const { t } = useLanguage()
  const { overview } = t

  return (
    <section id="overview" className="section">
      <div className="container overview-grid">
        <div>
          <span className="eyebrow">{overview.eyebrow}</span>
          <h2>{overview.title}</h2>
          {overview.paragraphs.map((p, i) => (
            <p className="overview-p" key={i}>
              {p}
            </p>
          ))}
        </div>
        <div className="stats-grid">
          {overview.stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
