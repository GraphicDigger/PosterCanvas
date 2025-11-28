import React from 'react';
import { Field, FieldList, Label, TextField, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { Checkbox } from '@/shared/uiKit/Checkbox';
import { useDraftModel } from '../../../model';


export const Json = ({ modelField }) => {

  const { draftModelField, updateDraftModelField } = useDataModelEditor(modelField.id, modelField.modelId);
  const field = { ...modelField, ...draftModelField };

  const handleLabelChange = (value) => {
    updateDraftModelField(modelField.id, { label: value, name: value });
  };

  const handleHelpTextChange = (value) => {
    updateDraftModelField(modelField.id, { helpText: value });
  };

  const handleRequiredChange = (checked) => {
    updateDraftModelField(modelField.id, { isRequired: checked });
  };

  return (
    <FieldList>
      <Field direction='column'>
        <Label>Label</Label>
        <TextField
          value={field.label || ''}
          onChange={handleLabelChange}
        />
      </Field>
      <Field direction='column'>
        <Label>Help Text</Label>
        <TextFieldMultiple
          value={field.helpText || ''}
          onChange={handleHelpTextChange}
          placeholder={modelField.helpText || 'Appears below the label to guide Collaborators, just like this help text'}
          maxHeight={150}
        />
      </Field>
      <Checkbox
        label="Required"
        checked={field.isRequired || false}
        onChange={handleRequiredChange}
        disabled={field.default === true}
      />
    </FieldList>
  );
};

