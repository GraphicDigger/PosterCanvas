import React, { useState } from 'react';
import { Field, FieldList, Label, TextField, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { Checkbox } from '@/shared/uiKit/Checkbox';
import { useDraftModel } from '../../../model';

export const MultistyleText = ({ modelField }) => {

  const { draftModelField, updateDraftModelField } = useDraftModel(modelField.id, modelField.modelId);
  const field = { ...modelField, ...draftModelField };

  const handleLabelChange = (value) => {
    updateDraftModelField(modelField.id, { label: value, name: value });
  };

  const handleHelpTextChange = (value) => {
    updateDraftModelField(modelField.id, { helpText: value });
  };

  const handleMinLengthChange = (value) => {
    updateDraftModelField(modelField.id, { minLength: value });
  };

  const handleMaxLengthChange = (value) => {
    updateDraftModelField(modelField.id, { maxLength: value });
  };

  const handleRequiredChange = (value) => {
    updateDraftModelField(modelField.id, { isRequired: value });
  };

  return (
    <FieldList>
      <Field direction='column'>
        <Label> Label </Label>
        <TextField value={field.label || ''} onChange={handleLabelChange} />
      </Field>
      <Field direction='column'>
        <Label> Help Text </Label>
        <TextFieldMultiple
          value={field.helpText || ''}
          onChange={handleHelpTextChange}
          placeholder='Appears below the label to guide Collaborators, just like this help text'
          maxHeight={150}
        />
      </Field>
      <Field direction='column'>
        <Label> Minimum character count (with space) </Label>
        <TextField
          type='number'
          value={field.minLength || ''}
          onChange={handleMinLengthChange}
          placeholder='e.g. 100'
        />
      </Field>
      <Field direction='column'>
        <Label> Maximum character count (with space) </Label>
        <TextField
          type='number'
          value={field.maxLength || ''}
          onChange={handleMaxLengthChange}
          placeholder='e.g. 200'
        />
      </Field>

      <Checkbox
        label="Required"
        checked={field.isRequired || false}
        onChange={handleRequiredChange}
      />

    </FieldList>

  );
};

