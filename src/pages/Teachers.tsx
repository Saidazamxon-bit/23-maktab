import { Search, SlidersHorizontal, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { useLanguage } from '../i18n'
import { teachers } from '../data/teachers'

export function TeachersPage() {
  const { t } = useLanguage()
  
  const filterOptions = [
    t.teachers.filterAll,
    t.teachers.filters.math,
    t.teachers.filters.cs,
    t.teachers.filters.english,
    t.teachers.filters.physics,
  ]
  
  const [activeFilter, setActiveFilter] = useState(t.teachers.filterAll)
  const [query, setQuery] = useState('')

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesFilter = activeFilter === t.teachers.filterAll || 
                           (t.teachers.list.find(tItem => tItem.id === teacher.id)?.subject === activeFilter)
      const needle = query.trim().toLowerCase()
      const matchesSearch = !needle || `${teacher.name} ${teacher.subject} ${teacher.role}`.toLowerCase().includes(needle)
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, query, t.teachers])

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
                {filterOptions.map((filter) => (
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

            <div className="teachers-grid">
              {filteredTeachers.map((teacher) => (
                <article className="teacher-card glass-card" key={teacher.id}>
                  <div className="teacher-image-wrap">
                    <img src={teacher.image} alt={teacher.name} />
                    <span className="teacher-badge">{teacher.subject}</span>
                  </div>
                  <div className="teacher-body">
                    <div className="teacher-header">
                      <div>
                        <h3>{teacher.name}</h3>
                        <span>{teacher.role}</span>
                      </div>
                      <div className="teacher-rating"><Star size={14} /> 4.9</div>
                    </div>
                    <p>{teacher.bio}</p>
                    <div className="teacher-meta">
                      <span><SlidersHorizontal size={14} /> {teacher.experience}</span>
                    </div>
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
