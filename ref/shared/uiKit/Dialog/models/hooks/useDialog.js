import { useEffect, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';


export const useDialog = () => {

  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  const {
    isOpen,
    close,
    open,
    toggle,
    closeOnEsc,
    closeOnOverlayClick,
    lockScroll,
  } = context;

  // Обработка Escape
  useEffect(() => {
    if (!closeOnEsc || !isOpen) {return;}

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {close();}
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close, closeOnEsc, isOpen]);

  // Блокировка скролла
  useEffect(() => {
    if (!lockScroll || !isOpen) {return;}

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, lockScroll]);

  // Создаем функцию для обработки клика по оверлею
  const handleOverlayClick = (fullScreen = false) => {
    if (!fullScreen && closeOnOverlayClick) {
      close();
    }
  };

  return {
    context,
    isOpen,
    open,
    close,
    toggle,
    closeOnEsc,
    closeOnOverlayClick,
    lockScroll,
    handleOverlayClick,
  };
};
