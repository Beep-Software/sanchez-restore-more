import { useEffect, useState } from 'react'
import { AuthService } from '../../services/auth'
import { PortfolioAdminService } from '../../services/portfolioAdmin'
import PortfolioAdminForm from '../PortfolioAdminForm'
import { notificationService } from '../../services/notifications'

export default function AdminPage({ navigate }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null | 'new' | project object
  const [isMutating, setIsMutating] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const authService = new AuthService()
  const portfolioAdminService = new PortfolioAdminService()

  useEffect(() => {
    if (!authService.isAuthenticated()) navigate('admin-login')
    portfolioAdminService.list()
      .then(setProjects)
      .catch(() => {
        setError('Projects could not be loaded.')
        notificationService.error('Projects could not be loaded.')
      })
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

  const handleSave = async (formValues) => {
    if (isMutating) return
    setIsMutating(true)
    try {
      if (editing && editing !== 'new') {
        const updated = await portfolioAdminService.update(editing.id, {
          title: formValues.title,
          category: formValues.category,
          description: formValues.description,
          images: formValues.newFiles,
          removedImageIds: formValues.removedImageIds,
        })
        setProjects((prev) => prev.map((project) => (project.id === updated.id ? updated : project)))
        notificationService.success('Project updated successfully.')
      } else {
        const created = await portfolioAdminService.create({ ...formValues, images: formValues.newFiles })
        setProjects((prev) => [created, ...prev])
        notificationService.success('Project created successfully.')
      }
      setEditing(null)
    } catch {
      notificationService.error('The project could not be saved. Check the form and try again.')
    } finally {
      setIsMutating(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    if (isMutating || deletingId) return
    setDeletingId(id)
    try {
      await portfolioAdminService.remove(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      notificationService.success('Project deleted successfully.')
    } catch {
      notificationService.error('The project could not be deleted. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main>
      <section className="page-hero">
        <span className="section-eyebrow">Admin</span>
        <h1>Manage Portfolio</h1>
        <p>Add new completed projects or edit existing ones.</p>
      </section>

      <section className="admin-section">
        <div className="admin-section-inner">
          <div className="admin-toolbar">
            <button className="btn btn-primary" onClick={() => setEditing('new')} disabled={isLoading || isMutating || Boolean(deletingId)}>
              + Add New Project
            </button>
            <button className="btn btn-outline" onClick={handleLogout} disabled={isLoading || isMutating || Boolean(deletingId)}>
              Log Out
            </button>
          </div>

          {editing && (
            <PortfolioAdminForm
              key={editing === 'new' ? 'new' : editing.id}
              project={editing === 'new' ? null : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          )}

          {isLoading && <p>Loading projects...</p>}
          {!isLoading && error && <p role="alert">{error}</p>}
          {!isLoading && !error && projects.length === 0 && <p>No projects have been added yet.</p>}

          {!isLoading && !error && <div className="admin-grid">
            {projects.map((project) => (
              <div key={project.id} className="admin-card">
                <div className="admin-card-image">
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  <span className="admin-card-badge">{project.images.length} photo{project.images.length === 1 ? '' : 's'}</span>
                </div>
                <div className="admin-card-content">
                  <span className="portfolio-card-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="admin-card-actions">
                    <button className="btn btn-outline" onClick={() => setEditing(project)} disabled={isMutating || Boolean(deletingId)}>
                      Edit
                    </button>
                    <button className="btn btn-outline admin-card-delete" onClick={() => handleDelete(project.id)} disabled={isMutating || Boolean(deletingId)}>
                      {deletingId === project.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </section>
    </main>
  )
}
