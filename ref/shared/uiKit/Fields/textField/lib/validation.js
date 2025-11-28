import { FIELD_TYPES, FIELD_PATTERNS } from '../constants/types';

// Базовые правила валидации
export const VALIDATION_RULES = {
  required: (value) => !!value?.trim(),
  email: (value) => new RegExp(FIELD_PATTERNS.EMAIL).test(value),
  phone: (value) => new RegExp(FIELD_PATTERNS.PHONE).test(value),
  minLength: (value, min) => value.length >= min,
  maxLength: (value, max) => value.length <= max,
  pattern: (value, pattern) => new RegExp(pattern).test(value),
  // Добавляйте новые правила здесь
};

// Функция для создания валидатора поля
export const createFieldValidator = (rules = {}) => (value) => {
  const errors = [];

  Object.entries(rules).forEach(([rule, ruleValue]) => {
    const validator = VALIDATION_RULES[rule];
    if (validator && !validator(value, ruleValue)) {
      errors.push(rule);
    }
  });

  return errors;
};

// Предустановленные валидаторы для разных типов полей
export const DEFAULT_VALIDATORS = {
  [FIELD_TYPES.EMAIL]: createFieldValidator({
    required: true,
    email: true,
  }),
  [FIELD_TYPES.NUMBER]: createFieldValidator({
    required: true,
    pattern: '^\\d+$',
  }),
  // Добавляйте валидаторы для новых типов полей здесь
};
