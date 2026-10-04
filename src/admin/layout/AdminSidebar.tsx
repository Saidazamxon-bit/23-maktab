import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Image,
  Settings,
  Activity,
  X,
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage()
  
  const navItems: NavItem[] = [
    { to: '/admin', label: t.admin.dashboard, icon: <LayoutDashboard size={20} /> },
    { to: '/admin/teachers', label: t.admin.teachers, icon: <Users size={20} /> },
    { to: '/admin/schedule', label: t.admin.schedule, icon: <Calendar size={20} /> },
    { to: '/admin/news', label: t.admin.news, icon: <Newspaper size={20} /> },
    { to: '/admin/gallery', label: t.admin.gallery, icon: <Image size={20} /> },
    { to: '/admin/settings', label: t.admin.settings, icon: <Settings size={20} /> },
    { to: '/admin/activity', label: t.admin.activityLog, icon: <Activity size={20} /> },
  ]

  return (
    <>
      {isOpen && <div className="admin-sidebar-overlay" onClick={onClose} />}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <div className="admin-logo-icon">23</div>
            <div className="admin-logo-text">
              <strong>{t.brand.name}</strong>
              <small>{t.brand.sub}</small>
            </div>
          </div>
          <button onClick={onClose} className="admin-sidebar-close">
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span className="admin-nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
