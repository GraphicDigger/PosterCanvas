import React, { useCallback } from 'react';
import { useBindVariableToProperty } from '../model';
import { VariablePicker } from './components/VariablePicker';
import { useInstanceMutation } from '../../uiInstance';


export const BindVariableToInstancePropPicker = ({
  propId,
  instanceId,
  propertyValue,
  children,
  ...restProps
}) => {

  const { updateInstanceProp } = useInstanceMutation();

  const handleUpdateInstanceProp = useCallback((variable) => {
    updateInstanceProp(instanceId, propId, {
      value: {
        id: variable.id,
        type: variable.kind,
        name: variable.name,
      },
    });
  }, [updateInstanceProp]);

  return (
    <VariablePicker
      propertyValue={propertyValue}
      onBind={handleUpdateInstanceProp}
      width={150}
      {...restProps}
    >
      {children}
    </VariablePicker>
  );
};
