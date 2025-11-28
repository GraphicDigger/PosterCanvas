import { ENTITY_KINDS } from '../../../shared/constants';
import { v4 as uuidv4 } from 'uuid';

// Создает нормализованные объекты кода для компонента
export const normalizeCode = (component) => {
  if (!component ) {return [];}

  const codes = [
    {
      id: `${component.id}-jsx-code-${uuidv4()}`,
      name: `${component.name}`,
      kind: ENTITY_KINDS.CODE,
      type: ENTITY_KINDS.COMPONENT,
      lang: 'jsx',
      content: component.jsx,
      ownership: {
        type: ENTITY_KINDS.COMPONENT,
        componentId: component.id,
      },
    },
    {
      id: `${component.id}-css-code-${uuidv4()}`,
      name: `${component.name}`,
      kind: ENTITY_KINDS.CODE,
      type: ENTITY_KINDS.COMPONENT,
      lang: 'css',
      content: component.css,
      ownership: {
        type: ENTITY_KINDS.COMPONENT,
        componentId: component.id,
      },
    },
  ];

  return codes;
};

