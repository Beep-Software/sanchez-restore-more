import './App.css'

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <p className="topbar-copy">Locally owned in our community</p>
        <a className="topbar-link" href="#contact">
          Request an estimate
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="kicker">Sanchez Restore and More</p>
            <h1>Experienced Craftsmanship. Modern Automotive Care.</h1>
            <p className="lead">
              Paint and body restoration, premium detailing, and reliable
              maintenance for drivers who take pride in every mile.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#services">
                Explore services
              </a>
              <a className="btn-secondary" href="#contact">
                Book an appointment
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-hidden="true">
            <p className="panel-head">Open this week</p>
            <ul>
              <li>
                <span>Mon - Fri</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span>Saturday</span>
                <span>9:00 AM - 2:00 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>By appointment</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="service-grid" id="services" aria-label="Core services">
          <article className="service-card">
            <h2>Paint and Body</h2>
            <p>
              Collision repair, color matching, dent correction, and quality
              refinishing to restore your vehicle with a clean, factory-like
              finish.
            </p>
          </article>
          <article className="service-card">
            <h2>Detailing</h2>
            <p>
              Interior deep cleaning, exterior decontamination, polishing, and
              paint protection designed to bring back that showroom feel.
            </p>
          </article>
          <article className="service-card">
            <h2>Maintenance</h2>
            <p>
              Practical service packages for routine automotive care so your
              car stays dependable, clean, and road-ready year round.
            </p>
          </article>
        </section>

        <section className="process" id="process" aria-label="Our process">
          <h2>How We Work</h2>
          <div className="process-steps">
            <article>
              <p className="step-no">01</p>
              <h3>Inspect</h3>
              <p>
                We evaluate the vehicle and provide a transparent scope of work.
              </p>
            </article>
            <article>
              <p className="step-no">02</p>
              <h3>Restore</h3>
              <p>
                Skilled technicians complete paint, body, detailing, and service
                work with attention to detail.
              </p>
            </article>
            <article>
              <p className="step-no">03</p>
              <h3>Deliver</h3>
              <p>
                Final quality checks are completed before we return your vehicle
                looking and performing its best.
              </p>
            </article>
          </div>
        </section>

        <section className="trust-band" aria-label="What sets us apart">
          <div>
            <p className="metric">10+ years</p>
            <p>Hands-on experience</p>
          </div>
          <div>
            <p className="metric">Family-run</p>
            <p>Personal service and care</p>
          </div>
          <div>
            <p className="metric">Quality-first</p>
            <p>Work we stand behind</p>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <h2>Ready to restore your ride?</h2>
          <p>
            Sanchez Restore and More helps you protect your investment with
            professional automotive care.
          </p>
        </div>
        <a className="btn-primary" href="tel:+15550000000">
          Call (555) 000-0000
        </a>
      </footer>
    </div>
  )
}

export default App
