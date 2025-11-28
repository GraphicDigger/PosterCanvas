import { v4 as uuidv4 } from 'uuid';
import { parseComponentSource } from './classes/componentJSXParser';
import { ENTITY_KINDS } from '../../../shared/constants';
/**
 * Анализирует структуру компонента и строит его иерархию
 * @param {Object} component - Компонент UI библиотеки
 * @param {Array} propIds - Массив идентификаторов пропсов
 * @param {string} jsxCode - JSX код компонента (опционально)
 * @returns {Object} Структура компонента с информацией о вложенных элементах
 */
export const analyzeComponentStructure = (component, propIds = [], jsxCode = null) => {
  if (!component) {return null;}

  // Создаем базовую структуру компонента
  const componentStructure = {
    id: component.id || uuidv4(),
    name: component.name,
    type: ENTITY_KINDS.COMPONENT,
    importPath: component.importPath,
    propIds: propIds,
    children: [],
    jsx: null,
    css: null,
  };

  // console.log('componentStructure: ', componentStructure);

  // Если у компонента нет пропсов, но есть JSX код, парсим код
  if ((!component.props || !Array.isArray(component.props) || component.props.length === 0) && jsxCode) {
    console.log('Анализ через JSXParser');
    return parseComponentSource(component, jsxCode);
  }

  const props = component.props || [];

  // Извлекаем children из пропсов, если есть
  const childrenProp = props.find(p => p.propName === 'children');

  if (childrenProp && childrenProp.defaultValue) {
    // Если children - это строка, добавляем как текстовый узел
    if (typeof childrenProp.defaultValue === 'string') {
      componentStructure.children.push({
        id: uuidv4(),
        type: 'text',
        content: childrenProp.defaultValue,
        parentId: componentStructure.id,
      });
    }

    // Если children - это массив или объект, добавляем каждый элемент
    else if (Array.isArray(childrenProp.defaultValue)) {
      childrenProp.defaultValue.forEach((child, index) => {
        if (typeof child === 'string') {
          componentStructure.children.push({
            id: uuidv4(),
            type: 'text',
            content: child,
            parentId: componentStructure.id,
            index,
          });
        } else if (typeof child === 'object' && child !== null) {
          componentStructure.children.push({
            id: uuidv4(),
            type: 'component',
            name: child.type || 'Component',
            parentId: componentStructure.id,
            props: child.props || {},
            index,
          });
        }
      });
    }
    // Если children - это React элемент, пытаемся распарсить его
    else if (typeof childrenProp.defaultValue === 'object' && childrenProp.defaultValue !== null) {
      componentStructure.children.push({
        id: uuidv4(),
        type: 'component',
        name: childrenProp.defaultValue.type || 'Component',
        parentId: componentStructure.id,
        props: childrenProp.defaultValue.props || {},
      });
    }
  }

  // Если есть JSX код, пытаемся дополнительно проанализировать структуру
  if (jsxCode) {
    const parsedStructure = parseComponentSource(component, jsxCode);
    if (parsedStructure && parsedStructure.children && parsedStructure.children.length > 0) {
      // Добавляем найденные в JSX компоненты, если они еще не добавлены
      parsedStructure.children.forEach(child => {
        // Проверяем, нет ли уже такого компонента
        const exists = componentStructure.children.some(
          existingChild => existingChild.name === child.name && existingChild.type === child.type,
        );

        if (!exists) {
          componentStructure.children.push(child);
        }
      });
    }
  }

  // Анализ других пропсов, которые могут содержать вложенные компоненты
  // Например, startIcon, endIcon и т.д.
  const iconProps = props.filter(p =>
    p.propName === 'startIcon' ||
    p.propName === 'endIcon' ||
    p.name === 'startIcon' ||
    p.name === 'endIcon',
  );

  iconProps.forEach(iconProp => {
    if (iconProp.defaultValue) {
      const iconId = uuidv4();
      const iconName = iconProp.propName || iconProp.name;

      // Добавляем иконку как вложенный элемент
      componentStructure.children.push({
        id: iconId,
        type: 'icon',
        name: iconName,
        content: typeof iconProp.defaultValue === 'string'
          ? iconProp.defaultValue
          : JSON.stringify(iconProp.defaultValue),
        parentId: componentStructure.id,
        position: iconName === 'startIcon' ? 'start' : 'end',
      });
    }
  });

  return componentStructure;
};
