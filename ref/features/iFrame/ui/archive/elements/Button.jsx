import React from 'react';
import { TextContent } from './TextContent';
import { UIRender } from '../UIRender';
import { useRenderEvents } from '@/entities/uiFocus';
import { useBoundVariableValue } from '@/entities/binding';

export const Button = ({
  ui,
  children,
  disableClick,
}) => {
  const { styles } = useBoundVariableValue(ui.id);
  const eventHandlers = useRenderEvents(ui, disableClick);

  if (!ui || !ui.properties) {return null;}

  // Объединяем базовые стили элемента с переопределенными стилями из инстанса
  const finalStyles = {
    ...ui.properties.style,
    ...styles,
  };

  return (
    <button
      style={finalStyles}
      data-ui-id={ui.id}
      {...ui.properties.attributes}
      {...eventHandlers}
    >
      <TextContent ui={ui}/>
      {children && children.length > 0 && (
        <>
          {children.map(child => (
            <UIRender
              key={child.id}
              ui={child}
              disableClick={false}
            />
          ))}
        </>
      )}
    </button>
  );
};
