import React, { useState } from 'react'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'

interface AdminLayoutProps {
  title: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  children: React.ReactNode
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, breadcrumbs, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="admin-content">
          <div className="admin-page-header">
            <h1>{title}</h1>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="admin-breadcrumbs">
                {breadcrumbs.map((bc, idx) => (
                  <span key={idx}>
                    {bc.href ? <a href={bc.href}>{bc.label}</a> : <span>{bc.label}</span>}
                    {idx < breadcrumbs.length - 1 && <span className="separator">/</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="admin-page-content">{children}</div>
        </main>
      </div>
    </div>
  )
}
