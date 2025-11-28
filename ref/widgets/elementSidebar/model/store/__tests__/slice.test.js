// ===================================================================
// Unit Tests for elementSidebar Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (SMALL IMPACT - 19 lines, self-contained)
// Risk: LOW (Redux Toolkit, simple tab selection state)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import elementSidebarReducer, {
  setSelectedTab,
} from '../slice';
import { TABS } from '../../constants/tabs';

describe('elementSidebar Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      selectedTab: TABS.STYLE, // Actual default from slice.js
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = elementSidebarReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have STYLE as default selected tab', () => {
      const result = elementSidebarReducer(undefined, { type: '@@INIT' });

      expect(result.selectedTab).toBe(TABS.STYLE);
    });
  });

  describe('setSelectedTab', () => {
    it('should set selected tab to SETTINGS', () => {
      const state = {
        selectedTab: TABS.STYLE,
      };

      const result = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));

      expect(result.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should set selected tab to STYLE', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(TABS.STYLE));

      expect(result.selectedTab).toBe(TABS.STYLE);
    });

    it('should set selected tab to PROPERTIES', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(TABS.ACTIONS));

      expect(result.selectedTab).toBe(TABS.ACTIONS);
    });

    it('should set selected tab to ACTIONS', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(TABS.ACTIONS));

      expect(result.selectedTab).toBe(TABS.ACTIONS);
    });

    it('should update selected tab', () => {
      let state = initialState;

      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      expect(state.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should keep same tab when setting to current value', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(TABS.SETTINGS));

      expect(result.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should be idempotent', () => {
      let state = initialState;

      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should handle switching between all tabs', () => {
      let state = initialState;

      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      expect(state.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
        state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
        state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
        state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      }

      expect(state.selectedTab).toBe(TABS.SETTINGS);
    });
  });

  describe('Edge Cases', () => {
    it('should handle setting to null', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(null));

      expect(result.selectedTab).toBeNull();
    });

    it('should handle setting to undefined', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(undefined));

      expect(result.selectedTab).toBeUndefined();
    });

    it('should handle setting to empty string', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(''));

      expect(result.selectedTab).toBe('');
    });

    it('should handle setting to custom tab value', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab('CustomTab'));

      expect(result.selectedTab).toBe('CustomTab');
    });

    it('should handle setting to numeric value', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(123));

      expect(result.selectedTab).toBe(123);
    });

    it('should handle setting to object value', () => {
      const tabObject = { id: 'custom', name: 'Custom Tab' };
      const result = elementSidebarReducer(initialState, setSelectedTab(tabObject));

      expect(result.selectedTab).toEqual(tabObject);
    });

    it('should handle setting to array value', () => {
      const tabArray = ['tab1', 'tab2'];
      const result = elementSidebarReducer(initialState, setSelectedTab(tabArray));

      expect(result.selectedTab).toEqual(tabArray);
    });

    it('should handle very long string value', () => {
      const longString = 'a'.repeat(10000);
      const result = elementSidebarReducer(initialState, setSelectedTab(longString));

      expect(result.selectedTab).toBe(longString);
    });

    it('should handle special characters in tab value', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab('Tab-@#$%'));

      expect(result.selectedTab).toBe('Tab-@#$%');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      elementSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state in complex workflow', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));

      expect(state).toEqual(originalState);
    });
  });

  describe('Action Creator', () => {
    it('should create setSelectedTab action with SETTINGS', () => {
      const action = setSelectedTab(TABS.SETTINGS);

      expect(action.type).toBe('elementSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.SETTINGS);
    });

    it('should create setSelectedTab action with STYLE', () => {
      const action = setSelectedTab(TABS.STYLE);

      expect(action.type).toBe('elementSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.STYLE);
    });

    it('should create setSelectedTab action with PROPERTIES', () => {
      const action = setSelectedTab(TABS.ACTIONS);

      expect(action.type).toBe('elementSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.ACTIONS);
    });

    it('should create setSelectedTab action with ACTIONS', () => {
      const action = setSelectedTab(TABS.ACTIONS);

      expect(action.type).toBe('elementSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.ACTIONS);
    });

    it('should create setSelectedTab action with custom value', () => {
      const action = setSelectedTab('CustomTab');

      expect(action.type).toBe('elementSidebar/setSelectedTab');
      expect(action.payload).toBe('CustomTab');
    });
  });

  describe('Tab Constants Integration', () => {
    it('should work with all defined TABS constants', () => {
      let state = initialState;

      // Test all available tabs
      const allTabs = Object.values(TABS);

      allTabs.forEach(tab => {
        state = elementSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should maintain tab value type', () => {
      const result = elementSidebarReducer(initialState, setSelectedTab(TABS.STYLE));

      expect(typeof result.selectedTab).toBe(typeof TABS.STYLE);
    });
  });

  describe('Workflow Scenarios', () => {
    it('should handle typical user navigation workflow', () => {
      let state = initialState;

      // User opens sidebar (default STYLE)
      expect(state.selectedTab).toBe(TABS.STYLE);

      // User switches to STYLE
      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      // User switches to PROPERTIES
      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      // User switches to ACTIONS
      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      // User goes back to SETTINGS
      state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      expect(state.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should handle back-and-forth navigation', () => {
      let state = initialState;

      for (let i = 0; i < 5; i++) {
        state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));
        state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      }

      expect(state.selectedTab).toBe(TABS.SETTINGS);
    });

    it('should handle reset to default tab', () => {
      let state = initialState;

      // Switch through various tabs
      state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));
      state = elementSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      state = elementSidebarReducer(state, setSelectedTab(TABS.SETTINGS));

      // Reset back to default STYLE tab
      state = elementSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state.selectedTab).toBe(initialState.selectedTab);
    });
  });
});

