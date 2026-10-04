import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAdminAuth()
  const { t } = useLanguage()
  const [email, setEmail] = useState('admin@school.com')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      await login({ email, password })
      navigate('/admin')
    } catch (err) {
      // Error is handled by the auth context
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-logo">
              <div className="admin-logo-icon-large">23</div>
            </div>
            <h1>{t.admin.adminPanel}</h1>
            <p>{t.brand.tagline}</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="admin-alert admin-alert-error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="email">{t.admin.email}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@school.com"
                disabled={isLoading}
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">{t.admin.password}</label>
              <div className="admin-password-input">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.admin.password}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="admin-submit-button"
            >
              {isLoading ? t.admin.loggingIn : t.admin.login}
            </button>
          </form>

          <div className="admin-login-hint">
            <p className="admin-hint-title">{t.admin.demoCredentials}</p>
            <p>Email: <code>admin@school.com</code></p>
            <p>Password: <code>admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
