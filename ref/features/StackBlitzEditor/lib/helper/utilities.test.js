// ===================================================================
// Unit Tests for StackBlitz Utilities
// CRITICAL BUSINESS LOGIC - StackBlitz Editor System
// Week 2, Day 1 - Part 3 (20 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the debounce dependency for autoSave
vi.mock('../../lib', () => ({
  debounce: (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  },
}));

import { autoSave } from './autoSave';
import { setupFileChangeListener } from './setupFileChangeListener';

describe('StackBlitz Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // ===================================================================
  // PART 1: autoSave Function (8 tests)
  // ===================================================================

  describe('autoSave', () => {
    it('should debounce updateCode calls', async () => {
      const updateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(updateCode);

      debouncedSave('code1');
      debouncedSave('code2');
      debouncedSave('code3');

      expect(updateCode).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode).toHaveBeenCalledTimes(1);
      expect(updateCode).toHaveBeenCalledWith('code3');
    });

    it('should only call updateCode once after debounce period', async () => {
      const updateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(updateCode);

      debouncedSave('code1');
      await vi.advanceTimersByTimeAsync(500);
      debouncedSave('code2');
      await vi.advanceTimersByTimeAsync(500);
      debouncedSave('code3');
      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode).toHaveBeenCalledTimes(1);
      expect(updateCode).toHaveBeenCalledWith('code3');
    });

    it('should handle async updateCode', async () => {
      const updateCode = vi.fn().mockResolvedValue('success');
      const debouncedSave = autoSave(updateCode);

      debouncedSave('code');
      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode).toHaveBeenCalledWith('code');
      expect(console.log).toHaveBeenCalledWith(
        '[StackBlitzEditor] Код автоматически сохранен',
      );
    });

    it('should handle updateCode errors', async () => {
      const updateCode = vi.fn().mockRejectedValue(new Error('Save failed'));
      const debouncedSave = autoSave(updateCode);

      debouncedSave('code');
      await vi.advanceTimersByTimeAsync(1000);

      expect(console.error).toHaveBeenCalledWith(
        '[StackBlitzEditor] Ошибка автосохранения:',
        expect.any(Error),
      );
    });

    it('should reset debounce timer on new calls', async () => {
      const updateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(updateCode);

      debouncedSave('code1');
      await vi.advanceTimersByTimeAsync(500);

      debouncedSave('code2');
      await vi.advanceTimersByTimeAsync(500);

      // Still waiting for full 1000ms from last call
      expect(updateCode).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(500);
      expect(updateCode).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple instances', async () => {
      const updateCode1 = vi.fn().mockResolvedValue(undefined);
      const updateCode2 = vi.fn().mockResolvedValue(undefined);

      const save1 = autoSave(updateCode1);
      const save2 = autoSave(updateCode2);

      save1('code1');
      save2('code2');

      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode1).toHaveBeenCalledWith('code1');
      expect(updateCode2).toHaveBeenCalledWith('code2');
    });

    it('should handle empty/null code', async () => {
      const updateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(updateCode);

      debouncedSave('');
      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode).toHaveBeenCalledWith('');
    });

    it('should handle undefined code', async () => {
      const updateCode = vi.fn().mockResolvedValue(undefined);
      const debouncedSave = autoSave(updateCode);

      debouncedSave(undefined);
      await vi.advanceTimersByTimeAsync(1000);

      expect(updateCode).toHaveBeenCalledWith(undefined);
    });
  });

  // ===================================================================
  // PART 2: setupFileChangeListener Function (12 tests)
  // ===================================================================

  describe('setupFileChangeListener', () => {
    let mockVm;
    let mockEditor;
    let saveCallback;

    beforeEach(() => {
      mockEditor = {
        setCurrentFile: vi.fn().mockResolvedValue(undefined),
      };

      mockVm = {
        editor: mockEditor,
        getFsSnapshot: vi.fn().mockResolvedValue({
          'src/App.jsx': '<div>App</div>',
        }),
      };

      saveCallback = vi.fn();
    });

    it('should set current file on setup', async () => {
      await setupFileChangeListener(mockVm, 'src/App.jsx', saveCallback);

      expect(mockEditor.setCurrentFile).toHaveBeenCalledWith('src/App.jsx');
    });

    it('should call saveCallback when file content changes', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      // First check - no change yet
      await vi.advanceTimersByTimeAsync(100);
      expect(saveCallback).toHaveBeenCalledTimes(1);
      expect(saveCallback).toHaveBeenCalledWith('<div>App</div>');

      // Change content
      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': '<div>Updated</div>',
      });

      await vi.advanceTimersByTimeAsync(100);
      expect(saveCallback).toHaveBeenCalledTimes(2);
      expect(saveCallback).toHaveBeenCalledWith('<div>Updated</div>');

      cleanup();
    });

    it('should not call saveCallback if content unchanged', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      await vi.advanceTimersByTimeAsync(100);
      expect(saveCallback).toHaveBeenCalledTimes(1);

      // No change
      await vi.advanceTimersByTimeAsync(100);
      expect(saveCallback).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('should use default checkInterval of 1000ms', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
      );

      await vi.advanceTimersByTimeAsync(999);
      expect(saveCallback).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(1);
      expect(saveCallback).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('should return cleanup function', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      expect(typeof cleanup).toBe('function');

      // Wait for initial call
      await vi.advanceTimersByTimeAsync(100);
      expect(saveCallback).toHaveBeenCalledTimes(1);

      // Cleanup stops interval
      cleanup();

      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': '<div>Changed</div>',
      });

      await vi.advanceTimersByTimeAsync(200);
      // Should still be 1 (not called again after cleanup)
      expect(saveCallback).toHaveBeenCalledTimes(1);
    });

    it('should return null if vm is null', async () => {
      const result = await setupFileChangeListener(null, 'src/App.jsx', saveCallback);

      expect(result).toBeNull();
      expect(mockEditor.setCurrentFile).not.toHaveBeenCalled();
    });

    it('should return null if vm.editor is missing', async () => {
      const vmWithoutEditor = { getFsSnapshot: vi.fn() };
      const result = await setupFileChangeListener(
        vmWithoutEditor,
        'src/App.jsx',
        saveCallback,
      );

      expect(result).toBeNull();
    });

    it('should handle setCurrentFile error', async () => {
      mockEditor.setCurrentFile.mockRejectedValue(new Error('File not found'));

      const result = await setupFileChangeListener(
        mockVm,
        'nonexistent.js',
        saveCallback,
      );

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[StackBlitzEditor] Ошибка при настройке отслеживания изменений'),
        expect.any(Error),
      );
    });

    it('should handle getFsSnapshot error gracefully', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      mockVm.getFsSnapshot.mockRejectedValue(new Error('Snapshot failed'));

      await vi.advanceTimersByTimeAsync(100);

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[StackBlitzEditor] Ошибка при проверке изменений файла'),
        expect.any(Error),
      );

      cleanup();
    });

    it('should handle null content from snapshot', async () => {
      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': null,
      });

      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      await vi.advanceTimersByTimeAsync(100);

      // Should not call saveCallback for null content
      expect(saveCallback).not.toHaveBeenCalled();

      cleanup();
    });

    it('should handle missing file in snapshot', async () => {
      mockVm.getFsSnapshot.mockResolvedValue({
        'src/Other.jsx': '<div>Other</div>',
      });

      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        100,
      );

      await vi.advanceTimersByTimeAsync(100);

      // Should not call saveCallback if file not in snapshot
      expect(saveCallback).not.toHaveBeenCalled();

      cleanup();
    });

    it('should handle rapid content changes', async () => {
      const cleanup = await setupFileChangeListener(
        mockVm,
        'src/App.jsx',
        saveCallback,
        50,
      );

      // Initial call
      await vi.advanceTimersByTimeAsync(50);
      expect(saveCallback).toHaveBeenCalledTimes(1);

      // Rapid changes
      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': '<div>Change 1</div>',
      });
      await vi.advanceTimersByTimeAsync(50);

      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': '<div>Change 2</div>',
      });
      await vi.advanceTimersByTimeAsync(50);

      mockVm.getFsSnapshot.mockResolvedValue({
        'src/App.jsx': '<div>Change 3</div>',
      });
      await vi.advanceTimersByTimeAsync(50);

      expect(saveCallback).toHaveBeenCalledTimes(4); // Initial + 3 changes

      cleanup();
    });
  });
});

