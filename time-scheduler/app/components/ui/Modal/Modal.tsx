import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const getModalSizeStyles = (size: string = 'md') => {
  const sizeStyles = {
    sm: {
      maxWidth: '24rem',
      width: '90vw',
    },
    md: {
      maxWidth: '32rem',
      width: '90vw',
    },
    lg: {
      maxWidth: '48rem',
      width: '90vw',
    },
    xl: {
      maxWidth: '64rem',
      width: '90vw',
    },
    full: {
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
      margin: '0',
      borderRadius: '0',
    },
  };

  return sizeStyles[size as keyof typeof sizeStyles];
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  footer,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const backdropStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  };

  const modalStyles = {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    flexDirection: 'column' as const,
    maxHeight: '90vh',
    overflow: 'hidden',
    ...getModalSizeStyles(size),
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 1.5rem 0 1.5rem',
    borderBottom: title ? '1px solid #e5e7eb' : 'none',
    paddingBottom: title ? '1rem' : '0',
  };

  const titleStyles = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#111827',
    margin: 0,
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease-in-out',
  };

  const contentStyles = {
    padding: '1.5rem',
    overflowY: 'auto' as const,
    flex: 1,
  };

  const footerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    borderTop: footer ? '1px solid #e5e7eb' : 'none',
    backgroundColor: '#f9fafb',
  };

  const modalContent = (
    <div style={backdropStyles} onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        style={modalStyles}
        onClick={handleModalClick}
        className={className}
      >
        {(title || showCloseButton) && (
          <div style={headerStyles}>
            {title && <h2 style={titleStyles}>{title}</h2>}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                style={closeButtonStyles}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        
        <div style={contentStyles}>
          {children}
        </div>
        
        {footer && (
          <div style={footerStyles}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal; 