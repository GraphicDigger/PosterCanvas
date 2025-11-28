import React from 'react';
import { Checkbox } from '@/shared/uiKit/Checkbox';
import { Button } from '@/shared/uiKit/Button';
import { PlusIcon, CrossIcon } from '@/shared/assets/icons';
import { Box } from '@/shared/uiKit/Box';
import { Field, FieldList, Label, TextField, TextFieldMultiple } from '@/shared/uiKit/Fields';
import { Stack } from '@/shared/uiKit/Stack';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { useDraftModel } from '../../../model';

export const Option = ({ modelField }) => {

  const { draftModelField, updateDraftModelField } = useDraftModel(modelField.id, modelField.modelId);

  // use data from draft or initial values from model
  const field = {
    ...modelField,
    ...draftModelField,
    options: draftModelField?.options || modelField.options || [],
  };

  const handleLabelChange = (value) => {
    updateDraftModelField(modelField.id, { label: value, name: value });
  };

  const handleHelpTextChange = (value) => {
    updateDraftModelField(modelField.id, { helpText: value });
  };

  const handleRequiredChange = (checked) => {
    updateDraftModelField(modelField.id, { isRequired: checked });
  };

  const handleAddOption = () => {
    const newOptions = [...field.options, {
      id: Date.now().toString(),
      value: `Option ${field.options.length + 1}`,
    }];

    updateDraftModelField(modelField.id, { options: newOptions });
  };

  // Обновляем опцию по индексу
  const handleOptionChange = (index, newValue) => {
    const newOptions = [...field.options];
    newOptions[index] = { ...newOptions[index], value: newValue };

    updateDraftModelField(modelField.id, { options: newOptions });
  };

  // Удаляем опцию по индексу
  const handleRemoveOption = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index);
    updateDraftModelField(modelField.id, { options: newOptions });
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
          placeholder='Appears below the label to guide Collaborators, just like this help text'
        />
      </Field>

      <Button
        color='default'
        startIcon={<PlusIcon />}
        onClick={handleAddOption}
      >
                Add Option
      </Button>
      {field.options.map((option, index) => (
        <Stack key={option.id || index} direction="row" gap={1} align="center">
          <TextField
            value={option.value || ''}
            onChange={(value) => handleOptionChange(index, value)}
            placeholder={`Option ${index + 1}`}
          />
          <ButtonTool onClick={() => handleRemoveOption(index)}>
            <CrossIcon />
          </ButtonTool>
        </Stack>
      ))}

      <Checkbox
        label="Required"
        checked={field.isRequired || false}
        onChange={handleRequiredChange}
        disabled={field.default === true}
      />
    </FieldList>
  );
};
