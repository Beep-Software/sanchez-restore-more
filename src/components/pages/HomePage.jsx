import { PaintBrushIcon, SparklesIcon } from '../Icons'
import HomePortfolioShowcase from '../HomePortfolioShowcase'
import { portfolioProjects } from '../../data/portfolio'

export default function HomePage({ navigate }) {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <span className="section-eyebrow">Locally owned &amp; community trusted</span>
          <h1>Experienced Craftsmanship. Modern Automotive Care.</h1>
          <p className="hero-lead">
            Paint and body restoration with premium detailing
            for drivers who take pride in every mile.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('estimate')}>
              Get a Free Estimate
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('services')}>
              Our Services
            </button>
          </div>

          <div className="hero-hours">
            <div className="hours-item">
              <p className="hours-day">Mon – Fri</p>
              <p className="hours-time">8:00 AM – 6:00 PM</p>
            </div>
            <div className="hours-item">
              <p className="hours-day">Saturday</p>
              <p className="hours-time">9:00 AM – 2:00 PM</p>
            </div>
            <div className="hours-item">
              <p className="hours-day">Sunday</p>
              <p className="hours-time">By appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="services-preview">
        <div className="services-preview-inner">
          <div className="section-header">
            <span className="section-eyebrow">What we do</span>
            <h2>Every Service, Done Right</h2>
            <p>From collision repair to showroom-grade detailing, we handle it all with care and precision.</p>
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
              <h3>Paint &amp; Body</h3>
              <p>
                Collision repair, color matching, dent correction, and quality
                refinishing to restore your vehicle to factory-like condition.
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
            <p>No surprises — just clear communication from first look to final delivery.</p>
          </div>
          <div className="process-steps">
            <div className="step">
              <p className="step-num">Step 01</p>
              <h3>Inspect</h3>
              <p>
                We evaluate your vehicle and provide a transparent, itemized
                scope of work before any wrench turns.
              </p>
            </div>
            <div className="step">
              <p className="step-num">Step 02</p>
              <h3>Restore</h3>
              <p>
                Skilled technicians complete paint, body, detailing, and service
                work with meticulous attention to detail.
              </p>
            </div>
            <div className="step">
              <p className="step-num">Step 03</p>
              <h3>Deliver</h3>
              <p>
                Final quality checks are completed before your vehicle is
                returned looking and performing its best.
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

      {/* Portfolio spotlight */}
      <section className="portfolio-preview">
        <div className="portfolio-preview-inner">
          <div className="section-header">
            <span className="section-eyebrow">Our portfolio</span>
            <h2>Completed Work</h2>
            <p>Every project showcases our attention to detail and commitment to excellence.</p>
          </div>
          <HomePortfolioShowcase items={portfolioProjects} />
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="btn btn-outline" onClick={() => navigate('portfolio')}>
              View All Projects
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
