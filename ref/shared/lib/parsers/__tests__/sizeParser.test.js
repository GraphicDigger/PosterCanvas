// ===================================================================
// Unit Tests for sizeParser Utilities
// Coverage Target: 100%
// Phase 1 - Utilities (MEDIUM IMPACT - 36 lines, CSS size parsing)
// Risk: LOW (Pure functions, no side effects)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { formatSizeForUI, parseSizeFromUI } from '../sizeParser';

describe('sizeParser Utilities', () => {
  describe('formatSizeForUI', () => {
    describe('Null and Undefined', () => {
      it('should return Auto placeholder for undefined', () => {
        const result = formatSizeForUI(undefined);

        expect(result).toEqual({
          displayValue: '',
          placeholder: 'Auto',
          isPx: false,
        });
      });

      it('should return Auto placeholder for null', () => {
        const result = formatSizeForUI(null);

        expect(result).toEqual({
          displayValue: '',
          placeholder: 'Auto',
          isPx: false,
        });
      });
    });

    describe('Pixel Values', () => {
      it('should parse px string value', () => {
        const result = formatSizeForUI('100px');

        expect(result).toEqual({
          displayValue: '100',
          placeholder: '',
          isPx: true,
        });
      });

      it('should parse px string with spaces', () => {
        const result = formatSizeForUI('  50px  ');

        expect(result).toEqual({
          displayValue: '50',
          placeholder: '',
          isPx: true,
        });
      });

      it('should parse zero px', () => {
        const result = formatSizeForUI('0px');

        expect(result).toEqual({
          displayValue: '0',
          placeholder: '',
          isPx: true,
        });
      });

      it('should parse decimal px', () => {
        const result = formatSizeForUI('10.5px');

        expect(result).toEqual({
          displayValue: '10.5',
          placeholder: '',
          isPx: true,
        });
      });

      it('should parse negative px', () => {
        const result = formatSizeForUI('-20px');

        expect(result).toEqual({
          displayValue: '-20',
          placeholder: '',
          isPx: true,
        });
      });
    });

    describe('Number Values', () => {
      it('should format positive number', () => {
        const result = formatSizeForUI(100);

        expect(result).toEqual({
          displayValue: '100',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format zero', () => {
        const result = formatSizeForUI(0);

        expect(result).toEqual({
          displayValue: '0',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format negative number', () => {
        const result = formatSizeForUI(-50);

        expect(result).toEqual({
          displayValue: '-50',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format decimal number', () => {
        const result = formatSizeForUI(10.5);

        expect(result).toEqual({
          displayValue: '10.5',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format very large number', () => {
        const result = formatSizeForUI(999999);

        expect(result).toEqual({
          displayValue: '999999',
          placeholder: '',
          isPx: false,
        });
      });
    });

    describe('String Values (Non-Px)', () => {
      it('should format percentage string', () => {
        const result = formatSizeForUI('50%');

        expect(result).toEqual({
          displayValue: '50%',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format em string', () => {
        const result = formatSizeForUI('2em');

        expect(result).toEqual({
          displayValue: '2em',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format rem string', () => {
        const result = formatSizeForUI('1.5rem');

        expect(result).toEqual({
          displayValue: '1.5rem',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format vh string', () => {
        const result = formatSizeForUI('100vh');

        expect(result).toEqual({
          displayValue: '100vh',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format vw string', () => {
        const result = formatSizeForUI('50vw');

        expect(result).toEqual({
          displayValue: '50vw',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format auto string', () => {
        const result = formatSizeForUI('auto');

        expect(result).toEqual({
          displayValue: 'auto',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format calc expression', () => {
        const result = formatSizeForUI('calc(100% - 20px)');

        expect(result).toEqual({
          displayValue: 'calc(100% - 20px)',
          placeholder: '',
          isPx: false,
        });
      });

      it('should format empty string', () => {
        const result = formatSizeForUI('');

        expect(result).toEqual({
          displayValue: '',
          placeholder: '',
          isPx: false,
        });
      });
    });

    describe('Edge Cases', () => {
      it('should handle boolean true', () => {
        const result = formatSizeForUI(true);

        expect(result).toEqual({
          displayValue: true,
          placeholder: '',
          isPx: false,
        });
      });

      it('should handle boolean false', () => {
        const result = formatSizeForUI(false);

        expect(result).toEqual({
          displayValue: false,
          placeholder: '',
          isPx: false,
        });
      });

      it('should handle object', () => {
        const obj = { value: 100 };
        const result = formatSizeForUI(obj);

        expect(result).toEqual({
          displayValue: obj,
          placeholder: '',
          isPx: false,
        });
      });

      it('should handle array', () => {
        const arr = [100, 200];
        const result = formatSizeForUI(arr);

        expect(result).toEqual({
          displayValue: arr,
          placeholder: '',
          isPx: false,
        });
      });
    });
  });

  describe('parseSizeFromUI', () => {
    describe('Null and Undefined', () => {
      it('should return null for null', () => {
        expect(parseSizeFromUI(null)).toBeNull();
      });

      it('should return undefined for undefined', () => {
        expect(parseSizeFromUI(undefined)).toBeUndefined();
      });
    });

    describe('Empty String', () => {
      it('should return undefined for empty string', () => {
        expect(parseSizeFromUI('')).toBeUndefined();
      });

      it('should return undefined for whitespace only', () => {
        expect(parseSizeFromUI('   ')).toBeUndefined();
      });

      it('should return undefined for tab/newline', () => {
        expect(parseSizeFromUI('\t\n')).toBeUndefined();
      });
    });

    describe('Numeric Strings', () => {
      it('should convert numeric string to px', () => {
        expect(parseSizeFromUI('100')).toBe('100px');
      });

      it('should convert zero to px', () => {
        expect(parseSizeFromUI('0')).toBe('0px');
      });

      it('should convert negative number to px', () => {
        expect(parseSizeFromUI('-50')).toBe('-50px');
      });

      it('should convert decimal to px', () => {
        expect(parseSizeFromUI('10.5')).toBe('10.5px');
      });

      it('should convert large number to px', () => {
        expect(parseSizeFromUI('999999')).toBe('999999px');
      });

      it('should handle numeric string with spaces', () => {
        expect(parseSizeFromUI('  100  ')).toBe('100px');
      });
    });

    describe('Number Values', () => {
      it('should convert number to px', () => {
        expect(parseSizeFromUI(100)).toBe('100px');
      });

      it('should convert zero number to px', () => {
        expect(parseSizeFromUI(0)).toBe('0px');
      });

      it('should convert negative number to px', () => {
        expect(parseSizeFromUI(-50)).toBe('-50px');
      });

      it('should convert decimal number to px', () => {
        expect(parseSizeFromUI(10.5)).toBe('10.5px');
      });
    });

    describe('Non-Numeric Strings', () => {
      it('should preserve percentage', () => {
        expect(parseSizeFromUI('50%')).toBe('50%');
      });

      it('should preserve em', () => {
        expect(parseSizeFromUI('2em')).toBe('2em');
      });

      it('should preserve rem', () => {
        expect(parseSizeFromUI('1.5rem')).toBe('1.5rem');
      });

      it('should preserve vh', () => {
        expect(parseSizeFromUI('100vh')).toBe('100vh');
      });

      it('should preserve vw', () => {
        expect(parseSizeFromUI('50vw')).toBe('50vw');
      });

      it('should preserve auto', () => {
        expect(parseSizeFromUI('auto')).toBe('auto');
      });

      it('should preserve calc expression', () => {
        expect(parseSizeFromUI('calc(100% - 20px)')).toBe('calc(100% - 20px)');
      });

      it('should preserve px string', () => {
        expect(parseSizeFromUI('100px')).toBe('100px');
      });

      it('should preserve min-content', () => {
        expect(parseSizeFromUI('min-content')).toBe('min-content');
      });

      it('should preserve max-content', () => {
        expect(parseSizeFromUI('max-content')).toBe('max-content');
      });

      it('should preserve fit-content', () => {
        expect(parseSizeFromUI('fit-content')).toBe('fit-content');
      });
    });

    describe('Edge Cases', () => {
      it('should handle boolean true', () => {
        expect(parseSizeFromUI(true)).toBe(true);
      });

      it('should handle boolean false', () => {
        expect(parseSizeFromUI(false)).toBe(false);
      });

      it('should handle NaN string', () => {
        expect(parseSizeFromUI('NaN')).toBe('NaN');
      });

      it('should handle Infinity', () => {
        expect(parseSizeFromUI(Infinity)).toBe('Infinitypx');
      });

      it('should handle object', () => {
        const obj = { value: 100 };
        expect(parseSizeFromUI(obj)).toBe(obj);
      });

      it('should handle array', () => {
        const arr = [100, 200];
        expect(parseSizeFromUI(arr)).toBe(arr);
      });
    });

    describe('Round-Trip Conversions', () => {
      it('should handle format -> parse -> format cycle for px', () => {
        const formatted1 = formatSizeForUI('100px');
        const parsed = parseSizeFromUI(formatted1.displayValue);
        const formatted2 = formatSizeForUI(parsed);

        expect(formatted2.displayValue).toBe('100');
        expect(formatted2.isPx).toBe(true);
      });

      it('should handle format -> parse -> format cycle for number', () => {
        const formatted1 = formatSizeForUI(100);
        const parsed = parseSizeFromUI(formatted1.displayValue);
        const formatted2 = formatSizeForUI(parsed);

        expect(formatted2.displayValue).toBe('100');
        expect(formatted2.isPx).toBe(true);
      });

      it('should handle format -> parse -> format cycle for percentage', () => {
        const formatted1 = formatSizeForUI('50%');
        const parsed = parseSizeFromUI(formatted1.displayValue);
        const formatted2 = formatSizeForUI(parsed);

        expect(formatted2.displayValue).toBe('50%');
        expect(formatted2.isPx).toBe(false);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete user input workflow', () => {
      // User enters "100" in input
      const parsed = parseSizeFromUI('100');
      expect(parsed).toBe('100px');

      // Format for display
      const formatted = formatSizeForUI(parsed);
      expect(formatted.displayValue).toBe('100');
      expect(formatted.isPx).toBe(true);
    });

    it('should handle percentage input workflow', () => {
      // User enters "50%" in input
      const parsed = parseSizeFromUI('50%');
      expect(parsed).toBe('50%');

      // Format for display
      const formatted = formatSizeForUI(parsed);
      expect(formatted.displayValue).toBe('50%');
      expect(formatted.isPx).toBe(false);
    });

    it('should handle empty/auto workflow', () => {
      // User clears input
      const parsed = parseSizeFromUI('');
      expect(parsed).toBeUndefined();

      // Format for display
      const formatted = formatSizeForUI(parsed);
      expect(formatted.displayValue).toBe('');
      expect(formatted.placeholder).toBe('Auto');
    });
  });
});

