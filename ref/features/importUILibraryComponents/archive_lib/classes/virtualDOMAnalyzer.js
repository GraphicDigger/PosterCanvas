import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

/**
 * Класс для анализа Virtual DOM дерева компонентов React
 */
export class VirtualDOMAnalyzer {
  /**
   * Анализирует Virtual DOM дерево React компонента
   * @param {Object} component - Информация о компоненте
   * @param {React.ReactElement} reactElement - React элемент для анализа
   * @returns {Object} Структура компонента с вложенными элементами
   */
  static analyzeReactTree(component, reactElement) {
    if (!component || !reactElement) {return null;}

    // Базовая структура компонента
    const componentStructure = {
      id: component.id || uuidv4(),
      name: component.name,
      type: ENTITY_KINDS.COMPONENT,
      importPath: component.importPath,
      propIds: component.propIds || [],
      children: [],
      jsx: null,
      css: null,
    };

    try {
      // Используем React DevTools-подобный подход для обхода дерева
      this.traverseReactTree(reactElement, componentStructure);
      return componentStructure;
    } catch (error) {
      console.error('Ошибка при анализе Virtual DOM:', error);
      return componentStructure;
    }
  }

  /**
   * Обходит дерево React элементов и извлекает структуру
   * @param {React.ReactElement} element - React элемент
   * @param {Object} parentStructure - Родительская структура
   */
  static traverseReactTree(element, parentStructure) {
    if (!element || !parentStructure) {return;}

    // Если элемент - это массив, обходим каждый элемент
    if (Array.isArray(element)) {
      element.forEach(child => this.traverseReactTree(child, parentStructure));
      return;
    }

    // Игнорируем примитивные значения
    if (typeof element !== 'object' || element === null) {
      return;
    }

    // Получаем тип и пропсы элемента
    const { type, props } = element;

    // Если нет типа, это не React элемент
    if (!type) {return;}

    // Обрабатываем элемент в зависимости от типа
    if (typeof type === 'string') {
      // HTML элемент (div, span и т.д.)
      this.processHTMLElement(element, parentStructure);
    } else if (typeof type === 'function' || (typeof type === 'object' && type !== null)) {
      // React компонент
      this.processReactComponent(element, parentStructure);
    }

    // Обходим дочерние элементы
    if (props && props.children) {
      this.traverseReactTree(props.children, parentStructure);
    }
  }

  /**
   * Обрабатывает HTML элемент
   * @param {React.ReactElement} element - React элемент
   * @param {Object} parentStructure - Родительская структура
   */
  static processHTMLElement(element, parentStructure) {
    const { type, props } = element;

    // Добавляем элемент в структуру только если это не служебный элемент
    if (type !== 'div' && type !== 'span') {
      const elementId = uuidv4();
      const elementStructure = {
        id: elementId,
        type: 'element',
        name: type,
        parentId: parentStructure.id,
        props: this.extractProps(props),
        children: [],
      };

      parentStructure.children.push(elementStructure);

      // Обходим дочерние элементы
      if (props && props.children) {
        this.traverseReactTree(props.children, elementStructure);
      }
    } else {
      // Для служебных элементов просто обходим дочерние элементы
      if (props && props.children) {
        this.traverseReactTree(props.children, parentStructure);
      }
    }
  }

  /**
   * Обрабатывает React компонент
   * @param {React.ReactElement} element - React элемент
   * @param {Object} parentStructure - Родительская структура
   */
  static processReactComponent(element, parentStructure) {
    const { type, props } = element;

    // Получаем имя компонента
    const componentName = type.displayName || type.name || 'Component';

    // Добавляем компонент в структуру
    const componentId = uuidv4();
    const componentStructure = {
      id: componentId,
      type: 'component',
      name: componentName,
      parentId: parentStructure.id,
      props: this.extractProps(props),
      children: [],
    };

    parentStructure.children.push(componentStructure);

    // Рекурсивно анализируем дочерние элементы
    if (props && props.children) {
      this.traverseReactTree(props.children, componentStructure);
    }
  }

  /**
   * Извлекает пропсы из объекта props
   * @param {Object} props - Объект пропсов
   * @returns {Array} Массив пропсов
   */
  static extractProps(props) {
    if (!props) {return [];}

    // Игнорируем дочерние элементы и специальные пропсы React
    return Object.keys(props)
      .filter(key => key !== 'children' && key !== 'key' && key !== 'ref')
      .map(key => ({
        name: key,
        value: this.serializeValue(props[key]),
      }));
  }

  /**
   * Сериализует значение пропса в строку
   * @param {any} value - Значение пропса
   * @returns {string} Сериализованное значение
   */
  static serializeValue(value) {
    if (value === undefined || value === null) {return '';}

    if (typeof value === 'function') {return 'function() {}';}

    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (e) {
        return '[Object]';
      }
    }

    return String(value);
  }
}

/**
 * Анализирует структуру компонента путем обхода Virtual DOM
 * @param {Object} component - Информация о компоненте
 * @param {Object} Component - React компонент
 * @param {Object} props - Пропсы для компонента
 * @returns {Object} Структура компонента
 */
export const analyzeVirtualDOM = (component, Component, props = {}) => {
  if (!component || !Component) {return null;}

  try {
    // Создаем элемент для анализа
    const element = React.createElement(Component, props);

    // Анализируем виртуальное DOM дерево
    return VirtualDOMAnalyzer.analyzeReactTree(component, element);
  } catch (error) {
    console.error('Ошибка при анализе Virtual DOM:', error);
    return component;
  }
};
