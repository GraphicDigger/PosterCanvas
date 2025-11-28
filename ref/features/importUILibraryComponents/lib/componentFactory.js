import { normalizePropList, createBasicElements, createComponentVariants } from './normalizePropList';
import { normalizeCode } from './normalizeCode';
import { normalizeComponent } from './normalizeComponent';
import { buildComponentHierarchy } from '../archive_lib/componentBuildHierarchy';
import { analyzeComponentStructure } from '../archive_lib/componentAnalyzeStructure';
import { dynamicComponentAnalyzer } from './componentDynamicAnalyzer';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../shared/constants';


// Создает полные данные компонента для импорта в хранилище
export const componentFactory = async (component, libraryInfo = null) => {

  if (!component) {return null;}
  console.log('[factory] SOURCE component: ', component);

  const analizedComponent = await dynamicComponentAnalyzer(component);
  console.log('[factory] ANALYZED component: ', analizedComponent);

  const normalizedComponent = normalizeComponent(analizedComponent, libraryInfo);
  console.log('[factory] NORMALIZED component: ', normalizedComponent);

  const normalizedCodes = normalizeCode(analizedComponent);
  console.log('[factory] NORMALIZED codes: ', normalizedCodes);

  const { normalizedProps, normalizedPropValues, propIds } = normalizePropList(analizedComponent);
  console.log('[factory] NORMALIZED props: ', normalizedProps);
  console.log('[factory] NORMALIZED propValues: ', normalizedPropValues);


  // Создаем элементы компонента
  const elementIds = createBasicElements(component);
  if (!elementIds) {return null;}

  // Создаем варианты компонента
  const variants = createComponentVariants(component, normalizedProps);
  if (!variants) {return null;}

  const structure = null;

  return {
    component: normalizedComponent,
    props: normalizedProps,
    propValues: normalizedPropValues,
    codes: normalizedCodes,
    elements: elementIds.map(id => ({
      id,
      name: `${component.name} Element`,
      kind: ENTITY_KINDS.ELEMENT,
      componentId: normalizedComponent.id,
    })),
  };
};
