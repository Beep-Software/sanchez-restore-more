import { useState, useEffect } from 'react'

/**
 * Custom hook for carousel auto-rotation
 * @param {number} count - Total number of items
 * @param {number} interval - Auto-rotate interval in ms (default 5000)
 * @returns {object} { current, next, prev, goTo }
 */
export function useCarousel(count, interval = 5000) {
  const [current, setCurrent] = useState(0)
  const [timerReset, setTimerReset] = useState(0)
  const safeCurrent = count > 0 ? Math.min(current, count - 1) : 0

  const navigate = (getNextIndex) => {
    setCurrent((previous) => (count > 0 ? getNextIndex(previous) : 0))
    setTimerReset((reset) => reset + 1)
  }

  // Auto-rotate effect
  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, interval)
    return () => clearInterval(timer)
  }, [count, interval, timerReset])

  return {
    current: safeCurrent,
    next: () => navigate((previous) => (previous + 1) % count),
    prev: () => navigate((previous) => (previous - 1 + count) % count),
    goTo: (index) => navigate(() => index % count),
  }
}
