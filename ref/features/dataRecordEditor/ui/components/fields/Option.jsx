import React from 'react';
import { Field, Label, Select } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { MenuItem } from '../../../../../shared/uiKit/Menu';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const Option = ({ modelField, record }) => {

  const { updateField, draft, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  // console.log('[Option] modelField', modelField);

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <Select
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      >
        {modelField.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </Field>
  );
};

