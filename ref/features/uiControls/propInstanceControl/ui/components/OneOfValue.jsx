import React, { useCallback } from 'react';
import { Select } from '../../../../../shared/uiKit/Fields';
import { MenuItem } from '../../../../../shared/uiKit/Menu';

export const OneOfValue = ({
  onChange,
  propValues,
  currentPropValue,
}) => {

  const handleChange = useCallback((propValue) => {
    const selectedPropValue = propValues.find(opt => opt.name === propValue);
    onChange(propValue, selectedPropValue ? selectedPropValue.id : null);
  }, [propValues, onChange]);

  return (
    <Select
      width={150}
      value={currentPropValue}
      onChange={handleChange}
    >
      {propValues.map(pv => (
        <MenuItem key={pv.id} value={pv.name}>
          {pv.name}
        </MenuItem>
      ))}
    </Select>
  );
};
