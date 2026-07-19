import { useCarousel } from '../hooks/useCarousel'

/**
 * Image carousel component with auto-rotation and navigation
 */
export default function Carousel({ items, height = '400px' }) {
  const { current, next, prev, goTo } = useCarousel(items.length, 5000)

  if (!items || items.length === 0) return null

  const currentItem = items[current]

  return (
    <div className="carousel">
      {/* Main image display */}
      <div className="carousel-main" style={{ height }}>
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="carousel-image"
        />
        <div className="carousel-overlay">
          <div className="carousel-content">
            <h3>{currentItem.title}</h3>
            <p>{currentItem.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="carousel-nav">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="carousel-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot${idx === current ? ' active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current}
            />
          ))}
        </div>
        <button
          className="carousel-btn carousel-btn-next"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  )
}
