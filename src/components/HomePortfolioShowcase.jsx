import { useCarousel } from '../hooks/useCarousel'

export default function HomePortfolioShowcase({ items }) {
  const { current, next, prev, goTo } = useCarousel(items?.length ?? 0, 5000)

  if (!items || items.length === 0) return null

  const activeItem = items[current]

  return (
    <div className="home-portfolio-stage" aria-label="Portfolio spotlight">
      <div
        className="home-portfolio-backdrop"
        style={{ backgroundImage: `url(${activeItem.image})` }}
        aria-hidden="true"
      />
      <div className="home-portfolio-vignette" aria-hidden="true" />

      <article className="home-portfolio-glass">
        <div className="home-portfolio-meta">
          <span className="home-portfolio-tag">{activeItem.category}</span>
          <span className="home-portfolio-counter">
            {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
        <h3>{activeItem.title}</h3>
        <p>{activeItem.description}</p>

        <div className="home-portfolio-controls">
          <button
            className="home-portfolio-arrow"
            onClick={prev}
            aria-label="Show previous project"
          >
            Prev
          </button>
          <button
            className="home-portfolio-arrow"
            onClick={next}
            aria-label="Show next project"
          >
            Next
          </button>
        </div>
      </article>

      <div className="home-portfolio-rail" role="tablist" aria-label="Portfolio projects">
        {items.map((item, idx) => (
          <button
            key={item.id ?? idx}
            className={`home-portfolio-thumb${idx === current ? ' active' : ''}`}
            onClick={() => goTo(idx)}
            role="tab"
            aria-selected={idx === current}
            aria-label={`Show project ${idx + 1}: ${item.title}`}
          >
            <img src={item.image} alt="" loading="lazy" aria-hidden="true" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
