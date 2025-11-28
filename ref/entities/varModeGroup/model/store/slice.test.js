// ===================================================================
// Unit Tests for VarModeGroup Slice
// Phase 1, Day 3 - Part 4 (10 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import variableModeGroupEntitySlice, {
  setVariableModeGroups,
  setHoveredVariableModeGroupId,
  setFocusedVariableModeGroupId,
  setSelectedVariableModeGroupId,
  addVariableModeGroup,
  updateVariableModeGroup,
  removeVariableModeGroup,
} from './slice';

describe('VarModeGroup Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredVariableModeGroupId: null,
        focusedVariableModeGroupId: null,
        selectedVariableModeGroupId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered mode group ID', () => {
      const state = variableModeGroupEntitySlice(
        initialState,
        setHoveredVariableModeGroupId('mg-1'),
      );
      expect(state.ui.hoveredVariableModeGroupId).toBe('mg-1');
    });

    it('should set focused mode group ID', () => {
      const state = variableModeGroupEntitySlice(
        initialState,
        setFocusedVariableModeGroupId('mg-2'),
      );
      expect(state.ui.focusedVariableModeGroupId).toBe('mg-2');
    });

    it('should set selected mode group ID', () => {
      const state = variableModeGroupEntitySlice(
        initialState,
        setSelectedVariableModeGroupId('mg-3'),
      );
      expect(state.ui.selectedVariableModeGroupId).toBe('mg-3');
    });
  });

  // ===================================================================
  // PART 2: Set Mode Groups (Bulk Load) (4 tests)
  // ===================================================================

  describe('Set Variable Mode Groups (Bulk Load)', () => {
    it('should set mode groups (replace all)', () => {
      const groups = [
        { id: 'mg-1', name: 'Theme Modes' },
        { id: 'mg-2', name: 'Size Modes' },
      ];

      const state = variableModeGroupEntitySlice(
        initialState,
        setVariableModeGroups(groups),
      );

      expect(state.ids).toEqual(['mg-1', 'mg-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing groups when setting new ones', () => {
      initialState.entities['mg-old'] = { id: 'mg-old', name: 'Old Group' };
      initialState.ids.push('mg-old');

      const groups = [{ id: 'mg-new', name: 'New Group' }];
      const state = variableModeGroupEntitySlice(
        initialState,
        setVariableModeGroups(groups),
      );

      expect(state.entities['mg-old']).toBeUndefined();
      expect(state.entities['mg-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['mg-1'] = { id: 'mg-1', name: 'Group' };
      initialState.ids.push('mg-1');

      const state = variableModeGroupEntitySlice(
        initialState,
        setVariableModeGroups([]),
      );

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state', () => {
      initialState.ui.hoveredVariableModeGroupId = 'mg-hover';

      const groups = [{ id: 'mg-1', name: 'Group' }];
      const state = variableModeGroupEntitySlice(
        initialState,
        setVariableModeGroups(groups),
      );

      expect(state.ui.hoveredVariableModeGroupId).toBe('mg-hover');
    });
  });

  // ===================================================================
  // PART 3: Mutation Stubs (3 tests)
  // ===================================================================

  describe('Mutation Actions (Stubs)', () => {
    it('should handle addVariableModeGroup without error', () => {
      expect(() => {
        variableModeGroupEntitySlice(
          initialState,
          addVariableModeGroup({ id: 'mg-1', name: 'New Group' }),
        );
      }).not.toThrow();
    });

    it('should handle updateVariableModeGroup without error', () => {
      expect(() => {
        variableModeGroupEntitySlice(
          initialState,
          updateVariableModeGroup({ id: 'mg-1', updates: { name: 'Updated' } }),
        );
      }).not.toThrow();
    });

    it('should handle removeVariableModeGroup without error', () => {
      expect(() => {
        variableModeGroupEntitySlice(initialState, removeVariableModeGroup('mg-1'));
      }).not.toThrow();
    });
  });
});

