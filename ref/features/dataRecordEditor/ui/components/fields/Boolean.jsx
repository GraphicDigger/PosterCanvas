import React from 'react';
import PropTypes from 'prop-types';
import { Field, Label } from '../../../../../shared/uiKit/Fields';
import { Checkbox } from '../../../../../shared/uiKit/Checkbox';
import { useRecordEditor } from '../../../model';
import { useDataModelFieldStates } from '../../../../../entities/dataModelField';

export const Boolean = ({ modelField, record }) => {

  const { updateField, getFieldValue, handleDeselectField } = useRecordEditor();

  const handleChange = (newValue) => {
    updateField(record.id, modelField.id, newValue);
  };

  // console.log('[Boolean] modelField', modelField)
  // console.log('[Boolean] record', record)
  // console.log('[Boolean] getFieldValue', getFieldValue(modelField.id, record))

  return (
    <Field direction='column' onClick={handleDeselectField}>
      <Checkbox
        label={modelField.label}
        checked={getFieldValue(modelField.id, record)}
        onChange={handleChange}
      />
    </Field>
  );
};

