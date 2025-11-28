import React, { memo } from 'react';
import { TextField } from '../../../../../shared/uiKit/Fields';
import { BindVariableToInstancePropPicker } from '../../../../../entities/binding';

export const StringValue = memo(({
  propId,
  instanceId,
  value,
  onChange,
}) => {
  return (
    <BindVariableToInstancePropPicker
      propId={propId}
      instanceId={instanceId}
      propertyValue={value}
      window={{ offset: 85 }}
      width={150}
    >
      <TextField
        value={value}
        onChange={onChange}
      />
    </BindVariableToInstancePropPicker>
  );
});
