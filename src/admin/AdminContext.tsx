import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'

export interface EditableContent {
  [key: string]: {
    [key: string]: string | object
  }
}

interface HistoryItem {
  content: EditableContent
  language: string
}

interface AdminContextType {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
  content: EditableContent
  setContent: (content: EditableContent) => void
  updateContent: (language: string, path: string, value: string) => void
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
  history: HistoryItem[]
  historyIndex: number
  undo: () => void
  redo: () => void
  save: () => void
  cancel: () => void
  hasUnsavedChanges: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const STORAGE_KEY = 'adminSiteContent'
const HISTORY_KEY = 'adminHistory'
const HISTORY_INDEX_KEY = 'adminHistoryIndex'

// Default content structure
const defaultContent: EditableContent = {
  uz: {},
  ru: {},
  en: {},
}

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('uz')
  const [content, setContent] = useState<EditableContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultContent
    } catch {
      return defaultContent
    }
  })
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      return saved ? JSON.parse(saved) : [{ content, language: 'uz' }]
    } catch {
      return [{ content, language: 'uz' }]
    }
  })
  
  const [historyIndex, setHistoryIndex] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_INDEX_KEY)
      return saved ? parseInt(saved) : 0
    } catch {
      return 0
    }
  })

  const [originalContent, setOriginalContent] = useState<EditableContent>(content)

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(content) !== JSON.stringify(originalContent)
  }, [content, originalContent])

  const updateContent = useCallback((language: string, path: string, value: string) => {
    setContent((prev) => {
      const updated = JSON.parse(JSON.stringify(prev))
      if (!updated[language]) updated[language] = {}
      
      const keys = path.split('.')
      let current = updated[language]
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value
      
      return updated
    })

    // Add to history
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push({ content, language })
      
      if (newHistory.length > 50) {
        newHistory.shift()
      }
      
      return newHistory
    })
    
    setHistoryIndex((prev) => Math.min(prev + 1, history.length))
  }, [history, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex].content)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex].content)
    }
  }, [history, historyIndex])

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
      localStorage.setItem(HISTORY_INDEX_KEY, historyIndex.toString())
      setOriginalContent(content)
    } catch (error) {
      console.error('Failed to save:', error)
    }
  }, [content, history, historyIndex])

  const cancel = useCallback(() => {
    setContent(originalContent)
    setHistory([{ content: originalContent, language: currentLanguage }])
    setHistoryIndex(0)
  }, [originalContent, currentLanguage])

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        content,
        setContent,
        updateContent,
        currentLanguage,
        setCurrentLanguage,
        history,
        historyIndex,
        undo,
        redo,
        save,
        cancel,
        hasUnsavedChanges,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
