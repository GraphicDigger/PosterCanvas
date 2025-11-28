import React from 'react';
import { useRenderEvents } from '@/entities/uiFocus';
import { useBoundVariableValue } from '@/entities/binding';

export const Img = ({
  ui,
  disableClick,
}) => {
  if (!ui || !ui.properties) {return null;}

  const { styles, content } = useBoundVariableValue(ui.id);
  const eventHandlers = useRenderEvents(ui, disableClick);

  const finalStyles = {
    ...ui.properties.style, // Оригинальные стили элемента
    ...styles, // Обработанные стили из хука
  };

  return (
    <img
      src={content.src || ''}
      style={finalStyles}
      alt={ui.properties.attributes?.alt || ''}
      {...ui.properties.attributes}
      data-ui-id={ui.id}
      {...eventHandlers}
    />
  );
};
