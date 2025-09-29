import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  disableBackdropClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  className,
  backdropClassName,
  disableBackdropClose = false,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const onBackdropClick = () => {
    if (!disableBackdropClose) onClose();
  };

  const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={[styles.backdrop, backdropClassName].filter(Boolean).join(' ')}
      onClick={onBackdropClick}
    >
      <div
        className={[styles.content, className].filter(Boolean).join(' ')}
        onClick={stopPropagation}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
