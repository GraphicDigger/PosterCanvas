// ===================================================================
// Unit Tests for screenSidebar Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (SMALL IMPACT - 19 lines, self-contained)
// Risk: LOW (Redux Toolkit, simple tab selection state)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import screenSidebarReducer, {
  setSelectedTab,
} from '../slice';
import { TABS } from '../../constants/tabs';

describe('screenSidebar Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      selectedTab: TABS.STYLE,
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = screenSidebarReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have STYLE as default selected tab', () => {
      const result = screenSidebarReducer(undefined, { type: '@@INIT' });

      expect(result.selectedTab).toBe(TABS.STYLE);
    });
  });

  describe('setSelectedTab', () => {
    it('should set selected tab to STYLE', () => {
      const state = {
        selectedTab: TABS.PROPERTIES,
      };

      const result = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(result.selectedTab).toBe(TABS.STYLE);
    });

    it('should set selected tab to PROPERTIES', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(TABS.PROPERTIES));

      expect(result.selectedTab).toBe(TABS.PROPERTIES);
    });

    it('should set selected tab to ACTIONS', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(TABS.ACTIONS));

      expect(result.selectedTab).toBe(TABS.ACTIONS);
    });

    it('should update selected tab', () => {
      let state = initialState;

      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      expect(state.selectedTab).toBe(TABS.PROPERTIES);

      state = screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should keep same tab when setting to current value', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(TABS.STYLE));

      expect(result.selectedTab).toBe(TABS.STYLE);
    });

    it('should be idempotent', () => {
      let state = initialState;

      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));

      expect(state.selectedTab).toBe(TABS.PROPERTIES);
    });

    it('should handle switching between all tabs', () => {
      let state = initialState;

      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      expect(state.selectedTab).toBe(TABS.PROPERTIES);

      state = screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
        state = screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
        state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));
      }

      expect(state.selectedTab).toBe(TABS.STYLE);
    });
  });

  describe('Edge Cases', () => {
    it('should handle setting to null', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(null));

      expect(result.selectedTab).toBeNull();
    });

    it('should handle setting to undefined', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(undefined));

      expect(result.selectedTab).toBeUndefined();
    });

    it('should handle setting to empty string', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(''));

      expect(result.selectedTab).toBe('');
    });

    it('should handle setting to custom tab value', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab('CustomTab'));

      expect(result.selectedTab).toBe('CustomTab');
    });

    it('should handle setting to numeric value', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(123));

      expect(result.selectedTab).toBe(123);
    });

    it('should handle setting to object value', () => {
      const tabObject = { id: 'custom', name: 'Custom Tab' };
      const result = screenSidebarReducer(initialState, setSelectedTab(tabObject));

      expect(result.selectedTab).toEqual(tabObject);
    });

    it('should handle setting to array value', () => {
      const tabArray = ['tab1', 'tab2'];
      const result = screenSidebarReducer(initialState, setSelectedTab(tabArray));

      expect(result.selectedTab).toEqual(tabArray);
    });

    it('should handle very long string value', () => {
      const longString = 'a'.repeat(10000);
      const result = screenSidebarReducer(initialState, setSelectedTab(longString));

      expect(result.selectedTab).toBe(longString);
    });

    it('should handle special characters in tab value', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab('Tab-@#$%'));

      expect(result.selectedTab).toBe('Tab-@#$%');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state in complex workflow', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      screenSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state).toEqual(originalState);
    });
  });

  describe('Action Creator', () => {
    it('should create setSelectedTab action with STYLE', () => {
      const action = setSelectedTab(TABS.STYLE);

      expect(action.type).toBe('screenSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.STYLE);
    });

    it('should create setSelectedTab action with PROPERTIES', () => {
      const action = setSelectedTab(TABS.PROPERTIES);

      expect(action.type).toBe('screenSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.PROPERTIES);
    });

    it('should create setSelectedTab action with ACTIONS', () => {
      const action = setSelectedTab(TABS.ACTIONS);

      expect(action.type).toBe('screenSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.ACTIONS);
    });

    it('should create setSelectedTab action with custom value', () => {
      const action = setSelectedTab('CustomTab');

      expect(action.type).toBe('screenSidebar/setSelectedTab');
      expect(action.payload).toBe('CustomTab');
    });
  });

  describe('Tab Constants Integration', () => {
    it('should work with all defined TABS constants', () => {
      let state = initialState;

      // Test all available tabs
      const allTabs = Object.values(TABS);

      allTabs.forEach(tab => {
        state = screenSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should maintain tab value type', () => {
      const result = screenSidebarReducer(initialState, setSelectedTab(TABS.PROPERTIES));

      expect(typeof result.selectedTab).toBe(typeof TABS.PROPERTIES);
    });
  });

  describe('Workflow Scenarios', () => {
    it('should handle typical user navigation workflow', () => {
      let state = initialState;

      // User opens sidebar (default STYLE)
      expect(state.selectedTab).toBe(TABS.STYLE);

      // User switches to PROPERTIES
      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      expect(state.selectedTab).toBe(TABS.PROPERTIES);

      // User switches to ACTIONS
      state = screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      // User goes back to STYLE
      state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should handle back-and-forth navigation', () => {
      let state = initialState;

      for (let i = 0; i < 5; i++) {
        state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
        state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));
      }

      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should handle reset to default tab', () => {
      let state = initialState;

      state = screenSidebarReducer(state, setSelectedTab(TABS.PROPERTIES));
      state = screenSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      state = screenSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state.selectedTab).toBe(initialState.selectedTab);
    });
  });
});

