import { generateImports } from './generateJSXImports';
import { generateComponentBody } from './generateJSXBody';


// Генерирует JSX код компонента на основе его структуры
export const generateJSX = (componentStructure) => {
  if (!componentStructure) {return '';}

  // Генерируем импорты
  const imports = generateImports(componentStructure);

  // Генерируем JSX для самого компонента
  const componentJSX = generateComponentBody(componentStructure);

  // Собираем всё вместе
  return `${imports}\n\n${componentJSX}\n\nexport default ${componentStructure.name};`;
};
