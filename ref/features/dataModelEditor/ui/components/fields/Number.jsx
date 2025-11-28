import React, { useState } from 'react';
import { Field, FieldList, Label, TextField, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { Checkbox } from '@/shared/uiKit/Checkbox';
import { useDraftModel } from '../../../model';


export const Number = ({ modelField }) => {

  const { draftModelField, updateDraftModelField } = useDraftModel(modelField.id, modelField.modelId);
  const field = { ...modelField, ...draftModelField };

  const handleLabelChange = (value) => {
    updateDraftModelField(modelField.id, { label: value, name: value });
  };

  const handleHelpTextChange = (value) => {
    updateDraftModelField(modelField.id, { helpText: value });
  };

  const handleMinNumberChange = (value) => {
    updateDraftModelField(modelField.id, { minValue: value });
  };

  const handleMaxNumberChange = (value) => {
    updateDraftModelField(modelField.id, { maxValue: value });
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
        <Label> Min number </Label>
        <TextField
          type='number'
          value={field.minValue || ''}
          onChange={handleMinNumberChange}
          placeholder='e.g. 100'
        />
      </Field>
      <Field direction='column'>
        <Label> Max number </Label>
        <TextField
          type='number'
          value={field.maxValue || ''}
          onChange={handleMaxNumberChange}
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

