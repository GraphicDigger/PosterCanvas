import React from 'react';
import { Field, Label, TextField } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { TextFieldMultiple } from '../../../../../shared/uiKit/Fields';

export const MultistyleText = ({ modelField, record }) => {

  const { updateField, draft, getFieldValue, handleDeselectField } = useRecordEditor(record.id);

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <TextField
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      >
        {/* <EndSlot>
                    <ArrowDownIcon />
                </EndSlot> */}
      </TextField>
    </Field>
  );
};


export const MultistyleTextSettings = ({ record, modelField }) => {

  const { updateField, draft, getFieldValue, handleDeselectField } = useRecordEditor(record.id);

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  return (
    <TextFieldMultiple
      value={getFieldValue(modelField.id, record)}
      onChange={handleChange}
    />
  );
};

