import { z } from 'zod';

//Функция для извлечения внутреннего типа из Optional или Default
export const unwrapType = (zodDef: z.ZodTypeAny): z.ZodTypeAny => {
  let baseType = zodDef;
  if (baseType instanceof z.ZodOptional) {
    baseType = baseType._def.innerType;
  }
  if (baseType instanceof z.ZodDefault) {
    baseType = baseType._def.innerType;
  }
  return baseType;
};
