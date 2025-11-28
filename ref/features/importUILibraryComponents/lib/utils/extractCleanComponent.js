/**
 * Универсальный экстрактор чистого кода компонентов React
 */

//Извлекает чистый код React компонента
export const extractCleanComponent = (sourceCode) => {
  if (!sourceCode) {return '';}

  try {
    // Если код начинается с кавычек - парсим его как JSON строку
    let code = sourceCode;
    if (typeof sourceCode === 'string' && (sourceCode.startsWith('"') || sourceCode.startsWith("'"))) {
      code = JSON.parse(sourceCode);
    }

    return removeViteArtifacts(code);
  } catch (error) {
    console.error('Ошибка при извлечении чистого кода:', error);
    return sourceCode;
  }
};

//Удаляет артефакты Vite из кода и форматирует его
function removeViteArtifacts(code) {
  return code
    // Удаляем export default в начале если есть
    .replace(/^export\s+default\s+["']/, '')
    // Удаляем точку с запятой в конце если есть
    .replace(/["'];$/, '')
    // Заменяем экранированные символы на реальные
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\t/g, '  ')
    // Удаляем Vite HMR код
    .replace(/import\s*\{\s*createHotContext[^\n]+\n/g, '')
    .replace(/import\.meta\.hot[^\n]+\n/g, '')
    .replace(/const\s+inWebWorker[^\n]+\n/g, '')
    .replace(/if\s*\(import\.meta\.hot[^}]+}\n/g, '')
    .replace(/RefreshRuntime[^\n]+\n/g, '')
    .replace(/\$Refresh[^\n]+\n/g, '')
    .replace(/if\s*\([^)]+\)\s*\{\s*RefreshRuntime[^}]+}\)/g, '')
    // Очищаем импорты и JSX
    .replace(/import\s+__vite__cjsImport\d+_\w+\s+from[^;]+;[^;]+;/g, '')
    .replace(/from\s+"\/node_modules\/\.vite\/deps\/([^"]+)\.js\?[^"]+"/g, 'from "$1"')
    .replace(/\/\*\s*@__PURE__\s*\*\/\s*/g, '')
    .replace(/jsxDEV/g, 'jsx')
    .replace(/,\s*void\s+0,\s*(?:false|true),\s*\{[^}]+\},\s*this/g, '')
    .replace(/children:\s*\[([^\]]+)\]/g, 'children: $1')
    // Удаляем мета-информацию
    .replace(/\/\/# sourceMappingURL=[^\n]+/g, '')
    // Удаляем лишние пробелы и переносы строк
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

// //Находит компонент в объекте с экспортами
// function findComponentInObject(obj) {
//   // Сначала ищем в default export
//   if (obj.default && typeof obj.default === 'function') {
//     return obj.default;
//   }

//   // Ищем в именованных экспортах (React компоненты обычно с большой буквы)
//   for (const key in obj) {
//     if (typeof obj[key] === 'function' && /^[A-Z]/.test(key)) {
//       return obj[key];
//     }
//   }

//   return null;
// }

// /**
//  * Проверяет, является ли код HOC-компонентом
//  * @param {string} code - Код компонента
//  * @returns {boolean} - Результат проверки
//  */
// function isHOCComponent(code) {
//   return (
//     code.includes('props)') &&
//     (code.includes('Schema.parse(props)') || code.includes('validProps'))
//   );
// }

// /**
//  * Проверяет, является ли код функциональным компонентом
//  * @param {string} code - Код компонента
//  * @returns {boolean} - Результат проверки
//  */
// function isFunctionComponent(code) {
//   return (
//     (code.includes('=>') || code.includes('function')) &&
//     (code.includes('return') && (code.includes('jsx') || code.includes('<')))
//   );
// }

// /**
//  * Очищает код HOC-компонента
//  * @param {string} code - Код HOC-компонента
//  * @returns {string} - Очищенный код
//  */
// function cleanHOCComponent(code) {
//   // Удаляем артефакты Vite
//   code = removeViteArtifacts(code);

//   // Извлекаем имя схемы и компонента
//   const schemaMatch = code.match(/(\w+)Schema\.parse\(props\)/);
//   const componentMatch = code.match(/[<]([A-Z]\w+)\s/);

//   const schemaName = schemaMatch ? schemaMatch[1] : 'component';
//   const componentName = componentMatch ? componentMatch[1] : 'Component';

//   // Формируем чистый код HOC
//   return `// HOC компонент для валидации пропсов
// import React from 'react';
// import { ${componentName} } from '@mui/material/${componentName}';
// import { z } from 'zod';

// // Схема валидации для ${componentName}
// const ${schemaName}Schema = z.object({
//   variant: z.string().optional(),
//   color: z.string().optional(),
//   size: z.string().optional(),
//   // другие свойства могут быть добавлены здесь
// });

// /**
//  * ${componentName} с валидацией пропсов через Zod
//  */
// const ${schemaName}${componentName} = (props) => {
//   // Валидация пропсов
//   const validProps = ${schemaName}Schema.parse(props);

//   // Возвращаем компонент с валидированными пропсами
//   return (
//     <${componentName}
//       variant={validProps.variant}
//       color={validProps.color}
//       size={validProps.size}
//       {...validProps}
//     />
//   );
// };

// export default ${schemaName}${componentName};`;
// }

// //Очищает код функционального компонента
// function cleanFunctionComponent(code) {
//   // Удаляем артефакты Vite
//   code = removeViteArtifacts(code);

//   // Если код уже содержит импорты и экспорты, возвращаем его как есть
//   if (code.includes('import React') && code.includes('export')) {
//     return code;
//   }

//   // Извлекаем имя компонента, если есть
//   const nameMatch = code.match(/(?:function|const)\s+([A-Z]\w+)/);
//   const componentName = nameMatch ? nameMatch[1] : 'Component';

//   // Очищаем JSX
//   code = code.replace(/jsx\(/g, '<')
//     .replace(/\)/g, '>')
//     .replace(/,\s*{/g, ' {')
//     .replace(/}\s*$/g, '}');

//   // Форматируем как чистый компонент
//   return `import React from 'react';

// ${code}

// export default ${componentName};`;
// }

