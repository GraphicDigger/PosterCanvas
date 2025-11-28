// ===================================================================
// Unit Tests for importer Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (SMALL IMPACT - 28 lines, self-contained)
// Risk: LOW (Redux Toolkit, simple boolean toggle state)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import importerReducer, {
  openImporter,
  closeImporter,
  toggleImporter,
} from '../slice';

describe('importer Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      isImporterOpen: false,
    };

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have isImporterOpen as false by default', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result.isImporterOpen).toBe(false);
    });
  });

  describe('openImporter', () => {
    it('should set isImporterOpen to true', () => {
      const result = importerReducer(initialState, openImporter());

      expect(result.isImporterOpen).toBe(true);
    });

    it('should log "openImporter" to console', () => {
      importerReducer(initialState, openImporter());

      expect(console.log).toHaveBeenCalledWith('openImporter');
    });

    it('should keep isImporterOpen true when already open', () => {
      const state = {
        isImporterOpen: true,
      };

      const result = importerReducer(state, openImporter());

      expect(result.isImporterOpen).toBe(true);
    });

    it('should be idempotent', () => {
      let state = initialState;

      state = importerReducer(state, openImporter());
      state = importerReducer(state, openImporter());
      state = importerReducer(state, openImporter());

      expect(state.isImporterOpen).toBe(true);
    });
  });

  describe('closeImporter', () => {
    it('should set isImporterOpen to false', () => {
      const state = {
        isImporterOpen: true,
      };

      const result = importerReducer(state, closeImporter());

      expect(result.isImporterOpen).toBe(false);
    });

    it('should keep isImporterOpen false when already closed', () => {
      const result = importerReducer(initialState, closeImporter());

      expect(result.isImporterOpen).toBe(false);
    });

    it('should be idempotent', () => {
      let state = {
        isImporterOpen: true,
      };

      state = importerReducer(state, closeImporter());
      state = importerReducer(state, closeImporter());
      state = importerReducer(state, closeImporter());

      expect(state.isImporterOpen).toBe(false);
    });
  });

  describe('toggleImporter', () => {
    it('should toggle from false to true', () => {
      const result = importerReducer(initialState, toggleImporter());

      expect(result.isImporterOpen).toBe(true);
    });

    it('should toggle from true to false', () => {
      const state = {
        isImporterOpen: true,
      };

      const result = importerReducer(state, toggleImporter());

      expect(result.isImporterOpen).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      let state = initialState;

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(true);

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(false);

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(true);

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(false);
    });
  });

  describe('Combined Actions', () => {
    it('should handle open and close workflow', () => {
      let state = initialState;

      state = importerReducer(state, openImporter());
      expect(state.isImporterOpen).toBe(true);

      state = importerReducer(state, closeImporter());
      expect(state.isImporterOpen).toBe(false);
    });

    it('should handle toggle and close workflow', () => {
      let state = initialState;

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(true);

      state = importerReducer(state, closeImporter());
      expect(state.isImporterOpen).toBe(false);
    });

    it('should handle open and toggle workflow', () => {
      let state = initialState;

      state = importerReducer(state, openImporter());
      expect(state.isImporterOpen).toBe(true);

      state = importerReducer(state, toggleImporter());
      expect(state.isImporterOpen).toBe(false);
    });

    it('should handle complex workflow', () => {
      let state = initialState;

      state = importerReducer(state, openImporter());
      state = importerReducer(state, toggleImporter());
      state = importerReducer(state, toggleImporter());
      state = importerReducer(state, closeImporter());
      state = importerReducer(state, openImporter());
      state = importerReducer(state, toggleImporter());

      expect(state.isImporterOpen).toBe(false);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when opening', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, openImporter());

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when closing', () => {
      const state = { isImporterOpen: true };
      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, closeImporter());

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when toggling', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, toggleImporter());

      expect(state).toEqual(originalState);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid open/close cycles', () => {
      let state = initialState;

      for (let i = 0; i < 100; i++) {
        state = importerReducer(state, openImporter());
        state = importerReducer(state, closeImporter());
      }

      expect(state.isImporterOpen).toBe(false);
    });

    it('should handle rapid toggle cycles', () => {
      let state = initialState;

      for (let i = 0; i < 100; i++) {
        state = importerReducer(state, toggleImporter());
      }

      // After 100 toggles (even number), should be back to false
      expect(state.isImporterOpen).toBe(false);
    });

    it('should handle rapid toggle cycles (odd number)', () => {
      let state = initialState;

      for (let i = 0; i < 99; i++) {
        state = importerReducer(state, toggleImporter());
      }

      // After 99 toggles (odd number), should be true
      expect(state.isImporterOpen).toBe(true);
    });
  });

  describe('Action Creators', () => {
    it('should create openImporter action', () => {
      const action = openImporter();

      expect(action.type).toBe('importer/openImporter');
      expect(action.payload).toBeUndefined();
    });

    it('should create closeImporter action', () => {
      const action = closeImporter();

      expect(action.type).toBe('importer/closeImporter');
      expect(action.payload).toBeUndefined();
    });

    it('should create toggleImporter action', () => {
      const action = toggleImporter();

      expect(action.type).toBe('importer/toggleImporter');
      expect(action.payload).toBeUndefined();
    });
  });
});

