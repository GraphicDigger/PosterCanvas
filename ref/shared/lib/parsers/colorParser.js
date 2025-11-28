import { parseOpacity, formatOpacity } from './colorOpacityParser';
import { COLOR_FORMAT } from '../../constants';

// —> UI
export const formatColorForUI = (colorValue) => {
  if (!colorValue || typeof colorValue !== 'string') {
    return { color: null, opacity: 100, format: null };
  }
  const trimmedColor = colorValue.trim();

  // HEX formatted color: #rrggbb или #rgb
  const hexMatch = trimmedColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const hexValue = hexMatch[1];
    const format = hexValue.length === 3 ? COLOR_FORMAT.HEX3 : COLOR_FORMAT.HEX6;
    return {
      color: trimmedColor,
      format,
      opacity: 100,
    };
  } else if (/^#[0-9a-fA-F]{0,6}$/.test(trimmedColor)) {
    // Пока пользователь вводит неполный HEX — считаем это hex-цветом в общем виде
    return {
      color: trimmedColor,
      format: COLOR_FORMAT.HEX, // общий формат HEX
      opacity: 100,
    };
  }
  // HEX formatted color with alpha: #rrggbbaa
  const hexAlphaMatch = trimmedColor.match(/^#([0-9a-fA-F]{8})$/);
  if (hexAlphaMatch) {
    const hexValue = hexAlphaMatch[1];
    const r = parseInt(hexValue.slice(0, 2), 16);
    const g = parseInt(hexValue.slice(2, 4), 16);
    const b = parseInt(hexValue.slice(4, 6), 16);
    const alpha = parseInt(hexValue.slice(6, 8), 16);
    const cssOpacity = alpha / 255;
    const color = `#${hexValue.slice(0, 6)}`;
    const uiOpacity = parseOpacity(cssOpacity);
    return { // { color: '#ff0000', opacity: 50, format: 'HEX8' }
      color,
      format: COLOR_FORMAT.HEX8,
      opacity: uiOpacity,
    };
  }

  // RGBA formatted color: rgba(255, 0, 0, 0.5)
  const rgbaMatch = trimmedColor.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/i);
  if (rgbaMatch) {
    const [, r, g, b, a = '1'] = rgbaMatch;
    const color = {
      r: parseInt(r),
      g: parseInt(g),
      b: parseInt(b),
    };
    const cssOpacity = parseFloat(a);
    const uiOpacity = parseOpacity(cssOpacity);
    const format = a !== '1' ? COLOR_FORMAT.RGBA : COLOR_FORMAT.RGB;
    return { // { color: { r: 255, g: 0, b: 0 }, opacity: 50, format: 'RGBA' }
      color,
      format,
      opacity: uiOpacity,
    };
  }

  // HSL -> HSB formatted color
  const hslMatch = trimmedColor.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i);
  if (hslMatch) {
    const [, h, s, l] = hslMatch;
    const hsb = hslToHsb(parseInt(h, 10), parseInt(s, 10), parseInt(l, 10));
    return { // { color: { h: 120, s: 100, l: 50 }, opacity: 100, format: 'HSL' }
      color: hsb.obj,
      format: COLOR_FORMAT.HSB,
      opacity: 100,
    };
  }

  // Именованный цвет или другой формат
  return { color: trimmedColor, opacity: 100, format: COLOR_FORMAT.NAMED }; // { color: 'red', opacity: 100, format: 'NAMED' }
};

// —> CSS
export const parseColorFromUI = (color, opacity) => {
  if (!color) {return null;}

  // Обрабатываем объект RGB {r, g, b}
  if (typeof color === 'object' && color.r !== undefined && color.g !== undefined && color.b !== undefined) {
    const r = Math.max(0, Math.min(255, Math.round(color.r)));
    const g = Math.max(0, Math.min(255, Math.round(color.g)));
    const b = Math.max(0, Math.min(255, Math.round(color.b)));

    // Если есть прозрачность, возвращаем RGBA
    if (opacity !== undefined && opacity !== null && opacity !== 100) {
      const cssOpacity = formatOpacity(opacity);
      return `rgba(${r}, ${g}, ${b}, ${cssOpacity})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  // Обрабатываем объект HSB {h, s, b}
  if (typeof color === 'object' && color.h !== undefined && color.s !== undefined && color.b !== undefined) {
    const h = Math.max(0, Math.min(360, color.h || 0));
    const s = Math.max(0, Math.min(100, color.s || 0));
    const b = Math.max(0, Math.min(100, color.b || 0));
    // HSB -> RGB -> {r, g, b}
    const rgb = hsbToRgb(h, s, b);
    // RGB -> HSL -> {h, s, l}
    const hsl = rgbToHsl(rgb.obj.r, rgb.obj.g, rgb.obj.b);
    return hsl.str;
  }

  // Конвертируем UI opacity (0-100) в CSS opacity (0-1)
  const cssOpacity = formatOpacity(opacity);

  if (opacity === undefined || opacity === null || opacity === 100) {
    return color;
  }

  // Конвертируем HEX в HEX с альфа-каналом если есть прозрачность
  const hex6Match = color.match(/^#([0-9a-fA-F]{6})$/);
  if (hex6Match) {
    const hexValue = hex6Match[1];
    // Конвертируем UI opacity (0-100) в hex alpha (00-FF)
    const alphaHex = Math.round(cssOpacity * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${hexValue}${alphaHex}`; // #FF0000FF
  }

  // Обрабатываем HSL формат - возвращаем как есть
  const hslMatch = color.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/i);
  if (hslMatch) {
    return color; // Возвращаем HSL как есть
  }

  // Обрабатываем короткие HEX цвета (#rgb)
  const hex3Match = color.match(/^#([0-9a-fA-F]{3})$/);
  if (hex3Match) {
    const shortHex = hex3Match[1];
    // Расширяем #rgb в #rrggbb
    const expandedHex = shortHex.split('').map(c => c + c).join('');
    // Конвертируем UI opacity (0-100) в hex alpha (00-FF)
    const alphaHex = Math.round(cssOpacity * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${expandedHex}${alphaHex}`; // #FF0000FF
  }

  const rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (rgbMatch) {
    const [, r, g, b] = rgbMatch;
    const hexR = parseInt(r).toString(16).padStart(2, '0').toUpperCase();
    const hexG = parseInt(g).toString(16).padStart(2, '0').toUpperCase();
    const hexB = parseInt(b).toString(16).padStart(2, '0').toUpperCase();
    const alphaHex = Math.round(cssOpacity * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${hexR}${hexG}${hexB}${alphaHex}`; // #FF000080
  }

  // Для других форматов возвращаем как есть
  return color;
};


// ————————————————————————————  Converters  ———————————————————————————— //


// HSL -> HSB
export const hslToHsb = (h, s, l) => {
  l /= 100;
  s /= 100;

  const brightness = l + s * Math.min(l, 1 - l);
  const saturation = brightness === 0 ? 0 : 2 * (1 - l / brightness);

  return {
    obj: {
      h: Math.round(h),
      s: Math.round(saturation * 100),
      b: Math.round(brightness * 100),
    },
    str: `hsb(${h}, ${saturation * 100}%, ${brightness * 100}%)`,
  };
};


// HEX -> RGB
export const hexToRgb = (hex) => {
  if (!hex || !hex.startsWith('#')) {return;}

  const cleanHex = hex.slice(1);
  let r, g, b;

  // Обработка 3-символьного HEX (#rgb)
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  }
  // Обработка 6-символьного HEX (#rrggbb)
  else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else {
    return;
  }

  return {
    obj: { r, g, b },
    str: `rgb(${r}, ${g}, ${b})`,
  };
};


// HEX -> HSL
export const hexToHsl = (hex) => {
  if (!hex || !hex.startsWith('#')) {return 'hsl(0, 0%, 0%)';}

  const cleanHex = hex.slice(1);
  let r, g, b;

  // Обработка 3-символьного HEX (#rgb)
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  }
  // Обработка 6-символьного HEX (#rrggbb)
  else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  } else {
    return 'hsl(0, 0%, 0%)';
  }

  // Проверяем что значения валидны
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return 'hsl(0, 0%, 0%)';
  }

  const hsl = rgbToHsl(r, g, b);
  return {
    obj: hsl.obj,
    str: hsl.str,
  };
};


// RGB -> HEX
export const rgbToHex = (r, g, b) => {
  const toHex = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};


// RGB -> HSL
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
    case r:
      h = (g - b) / diff + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / diff + 2;
      break;
    case b:
      h = (r - g) / diff + 4;
      break;
    }
    h /= 6;
  }

  const hValue = Math.round(h * 360);
  const sValue = Math.round(s * 100);
  const lValue = Math.round(l * 100);

  return {
    obj: { h: hValue, s: sValue, l: lValue },
    str: `hsl(${hValue}, ${sValue}%, ${lValue}%)`,
  };
};

// HSL -> RGB
export const hsbToRgb = (h, s, b) => {
  // Нормализация
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  b = Math.max(0, Math.min(100, b)) / 100;

  const c = b * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs(hh % 2 - 1));
  const m = b - c;

  let r = 0, g = 0, b_ = 0;

  if (hh >= 0 && hh < 1) {[r, g, b_] = [c, x, 0];}
  else if (hh >= 1 && hh < 2) {[r, g, b_] = [x, c, 0];}
  else if (hh >= 2 && hh < 3) {[r, g, b_] = [0, c, x];}
  else if (hh >= 3 && hh < 4) {[r, g, b_] = [0, x, c];}
  else if (hh >= 4 && hh < 5) {[r, g, b_] = [x, 0, c];}
  else {[r, g, b_] = [c, 0, x];}

  const rValue = (r + m) * 255;
  const gValue = (g + m) * 255;
  const bValue = (b_ + m) * 255;

  return {
    obj: {
      r: rValue,
      g: gValue,
      b: bValue,
    },
    str: `rgb(${Math.round(rValue)}, ${Math.round(gValue)}, ${Math.round(bValue)})`,
  };
};


// HSL -> HEX
export const hsbToHex = (h, s, b) => {
  // Нормализация
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  b = Math.max(0, Math.min(100, b)) / 100;

  const c = b * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs(hh % 2 - 1));
  const m = b - c;

  let r = 0, g = 0, b_ = 0;

  if (hh >= 0 && hh < 1) {[r, g, b_] = [c, x, 0];}
  else if (hh >= 1 && hh < 2) {[r, g, b_] = [x, c, 0];}
  else if (hh >= 2 && hh < 3) {[r, g, b_] = [0, c, x];}
  else if (hh >= 3 && hh < 4) {[r, g, b_] = [0, x, c];}
  else if (hh >= 4 && hh < 5) {[r, g, b_] = [x, 0, c];}
  else {[r, g, b_] = [c, 0, x];}

  const rValue = Math.round((r + m) * 255);
  const gValue = Math.round((g + m) * 255);
  const bValue = Math.round((b_ + m) * 255);

  const toHex = (value) => value.toString(16).padStart(2, '0').toUpperCase();

  return `#${toHex(rValue)}${toHex(gValue)}${toHex(bValue)}`;
};
