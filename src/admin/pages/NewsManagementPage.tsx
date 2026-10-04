import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { useLanguage } from '../../i18n/LanguageContext'
import { newsService, type NewsArticle } from '../services/newsService'
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface NewsModalState {
  isOpen: boolean
  article: NewsArticle | null
  mode: 'add' | 'edit'
}

export const NewsManagementPage: React.FC = () => {
  const { t } = useLanguage()
  const [news, setNews] = useState<NewsArticle[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [modal, setModal] = useState<NewsModalState>({ isOpen: false, article: null, mode: 'add' })
  const [formData, setFormData] = useState<Omit<NewsArticle, 'id'>>({
    title: '',
    category: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    published: false,
  })

  useEffect(() => {
    loadNews()
  }, [])

  useEffect(() => {
    const filtered = news.filter((n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredNews(filtered)
  }, [searchQuery, news])

  const loadNews = async () => {
    try {
      setLoading(true)
      const data = await newsService.getAll(false)
      setNews(data)
    } catch (err) {
      console.error('Failed to load news:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setFormData({
      title: '',
      category: '',
      content: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      published: false,
    })
    setModal({ isOpen: true, article: null, mode: 'add' })
  }

  const openEditModal = (article: NewsArticle) => {
    setFormData(article)
    setModal({ isOpen: true, article, mode: 'edit' })
  }

  const closeModal = () => {
    setModal({ isOpen: false, article: null, mode: 'add' })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (modal.mode === 'add') {
        await newsService.create(formData)
      } else if (modal.article) {
        await newsService.update(modal.article.id, formData)
      }
      await loadNews()
      closeModal()
    } catch (err) {
      console.error('Failed to save news:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      try {
        await newsService.delete(id)
        await loadNews()
      } catch (err) {
        console.error('Failed to delete article:', err)
      }
    }
  }

  const togglePublish = async (article: NewsArticle) => {
    try {
      await newsService.update(article.id, { published: !article.published })
      await loadNews()
    } catch (err) {
      console.error('Failed to toggle publish status:', err)
    }
  }

  return (
    <AdminLayout title={t.admin.news} breadcrumbs={[{ label: t.admin.dashboard, href: '/admin' }, { label: t.admin.news }]}>
      <div className="admin-page">
        {/* Header */}
        <div className="admin-page-actions">
          <div className="admin-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder={t.admin.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={openAddModal} className="admin-button admin-button-primary">
            <Plus size={18} />
            <span>{t.admin.createNews}</span>
          </button>
        </div>

        {/* News Table */}
        {loading ? (
          <div className="admin-loading">{t.admin.loading}...</div>
        ) : filteredNews.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.admin.title}</th>
                  <th>{t.admin.category}</th>
                  <th>{t.admin.date}</th>
                  <th>{t.admin.status}</th>
                  <th>{t.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <div className="admin-table-cell-title">
                        <img src={article.image} alt={article.title} />
                        <div>
                          <strong>{article.title}</strong>
                          <small>{article.content.substring(0, 60)}...</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-category">{article.category}</span>
                    </td>
                    <td>{new Date(article.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`admin-badge ${article.published ? 'admin-badge-success' : 'admin-badge-secondary'}`}>
                        {article.published ? t.admin.published : t.admin.draft}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => togglePublish(article)}
                          className="admin-icon-button"
                          title={article.published ? t.admin.unpublish : t.admin.publish}
                        >
                          {article.published ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => openEditModal(article)}
                          className="admin-icon-button admin-icon-edit"
                          title={t.admin.edit}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="admin-icon-button admin-icon-delete"
                          title={t.admin.delete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-state">
            <p>{t.admin.noNews}</p>
          </div>
        )}

        {/* News Modal */}
        {modal.isOpen && (
          <div className="admin-modal-overlay" onClick={closeModal}>
            <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{modal.mode === 'add' ? t.admin.createNews : t.admin.editNews}</h2>
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

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>{t.admin.category}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option value="">{t.admin.category}</option>
                      <option value="Yutuqlar">{t.admin.achievements}</option>
                      <option value="Tadbir">{t.admin.events}</option>
                      <option value="Sport">{t.admin.sports}</option>
                      <option value="O'quv">{t.admin.education}</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>{t.admin.date}</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.content}</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.photoUrl}</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="admin-form-group admin-form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>{t.admin.publish} {t.admin.news.toLowerCase()}</span>
                  </label>
                </div>

                <div className="admin-modal-actions">
                  <button type="button" onClick={closeModal} className="admin-button admin-button-secondary">
                    {t.admin.cancel}
                  </button>
                  <button type="submit" className="admin-button admin-button-primary">
                    {modal.mode === 'add' ? t.admin.createNews : t.admin.save}
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
