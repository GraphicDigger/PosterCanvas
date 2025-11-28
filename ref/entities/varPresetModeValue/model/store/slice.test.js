// ===================================================================
// Unit Tests for VarPresetModeValue Slice
// CRITICAL BUSINESS LOGIC - Preset Mode Value State Management
// Phase 1, Day 7 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('uuid', () => ({
  v4: () => 'uuid-456',
}));

vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    PRESET_MODE_VALUE: 'preset-mode-value',
  },
}));

import presetModeValueEntitySlice, {
  setPresetModeValues,
  setHoveredPresetModeValueId,
  setFocusedPresetModeValueId,
  setSelectedPresetModeValueId,
  addPresetModeValue,
  updatePresetModeValue,
  removePresetModeValue,
  removePresetModeValues,
  removePresetModeValuesByVariableModeId,
} from './slice';

describe('VarPresetModeValue Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredPresetModeValueId: null,
        focusedPresetModeValueId: null,
        selectedPresetModeValueId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered preset mode value ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        setHoveredPresetModeValueId('val-1'),
      );
      expect(state.ui.hoveredPresetModeValueId).toBe('val-1');
    });

    it('should set focused preset mode value ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        setFocusedPresetModeValueId('val-2'),
      );
      expect(state.ui.focusedPresetModeValueId).toBe('val-2');
    });

    it('should set selected preset mode value ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        setSelectedPresetModeValueId('val-3'),
      );
      expect(state.ui.selectedPresetModeValueId).toBe('val-3');
    });
  });

  // ===================================================================
  // PART 2: Set Preset Mode Values (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Preset Mode Values (Bulk Load)', () => {
    it('should set preset mode values (replace all)', () => {
      const values = [
        {
          id: 'val-1',
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ff0000',
        },
        {
          id: 'val-2',
          presetId: 'preset-1',
          variableModeId: 'mode-2',
          value: '#00ff00',
        },
      ];

      const state = presetModeValueEntitySlice(
        initialState,
        setPresetModeValues(values),
      );

      expect(state.ids).toEqual(['val-1', 'val-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing values when setting new ones', () => {
      initialState.entities['val-old'] = { id: 'val-old', value: 'old' };
      initialState.ids.push('val-old');

      const values = [{ id: 'val-new', presetId: 'preset-1', value: 'new' }];
      const state = presetModeValueEntitySlice(
        initialState,
        setPresetModeValues(values),
      );

      expect(state.entities['val-old']).toBeUndefined();
      expect(state.entities['val-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['val-1'] = { id: 'val-1', value: 'test' };
      initialState.ids.push('val-1');

      const state = presetModeValueEntitySlice(initialState, setPresetModeValues([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting values', () => {
      initialState.ui.selectedPresetModeValueId = 'val-selected';

      const values = [{ id: 'val-1', presetId: 'preset-1', value: 'test' }];
      const state = presetModeValueEntitySlice(
        initialState,
        setPresetModeValues(values),
      );

      expect(state.ui.selectedPresetModeValueId).toBe('val-selected');
    });

    it('should handle large number of values', () => {
      const values = Array.from({ length: 100 }, (_, i) => ({
        id: `val-${i}`,
        presetId: 'preset-1',
        variableModeId: `mode-${i}`,
        value: `value-${i}`,
      }));

      const state = presetModeValueEntitySlice(
        initialState,
        setPresetModeValues(values),
      );

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });
  });

  // ===================================================================
  // PART 3: Add Preset Mode Value (8 tests)
  // ===================================================================

  describe('Add Preset Mode Value', () => {
    it('should add preset mode value with generated ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ff0000',
        }),
      );

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(id).toBe('preset-mode-value-uuid-456');
      expect(state.entities[id].kind).toBe('preset-mode-value');
    });

    it('should add preset mode value with provided ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          id: 'custom-id',
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ff0000',
        }),
      );

      expect(state.ids).toContain('custom-id');
      expect(state.entities['custom-id']).toBeDefined();
    });

    it('should add preset mode value with all properties', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          presetId: 'preset-1',
          variableModeId: 'mode-light',
          value: '#ffffff',
        }),
      );

      const id = state.ids[0];
      expect(state.entities[id].presetId).toBe('preset-1');
      expect(state.entities[id].variableModeId).toBe('mode-light');
      expect(state.entities[id].value).toBe('#ffffff');
    });

    it('should add preset mode value with undefined value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          presetId: 'preset-1',
          variableModeId: 'mode-1',
        }),
      );

      const id = state.ids[0];
      expect(state.entities[id].value).toBeUndefined();
    });

    it('should not duplicate ID when adding existing value', () => {
      const state1 = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          id: 'val-1',
          presetId: 'preset-1',
          value: 'original',
        }),
      );

      const state2 = presetModeValueEntitySlice(
        state1,
        addPresetModeValue({
          id: 'val-1',
          presetId: 'preset-1',
          value: 'updated',
        }),
      );

      expect(state2.ids).toHaveLength(1);
      expect(state2.entities['val-1'].value).toBe('updated');
    });

    it('should preserve existing values when adding new one', () => {
      initialState.entities['val-existing'] = {
        id: 'val-existing',
        presetId: 'preset-1',
        value: 'existing',
      };
      initialState.ids.push('val-existing');

      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({ presetId: 'preset-1', value: 'new' }),
      );

      expect(state.entities['val-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding value', () => {
      initialState.ui.selectedPresetModeValueId = 'val-selected';

      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({ presetId: 'preset-1', value: 'test' }),
      );

      expect(state.ui.selectedPresetModeValueId).toBe('val-selected');
    });

    it('should add value with complex object value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: { color: '#ff0000', opacity: 0.8 },
        }),
      );

      const id = state.ids[0];
      expect(state.entities[id].value).toEqual({ color: '#ff0000', opacity: 0.8 });
    });
  });

  // ===================================================================
  // PART 4: Update Preset Mode Value (4 tests)
  // ===================================================================

  describe('Update Preset Mode Value', () => {
    beforeEach(() => {
      initialState.entities['val-1'] = {
        id: 'val-1',
        presetId: 'preset-1',
        variableModeId: 'mode-1',
        kind: 'preset-mode-value',
        value: { color: '#ff0000' },
      };
      initialState.ids.push('val-1');
    });

    it('should update preset mode value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        updatePresetModeValue({
          id: 'val-1',
          updates: { color: '#00ff00' },
        }),
      );

      expect(state.entities['val-1'].value.color).toBe('#00ff00');
    });

    it('should merge updates with existing value', () => {
      initialState.entities['val-1'].value = { color: '#ff0000', opacity: 0.5 };

      const state = presetModeValueEntitySlice(
        initialState,
        updatePresetModeValue({
          id: 'val-1',
          updates: { color: '#00ff00' },
        }),
      );

      expect(state.entities['val-1'].value.color).toBe('#00ff00');
      expect(state.entities['val-1'].value.opacity).toBe(0.5);
    });

    it('should handle updating non-existent value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        updatePresetModeValue({
          id: 'non-existent',
          updates: { color: '#000000' },
        }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should not affect other values when updating one', () => {
      initialState.entities['val-2'] = {
        id: 'val-2',
        presetId: 'preset-2',
        value: { color: '#0000ff' },
      };
      initialState.ids.push('val-2');

      const state = presetModeValueEntitySlice(
        initialState,
        updatePresetModeValue({
          id: 'val-1',
          updates: { color: '#ffffff' },
        }),
      );

      expect(state.entities['val-2'].value.color).toBe('#0000ff');
    });
  });

  // ===================================================================
  // PART 5: Remove Preset Mode Value (3 tests)
  // ===================================================================

  describe('Remove Preset Mode Value', () => {
    beforeEach(() => {
      initialState.entities = {
        'val-1': { id: 'val-1', presetId: 'preset-1', value: 'value1' },
        'val-2': { id: 'val-2', presetId: 'preset-1', value: 'value2' },
      };
      initialState.ids = ['val-1', 'val-2'];
    });

    it('should remove preset mode value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValue({ id: 'val-1' }),
      );

      expect(state.ids).not.toContain('val-1');
      expect(state.entities['val-1']).toBeUndefined();
      expect(state.entities['val-2']).toBeDefined();
    });

    it('should handle removing non-existent value', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValue({ id: 'non-existent' }),
      );

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other values', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValue({ id: 'val-1' }),
      );

      expect(state.ids).toContain('val-2');
      expect(state.entities['val-2']).toEqual({
        id: 'val-2',
        presetId: 'preset-1',
        value: 'value2',
      });
    });
  });

  // ===================================================================
  // PART 6: Remove Multiple Preset Mode Values (3 tests)
  // ===================================================================

  describe('Remove Multiple Preset Mode Values', () => {
    beforeEach(() => {
      initialState.entities = {
        'val-1': { id: 'val-1', value: 'value1' },
        'val-2': { id: 'val-2', value: 'value2' },
        'val-3': { id: 'val-3', value: 'value3' },
      };
      initialState.ids = ['val-1', 'val-2', 'val-3'];
    });

    it('should remove multiple preset mode values', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValues(['val-1', 'val-2']),
      );

      expect(state.ids).not.toContain('val-1');
      expect(state.ids).not.toContain('val-2');
      expect(state.ids).toContain('val-3');
      expect(state.entities['val-1']).toBeUndefined();
      expect(state.entities['val-2']).toBeUndefined();
      expect(state.entities['val-3']).toBeDefined();
    });

    it('should handle empty array', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValues([]),
      );

      expect(state.ids).toHaveLength(3);
    });

    it('should handle mix of existent and non-existent IDs', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValues(['val-1', 'non-existent', 'val-3']),
      );

      expect(state.ids).toEqual(['val-2']);
      expect(state.entities['val-2']).toBeDefined();
    });
  });

  // ===================================================================
  // PART 7: Remove by Variable Mode ID (2 tests)
  // ===================================================================

  describe('Remove Preset Mode Values by Variable Mode ID', () => {
    beforeEach(() => {
      initialState.entities = {
        'val-1': { id: 'val-1', variableModeId: 'mode-1', value: 'value1' },
        'val-2': { id: 'val-2', variableModeId: 'mode-1', value: 'value2' },
        'val-3': { id: 'val-3', variableModeId: 'mode-2', value: 'value3' },
      };
      initialState.ids = ['val-1', 'val-2', 'val-3'];
    });

    it('should remove all values with matching variable mode ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValuesByVariableModeId({ variableModeId: 'mode-1' }),
      );

      expect(state.ids).toEqual(['val-3']);
      expect(state.entities['val-1']).toBeUndefined();
      expect(state.entities['val-2']).toBeUndefined();
      expect(state.entities['val-3']).toBeDefined();
    });

    it('should handle non-existent variable mode ID', () => {
      const state = presetModeValueEntitySlice(
        initialState,
        removePresetModeValuesByVariableModeId({ variableModeId: 'non-existent' }),
      );

      expect(state.ids).toHaveLength(3);
      expect(Object.keys(state.entities)).toHaveLength(3);
    });
  });

  // ===================================================================
  // PART 8: Integration Scenarios (2 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete lifecycle', () => {
      let state = presetModeValueEntitySlice(
        initialState,
        addPresetModeValue({
          id: 'val-1',
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ff0000',
        }),
      );
      state = presetModeValueEntitySlice(
        state,
        updatePresetModeValue({
          id: 'val-1',
          updates: { value: '#00ff00' },
        }),
      );
      state = presetModeValueEntitySlice(
        state,
        setSelectedPresetModeValueId('val-1'),
      );
      state = presetModeValueEntitySlice(
        state,
        removePresetModeValue({ id: 'val-1' }),
      );

      expect(state.ids).not.toContain('val-1');
      expect(state.ui.selectedPresetModeValueId).toBe('val-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const values = [
        { id: 'val-1', presetId: 'preset-1', variableModeId: 'mode-1', value: 'v1' },
        { id: 'val-2', presetId: 'preset-1', variableModeId: 'mode-2', value: 'v2' },
      ];

      let state = presetModeValueEntitySlice(initialState, setPresetModeValues(values));
      state = presetModeValueEntitySlice(
        state,
        addPresetModeValue({ presetId: 'preset-1', variableModeId: 'mode-3', value: 'v3' }),
      );
      state = presetModeValueEntitySlice(
        state,
        removePresetModeValuesByVariableModeId({ variableModeId: 'mode-1' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['val-1']).toBeUndefined();
      expect(state.entities['val-2']).toBeDefined();
    });
  });
});

