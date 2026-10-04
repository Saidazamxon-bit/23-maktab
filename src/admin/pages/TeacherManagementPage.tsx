import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { useLanguage } from '../../i18n/LanguageContext'
import { teacherService, type Teacher } from '../services/teacherService'
import { Search, Plus, Edit, Trash2, ChevronRight } from 'lucide-react'

interface TeacherModalState {
  isOpen: boolean
  teacher: Teacher | null
  mode: 'add' | 'edit'
}

export const TeacherManagementPage: React.FC = () => {
  const { t } = useLanguage()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [modal, setModal] = useState<TeacherModalState>({ isOpen: false, teacher: null, mode: 'add' })
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
    name: '',
    subject: '',
    role: '',
    experience: '',
    bio: '',
    image: '',
  })

  useEffect(() => {
    loadTeachers()
  }, [])

  useEffect(() => {
    const filtered = teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredTeachers(filtered)
  }, [searchQuery, teachers])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const data = await teacherService.getAll()
      setTeachers(data)
    } catch (err) {
      console.error('Failed to load teachers:', err)
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setFormData({ name: '', subject: '', role: '', experience: '', bio: '', image: '' })
    setModal({ isOpen: true, teacher: null, mode: 'add' })
  }

  const openEditModal = (teacher: Teacher) => {
    setFormData(teacher)
    setModal({ isOpen: true, teacher, mode: 'edit' })
  }

  const closeModal = () => {
    setModal({ isOpen: false, teacher: null, mode: 'add' })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (modal.mode === 'add') {
        await teacherService.create(formData)
      } else if (modal.teacher) {
        await teacherService.update(modal.teacher.id, formData)
      }
      await loadTeachers()
      closeModal()
    } catch (err) {
      console.error('Failed to save teacher:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm(t.admin.confirmDelete)) {
      try {
        await teacherService.delete(id)
        await loadTeachers()
      } catch (err) {
        console.error('Failed to delete teacher:', err)
      }
    }
  }

  return (
    <AdminLayout title={t.admin.teachers} breadcrumbs={[{ label: t.admin.dashboard, href: '/admin' }, { label: t.admin.teachers }]}>
      <div className="admin-page">
        {/* Header with search and add button */}
        <div className="admin-page-actions">
          <div className="admin-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder={t.admin.searchTeachers}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={openAddModal} className="admin-button admin-button-primary">
            <Plus size={18} />
            <span>{t.admin.addTeacher}</span>
          </button>
        </div>

        {/* Teachers Table */}
        {loading ? (
          <div className="admin-loading">{t.admin.loading}...</div>
        ) : filteredTeachers.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t.admin.name}</th>
                  <th>{t.admin.subject}</th>
                  <th>{t.admin.position}</th>
                  <th>{t.admin.experience}</th>
                  <th>{t.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>
                      <div className="admin-table-cell-teacher">
                        <img src={teacher.image} alt={teacher.name} />
                        <span>{teacher.name}</span>
                      </div>
                    </td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.role}</td>
                    <td>{teacher.experience}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="admin-icon-button admin-icon-edit"
                          title={t.admin.edit}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
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
            <p>{t.admin.noTeachers}</p>
          </div>
        )}

        {/* Teacher Modal */}
        {modal.isOpen && (
          <div className="admin-modal-overlay" onClick={closeModal}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{modal.mode === 'add' ? t.admin.addTeacher : t.admin.editTeacher}</h2>
                <button onClick={closeModal} className="admin-modal-close">
                  ×
                </button>
              </div>

              <form onSubmit={handleSave} className="admin-form">
                <div className="admin-form-group">
                  <label>{t.admin.name}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>{t.admin.subject}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>{t.admin.position}</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.experience}</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>{t.admin.bio}</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
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

                <div className="admin-modal-actions">
                  <button type="button" onClick={closeModal} className="admin-button admin-button-secondary">
                    {t.admin.cancel}
                  </button>
                  <button type="submit" className="admin-button admin-button-primary">
                    {modal.mode === 'add' ? t.admin.addTeacher : t.admin.save}
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
