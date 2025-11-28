

// Генерирует импорты компонента
export const generateImports = (componentStructure) => {
  if (!componentStructure || !componentStructure.importPath) {return '';}

  // Получаем название библиотеки из importPath
  const libraryName = componentStructure.importPath.split('/')[0];

  // Собираем импорты компонентов
  const componentImports = [`import { ${componentStructure.name} } from '${componentStructure.importPath}';`];

  // Импорты для React и стилей
  const baseImports = [
    "import React from 'react';",
    "import { makeStyles } from '@mui/styles';",
  ];

  // Собираем все импорты
  return [...baseImports, ...componentImports].join('\n');
};
