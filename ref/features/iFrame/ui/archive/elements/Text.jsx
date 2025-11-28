import React from 'react';
import { TextContent } from './TextContent';
import { useRenderEvents } from '@/entities/uiFocus';
import { useBoundVariableValue } from '@/entities/binding';

export const Text = ({
  ui,
  disableClick,
}) => {
  const { styles } = useBoundVariableValue(ui.id);
  const eventHandlers = useRenderEvents(ui, disableClick);
  if (!ui || !ui.properties) { return null; }
  const { properties } = ui;


  const finalStyles = {
    ...properties.style,
    ...styles,
  };

  return (
    <p
      data-ui-id={ui.id}
      style={finalStyles}
      {...properties.attributes}
      {...eventHandlers}
    >
      <TextContent ui={ui} />

    </p>
  );
};
