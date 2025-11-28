import React from 'react';
import { Field, Label, Select } from '../../../../../shared/uiKit/Fields';
import { useRecordEditor } from '../../../model';
import { MenuItemCheckbox } from '../../../../../shared/uiKit/Menu';
import { useRecordsByModelId } from '../../../../../entities/dataRecord';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const MultiReference = ({ modelField, record }) => {

  const { rawRecords } = useRecordsByModelId(modelField.refModelId);
  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Label>{modelField.label}</Label>
      <Select
        size='small'
        value={getFieldValue(modelField.id, record)}
        onChange={handleChange}
        multiple
      >
        {rawRecords?.map((option) => (
          <MenuItemCheckbox key={option.id} value={option.id}>
            {option.name}
          </MenuItemCheckbox>
        ))}
      </Select>
    </Field>
  );
};

