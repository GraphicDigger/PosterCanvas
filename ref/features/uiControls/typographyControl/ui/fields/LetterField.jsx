
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';


export const LetterField = ({ value, onChange }) => {

  return (
    <Field>
      <Label>Letter</Label>
      <TextField
        width={150}
        value={value}
        onChange={onChange}
        bufferOnBlur
      />
    </Field>
  );
};

