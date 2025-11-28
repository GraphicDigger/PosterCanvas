import { FONT_WEIGHT_MAP, WEIGHT_NAME_TO_NUMBER } from '../../../../entities/uiElement';

// —> UI
export const formatWeightForUI = (value) => {
  if (value === undefined || value === null) {
    return { displayValue: '', placeholder: 'Regular', weight: 400 };
  }

  // Если font-weight равен стандартному значению 400, показываем placeholder
  if (value === 400 || value === 'normal') {
    return { displayValue: '', placeholder: 'Regular', weight: 400 };
  }

  // Если пришло число
  if (typeof value === 'number' || !isNaN(Number(value))) {
    const numValue = Number(value);
    const weightName = FONT_WEIGHT_MAP[numValue] || 'Regular';
    return {
      displayValue: weightName,
      placeholder: '',
      weight: numValue,
    };
  }

  // Если пришла строка (normal, bold, etc.)
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase();
    const weightName = FONT_WEIGHT_MAP[lowerValue] || value;
    const weightNumber = WEIGHT_NAME_TO_NUMBER[weightName] || 400;
    return {
      displayValue: weightName,
      placeholder: '',
      weight: weightNumber,
    };
  }

  return { displayValue: 'Regular', placeholder: '', weight: 400 };
};

// —> CSS
export const parseWeightFromUI = (value) => {
  console.log('[parseWeightFromUI] input:', value, 'type:', typeof value);

  if (value === null || value === undefined) {
    console.log('[parseWeightFromUI] null/undefined, returning 400');
    return 400;
  }

  // Если передано число напрямую
  if (typeof value === 'number') {
    console.log('[parseWeightFromUI] number, returning:', value);
    return value;
  }

  const stringValue = String(value).trim();
  if (stringValue === '') {
    console.log('[parseWeightFromUI] empty string, returning 400');
    return 400;
  }

  // Если передано название веса
  const weightNumber = WEIGHT_NAME_TO_NUMBER[stringValue];
  if (weightNumber) {
    console.log('[parseWeightFromUI] found weight name:', stringValue, '→', weightNumber);
    return weightNumber;
  }

  // Если передано число как строка
  const num = Number(stringValue);
  if (!isNaN(num) && num >= 100 && num <= 900) {
    console.log('[parseWeightFromUI] parsed number:', stringValue, '→', num);
    return num;
  }

  // По умолчанию Regular
  console.log('[parseWeightFromUI] fallback to 400 for:', stringValue);
  return 400;
};
