import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { VARIABLE_TYPES } from '../../../constants/variableTypes';
import { getEnumValues } from '../utils/getEnumValues';
import { getDefaultValue } from '../utils/getDefaultValue';
import { unwrapType } from '../utils/unwrapType';
import { getPropType } from '../utils/getPropType';
import { findEnumType } from '../utils/findEnumType';

export type PropType = typeof VARIABLE_TYPES[keyof typeof VARIABLE_TYPES];

export interface PropMetadata {
  id: string;
  propName: string;
  type: PropType;
  values?: readonly any[];
  defaultValue?: any;
  description?: string;
}

//Опции для генерации метаданных
export interface GenerateMetadataOptions {
  defaultValues?: Record<string, any>;
  descriptions?: Record<string, string>;
  enumValues?: Record<string, readonly any[]>;
  enumProps?: string[];
  getType?: (propName: string, zodDef: z.ZodTypeAny) => PropType;
}


//Генерирует метаданные на основе схемы Zod
export const generatePropsMetadata = <T extends z.ZodObject<any>>(
  schema: T,
  options: GenerateMetadataOptions = {},
): PropMetadata[] => {

  const { defaultValues = {}, descriptions = {}, enumValues = {}, enumProps = [] } = options;

  return Object.entries(schema.shape).map(([propName, zodDef]) => {
    // Получаем базовый тип (без optional, default и т.д.)
    const baseType = unwrapType(zodDef as z.ZodTypeAny);

    // Проверяем, есть ли enum где-то глубже в структуре типа
    const enumType = findEnumType(zodDef as z.ZodTypeAny);

    // Определяем тип пропса
    let propType: PropType;

    // Если propName указан в enumProps, или мы нашли ZodEnum внутри типа,
    // или в enumValues есть ключ с именем propName
    if (
      enumProps.includes(propName) ||
      enumType !== null ||
      propName in enumValues
    ) {
      propType = VARIABLE_TYPES.ENUM;
    } else {
      propType = options.getType
        ? options.getType(propName, baseType)
        : getPropType(baseType);
    }

    // Для известных пропсов используем предопределенные значения
    const defaultValue = propName in defaultValues
      ? defaultValues[propName]
      : getDefaultValue(zodDef as z.ZodTypeAny);

    // Для enum-типов определяем возможные значения
    let values: any[] | undefined = undefined;

    if (propType === VARIABLE_TYPES.ENUM) {
      // По умолчанию для enum у нас пустой массив
      values = [];

      // Сначала проверяем, есть ли значения в enumValues
      if (propName in enumValues) {
        const enumValuesList = enumValues[propName];
        if (enumValuesList && Array.isArray(enumValuesList)) {
          values = [...enumValuesList];
        }
      }
      // Если нет, пытаемся получить значения из самой схемы или найденного enum
      else {
        // Сначала пробуем через найденный enumType
        if (enumType && enumType._def.values) {
          values = [...enumType._def.values];
        } else {
          // Затем пробуем через стандартную функцию getEnumValues
          const schemaValues = getEnumValues(baseType);
          if (schemaValues && Array.isArray(schemaValues)) {
            values = [...schemaValues];
          }
        }
      }
    }

    const result: PropMetadata = {
      id: uuidv4(),
      propName,
      type: propType,
    };

    // Всегда добавляем values для enum-типа
    if (propType === VARIABLE_TYPES.ENUM) {
      result.values = values || [];
    }

    // Добавляем остальные поля, если они есть
    if (defaultValue !== undefined) {
      result.defaultValue = defaultValue;
    }

    if (descriptions[propName]) {
      result.description = descriptions[propName];
    }

    return result;
  });
};
