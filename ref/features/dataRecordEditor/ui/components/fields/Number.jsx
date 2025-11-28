import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';


export const Number = ({ modelField, record }) => {

  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        type='number'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      />
    </Field>
  );
};

