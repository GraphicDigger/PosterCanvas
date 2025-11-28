import { z } from 'zod';
import { VARIABLE_TYPES } from '../../../../shared/constants';
import { PropType } from '../helpers/generatePropsMetadata';


//Функция для определения типа пропса из схемы Zod
export const getPropType = (zodDef: z.ZodTypeAny): PropType => {

  if (zodDef instanceof z.ZodEnum) {return VARIABLE_TYPES.ENUM;}
  if (zodDef instanceof z.ZodBoolean) {return VARIABLE_TYPES.BOOLEAN;}
  if (zodDef instanceof z.ZodString) {return VARIABLE_TYPES.STRING;}
  if (zodDef instanceof z.ZodNumber) {return VARIABLE_TYPES.NUMBER;}
  if (zodDef instanceof z.ZodFunction) {return VARIABLE_TYPES.FUNCTION;}
  if (zodDef instanceof z.ZodArray) {return VARIABLE_TYPES.ARRAY;}

  // Для custom типов (ReactNode и SxProps) используем эвристику
  if (zodDef.constructor.name === 'ZodCustom') {
    // Предполагаем ReactNode для определенных имен пропсов
    const reactNodeProps = ['children', 'icon', 'startIcon', 'endIcon', 'content', 'label'];
    const typeName = String(zodDef._def?.typeName || '');

    // Проверяем, содержит ли имя типа или соответствующее свойство ключевые слова React или Node
    if (typeName.includes('React') || typeName.includes('Node') ||
        reactNodeProps.some(prop => typeName.includes(prop))) {
      return VARIABLE_TYPES.NODE;
    }

    return VARIABLE_TYPES.OBJECT;
  }

  return VARIABLE_TYPES.OBJECT;
};
