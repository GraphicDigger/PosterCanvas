import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Field, FieldList, Label } from '@/shared/uiKit/Fields';
import { useChangeAction } from '../../model';


export const ConfigList = ({ action }) => {

  if (action && !action.type) {return null;}

  const { handleUpdateActionConfig } = useChangeAction();

  return (
    <FieldList gap={1}>
      {Object.entries(action.config).map(([fieldName, fieldValue]) => (
        <Field key={fieldName}>
          <Label>{fieldName}</Label>
          <TextField
            width={140}
            value={fieldValue}
            onChange={(value) => handleUpdateActionConfig(action.id, fieldName, value)}
          />
        </Field>
      ))}
    </FieldList>
  );
};

ConfigList.propTypes = {
  action: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    config: PropTypes.object,
  }).isRequired,
};
