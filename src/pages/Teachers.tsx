import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { useLanguage } from '../i18n'
import { teachers as fallbackTeachers } from '../data/teachers'
import './teachers.css'

interface TeacherItem {
  id: string
  name: string
  subject: string
  role: string
  experience: string
  bio: string
  image: string
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function TeachersPage() {
  const { t } = useLanguage()

  const [teachers, setTeachers] = useState<TeacherItem[]>(fallbackTeachers)
  const [activeFilter, setActiveFilter] = useState('')
  const [query, setQuery] = useState('')

  // Admin paneldan qo'shilgan o'qituvchilar (bazadan)
  useEffect(() => {
    let cancelled = false
    fetch('/backend/public.php?r=teachers')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled || !Array.isArray(data?.teachers)) return
        setTeachers(
          data.teachers.map((x: any) => ({
            id: String(x.id),
            name: String(x.name ?? ''),
            subject: String(x.subject ?? ''),
            role: String(x.position ?? ''),
            experience: String(x.experience ?? ''),
            bio: String(x.bio ?? ''),
            image: String(x.photo ?? ''),
          })),
        )
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const subjects = useMemo(
    () => Array.from(new Set(teachers.map((x) => x.subject).filter(Boolean))),
    [teachers],
  )

  const filteredTeachers = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return teachers.filter((teacher) => {
      const matchesFilter = !activeFilter || teacher.subject === activeFilter
      const matchesSearch =
        !needle || `${teacher.name} ${teacher.subject} ${teacher.role}`.toLowerCase().includes(needle)
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, query, teachers])

  return (
    <>
      <PageHero
        eyebrow={t.teachersPage.eyebrow}
        title={t.teachersPage.title}
        subtitle={t.teachersPage.subtitle}
      />

      <main className="page-main">
        <section className="section compact-section">
          <div className="container">
            <div className="toolbar glass-panel">
              <div className="filter-row">
                <button
                  type="button"
                  className={`filter-chip ${activeFilter === '' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('')}
                >
                  {t.teachers.filterAll}
                </button>
                {subjects.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <label className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.teachersPage.placeholder}
                />
              </label>
            </div>

            <div className="teachers-grid teachers-page-grid">
              {filteredTeachers.map((teacher) => (
                <article className="teacher-card glass-card" key={teacher.id}>
                  <div className="teacher-image-wrap">
                    {teacher.image ? (
                      <img src={teacher.image} alt={teacher.name} loading="lazy" />
                    ) : (
                      <div className="teacher-initials">{getInitials(teacher.name)}</div>
                    )}
                    {teacher.subject && <span className="teacher-badge">{teacher.subject}</span>}
                  </div>
                  <div className="teacher-body">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    {teacher.role && <span className="teacher-role">{teacher.role}</span>}
                    {teacher.bio && <p>{teacher.bio}</p>}
                    {teacher.experience && (
                      <div className="teacher-meta">
                        <span><SlidersHorizontal size={14} /> {teacher.experience}</span>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="empty-state glass-panel">
                {t.teachersPage.emptyState}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
