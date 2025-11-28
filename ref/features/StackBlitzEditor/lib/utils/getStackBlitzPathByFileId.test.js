// ===================================================================
// Unit Tests for getStackBlitzPathByFileId - File ID to Path Resolution
// Coverage Target: 100%
// Phase 5 - Final Push: StackBlitz Utilities (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import { getStackBlitzPathByFileId } from './getStackBlitzPathByFileId';

// Mock ID_TO_PATH_MAP
vi.mock('../../model', () => ({
  ID_TO_PATH_MAP: {
    'app-tsx-id': '/src/App.tsx',
    'main-tsx-id': '/src/main.tsx',
    'package-json-id': '/package.json',
    'index-html-id': '/index.html',
    'vite-config-id': '/vite.config.ts',
    'tsconfig-id': '/tsconfig.json',
  },
}));

describe('getStackBlitzPathByFileId', () => {
  describe('Valid file IDs', () => {
    it('should return path for app-tsx-id', () => {
      const result = getStackBlitzPathByFileId('app-tsx-id');
      expect(result).toBe('/src/App.tsx');
    });

    it('should return path for main-tsx-id', () => {
      const result = getStackBlitzPathByFileId('main-tsx-id');
      expect(result).toBe('/src/main.tsx');
    });

    it('should return path for package-json-id', () => {
      const result = getStackBlitzPathByFileId('package-json-id');
      expect(result).toBe('/package.json');
    });

    it('should return path for index-html-id', () => {
      const result = getStackBlitzPathByFileId('index-html-id');
      expect(result).toBe('/index.html');
    });

    it('should return path for vite-config-id', () => {
      const result = getStackBlitzPathByFileId('vite-config-id');
      expect(result).toBe('/vite.config.ts');
    });

    it('should return path for tsconfig-id', () => {
      const result = getStackBlitzPathByFileId('tsconfig-id');
      expect(result).toBe('/tsconfig.json');
    });
  });

  describe('Invalid file IDs', () => {
    it('should return null for non-existent ID', () => {
      const result = getStackBlitzPathByFileId('non-existent-id');
      expect(result).toBeNull();
    });

    it('should return null for empty string ID', () => {
      const result = getStackBlitzPathByFileId('');
      expect(result).toBeNull();
    });

    it('should return null for undefined ID', () => {
      const result = getStackBlitzPathByFileId(undefined);
      expect(result).toBeNull();
    });

    it('should return null for null ID', () => {
      const result = getStackBlitzPathByFileId(null);
      expect(result).toBeNull();
    });

    it('should return null for numeric ID', () => {
      const result = getStackBlitzPathByFileId(123);
      expect(result).toBeNull();
    });

    it('should return null for object ID', () => {
      const result = getStackBlitzPathByFileId({ id: 'test' });
      expect(result).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should be case sensitive', () => {
      const result = getStackBlitzPathByFileId('APP-TSX-ID');
      expect(result).toBeNull(); // Not found due to case
    });

    it('should not partially match IDs', () => {
      const result = getStackBlitzPathByFileId('app-tsx');
      expect(result).toBeNull(); // Partial match should not work
    });

    it('should handle ID with spaces', () => {
      const result = getStackBlitzPathByFileId('app-tsx-id ');
      expect(result).toBeNull(); // Trailing space makes it different
    });

    it('should handle ID with special characters', () => {
      const result = getStackBlitzPathByFileId('app/tsx/id');
      expect(result).toBeNull();
    });

    it('should return exact match only', () => {
      const result = getStackBlitzPathByFileId('app-tsx-id-extra');
      expect(result).toBeNull(); // Extra suffix should not match
    });
  });

  describe('Return value types', () => {
    it('should return string for valid ID', () => {
      const result = getStackBlitzPathByFileId('app-tsx-id');
      expect(typeof result).toBe('string');
    });

    it('should return null (not undefined) for invalid ID', () => {
      const result = getStackBlitzPathByFileId('invalid');
      expect(result).toBeNull();
      expect(result).not.toBeUndefined();
    });
  });

  describe('Multiple calls', () => {
    it('should return consistent results', () => {
      const result1 = getStackBlitzPathByFileId('app-tsx-id');
      const result2 = getStackBlitzPathByFileId('app-tsx-id');
      expect(result1).toBe(result2);
    });

    it('should handle different IDs in sequence', () => {
      const result1 = getStackBlitzPathByFileId('app-tsx-id');
      const result2 = getStackBlitzPathByFileId('main-tsx-id');
      const result3 = getStackBlitzPathByFileId('package-json-id');

      expect(result1).toBe('/src/App.tsx');
      expect(result2).toBe('/src/main.tsx');
      expect(result3).toBe('/package.json');
    });
  });
});

