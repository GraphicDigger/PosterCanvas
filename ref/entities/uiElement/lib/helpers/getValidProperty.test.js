// ===================================================================
// GET VALID PROPERTY - COMPREHENSIVE TESTS
// ===================================================================
// Entity: uiElement
// Function: getValidProperty
// Purpose: Filter undefined/null values to avoid CSS cascade override
// Coverage: Valid values, null, undefined, edge cases
// ===================================================================

import { describe, it, expect } from 'vitest';
import { getValidProperty } from './getValidProperty';

describe('getValidProperty', () => {
  // ===================================================================
  // VALID VALUES
  // ===================================================================

  describe('Valid Values', () => {
    it('should return valid string value', () => {
      expect(getValidProperty('test')).toBe('test');
    });

    it('should return valid number value', () => {
      expect(getValidProperty(42)).toBe(42);
    });

    it('should return valid boolean true', () => {
      expect(getValidProperty(true)).toBe(true);
    });

    it('should return valid boolean false', () => {
      expect(getValidProperty(false)).toBe(false);
    });

    it('should return zero (0)', () => {
      expect(getValidProperty(0)).toBe(0);
    });

    it('should return empty string', () => {
      expect(getValidProperty('')).toBe('');
    });

    it('should return valid object', () => {
      const obj = { key: 'value' };
      expect(getValidProperty(obj)).toBe(obj);
    });

    it('should return valid array', () => {
      const arr = [1, 2, 3];
      expect(getValidProperty(arr)).toBe(arr);
    });
  });

  // ===================================================================
  // INVALID VALUES
  // ===================================================================

  describe('Invalid Values', () => {
    it('should return undefined for undefined input', () => {
      expect(getValidProperty(undefined)).toBeUndefined();
    });

    it('should return undefined for null input', () => {
      expect(getValidProperty(null)).toBeUndefined();
    });
  });

  // ===================================================================
  // EDGE CASES
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle NaN as valid (number type)', () => {
      expect(getValidProperty(NaN)).toBe(NaN);
    });

    it('should handle negative numbers', () => {
      expect(getValidProperty(-10)).toBe(-10);
    });

    it('should handle decimal numbers', () => {
      expect(getValidProperty(3.14)).toBe(3.14);
    });

    it('should handle empty array', () => {
      expect(getValidProperty([])).toEqual([]);
    });

    it('should handle empty object', () => {
      expect(getValidProperty({})).toEqual({});
    });

    it('should handle function', () => {
      const fn = () => {};
      expect(getValidProperty(fn)).toBe(fn);
    });

    it('should handle Symbol', () => {
      const sym = Symbol('test');
      expect(getValidProperty(sym)).toBe(sym);
    });
  });
});

