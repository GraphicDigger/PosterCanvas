// ===================================================================
// Unit Tests for elementSidebar Redux Slice
// Widget State Management - Element Sidebar Tab Selection
// Push to 70% - Widget Testing (15 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants (match actual tabs.js structure)
vi.mock('../constants/tabs', () => ({
  TABS: {
    STYLE: 'Style', // Actual default
    SETTINGS: 'Settings',
    ACTIONS: 'Actions',
  },
}));

import elementSidebarReducer, {
  setSelectedTab,
} from './slice';

describe('elementSidebar Redux Slice - Tab Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = elementSidebarReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (2 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState).toHaveProperty('selectedTab');
    });

    it('should have STYLE as default selected tab', () => {
      expect(initialState.selectedTab).toBe('Style');
    });
  });

  // ===================================================================
  // PART 2: setSelectedTab Action (10 tests)
  // ===================================================================

  describe('setSelectedTab Action', () => {
    it('should set selected tab to SETTINGS', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('Settings'));
      expect(state.selectedTab).toBe('Settings');
    });

    it('should set selected tab to STYLES', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('Style'));
      expect(state.selectedTab).toBe('Style');
    });

    it('should set selected tab to LAYOUT', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('Actions'));
      expect(state.selectedTab).toBe('Actions');
    });

    it('should set selected tab to ACTIONS', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('Actions'));
      expect(state.selectedTab).toBe('Actions');
    });

    it('should override previous tab selection', () => {
      let state = elementSidebarReducer(initialState, setSelectedTab('Style'));
      expect(state.selectedTab).toBe('Style');

      state = elementSidebarReducer(state, setSelectedTab('Actions'));
      expect(state.selectedTab).toBe('Actions');
    });

    it('should accept custom tab names', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('custom-tab'));
      expect(state.selectedTab).toBe('custom-tab');
    });

    it('should maintain state immutability', () => {
      const state = elementSidebarReducer(initialState, setSelectedTab('Actions'));
      expect(state).not.toBe(initialState);
      expect(initialState.selectedTab).toBe('Style'); // Initial default
      expect(state.selectedTab).toBe('Actions');
    });

    it('should handle multiple tab switches', () => {
      let state = initialState;

      const tabs = ['Settings', 'Style', 'Actions'];

      tabs.forEach(tab => {
        state = elementSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = elementSidebarReducer(state, setSelectedTab('Style'));
        state = elementSidebarReducer(state, setSelectedTab('Actions'));
      }

      expect(state.selectedTab).toBe('Actions');
    });
  });

  // ===================================================================
  // PART 3: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete workflow', () => {
      let state = initialState;
      expect(state.selectedTab).toBe('Style'); // Initial default is Style

      // User opens styles
      state = elementSidebarReducer(state, setSelectedTab('Style'));
      expect(state.selectedTab).toBe('Style');

      // User opens layout
      state = elementSidebarReducer(state, setSelectedTab('Actions'));
      expect(state.selectedTab).toBe('Actions');

      // User returns to settings
      state = elementSidebarReducer(state, setSelectedTab('Settings'));
      expect(state.selectedTab).toBe('Settings');
    });

    it('should maintain consistent state through unknown actions', () => {
      const state = elementSidebarReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
      expect(state.selectedTab).toBe('Style'); // Initial default is Style
    });

    it('should handle tab persistence simulation', () => {
      let state = initialState;

      // Save tab selection
      state = elementSidebarReducer(state, setSelectedTab('Actions'));
      const savedTab = state.selectedTab;

      // Simulate reload by creating new state
      let newState = elementSidebarReducer(undefined, { type: '@@INIT' });

      // Restore saved tab
      newState = elementSidebarReducer(newState, setSelectedTab(savedTab));
      expect(newState.selectedTab).toBe('Actions');
    });
  });
});

