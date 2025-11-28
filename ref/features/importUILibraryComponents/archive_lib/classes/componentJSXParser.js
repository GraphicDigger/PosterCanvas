import { v4 as uuidv4 } from 'uuid';

/**
 * Класс для парсинга и анализа JSX кода компонента
 * Извлекает вложенные компоненты и строит иерархию
 */
export class JSXParser {
  /**
   * Анализирует JSX код компонента и извлекает вложенные элементы
   * @param {string} jsxCode - JSX код компонента
   * @param {Object} component - Основная информация о компоненте
   * @returns {Object} Информация о компоненте с вложенными элементами
   */
  static parseComponentJSX(jsxCode, component) {
    if (!jsxCode || !component) {
      console.error('JSXParser: отсутствует код JSX или информация о компоненте');
      return null;
    }

    try {
      // Базовая структура компонента
      const componentStructure = {
        id: component.id || uuidv4(),
        name: component.name,
        type: 'component',
        importPath: component.importPath,
        propIds: component.propIds || [],
        children: [],
        imports: this.extractImports(jsxCode),
        jsx: jsxCode,
        css: null,
      };

      // Извлекаем все вложенные компоненты
      this.extractNestedComponents(jsxCode, componentStructure);

      return componentStructure;
    } catch (error) {
      console.error('Ошибка при парсинге JSX:', error);
      return null;
    }
  }

  /**
   * Извлекает импорты из кода JSX
   * @param {string} jsxCode - JSX код компонента
   * @returns {Array} Массив импортов компонента
   */
  static extractImports(jsxCode) {
    if (!jsxCode) {return [];}

    const imports = [];
    const importRegex = /import\s+(?:(?:{[^}]+}\s+from\s+)|(?:([A-Za-z0-9_$]+)\s+from\s+)|(?:\*\s+as\s+([A-Za-z0-9_$]+)\s+from\s+))?['"]([^'"]+)['"]/g;

    let match;
    while ((match = importRegex.exec(jsxCode)) !== null) {
      const importPath = match[3];

      // Если не указан конкретный импорт, считаем что это дефолтный импорт
      if (match[1]) {
        imports.push({
          type: 'default',
          name: match[1],
          path: importPath,
        });
      }
      // Если есть фигурные скобки, это именованный импорт
      else if (match[0].includes('{')) {
        const namedImportsStr = match[0].match(/{([^}]+)}/)[1];
        const namedImports = namedImportsStr.split(',').map(imp => imp.trim());

        namedImports.forEach(namedImport => {
          // Обрабатываем 'as' алиасы
          const aliasMatch = namedImport.match(/([A-Za-z0-9_$]+)\s+as\s+([A-Za-z0-9_$]+)/);
          if (aliasMatch) {
            imports.push({
              type: 'named',
              name: aliasMatch[1],
              alias: aliasMatch[2],
              path: importPath,
            });
          } else {
            imports.push({
              type: 'named',
              name: namedImport,
              path: importPath,
            });
          }
        });
      }
      // Импорт с "* as Name"
      else if (match[2]) {
        imports.push({
          type: 'namespace',
          name: match[2],
          path: importPath,
        });
      }
    }

    return imports;
  }

  /**
   * Извлекает вложенные компоненты из JSX кода
   * @param {string} jsxCode - JSX код компонента
   * @param {Object} componentStructure - Структура компонента для добавления вложенных элементов
   * @returns {Array} Массив вложенных компонентов
   */
  static extractNestedComponents(jsxCode, componentStructure) {
    if (!jsxCode || !componentStructure) {return [];}

    // 1. Ищем все JSX тэги в коде (включая самозакрывающиеся и стандартные)
    const jsxTagsRegex = /<([A-Z][A-Za-z0-9]*|[a-z]+)(\s+[^>]*?)?(\/?>)/g;

    let match;
    const components = [];

    while ((match = jsxTagsRegex.exec(jsxCode)) !== null) {
      const tagName = match[1];
      const attributes = match[2] || '';
      const isSelfClosing = match[3] === '/>';

      // Если тег начинается с заглавной буквы, это React компонент
      if (/^[A-Z]/.test(tagName)) {
        const component = {
          id: uuidv4(),
          type: 'component',
          name: tagName,
          parentId: componentStructure.id,
          props: this.extractProps(attributes),
          children: [],
        };

        components.push(component);
        componentStructure.children.push(component);

        // Если компонент не самозакрывающийся, нужно найти его закрывающий тег
        // и проанализировать внутренности (будущее улучшение)
        if (!isSelfClosing) {
          // Рекурсивный анализ вложенных компонентов
          // может быть добавлен для более сложных случаев
        }
      }
      // Если тег в нижнем регистре, это HTML элемент (div, span, etc.)
      else if (tagName && tagName.length > 0) {
        const element = {
          id: uuidv4(),
          type: 'element',
          name: tagName,
          parentId: componentStructure.id,
          props: this.extractProps(attributes),
          children: [],
        };

        components.push(element);
        componentStructure.children.push(element);
      }
    }

    return components;
  }

  /**
   * Извлекает пропсы из строки атрибутов JSX
   * @param {string} attributesStr - Строка атрибутов JSX
   * @returns {Array} Массив пропсов
   */
  static extractProps(attributesStr) {
    if (!attributesStr) {return [];}

    const props = [];
    // Регулярное выражение для извлечения атрибутов
    const propsRegex = /([A-Za-z0-9_$]+)(?:=(?:["']([^"']*)["']|{([^{}]*)}|{`([^`]*)`}))?/g;

    let match;
    while ((match = propsRegex.exec(attributesStr)) !== null) {
      const propName = match[1];
      let propValue;

      // Строковое значение в кавычках
      if (match[2] !== undefined) {
        propValue = match[2];
      }
      // Выражение в фигурных скобках
      else if (match[3] !== undefined) {
        propValue = match[3];
      }
      // Шаблонная строка в фигурных скобках и обратных кавычках
      else if (match[4] !== undefined) {
        propValue = match[4];
      }
      // Булево значение (без значения)
      else {
        propValue = true;
      }

      props.push({
        name: propName,
        value: propValue,
      });
    }

    return props;
  }
}

/**
 * Анализирует компонент на основе его JSX кода
 * @param {Object} component - Компонент для анализа
 * @param {string} jsxCode - JSX код компонента (опционально)
 * @returns {Object} Структура компонента с информацией о вложенных элементах
 */
export const parseComponentSource = (component, jsxCode) => {
  if (!component) {return null;}

  // Если JSX код не предоставлен, ищем его в компоненте
  const code = jsxCode || component.jsx || '';

  // Анализируем JSX код и строим структуру компонента
  const parsedStructure = JSXParser.parseComponentJSX(code, component);

  return parsedStructure;
};
