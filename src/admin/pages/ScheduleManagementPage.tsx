import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { scheduleService, type Lesson } from '../services/scheduleService'
import { Plus, Trash2, Edit } from 'lucide-react'

interface ScheduleModalState {
  isOpen: boolean
  lesson: Lesson | null
  mode: 'add' | 'edit'
  classLevel: string
}

export const ScheduleManagementPage: React.FC = () => {
  const [classLevels, setClassLevels] = useState<string[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ScheduleModalState>({
    isOpen: false,
    lesson: null,
    mode: 'add',
    classLevel: '',
  })
  const [formData, setFormData] = useState<Omit<Lesson, 'id'>>({
    classLevel: '',
    day: '',
    time: '',
    subject: '',
    teacher: '',
    room: '',
  })

  const daysOfWeek = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']

  useEffect(() => {
    loadClassLevels()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      loadSchedule(selectedClass)
    }
  }, [selectedClass])

  const loadClassLevels = async () => {
    try {
      setLoading(true)
      const levels = await scheduleService.getClassLevels()
      setClassLevels(levels)
      if (levels.length > 0) {
        setSelectedClass(levels[0])
      }
    } catch (err) {
      console.error('Failed to load class levels:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadSchedule = async (classLevel: string) => {
    try {
      const data = await scheduleService.getScheduleByClass(classLevel)
      setLessons(data)
    } catch (err) {
      console.error('Failed to load schedule:', err)
    }
  }

  const openAddModal = () => {
    setFormData({
      classLevel: selectedClass,
      day: selectedDay || 'Dushanba',
      time: '08:00',
      subject: '',
      teacher: '',
      room: '',
    })
    setModal({
      isOpen: true,
      lesson: null,
      mode: 'add',
      classLevel: selectedClass,
    })
  }

  const openEditModal = (lesson: Lesson) => {
    setFormData(lesson)
    setModal({ isOpen: true, lesson, mode: 'edit', classLevel: lesson.classLevel })
  }

  const closeModal = () => {
    setModal({ isOpen: false, lesson: null, mode: 'add', classLevel: '' })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (modal.mode === 'add') {
        await scheduleService.addLesson(selectedClass, formData)
      } else if (modal.lesson) {
        await scheduleService.updateLesson(modal.lesson.id, formData)
      }
      await loadSchedule(selectedClass)
      closeModal()
    } catch (err) {
      console.error('Failed to save lesson:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await scheduleService.deleteLesson(id)
        await loadSchedule(selectedClass)
      } catch (err) {
        console.error('Failed to delete lesson:', err)
      }
    }
  }

  const filteredLessons = selectedDay
    ? lessons.filter((l) => l.day === selectedDay)
    : lessons

  return (
    <AdminLayout title="Schedule" breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Schedule' }]}>
      <div className="admin-page">
        {/* Class and Day Selection */}
        <div className="admin-schedule-controls">
          <div className="admin-form-group">
            <label>Select Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {classLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label>Filter by Day (optional)</label>
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
              <option value="">All Days</option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <button onClick={openAddModal} className="admin-button admin-button-primary">
            <Plus size={18} />
            <span>Add Lesson</span>
          </button>
        </div>

        {/* Schedule Table */}
        {loading ? (
          <div className="admin-loading">Loading schedule...</div>
        ) : filteredLessons.length > 0 ? (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Teacher</th>
                  <th>Room</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((lesson) => (
                  <tr key={lesson.id}>
                    <td>{lesson.day}</td>
                    <td>{lesson.time}</td>
                    <td>{lesson.subject}</td>
                    <td>{lesson.teacher}</td>
                    <td>{lesson.room}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          onClick={() => openEditModal(lesson)}
                          className="admin-icon-button admin-icon-edit"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lesson.id)}
                          className="admin-icon-button admin-icon-delete"
                          title="Delete"
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
            <p>No lessons found for the selected filter</p>
          </div>
        )}

        {/* Lesson Modal */}
        {modal.isOpen && (
          <div className="admin-modal-overlay" onClick={closeModal}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h2>{modal.mode === 'add' ? 'Add Lesson' : 'Edit Lesson'}</h2>
                <button onClick={closeModal} className="admin-modal-close">
                  ×
                </button>
              </div>

              <form onSubmit={handleSave} className="admin-form">
                <div className="admin-form-group">
                  <label>Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    required
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 08:00 — 08:45"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Teacher</label>
                  <input
                    type="text"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Room</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="e.g., A-204"
                    required
                  />
                </div>

                <div className="admin-modal-actions">
                  <button type="button" onClick={closeModal} className="admin-button admin-button-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="admin-button admin-button-primary">
                    {modal.mode === 'add' ? 'Add Lesson' : 'Save Changes'}
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
