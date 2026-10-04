import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { useLanguage } from '../../i18n/LanguageContext'
import { galleryService, type GalleryImage } from '../services/galleryService'
import { Plus, Trash2, Star } from 'lucide-react'

interface GalleryModalState {
  isOpen: boolean
  image: GalleryImage | null
  mode: 'add' | 'edit'
}

export const GalleryManagementPage: React.FC = () => {
  const { t } = useLanguage()
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<GalleryModalState>({ isOpen: false, image: null, mode: 'add' })
  const [formData, setFormData] = useState<Omit<GalleryImage, 'id'>>({
    title: '',
    image: '',
    displayOrder: 0,
    featured: false,
  })

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      setLoading(true)
      const data = await galleryService.getAll()
      setGallery(data)
    } catch (err) {
      console.error('Failed to load gallery:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setFormData({
      title: '',
      image: '',
      displayOrder: gallery.length + 1,
      featured: false,
    })
    setModal({ isOpen: true, image: null, mode: 'add' })
  }

  const openEditModal = (image: GalleryImage) => {
    setFormData(image)
    setModal({ isOpen: true, image, mode: 'edit' })
  }

  const closeModal = () => {
    setModal({ isOpen: false, image: null, mode: 'add' })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (modal.mode === 'add') {
        await galleryService.create(formData)
      } else if (modal.image) {
        await galleryService.update(modal.image.id, formData)
      }
      await loadGallery()
      closeModal()
    } catch (err) {
      console.error('Failed to save image:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      try {
        await galleryService.delete(id)
        await loadGallery()
      } catch (err) {
        console.error('Failed to delete image:', err)
      }
    }
  }

  const toggleFeatured = async (image: GalleryImage) => {
    try {
      await galleryService.update(image.id, { featured: !image.featured })
      await loadGallery()
    } catch (err) {
      console.error('Failed to toggle featured:', err)
    }
  }

  return (
    <AdminLayout title={t.admin.gallery} breadcrumbs={[{ label: t.admin.dashboard, href: '/admin' }, { label: t.admin.gallery }]}>
      <div className="admin-page">
        {/* Header */}
        <div className="admin-page-actions">
          <div></div>
          <button onClick={openAddModal} className="admin-button admin-button-primary">
            <Plus size={18} />
            <span>{t.admin.addImage}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="admin-loading">{t.admin.loading}...</div>
        ) : gallery.length > 0 ? (
          <div className="admin-gallery-grid">
            {gallery.map((image) => (
              <div key={image.id} className="admin-gallery-item">
                <div className="admin-gallery-image">
                  <img src={image.image} alt={image.title} />
                  {image.featured && <div className="admin-gallery-featured-badge">{t.admin.featured}</div>}
                </div>
                <div className="admin-gallery-content">
                  <h3>{image.title}</h3>
                  <p className="admin-gallery-order">{t.admin.displayOrder}: {image.displayOrder}</p>
                </div>
                <div className="admin-gallery-actions">
                  <button
                    onClick={() => toggleFeatured(image)}
                    className={`admin-icon-button ${image.featured ? 'admin-icon-featured' : ''}`}
                    title={image.featured ? t.admin.markAsFeatured : t.admin.featured}
                  >
                    <Star size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(image)}
                    className="admin-icon-button admin-icon-edit"
                    title={t.admin.edit}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="admin-icon-button admin-icon-delete"
                    title={t.admin.delete}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <p>{t.admin.noImages}</p>
          </div>
        )}

        {/* Gallery Modal */}
        {modal.isOpen && (
          <div className="admin-modal-overlay" onClick={closeModal}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{modal.mode === 'add' ? t.admin.addImage : t.admin.editImage}</h2>
                <button onClick={closeModal} className="admin-modal-close">
                  ×
                </button>
              </div>

              <form onSubmit={handleSave} className="admin-form">
                <div className="admin-form-group">
                  <label>{t.admin.title}</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.photoUrl}</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.displayOrder}</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>

                <div className="admin-form-group admin-form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>{t.admin.markAsFeatured}</span>
                  </label>
                </div>

                <div className="admin-modal-actions">
                  <button type="button" onClick={closeModal} className="admin-button admin-button-secondary">
                    {t.admin.cancel}
                  </button>
                  <button type="submit" className="admin-button admin-button-primary">
                    {modal.mode === 'add' ? t.admin.addImage : t.admin.save}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
