import { STYLE_PROPERTIES } from '../../../entities/uiElement';

// —> UI
export const formatSizeForUI = (value) => {
  if (value === undefined || value === null) {
    return { displayValue: '', placeholder: 'Auto', isPx: false };
  }

  if (typeof value === 'string' && value.trim().endsWith('px')) {
    return { displayValue: value.trim().slice(0, -2), placeholder: '', isPx: true };
  }

  if (typeof value === 'number') {
    return { displayValue: value.toString(), placeholder: '', isPx: false };
  }

  if (typeof value === 'string') {
    return { displayValue: value, placeholder: '', isPx: false };
  }

  return { displayValue: value, placeholder: '', isPx: false };
};


// —> CSS
export const parseSizeFromUI = (value) => {
  if (value === null || value === undefined) {return value;}

  const stringValue = String(value).trim();
  if (stringValue === '') {return undefined;}

  const num = Number(stringValue);
  if (!isNaN(num)) {return `${num}px`;}

  return value;
};
