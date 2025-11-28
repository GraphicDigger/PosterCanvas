// ===================================================================
// Unit Tests for VarPreset Slice
// CRITICAL BUSINESS LOGIC - Design Preset State Management
// Phase 1, Day 2 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import presetEntitySlice, {
  setPresets,
  setHoveredPresetId,
  setFocusedPresetId,
  setSelectedPresetId,
  addPreset,
  updatePreset,
  removePreset,
  removePresetsFromCollection,
} from './slice';

describe('VarPreset Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredPresetId: null,
        focusedPresetId: null,
        selectedPresetId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered preset ID', () => {
      const state = presetEntitySlice(initialState, setHoveredPresetId('preset-1'));
      expect(state.ui.hoveredPresetId).toBe('preset-1');
    });

    it('should set focused preset ID', () => {
      const state = presetEntitySlice(initialState, setFocusedPresetId('preset-2'));
      expect(state.ui.focusedPresetId).toBe('preset-2');
    });

    it('should set selected preset ID', () => {
      const state = presetEntitySlice(initialState, setSelectedPresetId('preset-3'));
      expect(state.ui.selectedPresetId).toBe('preset-3');
    });
  });

  // ===================================================================
  // PART 2: Set Presets (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Presets (Bulk Load)', () => {
    it('should set presets (replace all)', () => {
      const presets = [
        { id: 'preset-1', name: 'Light Mode', collectionId: 'col-1' },
        { id: 'preset-2', name: 'Dark Mode', collectionId: 'col-1' },
      ];

      const state = presetEntitySlice(initialState, setPresets(presets));

      expect(state.ids).toEqual(['preset-1', 'preset-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing presets when setting new ones', () => {
      initialState.entities['preset-old'] = { id: 'preset-old', name: 'Old Preset' };
      initialState.ids.push('preset-old');

      const presets = [{ id: 'preset-new', name: 'New Preset', collectionId: 'col-1' }];
      const state = presetEntitySlice(initialState, setPresets(presets));

      expect(state.entities['preset-old']).toBeUndefined();
      expect(state.entities['preset-new']).toBeDefined();
    });

    it('should handle empty array in setPresets', () => {
      initialState.entities['preset-1'] = { id: 'preset-1', name: 'Preset' };
      initialState.ids.push('preset-1');

      const state = presetEntitySlice(initialState, setPresets([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting presets', () => {
      initialState.ui.hoveredPresetId = 'preset-hover';
      initialState.ui.focusedPresetId = 'preset-focus';

      const presets = [{ id: 'preset-1', name: 'Preset', collectionId: 'col-1' }];
      const state = presetEntitySlice(initialState, setPresets(presets));

      expect(state.ui.hoveredPresetId).toBe('preset-hover');
      expect(state.ui.focusedPresetId).toBe('preset-focus');
    });

    it('should set presets with complete metadata', () => {
      const presets = [
        {
          id: 'preset-1',
          name: 'Light Mode',
          collectionId: 'col-1',
          description: 'Light color scheme',
          modeValues: ['mode-1', 'mode-2'],
        },
      ];

      const state = presetEntitySlice(initialState, setPresets(presets));

      expect(state.entities['preset-1'].name).toBe('Light Mode');
      expect(state.entities['preset-1'].description).toBe('Light color scheme');
      expect(state.entities['preset-1'].modeValues).toEqual(['mode-1', 'mode-2']);
    });
  });

  // ===================================================================
  // PART 3: Add Preset (7 tests)
  // ===================================================================

  describe('Add Preset', () => {
    it('should add preset with basic properties', () => {
      const preset = {
        id: 'preset-1',
        name: 'Light Mode',
        collectionId: 'col-1',
      };

      const state = presetEntitySlice(initialState, addPreset(preset));

      expect(state.ids).toContain('preset-1');
      expect(state.entities['preset-1'].name).toBe('Light Mode');
    });

    it('should not add preset without collectionId', () => {
      const preset = {
        id: 'preset-1',
        name: 'Invalid Preset',
      };

      const state = presetEntitySlice(initialState, addPreset(preset));

      expect(state.ids).not.toContain('preset-1');
      expect(state.entities['preset-1']).toBeUndefined();
    });

    it('should add preset with all metadata', () => {
      const preset = {
        id: 'preset-1',
        name: 'Light Mode',
        collectionId: 'col-1',
        description: 'Light theme preset',
        modeValues: ['mode-1', 'mode-2'],
        tags: ['light', 'theme'],
      };

      const state = presetEntitySlice(initialState, addPreset(preset));

      expect(state.entities['preset-1'].description).toBe('Light theme preset');
      expect(state.entities['preset-1'].modeValues).toEqual(['mode-1', 'mode-2']);
      expect(state.entities['preset-1'].tags).toEqual(['light', 'theme']);
    });

    it('should add multiple presets sequentially', () => {
      let state = presetEntitySlice(
        initialState,
        addPreset({ id: 'preset-1', name: 'Light', collectionId: 'col-1' }),
      );
      state = presetEntitySlice(
        state,
        addPreset({ id: 'preset-2', name: 'Dark', collectionId: 'col-1' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['preset-1'].name).toBe('Light');
      expect(state.entities['preset-2'].name).toBe('Dark');
    });

    it('should add preset to different collections', () => {
      let state = presetEntitySlice(
        initialState,
        addPreset({ id: 'preset-1', name: 'Preset 1', collectionId: 'col-1' }),
      );
      state = presetEntitySlice(
        state,
        addPreset({ id: 'preset-2', name: 'Preset 2', collectionId: 'col-2' }),
      );

      expect(state.entities['preset-1'].collectionId).toBe('col-1');
      expect(state.entities['preset-2'].collectionId).toBe('col-2');
    });

    it('should handle preset with null description', () => {
      const preset = {
        id: 'preset-1',
        name: 'Preset',
        collectionId: 'col-1',
        description: null,
      };

      const state = presetEntitySlice(initialState, addPreset(preset));

      expect(state.entities['preset-1'].description).toBeNull();
    });

    it('should preserve existing preset properties', () => {
      const preset = {
        id: 'preset-1',
        name: 'Preset',
        collectionId: 'col-1',
        customField: 'custom value',
      };

      const state = presetEntitySlice(initialState, addPreset(preset));

      expect(state.entities['preset-1'].customField).toBe('custom value');
    });
  });

  // ===================================================================
  // PART 4: Update Preset (7 tests)
  // ===================================================================

  describe('Update Preset', () => {
    beforeEach(() => {
      initialState.entities['preset-1'] = {
        id: 'preset-1',
        name: 'Light Mode',
        collectionId: 'col-1',
        description: 'Original description',
      };
      initialState.ids.push('preset-1');
    });

    it('should update preset name', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'preset-1', updates: { name: 'Updated Mode' } }),
      );

      expect(state.entities['preset-1'].name).toBe('Updated Mode');
    });

    it('should update preset description', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'preset-1', updates: { description: 'New description' } }),
      );

      expect(state.entities['preset-1'].description).toBe('New description');
    });

    it('should update multiple properties at once', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({
          id: 'preset-1',
          updates: {
            name: 'Dark Mode',
            description: 'Dark theme',
            modeValues: ['mode-dark'],
          },
        }),
      );

      expect(state.entities['preset-1'].name).toBe('Dark Mode');
      expect(state.entities['preset-1'].description).toBe('Dark theme');
      expect(state.entities['preset-1'].modeValues).toEqual(['mode-dark']);
    });

    it('should preserve unmodified properties', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'preset-1', updates: { name: 'New Name' } }),
      );

      expect(state.entities['preset-1'].collectionId).toBe('col-1');
      expect(state.entities['preset-1'].description).toBe('Original description');
    });

    it('should handle updating non-existent preset', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'non-existent', updates: { name: 'Test' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should not update preset without collectionId', () => {
      delete initialState.entities['preset-1'].collectionId;

      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'preset-1', updates: { name: 'New Name' } }),
      );

      expect(state.entities['preset-1'].name).toBe('Light Mode');
    });

    it('should allow updating collectionId', () => {
      const state = presetEntitySlice(
        initialState,
        updatePreset({ id: 'preset-1', updates: { collectionId: 'col-2' } }),
      );

      expect(state.entities['preset-1'].collectionId).toBe('col-2');
    });
  });

  // ===================================================================
  // PART 5: Remove Preset (4 tests)
  // ===================================================================

  describe('Remove Preset', () => {
    beforeEach(() => {
      initialState.entities['preset-1'] = {
        id: 'preset-1',
        name: 'Light Mode',
        collectionId: 'col-1',
      };
      initialState.entities['preset-2'] = {
        id: 'preset-2',
        name: 'Dark Mode',
        collectionId: 'col-1',
      };
      initialState.ids = ['preset-1', 'preset-2'];
    });

    it('should remove preset by ID', () => {
      const state = presetEntitySlice(initialState, removePreset('preset-1'));

      expect(state.ids).not.toContain('preset-1');
      expect(state.entities['preset-1']).toBeUndefined();
      expect(state.entities['preset-2']).toBeDefined();
    });

    it('should handle removing last preset', () => {
      let state = presetEntitySlice(initialState, removePreset('preset-1'));
      state = presetEntitySlice(state, removePreset('preset-2'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle removing non-existent preset', () => {
      const state = presetEntitySlice(initialState, removePreset('non-existent'));

      expect(state.ids).toHaveLength(2);
      expect(state.entities['preset-1']).toBeDefined();
      expect(state.entities['preset-2']).toBeDefined();
    });

    it('should not affect UI state when removing preset', () => {
      initialState.ui.selectedPresetId = 'preset-1';

      const state = presetEntitySlice(initialState, removePreset('preset-2'));

      expect(state.ui.selectedPresetId).toBe('preset-1');
    });
  });

  // ===================================================================
  // PART 6: Remove Presets from Collection (4 tests)
  // ===================================================================

  describe('Remove Presets from Collection', () => {
    beforeEach(() => {
      initialState.entities = {
        'preset-1': { id: 'preset-1', name: 'Light', collectionId: 'col-1' },
        'preset-2': { id: 'preset-2', name: 'Dark', collectionId: 'col-1' },
        'preset-3': { id: 'preset-3', name: 'Auto', collectionId: 'col-2' },
        'preset-4': { id: 'preset-4', name: 'Custom', collectionId: 'col-2' },
      };
      initialState.ids = ['preset-1', 'preset-2', 'preset-3', 'preset-4'];
    });

    it('should remove all presets from specified collection', () => {
      const state = presetEntitySlice(initialState, removePresetsFromCollection('col-1'));

      expect(state.ids).toEqual(['preset-3', 'preset-4']);
      expect(state.entities['preset-1']).toBeUndefined();
      expect(state.entities['preset-2']).toBeUndefined();
      expect(state.entities['preset-3']).toBeDefined();
      expect(state.entities['preset-4']).toBeDefined();
    });

    it('should remove all presets when collection matches', () => {
      const state = presetEntitySlice(initialState, removePresetsFromCollection('col-2'));

      expect(state.ids).toEqual(['preset-1', 'preset-2']);
    });

    it('should handle removing from non-existent collection', () => {
      const state = presetEntitySlice(
        initialState,
        removePresetsFromCollection('non-existent'),
      );

      expect(state.ids).toHaveLength(4);
      expect(Object.keys(state.entities)).toHaveLength(4);
    });

    it('should handle removing all presets from single collection', () => {
      initialState.entities = {
        'preset-1': { id: 'preset-1', name: 'Preset 1', collectionId: 'col-only' },
        'preset-2': { id: 'preset-2', name: 'Preset 2', collectionId: 'col-only' },
      };
      initialState.ids = ['preset-1', 'preset-2'];

      const state = presetEntitySlice(initialState, removePresetsFromCollection('col-only'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });
  });
});
