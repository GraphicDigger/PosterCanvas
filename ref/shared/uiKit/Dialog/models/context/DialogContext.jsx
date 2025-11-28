import React, { createContext, useState, useEffect } from 'react';

export const DialogContext = createContext(null);

const hasDialogTrigger = (children) => {

  let hasTrigger = false;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // Проверяем тип компонента по displayName или name
      if (child.type?.displayName === 'DialogTrigger' ||
                child.type?.name === 'DialogTrigger') {
        hasTrigger = true;
      }
    }
  });
  return hasTrigger;
};

export const DialogProvider = ({
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  lockScroll = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasDialogTrigger(children)) {setIsOpen(true);}
  }, [children]);

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    closeOnEsc,
    closeOnOverlayClick,
    lockScroll,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
    </DialogContext.Provider>
  );
};
