import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from './AdminContext'
import './AdminLogin.css'

export function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setIsAdmin } = useAdmin()

  const ADMIN_PASSWORD = '010203'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate slight delay for UX
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setIsAdmin(true)
        navigate('/')
      } else {
        setError('Noto\'g\'ri parol')
        setPassword('')
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1>Admin Paneli</h1>
          <p>Saytni tahrirlash uchun parolni kiriting</p>

          <form onSubmit={handleSubmit} className="admin-login-form" data-admin-allow>
            <div className="form-group">
              <label htmlFor="password">Parol:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Parolni kiriting..."
                disabled={loading}
                autoFocus
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading || !password.trim()}>
              {loading ? 'Tekshirilmoqda...' : 'Kirish'}
            </button>
          </form>

          <div className="admin-login-hint">
            <small>23-Maktab Admin</small>
          </div>
        </div>
      </div>
    </div>
  )
}
