// ===================================================================
// Unit Tests for presetManager Redux Slice
// Widget State Management - Preset Manager Sidebar
// Quick Win - Widget Testing (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../constants/sidebarModes', () => ({
  PRESET_MANAGER_SIDEBAR_MODES: {
    COLLECTION_SETTINGS: 'collection-settings',
    PROPERTY_LIST: 'property-list',
    TOKEN_MANAGER: 'token-manager',
    PRESET_EDITOR: 'preset-editor',
  },
}));

import presetManagerReducer, {
  setMode,
  resetMode,
} from './slice';

describe('presetManager Redux Slice - Sidebar Mode Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = presetManagerReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (3 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState.sidebarMode).toBeDefined();
    });

    it('should have COLLECTION_SETTINGS as default mode', () => {
      expect(initialState.sidebarMode).toBe('collection-settings');
    });

    it('should have correct state structure', () => {
      expect(initialState).toHaveProperty('sidebarMode');
      expect(typeof initialState.sidebarMode).toBe('string');
    });
  });

  // ===================================================================
  // PART 2: setMode Action (8 tests)
  // ===================================================================

  describe('setMode Action', () => {
    it('should set mode to COLLECTION_SETTINGS', () => {
      const state = presetManagerReducer(initialState, setMode('collection-settings'));
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should set mode to PROPERTY_LIST', () => {
      const state = presetManagerReducer(initialState, setMode('property-list'));
      expect(state.sidebarMode).toBe('property-list');
    });

    it('should set mode to TOKEN_MANAGER', () => {
      const state = presetManagerReducer(initialState, setMode('token-manager'));
      expect(state.sidebarMode).toBe('token-manager');
    });

    it('should set mode to PRESET_EDITOR', () => {
      const state = presetManagerReducer(initialState, setMode('preset-editor'));
      expect(state.sidebarMode).toBe('preset-editor');
    });

    it('should override previous mode', () => {
      let state = presetManagerReducer(initialState, setMode('property-list'));
      expect(state.sidebarMode).toBe('property-list');

      state = presetManagerReducer(state, setMode('token-manager'));
      expect(state.sidebarMode).toBe('token-manager');
    });

    it('should handle multiple mode changes', () => {
      let state = initialState;

      state = presetManagerReducer(state, setMode('property-list'));
      expect(state.sidebarMode).toBe('property-list');

      state = presetManagerReducer(state, setMode('token-manager'));
      expect(state.sidebarMode).toBe('token-manager');

      state = presetManagerReducer(state, setMode('collection-settings'));
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should accept custom mode strings', () => {
      const state = presetManagerReducer(initialState, setMode('custom-mode'));
      expect(state.sidebarMode).toBe('custom-mode');
    });

    it('should maintain state immutability', () => {
      const state = presetManagerReducer(initialState, setMode('property-list'));
      expect(state).not.toBe(initialState);
      expect(initialState.sidebarMode).toBe('collection-settings');
      expect(state.sidebarMode).toBe('property-list');
    });
  });

  // ===================================================================
  // PART 3: resetMode Action (5 tests)
  // ===================================================================

  describe('resetMode Action', () => {
    it('should reset mode to initial state', () => {
      let state = presetManagerReducer(initialState, setMode('property-list'));
      expect(state.sidebarMode).toBe('property-list');

      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should reset from TOKEN_MANAGER', () => {
      let state = presetManagerReducer(initialState, setMode('token-manager'));
      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should reset from PRESET_EDITOR', () => {
      let state = presetManagerReducer(initialState, setMode('preset-editor'));
      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should be idempotent when already at initial state', () => {
      const state = presetManagerReducer(initialState, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should handle multiple resets', () => {
      let state = initialState;

      state = presetManagerReducer(state, setMode('property-list'));
      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');

      state = presetManagerReducer(state, setMode('token-manager'));
      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });
  });

  // ===================================================================
  // PART 4: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complex mode switching workflow', () => {
      let state = initialState;
      expect(state.sidebarMode).toBe('collection-settings');

      // User opens property list
      state = presetManagerReducer(state, setMode('property-list'));
      expect(state.sidebarMode).toBe('property-list');

      // User opens token manager
      state = presetManagerReducer(state, setMode('token-manager'));
      expect(state.sidebarMode).toBe('token-manager');

      // User resets to default
      state = presetManagerReducer(state, resetMode());
      expect(state.sidebarMode).toBe('collection-settings');
    });

    it('should handle rapid mode changes', () => {
      let state = initialState;

      const modes = ['property-list', 'token-manager', 'preset-editor', 'collection-settings'];

      modes.forEach(mode => {
        state = presetManagerReducer(state, setMode(mode));
        expect(state.sidebarMode).toBe(mode);
      });
    });

    it('should handle mode change and reset cycle', () => {
      let state = initialState;

      for (let i = 0; i < 3; i++) {
        state = presetManagerReducer(state, setMode('property-list'));
        expect(state.sidebarMode).toBe('property-list');

        state = presetManagerReducer(state, resetMode());
        expect(state.sidebarMode).toBe('collection-settings');
      }
    });

    it('should maintain consistent state through unknown actions', () => {
      const state = presetManagerReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
      expect(state.sidebarMode).toBe('collection-settings');
    });
  });
});

