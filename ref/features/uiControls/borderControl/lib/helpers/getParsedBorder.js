/**
 * Парсит CSS значение border в объект с отдельными свойствами
 * Поддерживает различные варианты CSS border:
 * - "1px solid #000000" -> {width: "1px", style: "solid", color: "#000000"}
 * - "2px dashed" -> {width: "2px", style: "dashed", color: null}
 * - "solid red" -> {width: null, style: "solid", color: "red"}
 * - "3px" -> {width: "3px", style: null, color: null}
 */
export const parseBorder = (value) => {
  if (!value || typeof value !== 'string') {
    return { width: null, style: null, color: null };
  }

  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return { width: null, style: null, color: null };
  }

  const parts = trimmedValue.split(/\s+/);

  let width = null;
  let style = null;
  let color = null;

  const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
  const widthRegex = /^(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/;
  const colorRegex = /^(#[0-9a-fA-F]{0,8}|rgb\(|rgba\(|hsl\(|hsla\(|[a-zA-Z]+).*$/;

  parts.forEach(part => {
    // Проверяем, является ли часть шириной
    if (widthRegex.test(part) && !width) {
      width = part;
    }
    // Проверяем, является ли часть стилем
    else if (borderStyles.includes(part.toLowerCase()) && !style) {
      style = part;
    }
    // Проверяем, является ли часть цветом
    else if (colorRegex.test(part) && !color) {
      color = part;
    }
  });

  return {
    width: width || null,
    style: style || null,
    color: color || null,
  };
};

/**
 * Конвертирует объект border обратно в CSS строку
 * borderObj - объект с свойствами {width, style, color}
 */
export const formatBorder = (borderObj) => {
  if (!borderObj || typeof borderObj !== 'object') {
    return '';
  }

  const { width, style, color } = borderObj;
  const parts = [];

  if (width) {parts.push(width);}
  if (style) {parts.push(style);}
  if (color) {parts.push(color);}

  return parts.join(' ');
};

/**
 * Парсит комплексные border значения для всех сторон
 * Поддерживает как shorthand, так и отдельные значения:
 * - "1px solid red" -> применяется ко всем сторонам
 * - {top: "1px solid red", right: "2px dashed blue"} -> разные значения для сторон
 */
export const parseBorderSides = (value) => {
  if (!value) {
    return {
      top: { width: null, style: null, color: null },
      right: { width: null, style: null, color: null },
      bottom: { width: null, style: null, color: null },
      left: { width: null, style: null, color: null },
    };
  }

  // Если это строка - применяем ко всем сторонам
  if (typeof value === 'string') {
    const parsed = parseBorder(value);
    return {
      top: parsed,
      right: parsed,
      bottom: parsed,
      left: parsed,
    };
  }

  // Если это объект - парсим каждую сторону отдельно
  if (typeof value === 'object') {
    return {
      top: parseBorder(value.top),
      right: parseBorder(value.right),
      bottom: parseBorder(value.bottom),
      left: parseBorder(value.left),
    };
  }

  return {
    top: { width: null, style: null, color: null },
    right: { width: null, style: null, color: null },
    bottom: { width: null, style: null, color: null },
    left: { width: null, style: null, color: null },
  };
};
