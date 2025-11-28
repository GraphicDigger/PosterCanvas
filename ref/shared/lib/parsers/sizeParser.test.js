// ===================================================================
// Unit Tests for Size Parser Utilities
// Coverage Target: 95%+
// Week 3 - Day 3
// ===================================================================

import { describe, it, expect } from 'vitest';
import { formatSizeForUI, parseSizeFromUI } from './sizeParser';

describe('Size Parser Utilities', () => {
  describe('formatSizeForUI', () => {
    it('should format px values correctly', () => {
      const result = formatSizeForUI('16px');
      expect(result).toEqual({
        displayValue: '16',
        placeholder: '',
        isPx: true,
      });
    });

    it('should format px values with spaces', () => {
      const result = formatSizeForUI('  24px  ');
      expect(result).toEqual({
        displayValue: '24',
        placeholder: '',
        isPx: true,
      });
    });

    it('should format number values', () => {
      const result = formatSizeForUI(100);
      expect(result).toEqual({
        displayValue: '100',
        placeholder: '',
        isPx: false,
      });
    });

    it('should format string values without px', () => {
      const result = formatSizeForUI('auto');
      expect(result).toEqual({
        displayValue: 'auto',
        placeholder: '',
        isPx: false,
      });
    });

    it('should handle null values', () => {
      const result = formatSizeForUI(null);
      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Auto',
        isPx: false,
      });
    });

    it('should handle undefined values', () => {
      const result = formatSizeForUI(undefined);
      expect(result).toEqual({
        displayValue: '',
        placeholder: 'Auto',
        isPx: false,
      });
    });
  });

  describe('parseSizeFromUI', () => {
    it('should parse numeric string to px', () => {
      expect(parseSizeFromUI('16')).toBe('16px');
      expect(parseSizeFromUI('100')).toBe('100px');
      expect(parseSizeFromUI('0')).toBe('0px');
    });

    it('should parse numbers to px', () => {
      expect(parseSizeFromUI(16)).toBe('16px');
      expect(parseSizeFromUI(100)).toBe('100px');
      expect(parseSizeFromUI(0)).toBe('0px');
    });

    it('should trim whitespace before parsing', () => {
      expect(parseSizeFromUI('  24  ')).toBe('24px');
      expect(parseSizeFromUI('  100')).toBe('100px');
    });

    it('should return non-numeric strings as-is', () => {
      expect(parseSizeFromUI('auto')).toBe('auto');
      expect(parseSizeFromUI('50%')).toBe('50%');
      expect(parseSizeFromUI('1rem')).toBe('1rem');
    });

    it('should return null for null', () => {
      expect(parseSizeFromUI(null)).toBeNull();
    });

    it('should return undefined for undefined', () => {
      expect(parseSizeFromUI(undefined)).toBeUndefined();
    });

    it('should return undefined for empty string', () => {
      expect(parseSizeFromUI('')).toBeUndefined();
      expect(parseSizeFromUI('   ')).toBeUndefined();
    });
  });

  describe('Round-trip Conversions', () => {
    it('should handle formatSizeForUI -> parseSizeFromUI round-trip', () => {
      const original = '20px';
      const formatted = formatSizeForUI(original);
      const parsed = parseSizeFromUI(formatted.displayValue);

      expect(parsed).toBe('20px');
    });

    it('should handle number round-trip', () => {
      const original = 50;
      const formatted = formatSizeForUI(original);
      const parsed = parseSizeFromUI(formatted.displayValue);

      expect(parsed).toBe('50px');
    });
  });
});

