import { useRef, useState } from 'react'
import { usePortfolioProjects } from '../../hooks/usePortfolioProjects'
import { useCarousel } from '../../hooks/useCarousel'

function PortfolioCardImage({ project }) {
  const images = project.images ?? []
  const { current, next, prev, goTo } = useCarousel(images.length, 5000)
  const touchStartX = useRef(null)

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  return (
    <div className="portfolio-card-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {images.map((image, idx) => (
        <img
          key={image.id ?? idx}
          src={image.url}
          alt={`${project.title} — ${project.category} in Southern Indiana`}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`portfolio-card-photo${idx === current ? ' active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className="portfolio-card-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`portfolio-card-dot${idx === current ? ' active' : ''}`}
              aria-label={`Show photo ${idx + 1} of ${project.title}`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function PortfolioPage({ navigate }) {
  const { projects: portfolioProjects, isLoading, error } = usePortfolioProjects()
  const categories = ['All', ...new Set(portfolioProjects.map((project) => project.category).filter(Boolean))]
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
            {categories.map((cat) => (
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
                <PortfolioCardImage project={project} />
                <div className="portfolio-card-content">
                  <div className="portfolio-card-heading">
                    <h3>{project.title}</h3>
                    {project.category && <span className="portfolio-card-tag">{project.category}</span>}
                  </div>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>

          {isLoading && <p className="portfolio-loading-status">Loading completed projects…</p>}
          {error && <p className="portfolio-loading-status" role="alert">{error}</p>}

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
