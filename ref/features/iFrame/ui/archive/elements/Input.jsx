import React from 'react';
import { useRenderEvents } from '@/entities/uiFocus';
import { useBoundVariableValue } from '@/entities/binding';

export const Input = ({
  ui,
  disableClick,
}) => {
  if (!ui || !ui.properties) {return null;}

  const { styles, content } = useBoundVariableValue(ui.id);
  const eventHandlers = useRenderEvents(ui, disableClick);

  const finalStyles = {
    ...ui.properties.style,
    ...styles,
  };

  const value = content?.value || '';
  const placeholder = ui.properties.attributes?.placeholder || '';
  const type = ui.properties.attributes?.type || 'text';

  return (
    <input
      type={type}
      value={value}
      {...ui.properties.attributes}
      placeholder={placeholder}
      style={finalStyles}
      data-ui-id={ui.id}
      data-testid={`input-${ui.id}`}
      readOnly={ui.properties.attributes?.readOnly || ui.properties.attributes?.readonly || false}
      {...eventHandlers}
    />
  );
};
