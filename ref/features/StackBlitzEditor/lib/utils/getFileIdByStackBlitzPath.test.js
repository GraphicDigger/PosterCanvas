// ===================================================================
// Unit Tests for getFileIdByStackBlitzPath - StackBlitz Path Resolution
// Coverage Target: 100%
// Phase 5 - Final Push: StackBlitz Utilities (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getFileIdByStackBlitzPath } from './getFileIdByStackBlitzPath';

// Mock ID_TO_PATH_MAP
vi.mock('../../model', () => ({
  ID_TO_PATH_MAP: {
    '/src/App.tsx': 'app-tsx-id',
    '/src/main.tsx': 'main-tsx-id',
    '/package.json': 'package-json-id',
    '/index.html': 'index-html-id',
  },
}));

describe('getFileIdByStackBlitzPath', () => {
  describe('Direct mapping', () => {
    it('should return file ID from ID_TO_PATH_MAP', () => {
      const result = getFileIdByStackBlitzPath('/src/App.tsx', {});
      expect(result).toBe('app-tsx-id');
    });

    it('should handle main.tsx path', () => {
      const result = getFileIdByStackBlitzPath('/src/main.tsx', {});
      expect(result).toBe('main-tsx-id');
    });

    it('should handle package.json path', () => {
      const result = getFileIdByStackBlitzPath('/package.json', {});
      expect(result).toBe('package-json-id');
    });

    it('should handle index.html path', () => {
      const result = getFileIdByStackBlitzPath('/index.html', {});
      expect(result).toBe('index-html-id');
    });
  });

  describe('FilesMap lookup', () => {
    it('should find file by path in filesMap', () => {
      const filesMap = {
        'custom-file-id': { path: '/src/Custom.tsx' },
        'another-file-id': { path: '/src/Another.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/Custom.tsx', filesMap);
      expect(result).toBe('custom-file-id');
    });

    it('should find second file in filesMap', () => {
      const filesMap = {
        'file-1': { path: '/src/File1.tsx' },
        'file-2': { path: '/src/File2.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/File2.tsx', filesMap);
      expect(result).toBe('file-2');
    });

    it('should iterate through all files in filesMap', () => {
      const filesMap = {
        'file-a': { path: '/src/A.tsx' },
        'file-b': { path: '/src/B.tsx' },
        'file-c': { path: '/src/C.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/C.tsx', filesMap);
      expect(result).toBe('file-c');
    });
  });

  describe('Fallback behavior', () => {
    it('should return path when no mapping found', () => {
      const path = '/src/Unknown.tsx';
      const result = getFileIdByStackBlitzPath(path, {});
      expect(result).toBe(path);
    });

    it('should return path for non-existent file', () => {
      const path = '/does/not/exist.js';
      const filesMap = {
        'file-1': { path: '/src/Other.tsx' },
      };

      const result = getFileIdByStackBlitzPath(path, filesMap);
      expect(result).toBe(path);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty filesMap', () => {
      const result = getFileIdByStackBlitzPath('/src/Unknown.tsx', {});
      expect(result).toBe('/src/Unknown.tsx');
    });

    it('should throw error for null filesMap', () => {
      expect(() => {
        getFileIdByStackBlitzPath('/src/Unknown.tsx', null);
      }).toThrow();
    });

    it('should throw error for undefined filesMap', () => {
      expect(() => {
        getFileIdByStackBlitzPath('/src/Unknown.tsx', undefined);
      }).toThrow();
    });

    it('should prioritize ID_TO_PATH_MAP over filesMap', () => {
      const filesMap = {
        'custom-id': { path: '/src/App.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/App.tsx', filesMap);
      expect(result).toBe('app-tsx-id'); // From ID_TO_PATH_MAP, not filesMap
    });

    it('should handle paths with special characters', () => {
      const filesMap = {
        'special-id': { path: '/src/My-Component_v2.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/My-Component_v2.tsx', filesMap);
      expect(result).toBe('special-id');
    });

    it('should handle nested directory paths', () => {
      const filesMap = {
        'nested-id': { path: '/src/components/buttons/PrimaryButton.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/components/buttons/PrimaryButton.tsx', filesMap);
      expect(result).toBe('nested-id');
    });

    it('should handle root-level files', () => {
      const filesMap = {
        'root-id': { path: '/README.md' },
      };

      const result = getFileIdByStackBlitzPath('/README.md', filesMap);
      expect(result).toBe('root-id');
    });

    it('should handle files without extension', () => {
      const filesMap = {
        'no-ext-id': { path: '/Dockerfile' },
      };

      const result = getFileIdByStackBlitzPath('/Dockerfile', filesMap);
      expect(result).toBe('no-ext-id');
    });

    it('should handle empty string path', () => {
      const result = getFileIdByStackBlitzPath('', {});
      expect(result).toBe('');
    });

    it('should handle filesMap with multiple entries', () => {
      const filesMap = {
        'id-1': { path: '/file1.tsx' },
        'id-2': { path: '/file2.tsx' },
        'id-3': { path: '/file3.tsx' },
        'id-4': { path: '/file4.tsx' },
        'id-5': { path: '/file5.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/file5.tsx', filesMap);
      expect(result).toBe('id-5');
    });
  });

  describe('Case sensitivity', () => {
    it('should be case sensitive', () => {
      const filesMap = {
        'lower-id': { path: '/src/component.tsx' },
      };

      const result = getFileIdByStackBlitzPath('/src/Component.tsx', filesMap);
      expect(result).toBe('/src/Component.tsx'); // Not found, returns path
    });
  });
});

