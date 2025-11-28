// ===================================================================
// Unit Tests for HTML Attribute Entity Selectors
// CRITICAL BUSINESS LOGIC - HTML Attribute Management
// Week 2, Day 5 - Part 2 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the uiStates selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedHtmlAttrId: (state) => state.htmlAttrEntity.ui.selectedHtmlAttrId,
}));

import {
  selectHtmlAttrState,
  selectHtmlAttrEntities,
  selectHtmlAttrIds,
  selectHtmlAttrUI,
  selectAllHtmlAttrs,
  selectHtmlAttrById,
  selectSelectedHtmlAttr,
  selectHtmlAttrsByIds,
} from './selectors';

describe('HTML Attribute Entity Selectors', () => {
  let mockState;

  beforeEach(() => {
    mockState = {
      htmlAttrEntity: {
        entities: {
          'attr-1': { id: 'attr-1', name: 'class', value: 'btn btn-primary' },
          'attr-2': { id: 'attr-2', name: 'id', value: 'main-button' },
          'attr-3': { id: 'attr-3', name: 'data-test', value: 'submit' },
          'attr-4': { id: 'attr-4', name: 'aria-label', value: 'Submit button' },
          'attr-5': { id: 'attr-5', name: 'disabled', value: 'true' },
        },
        ids: ['attr-1', 'attr-2', 'attr-3', 'attr-4', 'attr-5'],
        ui: {
          selectedHtmlAttrId: 'attr-1',
          hoveredHtmlAttrId: 'attr-2',
        },
      },
    };
  });

  // ===================================================================
  // PART 1: Base State Selectors (4 tests)
  // ===================================================================

  describe('Base State Selectors', () => {
    it('should select html attr state', () => {
      const result = selectHtmlAttrState(mockState);

      expect(result).toBe(mockState.htmlAttrEntity);
      expect(result).toHaveProperty('entities');
      expect(result).toHaveProperty('ids');
      expect(result).toHaveProperty('ui');
    });

    it('should select html attr entities', () => {
      const result = selectHtmlAttrEntities(mockState);

      expect(result).toEqual(mockState.htmlAttrEntity.entities);
      expect(Object.keys(result)).toHaveLength(5);
    });

    it('should select html attr IDs', () => {
      const result = selectHtmlAttrIds(mockState);

      expect(result).toEqual(['attr-1', 'attr-2', 'attr-3', 'attr-4', 'attr-5']);
      expect(result).toHaveLength(5);
    });

    it('should select html attr UI state', () => {
      const result = selectHtmlAttrUI(mockState);

      expect(result).toEqual({
        selectedHtmlAttrId: 'attr-1',
        hoveredHtmlAttrId: 'attr-2',
      });
    });
  });

  // ===================================================================
  // PART 2: Entity Retrieval (5 tests)
  // ===================================================================

  describe('Entity Retrieval', () => {
    it('should select all html attrs', () => {
      const result = selectAllHtmlAttrs(mockState);

      expect(result).toHaveLength(5);
      expect(result[0]).toEqual({ id: 'attr-1', name: 'class', value: 'btn btn-primary' });
      expect(result[4]).toEqual({ id: 'attr-5', name: 'disabled', value: 'true' });
    });

    it('should select html attr by ID', () => {
      const result = selectHtmlAttrById(mockState, 'attr-1');

      expect(result).toEqual({
        id: 'attr-1',
        name: 'class',
        value: 'btn btn-primary',
      });
    });

    it('should return undefined for non-existent ID', () => {
      const result = selectHtmlAttrById(mockState, 'attr-999');

      expect(result).toBeUndefined();
    });

    it('should select html attrs by multiple IDs', () => {
      const result = selectHtmlAttrsByIds(mockState, ['attr-1', 'attr-3', 'attr-5']);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('attr-1');
      expect(result[1].id).toBe('attr-3');
      expect(result[2].id).toBe('attr-5');
    });

    it('should filter out non-existent IDs when selecting by IDs', () => {
      const result = selectHtmlAttrsByIds(mockState, ['attr-1', 'attr-999', 'attr-3']);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('attr-1');
      expect(result[1].id).toBe('attr-3');
    });
  });

  // ===================================================================
  // PART 3: Selected Html Attr (4 tests)
  // ===================================================================

  describe('Selected Html Attr', () => {
    it('should select selected html attr', () => {
      const result = selectSelectedHtmlAttr(mockState);

      expect(result).toEqual({
        id: 'attr-1',
        name: 'class',
        value: 'btn btn-primary',
      });
    });

    it('should return null when no attr selected', () => {
      mockState.htmlAttrEntity.ui.selectedHtmlAttrId = null;

      const result = selectSelectedHtmlAttr(mockState);

      expect(result).toBeNull();
    });

    it('should return null when selected ID does not exist', () => {
      mockState.htmlAttrEntity.ui.selectedHtmlAttrId = 'attr-999';

      const result = selectSelectedHtmlAttr(mockState);

      expect(result).toBeNull();
    });

    it('should handle undefined selectedHtmlAttrId', () => {
      mockState.htmlAttrEntity.ui.selectedHtmlAttrId = undefined;

      const result = selectSelectedHtmlAttr(mockState);

      expect(result).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: selectHtmlAttrsByIds Edge Cases (4 tests)
  // ===================================================================

  describe('selectHtmlAttrsByIds Edge Cases', () => {
    it('should return empty array for empty IDs array', () => {
      const result = selectHtmlAttrsByIds(mockState, []);

      expect(result).toEqual([]);
    });

    it('should return empty array for null IDs', () => {
      const result = selectHtmlAttrsByIds(mockState, null);

      expect(result).toEqual([]);
    });

    it('should return empty array for undefined IDs', () => {
      const result = selectHtmlAttrsByIds(mockState, undefined);

      expect(result).toEqual([]);
    });

    it('should handle null entities gracefully', () => {
      mockState.htmlAttrEntity.entities = null;

      const result = selectHtmlAttrsByIds(mockState, ['attr-1']);

      expect(result).toEqual([]);
    });
  });

  // ===================================================================
  // PART 5: Integration & Real-World Scenarios (3 tests)
  // ===================================================================

  describe('Integration & Real-World Scenarios', () => {
    it('should select attributes for button element', () => {
      const buttonAttrIds = ['attr-1', 'attr-2', 'attr-5'];
      const result = selectHtmlAttrsByIds(mockState, buttonAttrIds);

      expect(result).toHaveLength(3);
      expect(result.find(attr => attr.name === 'class')).toBeDefined();
      expect(result.find(attr => attr.name === 'id')).toBeDefined();
      expect(result.find(attr => attr.name === 'disabled')).toBeDefined();
    });

    it('should select accessibility attributes', () => {
      const a11yAttrIds = ['attr-4'];
      const result = selectHtmlAttrsByIds(mockState, a11yAttrIds);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('aria-label');
      expect(result[0].value).toBe('Submit button');
    });

    it('should handle all attrs selection in correct order', () => {
      const result = selectAllHtmlAttrs(mockState);

      expect(result.map(attr => attr.id)).toEqual([
        'attr-1',
        'attr-2',
        'attr-3',
        'attr-4',
        'attr-5',
      ]);
    });
  });
});
