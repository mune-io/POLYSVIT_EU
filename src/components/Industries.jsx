import { useLanguage } from '../i18n/LanguageContext'
import { FoodIcon, PharmaIcon, RefineryIcon } from './icons'

const icons = [FoodIcon, PharmaIcon, RefineryIcon]

export default function Industries() {
  const { t } = useLanguage()
  const { industries } = t

  return (
    <section id="industries" className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{industries.eyebrow}</span>
          <h2>{industries.title}</h2>
        </div>
        <div className="card-grid card-grid-3">
          {industries.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div className="industry-card" key={item.title}>
                <div className="icon-badge icon-badge-dark">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
