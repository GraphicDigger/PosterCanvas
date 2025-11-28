import { v4 as uuidv4 } from 'uuid';
import { getTemplateByType } from '../config';
import { ENTITY_KINDS } from '@/shared/constants';

// Хелпер для рекурсивного создания элементов
const createRecursive = (
  templateDefaults: any, 
  ownership: { type: string, id: string }
): any[] => {
  const newId = uuidv4();
  
  // 1. Создаем сам элемент
  const element = {
    ...templateDefaults,
    id: newId,
    ownership,
    createdAt: new Date().toISOString(),
    properties: JSON.parse(JSON.stringify(templateDefaults.properties)),
    attributes: templateDefaults.attributes 
      ? JSON.parse(JSON.stringify(templateDefaults.attributes)) 
      : {},
  };

  const result = [element];

  // 2. Если есть дети, создаем их рекурсивно, указывая текущий элемент как родителя
  if (templateDefaults.children && templateDefaults.children.length > 0) {
    templateDefaults.children.forEach((childTemplate: any) => {
      const childOwnership = { type: ENTITY_KINDS.ELEMENT, id: newId };
      const childrenElements = createRecursive(childTemplate, childOwnership);
      result.push(...childrenElements);
    });
  }

  return result;
};

export const createElementsFromTemplate = (
  templateType: string, 
  ownership: { type: string, id: string }
) => {
  const template = getTemplateByType(templateType);
  if (!template) throw new Error(`Unknown element type: ${templateType}`);

  // Возвращаем массив всех созданных элементов (плоский список)
  return createRecursive(template.defaults, ownership);
};
