import React from 'react'
import { LogOut, Menu, X } from 'lucide-react'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useState } from 'react'

interface AdminHeaderProps {
  onMenuToggle: () => void
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAdminAuth()
  const { t } = useLanguage()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = '/admin/login'
  }

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <button onClick={onMenuToggle} className="admin-menu-toggle">
          <Menu size={24} />
        </button>

        <div className="admin-header-title">
          <h1>{t.brand.name}</h1>
        </div>

        <div className="admin-header-actions">
          <div className="admin-user-menu">
            <button
              className="admin-user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="admin-user-avatar">{user?.name.charAt(0).toUpperCase()}</div>
              <span className="admin-user-name">{user?.name}</span>
            </button>

            {showUserMenu && (
              <div className="admin-user-dropdown">
                <div className="admin-user-email">{user?.email}</div>
                <button onClick={handleLogout} className="admin-logout-button">
                  <LogOut size={18} />
                  <span>{t.admin.logout}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
