import React, { useState, useRef, useEffect } from 'react'
import { Edit2, X, Check } from 'lucide-react'
import { useAdmin } from './AdminContext'
import './EditableText.css'

interface EditableTextProps {
  contentKey: string
  value: string | undefined
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  multiline?: boolean
}

export function EditableText({
  contentKey,
  value,
  tag = 'p',
  className,
  multiline = false,
}: EditableTextProps) {
  const { isAdmin, content, updateContent, currentLanguage } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value || '')
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const displayValue = content[currentLanguage]?.[contentKey] || value || ''

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    updateContent(currentLanguage, contentKey, editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value || '')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      if (isEditing) {
        handleCancel()
      }
    }
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  const Tag = tag as any

  if (!isAdmin) {
    return (
      <Tag className={className}>
        {displayValue}
      </Tag>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`editable-text-wrapper ${isEditing ? 'editing' : ''}`}
      data-admin-editable="true"
    >
      {!isEditing ? (
        <div
          className="editable-text-display"
          onDoubleClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsEditing(true)
          }}
        >
          <Tag className={className}>
            {displayValue}
          </Tag>
          <button
            className="editable-text-trigger"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsEditing(true)
            }}
            data-admin-allow
          >
            <Edit2 size={14} />
          </button>
        </div>
      ) : (
        <div className="editable-text-editor">
          {multiline ? (
            <textarea
              ref={inputRef as any}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="editable-text-input"
            />
          ) : (
            <input
              ref={inputRef as any}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="editable-text-input"
            />
          )}
          <div className="editable-text-actions">
            <button className="btn-save" onClick={handleSave} title="Saqlash (Enter)">
              <Check size={16} />
            </button>
            <button className="btn-cancel" onClick={handleCancel} title="Bekor qilish (Esc)">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
