import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { useLanguage } from '../../i18n/LanguageContext'
import { teacherService, type Teacher } from '../services/teacherService'
import { newsService } from '../services/newsService'
import { galleryService } from '../services/galleryService'
import { scheduleService } from '../services/scheduleService'
import { Users, Newspaper, Image, Calendar } from 'lucide-react'

interface StatCard {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
}

export const AdminDashboardPage: React.FC = () => {
  const { t } = useLanguage()
  const [stats, setStats] = useState<StatCard[]>([])
  const [recentNews, setRecentNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [teachers, news, gallery, classLevels] = await Promise.all([
          teacherService.getAll(),
          newsService.getAll(true),
          galleryService.getAll(),
          scheduleService.getClassLevels(),
        ])

        setStats([
          {
            label: t.admin.totalTeachers,
            value: teachers.length,
            icon: <Users size={24} />,
            color: 'blue',
          },
          {
            label: t.admin.publishedNews,
            value: news.length,
            icon: <Newspaper size={24} />,
            color: 'purple',
          },
          {
            label: t.admin.galleryImages,
            value: gallery.length,
            icon: <Image size={24} />,
            color: 'green',
          },
          {
            label: t.admin.classes,
            value: classLevels.length,
            icon: <Calendar size={24} />,
            color: 'orange',
          },
        ])

        setRecentNews(news.slice(0, 5))
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <AdminLayout title={t.admin.dashboard}>
      <div className="admin-dashboard">
        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className={`admin-stat-card admin-stat-${stat.color}`}>
              <div className="admin-stat-icon">{stat.icon}</div>
              <div className="admin-stat-content">
                <div className="admin-stat-value">{stat.value}</div>
                <div className="admin-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent News Section */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h2>{t.admin.recentNews}</h2>
            <a href="/admin/news" className="admin-link">
              {t.admin.viewAll}
            </a>
          </div>

          {loading ? (
            <div className="admin-loading">{t.admin.loading}</div>
          ) : recentNews.length > 0 ? (
            <div className="admin-news-list">
              {recentNews.map((news) => (
                <div key={news.id} className="admin-news-item">
                  <div className="admin-news-image">
                    <img src={news.image} alt={news.title} />
                  </div>
                  <div className="admin-news-content">
                    <div className="admin-news-category">{news.category}</div>
                    <h3>{news.title}</h3>
                    <p className="admin-news-date">
                      {new Date(news.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="admin-empty-state">
              <Newspaper size={48} />
              <p>{t.admin.noNews}</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="admin-section">
          <h2>{t.admin.quickActions}</h2>
          <div className="admin-quick-actions">
            <a href="/admin/teachers" className="admin-action-button">
              <Users size={20} />
              <span>{t.admin.teachers}</span>
            </a>
            <a href="/admin/news" className="admin-action-button">
              <Newspaper size={20} />
              <span>{t.admin.createNews}</span>
            </a>
            <a href="/admin/schedule" className="admin-action-button">
              <Calendar size={20} />
              <span>{t.admin.schedule}</span>
            </a>
            <a href="/admin/gallery" className="admin-action-button">
              <Image size={20} />
              <span>{t.admin.gallery}</span>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
