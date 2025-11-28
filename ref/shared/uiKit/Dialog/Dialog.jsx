// src/shared/uiKit/Dialog/Dialog.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { DialogProvider } from './models/context/DialogContext';


export const Dialog = forwardRef(({
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  lockScroll = true,
}, ref) => (
  <DialogProvider
    ref={ref}
    closeOnEsc={closeOnEsc}
    closeOnOverlayClick={closeOnOverlayClick}
    lockScroll={lockScroll}
  >
    {children}
  </DialogProvider>
));

