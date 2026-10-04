import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import SmoothScroll from './components/smooth-scroll/SmoothScroll'
import { LanguageProvider } from './i18n'
import { AdminAuthProvider } from './admin/auth/AdminAuthContext'
import { AdminProvider } from './admin/AdminContext'
import './styles.css'
import './admin/admin.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <LanguageProvider>
          <AdminProvider>
            <SmoothScroll />
            <App />
          </AdminProvider>
        </LanguageProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
                                