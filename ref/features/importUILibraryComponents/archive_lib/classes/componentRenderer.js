import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

/**
 * Класс для рендеринга и анализа React компонентов
 */
export class ComponentRenderer {
  constructor() {
    // Создаем контейнер для рендеринга компонентов
    this.container = document.createElement('div');
    this.container.id = 'component-renderer-container';
    this.container.style.display = 'none';
    document.body.appendChild(this.container);
  }

  /**
   * Очищает ресурсы рендерера
   */
  cleanup() {
    unmountComponentAtNode(this.container);
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  /**
   * Анализирует структуру компонента путем его рендеринга
   * @param {Object} Component - React компонент для анализа
   * @param {Object} props - Пропсы для компонента (опционально)
   * @returns {Object} Структура компонента
   */
  analyzeComponent(Component, props = {}) {
    if (!Component) {return null;}

    try {
      // Сохраняем оригинальные методы React
      const originalCreateElement = React.createElement;

      // Создаем структуру для хранения информации о компонентах
      const componentStructure = {
        id: props.id || uuidv4(),
        name: Component.displayName || Component.name || 'Component',
        type: ENTITY_KINDS.COMPONENT,
        props: Object.keys(props).map(key => ({ name: key, value: props[key] })),
        children: [],
        jsx: null,
        css: null,
      };

      // Создаем коллекцию для отслеживания компонентов
      const componentsCollection = [];

      // Переопределяем React.createElement для сбора информации о компонентах
      React.createElement = function(type, config, ...children) {
        // Создаем элемент с помощью оригинального метода
        const element = originalCreateElement.apply(this, [type, config, ...children]);

        // Если тип - это функция или класс (компонент), добавляем информацию
        if (typeof type === 'function' || (typeof type === 'object' && type !== null)) {
          const componentName = type.displayName || type.name;

          // Если это не примитивный DOM элемент, а React компонент
          if (componentName && /^[A-Z]/.test(componentName)) {
            componentsCollection.push({
              name: componentName,
              type: 'component',
              props: config || {},
              element,
            });
          }
        }
        // Если тип - строка (HTML элемент), также отслеживаем
        else if (typeof type === 'string') {
          componentsCollection.push({
            name: type,
            type: 'element',
            props: config || {},
            element,
          });
        }

        return element;
      };

      // Рендерим компонент для анализа
      render(React.createElement(Component, props), this.container);

      // Восстанавливаем оригинальный метод
      React.createElement = originalCreateElement;

      // Строим иерархию компонентов
      this.buildComponentHierarchy(componentStructure, componentsCollection);

      // Очищаем контейнер
      unmountComponentAtNode(this.container);

      return componentStructure;
    } catch (error) {
      console.error('Ошибка при анализе компонента:', error);
      return null;
    }
  }

  /**
   * Строит иерархию компонентов из плоской коллекции
   * @param {Object} root - Корневой элемент иерархии
   * @param {Array} components - Коллекция компонентов
   */
  buildComponentHierarchy(root, components) {
    if (!root || !components || !components.length) {return;}

    // Получаем дочерние компоненты первого уровня
    const childComponents = components.filter(component =>
      component.name !== root.name &&
      component.type === 'component',
    );

    // Добавляем их в структуру корневого компонента
    childComponents.forEach(component => {
      const childId = uuidv4();
      const child = {
        id: childId,
        name: component.name,
        type: 'component',
        parentId: root.id,
        props: Object.keys(component.props).map(key => ({
          name: key,
          value: this.serializeValue(component.props[key]),
        })),
        children: [],
      };

      root.children.push(child);

      // Рекурсивно строим иерархию для дочернего компонента
      this.buildComponentHierarchy(child, components);
    });
  }

  /**
   * Сериализует значение пропса в строку
   * @param {any} value - Значение для сериализации
   * @returns {string} Сериализованное значение
   */
  serializeValue(value) {
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
 * Анализирует компонент путем его рендеринга
 * @param {Object} component - Информация о компоненте
 * @param {Object} Component - React компонент для анализа
 * @param {Object} props - Пропсы для компонента
 * @returns {Object} Структура компонента
 */
export const analyzeComponentByRendering = (component, Component, props = {}) => {
  if (!component || !Component) {return null;}

  // Инициализируем рендерер
  const renderer = new ComponentRenderer();

  // Анализируем компонент
  const componentStructure = renderer.analyzeComponent(Component, props);

  // Очищаем ресурсы
  renderer.cleanup();

  return {
    ...component,
    name: component.name || componentStructure.name,
    children: componentStructure.children,
  };
};
