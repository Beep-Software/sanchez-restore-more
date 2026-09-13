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
        persistedProjects.slice(0, 4).flatMap((project) => project.images ?? []).forEach((image) => {
          const preload = new Image()
          preload.decoding = 'async'
          preload.src = image.url
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
