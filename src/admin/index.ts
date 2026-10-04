// Admin Auth
export { AdminAuthProvider, useAdminAuth } from './auth/AdminAuthContext'
export type { AdminUser, AuthState, LoginCredentials } from './auth/types'

// Admin Services
export { teacherService } from './services/teacherService'
export { newsService } from './services/newsService'
export { galleryService } from './services/galleryService'
export { scheduleService } from './services/scheduleService'
export { activityService } from './services/activityService'

export type { Teacher } from './services/teacherService'
export type { NewsArticle } from './services/newsService'
export type { GalleryImage } from './services/galleryService'
export type { Lesson } from './services/scheduleService'
export type { ActivityLog } from './services/activityService'

// Admin Routes & Components
export { AdminRoute } from './routes/AdminRoute'
export { AdminLayout } from './layout/AdminLayout'
export { AdminHeader } from './layout/AdminHeader'
export { AdminSidebar } from './layout/AdminSidebar'

// Admin Pages
export { AdminLoginPage } from './pages/AdminLoginPage'
export { AdminDashboardPage } from './pages/AdminDashboardPage'
export { TeacherManagementPage } from './pages/TeacherManagementPage'
export { NewsManagementPage } from './pages/NewsManagementPage'
export { GalleryManagementPage } from './pages/GalleryManagementPage'
export { ScheduleManagementPage } from './pages/ScheduleManagementPage'
export { ActivityLogPage } from './pages/ActivityLogPage'
export { SettingsPage } from './pages/SettingsPage'
