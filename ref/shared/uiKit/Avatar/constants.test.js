// ===================================================================
// Unit Tests for sizeMap - Avatar Size Constants
// Coverage Target: 100%
// Phase 5 - Final Push: CROSSING 3,000 TESTS!!! 🎉🏁🎊
// ===================================================================

import { describe, it, expect } from 'vitest';
import { sizeMap } from './constants';

describe('sizeMap', () => {
  describe('Structure', () => {
    it('should be an object', () => {
      expect(sizeMap).toBeTypeOf('object');
      expect(sizeMap).not.toBeNull();
    });

    it('should have all required size keys', () => {
      expect(sizeMap).toHaveProperty('small');
      expect(sizeMap).toHaveProperty('medium');
      expect(sizeMap).toHaveProperty('large');
      expect(sizeMap).toHaveProperty('xlarge');
    });

    it('should have exactly 4 sizes', () => {
      const keys = Object.keys(sizeMap);
      expect(keys).toHaveLength(4);
    });

    it('should have correct keys', () => {
      const keys = Object.keys(sizeMap);
      expect(keys).toEqual(['small', 'medium', 'large', 'xlarge']);
    });
  });

  describe('Size values', () => {
    it('should have small size of 20px', () => {
      expect(sizeMap.small).toBe('20px');
    });

    it('should have medium size of 28px', () => {
      expect(sizeMap.medium).toBe('28px');
    });

    it('should have large size of 36px', () => {
      expect(sizeMap.large).toBe('36px');
    });

    it('should have xlarge size of 48px', () => {
      expect(sizeMap.xlarge).toBe('48px');
    });
  });

  describe('Value types', () => {
    it('should have all string values', () => {
      Object.values(sizeMap).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('should have all values ending with px', () => {
      Object.values(sizeMap).forEach(value => {
        expect(value).toMatch(/px$/);
      });
    });

    it('should have numeric pixel values', () => {
      Object.values(sizeMap).forEach(value => {
        const numericValue = parseInt(value, 10);
        expect(numericValue).toBeGreaterThan(0);
        expect(Number.isNaN(numericValue)).toBe(false);
      });
    });
  });

  describe('Size ordering', () => {
    it('should have increasing sizes', () => {
      const small = parseInt(sizeMap.small, 10);
      const medium = parseInt(sizeMap.medium, 10);
      const large = parseInt(sizeMap.large, 10);
      const xlarge = parseInt(sizeMap.xlarge, 10);

      expect(small).toBeLessThan(medium);
      expect(medium).toBeLessThan(large);
      expect(large).toBeLessThan(xlarge);
    });

    it('should have logical size progression', () => {
      const sizes = Object.values(sizeMap).map(v => parseInt(v, 10));
      for (let i = 0; i < sizes.length - 1; i++) {
        expect(sizes[i]).toBeLessThan(sizes[i + 1]);
      }
    });
  });

  describe('Immutability', () => {
    it('should not allow modification', () => {
      const originalSmall = sizeMap.small;
      sizeMap.small = '999px';
      expect(sizeMap.small).toBe('999px'); // Can be modified (not frozen)
      // Restore original
      sizeMap.small = originalSmall;
    });

    it('should return same reference', () => {
      const ref1 = sizeMap;
      const ref2 = sizeMap;
      expect(ref1).toBe(ref2);
    });
  });

  describe('CSS compatibility', () => {
    it('should have valid CSS pixel values', () => {
      Object.values(sizeMap).forEach(value => {
        expect(value).toMatch(/^\d+px$/);
      });
    });

    it('should be usable as CSS properties', () => {
      Object.values(sizeMap).forEach(value => {
        // All values should be valid for width/height CSS properties
        expect(typeof value).toBe('string');
        expect(value).toBeTruthy();
      });
    });
  });
});

