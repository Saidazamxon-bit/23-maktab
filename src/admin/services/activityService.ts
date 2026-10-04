export interface ActivityLog {
  id: string
  action: string
  entity: string
  entityId: string
  description: string
  user: string
  timestamp: string
  status: 'success' | 'error'
}

class ActivityService {
  private logs: ActivityLog[] = [
    {
      id: '1',
      action: 'create',
      entity: 'news',
      entityId: '1',
      description: 'Created news article "Olimpiada natijasi"',
      user: 'admin@school.com',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'success',
    },
    {
      id: '2',
      action: 'update',
      entity: 'teacher',
      entityId: '2',
      description: 'Updated teacher profile "Dilnoza Karimova"',
      user: 'admin@school.com',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'success',
    },
    {
      id: '3',
      action: 'delete',
      entity: 'gallery',
      entityId: '5',
      description: 'Deleted gallery image',
      user: 'admin@school.com',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      status: 'success',
    },
  ]

  async getRecent(limit = 20): Promise<ActivityLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.logs.slice(0, limit).sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ))
      }, 100)
    })
  }

  async log(log: Omit<ActivityLog, 'id'>): Promise<ActivityLog> {
    const newLog: ActivityLog = {
      ...log,
      id: `log_${Date.now()}`,
    }
    this.logs.unshift(newLog)
    return new Promise((resolve) => setTimeout(() => resolve(newLog), 100))
  }

  async getByEntity(entity: string): Promise<ActivityLog[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.logs.filter((l) => l.entity === entity))
      }, 100)
    })
  }
}

export const activityService = new ActivityService()
