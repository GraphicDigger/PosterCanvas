// ===================================================================
// Unit Tests for importUILibraryComponents Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (MEDIUM IMPACT - 49 lines, self-contained)
// Risk: LOW (Redux Toolkit, UI Library import wizard state)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import importerReducer, {
  setCurrentStep,
  setSelectedLibraryId,
  setSelectedComponentsIds,
  resetImporterState,
} from '../slice';

describe('importUILibraryComponents Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentStep: 'librarySelection',
      selectedLibraryId: null,
      selectedComponentsIds: [],
    };

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have librarySelection as default step', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result.currentStep).toBe('librarySelection');
    });

    it('should have null selectedLibraryId', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result.selectedLibraryId).toBeNull();
    });

    it('should have empty selectedComponentsIds array', () => {
      const result = importerReducer(undefined, { type: '@@INIT' });

      expect(result.selectedComponentsIds).toEqual([]);
    });
  });

  describe('setCurrentStep', () => {
    it('should set current step to librarySelection', () => {
      const result = importerReducer(initialState, setCurrentStep('librarySelection'));

      expect(result.currentStep).toBe('librarySelection');
    });

    it('should set current step to componentSelection', () => {
      const result = importerReducer(initialState, setCurrentStep('componentSelection'));

      expect(result.currentStep).toBe('componentSelection');
    });

    it('should set current step to confirmation', () => {
      const result = importerReducer(initialState, setCurrentStep('confirmation'));

      expect(result.currentStep).toBe('confirmation');
    });

    it('should update current step from one to another', () => {
      let state = importerReducer(initialState, setCurrentStep('componentSelection'));
      state = importerReducer(state, setCurrentStep('confirmation'));

      expect(state.currentStep).toBe('confirmation');
    });

    it('should not affect other state properties', () => {
      const state = {
        ...initialState,
        selectedLibraryId: 'lib-1',
        selectedComponentsIds: ['comp-1', 'comp-2'],
      };

      const result = importerReducer(state, setCurrentStep('confirmation'));

      expect(result.currentStep).toBe('confirmation');
      expect(result.selectedLibraryId).toBe('lib-1');
      expect(result.selectedComponentsIds).toEqual(['comp-1', 'comp-2']);
    });

    it('should handle custom step names', () => {
      const result = importerReducer(initialState, setCurrentStep('customStep'));

      expect(result.currentStep).toBe('customStep');
    });
  });

  describe('setSelectedLibraryId', () => {
    it('should set selected library ID', () => {
      const result = importerReducer(initialState, setSelectedLibraryId('lib-1'));

      expect(result.selectedLibraryId).toBe('lib-1');
    });

    it('should log selected library ID to console', () => {
      importerReducer(initialState, setSelectedLibraryId('lib-1'));

      expect(console.log).toHaveBeenCalledWith('selectedLibraryId', 'lib-1');
    });

    it('should update selected library ID', () => {
      const state = {
        ...initialState,
        selectedLibraryId: 'lib-1',
      };

      const result = importerReducer(state, setSelectedLibraryId('lib-2'));

      expect(result.selectedLibraryId).toBe('lib-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        selectedLibraryId: 'lib-1',
      };

      const result = importerReducer(state, setSelectedLibraryId(null));

      expect(result.selectedLibraryId).toBeNull();
    });

    it('should log null when setting to null', () => {
      vi.clearAllMocks();
      importerReducer(initialState, setSelectedLibraryId(null));

      expect(console.log).toHaveBeenCalledWith('selectedLibraryId', null);
    });

    it('should not affect other state properties', () => {
      const state = {
        ...initialState,
        currentStep: 'componentSelection',
        selectedComponentsIds: ['comp-1'],
      };

      const result = importerReducer(state, setSelectedLibraryId('lib-1'));

      expect(result.selectedLibraryId).toBe('lib-1');
      expect(result.currentStep).toBe('componentSelection');
      expect(result.selectedComponentsIds).toEqual(['comp-1']);
    });

    it('should handle library IDs with special characters', () => {
      const result = importerReducer(initialState, setSelectedLibraryId('lib-@#$%'));

      expect(result.selectedLibraryId).toBe('lib-@#$%');
    });

    it('should handle numeric library IDs', () => {
      const result = importerReducer(initialState, setSelectedLibraryId(123));

      expect(result.selectedLibraryId).toBe(123);
    });
  });

  describe('setSelectedComponentsIds', () => {
    it('should set single component ID', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds(['comp-1']));

      expect(result.selectedComponentsIds).toEqual(['comp-1']);
    });

    it('should log selected components IDs to console', () => {
      importerReducer(initialState, setSelectedComponentsIds(['comp-1', 'comp-2']));

      expect(console.log).toHaveBeenCalledWith('selectedComponentsIds', ['comp-1', 'comp-2']);
    });

    it('should set multiple component IDs', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds(['comp-1', 'comp-2', 'comp-3']));

      expect(result.selectedComponentsIds).toEqual(['comp-1', 'comp-2', 'comp-3']);
    });

    it('should replace existing component IDs', () => {
      const state = {
        ...initialState,
        selectedComponentsIds: ['comp-1', 'comp-2'],
      };

      const result = importerReducer(state, setSelectedComponentsIds(['comp-3', 'comp-4']));

      expect(result.selectedComponentsIds).toEqual(['comp-3', 'comp-4']);
    });

    it('should allow setting to empty array', () => {
      const state = {
        ...initialState,
        selectedComponentsIds: ['comp-1', 'comp-2'],
      };

      const result = importerReducer(state, setSelectedComponentsIds([]));

      expect(result.selectedComponentsIds).toEqual([]);
    });

    it('should log empty array when setting to empty', () => {
      vi.clearAllMocks();
      importerReducer(initialState, setSelectedComponentsIds([]));

      expect(console.log).toHaveBeenCalledWith('selectedComponentsIds', []);
    });

    it('should not affect other state properties', () => {
      const state = {
        ...initialState,
        currentStep: 'componentSelection',
        selectedLibraryId: 'lib-1',
      };

      const result = importerReducer(state, setSelectedComponentsIds(['comp-1', 'comp-2']));

      expect(result.selectedComponentsIds).toEqual(['comp-1', 'comp-2']);
      expect(result.currentStep).toBe('componentSelection');
      expect(result.selectedLibraryId).toBe('lib-1');
    });

    it('should handle large number of component IDs', () => {
      const componentIds = Array.from({ length: 100 }, (_, i) => `comp-${i}`);

      const result = importerReducer(initialState, setSelectedComponentsIds(componentIds));

      expect(result.selectedComponentsIds).toHaveLength(100);
      expect(result.selectedComponentsIds[0]).toBe('comp-0');
      expect(result.selectedComponentsIds[99]).toBe('comp-99');
    });

    it('should handle component IDs with special characters', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds(['comp-@#$%', 'comp-!@#']));

      expect(result.selectedComponentsIds).toEqual(['comp-@#$%', 'comp-!@#']);
    });

    it('should preserve order of component IDs', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds(['comp-3', 'comp-1', 'comp-2']));

      expect(result.selectedComponentsIds).toEqual(['comp-3', 'comp-1', 'comp-2']);
    });
  });

  describe('resetImporterState', () => {
    it('should reset to initial state', () => {
      const state = {
        currentStep: 'confirmation',
        selectedLibraryId: 'lib-1',
        selectedComponentsIds: ['comp-1', 'comp-2'],
      };

      const result = importerReducer(state, resetImporterState());

      expect(result).toEqual(initialState);
    });

    it('should reset currentStep to librarySelection', () => {
      const state = {
        ...initialState,
        currentStep: 'confirmation',
      };

      const result = importerReducer(state, resetImporterState());

      expect(result.currentStep).toBe('librarySelection');
    });

    it('should reset selectedLibraryId to null', () => {
      const state = {
        ...initialState,
        selectedLibraryId: 'lib-1',
      };

      const result = importerReducer(state, resetImporterState());

      expect(result.selectedLibraryId).toBeNull();
    });

    it('should reset selectedComponentsIds to empty array', () => {
      const state = {
        ...initialState,
        selectedComponentsIds: ['comp-1', 'comp-2', 'comp-3'],
      };

      const result = importerReducer(state, resetImporterState());

      expect(result.selectedComponentsIds).toEqual([]);
    });

    it('should reset all properties at once', () => {
      const state = {
        currentStep: 'confirmation',
        selectedLibraryId: 'lib-1',
        selectedComponentsIds: ['comp-1', 'comp-2'],
      };

      const result = importerReducer(state, resetImporterState());

      expect(result.currentStep).toBe('librarySelection');
      expect(result.selectedLibraryId).toBeNull();
      expect(result.selectedComponentsIds).toEqual([]);
    });

    it('should be idempotent', () => {
      const state = {
        currentStep: 'confirmation',
        selectedLibraryId: 'lib-1',
        selectedComponentsIds: ['comp-1'],
      };

      let result = importerReducer(state, resetImporterState());
      result = importerReducer(result, resetImporterState());

      expect(result).toEqual(initialState);
    });
  });

  describe('Complete Workflow', () => {
    it('should handle complete import workflow', () => {
      let state = initialState;

      // Step 1: Select library
      state = importerReducer(state, setSelectedLibraryId('material-ui'));
      expect(state.selectedLibraryId).toBe('material-ui');

      // Step 2: Move to component selection
      state = importerReducer(state, setCurrentStep('componentSelection'));
      expect(state.currentStep).toBe('componentSelection');

      // Step 3: Select components
      state = importerReducer(state, setSelectedComponentsIds(['Button', 'Input', 'Card']));
      expect(state.selectedComponentsIds).toEqual(['Button', 'Input', 'Card']);

      // Step 4: Move to confirmation
      state = importerReducer(state, setCurrentStep('confirmation'));
      expect(state.currentStep).toBe('confirmation');

      // Step 5: Reset after import
      state = importerReducer(state, resetImporterState());
      expect(state).toEqual(initialState);
    });

    it('should handle changing library selection', () => {
      let state = initialState;

      // Select first library
      state = importerReducer(state, setSelectedLibraryId('material-ui'));
      state = importerReducer(state, setSelectedComponentsIds(['Button', 'Input']));

      // Change library (should keep components - manual reset needed)
      state = importerReducer(state, setSelectedLibraryId('ant-design'));

      expect(state.selectedLibraryId).toBe('ant-design');
      expect(state.selectedComponentsIds).toEqual(['Button', 'Input']);
    });

    it('should handle adding/removing components', () => {
      let state = initialState;

      // Add initial components
      state = importerReducer(state, setSelectedComponentsIds(['Button', 'Input']));

      // Add more components
      state = importerReducer(state, setSelectedComponentsIds(['Button', 'Input', 'Card']));

      // Remove some components
      state = importerReducer(state, setSelectedComponentsIds(['Card']));

      expect(state.selectedComponentsIds).toEqual(['Card']);
    });

    it('should handle navigation back and forth', () => {
      let state = initialState;

      state = importerReducer(state, setCurrentStep('componentSelection'));
      state = importerReducer(state, setCurrentStep('confirmation'));
      state = importerReducer(state, setCurrentStep('componentSelection'));
      state = importerReducer(state, setCurrentStep('librarySelection'));

      expect(state.currentStep).toBe('librarySelection');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when setting step', () => {
      const state = {
        ...initialState,
        currentStep: 'librarySelection',
      };

      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, setCurrentStep('componentSelection'));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when setting library', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, setSelectedLibraryId('lib-1'));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when setting components', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, setSelectedComponentsIds(['comp-1', 'comp-2']));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when resetting', () => {
      const state = {
        currentStep: 'confirmation',
        selectedLibraryId: 'lib-1',
        selectedComponentsIds: ['comp-1'],
      };

      const originalState = JSON.parse(JSON.stringify(state));

      importerReducer(state, resetImporterState());

      expect(state).toEqual(originalState);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined payload for setCurrentStep', () => {
      const result = importerReducer(initialState, setCurrentStep(undefined));

      expect(result.currentStep).toBeUndefined();
    });

    it('should handle empty string for setCurrentStep', () => {
      const result = importerReducer(initialState, setCurrentStep(''));

      expect(result.currentStep).toBe('');
    });

    it('should handle non-array payload for setSelectedComponentsIds', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds('not-an-array'));

      expect(result.selectedComponentsIds).toBe('not-an-array');
    });

    it('should handle duplicate component IDs', () => {
      const result = importerReducer(initialState, setSelectedComponentsIds(['comp-1', 'comp-1', 'comp-2']));

      expect(result.selectedComponentsIds).toEqual(['comp-1', 'comp-1', 'comp-2']);
    });

    it('should handle very long library ID', () => {
      const longId = 'a'.repeat(1000);
      const result = importerReducer(initialState, setSelectedLibraryId(longId));

      expect(result.selectedLibraryId).toBe(longId);
    });
  });
});

