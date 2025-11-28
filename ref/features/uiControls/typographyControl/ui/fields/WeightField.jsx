/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field, Label, Select } from '../../../../../shared/uiKit/Fields';
import { MenuItemRadio } from '../../../../../shared/uiKit/Menu';
import { fontWeight } from '../../../../../entities/uiElement';

export const WeightField = ({ value, onChange }) => {

  return (
    <Field>
      <Label>Weight</Label>
      <Select width={150} value={value} onChange={onChange} >
        {fontWeight.map((weight) => (
          <MenuItemRadio
            key={weight.value}
            checked={value === weight.value}
            onChange={() => onChange(weight.value)}>
            {weight.label}
          </MenuItemRadio>
        ))}
      </Select>
    </Field>
  );
};

