// —> UI
export const parseOpacity = (cssOpacity) => {
  if (cssOpacity === undefined || cssOpacity === null || cssOpacity === '') {
    return 100; // По умолчанию полная непрозрачность
  }

  const numericValue = typeof cssOpacity === 'string' ? parseFloat(cssOpacity) : cssOpacity;

  if (isNaN(numericValue)) {
    return 100;
  }

  // Конвертируем из 0-1 в 0-100
  const uiValue = Math.round(numericValue * 100);
  return Math.max(0, Math.min(100, uiValue));
};

// —> CSS
export const formatOpacity = (uiOpacity) => {
  if (uiOpacity === undefined || uiOpacity === null || uiOpacity === '') {
    return 1; // По умолчанию полная непрозрачность
  }

  const numericValue = typeof uiOpacity === 'string' ? parseFloat(uiOpacity) : uiOpacity;

  if (isNaN(numericValue)) {
    return 1;
  }

  // Конвертируем из 0-100 в 0-1
  const cssValue = numericValue / 100;
  return Math.max(0, Math.min(1, cssValue));
};
