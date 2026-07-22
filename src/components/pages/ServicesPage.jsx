import { PaintBrushIcon, SparklesIcon } from '../Icons'

const SERVICE_ICONS = {
  paint: PaintBrushIcon,
  detail: SparklesIcon,
}

export default function ServicesPage({ navigate }) {
  const services = [
    {
      icon: 'detail',
      title: 'Premium Detailing',
      description:
        'Our detailing services go beyond a standard wash. We decontaminate, correct, and protect every surface — inside and out — so your vehicle looks and feels like the day you drove it off the lot.',
      items: [
        'Full interior deep clean',
        'Exterior decontamination wash',
        'Machine polish and paint correction',
        'Ceramic coating application',
        'Leather conditioning and treatment',
        'Engine bay cleaning',
      ],
    },
    {
      icon: 'paint',
      title: 'Paint & Body Restoration',
      description:
        'Whether it\'s collision damage, rust, or just years of wear, we restore your vehicle\'s body to its original integrity and appearance. Our color-matching technology ensures a seamless, factory-quality finish.',
      items: [
        'Collision and impact repair',
        'Precision color matching',
        'Dent and ding correction',
        'Rust treatment and prevention',
        'Full respray and panel refinishing',
        'Clear coat restoration',
      ],
    },
  ]

  return (
    <main>
      <section className="page-hero">
        <span className="section-eyebrow">Our services</span>
        <h1>Everything Your Vehicle Needs</h1>
        <p>
          From complete restoration to premium detailing, our team
          delivers honest work at fair prices.
        </p>
      </section>

      <section className="services-full">
        <div className="services-full-inner">
          {services.map((svc) => (
            <div className="service-row" key={svc.title}>
              <div className="service-row-icon" aria-hidden="true">
                {(() => { const Icon = SERVICE_ICONS[svc.icon]; return <Icon size={40} /> })()}
              </div>
              <div className="service-row-body">
                <h2>{svc.title}</h2>
                <p>{svc.description}</p>
                <ul>
                  {svc.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="service-row-action">
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('estimate')}
                >
                  Get Estimate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
