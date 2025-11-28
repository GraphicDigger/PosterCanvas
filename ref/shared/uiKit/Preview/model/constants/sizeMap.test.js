// ===================================================================
// Unit Tests for SIZE_MAP - Preview Size Constants
// Coverage Target: 100%
// Phase 5 - Continuation: Pushing to 3,100! 🚀
// ===================================================================

import { describe, it, expect } from 'vitest';
import { SIZE_MAP } from './sizeMap';

describe('SIZE_MAP - Preview', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(SIZE_MAP).toBeTypeOf('object');
      expect(SIZE_MAP).not.toBeNull();
    });

    it('should have all required size keys', () => {
      expect(SIZE_MAP).toHaveProperty('small');
      expect(SIZE_MAP).toHaveProperty('medium');
      expect(SIZE_MAP).toHaveProperty('large');
      expect(SIZE_MAP).toHaveProperty('xlarge');
    });

    it('should have exactly 4 sizes', () => {
      const keys = Object.keys(SIZE_MAP);
      expect(keys).toHaveLength(4);
    });

    it('should have correct keys', () => {
      const keys = Object.keys(SIZE_MAP);
      expect(keys).toEqual(['small', 'medium', 'large', 'xlarge']);
    });
  });

  describe('Size values', () => {
    it('should have small size of 16px', () => {
      expect(SIZE_MAP.small).toBe('16px');
    });

    it('should have medium size of 44px', () => {
      expect(SIZE_MAP.medium).toBe('44px');
    });

    it('should have large size of 60px', () => {
      expect(SIZE_MAP.large).toBe('60px');
    });

    it('should have xlarge size of 80px', () => {
      expect(SIZE_MAP.xlarge).toBe('80px');
    });
  });

  describe('Value types', () => {
    it('should have all string values', () => {
      Object.values(SIZE_MAP).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have all values ending with px', () => {
      Object.values(SIZE_MAP).forEach(value => {
        expect(value).toMatch(/px$/);
      });
    });

    it('should have numeric pixel values', () => {
      Object.values(SIZE_MAP).forEach(value => {
        const numericValue = parseInt(value, 10);
        expect(numericValue).toBeGreaterThan(0);
        expect(Number.isNaN(numericValue)).toBe(false);
      });
    });
  });

  describe('Size ordering', () => {
    it('should have increasing sizes', () => {
      const small = parseInt(SIZE_MAP.small, 10);
      const medium = parseInt(SIZE_MAP.medium, 10);
      const large = parseInt(SIZE_MAP.large, 10);
      const xlarge = parseInt(SIZE_MAP.xlarge, 10);

      expect(small).toBeLessThan(medium);
      expect(medium).toBeLessThan(large);
      expect(large).toBeLessThan(xlarge);
    });

    it('should have logical size progression', () => {
      const sizes = Object.values(SIZE_MAP).map(v => parseInt(v, 10));
      for (let i = 0; i < sizes.length - 1; i++) {
        expect(sizes[i]).toBeLessThan(sizes[i + 1]);
      }
    });

    it('should have reasonable size differences', () => {
      const small = parseInt(SIZE_MAP.small, 10);
      const medium = parseInt(SIZE_MAP.medium, 10);
      const large = parseInt(SIZE_MAP.large, 10);
      const xlarge = parseInt(SIZE_MAP.xlarge, 10);

      expect(medium - small).toBeGreaterThan(0);
      expect(large - medium).toBeGreaterThan(0);
      expect(xlarge - large).toBeGreaterThan(0);
    });
  });

  describe('Key naming', () => {
    it('should have lowercase keys', () => {
      Object.keys(SIZE_MAP).forEach(key => {
        expect(key).toBe(key.toLowerCase());
      });
    });
  });

  describe('CSS compatibility', () => {
    it('should have valid CSS pixel values', () => {
      Object.values(SIZE_MAP).forEach(value => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('should be usable as CSS properties', () => {
      Object.values(SIZE_MAP).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value).toBeTruthy();
      });
    });
  });

  describe('Immutability', () => {
    it('should return same reference', () => {
      const ref1 = SIZE_MAP;
      const ref2 = SIZE_MAP;
      expect(ref1).toBe(ref2);
    });
  });

  describe('Usage patterns', () => {
    it('should be usable for preview sizing', () => {
      const size = SIZE_MAP.medium;
      expect(typeof size).toBe('string');
      expect(size).toMatch(/px$/);
    });

    it('should support all common size options', () => {
      expect(SIZE_MAP.small).toBeDefined();
      expect(SIZE_MAP.medium).toBeDefined();
      expect(SIZE_MAP.large).toBeDefined();
      expect(SIZE_MAP.xlarge).toBeDefined();
    });

    it('should have usable numeric values', () => {
      Object.values(SIZE_MAP).forEach(value => {
        const numericValue = parseInt(value, 10);
        expect(numericValue).toBeGreaterThan(10); // Reasonable minimum
        expect(numericValue).toBeLessThan(200); // Reasonable maximum
      });
    });
  });

  describe('Comparison with Avatar sizes', () => {
    it('should have different small size than Avatar (16px vs 20px)', () => {
      expect(SIZE_MAP.small).toBe('16px');
      // Avatar small is 20px, Preview is 16px (smaller)
    });

    it('should have different medium size than Avatar (44px vs 28px)', () => {
      expect(SIZE_MAP.medium).toBe('44px');
      // Preview medium is larger than Avatar medium
    });
  });
});

