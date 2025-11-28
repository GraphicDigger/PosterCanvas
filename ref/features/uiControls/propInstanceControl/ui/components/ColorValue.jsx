import React from 'react';
import { TextField } from '../../../../../shared/uiKit/Fields';
import { BindVariableToInstancePropPicker } from '../../../../../entities/binding';
import { PROPERTY_TYPES, STYLE_PROPERTIES } from '../../../../../entities/uiElement';
import { HEXColorInput } from '../../../../../shared/uiKit/Color';

export const ColorValue = ({
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
      <HEXColorInput
        value={value}
        onChange={onChange}
      />
    </BindVariableToInstancePropPicker>
  );
};
