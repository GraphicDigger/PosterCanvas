import { z } from 'zod';

//Функция для получения значения по умолчанию
export const getDefaultValue = (zodDef: z.ZodTypeAny): any | undefined => {
  if (zodDef instanceof z.ZodDefault) {
    return zodDef._def.defaultValue();
  }
  return undefined;
};
