import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon'

export default function Modal({ onClose, label, narrow = false, children }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cardRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={cardRef}
        className={`modal__card${narrow ? ' modal__card--narrow' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
