import React from 'react';
import { useBoundVariableValue } from '@/entities/binding';

// Node.text renderer
export const TextContent = ({
  ui,
}) => {
  const { content } = useBoundVariableValue(ui.id);
  return content?.text || null;
};
