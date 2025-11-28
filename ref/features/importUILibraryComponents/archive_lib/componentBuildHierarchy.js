import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { analyzeComponentStructure } from './componentAnalyzeStructure';
import { parseComponentSource } from './classes/componentJSXParser';

//Строит полную иерархию компонента с вложенными элементами
export const buildComponentHierarchy = (
  component,
  instances = [],
  jsxCode = null,
  props = [],
) => {
  if (!component) {return null;}

  // Пытаемся получить информацию о структуре компонента
  // Сначала проверяем, есть ли JSX код
  let componentStructure = null;

  if (jsxCode) {
    // Анализируем JSX код для получения вложенных компонентов
    console.log('Анализ компонента по JSX коду');
    componentStructure = parseComponentSource(component, jsxCode);
  }

  // Если структуру не удалось получить из JSX, анализируем через пропсы
  if (!componentStructure || !componentStructure.children || componentStructure.children.length === 0) {
    componentStructure = analyzeComponentStructure(component, props.map(p => p.id), jsxCode);
  }

  // Если instances не пустой, строим иерархию на основе экземпляров
  if (instances && instances.length > 0) {
    console.log('Построение иерархии из экземпляров');
    return buildHierarchyFromInstances(component, instances, componentStructure);
  }

  // Возвращаем результат анализа компонента
  return componentStructure || component;
};

//Строит иерархию компонента из экземпляров
const buildHierarchyFromInstances = (component, instances, baseStructure = null) => {
  // Создаем карту экземпляров для быстрого доступа
  const instanceMap = instances.reduce((map, instance) => {
    map[instance.id] = instance;
    return map;
  }, {});

  // Функция для рекурсивного построения дерева
  const buildTree = (nodeId, parentId = null) => {
    const instance = instanceMap[nodeId];
    if (!instance) {return null;}

    const node = {
      id: instance.id,
      type: instance.type || 'instance',
      name: instance.name,
      props: instance.props || [],
      parentId,
      children: [],
    };

    // Добавляем дочерние элементы, если они есть
    if (instance.childrenIds && Array.isArray(instance.childrenIds)) {
      instance.childrenIds.forEach(childId => {
        const childNode = buildTree(childId, instance.id);
        if (childNode) {
          node.children.push(childNode);
        }
      });
    }

    return node;
  };

  // Строим дерево, начиная с корневого компонента
  const hierarchy = buildTree(component.id);

  // Если есть базовая структура и не удалось построить иерархию из экземпляров
  if (!hierarchy && baseStructure) {
    return baseStructure;
  }

  // Если есть иерархия и базовая структура, объединяем их
  if (hierarchy && baseStructure) {
    // Добавляем найденные в базовой структуре компоненты в иерархию, если их там нет
    if (baseStructure.children && baseStructure.children.length > 0) {
      baseStructure.children.forEach(child => {
        const exists = hierarchy.children.some(
          existingChild => existingChild.name === child.name && existingChild.type === child.type,
        );

        if (!exists) {
          hierarchy.children.push(child);
        }
      });
    }

    return hierarchy;
  }

  return hierarchy || component;
};
