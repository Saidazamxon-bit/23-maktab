import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { TeachersPage } from './pages/Teachers'
import { SchedulePage } from './pages/Schedule'
import { AdminRoute } from './admin/routes/AdminRoute'
import { AdminLoginPage } from './admin/pages/AdminLoginPage'
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage'
import { TeacherManagementPage } from './admin/pages/TeacherManagementPage'
import { NewsManagementPage } from './admin/pages/NewsManagementPage'
import { GalleryManagementPage } from './admin/pages/GalleryManagementPage'
import { ScheduleManagementPage } from './admin/pages/ScheduleManagementPage'
import { ActivityLogPage } from './admin/pages/ActivityLogPage'
import { SettingsPage } from './admin/pages/SettingsPage'

// Layout wrapper for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="app-shell">
    <Navbar />
    {children}
    <Footer />
  </div>
)

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/haqida" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/oqituvchilar" element={<PublicLayout><TeachersPage /></PublicLayout>} />
      <Route path="/darslar-jadvali" element={<PublicLayout><SchedulePage /></PublicLayout>} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/teachers"
        element={
          <AdminRoute>
            <TeacherManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/news"
        element={
          <AdminRoute>
            <NewsManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <AdminRoute>
            <GalleryManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/schedule"
        element={
          <AdminRoute>
            <ScheduleManagementPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/activity"
        element={
          <AdminRoute>
            <ActivityLogPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminRoute>
            <SettingsPage />
          </AdminRoute>
        }
      />
    </Routes>
  )
}

export default App
