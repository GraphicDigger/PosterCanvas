import { formatColorForUI, parseColorFromUI } from '../../../../shared/lib';

/**
 * Парсит CSS значение box-shadow в объект с отдельными свойствами
 * Поддерживает различные варианты CSS box-shadow:
 * - "2px 2px 5px 1px #000000" -> {offsetX: "2px", offsetY: "2px", blurRadius: "5px", spreadRadius: "1px", color: "#000000", inset: false}
 * - "inset 0 0 10px rgba(0,0,0,0.5)" -> {offsetX: "0", offsetY: "0", blurRadius: "10px", spreadRadius: null, color: "rgba(0,0,0,0.5)", inset: true}
 * - "2px 2px #red" -> {offsetX: "2px", offsetY: "2px", blurRadius: null, spreadRadius: null, color: "#red", inset: false}
 * - "5px 5px 10px" -> {offsetX: "5px", offsetY: "5px", blurRadius: "10px", spreadRadius: null, color: null, inset: false}
 */
export const parseShadow = (value) => {
  if (!value || typeof value !== 'string') {
    return {
      offsetX: null,
      offsetY: null,
      blurRadius: null,
      spreadRadius: null,
      color: null,
      opacity: 100,
      inset: false,
    };
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return {
      offsetX: null,
      offsetY: null,
      blurRadius: null,
      spreadRadius: null,
      color: null,
      opacity: 100,
      inset: false,
    };
  }

  // Проверяем наличие inset
  const isInset = trimmedValue.toLowerCase().includes('inset');
  const workingValue = trimmedValue.replace(/\binset\b/i, '').trim();

  const parts = workingValue.split(/\s+/);

  let offsetX = null;
  let offsetY = null;
  let blurRadius = null;
  let spreadRadius = null;
  let color = null;

  // Регулярные выражения для определения типов значений
  const lengthRegex = /^-?(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/;
  const zeroRegex = /^0$/;
  const colorRegex = /^(#[0-9a-fA-F]{0,8}|rgb\(|rgba\(|hsl\(|hsla\(|[a-zA-Z]+).*$/;

  // Разделяем части на размеры и цвета
  const lengths = [];
  let colorPart = null;

  parts.forEach(part => {
    if (lengthRegex.test(part) || zeroRegex.test(part)) {
      lengths.push(part);
    } else if (colorRegex.test(part) && !colorPart) {
      // Собираем цвет (может содержать скобки и запятые)
      const remainingParts = parts.slice(parts.indexOf(part));
      if (part.includes('(')) {
        // Для rgba, hsla и т.д. - собираем до закрывающей скобки
        let colorString = '';
        let bracketCount = 0;
        for (const colorPartItem of remainingParts) {
          colorString += (colorString ? ' ' : '') + colorPartItem;
          bracketCount += (colorPartItem.match(/\(/g) || []).length;
          bracketCount -= (colorPartItem.match(/\)/g) || []).length;
          if (bracketCount === 0) {break;}
        }
        colorPart = colorString;
      } else {
        colorPart = part;
      }
    }
  });

  if (lengths.length >= 1) {offsetX = lengths[0];}
  if (lengths.length >= 2) {offsetY = lengths[1];}
  if (lengths.length >= 3) {blurRadius = lengths[2];}
  if (lengths.length >= 4) {spreadRadius = lengths[3];}
  color = colorPart;

  const parsedColor = formatColorForUI(color); // parsed opacity

  return {
    offsetX: offsetX || null,
    offsetY: offsetY || null,
    blurRadius: blurRadius || null,
    spreadRadius: spreadRadius || null,
    color: parsedColor.color || null,
    opacity: parsedColor.opacity !== undefined ? parsedColor.opacity : 100,
    inset: isInset,
  };
};

// —> CSS
export const formatShadow = (shadowObj) => {
  if (!shadowObj || typeof shadowObj !== 'object') {
    return '';
  }

  const { offsetX, offsetY, blurRadius, spreadRadius, color, opacity, inset } = shadowObj;
  const parts = [];

  // inset идет в начале
  if (inset) {
    parts.push('inset');
  }

  // Обязательные значения - offsetX и offsetY (по умолчанию '0')
  const finalOffsetX = offsetX !== null && offsetX !== '' ? offsetX : '0';
  const finalOffsetY = offsetY !== null && offsetY !== '' ? offsetY : '0';

  parts.push(finalOffsetX);
  parts.push(finalOffsetY);

  // Опциональные значения (blur и spread тоже могут быть '0')
  const finalBlurRadius = blurRadius !== null && blurRadius !== '' ? blurRadius : '0';
  const finalSpreadRadius = spreadRadius !== null && spreadRadius !== '' ? spreadRadius : '0';

  parts.push(finalBlurRadius);
  parts.push(finalSpreadRadius);

  // Форматируем цвет с учетом прозрачности
  if (color !== null) {
    // Если opacity пустой или undefined, используем 100 по умолчанию
    const finalOpacity = (opacity === '' || opacity === null || opacity === undefined) ? 100 : opacity;
    const formattedColor = parseColorFromUI(color, finalOpacity);
    if (formattedColor) {
      parts.push(formattedColor);
    }
  }

  return parts.join(' ');
};

/**
 * Парсит множественные box-shadow значения (разделенные запятыми)
 * Поддерживает:
 * - "2px 2px 5px red, inset 0 0 10px blue" -> массив из двух shadow объектов
 * - "5px 5px 10px #000" -> массив из одного shadow объекта
 */
export const parseMultipleShadows = (value) => {
  if (!value || typeof value !== 'string') {
    return [];
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return [];
  }

  // Разделяем по запятым, учитывая что цвета могут содержать запятые
  const shadowStrings = [];
  let currentShadow = '';
  let bracketCount = 0;

  for (let i = 0; i < trimmedValue.length; i++) {
    const char = trimmedValue[i];

    if (char === '(') {
      bracketCount++;
    } else if (char === ')') {
      bracketCount--;
    } else if (char === ',' && bracketCount === 0) {
      if (currentShadow.trim()) {
        shadowStrings.push(currentShadow.trim());
      }
      currentShadow = '';
      continue;
    }

    currentShadow += char;
  }

  // Добавляем последнюю тень
  if (currentShadow.trim()) {
    shadowStrings.push(currentShadow.trim());
  }

  return shadowStrings.map(shadowString => parseShadow(shadowString));
};

// —> CSS
export const formatMultipleShadows = (shadows) => {
  if (!Array.isArray(shadows) || shadows.length === 0) {
    return '';
  }

  return shadows
    .map(shadow => formatShadow(shadow))
    .filter(shadowString => shadowString !== '')
    .join(', ');
};
