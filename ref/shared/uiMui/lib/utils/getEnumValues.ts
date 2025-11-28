import { z } from 'zod';

//Функция для получения возможных значений для enum
export const getEnumValues = (zodDef: z.ZodTypeAny): any[] | undefined => {
  if (zodDef instanceof z.ZodEnum) {
    return zodDef._def.values;
  }
  return undefined;
};
