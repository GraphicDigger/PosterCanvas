// ===================================================================
// Unit Tests for Code Entity Selectors
// CRITICAL BUSINESS LOGIC - Code Management System
// Week 2, Day 5 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import {
  selectHoveredCodeId,
  selectFocusedCodeId,
  selectSelectedCodeId,
  selectCodeCheckStates,
  selectAllCodes,
  selectCodesByType,
  selectCodeById,
  selectSelectedCode,
  selectCodesByComponentId,
  selectCodesByScreenId,
} from './selectors';

describe('Code Entity Selectors', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      codeEntity: {
        entities: {
          'code-1': { id: 'code-1', type: 'jsx', lang: 'jsx', componentId: 'comp-1', content: '<div>Hello</div>' },
          'code-2': { id: 'code-2', type: 'css', lang: 'css', componentId: 'comp-1', content: '.btn { }' },
          'code-3': { id: 'code-3', type: 'jsx', lang: 'jsx', screenId: 'screen-1', content: '<Screen />' },
          'code-4': { id: 'code-4', type: 'css', lang: 'css', screenId: 'screen-1', content: '.screen { }' },
          'code-5': { id: 'code-5', type: 'js', lang: 'js', componentId: 'comp-2', content: 'const x = 1;' },
        },
        ids: ['code-1', 'code-2', 'code-3', 'code-4', 'code-5'],
        ui: {
          hoveredCodeId: 'code-1',
          focusedCodeId: 'code-2',
          selectedCodeId: 'code-3',
        },
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Selectors (3 tests)
  // ===================================================================

  describe('UI State Selectors', () => {
    it('should select hovered code ID', () => {
      const result = selectHoveredCodeId(mockState);

      expect(result).toBe('code-1');
    });

    it('should select focused code ID', () => {
      const result = selectFocusedCodeId(mockState);

      expect(result).toBe('code-2');
    });

    it('should select selected code ID', () => {
      const result = selectSelectedCodeId(mockState);

      expect(result).toBe('code-3');
    });
  });

  // ===================================================================
  // PART 2: Check States (4 tests)
  // ===================================================================

  describe('Check States', () => {
    it('should return true for selected code', () => {
      const result = selectCodeCheckStates(mockState, 'code-3');

      expect(result.isSelected).toBe(true);
      expect(result.isFocused).toBe(false);
      expect(result.isHovered).toBe(false);
    });

    it('should return true for focused code', () => {
      const result = selectCodeCheckStates(mockState, 'code-2');

      expect(result.isSelected).toBe(false);
      expect(result.isFocused).toBe(true);
      expect(result.isHovered).toBe(false);
    });

    it('should return true for hovered code', () => {
      const result = selectCodeCheckStates(mockState, 'code-1');

      expect(result.isSelected).toBe(false);
      expect(result.isFocused).toBe(false);
      expect(result.isHovered).toBe(true);
    });

    it('should return all false for non-matching code', () => {
      const result = selectCodeCheckStates(mockState, 'code-999');

      expect(result.isSelected).toBe(false);
      expect(result.isFocused).toBe(false);
      expect(result.isHovered).toBe(false);
    });
  });

  // ===================================================================
  // PART 3: Entity Collection Selectors (4 tests)
  // ===================================================================

  describe('Entity Collection Selectors', () => {
    it('should select all codes', () => {
      const result = selectAllCodes(mockState);

      expect(result).toHaveLength(5);
      expect(result[0].id).toBe('code-1');
      expect(result[4].id).toBe('code-5');
    });

    it('should select code by ID', () => {
      const result = selectCodeById(mockState, 'code-1');

      expect(result).toEqual({
        id: 'code-1',
        type: 'jsx',
        lang: 'jsx',
        componentId: 'comp-1',
        content: '<div>Hello</div>',
      });
    });

    it('should return undefined for non-existent code ID', () => {
      const result = selectCodeById(mockState, 'code-999');

      expect(result).toBeUndefined();
    });

    it('should select selected code', () => {
      const result = selectSelectedCode(mockState);

      expect(result).toEqual({
        id: 'code-3',
        type: 'jsx',
        lang: 'jsx',
        screenId: 'screen-1',
        content: '<Screen />',
      });
    });
  });

  // ===================================================================
  // PART 4: Filtering by Type (3 tests)
  // ===================================================================

  describe('Filtering by Type', () => {
    it('should select codes by type jsx', () => {
      const result = selectCodesByType(mockState, 'jsx');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('code-1');
      expect(result[1].id).toBe('code-3');
    });

    it('should select codes by type css', () => {
      const result = selectCodesByType(mockState, 'css');

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('code-2');
      expect(result[1].id).toBe('code-4');
    });

    it('should select codes by type js', () => {
      const result = selectCodesByType(mockState, 'js');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('code-5');
    });
  });

  // ===================================================================
  // PART 5: Component & Screen Filtering with Sorting (4 tests)
  // ===================================================================

  describe('Component & Screen Filtering with Sorting', () => {
    it('should select codes by component ID with jsx first', () => {
      const result = selectCodesByComponentId(mockState, 'comp-1');

      expect(result).toHaveLength(2);
      expect(result[0].lang).toBe('jsx'); // JSX should come first
      expect(result[1].lang).toBe('css'); // CSS should come second
    });

    it('should select codes by screen ID with jsx first', () => {
      const result = selectCodesByScreenId(mockState, 'screen-1');

      expect(result).toHaveLength(2);
      expect(result[0].lang).toBe('jsx');
      expect(result[1].lang).toBe('css');
    });

    it('should return empty array for non-existent component', () => {
      const result = selectCodesByComponentId(mockState, 'comp-999');

      expect(result).toEqual([]);
    });

    it('should return empty array for non-existent screen', () => {
      const result = selectCodesByScreenId(mockState, 'screen-999');

      expect(result).toEqual([]);
    });
  });

  // ===================================================================
  // PART 6: Edge Cases (2 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should return null for selected code when no code selected', () => {
      mockState.codeEntity.ui.selectedCodeId = null;

      const result = selectSelectedCode(mockState);

      expect(result).toBeNull();
    });

    it('should handle empty codes array', () => {
      mockState.codeEntity.entities = {};
      mockState.codeEntity.ids = [];

      const result = selectAllCodes(mockState);

      expect(result).toEqual([]);
    });
  });
});
