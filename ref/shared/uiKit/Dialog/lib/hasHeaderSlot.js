import React from 'react';

export const hasSlot = (children, slotType) => {
  return React.Children.toArray(children).some(
    child => React.isValidElement(child) && child.type === slotType,
  );
};
