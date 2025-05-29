import { ReactNode, useEffect, useCallback } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  width,
  height,
  maxWidth = '90vw',
  maxHeight = '90vh',
}: ModalProps) {
  // Gérer la fermeture avec Escape
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);

  useEffect(() => {
    if (isOpen && closeOnEscape) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown, closeOnEscape]);

  // Gérer la fermeture en cliquant sur le backdrop
  const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  }, [onClose, closeOnBackdropClick]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', // Support Safari
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem',
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)',
          borderRadius: '12px',
          border: '2px solid rgba(79, 195, 247, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          color: 'white',
          width,
          height,
          maxWidth,
          maxHeight,
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête avec titre et bouton fermer */}
        {(title || showCloseButton) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem 2rem 1rem',
              borderBottom: title ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            }}
          >
            {title && (
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #4fc3f7, #81c784)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease',
                  marginLeft: title ? '1rem' : '0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Fermer"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Contenu de la modale */}
        <div
          style={{
            padding: title || showCloseButton ? '1rem 2rem 2rem' : '2rem',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
