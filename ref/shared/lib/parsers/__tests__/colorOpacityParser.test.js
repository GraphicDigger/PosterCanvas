// ===================================================================
// Unit Tests for colorOpacityParser Utilities
// Coverage Target: 100%
// Phase 1 - Utilities (SMALL IMPACT - 33 lines, opacity conversion)
// Risk: LOW (Pure functions, no side effects)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { parseOpacity, formatOpacity } from '../colorOpacityParser';

describe('colorOpacityParser Utilities', () => {
  describe('parseOpacity (CSS -> UI: 0-1 to 0-100)', () => {
    describe('Default Values', () => {
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

    describe('Valid Numeric Values', () => {
      it('should convert 1 to 100', () => {
        expect(parseOpacity(1)).toBe(100);
      });

      it('should convert 0 to 0', () => {
        expect(parseOpacity(0)).toBe(0);
      });

      it('should convert 0.5 to 50', () => {
        expect(parseOpacity(0.5)).toBe(50);
      });

      it('should convert 0.75 to 75', () => {
        expect(parseOpacity(0.75)).toBe(75);
      });

      it('should convert 0.25 to 25', () => {
        expect(parseOpacity(0.25)).toBe(25);
      });

      it('should convert 0.1 to 10', () => {
        expect(parseOpacity(0.1)).toBe(10);
      });

      it('should convert 0.01 to 1', () => {
        expect(parseOpacity(0.01)).toBe(1);
      });

      it('should convert 0.99 to 99', () => {
        expect(parseOpacity(0.99)).toBe(99);
      });
    });

    describe('String Values', () => {
      it('should convert string "1" to 100', () => {
        expect(parseOpacity('1')).toBe(100);
      });

      it('should convert string "0" to 0', () => {
        expect(parseOpacity('0')).toBe(0);
      });

      it('should convert string "0.5" to 50', () => {
        expect(parseOpacity('0.5')).toBe(50);
      });

      it('should convert string "0.75" to 75', () => {
        expect(parseOpacity('0.75')).toBe(75);
      });

      it('should convert string with spaces', () => {
        expect(parseOpacity('  0.5  ')).toBe(50);
      });
    });

    describe('Rounding', () => {
      it('should round 0.555 to 56', () => {
        expect(parseOpacity(0.555)).toBe(56);
      });

      it('should round 0.544 to 54', () => {
        expect(parseOpacity(0.544)).toBe(54);
      });

      it('should round 0.999 to 100', () => {
        expect(parseOpacity(0.999)).toBe(100);
      });

      it('should round 0.001 to 0', () => {
        expect(parseOpacity(0.001)).toBe(0);
      });

      it('should round 0.005 to 1', () => {
        expect(parseOpacity(0.005)).toBe(1);
      });
    });

    describe('Clamping (Out of Range)', () => {
      it('should clamp negative value to 0', () => {
        expect(parseOpacity(-0.5)).toBe(0);
      });

      it('should clamp value > 1 to 100', () => {
        expect(parseOpacity(1.5)).toBe(100);
      });

      it('should clamp large value to 100', () => {
        expect(parseOpacity(10)).toBe(100);
      });

      it('should clamp large negative to 0', () => {
        expect(parseOpacity(-10)).toBe(0);
      });
    });

    describe('Invalid Values', () => {
      it('should return 100 for NaN string', () => {
        expect(parseOpacity('abc')).toBe(100);
      });

      it('should return 100 for non-numeric string', () => {
        expect(parseOpacity('invalid')).toBe(100);
      });

      it('should return 100 for object', () => {
        expect(parseOpacity({})).toBe(100);
      });

      it('should return 0 for empty array (parseFloat([]) = 0)', () => {
        expect(parseOpacity([])).toBe(0);
      });

      it('should return 100 for boolean true (parseFloat(true) = 1)', () => {
        expect(parseOpacity(true)).toBe(100);
      });

      it('should return 0 for boolean false (parseFloat(false) = 0)', () => {
        expect(parseOpacity(false)).toBe(0);
      });
    });
  });

  describe('formatOpacity (UI -> CSS: 0-100 to 0-1)', () => {
    describe('Default Values', () => {
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

    describe('Valid Numeric Values', () => {
      it('should convert 100 to 1', () => {
        expect(formatOpacity(100)).toBe(1);
      });

      it('should convert 0 to 0', () => {
        expect(formatOpacity(0)).toBe(0);
      });

      it('should convert 50 to 0.5', () => {
        expect(formatOpacity(50)).toBe(0.5);
      });

      it('should convert 75 to 0.75', () => {
        expect(formatOpacity(75)).toBe(0.75);
      });

      it('should convert 25 to 0.25', () => {
        expect(formatOpacity(25)).toBe(0.25);
      });

      it('should convert 10 to 0.1', () => {
        expect(formatOpacity(10)).toBe(0.1);
      });

      it('should convert 1 to 0.01', () => {
        expect(formatOpacity(1)).toBe(0.01);
      });

      it('should convert 99 to 0.99', () => {
        expect(formatOpacity(99)).toBe(0.99);
      });
    });

    describe('String Values', () => {
      it('should convert string "100" to 1', () => {
        expect(formatOpacity('100')).toBe(1);
      });

      it('should convert string "0" to 0', () => {
        expect(formatOpacity('0')).toBe(0);
      });

      it('should convert string "50" to 0.5', () => {
        expect(formatOpacity('50')).toBe(0.5);
      });

      it('should convert string "75" to 0.75', () => {
        expect(formatOpacity('75')).toBe(0.75);
      });

      it('should convert string with spaces', () => {
        expect(formatOpacity('  50  ')).toBe(0.5);
      });
    });

    describe('Decimal Values', () => {
      it('should handle 50.5', () => {
        expect(formatOpacity(50.5)).toBe(0.505);
      });

      it('should handle 33.33', () => {
        expect(formatOpacity(33.33)).toBe(0.3333);
      });

      it('should handle 66.66', () => {
        expect(formatOpacity(66.66)).toBe(0.6666);
      });
    });

    describe('Clamping (Out of Range)', () => {
      it('should clamp negative value to 0', () => {
        expect(formatOpacity(-50)).toBe(0);
      });

      it('should clamp value > 100 to 1', () => {
        expect(formatOpacity(150)).toBe(1);
      });

      it('should clamp large value to 1', () => {
        expect(formatOpacity(1000)).toBe(1);
      });

      it('should clamp large negative to 0', () => {
        expect(formatOpacity(-1000)).toBe(0);
      });
    });

    describe('Invalid Values', () => {
      it('should return 1 for NaN string', () => {
        expect(formatOpacity('abc')).toBe(1);
      });

      it('should return 1 for non-numeric string', () => {
        expect(formatOpacity('invalid')).toBe(1);
      });

      it('should return 1 for object', () => {
        expect(formatOpacity({})).toBe(1);
      });

      it('should return 0 for empty array (parseFloat([]) = 0)', () => {
        expect(formatOpacity([])).toBe(0);
      });

      it('should return 0.01 for boolean true (parseFloat(true) = 1)', () => {
        expect(formatOpacity(true)).toBe(0.01);
      });

      it('should return 0 for boolean false (parseFloat(false) = 0)', () => {
        expect(formatOpacity(false)).toBe(0);
      });
    });
  });

  describe('Round-Trip Conversions', () => {
    it('should handle parse -> format -> parse cycle for 0.5', () => {
      const parsed = parseOpacity(0.5);
      const formatted = formatOpacity(parsed);
      const parsed2 = parseOpacity(formatted);

      expect(parsed).toBe(50);
      expect(formatted).toBe(0.5);
      expect(parsed2).toBe(50);
    });

    it('should handle format -> parse -> format cycle for 50', () => {
      const formatted = formatOpacity(50);
      const parsed = parseOpacity(formatted);
      const formatted2 = formatOpacity(parsed);

      expect(formatted).toBe(0.5);
      expect(parsed).toBe(50);
      expect(formatted2).toBe(0.5);
    });

    it('should handle multiple conversions', () => {
      let value = 0.75;

      for (let i = 0; i < 10; i++) {
        value = formatOpacity(parseOpacity(value));
      }

      expect(value).toBe(0.75);
    });

    it('should handle edge case 0', () => {
      expect(formatOpacity(parseOpacity(0))).toBe(0);
    });

    it('should handle edge case 1', () => {
      expect(formatOpacity(parseOpacity(1))).toBe(1);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete opacity slider workflow', () => {
      // User sets slider to 75%
      const cssValue = formatOpacity(75);
      expect(cssValue).toBe(0.75);

      // Load from CSS
      const uiValue = parseOpacity(cssValue);
      expect(uiValue).toBe(75);
    });

    it('should handle default opacity', () => {
      // No opacity set
      const uiValue = parseOpacity(undefined);
      expect(uiValue).toBe(100);

      // Convert to CSS
      const cssValue = formatOpacity(uiValue);
      expect(cssValue).toBe(1);
    });

    it('should handle transparent (0% opacity)', () => {
      // User sets to transparent
      const cssValue = formatOpacity(0);
      expect(cssValue).toBe(0);

      // Load from CSS
      const uiValue = parseOpacity(cssValue);
      expect(uiValue).toBe(0);
    });

    it('should handle semi-transparent', () => {
      // Common semi-transparent values
      const values = [25, 50, 75];

      values.forEach(uiValue => {
        const cssValue = formatOpacity(uiValue);
        const roundTrip = parseOpacity(cssValue);
        expect(roundTrip).toBe(uiValue);
      });
    });
  });

  describe('Precision Tests', () => {
    it('should handle precise values', () => {
      const testCases = [
        { ui: 0, css: 0 },
        { ui: 10, css: 0.1 },
        { ui: 20, css: 0.2 },
        { ui: 30, css: 0.3 },
        { ui: 40, css: 0.4 },
        { ui: 50, css: 0.5 },
        { ui: 60, css: 0.6 },
        { ui: 70, css: 0.7 },
        { ui: 80, css: 0.8 },
        { ui: 90, css: 0.9 },
        { ui: 100, css: 1 },
      ];

      testCases.forEach(({ ui, css }) => {
        expect(formatOpacity(ui)).toBe(css);
        expect(parseOpacity(css)).toBe(ui);
      });
    });

    it('should handle floating point precision', () => {
      // Test that floating point errors don't cause issues
      const value = 0.1 + 0.2; // Known floating point issue (0.30000000000000004)
      const parsed = parseOpacity(value);

      expect(parsed).toBeGreaterThanOrEqual(0);
      expect(parsed).toBeLessThanOrEqual(100);
    });
  });
});

