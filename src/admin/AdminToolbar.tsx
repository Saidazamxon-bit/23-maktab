import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Undo2, Redo2, RotateCcw, Save, LogOut, AlertCircle } from 'lucide-react'
import { useAdmin } from './AdminContext'
import './AdminToolbar.css'

export function AdminToolbar() {
  const {
    isAdmin,
    historyIndex,
    history,
    undo,
    redo,
    cancel,
    save,
    hasUnsavedChanges,
    currentLanguage,
    setCurrentLanguage,
  } = useAdmin()

  const navigate = useNavigate()
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const handleExit = () => {
    if (hasUnsavedChanges) {
      setShowExitConfirm(true)
    } else {
      navigate('/')
    }
  }

  const handleExitConfirmed = () => {
    navigate('/')
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  if (!isAdmin) return null

  return (
    <>
      <div className="admin-toolbar" data-admin-allow>
        <div className="toolbar-left">
          <div className="toolbar-group">
            <h3>Admin Tahrir Rejimi</h3>
          </div>

          <div className="toolbar-group">
            <label>Til:</label>
            <select value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)}>
              <option value="uz">O'zbek</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="toolbar-right">
          {hasUnsavedChanges && (
            <div className="unsaved-indicator">
              <AlertCircle size={16} />
              <span>Saqlanmagan o'zgarishlar</span>
            </div>
          )}

          <div className="toolbar-group">
            <button
              className="toolbar-btn"
              onClick={undo}
              disabled={!canUndo}
              title="Qayta olish (Ctrl+Z)"
            >
              <Undo2 size={18} />
              <span>Qayta olish</span>
            </button>

            <button
              className="toolbar-btn"
              onClick={redo}
              disabled={!canRedo}
              title="Qayta qilish (Ctrl+Y)"
            >
              <Redo2 size={18} />
              <span>Qayta qilish</span>
            </button>

            <div className="toolbar-divider" />

            <button
              className="toolbar-btn btn-cancel"
              onClick={cancel}
              disabled={!hasUnsavedChanges}
              title="Bekor qilish"
            >
              <RotateCcw size={18} />
              <span>Bekor</span>
            </button>

            <button
              className="toolbar-btn btn-save"
              onClick={save}
              disabled={!hasUnsavedChanges}
              title="Saqlash (Ctrl+S)"
            >
              <Save size={18} />
              <span>Saqlash</span>
            </button>

            <div className="toolbar-divider" />

            <button
              className="toolbar-btn btn-exit"
              onClick={handleExit}
              title="Admin rejimidan chiqish"
            >
              <LogOut size={18} />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      </div>

      {showExitConfirm && (
        <div className="admin-modal-overlay" onClick={() => setShowExitConfirm(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Saqlanmagan o'zgarishlar</h3>
            <p>Saqlanmagan o'zgarishlar yo'qolib ketadi. Chiqishni xohlaysizmi?</p>

            <div className="modal-actions">
              <button className="btn-cancel-modal" onClick={() => setShowExitConfirm(false)}>
                Qolish
              </button>
              <button className="btn-exit-modal" onClick={handleExitConfirmed}>
                Chiqish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
