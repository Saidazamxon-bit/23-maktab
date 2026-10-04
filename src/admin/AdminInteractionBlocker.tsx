import { useEffect } from 'react'
import { useAdmin } from './AdminContext'
import { useLocation } from 'react-router-dom'

export default function AdminInteractionBlocker() {
  const { isAdmin } = useAdmin()
  const location = useLocation()

  useEffect(() => {
    const blockActive = isAdmin || location.pathname === '/admin'
    if (!blockActive) return

    const isAllowed = (el: Element | null) => {
      if (!el) return false
      // allow clicks inside admin toolbar, modals, or editable wrappers
      if (el.closest('.admin-toolbar')) return true
      if (el.closest('.admin-modal-dialog')) return true
      if (el.closest('.editable-text-wrapper')) return true
      if (el.closest('.editable-image-wrapper')) return true
      if (el.closest('[data-admin-allow]')) return true
      // allow inputs, selects, textareas
      if (el.closest('input,textarea,select')) return true
      return false
    }

    const blockEvent = (e: Event) => {
      const target = e.target as Element | null
      if (!target) return
      if (isAllowed(target)) return

      try {
        // Prevent default browser behavior
        e.preventDefault()
      } catch {}
      try {
        e.stopPropagation()
      } catch {}
      try {
        // stopImmediatePropagation to prevent React synthetic handlers
        ;(e as any).stopImmediatePropagation && (e as any).stopImmediatePropagation()
      } catch {}
    }

    const onKeyDown = (e: KeyboardEvent) => {
      // prevent keyboard activation (Enter/Space) from triggering native actions
      const target = e.target as Element | null
      if (!target) return
      if (isAllowed(target)) return
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        try {
          e.preventDefault()
        } catch {}
        try {
          e.stopPropagation()
        } catch {}
        try {
          ;(e as any).stopImmediatePropagation && (e as any).stopImmediatePropagation()
        } catch {}
      }
    }

    // capture phase to intercept before React handlers
    document.addEventListener('pointerdown', blockEvent, true)
    document.addEventListener('click', blockEvent, true)
    document.addEventListener('submit', blockEvent, true)
    document.addEventListener('keydown', onKeyDown, true)

    return () => {
      document.removeEventListener('pointerdown', blockEvent, true)
      document.removeEventListener('click', blockEvent, true)
      document.removeEventListener('submit', blockEvent, true)
      document.removeEventListener('keydown', onKeyDown, true)
    }
  }, [isAdmin, location])

  return null
}
