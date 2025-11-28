import React, { useCallback } from 'react';
import { useBindVariableToProperty } from '../model';
import { VariablePicker } from './components/VariablePicker';


export const BindVariableToPropertyPicker = ({
  propertyType,
  propertyName,
  propertyValue,
  width = 'fill',
  onClick,
  window,
  children,
}) => {

  const { bindPropertyToVariable, unbindProperty } = useBindVariableToProperty({ propertyType, propertyName });

  const handleBindPropertyToVariable = useCallback((variable) => {
    bindPropertyToVariable(variable);
  }, [bindPropertyToVariable]);

  const handleUnbindProperty = useCallback(() => {
    unbindProperty();
  }, [unbindProperty]);

  return (
    <VariablePicker
      propertyValue={propertyValue}
      onBind={handleBindPropertyToVariable}
      onUnbind={handleUnbindProperty}
    >
      {children}
    </VariablePicker>


  );
};
