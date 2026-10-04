import { scheduleByClass, classLevels } from '../../data/schedule'

export interface Lesson {
  id: string
  classLevel: string
  day: string
  time: string
  subject: string
  teacher: string
  room: string
}

export interface ClassSchedule {
  classLevel: string
  lessons: Lesson[]
}

class ScheduleService {
  private schedules: Map<string, Lesson[]> = new Map()

  constructor() {
    // Initialize from existing schedule data
    Object.entries(scheduleByClass).forEach(([classLevel, daySchedules]) => {
      const lessons: Lesson[] = []
      daySchedules.forEach((daySchedule) => {
        daySchedule.lessons.forEach((lesson, idx) => {
          lessons.push({
            id: `lesson_${classLevel}_${daySchedule.day}_${idx}`,
            classLevel,
            day: daySchedule.day,
            time: lesson.time,
            subject: lesson.subject,
            teacher: lesson.teacher,
            room: lesson.room,
          })
        })
      })
      this.schedules.set(classLevel, lessons)
    })
  }

  async getClassLevels(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(classLevels), 100)
    })
  }

  async getScheduleByClass(classLevel: string): Promise<Lesson[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.schedules.get(classLevel) || [])
      }, 100)
    })
  }

  async addLesson(classLevel: string, lesson: Omit<Lesson, 'id'>): Promise<Lesson> {
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson_${Date.now()}`,
    }

    const lessons = this.schedules.get(classLevel) || []
    lessons.push(newLesson)
    this.schedules.set(classLevel, lessons)

    return new Promise((resolve) => setTimeout(() => resolve(newLesson), 100))
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson | null> {
    for (const lessons of this.schedules.values()) {
      const index = lessons.findIndex((l) => l.id === id)
      if (index !== -1) {
        const updated = { ...lessons[index], ...updates }
        lessons[index] = updated
        return new Promise((resolve) => setTimeout(() => resolve(updated), 100))
      }
    }
    return null
  }

  async deleteLesson(id: string): Promise<boolean> {
    for (const lessons of this.schedules.values()) {
      const index = lessons.findIndex((l) => l.id === id)
      if (index !== -1) {
        lessons.splice(index, 1)
        return new Promise((resolve) => setTimeout(() => resolve(true), 100))
      }
    }
    return false
  }

  async getLessonsByDay(classLevel: string, day: string): Promise<Lesson[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = this.schedules.get(classLevel) || []
        resolve(all.filter((l) => l.day === day))
      }, 100)
    })
  }
}

export const scheduleService = new ScheduleService()
