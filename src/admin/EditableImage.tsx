import React, { useState, useRef } from 'react'
import { Image as ImageIcon, X, Check } from 'lucide-react'
import { useAdmin } from './AdminContext'
import './EditableImage.css'

interface EditableImageProps {
  contentKey: string
  src?: string
  alt: string
  className?: string
  onImageChange?: (imageSrc: string) => void
}

export function EditableImage({
  contentKey,
  src,
  alt,
  className,
  onImageChange,
}: EditableImageProps) {
  const { isAdmin, content, updateContent, currentLanguage } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const displaySrc = (content[currentLanguage]?.[contentKey] as string) || src || ''

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          setPreviewSrc(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (previewSrc) {
      updateContent(currentLanguage, contentKey, previewSrc)
      onImageChange?.(previewSrc)
      setIsEditing(false)
      setPreviewSrc(null)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setPreviewSrc(null)
  }

  if (!isAdmin) {
    return <img src={displaySrc} alt={alt} className={className} />
  }

  return (
    <div
      ref={containerRef}
      className={`editable-image-wrapper ${isEditing ? 'editing' : ''}`}
      data-admin-editable="true"
    >
      {!isEditing ? (
        <div className="editable-image-display">
          <img src={displaySrc} alt={alt} className={className} />
          <button
            className="editable-image-trigger"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsEditing(true)
            }}
            data-admin-allow
          >
            <ImageIcon size={16} />
            <span>Rasmni o'zgartirish</span>
          </button>
        </div>
      ) : (
        <div className="editable-image-editor">
          <div className="image-preview">
            {previewSrc ? (
              <img src={previewSrc} alt="Preview" />
            ) : (
              <>
                <img src={displaySrc} alt={alt} className={className} />
                <div className="image-upload-overlay">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="upload-btn"
                  >
                    <ImageIcon size={24} />
                    <span>Yangi rasm tanlang</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </div>
              </>
            )}
          </div>

          {previewSrc && (
            <div className="image-actions">
              <button className="btn-save" onClick={handleSave} title="Saqlash">
                <Check size={16} />
              </button>
              <button className="btn-cancel" onClick={handleCancel} title="Bekor qilish">
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
