/**
 * Парсит CSS значения padding/margin в объект с отдельными значениями
 * Поддерживает все варианты CSS shorthand:
 * - "12px" -> {top: "12px", right: "12px", bottom: "12px", left: "12px"}
 * - "12px 8px" -> {top: "12px", right: "8px", bottom: "12px", left: "8px"}
 * - "12px 8px 4px" -> {top: "12px", right: "8px", bottom: "4px", left: "8px"}
 * - "12px 8px 4px 2px" -> {top: "12px", right: "8px", bottom: "4px", left: "2px"}
 */
export const parseSpacing = (value) => {
  if (!value || typeof value !== 'string') {
    return { top: null, right: null, bottom: null, left: null };
  }

  const values = value.trim().split(/\s+/);

  switch (values.length) {
  case 1:
    // Одно значение - применяется ко всем сторонам
    return {
      top: values[0],
      right: values[0],
      bottom: values[0],
      left: values[0],
    };

  case 2:
    // Два значения - первое для top/bottom, второе для left/right
    return {
      top: values[0],
      right: values[1],
      bottom: values[0],
      left: values[1],
    };

  case 3:
    // Три значения - top, left/right, bottom
    return {
      top: values[0],
      right: values[1],
      bottom: values[2],
      left: values[1],
    };

  case 4:
    // Четыре значения - top, right, bottom, left (по часовой стрелке)
    return {
      top: values[0],
      right: values[1],
      bottom: values[2],
      left: values[3],
    };

  default:
    return { top: null, right: null, bottom: null, left: null };
  }
};
