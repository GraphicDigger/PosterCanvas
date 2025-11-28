import { describe, it, expect } from 'vitest';
import { parseOpacity, formatOpacity } from './colorOpacityParser';

describe('colorOpacityParser', () => {
  describe('parseOpacity', () => {
    describe('basic conversions', () => {
      it('should convert CSS opacity 0 to UI 0%', () => {
        expect(parseOpacity(0)).toBe(0);
      });

      it('should convert CSS opacity 0.5 to UI 50%', () => {
        expect(parseOpacity(0.5)).toBe(50);
      });

      it('should convert CSS opacity 1 to UI 100%', () => {
        expect(parseOpacity(1)).toBe(100);
      });

      it('should convert CSS opacity 0.25 to UI 25%', () => {
        expect(parseOpacity(0.25)).toBe(25);
      });

      it('should convert CSS opacity 0.75 to UI 75%', () => {
        expect(parseOpacity(0.75)).toBe(75);
      });

      it('should convert CSS opacity 0.33 to UI 33%', () => {
        expect(parseOpacity(0.33)).toBe(33);
      });

      it('should convert CSS opacity 0.666 to UI 67%', () => {
        expect(parseOpacity(0.666)).toBe(67);
      });
    });

    describe('string inputs', () => {
      it('should parse string "0.5" as 50%', () => {
        expect(parseOpacity('0.5')).toBe(50);
      });

      it('should parse string "1" as 100%', () => {
        expect(parseOpacity('1')).toBe(100);
      });

      it('should parse string "0" as 0%', () => {
        expect(parseOpacity('0')).toBe(0);
      });

      it('should parse string with decimals "0.123" as 12%', () => {
        expect(parseOpacity('0.123')).toBe(12);
      });
    });

    describe('default values', () => {
      it('should return 100 for undefined', () => {
        expect(parseOpacity(undefined)).toBe(100);
      });

      it('should return 100 for null', () => {
        expect(parseOpacity(null)).toBe(100);
      });

      it('should return 100 for empty string', () => {
        expect(parseOpacity('')).toBe(100);
      });
    });

    describe('invalid inputs', () => {
      it('should return 100 for NaN', () => {
        expect(parseOpacity(NaN)).toBe(100);
      });

      it('should return 100 for non-numeric string', () => {
        expect(parseOpacity('abc')).toBe(100);
      });

      it('should return 100 for invalid string', () => {
        expect(parseOpacity('not a number')).toBe(100);
      });

      it('should return 100 for object', () => {
        expect(parseOpacity({})).toBe(100);
      });

      it('should return 0 for empty array (converts to 0)', () => {
        expect(parseOpacity([])).toBe(0); // [] converts to 0
      });
    });

    describe('boundary clamping', () => {
      it('should clamp negative values to 0', () => {
        expect(parseOpacity(-0.5)).toBe(0);
      });

      it('should clamp negative values to 0', () => {
        expect(parseOpacity(-1)).toBe(0);
      });

      it('should clamp values > 1 to 100', () => {
        expect(parseOpacity(1.5)).toBe(100);
      });

      it('should clamp values > 1 to 100', () => {
        expect(parseOpacity(2)).toBe(100);
      });

      it('should clamp very large values to 100', () => {
        expect(parseOpacity(999)).toBe(100);
      });
    });

    describe('rounding behavior', () => {
      it('should round 0.445 to 45%', () => {
        expect(parseOpacity(0.445)).toBe(45);
      });

      it('should round 0.446 to 45%', () => {
        expect(parseOpacity(0.446)).toBe(45);
      });

      it('should round 0.455 to 46%', () => {
        expect(parseOpacity(0.455)).toBe(46);
      });

      it('should round 0.999 to 100%', () => {
        expect(parseOpacity(0.999)).toBe(100);
      });

      it('should round 0.005 to 1%', () => {
        expect(parseOpacity(0.005)).toBe(1);
      });
    });
  });

  describe('formatOpacity', () => {
    describe('basic conversions', () => {
      it('should convert UI 0% to CSS 0', () => {
        expect(formatOpacity(0)).toBe(0);
      });

      it('should convert UI 50% to CSS 0.5', () => {
        expect(formatOpacity(50)).toBe(0.5);
      });

      it('should convert UI 100% to CSS 1', () => {
        expect(formatOpacity(100)).toBe(1);
      });

      it('should convert UI 25% to CSS 0.25', () => {
        expect(formatOpacity(25)).toBe(0.25);
      });

      it('should convert UI 75% to CSS 0.75', () => {
        expect(formatOpacity(75)).toBe(0.75);
      });

      it('should convert UI 33% to CSS 0.33', () => {
        expect(formatOpacity(33)).toBe(0.33);
      });

      it('should convert UI 67% to CSS 0.67', () => {
        expect(formatOpacity(67)).toBe(0.67);
      });
    });

    describe('string inputs', () => {
      it('should parse string "50" as 0.5', () => {
        expect(formatOpacity('50')).toBe(0.5);
      });

      it('should parse string "100" as 1', () => {
        expect(formatOpacity('100')).toBe(1);
      });

      it('should parse string "0" as 0', () => {
        expect(formatOpacity('0')).toBe(0);
      });

      it('should parse string "25" as 0.25', () => {
        expect(formatOpacity('25')).toBe(0.25);
      });
    });

    describe('default values', () => {
      it('should return 1 for undefined', () => {
        expect(formatOpacity(undefined)).toBe(1);
      });

      it('should return 1 for null', () => {
        expect(formatOpacity(null)).toBe(1);
      });

      it('should return 1 for empty string', () => {
        expect(formatOpacity('')).toBe(1);
      });
    });

    describe('invalid inputs', () => {
      it('should return 1 for NaN', () => {
        expect(formatOpacity(NaN)).toBe(1);
      });

      it('should return 1 for non-numeric string', () => {
        expect(formatOpacity('abc')).toBe(1);
      });

      it('should return 1 for invalid string', () => {
        expect(formatOpacity('not a number')).toBe(1);
      });

      it('should return 1 for object', () => {
        expect(formatOpacity({})).toBe(1);
      });

      it('should return 0 for empty array (converts to 0)', () => {
        expect(formatOpacity([])).toBe(0); // [] converts to 0
      });
    });

    describe('boundary clamping', () => {
      it('should clamp negative values to 0', () => {
        expect(formatOpacity(-50)).toBe(0);
      });

      it('should clamp negative values to 0', () => {
        expect(formatOpacity(-100)).toBe(0);
      });

      it('should clamp values > 100 to 1', () => {
        expect(formatOpacity(150)).toBe(1);
      });

      it('should clamp values > 100 to 1', () => {
        expect(formatOpacity(200)).toBe(1);
      });

      it('should clamp very large values to 1', () => {
        expect(formatOpacity(9999)).toBe(1);
      });
    });
  });

  describe('round-trip conversions', () => {
    it('should maintain value through parse -> format', () => {
      const cssValue = 0.5;
      const uiValue = parseOpacity(cssValue);
      const backToCss = formatOpacity(uiValue);
      expect(backToCss).toBe(cssValue);
    });

    it('should maintain value through format -> parse', () => {
      const uiValue = 50;
      const cssValue = formatOpacity(uiValue);
      const backToUi = parseOpacity(cssValue);
      expect(backToUi).toBe(uiValue);
    });

    it('should handle multiple conversions', () => {
      let value = 0.75;
      value = parseOpacity(value); // 75
      value = formatOpacity(value); // 0.75
      value = parseOpacity(value); // 75
      expect(value).toBe(75);
    });
  });

  describe('edge cases', () => {
    it('should handle very small UI values', () => {
      expect(formatOpacity(1)).toBe(0.01);
    });

    it('should handle very small CSS values', () => {
      expect(parseOpacity(0.01)).toBe(1);
    });

    it('should handle boundary values at 0', () => {
      expect(parseOpacity(0)).toBe(0);
      expect(formatOpacity(0)).toBe(0);
    });

    it('should handle boundary values at 100/1', () => {
      expect(parseOpacity(1)).toBe(100);
      expect(formatOpacity(100)).toBe(1);
    });

    it('should handle float precision issues', () => {
      const result = formatOpacity(33.33);
      expect(result).toBeCloseTo(0.3333, 2);
    });
  });
});

