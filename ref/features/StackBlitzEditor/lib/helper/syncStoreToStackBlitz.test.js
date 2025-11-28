// ===================================================================
// STACKBLITZ INTEGRATION TESTS: Store Synchronization
// 🔴 CRITICAL-FIRST STRATEGY - Phase 4 Part 2 🔴
// Synchronization from Redux to StackBlitz VM
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { syncStoreToStackBlitz } from './syncStoreToStackBlitz';

// Mock prepareStackBlitzFiles
vi.mock('./prepareStackBlitzFiles', () => ({
  prepareStackBlitzFiles: vi.fn(),
}));

import { prepareStackBlitzFiles } from './prepareStackBlitzFiles';

describe('StackBlitz Store Synchronization - CRITICAL BUSINESS LOGIC', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // Section: Synchronization Tests (10 tests)
  // ===================================================================

  describe('Store to StackBlitz Synchronization', () => {
    it('should do nothing if VM is null', async () => {
      const files = { 'src/App.tsx': 'content' };

      await syncStoreToStackBlitz(null, files);

      // prepareStackBlitzFiles should not be called
      expect(prepareStackBlitzFiles).not.toHaveBeenCalled();
    });

    it('should do nothing if VM is undefined', async () => {
      const files = { 'src/App.tsx': 'content' };

      await syncStoreToStackBlitz(undefined, files);

      // prepareStackBlitzFiles should not be called
      expect(prepareStackBlitzFiles).not.toHaveBeenCalled();
    });

    it('should use vm.editor.setFileContents when available', async () => {
      const mockSetFileContents = vi.fn().mockResolvedValue(undefined);
      const vm = {
        editor: {
          setFileContents: mockSetFileContents,
        },
      };

      prepareStackBlitzFiles.mockReturnValue({
        'src/App.tsx': 'const App = () => {};',
        'src/index.tsx': 'import React from "react";',
      });

      await syncStoreToStackBlitz(vm, []);

      // Should call setFileContents for each file
      expect(mockSetFileContents).toHaveBeenCalledTimes(2);
      expect(mockSetFileContents).toHaveBeenCalledWith('src/App.tsx', 'const App = () => {};');
      expect(mockSetFileContents).toHaveBeenCalledWith('src/index.tsx', 'import React from "react";');
    });

    it('should use vm.applyFsDiff when editor.setFileContents not available', async () => {
      const mockApplyFsDiff = vi.fn().mockResolvedValue(undefined);
      const vm = {
        applyFsDiff: mockApplyFsDiff,
      };

      prepareStackBlitzFiles.mockReturnValue({
        'src/App.tsx': 'const App = () => {};',
      });

      await syncStoreToStackBlitz(vm, []);

      // Should call applyFsDiff
      expect(mockApplyFsDiff).toHaveBeenCalledTimes(1);
      expect(mockApplyFsDiff).toHaveBeenCalledWith({
        create: {
          'src/App.tsx': 'const App = () => {};',
        },
        destroy: [],
      });
    });

    it('should handle error during setFileContents', async () => {
      const mockSetFileContents = vi.fn()
        .mockRejectedValueOnce(new Error('File write error'))
        .mockResolvedValueOnce(undefined);

      const vm = {
        editor: {
          setFileContents: mockSetFileContents,
        },
      };

      prepareStackBlitzFiles.mockReturnValue({
        'src/App.tsx': 'content1',
        'src/index.tsx': 'content2',
      });

      // Should not throw, should continue with other files
      await expect(syncStoreToStackBlitz(vm, [])).resolves.not.toThrow();

      // Should have called setFileContents twice (one fails, one succeeds)
      expect(mockSetFileContents).toHaveBeenCalledTimes(2);
    });

    it('should handle error during applyFsDiff', async () => {
      const mockApplyFsDiff = vi.fn().mockRejectedValue(new Error('Apply error'));
      const vm = {
        applyFsDiff: mockApplyFsDiff,
      };

      prepareStackBlitzFiles.mockReturnValue({
        'src/App.tsx': 'content',
      });

      // Should not throw
      await expect(syncStoreToStackBlitz(vm, [])).resolves.not.toThrow();

      expect(mockApplyFsDiff).toHaveBeenCalled();
    });

    it('should warn if no suitable method found in VM', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const vm = {}; // No editor or applyFsDiff

      prepareStackBlitzFiles.mockReturnValue({
        'src/App.tsx': 'content',
      });

      await syncStoreToStackBlitz(vm, []);

      // Should log warning
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('No suitable method found'),
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle prepareStackBlitzFiles throwing error', async () => {
      const vm = {
        applyFsDiff: vi.fn(),
      };

      prepareStackBlitzFiles.mockImplementation(() => {
        throw new Error('Preparation error');
      });

      // Should not throw
      await expect(syncStoreToStackBlitz(vm, [])).resolves.not.toThrow();
    });

    it('should handle empty projectFiles', async () => {
      const mockSetFileContents = vi.fn();
      const vm = {
        editor: {
          setFileContents: mockSetFileContents,
        },
      };

      prepareStackBlitzFiles.mockReturnValue({});

      await syncStoreToStackBlitz(vm, []);

      // Should not call setFileContents if no files
      expect(mockSetFileContents).not.toHaveBeenCalled();
    });

    it('should handle multiple files with mixed success/failure', async () => {
      const mockSetFileContents = vi.fn()
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(new Error('Error'))
        .mockResolvedValueOnce(undefined);

      const vm = {
        editor: {
          setFileContents: mockSetFileContents,
        },
      };

      prepareStackBlitzFiles.mockReturnValue({
        'file1.tsx': 'content1',
        'file2.tsx': 'content2',
        'file3.tsx': 'content3',
      });

      await syncStoreToStackBlitz(vm, []);

      // Should attempt all files despite error in middle
      expect(mockSetFileContents).toHaveBeenCalledTimes(3);
    });
  });
});

