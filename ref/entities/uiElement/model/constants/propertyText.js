export const fontWeight = [
  { label: 'Thin', value: 100 },
  { label: 'Extra Light', value: 200 },
  { label: 'Light', value: 300 },
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semi Bold', value: 600 },
  { label: 'Bold', value: 700 },
  { label: 'Extra Bold', value: 800 },
  { label: 'Black', value: 900 },
];

// Маппинг font-weight значений
export const FONT_WEIGHT_MAP = {
  // Числовые значения → Названия
  100: 'Thin',
  200: 'Extra Light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
  800: 'Extra Bold',
  900: 'Black',
  // Текстовые значения CSS
  normal: 'Regular',
  bold: 'Bold',
  lighter: 'Light',
  bolder: 'Bold',
};

// Обратный маппинг Названия → Числовые значения
export const WEIGHT_NAME_TO_NUMBER = {
  'Thin': 100,
  'Extra Light': 200,
  'Light': 300,
  'Regular': 400,
  'Medium': 500,
  'Semi Bold': 600,
  'Bold': 700,
  'Extra Bold': 800,
  'Black': 900,
};

export const fontFamily = [
  {
    value: 'Inter',
    label: 'Inter',
  },
  {
    value: 'Arial',
    label: 'Arial',
  },
];

export const textAlign = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
};
