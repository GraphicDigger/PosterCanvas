import { parseSizeFromUI, formatSizeForUI } from '../../../../shared/lib';

// —> UI
export const formatSize = (value) => {
  if (value === '100%') {
    return { displayValue: '', placeholder: 'Fill', isPx: false };
  }

  if (value === 'max-content') {
    return { displayValue: '', placeholder: 'Fit', isPx: false };
  }

  if (value === undefined || value === null) {
    return { displayValue: '', placeholder: 'Auto', isPx: false };
  }

  return formatSizeForUI(value);
};

// —> CSS (специализированный для width/height)
export const parseSize = (value) => {
  // Обрабатываем специальные команды
  if (value === 'Fit') {return 'max-content';}
  if (value === 'Fill') {return '100%';}

  return parseSizeFromUI(value);
};
