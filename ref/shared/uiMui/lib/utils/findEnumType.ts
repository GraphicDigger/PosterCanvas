import { z } from 'zod';

// Функция для глубокого исследования типа Zod
// Ищет ZodEnum внутри возможно-вложенных типов
export const findEnumType = (zodDef: z.ZodTypeAny): z.ZodEnum<any> | null => {
  // Проверяем, является ли текущий тип ZodEnum
  if (zodDef instanceof z.ZodEnum) {
    return zodDef;
  }

  // Проверяем внутренний тип для ZodOptional и ZodDefault
  if (zodDef instanceof z.ZodOptional || zodDef instanceof z.ZodDefault) {
    return findEnumType(zodDef._def.innerType);
  }

  // Проверяем внутренний тип для нативных enum
  if (zodDef instanceof z.ZodNativeEnum) {
    // Преобразуем нативный enum в массив значений
    return null; // Тут мы просто определяем тип, значения получим позже
  }

  // Для других типов возвращаем null
  return null;
};
