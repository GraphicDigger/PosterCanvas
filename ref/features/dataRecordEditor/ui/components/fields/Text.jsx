import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const Text = ({ modelField, record }) => {

  const { updateField, draft, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  // console.log('[Text] record', record);
  // console.log('[Text] draft', draft);

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      />
    </Field>
  );
};

