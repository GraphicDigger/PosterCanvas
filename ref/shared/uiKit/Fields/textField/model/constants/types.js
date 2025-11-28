// Типы полей
export const FIELD_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  // Добавляйте новые типы здесь
};

// Паттерны для валидации
export const FIELD_PATTERNS = {
  EMAIL: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  PHONE: '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$',
  // Добавляйте новые паттерны здесь
};
