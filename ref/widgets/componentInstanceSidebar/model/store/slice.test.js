// ===================================================================
// Unit Tests for componentInstanceSidebar Redux Slice
// Widget State Management - Component Instance Sidebar Tab Selection
// Push to 70% - Widget Testing (15 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../constants/tabs', () => ({
  TABS: {
    PROPS: 'props',
    SETTINGS: 'settings',
    VARIANTS: 'variants',
    INSTANCES: 'instances',
  },
}));

import instanceSidebarReducer, {
  setSelectedTab,
} from './slice';

describe('componentInstanceSidebar Redux Slice - Tab Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = instanceSidebarReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (2 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState).toHaveProperty('selectedTab');
    });

    it('should have PROPS as default selected tab', () => {
      expect(initialState.selectedTab).toBe('props');
    });
  });

  // ===================================================================
  // PART 2: setSelectedTab Action (10 tests)
  // ===================================================================

  describe('setSelectedTab Action', () => {
    it('should set selected tab to PROPS', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('props'));
      expect(state.selectedTab).toBe('props');
    });

    it('should set selected tab to SETTINGS', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');
    });

    it('should set selected tab to VARIANTS', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('variants'));
      expect(state.selectedTab).toBe('variants');
    });

    it('should set selected tab to INSTANCES', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('instances'));
      expect(state.selectedTab).toBe('instances');
    });

    it('should override previous tab selection', () => {
      let state = instanceSidebarReducer(initialState, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');

      state = instanceSidebarReducer(state, setSelectedTab('variants'));
      expect(state.selectedTab).toBe('variants');
    });

    it('should accept custom tab names', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('custom-tab'));
      expect(state.selectedTab).toBe('custom-tab');
    });

    it('should maintain state immutability', () => {
      const state = instanceSidebarReducer(initialState, setSelectedTab('settings'));
      expect(state).not.toBe(initialState);
      expect(initialState.selectedTab).toBe('props');
      expect(state.selectedTab).toBe('settings');
    });

    it('should handle multiple tab switches', () => {
      let state = initialState;

      const tabs = ['props', 'settings', 'variants', 'instances'];

      tabs.forEach(tab => {
        state = instanceSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = instanceSidebarReducer(state, setSelectedTab('settings'));
        state = instanceSidebarReducer(state, setSelectedTab('variants'));
      }

      expect(state.selectedTab).toBe('variants');
    });

    it('should handle all available tabs in sequence', () => {
      let state = initialState;

      // Cycle through all tabs twice
      for (let cycle = 0; cycle < 2; cycle++) {
        state = instanceSidebarReducer(state, setSelectedTab('props'));
        expect(state.selectedTab).toBe('props');

        state = instanceSidebarReducer(state, setSelectedTab('settings'));
        expect(state.selectedTab).toBe('settings');

        state = instanceSidebarReducer(state, setSelectedTab('variants'));
        expect(state.selectedTab).toBe('variants');

        state = instanceSidebarReducer(state, setSelectedTab('instances'));
        expect(state.selectedTab).toBe('instances');
      }
    });
  });

  // ===================================================================
  // PART 3: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle component instance workflow', () => {
      let state = initialState;
      expect(state.selectedTab).toBe('props');

      // User edits props
      state = instanceSidebarReducer(state, setSelectedTab('props'));
      expect(state.selectedTab).toBe('props');

      // User checks variants
      state = instanceSidebarReducer(state, setSelectedTab('variants'));
      expect(state.selectedTab).toBe('variants');

      // User views all instances
      state = instanceSidebarReducer(state, setSelectedTab('instances'));
      expect(state.selectedTab).toBe('instances');

      // User adjusts settings
      state = instanceSidebarReducer(state, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');
    });

    it('should maintain consistent state through unknown actions', () => {
      const state = instanceSidebarReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
      expect(state.selectedTab).toBe('props');
    });

    it('should handle prop editing workflow', () => {
      let state = initialState;

      // Start with props tab
      expect(state.selectedTab).toBe('props');

      // User edits a prop and checks settings
      state = instanceSidebarReducer(state, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');

      // User creates a variant
      state = instanceSidebarReducer(state, setSelectedTab('variants'));
      expect(state.selectedTab).toBe('variants');

      // User returns to props
      state = instanceSidebarReducer(state, setSelectedTab('props'));
      expect(state.selectedTab).toBe('props');
    });
  });
});

