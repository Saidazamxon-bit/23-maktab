import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AdminUser, LoginCredentials, AuthState } from './types'

interface AdminAuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const ADMIN_STORAGE_KEY = 'admin_user'
const ADMIN_TOKEN_KEY = 'admin_token'

// Mock admin users - in production, this would be validated against a backend
const MOCK_ADMINS: Record<string, { password: string; user: AdminUser }> = {
  'admin@school.com': {
    password: 'admin123', // In production, this would never be in frontend
    user: {
      id: '1',
      email: 'admin@school.com',
      name: 'Administrator',
      role: 'super_admin',
      createdAt: new Date().toISOString(),
    },
  },
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (stored) {
      try {
        return {
          user: JSON.parse(stored),
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }
      } catch {
        localStorage.removeItem(ADMIN_STORAGE_KEY)
        localStorage.removeItem(ADMIN_TOKEN_KEY)
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }
  })

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate against mock admins (replace with backend API in production)
    const adminEntry = MOCK_ADMINS[credentials.email]
    if (!adminEntry || adminEntry.password !== credentials.password) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Invalid email or password',
      }))
      throw new Error('Invalid credentials')
    }

    const user = adminEntry.user
    const token = `token_${user.id}_${Date.now()}` // Mock token

    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(ADMIN_TOKEN_KEY, token)

    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  return (
    <AdminAuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
