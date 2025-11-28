// ===================================================================
// Unit Tests for Size Parser
// CRITICAL BUSINESS LOGIC - Size Control System
// Week 2, Day 2 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';

// Mock the shared lib functions
vi.mock('../../../../shared/lib', () => ({
  parseSizeFromUI: (value) => {
    if (!value || value === 'Auto') {return null;}
    if (value.endsWith('px')) {return value;}
    if (!isNaN(value)) {return `${value}px`;}
    return value;
  },
  formatSizeForUI: (value) => {
    if (!value) {return { displayValue: '', placeholder: 'Auto', isPx: false };}
    if (typeof value === 'string' && value.endsWith('px')) {
      const num = value.replace('px', '').trim();
      return { displayValue: num, placeholder: '', isPx: true };
    }
    if (typeof value === 'number') {
      return { displayValue: String(value), placeholder: '', isPx: false };
    }
    return { displayValue: value, placeholder: '', isPx: false };
  },
}));

import { formatSize, parseSize } from './sizeParser';

describe('Size Parser - Width/Height Control', () => {
  // ===================================================================
  // PART 1: formatSize - Special Values (5 tests)
  // ===================================================================

  describe('formatSize - Special Values', () => {
    it('should format "100%" as Fill', () => {
      const result = formatSize('100%');

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Fill',
        isPx: false,
      });
    });

    it('should format "max-content" as Fit', () => {
      const result = formatSize('max-content');

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Fit',
        isPx: false,
      });
    });

    it('should format undefined as Auto', () => {
      const result = formatSize(undefined);

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Auto',
        isPx: false,
      });
    });

    it('should format null as Auto', () => {
      const result = formatSize(null);

      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Auto',
        isPx: false,
      });
    });

    it('should delegate to formatSizeForUI for other values', () => {
      const result = formatSize('16px');

      expect(result).toEqual({
        displayValue: '16',
        placeholder: '',
        isPx: true,
      });
    });
  });

  // ===================================================================
  // PART 2: formatSize - Pixel Values (5 tests)
  // ===================================================================

  describe('formatSize - Pixel Values', () => {
    it('should format px values correctly', () => {
      const result = formatSize('24px');

      expect(result.displayValue).toBe('24');
      expect(result.isPx).toBe(true);
    });

    it('should handle zero px', () => {
      const result = formatSize('0px');

      expect(result.displayValue).toBe('0');
      expect(result.isPx).toBe(true);
    });

    it('should handle large px values', () => {
      const result = formatSize('1920px');

      expect(result.displayValue).toBe('1920');
      expect(result.isPx).toBe(true);
    });

    it('should handle decimal px values', () => {
      const result = formatSize('16.5px');

      expect(result.displayValue).toBe('16.5');
      expect(result.isPx).toBe(true);
    });

    it('should handle number values', () => {
      const result = formatSize(100);

      expect(result.displayValue).toBe('100');
      expect(result.isPx).toBe(false);
    });
  });

  // ===================================================================
  // PART 3: parseSize - Special Commands (5 tests)
  // ===================================================================

  describe('parseSize - Special Commands', () => {
    it('should parse "Fit" to max-content', () => {
      const result = parseSize('Fit');

      expect(result).toBe('max-content');
    });

    it('should parse "Fill" to 100%', () => {
      const result = parseSize('Fill');

      expect(result).toBe('100%');
    });

    it('should parse "Auto" to null', () => {
      const result = parseSize('Auto');

      expect(result).toBeNull();
    });

    it('should parse empty string to null', () => {
      const result = parseSize('');

      expect(result).toBeNull();
    });

    it('should parse null to null', () => {
      const result = parseSize(null);

      expect(result).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: parseSize - Numeric Values (3 tests)
  // ===================================================================

  describe('parseSize - Numeric Values', () => {
    it('should parse number string to px', () => {
      const result = parseSize('16');

      expect(result).toBe('16px');
    });

    it('should parse decimal to px', () => {
      const result = parseSize('24.5');

      expect(result).toBe('24.5px');
    });

    it('should parse zero to px', () => {
      const result = parseSize('0');

      expect(result).toBe('0px');
    });
  });

  // ===================================================================
  // PART 5: Integration Tests (2 tests)
  // ===================================================================

  describe('Integration - Round Trip', () => {
    it('should handle format -> parse -> format cycle for Fill', () => {
      const formatted = formatSize('100%');
      expect(formatted.placeholder).toBe('Fill');

      // User would type "Fill" in UI
      const parsed = parseSize('Fill');
      expect(parsed).toBe('100%');

      // Format again
      const reformatted = formatSize(parsed);
      expect(reformatted.placeholder).toBe('Fill');
    });

    it('should handle format -> parse -> format cycle for px', () => {
      const formatted = formatSize('24px');
      expect(formatted.displayValue).toBe('24');

      // User would type "24" in UI
      const parsed = parseSize('24');
      expect(parsed).toBe('24px');

      // Format again
      const reformatted = formatSize(parsed);
      expect(reformatted.displayValue).toBe('24');
    });
  });
});

