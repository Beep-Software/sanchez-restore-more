import { useState } from 'react'
import { portfolioProjects, portfolioCategories } from '../../data/portfolio'

export default function PortfolioPage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory)

  return (
    <main>
      {/* Page hero */}
      <section className="page-hero">
        <span className="section-eyebrow">Our Work</span>
        <h1>Completed Projects</h1>
        <p>
          A showcase of detailed work, meticulous restoration, and satisfied customers.
          Every project represents our commitment to quality and precision.
        </p>
      </section>

      {/* Portfolio grid with filters */}
      <section className="portfolio-section">
        <div className="portfolio-inner">
          {/* Category filter */}
          <div className="portfolio-filter">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                className={`portfolio-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="portfolio-card">
                <div className="portfolio-card-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-category">{project.category}</span>
                  </div>
                </div>
                <div className="portfolio-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-secondary)' }}>
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="portfolio-cta">
        <div className="portfolio-cta-inner">
          <h2>Ready to restore your ride?</h2>
          <p>
            See the difference professional care can make. Contact us for a free consultation
            or estimate.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('estimate')}>
            Request an Estimate
          </button>
        </div>
      </section>
    </main>
  )
}
