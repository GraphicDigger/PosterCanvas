// ===================================================================
// Unit Tests for getImageObjectFit - Image Object Fit Calculation
// Coverage Target: 100%
// Phase 5 - Final Push: REACHING 3,000 TESTS!!! 🏁
// ===================================================================

import { describe, it, expect } from 'vitest';
import { getImageObjectFit } from './getImageObjectFit';

describe('getImageObjectFit', () => {
  describe('Landscape images (width > height)', () => {
    it('should return contain for landscape image', () => {
      const result = getImageObjectFit(1920, 1080);
      expect(result).toBe('contain');
    });

    it('should return contain for wide landscape image', () => {
      const result = getImageObjectFit(1920, 500);
      expect(result).toBe('contain');
    });

    it('should return contain for slightly landscape image', () => {
      const result = getImageObjectFit(101, 100);
      expect(result).toBe('contain');
    });

    it('should return contain for very wide image', () => {
      const result = getImageObjectFit(3840, 1080);
      expect(result).toBe('contain');
    });

    it('should return contain for minimal width difference', () => {
      const result = getImageObjectFit(501, 500);
      expect(result).toBe('contain');
    });
  });

  describe('Portrait and square images (width <= height)', () => {
    it('should return default for portrait image', () => {
      const result = getImageObjectFit(1080, 1920);
      expect(result).toBe('cover');
    });

    it('should return default for square image', () => {
      const result = getImageObjectFit(1000, 1000);
      expect(result).toBe('cover');
    });

    it('should return default for tall portrait image', () => {
      const result = getImageObjectFit(500, 1920);
      expect(result).toBe('cover');
    });

    it('should return default for slightly portrait image', () => {
      const result = getImageObjectFit(100, 101);
      expect(result).toBe('cover');
    });

    it('should return default for minimal height difference', () => {
      const result = getImageObjectFit(500, 501);
      expect(result).toBe('cover');
    });
  });

  describe('Custom default objectFit', () => {
    it('should return contain for landscape with custom default', () => {
      const result = getImageObjectFit(1920, 1080, 'fill');
      expect(result).toBe('contain');
    });

    it('should return custom default for portrait', () => {
      const result = getImageObjectFit(1080, 1920, 'fill');
      expect(result).toBe('fill');
    });

    it('should return custom default for square', () => {
      const result = getImageObjectFit(1000, 1000, 'none');
      expect(result).toBe('none');
    });

    it('should accept scale-down as default', () => {
      const result = getImageObjectFit(500, 600, 'scale-down');
      expect(result).toBe('scale-down');
    });

    it('should accept contain as default', () => {
      const result = getImageObjectFit(800, 900, 'contain');
      expect(result).toBe('contain');
    });

    it('should accept custom string as default', () => {
      const result = getImageObjectFit(500, 1000, 'custom-value');
      expect(result).toBe('custom-value');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero width', () => {
      const result = getImageObjectFit(0, 1920);
      expect(result).toBe('cover');
    });

    it('should handle zero height', () => {
      const result = getImageObjectFit(1920, 0);
      expect(result).toBe('contain');
    });

    it('should handle both zero dimensions', () => {
      const result = getImageObjectFit(0, 0);
      expect(result).toBe('cover');
    });

    it('should handle negative width', () => {
      const result = getImageObjectFit(-1920, 1080);
      expect(result).toBe('cover');
    });

    it('should handle negative height', () => {
      const result = getImageObjectFit(1920, -1080);
      expect(result).toBe('contain');
    });

    it('should handle very large dimensions', () => {
      const result = getImageObjectFit(1000000, 500000);
      expect(result).toBe('contain');
    });

    it('should handle very small dimensions', () => {
      const result = getImageObjectFit(1, 2);
      expect(result).toBe('cover');
    });

    it('should handle decimal dimensions', () => {
      const result = getImageObjectFit(1920.5, 1080.5);
      expect(result).toBe('contain');
    });

    it('should handle NaN width', () => {
      const result = getImageObjectFit(NaN, 1080);
      expect(result).toBe('cover');
    });

    it('should handle NaN height', () => {
      const result = getImageObjectFit(1920, NaN);
      expect(result).toBe('cover');
    });

    it('should handle undefined dimensions', () => {
      const result = getImageObjectFit(undefined, undefined);
      expect(result).toBe('cover');
    });

    it('should handle null dimensions', () => {
      const result = getImageObjectFit(null, null);
      expect(result).toBe('cover');
    });
  });

  describe('Common image aspect ratios', () => {
    it('should handle 16:9 landscape', () => {
      const result = getImageObjectFit(1920, 1080);
      expect(result).toBe('contain');
    });

    it('should handle 9:16 portrait', () => {
      const result = getImageObjectFit(1080, 1920);
      expect(result).toBe('cover');
    });

    it('should handle 4:3 landscape', () => {
      const result = getImageObjectFit(1024, 768);
      expect(result).toBe('contain');
    });

    it('should handle 3:4 portrait', () => {
      const result = getImageObjectFit(768, 1024);
      expect(result).toBe('cover');
    });

    it('should handle 21:9 ultrawide', () => {
      const result = getImageObjectFit(2560, 1080);
      expect(result).toBe('contain');
    });

    it('should handle 1:1 square', () => {
      const result = getImageObjectFit(1000, 1000);
      expect(result).toBe('cover');
    });

    it('should handle 2:3 portrait (photo)', () => {
      const result = getImageObjectFit(1000, 1500);
      expect(result).toBe('cover');
    });

    it('should handle 3:2 landscape (photo)', () => {
      const result = getImageObjectFit(1500, 1000);
      expect(result).toBe('contain');
    });
  });

  describe('Return value', () => {
    it('should return string type', () => {
      const result = getImageObjectFit(1920, 1080);
      expect(typeof result).toBe('string');
    });

    it('should return either contain or default value', () => {
      const result1 = getImageObjectFit(1920, 1080);
      const result2 = getImageObjectFit(1080, 1920);

      expect(['contain', 'cover']).toContain(result1);
      expect(['contain', 'cover']).toContain(result2);
    });
  });

  describe('Performance', () => {
    it('should handle many calculations efficiently', () => {
      const start = Date.now();
      for (let i = 0; i < 10000; i++) {
        getImageObjectFit(i, i + 1);
      }
      const end = Date.now();

      expect(end - start).toBeLessThan(100); // Should complete in < 100ms
    });
  });
});

