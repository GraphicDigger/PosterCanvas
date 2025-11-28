import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const Color = ({ modelField, record }) => {

  const { updateField, draft, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  // console.log('[Color] modelField', modelField)
  // console.log('[Color] record', record)
  // console.log('[Color] getFieldValue', getFieldValue(modelField.id, record))

  return (
    <Field direction='column' onClick={handleDeselectField}    >
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      />
    </Field>
  );
};

