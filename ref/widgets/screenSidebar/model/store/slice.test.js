// ===================================================================
// Unit Tests for screenSidebar Redux Slice
// Widget State Management - Screen Sidebar Tab Selection
// Push to 70% - Widget Testing (15 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../constants/tabs', () => ({
  TABS: {
    STYLE: 'style',
    LAYOUT: 'layout',
    SETTINGS: 'settings',
    VARIABLES: 'variables',
    MODES: 'modes',
  },
}));

import screenSidebarReducer, {
  setSelectedTab,
} from './slice';

describe('screenSidebar Redux Slice - Tab Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = screenSidebarReducer(undefined, { type: '@@INIT' });
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
      expect(initialState.selectedTab).toBe('style');
    });
  });

  // ===================================================================
  // PART 2: setSelectedTab Action (10 tests)
  // ===================================================================

  describe('setSelectedTab Action', () => {
    it('should set selected tab to STYLE', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('style'));
      expect(state.selectedTab).toBe('style');
    });

    it('should set selected tab to LAYOUT', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('layout'));
      expect(state.selectedTab).toBe('layout');
    });

    it('should set selected tab to SETTINGS', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');
    });

    it('should set selected tab to VARIABLES', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('variables'));
      expect(state.selectedTab).toBe('variables');
    });

    it('should set selected tab to MODES', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('modes'));
      expect(state.selectedTab).toBe('modes');
    });

    it('should override previous tab selection', () => {
      let state = screenSidebarReducer(initialState, setSelectedTab('layout'));
      expect(state.selectedTab).toBe('layout');

      state = screenSidebarReducer(state, setSelectedTab('variables'));
      expect(state.selectedTab).toBe('variables');
    });

    it('should accept custom tab names', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('custom-tab'));
      expect(state.selectedTab).toBe('custom-tab');
    });

    it('should maintain state immutability', () => {
      const state = screenSidebarReducer(initialState, setSelectedTab('layout'));
      expect(state).not.toBe(initialState);
      expect(initialState.selectedTab).toBe('style');
      expect(state.selectedTab).toBe('layout');
    });

    it('should handle multiple tab switches', () => {
      let state = initialState;

      const tabs = ['style', 'layout', 'settings', 'variables', 'modes'];

      tabs.forEach(tab => {
        state = screenSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = screenSidebarReducer(state, setSelectedTab('layout'));
        state = screenSidebarReducer(state, setSelectedTab('settings'));
      }

      expect(state.selectedTab).toBe('settings');
    });
  });

  // ===================================================================
  // PART 3: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete workflow', () => {
      let state = initialState;
      expect(state.selectedTab).toBe('style');

      // User opens layout
      state = screenSidebarReducer(state, setSelectedTab('layout'));
      expect(state.selectedTab).toBe('layout');

      // User opens variables
      state = screenSidebarReducer(state, setSelectedTab('variables'));
      expect(state.selectedTab).toBe('variables');

      // User returns to style
      state = screenSidebarReducer(state, setSelectedTab('style'));
      expect(state.selectedTab).toBe('style');
    });

    it('should maintain consistent state through unknown actions', () => {
      const state = screenSidebarReducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(state).toEqual(initialState);
      expect(state.selectedTab).toBe('style');
    });

    it('should handle screen editing workflow', () => {
      let state = initialState;

      // User starts with style
      expect(state.selectedTab).toBe('style');

      // User adjusts layout
      state = screenSidebarReducer(state, setSelectedTab('layout'));
      expect(state.selectedTab).toBe('layout');

      // User sets up variables
      state = screenSidebarReducer(state, setSelectedTab('variables'));
      expect(state.selectedTab).toBe('variables');

      // User configures modes
      state = screenSidebarReducer(state, setSelectedTab('modes'));
      expect(state.selectedTab).toBe('modes');

      // User checks settings
      state = screenSidebarReducer(state, setSelectedTab('settings'));
      expect(state.selectedTab).toBe('settings');
    });
  });
});

