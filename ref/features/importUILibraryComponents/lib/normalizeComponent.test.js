// ===================================================================
// NORMALIZE COMPONENT - COMPREHENSIVE TESTS
// ===================================================================
// Feature: importUILibraryComponents
// Function: normalizeComponent
// Purpose: Normalizes component data from UI library imports
// Coverage: Basic normalization, metadata, library info, edge cases
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import { normalizeComponent } from './normalizeComponent';
import { ENTITY_KINDS } from '../../../shared/constants';

vi.mock('../../../shared/constants', () => ({
  ENTITY_KINDS: {
    COMPONENT: 'component',
  },
}));

describe('normalizeComponent', () => {
  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should normalize a basic component', () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
      };

      const result = normalizeComponent(component);

      expect(result).toBeDefined();
      expect(result.id).toBe('comp-1');
      expect(result.name).toBe('Button');
      expect(result.kind).toBe(ENTITY_KINDS.COMPONENT);
    });

    it('should include metadata with source', () => {
      const component = {
        id: 'comp-2',
        name: 'Input',
      };

      const result = normalizeComponent(component);

      expect(result.metadata).toBeDefined();
      expect(result.metadata.source).toBe('ui-library');
      expect(result.metadata.originalId).toBe('comp-2');
    });

    it('should handle component without library info', () => {
      const component = {
        id: 'comp-3',
        name: 'Card',
      };

      const result = normalizeComponent(component);

      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should normalize component with library info', () => {
      const component = {
        id: 'comp-4',
        name: 'Modal',
      };

      const libraryInfo = {
        id: 'lib-1',
        name: 'Material-UI',
        version: '5.0.0',
      };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('Material-UI');
      expect(result.metadata.libraryId).toBe('lib-1');
      expect(result.metadata.libraryVersion).toBe('5.0.0');
    });
  });

  // ===================================================================
  // LIBRARY INFO TESTS
  // ===================================================================

  describe('Library Info', () => {
    it('should handle partial library info (name only)', () => {
      const component = { id: 'c1', name: 'Comp' };
      const libraryInfo = { name: 'MyLib' };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('MyLib');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should handle partial library info (id only)', () => {
      const component = { id: 'c2', name: 'Comp' };
      const libraryInfo = { id: 'lib-2' };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBe('lib-2');
      expect(result.metadata.libraryVersion).toBeNull();
    });

    it('should handle partial library info (version only)', () => {
      const component = { id: 'c3', name: 'Comp' };
      const libraryInfo = { version: '1.0.0' };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBe('1.0.0');
    });

    it('should handle empty library info object', () => {
      const component = { id: 'c4', name: 'Comp' };
      const libraryInfo = {};

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBeNull();
      expect(result.metadata.libraryVersion).toBeNull();
    });
  });

  // ===================================================================
  // NULL/UNDEFINED HANDLING TESTS
  // ===================================================================

  describe('Null/Undefined Handling', () => {
    it('should return null for null component', () => {
      const result = normalizeComponent(null);

      expect(result).toBeNull();
    });

    it('should return null for undefined component', () => {
      const result = normalizeComponent(undefined);

      expect(result).toBeNull();
    });

    it('should handle component with null library info', () => {
      const component = { id: 'c5', name: 'Comp' };

      const result = normalizeComponent(component, null);

      expect(result).toBeDefined();
      expect(result.metadata.libraryName).toBe('');
      expect(result.metadata.libraryId).toBeNull();
    });

    it('should handle component with undefined library info', () => {
      const component = { id: 'c6', name: 'Comp' };

      const result = normalizeComponent(component, undefined);

      expect(result).toBeDefined();
      expect(result.metadata.libraryName).toBe('');
    });
  });

  // ===================================================================
  // EDGE CASES TESTS
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle component with special characters in name', () => {
      const component = {
        id: 'comp-special',
        name: 'My<Component>',
      };

      const result = normalizeComponent(component);

      expect(result.name).toBe('My<Component>');
    });

    it('should handle component with empty name', () => {
      const component = {
        id: 'comp-empty',
        name: '',
      };

      const result = normalizeComponent(component);

      expect(result.name).toBe('');
    });

    it('should handle component with numeric id', () => {
      const component = {
        id: 123,
        name: 'NumericId',
      };

      const result = normalizeComponent(component);

      expect(result.id).toBe(123);
      expect(result.metadata.originalId).toBe(123);
    });

    it('should handle library with very long version string', () => {
      const component = { id: 'c7', name: 'Comp' };
      const libraryInfo = {
        name: 'Lib',
        version: '1.0.0-beta.1+build.2023.10.16',
      };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata.libraryVersion).toBe('1.0.0-beta.1+build.2023.10.16');
    });

    it('should preserve all component properties in output', () => {
      const component = {
        id: 'comp-full',
        name: 'FullComponent',
      };

      const libraryInfo = {
        id: 'lib-full',
        name: 'FullLibrary',
        version: '2.0.0',
      };

      const result = normalizeComponent(component, libraryInfo);

      expect(Object.keys(result)).toContain('id');
      expect(Object.keys(result)).toContain('name');
      expect(Object.keys(result)).toContain('kind');
      expect(Object.keys(result)).toContain('metadata');
    });
  });

  // ===================================================================
  // METADATA STRUCTURE TESTS
  // ===================================================================

  describe('Metadata Structure', () => {
    it('should have all required metadata fields', () => {
      const component = { id: 'c8', name: 'Comp' };
      const libraryInfo = { id: 'l1', name: 'Lib', version: '1.0' };

      const result = normalizeComponent(component, libraryInfo);

      expect(result.metadata).toHaveProperty('source');
      expect(result.metadata).toHaveProperty('originalId');
      expect(result.metadata).toHaveProperty('libraryName');
      expect(result.metadata).toHaveProperty('libraryId');
      expect(result.metadata).toHaveProperty('libraryVersion');
    });

    it('should set correct entity kind', () => {
      const component = { id: 'c9', name: 'Comp' };

      const result = normalizeComponent(component);

      expect(result.kind).toBe('component');
    });
  });
});

