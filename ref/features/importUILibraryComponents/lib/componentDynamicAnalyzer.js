import { ENTITY_KINDS } from '../../../shared/constants';
import { v4 as uuidv4 } from 'uuid';
import { readComponentSource } from './utils/readComponentSource';
import { processJSDocComments } from './utils/processJSDocComments';
import { extractCleanComponent } from './utils/extractCleanComponent';

// Динамический анализатор компонента для получения метаданных
export const dynamicComponentAnalyzer = async (component) => {
  if (!component || !component.importPath) {
    return component;
  }


  try {
    // Загружаем модуль компонента
    const module = await import(/* @vite-ignore */ component.importPath);
    // Получаем исходный код компонента
    const sourceCode = await readComponentSource(component.importPath);

    // Получаем основной экспорт откуда извлекаем метаданные docgen
    const defaultExport = module.default;
    const originalDocgenInfo = defaultExport?.__docgenInfo;

    // Обрабатываем метаданные из JSDoc комментариев
    const processedDocgenInfo = processJSDocComments(originalDocgenInfo);

    // Форматируем метаданные для вывода
    const metadata = processedDocgenInfo ? {
      displayName: processedDocgenInfo.displayName,
      description: processedDocgenInfo.description,
      props: Object.entries(processedDocgenInfo.props || {}).map(([key, prop]) => {
        // Извлекаем значения из массива объектов type.value
        let extractedValues = [];
        if (prop.type?.value && Array.isArray(prop.type.value)) {
          extractedValues = prop.type.value.map(item => {
            // Если значение - объект с полем value, извлекаем его
            if (item && typeof item === 'object' && 'value' in item) {
              // Убираем кавычки из строкового значения
              return item.value.replace(/^['"]|['"]$/g, '');
            }
            // Если просто значение, возвращаем его как строку
            return String(item);
          });
        }

        return {
          name: prop.name,
          description: prop.description,
          type: prop.type?.name,
          values: extractedValues, // Используем извлеченные значения
          required: prop.required,
          defaultValue: typeof prop.defaultValue?.value === 'object'
            ? JSON.stringify(prop.defaultValue.value)
            : prop.defaultValue?.value,
        };
      }),
    } : null;

    // Пробуем получить чистый код из исходника
    let jsxCode = null;
    if (sourceCode) {
      jsxCode = extractCleanComponent(sourceCode);
    }

    if (!jsxCode) {
      console.error('[dynamicAnalyzer] Failed to extract clean code');
      return component;
    }

    const analizedComponent = {
      id: component.id,
      name: metadata?.displayName || component.name,
      props: metadata?.props || [],
      jsx: jsxCode,
    };

    return analizedComponent;

  } catch (error) {
    console.error(`Ошибка при анализе компонента ${component.name}:`, error);
    return component;
  }
};
