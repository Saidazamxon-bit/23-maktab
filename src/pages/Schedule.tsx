import { useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { useLanguage } from '../i18n'
import { classLevels, scheduleByClass, type ClassLevel } from '../data/schedule'

export function SchedulePage() {
  const { t, language } = useLanguage()
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('5-sinf')

  const selectedSchedule = useMemo(() => scheduleByClass[selectedClass], [selectedClass])

  // Translation maps for day names and subjects
  const dayTranslations: Record<string, Record<string, string>> = {
    uz: {
      'Dushanba': 'Dushanba',
      'Seshanba': 'Seshanba',
      'Chorshanba': 'Chorshanba',
      'Payshanba': 'Payshanba',
      'Juma': 'Juma',
    },
    ru: {
      'Dushanba': 'Понедельник',
      'Seshanba': 'Вторник',
      'Chorshanba': 'Среда',
      'Payshanba': 'Четверг',
      'Juma': 'Пятница',
    },
    en: {
      'Dushanba': 'Monday',
      'Seshanba': 'Tuesday',
      'Chorshanba': 'Wednesday',
      'Payshanba': 'Thursday',
      'Juma': 'Friday',
    },
  }

  const subjectTranslations: Record<string, Record<string, string>> = {
    uz: {
      'Matematika': 'Matematika',
      'Ona tili': 'Ona tili',
      'Informatika': 'Informatika',
      'Tarix': 'Tarix',
      'Ingliz tili': 'Ingliz tili',
      'Fizika': 'Fizika',
      'Kimyo': 'Kimyo',
    },
    ru: {
      'Matematika': 'Математика',
      'Ona tili': 'Язык',
      'Informatika': 'Информатика',
      'Tarix': 'История',
      'Ingliz tili': 'Английский язык',
      'Fizika': 'Физика',
      'Kimyo': 'Химия',
    },
    en: {
      'Matematika': 'Mathematics',
      'Ona tili': 'Native Language',
      'Informatika': 'Computer Science',
      'Tarix': 'History',
      'Ingliz tili': 'English Language',
      'Fizika': 'Physics',
      'Kimyo': 'Chemistry',
    },
  }

  const translateDay = (dayName: string) => dayTranslations[language]?.[dayName] || dayName
  const translateSubject = (subjectName: string) => subjectTranslations[language]?.[subjectName] || subjectName

  return (
    <>
      <PageHero
        eyebrow={t.schedulePage.eyebrow}
        title={t.schedulePage.title}
        subtitle={t.schedulePage.subtitle}
      />

      <main className="page-main">
        <section className="section compact-section">
          <div className="container">
            <div className="toolbar glass-panel schedule-toolbar">
              <span className="demo-badge">{t.schedulePage.sampleBadge}</span>
              <label className="class-select-wrap">
                <span>{t.schedulePage.chooseClassLabel}</span>
                <select value={selectedClass} onChange={(event) => setSelectedClass(event.target.value as ClassLevel)}>
                  {classLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="schedule-grid">
              {selectedSchedule.map((daySchedule) => (
                <div className="glass-card schedule-card" key={daySchedule.day}>
                  <h3>{translateDay(daySchedule.day)}</h3>
                  <div className="schedule-table">
                    <div className="schedule-head">
                      <span>{t.schedulePage.time}</span>
                      <span>{t.schedulePage.subject}</span>
                      <span>{t.schedulePage.teacher}</span>
                      <span>{t.schedulePage.room}</span>
                    </div>
                    {daySchedule.lessons.map((lesson) => (
                      <div className="schedule-row" key={`${daySchedule.day}-${lesson.time}`}>
                        <span>{lesson.time}</span>
                        <span>{translateSubject(lesson.subject)}</span>
                        <span>{lesson.teacher}</span>
                        <span>{lesson.room}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
