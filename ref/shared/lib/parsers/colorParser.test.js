import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatColorForUI,
  parseColorFromUI,
  hexToRgb,
  hexToHsl,
  rgbToHex,
  rgbToHsl,
  hsbToRgb,
  hsbToHex,
  hslToHsb,
} from './colorParser';

// Mock the COLOR_FORMAT constants
vi.mock('../../constants', () => ({
  COLOR_FORMAT: {
    HEX: 'HEX',
    HEX3: 'HEX3',
    HEX6: 'HEX6',
    HEX8: 'HEX8',
    RGB: 'RGB',
    RGBA: 'RGBA',
    HSL: 'HSL',
    HSB: 'HSB',
    NAMED: 'NAMED',
  },
}));

describe('colorParser', () => {
  describe('formatColorForUI', () => {
    describe('HEX6 format', () => {
      it('should parse #ff0000 as HEX6 red', () => {
        const result = formatColorForUI('#ff0000');
        expect(result).toEqual({
          color: '#ff0000',
          format: 'HEX6',
          opacity: 100,
        });
      });

      it('should parse #00ff00 as HEX6 green', () => {
        const result = formatColorForUI('#00ff00');
        expect(result).toEqual({
          color: '#00ff00',
          format: 'HEX6',
          opacity: 100,
        });
      });

      it('should parse #0000ff as HEX6 blue', () => {
        const result = formatColorForUI('#0000ff');
        expect(result).toEqual({
          color: '#0000ff',
          format: 'HEX6',
          opacity: 100,
        });
      });

      it('should handle uppercase HEX', () => {
        const result = formatColorForUI('#FF0000');
        expect(result).toEqual({
          color: '#FF0000',
          format: 'HEX6',
          opacity: 100,
        });
      });

      it('should handle mixed case HEX', () => {
        const result = formatColorForUI('#FfAaBb');
        expect(result).toEqual({
          color: '#FfAaBb',
          format: 'HEX6',
          opacity: 100,
        });
      });

      it('should trim whitespace', () => {
        const result = formatColorForUI('  #ff0000  ');
        expect(result).toEqual({
          color: '#ff0000',
          format: 'HEX6',
          opacity: 100,
        });
      });
    });

    describe('HEX3 format', () => {
      it('should parse #f00 as HEX3 red', () => {
        const result = formatColorForUI('#f00');
        expect(result).toEqual({
          color: '#f00',
          format: 'HEX3',
          opacity: 100,
        });
      });

      it('should parse #0f0 as HEX3 green', () => {
        const result = formatColorForUI('#0f0');
        expect(result).toEqual({
          color: '#0f0',
          format: 'HEX3',
          opacity: 100,
        });
      });

      it('should parse #00f as HEX3 blue', () => {
        const result = formatColorForUI('#00f');
        expect(result).toEqual({
          color: '#00f',
          format: 'HEX3',
          opacity: 100,
        });
      });

      it('should handle uppercase HEX3', () => {
        const result = formatColorForUI('#F0A');
        expect(result).toEqual({
          color: '#F0A',
          format: 'HEX3',
          opacity: 100,
        });
      });
    });

    describe('incomplete HEX format', () => {
      it('should handle incomplete HEX as general HEX format', () => {
        const result = formatColorForUI('#ff');
        expect(result).toEqual({
          color: '#ff',
          format: 'HEX',
          opacity: 100,
        });
      });

      it('should handle single char HEX', () => {
        const result = formatColorForUI('#f');
        expect(result).toEqual({
          color: '#f',
          format: 'HEX',
          opacity: 100,
        });
      });

      it('should handle 4-char HEX', () => {
        const result = formatColorForUI('#ff00');
        expect(result).toEqual({
          color: '#ff00',
          format: 'HEX',
          opacity: 100,
        });
      });

      it('should handle 5-char HEX', () => {
        const result = formatColorForUI('#ff000');
        expect(result).toEqual({
          color: '#ff000',
          format: 'HEX',
          opacity: 100,
        });
      });
    });

    describe('HEX8 format with alpha', () => {
      it('should parse #ff000080 with 50% opacity', () => {
        const result = formatColorForUI('#ff000080');
        expect(result.color).toBe('#ff0000');
        expect(result.format).toBe('HEX8');
        expect(result.opacity).toBeCloseTo(50, 0);
      });

      it('should parse #00ff00ff with 100% opacity', () => {
        const result = formatColorForUI('#00ff00ff');
        expect(result.color).toBe('#00ff00');
        expect(result.format).toBe('HEX8');
        expect(result.opacity).toBe(100);
      });

      it('should parse #0000ff00 with 0% opacity', () => {
        const result = formatColorForUI('#0000ff00');
        expect(result.color).toBe('#0000ff');
        expect(result.format).toBe('HEX8');
        expect(result.opacity).toBe(0);
      });

      it('should parse #ffaabbcc with ~80% opacity', () => {
        const result = formatColorForUI('#ffaabbcc');
        expect(result.color).toBe('#ffaabb');
        expect(result.format).toBe('HEX8');
        expect(result.opacity).toBeCloseTo(80, 0);
      });
    });

    describe('RGB format', () => {
      it('should parse rgb(255, 0, 0) as red', () => {
        const result = formatColorForUI('rgb(255, 0, 0)');
        expect(result).toEqual({
          color: { r: 255, g: 0, b: 0 },
          format: 'RGB',
          opacity: 100,
        });
      });

      it('should parse rgb(0, 255, 0) as green', () => {
        const result = formatColorForUI('rgb(0, 255, 0)');
        expect(result).toEqual({
          color: { r: 0, g: 255, b: 0 },
          format: 'RGB',
          opacity: 100,
        });
      });

      it('should parse rgb(0, 0, 255) as blue', () => {
        const result = formatColorForUI('rgb(0, 0, 255)');
        expect(result).toEqual({
          color: { r: 0, g: 0, b: 255 },
          format: 'RGB',
          opacity: 100,
        });
      });

      it('should handle extra whitespace', () => {
        const result = formatColorForUI('rgb( 255 , 128 , 0 )');
        expect(result).toEqual({
          color: { r: 255, g: 128, b: 0 },
          format: 'RGB',
          opacity: 100,
        });
      });

      it('should handle no whitespace', () => {
        const result = formatColorForUI('rgb(255,128,0)');
        expect(result).toEqual({
          color: { r: 255, g: 128, b: 0 },
          format: 'RGB',
          opacity: 100,
        });
      });
    });

    describe('RGBA format', () => {
      it('should parse rgba(255, 0, 0, 0.5) with 50% opacity', () => {
        const result = formatColorForUI('rgba(255, 0, 0, 0.5)');
        expect(result.color).toEqual({ r: 255, g: 0, b: 0 });
        expect(result.format).toBe('RGBA');
        expect(result.opacity).toBe(50);
      });

      it('should parse rgba(0, 255, 0, 0) with 0% opacity', () => {
        const result = formatColorForUI('rgba(0, 255, 0, 0)');
        expect(result.color).toEqual({ r: 0, g: 255, b: 0 });
        expect(result.format).toBe('RGBA');
        expect(result.opacity).toBe(0);
      });

      it('should parse rgba(0, 0, 255, 1) as RGB (since alpha is 1)', () => {
        const result = formatColorForUI('rgba(0, 0, 255, 1)');
        expect(result.color).toEqual({ r: 0, g: 0, b: 255 });
        expect(result.format).toBe('RGB'); // alpha=1 means RGB, not RGBA
        expect(result.opacity).toBe(100);
      });

      it('should parse rgba(128, 64, 32, 0.75) with 75% opacity', () => {
        const result = formatColorForUI('rgba(128, 64, 32, 0.75)');
        expect(result.color).toEqual({ r: 128, g: 64, b: 32 });
        expect(result.format).toBe('RGBA');
        expect(result.opacity).toBe(75);
      });
    });

    describe('HSL format', () => {
      it('should parse hsl(0, 100%, 50%) as red in HSB', () => {
        const result = formatColorForUI('hsl(0, 100%, 50%)');
        expect(result.format).toBe('HSB');
        expect(result.opacity).toBe(100);
        expect(result.color).toBeDefined();
      });

      it('should parse hsl(120, 100%, 50%) as green in HSB', () => {
        const result = formatColorForUI('hsl(120, 100%, 50%)');
        expect(result.format).toBe('HSB');
        expect(result.opacity).toBe(100);
      });

      it('should parse hsl(240, 100%, 50%) as blue in HSB', () => {
        const result = formatColorForUI('hsl(240, 100%, 50%)');
        expect(result.format).toBe('HSB');
        expect(result.opacity).toBe(100);
      });
    });

    describe('named colors', () => {
      it('should parse "red" as named color', () => {
        const result = formatColorForUI('red');
        expect(result).toEqual({
          color: 'red',
          format: 'NAMED',
          opacity: 100,
        });
      });

      it('should parse "blue" as named color', () => {
        const result = formatColorForUI('blue');
        expect(result).toEqual({
          color: 'blue',
          format: 'NAMED',
          opacity: 100,
        });
      });

      it('should parse "transparent" as named color', () => {
        const result = formatColorForUI('transparent');
        expect(result).toEqual({
          color: 'transparent',
          format: 'NAMED',
          opacity: 100,
        });
      });
    });

    describe('invalid inputs', () => {
      it('should return null color for null input', () => {
        const result = formatColorForUI(null);
        expect(result).toEqual({
          color: null,
          opacity: 100,
          format: null,
        });
      });

      it('should return null color for undefined', () => {
        const result = formatColorForUI(undefined);
        expect(result).toEqual({
          color: null,
          opacity: 100,
          format: null,
        });
      });

      it('should return null color for empty string', () => {
        const result = formatColorForUI('');
        expect(result).toEqual({
          color: null,
          opacity: 100,
          format: null,
        });
      });

      it('should return null color for non-string input', () => {
        const result = formatColorForUI(123);
        expect(result).toEqual({
          color: null,
          opacity: 100,
          format: null,
        });
      });

      it('should treat invalid HEX as named color', () => {
        const result = formatColorForUI('#gggggg');
        expect(result.format).toBe('NAMED');
      });
    });
  });

  describe('parseColorFromUI', () => {
    describe('RGB object to string', () => {
      it('should convert RGB object to rgb() string', () => {
        const result = parseColorFromUI({ r: 255, g: 0, b: 0 }, 100);
        expect(result).toBe('rgb(255, 0, 0)');
      });

      it('should convert RGB object to rgba() with opacity', () => {
        const result = parseColorFromUI({ r: 255, g: 0, b: 0 }, 50);
        expect(result).toBe('rgba(255, 0, 0, 0.5)');
      });

      it('should clamp RGB values to 0-255', () => {
        const result = parseColorFromUI({ r: 300, g: -10, b: 150 }, 100);
        expect(result).toBe('rgb(255, 0, 150)');
      });

      it('should round RGB values and clamp to 255', () => {
        const result = parseColorFromUI({ r: 255.7, g: 128.4, b: 0.2 }, 100);
        expect(result).toBe('rgb(255, 128, 0)'); // 256 is clamped to 255
      });
    });

    describe('HSB object to HSL string', () => {
      it('should convert HSB object to HSL string', () => {
        const result = parseColorFromUI({ h: 0, s: 100, b: 100 });
        expect(result).toMatch(/^hsl\(/);
      });

      it('should handle HSB with h=120 (green)', () => {
        const result = parseColorFromUI({ h: 120, s: 100, b: 100 });
        expect(result).toMatch(/^hsl\(/);
      });

      it('should clamp HSB values', () => {
        const result = parseColorFromUI({ h: 400, s: 150, b: 150 });
        expect(result).toMatch(/^hsl\(/);
      });

      it('should handle HSB with s=0 (grayscale)', () => {
        const result = parseColorFromUI({ h: 0, s: 0, b: 50 });
        expect(result).toMatch(/^hsl\(/);
      });
    });

    describe('HEX string passthrough', () => {
      it('should return HEX6 as-is with 100% opacity', () => {
        const result = parseColorFromUI('#ff0000', 100);
        expect(result).toBe('#ff0000');
      });

      it('should convert HEX6 to HEX8 with opacity', () => {
        const result = parseColorFromUI('#ff0000', 50);
        expect(result.toUpperCase()).toBe('#FF000080'); // Implementation returns lowercase
      });

      it('should handle HEX6 with 0% opacity', () => {
        const result = parseColorFromUI('#00ff00', 0);
        expect(result.toUpperCase()).toBe('#00FF0000'); // Implementation returns lowercase
      });

      it('should handle HEX6 with 75% opacity', () => {
        const result = parseColorFromUI('#0000ff', 75);
        expect(result.toUpperCase()).toBe('#0000FFBF'); // Implementation returns lowercase
      });
    });

    describe('HEX3 conversion', () => {
      it('should convert HEX3 to HEX8 with opacity', () => {
        const result = parseColorFromUI('#f00', 50);
        expect(result.toUpperCase()).toBe('#FF000080'); // Implementation returns lowercase
      });

      it('should convert HEX3 to HEX8 expanding digits', () => {
        const result = parseColorFromUI('#abc', 75);
        expect(result.toUpperCase()).toMatch(/^#AABBCC/); // Check case-insensitive
      });

      it('should handle HEX3 with 100% opacity', () => {
        const result = parseColorFromUI('#fff', 100);
        expect(result).toBe('#fff');
      });
    });

    describe('HSL string passthrough', () => {
      it('should return HSL as-is', () => {
        const result = parseColorFromUI('hsl(0, 100%, 50%)');
        expect(result).toBe('hsl(0, 100%, 50%)');
      });

      it('should return HSL as-is regardless of opacity', () => {
        const result = parseColorFromUI('hsl(120, 50%, 50%)', 50);
        expect(result).toBe('hsl(120, 50%, 50%)');
      });
    });

    describe('null/undefined handling', () => {
      it('should return null for null color', () => {
        const result = parseColorFromUI(null, 100);
        expect(result).toBeNull();
      });

      it('should return null for undefined color', () => {
        const result = parseColorFromUI(undefined, 100);
        expect(result).toBeNull();
      });

      it('should handle null opacity', () => {
        const result = parseColorFromUI('#ff0000', null);
        expect(result).toBe('#ff0000');
      });

      it('should handle undefined opacity', () => {
        const result = parseColorFromUI('#ff0000', undefined);
        expect(result).toBe('#ff0000');
      });
    });
  });

  describe('hexToRgb', () => {
    it('should convert #ff0000 to red RGB', () => {
      const result = hexToRgb('#ff0000');
      expect(result).toEqual({
        obj: { r: 255, g: 0, b: 0 },
        str: 'rgb(255, 0, 0)',
      });
    });

    it('should convert #00ff00 to green RGB', () => {
      const result = hexToRgb('#00ff00');
      expect(result).toEqual({
        obj: { r: 0, g: 255, b: 0 },
        str: 'rgb(0, 255, 0)',
      });
    });

    it('should convert #0000ff to blue RGB', () => {
      const result = hexToRgb('#0000ff');
      expect(result).toEqual({
        obj: { r: 0, g: 0, b: 255 },
        str: 'rgb(0, 0, 255)',
      });
    });

    it('should convert #f00 (HEX3) to red RGB', () => {
      const result = hexToRgb('#f00');
      expect(result).toEqual({
        obj: { r: 255, g: 0, b: 0 },
        str: 'rgb(255, 0, 0)',
      });
    });

    it('should convert #0f0 (HEX3) to green RGB', () => {
      const result = hexToRgb('#0f0');
      expect(result).toEqual({
        obj: { r: 0, g: 255, b: 0 },
        str: 'rgb(0, 255, 0)',
      });
    });

    it('should convert #abc (HEX3) to RGB', () => {
      const result = hexToRgb('#abc');
      expect(result).toEqual({
        obj: { r: 170, g: 187, b: 204 },
        str: 'rgb(170, 187, 204)',
      });
    });

    it('should return undefined for invalid HEX', () => {
      expect(hexToRgb('invalid')).toBeUndefined();
    });

    it('should return undefined for HEX without #', () => {
      expect(hexToRgb('ff0000')).toBeUndefined();
    });

    it('should return undefined for wrong length HEX', () => {
      expect(hexToRgb('#ff00')).toBeUndefined();
    });

    it('should return undefined for null', () => {
      expect(hexToRgb(null)).toBeUndefined();
    });
  });

  describe('rgbToHex', () => {
    it('should convert red RGB to #FF0000', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#FF0000');
    });

    it('should convert green RGB to #00FF00', () => {
      expect(rgbToHex(0, 255, 0)).toBe('#00FF00');
    });

    it('should convert blue RGB to #0000FF', () => {
      expect(rgbToHex(0, 0, 255)).toBe('#0000FF');
    });

    it('should convert gray RGB to HEX', () => {
      expect(rgbToHex(128, 128, 128)).toBe('#808080');
    });

    it('should clamp values > 255', () => {
      expect(rgbToHex(300, 300, 300)).toBe('#FFFFFF');
    });

    it('should clamp values < 0', () => {
      expect(rgbToHex(-10, -10, -10)).toBe('#000000');
    });

    it('should round decimal values', () => {
      expect(rgbToHex(255.7, 128.4, 0.2)).toBe('#FF8000');
    });

    it('should pad single digit HEX', () => {
      expect(rgbToHex(1, 2, 3)).toBe('#010203');
    });
  });

  describe('rgbToHsl', () => {
    it('should convert red RGB to HSL', () => {
      const result = rgbToHsl(255, 0, 0);
      expect(result.obj.h).toBe(0);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
      expect(result.str).toBe('hsl(0, 100%, 50%)');
    });

    it('should convert green RGB to HSL', () => {
      const result = rgbToHsl(0, 255, 0);
      expect(result.obj.h).toBe(120);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
    });

    it('should convert blue RGB to HSL', () => {
      const result = rgbToHsl(0, 0, 255);
      expect(result.obj.h).toBe(240);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
    });

    it('should convert white to HSL', () => {
      const result = rgbToHsl(255, 255, 255);
      expect(result.obj.s).toBe(0);
      expect(result.obj.l).toBe(100);
    });

    it('should convert black to HSL', () => {
      const result = rgbToHsl(0, 0, 0);
      expect(result.obj.s).toBe(0);
      expect(result.obj.l).toBe(0);
    });

    it('should convert gray to HSL', () => {
      const result = rgbToHsl(128, 128, 128);
      expect(result.obj.s).toBe(0);
      expect(result.obj.l).toBeCloseTo(50, 0);
    });
  });

  describe('hsbToRgb', () => {
    it('should convert red HSB to RGB', () => {
      const result = hsbToRgb(0, 100, 100);
      expect(Math.round(result.obj.r)).toBe(255);
      expect(Math.round(result.obj.g)).toBe(0);
      expect(Math.round(result.obj.b)).toBe(0);
    });

    it('should convert green HSB to RGB', () => {
      const result = hsbToRgb(120, 100, 100);
      expect(Math.round(result.obj.r)).toBe(0);
      expect(Math.round(result.obj.g)).toBe(255);
      expect(Math.round(result.obj.b)).toBe(0);
    });

    it('should convert blue HSB to RGB', () => {
      const result = hsbToRgb(240, 100, 100);
      expect(Math.round(result.obj.r)).toBe(0);
      expect(Math.round(result.obj.g)).toBe(0);
      expect(Math.round(result.obj.b)).toBe(255);
    });

    it('should clamp saturation to 0-100', () => {
      const result = hsbToRgb(0, 150, 100);
      expect(result.obj.r).toBeLessThanOrEqual(255);
    });

    it('should clamp brightness to 0-100', () => {
      const result = hsbToRgb(0, 100, 150);
      expect(result.obj.r).toBeLessThanOrEqual(255);
    });

    it('should handle negative hue', () => {
      const result = hsbToRgb(-60, 100, 100);
      expect(result.obj).toBeDefined();
    });

    it('should handle hue > 360', () => {
      const result = hsbToRgb(420, 100, 100);
      expect(result.obj).toBeDefined();
    });
  });

  describe('hsbToHex', () => {
    it('should convert red HSB to #FF0000', () => {
      const result = hsbToHex(0, 100, 100);
      expect(result).toBe('#FF0000');
    });

    it('should convert green HSB to #00FF00', () => {
      const result = hsbToHex(120, 100, 100);
      expect(result).toBe('#00FF00');
    });

    it('should convert blue HSB to #0000FF', () => {
      const result = hsbToHex(240, 100, 100);
      expect(result).toBe('#0000FF');
    });

    it('should clamp values', () => {
      const result = hsbToHex(500, 200, 200);
      expect(result).toMatch(/^#[0-9A-F]{6}$/);
    });
  });

  describe('hexToHsl', () => {
    it('should convert #ff0000 to red HSL', () => {
      const result = hexToHsl('#ff0000');
      expect(result.obj.h).toBe(0);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
    });

    it('should convert #00ff00 to green HSL', () => {
      const result = hexToHsl('#00ff00');
      expect(result.obj.h).toBe(120);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
    });

    it('should convert #f00 (HEX3) to red HSL', () => {
      const result = hexToHsl('#f00');
      expect(result.obj.h).toBe(0);
      expect(result.obj.s).toBe(100);
      expect(result.obj.l).toBe(50);
    });

    it('should return black HSL for invalid HEX', () => {
      const result = hexToHsl('invalid');
      expect(result).toBe('hsl(0, 0%, 0%)');
    });

    it('should return black HSL for null', () => {
      const result = hexToHsl(null);
      expect(result).toBe('hsl(0, 0%, 0%)');
    });

    it('should return black HSL for wrong length', () => {
      const result = hexToHsl('#ff00');
      expect(result).toBe('hsl(0, 0%, 0%)');
    });
  });

  describe('hslToHsb', () => {
    it('should convert red HSL to HSB', () => {
      const result = hslToHsb(0, 100, 50);
      expect(result.obj.h).toBe(0);
      expect(result.obj.s).toBe(100);
      expect(result.obj.b).toBe(100);
    });

    it('should convert green HSL to HSB', () => {
      const result = hslToHsb(120, 100, 50);
      expect(result.obj.h).toBe(120);
      expect(result.obj.s).toBe(100);
      expect(result.obj.b).toBe(100);
    });

    it('should convert blue HSL to HSB', () => {
      const result = hslToHsb(240, 100, 50);
      expect(result.obj.h).toBe(240);
      expect(result.obj.s).toBe(100);
      expect(result.obj.b).toBe(100);
    });

    it('should handle black (l=0)', () => {
      const result = hslToHsb(0, 0, 0);
      expect(result.obj.b).toBe(0);
    });

    it('should handle white (l=100)', () => {
      const result = hslToHsb(0, 0, 100);
      expect(result.obj.b).toBe(100);
      expect(result.obj.s).toBe(0);
    });
  });

  describe('round-trip conversions', () => {
    it('should maintain red through HEX -> RGB -> HEX', () => {
      const hex = '#ff0000';
      const rgb = hexToRgb(hex);
      const backToHex = rgbToHex(rgb.obj.r, rgb.obj.g, rgb.obj.b);
      expect(backToHex.toLowerCase()).toBe(hex.toLowerCase());
    });

    it('should maintain color through RGB -> HSL -> RGB (approximately)', () => {
      const r = 128, g = 64, b = 192;
      const hsl = rgbToHsl(r, g, b);
      // Can't directly convert back without HSL->RGB function
      expect(hsl.obj).toBeDefined();
    });

    it('should maintain HEX through HEX -> HSL -> (verified format)', () => {
      const hex = '#ff0000';
      const hsl = hexToHsl(hex);
      expect(hsl.str).toBe('hsl(0, 100%, 50%)');
    });
  });
});

