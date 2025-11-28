// ===================================================================
// Unit Tests for presetManager Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 22 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setMode,
  resetMode,
} from '../slice';
import { PRESET_MANAGER_SIDEBAR_MODES } from '../../constants/sidebarModes';

describe('presetManager Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should have correct initial mode', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('sidebarMode');
      expect(typeof state.sidebarMode).toBe('string');
    });
  });

  describe('setMode Action', () => {
    it('should set sidebar mode to COLLECTION_SETTINGS', () => {
      const state = reducer(initialState, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should set sidebar mode to PROPERTY_LIST', () => {
      const state = reducer(initialState, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);
    });

    it('should update sidebar mode from COLLECTION_SETTINGS to PROPERTY_LIST', () => {
      const stateWithMode = {
        ...initialState,
        sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS,
      };

      const state = reducer(stateWithMode, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);
    });

    it('should update sidebar mode from PROPERTY_LIST to COLLECTION_SETTINGS', () => {
      const stateWithMode = {
        ...initialState,
        sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST,
      };

      const state = reducer(stateWithMode, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should handle setting same mode', () => {
      const stateWithMode = {
        ...initialState,
        sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS,
      };

      const state = reducer(stateWithMode, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should handle custom mode value', () => {
      const customMode = 'CUSTOM_MODE';
      const state = reducer(initialState, setMode(customMode));

      expect(state.sidebarMode).toBe(customMode);
    });
  });

  describe('resetMode Action', () => {
    it('should reset mode to initial state', () => {
      const stateWithDifferentMode = {
        ...initialState,
        sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST,
      };

      const state = reducer(stateWithDifferentMode, resetMode());

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should reset mode when already at initial state', () => {
      const state = reducer(initialState, resetMode());

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should reset mode from custom value', () => {
      const stateWithCustomMode = {
        ...initialState,
        sidebarMode: 'CUSTOM_MODE',
      };

      const state = reducer(stateWithCustomMode, resetMode());

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle mode switching workflow', () => {
      let state = initialState;

      // Start at COLLECTION_SETTINGS
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);

      // Switch to PROPERTY_LIST
      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);

      // Switch back to COLLECTION_SETTINGS
      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);

      // Reset to initial
      state = reducer(state, resetMode());
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should handle rapid mode changes', () => {
      let state = initialState;

      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));
      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));
      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));
      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS));

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should handle set then reset', () => {
      let state = initialState;

      state = reducer(state, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);

      state = reducer(state, resetMode());
      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });

    it('should handle multiple resets', () => {
      let state = {
        ...initialState,
        sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST,
      };

      state = reducer(state, resetMode());
      state = reducer(state, resetMode());
      state = reducer(state, resetMode());

      expect(state.sidebarMode).toBe(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS);
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('sidebarMode');
      expect(Object.keys(state)).toHaveLength(1);
    });

    it('should only contain sidebarMode property', () => {
      const state = reducer(initialState, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));

      expect(Object.keys(state)).toEqual(['sidebarMode']);
    });

    it('should preserve state structure after reset', () => {
      let state = reducer(initialState, setMode(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST));
      state = reducer(state, resetMode());

      expect(state).toHaveProperty('sidebarMode');
      expect(Object.keys(state)).toHaveLength(1);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null mode value', () => {
      const state = reducer(initialState, setMode(null));

      expect(state.sidebarMode).toBeNull();
    });

    it('should handle undefined mode value', () => {
      const state = reducer(initialState, setMode(undefined));

      expect(state.sidebarMode).toBeUndefined();
    });

    it('should handle empty string mode value', () => {
      const state = reducer(initialState, setMode(''));

      expect(state.sidebarMode).toBe('');
    });

    it('should handle numeric mode value', () => {
      const state = reducer(initialState, setMode(123));

      expect(state.sidebarMode).toBe(123);
    });

    it('should handle object mode value', () => {
      const modeObject = { mode: 'custom' };
      const state = reducer(initialState, setMode(modeObject));

      expect(state.sidebarMode).toEqual(modeObject);
    });
  });

  describe('Mode Constants', () => {
    it('should use correct COLLECTION_SETTINGS constant', () => {
      expect(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS).toBeDefined();
      expect(typeof PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS).toBe('string');
    });

    it('should use correct PROPERTY_LIST constant', () => {
      expect(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST).toBeDefined();
      expect(typeof PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST).toBe('string');
    });

    it('should have different values for different modes', () => {
      expect(PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS).not.toBe(PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST);
    });
  });
});

