import React from 'react';
import { Field, Label, Select } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { MenuItem } from '../../../../../shared/uiKit/Menu';
import { useRecordsByModelId } from '../../../../../entities/dataRecord';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const Reference = ({ modelField, record }) => {

  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor();
  const { rawRecords } = useRecordsByModelId(modelField.refModelId);

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  // console.log('[Reference] modelField', modelField)
  // console.log('[Reference] records', rawRecords)

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <Select
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      >
        {rawRecords?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Field>
  );
};

