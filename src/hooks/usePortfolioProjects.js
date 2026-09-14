import { useEffect, useState } from 'react'
import { PortfolioAdminService } from '../services/portfolioAdmin'
import { notificationService } from '../services/notifications'

export function usePortfolioProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    new PortfolioAdminService().listPublic().then((persistedProjects) => {
      if (active) {
        setProjects(persistedProjects)
        // Only preload each project's first image (the only one the hero ever shows), and
        // prioritize the very first one since it's what's visible immediately on load.
        persistedProjects.slice(0, 4).forEach((project, idx) => {
          const firstImage = project.images?.[0]
          if (!firstImage) return
          const preload = new Image()
          preload.decoding = 'async'
          if (idx === 0) preload.fetchPriority = 'high'
          preload.src = firstImage.url
        })
      }
    }).catch(() => {
      if (active) {
        setError('Portfolio projects could not be loaded.')
        notificationService.error('Portfolio projects could not be loaded.')
      }
    }).finally(() => {
      if (active) setIsLoading(false)
    })
    return () => { active = false }
  }, [])

  return { projects, isLoading, error }
}
