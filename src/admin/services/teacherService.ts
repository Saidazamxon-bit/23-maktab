import { teachers as initialTeachers } from '../../data/teachers'

export interface Teacher {
  id: string
  name: string
  subject: string
  role: string
  experience: string
  bio: string
  image: string
}

class TeacherService {
  private teachers: Teacher[] = initialTeachers.map((t) => ({
    id: t.id,
    name: t.name,
    subject: t.subject,
    role: t.role,
    experience: t.experience,
    bio: t.bio,
    image: t.image,
  }))

  async getAll(): Promise<Teacher[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.teachers), 100))
  }

  async getById(id: string): Promise<Teacher | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.teachers.find((t) => t.id === id) || null)
      }, 100)
    })
  }

  async create(teacher: Omit<Teacher, 'id'>): Promise<Teacher> {
    const newTeacher: Teacher = {
      ...teacher,
      id: `teacher_${Date.now()}`,
    }
    this.teachers.push(newTeacher)
    return new Promise((resolve) => setTimeout(() => resolve(newTeacher), 100))
  }

  async update(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    const index = this.teachers.findIndex((t) => t.id === id)
    if (index === -1) return null

    const updated = { ...this.teachers[index], ...updates }
    this.teachers[index] = updated

    return new Promise((resolve) => setTimeout(() => resolve(updated), 100))
  }

  async delete(id: string): Promise<boolean> {
    const index = this.teachers.findIndex((t) => t.id === id)
    if (index === -1) return false

    this.teachers.splice(index, 1)
    return new Promise((resolve) => setTimeout(() => resolve(true), 100))
  }

  async search(query: string): Promise<Teacher[]> {
    const filtered = this.teachers.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.subject.toLowerCase().includes(query.toLowerCase())
    )
    return new Promise((resolve) => setTimeout(() => resolve(filtered), 100))
  }
}

export const teacherService = new TeacherService()
