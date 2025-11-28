/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

export const DropdownTrigger = forwardRef(({ children, ...props }, ref) => {
  try {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, { ref, ...props });
    }
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  } catch (error) {
    console.error('DropdownTrigger error:', error.message);
    return null;
  }
});
