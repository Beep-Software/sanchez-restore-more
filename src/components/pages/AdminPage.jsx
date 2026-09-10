import { useEffect, useState } from 'react'
import { portfolioProjects } from '../../data/portfolio'
import { AuthService } from '../../services/auth'
import { PortfolioAdminService } from '../../services/portfolioAdmin'
import PortfolioAdminForm from '../PortfolioAdminForm'

// Seed local admin state from the static showcase data until the real
// list/create/update/delete API routes exist.
const seedProjects = () =>
  portfolioProjects.map((p) => ({
    ...p,
    images: p.images ?? [{ id: `${p.id}-0`, url: p.image }],
  }))

const generateId = () => Date.now()

export default function AdminPage({ navigate }) {
  const [projects, setProjects] = useState(seedProjects)
  const [editing, setEditing] = useState(null) // null | 'new' | project object

  const authService = new AuthService()
  const portfolioAdminService = new PortfolioAdminService()

  useEffect(() => {
    if (!authService.isAuthenticated()) navigate('admin-login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    authService.logout()
    navigate('admin-login')
  }

  const handleSave = async (formValues) => {
    const { title, category, description, existingImages, newFiles } = formValues
    const newImages = newFiles.map((file, idx) => ({
      id: `new-${generateId()}-${idx}`,
      url: URL.createObjectURL(file),
    }))
    const images = [...existingImages, ...newImages]

    if (editing && editing !== 'new') {
      const updated = { ...editing, title, category, description, images, image: images[0]?.url }
      try {
        // Backend route not implemented yet — call is wired up for when it is.
        await portfolioAdminService.update(editing.id, { title, category, description, images: newFiles })
      } catch {
        // ignore until the API exists
      }
      setProjects((prev) => prev.map((p) => (p.id === editing.id ? updated : p)))
    } else {
      const created = {
        id: generateId(),
        title,
        category,
        description,
        images,
        image: images[0]?.url,
      }
      try {
        await portfolioAdminService.create({ title, category, description, images: newFiles })
      } catch {
        // ignore until the API exists
      }
      setProjects((prev) => [created, ...prev])
    }

    setEditing(null)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      await portfolioAdminService.remove(id)
    } catch {
      // ignore until the API exists
    }
    setProjects((prev) => prev.filter((p) => p.id !== id))
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
            <button className="btn btn-primary" onClick={() => setEditing('new')}>
              + Add New Project
            </button>
            <button className="btn btn-outline" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          {editing && (
            <PortfolioAdminForm
              project={editing === 'new' ? null : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          )}

          <div className="admin-grid">
            {projects.map((project) => (
              <div key={project.id} className="admin-card">
                <div className="admin-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <span className="admin-card-badge">{project.images.length} photo{project.images.length === 1 ? '' : 's'}</span>
                </div>
                <div className="admin-card-content">
                  <span className="portfolio-card-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="admin-card-actions">
                    <button className="btn btn-outline" onClick={() => setEditing(project)}>
                      Edit
                    </button>
                    <button className="btn btn-outline admin-card-delete" onClick={() => handleDelete(project.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
