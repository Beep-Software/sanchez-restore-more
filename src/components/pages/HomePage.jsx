import { PaintBrushIcon, SparklesIcon } from '../Icons'
import { portfolioProjects } from '../../data/portfolio'
import { useCarousel } from '../../hooks/useCarousel'

export default function HomePage({ navigate }) {
  const { current } = useCarousel(portfolioProjects.length, 5000)

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-image-stack" aria-hidden="true">
          {portfolioProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`hero-rotating-image${idx === current ? ' active' : ''}`}
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ))}
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-glass-copy">
            <span className="section-eyebrow">Southern Indiana &amp; Louisville, KY</span>
            <h1>Professional Auto Detailing &amp; Paint Correction</h1>
            <p className="hero-lead">
              Sanchez Restore &amp; More delivers premium car detailing, paint correction, and ceramic coating
              for drivers across Southern Indiana and the Louisville, KY area.
            </p>
          </div>
          <div className="hero-actions hero-glass-actions">
            <button className="btn btn-primary" onClick={() => navigate('estimate')}>
              Get a Free Estimate
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('services')}>
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="services-preview">
        <div className="services-preview-inner">
          <div className="section-header">
            <span className="section-eyebrow">What we do</span>
            <h2>Every Service, Done Right</h2>
          </div>
          <div className="service-cards">
            <div className="service-card">
              <SparklesIcon size={36} className="card-icon" />
              <h3>Premium Detailing</h3>
              <p>
                Interior deep cleaning, exterior decontamination, polishing, and
                paint protection to bring back that showroom shine.
              </p>
            </div>
            <div className="service-card">
              <PaintBrushIcon size={36} className="card-icon" />
              <h3>Paint Correction</h3>
              <p>
                Careful machine polishing and defect removal to refine your
                vehicle&apos;s finish and bring back a showroom-quality gloss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process">
        <div className="process-inner">
          <div className="section-header">
            <span className="section-eyebrow">How it works</span>
            <h2>Simple, Transparent Process</h2>
          </div>
          <div className="process-steps">
            <div className="step">
              <p className="step-num">Step 01</p>
              <h3>Inspect</h3>
              <p>
                We evaluate your vehicle and provide a clear, itemized quote
                before any work begins.
              </p>
            </div>
            <div className="step">
              <p className="step-num">Step 02</p>
              <h3>Correct</h3>
              <p>
                Our technicians complete the work with meticulous attention
                to detail.
              </p>
            </div>
            <div className="step">
              <p className="step-num">Step 03</p>
              <h3>Deliver</h3>
              <p>
                Final quality checks ensure your vehicle leaves looking
                its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      {/* <section className="trust-band" aria-label="Why choose us">
        <div className="trust-band-inner">
          <div className="trust-item">
            <p className="trust-metric">10+ Years</p>
            <p className="trust-label">Hands-on experience</p>
          </div>
          <div className="trust-item">
            <p className="trust-metric">Family-Run</p>
            <p className="trust-label">Personal service and care</p>
          </div>
          <div className="trust-item">
            <p className="trust-metric">Quality-First</p>
            <p className="trust-label">Work we stand behind</p>
          </div>
        </div>
      </section> */}

    </main>
  )
}
