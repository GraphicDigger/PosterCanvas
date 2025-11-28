export { componentFactory } from './componentFactory';
export { normalizePropList, createBasicElements, createComponentVariants } from './normalizePropList';
export { normalizeComponent } from './normalizeComponent';
export { normalizeCode } from './normalizeCode';

export { buildComponentHierarchy } from '../archive_lib/componentBuildHierarchy';
export { analyzeComponentStructure } from '../archive_lib/componentAnalyzeStructure';
export { parseComponentSource } from './classes/componentJSXParser';
export { ComponentRenderer, VirtualDOMAnalyzer, JSXParser } from './classes';

// Экспорт новых функций для анализа компонентов с помощью рендеринга
export {
  analyzeComponentStructureWithRendering,
  analyzeComponentByPath,
} from '../archive_lib';

export { dynamicComponentAnalyzer } from './componentDynamicAnalyzer';
export { analyzeComponent } from '../archive_lib/componentAnalyze';
export { generateTestProps } from '../archive_lib/generateTestProps';

export { generateStyles } from '../archive_lib/generateJSXBodyStyles';
export { generatePropAssignments } from '../archive_lib/propAssignments';
export { generateImports } from '../archive_lib/generateJSXImports';
export { generateComponentBody } from '../archive_lib/generateJSXBody';
export { generateChildrenJSX } from '../archive_lib/generateJSXBodyChildren';
export { generateJSX } from '../archive_lib/generateJSX';
