import { useLanguage } from '../i18n/LanguageContext'
import { PumpIcon, HeatExchangerIcon, SeparatorIcon, DeaeratorIcon } from './icons'

const icons = [PumpIcon, HeatExchangerIcon, SeparatorIcon, DeaeratorIcon]

export default function Products() {
  const { t } = useLanguage()
  const { products } = t

  return (
    <section id="products" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{products.eyebrow}</span>
          <h2>{products.title}</h2>
          <p className="section-subtitle">{products.subtitle}</p>
        </div>
        <div className="card-grid card-grid-4">
          {products.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <div className="product-card" key={item.title}>
                <div className="icon-badge">
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
