import { layoutElements } from './layout';
import { formElements } from './forms';
import { typographyElements } from './typography';
import { ElementTemplate } from '../types';

// Единый список всех доступных шаблонов
export const ELEMENT_REGISTRY: ElementTemplate[] = [
  ...layoutElements,
  ...formElements,
  ...typographyElements
];

// Хелпер для быстрого поиска шаблона по типу
export const getTemplateByType = (type: string) => 
  ELEMENT_REGISTRY.find(t => t.type === type);

