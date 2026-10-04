import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { activityService, type ActivityLog } from '../services/activityService'
import { CheckCircle, AlertCircle } from 'lucide-react'

export const ActivityLogPage: React.FC = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      setLoading(true)
      const data = await activityService.getRecent(50)
      setActivities(data)
    } catch (err) {
      console.error('Failed to load activities:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor(diff / 60000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const getActionLabel = (action: string, entity: string) => {
    const labels: Record<string, Record<string, string>> = {
      create: { teacher: 'Added teacher', news: 'Created article', gallery: 'Added image', lesson: 'Added lesson' },
      update: { teacher: 'Updated teacher', news: 'Updated article', gallery: 'Updated image', lesson: 'Updated lesson' },
      delete: { teacher: 'Deleted teacher', news: 'Deleted article', gallery: 'Deleted image', lesson: 'Deleted lesson' },
    }
    return labels[action]?.[entity] || `${action} ${entity}`
  }

  return (
    <AdminLayout title="Activity Log" breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Activity Log' }]}>
      <div className="admin-page">
        {loading ? (
          <div className="admin-loading">Loading activities...</div>
        ) : activities.length > 0 ? (
          <div className="admin-activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className={`admin-activity-item admin-activity-${activity.status}`}>
                <div className="admin-activity-icon">
                  {activity.status === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                </div>
                <div className="admin-activity-content">
                  <div className="admin-activity-description">
                    {getActionLabel(activity.action, activity.entity)}
                  </div>
                  <div className="admin-activity-details">
                    <span className="admin-activity-time">{formatTime(activity.timestamp)}</span>
                    <span className="admin-activity-user">by {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <p>No activity recorded yet</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
