/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field, Label, Select } from '../../../../../shared/uiKit/Fields';
import { MenuItem } from '../../../../../shared/uiKit/Menu';


export const fonts = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Inter', label: 'Inter' },
];

export const FontFamilyField = ({ value, onChange }) => {

  return (
    <Field>
      <Label>Font</Label>
      <Select width={150} value={value} onChange={onChange} >
        {fonts.map((font) => (
          <MenuItem key={font.value} value={font.value}>
            {font.label}
          </MenuItem>
        ))}
      </Select>
    </Field>
  );
};

