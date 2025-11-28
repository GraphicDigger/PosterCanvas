import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Field, Label, TextField } from '../../../../shared/uiKit/Fields';


export const AttrTextField = forwardRef(({ attr, onChange }, ref) => {

  const handleChange = (value) => {
    onChange && onChange(value);
  };

  return (
    <Field>
      <Label>{attr.name}</Label>
      <TextField value={attr.value} width={150} onChange={handleChange} />
    </Field>
  );
});

