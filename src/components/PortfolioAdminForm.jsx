import { useEffect, useRef, useState } from 'react'
import { portfolioCategories } from '../data/portfolio'

const CATEGORY_OPTIONS = portfolioCategories.filter((c) => c !== 'All')

/**
 * Create/edit form for a portfolio project. Supports multiple image uploads
 * (e.g. before/after or in-progress shots) plus title/description/category.
 */
export default function PortfolioAdminForm({ project, onSave, onCancel }) {
  const [title, setTitle] = useState(project?.title ?? '')
  const [category, setCategory] = useState(project?.category ?? CATEGORY_OPTIONS[0])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [description, setDescription] = useState(project?.description ?? '')
  const [existingImages, setExistingImages] = useState(project?.images ?? [])
  const [newImages, setNewImages] = useState([]) // [{ file, previewUrl }]
  const [isSaving, setIsSaving] = useState(false)
  const categoryRef = useRef(null)
  const fileInputRef = useRef(null)

  // Revoke object URLs created for previews when they're replaced/unmounted
  useEffect(() => {
    return () => newImages.forEach((img) => URL.revokeObjectURL(img.previewUrl))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isCategoryOpen) return

    const handlePointerDown = (event) => {
      if (!categoryRef.current?.contains(event.target)) setIsCategoryOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsCategoryOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCategoryOpen])

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files ?? [])
    const withPreviews = files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))
    setNewImages((prev) => [...prev, ...withPreviews])
    e.target.value = ''
  }

  const removeExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const removeNewImage = (previewUrl) => {
    setNewImages((prev) => {
      const removed = prev.find((img) => img.previewUrl === previewUrl)
      if (removed) URL.revokeObjectURL(removed.previewUrl)
      return prev.filter((img) => img.previewUrl !== previewUrl)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSaving) return
    setIsSaving(true)
    try {
      await onSave({
        title,
        category,
        description,
        existingImages,
        newFiles: newImages.map((img) => img.file),
      })
    } finally {
      setIsSaving(false)
    }
  }

  const totalImages = existingImages.length + newImages.length

  return (
    <form onSubmit={handleSubmit} className="admin-form-card" noValidate aria-busy={isSaving}>
      <h2>{project ? 'Edit Project' : 'New Project'}</h2>

      <fieldset className="form-fieldset" disabled={isSaving}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="admin-title">Title *</label>
            <input
              id="admin-title"
              type="text"
              placeholder="2015 Honda Civic — Paint Correction"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="admin-category-label">Category *</label>
            <div className="form-dropdown" ref={categoryRef}>
              <button
                type="button"
                className="form-dropdown-trigger"
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
                aria-labelledby="admin-category-label admin-category-value"
                onClick={() => setIsCategoryOpen((open) => !open)}
              >
                <span id="admin-category-value">{category}</span>
                <span className="form-dropdown-caret" aria-hidden="true" />
              </button>
              {isCategoryOpen && (
                <div className="form-dropdown-menu" role="listbox" aria-labelledby="admin-category-label">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      role="option"
                      aria-selected={category === cat}
                      className={`form-dropdown-option${category === cat ? ' selected' : ''}`}
                      onClick={() => {
                        setCategory(cat)
                        setIsCategoryOpen(false)
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="admin-description">Description *</label>
          <textarea
            id="admin-description"
            placeholder="Describe the work performed…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Project Images</label>
          <p className="admin-form-hint">
            Upload multiple photos — before/after or start-to-finish progress shots work great.
          </p>

          {totalImages > 0 && (
            <div className="image-preview-grid">
              {existingImages.map((img) => (
                <div key={img.id} className="image-preview-thumb">
                  <img src={img.url} alt="" />
                  <button
                    type="button"
                    className="image-preview-remove"
                    onClick={() => removeExistingImage(img.id)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
              {newImages.map((img) => (
                <div key={img.previewUrl} className="image-preview-thumb">
                  <img src={img.previewUrl} alt="" />
                  <button
                    type="button"
                    className="image-preview-remove"
                    onClick={() => removeNewImage(img.previewUrl)}
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Add Images
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFilesSelected}
          />
        </div>

        <div className="admin-form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isSaving}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving || totalImages === 0}>
            {isSaving ? 'Saving…' : 'Save Project'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
