import { useEffect, useRef, useState } from 'react'
import { portfolioCategories } from '../data/portfolio'

const CATEGORY_OPTIONS = portfolioCategories.filter((c) => c !== 'All')
const MAX_PROJECT_IMAGES = 5

/**
 * Create/edit form for a portfolio project. Supports multiple image uploads
 * (e.g. before/after or in-progress shots) plus title/description/category.
 */
export default function PortfolioAdminForm({ project, onSave, onCancel, disabled = false }) {
  const [title, setTitle] = useState(project?.title ?? '')
  const [category, setCategory] = useState(project?.category ?? CATEGORY_OPTIONS[0])
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [description, setDescription] = useState(project?.description ?? '')
  const [existingImages, setExistingImages] = useState(project?.images ?? [])
  const [newImages, setNewImages] = useState([]) // [{ file, previewUrl }]
  const [isSaving, setIsSaving] = useState(false)
  const [imageError, setImageError] = useState('')
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
    const availableSlots = Math.max(0, MAX_PROJECT_IMAGES - existingImages.length - newImages.length)
    const acceptedFiles = files.slice(0, availableSlots)
    const withPreviews = acceptedFiles.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))
    setNewImages((prev) => [...prev, ...withPreviews])
    setImageError(files.length > availableSlots ? `Projects can have up to ${MAX_PROJECT_IMAGES} photos.` : '')
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
    if (isSaving || disabled) return
    if (totalImages > MAX_PROJECT_IMAGES) {
      setImageError(`Remove ${totalImages - MAX_PROJECT_IMAGES} photo${totalImages - MAX_PROJECT_IMAGES === 1 ? '' : 's'} before saving.`)
      return
    }
    setIsSaving(true)
    try {
      await onSave({
        title,
        category,
        description,
        existingImages,
        newFiles: newImages.map((img) => img.file),
        removedImageIds: (project?.images ?? [])
          .filter((image) => !existingImages.some((current) => current.id === image.id))
          .map((image) => image.id),
      })
    } finally {
      setIsSaving(false)
    }
  }

  const totalImages = existingImages.length + newImages.length

  return (
    <form onSubmit={handleSubmit} className="admin-form-card" noValidate aria-busy={isSaving || disabled}>
      <h2>{project ? 'Edit Project' : 'New Project'}</h2>

      <fieldset className="form-fieldset" disabled={isSaving || disabled}>
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
            Upload up to {MAX_PROJECT_IMAGES} photos. {totalImages} of {MAX_PROJECT_IMAGES} selected.
          </p>
          {imageError && <p className="admin-image-error" role="alert">{imageError}</p>}

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
            disabled={totalImages >= MAX_PROJECT_IMAGES}
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
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isSaving || disabled}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSaving || disabled || totalImages === 0 || totalImages > MAX_PROJECT_IMAGES}>
            {isSaving ? (project ? 'Updating…' : 'Creating…') : 'Save Project'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
