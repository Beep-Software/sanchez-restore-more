import { useState, useEffect } from 'react'

/**
 * Custom hook for carousel auto-rotation
 * @param {number} count - Total number of items
 * @param {number} interval - Auto-rotate interval in ms (default 5000)
 * @returns {object} { current, next, prev, goTo }
 */
export function useCarousel(count, interval = 5000) {
  const [current, setCurrent] = useState(0)
  const safeCurrent = count > 0 ? Math.min(current, count - 1) : 0

  // Auto-rotate effect
  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [count, interval])

  return {
    current: safeCurrent,
    next: () => setCurrent((prev) => (count > 0 ? (prev + 1) % count : 0)),
    prev: () => setCurrent((prev) => (count > 0 ? (prev - 1 + count) % count : 0)),
    goTo: (idx) => setCurrent(count > 0 ? idx % count : 0),
  }
}
