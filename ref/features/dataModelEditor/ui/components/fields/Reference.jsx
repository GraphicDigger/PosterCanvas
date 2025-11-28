import React, { useState } from 'react';
import { Checkbox } from '@/shared/uiKit/Checkbox';
import { Field, FieldList, Label, TextField, Select, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { useDataModels } from '@/entities/dataModel';
import { MenuItem } from '@/shared/uiKit/Menu';
import { useDraftModel } from '../../../model';

export const Reference = ({ modelField }) => {

  const { allModels } = useDataModels();

  const { draftModelField, updateDraftModelField } = useDraftModel(modelField.id, modelField.modelId);
  const field = { ...modelField, ...draftModelField };


  const handleLabelChange = (value) => {
    updateDraftModelField(modelField.id, { label: value, name: value });
  };

  const handleHelpTextChange = (value) => {
    updateDraftModelField(modelField.id, { helpText: value });
  };

  const handleModelChange = (modelId) => {
    const selectedModel = allModels.find(c => c.id === modelId);
    if (selectedModel) {
      updateDraftModelField(modelField.id, {
        refModelId: modelId,
        refDisplayField: selectedModel.name,
      });
    }
  };

  const handleRequiredChange = (value) => {
    updateDraftModelField(modelField.id, { isRequired: value });
  };

  return (
    <FieldList>
      <Field direction='column'>
        <Label>
          Label
        </Label>
        <TextField
          value={field.label || ''}
          onChange={handleLabelChange}
        />
      </Field>
      <Field direction='column'>
        <Label>
          Help Text
        </Label>
        <TextFieldMultiple
          value={field.helpText || ''}
          onChange={handleHelpTextChange}
          placeholder='Appears below the label to guide Collaborators, just like this help text'
        />
      </Field>
      <Field direction='column'>
        <Label>
          Collection
        </Label>
        <Select
          value={field.refModelId || ''}
          onChange={handleModelChange}
        >
          {allModels.map((model) => (
            <MenuItem
              key={model.id}
              value={model.id}
              onClick={() => handleModelChange(model.id)}
            >
              {model.name}
            </MenuItem>
          ))}
        </Select>
      </Field>
      <Checkbox
        label="Required"
        checked={field.isRequired || false}
        onChange={handleRequiredChange}
      />

    </FieldList>
  );
};

