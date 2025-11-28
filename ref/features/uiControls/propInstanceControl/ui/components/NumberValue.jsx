import React from 'react';
import { TextField } from '../../../../../shared/uiKit/Fields';

export const NumberValue = ({ prop, value, onChange }) => {
  const handleChange = (newValue) => {
    const numValue = parseFloat(newValue);
    onChange(isNaN(numValue) ? 0 : numValue);
  };

  return (
    <TextField
      width='150'
      type="number"
      value={value || 0}
      onChange={handleChange}
      placeholder={prop.defaultValue?.toString() || '0'}
    />
  );
};
