import { useState, useEffect } from 'react'

/**
 * Custom hook for carousel auto-rotation
 * @param {number} count - Total number of items
 * @param {number} interval - Auto-rotate interval in ms (default 5000)
 * @returns {object} { current, next, prev, goTo }
 */
export function useCarousel(count, interval = 5000) {
  const [current, setCurrent] = useState(0)

  // Auto-rotate effect
  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [count, interval])

  return {
    current,
    next: () => setCurrent((prev) => (prev + 1) % count),
    prev: () => setCurrent((prev) => (prev - 1 + count) % count),
    goTo: (idx) => setCurrent(idx % count),
  }
}
