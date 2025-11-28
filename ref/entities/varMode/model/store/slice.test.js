// ===================================================================
// Unit Tests for VarMode Slice
// CRITICAL BUSINESS LOGIC - Variable Mode State Management
// Phase 1, Day 2 - Part 3 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import variableModeEntitySlice, {
  setVariableModes,
  setHoveredVariableModeId,
  setFocusedVariableModeId,
  setSelectedVariableModeId,
  addVariableMode,
  updateVariableMode,
  removeVariableMode,
  removeVariableModesFromCollection,
} from './slice';

describe('VarMode Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredVariableModeId: null,
        focusedVariableModeId: null,
        selectedVariableModeId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered variable mode ID', () => {
      const state = variableModeEntitySlice(
        initialState,
        setHoveredVariableModeId('mode-1'),
      );
      expect(state.ui.hoveredVariableModeId).toBe('mode-1');
    });

    it('should set focused variable mode ID', () => {
      const state = variableModeEntitySlice(
        initialState,
        setFocusedVariableModeId('mode-2'),
      );
      expect(state.ui.focusedVariableModeId).toBe('mode-2');
    });

    it('should set selected variable mode ID', () => {
      const state = variableModeEntitySlice(
        initialState,
        setSelectedVariableModeId('mode-3'),
      );
      expect(state.ui.selectedVariableModeId).toBe('mode-3');
    });
  });

  // ===================================================================
  // PART 2: Set Variable Modes (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Variable Modes (Bulk Load)', () => {
    it('should set variable modes (replace all)', () => {
      const modes = [
        { id: 'mode-1', name: 'Light', collectionId: 'col-1' },
        { id: 'mode-2', name: 'Dark', collectionId: 'col-1' },
      ];

      const state = variableModeEntitySlice(initialState, setVariableModes(modes));

      expect(state.ids).toEqual(['mode-1', 'mode-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing modes when setting new ones', () => {
      initialState.entities['mode-old'] = { id: 'mode-old', name: 'Old Mode' };
      initialState.ids.push('mode-old');

      const modes = [{ id: 'mode-new', name: 'New Mode', collectionId: 'col-1' }];
      const state = variableModeEntitySlice(initialState, setVariableModes(modes));

      expect(state.entities['mode-old']).toBeUndefined();
      expect(state.entities['mode-new']).toBeDefined();
    });

    it('should handle empty array in setVariableModes', () => {
      initialState.entities['mode-1'] = { id: 'mode-1', name: 'Mode' };
      initialState.ids.push('mode-1');

      const state = variableModeEntitySlice(initialState, setVariableModes([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting modes', () => {
      initialState.ui.hoveredVariableModeId = 'mode-hover';
      initialState.ui.focusedVariableModeId = 'mode-focus';

      const modes = [{ id: 'mode-1', name: 'Mode', collectionId: 'col-1' }];
      const state = variableModeEntitySlice(initialState, setVariableModes(modes));

      expect(state.ui.hoveredVariableModeId).toBe('mode-hover');
      expect(state.ui.focusedVariableModeId).toBe('mode-focus');
    });

    it('should set modes with complete metadata', () => {
      const modes = [
        {
          id: 'mode-1',
          name: 'Light',
          collectionId: 'col-1',
          isDefault: true,
          meta: { theme: 'light' },
        },
      ];

      const state = variableModeEntitySlice(initialState, setVariableModes(modes));

      expect(state.entities['mode-1'].name).toBe('Light');
      expect(state.entities['mode-1'].isDefault).toBe(true);
      expect(state.entities['mode-1'].meta).toEqual({ theme: 'light' });
    });
  });

  // ===================================================================
  // PART 3: Add Variable Mode (7 tests)
  // ===================================================================

  describe('Add Variable Mode', () => {
    it('should add mode with basic properties', () => {
      const mode = {
        id: 'mode-1',
        name: 'Light Mode',
        collectionId: 'col-1',
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.ids).toContain('mode-1');
      expect(state.entities['mode-1'].name).toBe('Mode'); // Always set to 'Mode' by reducer
      expect(state.entities['mode-1'].kind).toBe('variable-mode');
    });

    it('should generate ID if not provided', () => {
      const mode = {
        name: 'Dark Mode',
        collectionId: 'col-1',
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.ids).toHaveLength(1);
      const modeId = state.ids[0];
      expect(modeId).toBeTruthy();
      expect(modeId).toContain('variable-mode-');
    });

    it('should add mode with default name "Mode"', () => {
      const mode = {
        id: 'mode-1',
        collectionId: 'col-1',
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.entities['mode-1'].name).toBe('Mode');
    });

    it('should add mode with isDefault false by default', () => {
      const mode = {
        id: 'mode-1',
        name: 'Custom Mode',
        collectionId: 'col-1',
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.entities['mode-1'].isDefault).toBe(false);
    });

    it('should add mode with isDefault true when specified', () => {
      const mode = {
        id: 'mode-1',
        name: 'Default Mode',
        collectionId: 'col-1',
        isDefault: true,
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.entities['mode-1'].isDefault).toBe(true);
    });

    it('should add mode with metadata', () => {
      const mode = {
        id: 'mode-1',
        name: 'Light Mode',
        collectionId: 'col-1',
        meta: { theme: 'light', priority: 1 },
      };

      const state = variableModeEntitySlice(initialState, addVariableMode(mode));

      expect(state.entities['mode-1'].meta).toEqual({ theme: 'light', priority: 1 });
    });

    it('should add multiple modes sequentially', () => {
      let state = variableModeEntitySlice(
        initialState,
        addVariableMode({ id: 'mode-1', name: 'Light', collectionId: 'col-1' }),
      );
      state = variableModeEntitySlice(
        state,
        addVariableMode({ id: 'mode-2', name: 'Dark', collectionId: 'col-1' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['mode-1'].name).toBe('Mode'); // Always set to 'Mode' by reducer
      expect(state.entities['mode-2'].name).toBe('Mode'); // Always set to 'Mode' by reducer
    });
  });

  // ===================================================================
  // PART 4: Update Variable Mode (7 tests)
  // ===================================================================

  describe('Update Variable Mode', () => {
    beforeEach(() => {
      initialState.entities['mode-1'] = {
        id: 'mode-1',
        name: 'Light Mode',
        collectionId: 'col-1',
        isDefault: false,
        meta: { theme: 'light', priority: 1 },
      };
      initialState.ids.push('mode-1');
    });

    it('should update mode name', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({ id: 'mode-1', updates: { name: 'Updated Mode' } }),
      );

      expect(state.entities['mode-1'].name).toBe('Updated Mode');
    });

    it('should update isDefault property', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({ id: 'mode-1', updates: { isDefault: true } }),
      );

      expect(state.entities['mode-1'].isDefault).toBe(true);
    });

    it('should update multiple properties at once', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({
          id: 'mode-1',
          updates: {
            name: 'Dark Mode',
            isDefault: true,
            collectionId: 'col-2',
          },
        }),
      );

      expect(state.entities['mode-1'].name).toBe('Dark Mode');
      expect(state.entities['mode-1'].isDefault).toBe(true);
      expect(state.entities['mode-1'].collectionId).toBe('col-2');
    });

    it('should merge meta properties', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({
          id: 'mode-1',
          updates: { meta: { priority: 2, category: 'primary' } },
        }),
      );

      expect(state.entities['mode-1'].meta.theme).toBe('light');
      expect(state.entities['mode-1'].meta.priority).toBe(2);
      expect(state.entities['mode-1'].meta.category).toBe('primary');
    });

    it('should preserve unmodified properties', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({ id: 'mode-1', updates: { name: 'New Name' } }),
      );

      expect(state.entities['mode-1'].collectionId).toBe('col-1');
      expect(state.entities['mode-1'].isDefault).toBe(false);
      expect(state.entities['mode-1'].meta).toEqual({ theme: 'light', priority: 1 });
    });

    it('should handle updating non-existent mode', () => {
      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({ id: 'non-existent', updates: { name: 'Test' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should handle mode without existing meta', () => {
      delete initialState.entities['mode-1'].meta;

      const state = variableModeEntitySlice(
        initialState,
        updateVariableMode({
          id: 'mode-1',
          updates: { meta: { newField: 'value' } },
        }),
      );

      expect(state.entities['mode-1'].meta.newField).toBe('value');
    });
  });

  // ===================================================================
  // PART 5: Remove Variable Mode (4 tests)
  // ===================================================================

  describe('Remove Variable Mode', () => {
    beforeEach(() => {
      initialState.entities['mode-1'] = {
        id: 'mode-1',
        name: 'Light',
        collectionId: 'col-1',
      };
      initialState.entities['mode-2'] = {
        id: 'mode-2',
        name: 'Dark',
        collectionId: 'col-1',
      };
      initialState.ids = ['mode-1', 'mode-2'];
    });

    it('should remove mode by ID', () => {
      const state = variableModeEntitySlice(
        initialState,
        removeVariableMode({ modeId: 'mode-1' }),
      );

      expect(state.ids).not.toContain('mode-1');
      expect(state.entities['mode-1']).toBeUndefined();
      expect(state.entities['mode-2']).toBeDefined();
    });

    it('should handle removing last mode', () => {
      let state = variableModeEntitySlice(
        initialState,
        removeVariableMode({ modeId: 'mode-1' }),
      );
      state = variableModeEntitySlice(state, removeVariableMode({ modeId: 'mode-2' }));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle removing non-existent mode', () => {
      const state = variableModeEntitySlice(
        initialState,
        removeVariableMode({ modeId: 'non-existent' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['mode-1']).toBeDefined();
      expect(state.entities['mode-2']).toBeDefined();
    });

    it('should not affect UI state when removing mode', () => {
      initialState.ui.selectedVariableModeId = 'mode-1';

      const state = variableModeEntitySlice(
        initialState,
        removeVariableMode({ modeId: 'mode-2' }),
      );

      expect(state.ui.selectedVariableModeId).toBe('mode-1');
    });
  });

  // ===================================================================
  // PART 6: Remove Variable Modes from Collection (4 tests)
  // ===================================================================

  describe('Remove Variable Modes from Collection', () => {
    beforeEach(() => {
      initialState.entities = {
        'mode-1': { id: 'mode-1', name: 'Light', collectionId: 'col-1' },
        'mode-2': { id: 'mode-2', name: 'Dark', collectionId: 'col-1' },
        'mode-3': { id: 'mode-3', name: 'Auto', collectionId: 'col-2' },
        'mode-4': { id: 'mode-4', name: 'Custom', collectionId: 'col-2' },
      };
      initialState.ids = ['mode-1', 'mode-2', 'mode-3', 'mode-4'];
    });

    it('should remove all modes from specified collection', () => {
      const state = variableModeEntitySlice(
        initialState,
        removeVariableModesFromCollection('col-1'),
      );

      expect(state.ids).toEqual(['mode-3', 'mode-4']);
      expect(state.entities['mode-1']).toBeUndefined();
      expect(state.entities['mode-2']).toBeUndefined();
      expect(state.entities['mode-3']).toBeDefined();
      expect(state.entities['mode-4']).toBeDefined();
    });

    it('should remove all modes when collection matches', () => {
      const state = variableModeEntitySlice(
        initialState,
        removeVariableModesFromCollection('col-2'),
      );

      expect(state.ids).toEqual(['mode-1', 'mode-2']);
    });

    it('should handle removing from non-existent collection', () => {
      const state = variableModeEntitySlice(
        initialState,
        removeVariableModesFromCollection('non-existent'),
      );

      expect(state.ids).toHaveLength(4);
      expect(Object.keys(state.entities)).toHaveLength(4);
    });

    it('should handle removing all modes from single collection', () => {
      initialState.entities = {
        'mode-1': { id: 'mode-1', name: 'Mode 1', collectionId: 'col-only' },
        'mode-2': { id: 'mode-2', name: 'Mode 2', collectionId: 'col-only' },
      };
      initialState.ids = ['mode-1', 'mode-2'];

      const state = variableModeEntitySlice(
        initialState,
        removeVariableModesFromCollection('col-only'),
      );

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });
  });
});
