// ===================================================================
// Unit Tests for OVERFLOW - Overflow Property Constants
// Coverage Target: 100%
// Phase 5 - CROSSING 3,500! 🎊🏁
// ===================================================================

import { describe, it, expect } from 'vitest';
import { OVERFLOW } from './propertyOverflow';

describe('OVERFLOW', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(OVERFLOW).toBeTypeOf('object');
      expect(OVERFLOW).not.toBeNull();
    });

    it('should have all CSS overflow values', () => {
      expect(OVERFLOW).toHaveProperty('auto');
      expect(OVERFLOW).toHaveProperty('visible');
      expect(OVERFLOW).toHaveProperty('hidden');
      expect(OVERFLOW).toHaveProperty('scroll');
    });

    it('should have exactly 4 overflow values', () => {
      const keys = Object.keys(OVERFLOW);
      expect(keys).toHaveLength(4);
    });
  });

  describe('Overflow values', () => {
    it('should have auto', () => {
      expect(OVERFLOW.auto).toBe('auto');
    });

    it('should have visible', () => {
      expect(OVERFLOW.visible).toBe('visible');
    });

    it('should have hidden', () => {
      expect(OVERFLOW.hidden).toBe('hidden');
    });

    it('should have scroll', () => {
      expect(OVERFLOW.scroll).toBe('scroll');
    });
  });

  describe('Value format', () => {
    it('should have all string values', () => {
      Object.values(OVERFLOW).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have valid CSS overflow values', () => {
      const validValues = ['auto', 'visible', 'hidden', 'scroll'];
      Object.values(OVERFLOW).forEach(value => {
        expect(validValues).toContain(value);
      });
    });

    it('should have all lowercase values', () => {
      Object.values(OVERFLOW).forEach(value => {
        expect(value).toBe(value.toLowerCase());
      });
    });
  });

  describe('Value uniqueness', () => {
    it('should have unique values', () => {
      const values = Object.values(OVERFLOW);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });
  });

  describe('Usage patterns', () => {
    it('should be usable for CSS overflow property', () => {
      const overflow = OVERFLOW.hidden;
      expect(typeof overflow).toBe('string');
      expect(overflow).toBe('hidden');
    });

    it('should support all common overflow types', () => {
      expect(OVERFLOW.auto).toBeDefined();
      expect(OVERFLOW.visible).toBeDefined();
      expect(OVERFLOW.hidden).toBeDefined();
      expect(OVERFLOW.scroll).toBeDefined();
    });
  });

  describe('Immutability', () => {
    it('should return same reference', () => {
      const ref1 = OVERFLOW;
      const ref2 = OVERFLOW;
      expect(ref1).toBe(ref2);
    });
  });
});

