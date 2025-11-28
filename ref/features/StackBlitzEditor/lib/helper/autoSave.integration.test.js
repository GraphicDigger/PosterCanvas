// ===================================================================
// INTEGRATION TESTS: AutoSave System
// 🚀 LEGENDARY TESTING JOURNEY - Beyond 600 Tests! 🚀
// AutoSave, File Change Detection, Conflict Resolution
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { autoSave } from './autoSave';

describe('AutoSave Integration - CRITICAL BUSINESS LOGIC', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // ===================================================================
  // Section 1: AutoSave Triggering (8 tests)
  // ===================================================================

  describe('AutoSave Triggering', () => {
    it('should trigger autoSave after debounce delay', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('test code');

      // Fast-forward past debounce delay
      vi.advanceTimersByTime(1000);

      expect(mockUpdateCode).toHaveBeenCalledWith('test code');
    });

    it('should not trigger autoSave before debounce delay', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('test code');

      // Don't advance timers
      expect(mockUpdateCode).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid autoSave calls', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      // Call autoSave multiple times rapidly
      debouncedSave('code1');
      debouncedSave('code2');
      debouncedSave('code3');

      vi.advanceTimersByTime(1000);

      // Should only trigger once due to debouncing
      expect(mockUpdateCode).toHaveBeenCalledTimes(1);
      expect(mockUpdateCode).toHaveBeenCalledWith('code3');
    });

    it('should handle autoSave with empty content', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('');
      vi.advanceTimersByTime(1000);

      expect(mockUpdateCode).toHaveBeenCalledWith('');
    });

    it('should handle autoSave with complex content', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);
      const complexCode = 'console.log("test");\nconst obj = { nested: { value: 123 } };';

      debouncedSave(complexCode);
      vi.advanceTimersByTime(1000);

      expect(mockUpdateCode).toHaveBeenCalledWith(complexCode);
    });

    it('should handle autoSave with null updateCode', async () => {
      // Should not throw error
      expect(() => {
        autoSave(null);
      }).not.toThrow();
    });

    it('should handle autoSave with undefined updateCode', async () => {
      // Should not throw error
      expect(() => {
        autoSave(undefined);
      }).not.toThrow();
    });

    it('should handle autoSave with non-function updateCode', async () => {
      // Should not throw error
      expect(() => {
        autoSave('not a function');
      }).not.toThrow();
    });
  });

  // ===================================================================
  // Section 2: File Change Detection (7 tests)
  // ===================================================================

  describe('File Change Detection', () => {
    it('should setup debounced function correctly', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      expect(typeof debouncedSave).toBe('function');
    });

    it('should handle file change events', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('changed content');

      vi.advanceTimersByTime(1000);
      expect(mockUpdateCode).toHaveBeenCalledWith('changed content');
    });

    it('should handle multiple file change events', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('change1');
      debouncedSave('change2');
      debouncedSave('change3');

      vi.advanceTimersByTime(1000);

      // Should only trigger once due to debouncing
      expect(mockUpdateCode).toHaveBeenCalledTimes(1);
      expect(mockUpdateCode).toHaveBeenCalledWith('change3');
    });

    it('should handle file change with no content', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('');

      vi.advanceTimersByTime(1000);
      expect(mockUpdateCode).toHaveBeenCalledWith('');
    });

    it('should handle file change with large content', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);
      const largeContent = 'a'.repeat(10000); // 10KB content

      debouncedSave(largeContent);

      vi.advanceTimersByTime(1000);
      expect(mockUpdateCode).toHaveBeenCalledWith(largeContent);
    });

    it('should handle file change with special characters', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);
      const specialContent = 'console.log("©®™€£¥@#$%^&*(){}[]|\\:;"\'<>,.?/~`");';

      debouncedSave(specialContent);

      vi.advanceTimersByTime(1000);
      expect(mockUpdateCode).toHaveBeenCalledWith(specialContent);
    });

    it('should handle file change with Unicode content', () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);
      const unicodeContent = 'console.log("你好世界 مرحبا العالم Здравствуй мир 🌍🚀🎉");';

      debouncedSave(unicodeContent);

      vi.advanceTimersByTime(1000);
      expect(mockUpdateCode).toHaveBeenCalledWith(unicodeContent);
    });
  });

  // ===================================================================
  // Section 3: Error Handling & Edge Cases (5 tests)
  // ===================================================================

  describe('Error Handling & Edge Cases', () => {
    it('should handle autoSave with network errors', async () => {
      const mockUpdateCode = vi.fn().mockRejectedValue(new Error('Network error'));
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('test code');

      // Wait for the debounced function to execute
      await vi.advanceTimersByTimeAsync(1000);

      expect(console.error).toHaveBeenCalledWith(
        '[StackBlitzEditor] Ошибка автосохранения:',
        expect.any(Error),
      );
    });

    it('should handle autoSave with updateCode errors', async () => {
      const mockUpdateCode = vi.fn().mockImplementation(() => {
        throw new Error('Update error');
      });
      const debouncedSave = autoSave(mockUpdateCode);

      debouncedSave('test code');
      vi.advanceTimersByTime(1000);

      expect(console.error).toHaveBeenCalledWith(
        '[StackBlitzEditor] Ошибка автосохранения:',
        expect.any(Error),
      );
    });

    it('should handle autoSave with invalid content', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      // Should not throw error
      expect(() => {
        debouncedSave(null);
        debouncedSave(undefined);
        debouncedSave(123);
        debouncedSave({});
        vi.advanceTimersByTime(1000);
      }).not.toThrow();
    });

    it('should handle autoSave with circular content', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      // Create circular reference
      const circularContent = {};
      circularContent.self = circularContent;

      // Should not throw error
      expect(() => {
        debouncedSave(circularContent);
        vi.advanceTimersByTime(1000);
      }).not.toThrow();
    });

    it('should handle autoSave with very deep nested content', async () => {
      const mockUpdateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(mockUpdateCode);

      // Create very deep nested content
      const deepContent = {};
      let current = deepContent;
      for (let i = 0; i < 1000; i++) {
        current[`level-${i}`] = {};
        current = current[`level-${i}`];
      }

      // Should not throw error
      expect(() => {
        debouncedSave(deepContent);
        vi.advanceTimersByTime(1000);
      }).not.toThrow();
    });
  });
});

