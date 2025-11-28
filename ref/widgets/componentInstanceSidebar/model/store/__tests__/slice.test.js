// ===================================================================
// Unit Tests for componentInstanceSidebar Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (SMALL IMPACT - 19 lines, self-contained)
// Risk: LOW (Redux Toolkit, simple tab selection state)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import instanceSidebarReducer, {
  setSelectedTab,
} from '../slice';
import { TABS } from '../../constants/tabs';

describe('componentInstanceSidebar Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      selectedTab: TABS.PROPS,
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = instanceSidebarReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have PROPS as default selected tab', () => {
      const result = instanceSidebarReducer(undefined, { type: '@@INIT' });

      expect(result.selectedTab).toBe(TABS.PROPS);
    });
  });

  describe('setSelectedTab', () => {
    it('should set selected tab to PROPS', () => {
      const state = {
        selectedTab: TABS.STYLE,
      };

      const result = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));

      expect(result.selectedTab).toBe(TABS.PROPS);
    });

    it('should set selected tab to STYLE', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(TABS.STYLE));

      expect(result.selectedTab).toBe(TABS.STYLE);
    });

    it('should set selected tab to ACTIONS', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(TABS.ACTIONS));

      expect(result.selectedTab).toBe(TABS.ACTIONS);
    });

    it('should update selected tab', () => {
      let state = initialState;

      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      state = instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));
      expect(state.selectedTab).toBe(TABS.PROPS);
    });

    it('should keep same tab when setting to current value', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(TABS.PROPS));

      expect(result.selectedTab).toBe(TABS.PROPS);
    });

    it('should be idempotent', () => {
      let state = initialState;

      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state.selectedTab).toBe(TABS.STYLE);
    });

    it('should handle switching between all tabs', () => {
      let state = initialState;

      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      state = instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));
      expect(state.selectedTab).toBe(TABS.PROPS);
    });

    it('should handle rapid tab switching', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
        state = instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
        state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));
      }

      expect(state.selectedTab).toBe(TABS.PROPS);
    });
  });

  describe('Edge Cases', () => {
    it('should handle setting to null', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(null));

      expect(result.selectedTab).toBeNull();
    });

    it('should handle setting to undefined', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(undefined));

      expect(result.selectedTab).toBeUndefined();
    });

    it('should handle setting to empty string', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(''));

      expect(result.selectedTab).toBe('');
    });

    it('should handle setting to custom tab value', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab('CustomTab'));

      expect(result.selectedTab).toBe('CustomTab');
    });

    it('should handle setting to numeric value', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(123));

      expect(result.selectedTab).toBe(123);
    });

    it('should handle setting to object value', () => {
      const tabObject = { id: 'custom', name: 'Custom Tab' };
      const result = instanceSidebarReducer(initialState, setSelectedTab(tabObject));

      expect(result.selectedTab).toEqual(tabObject);
    });

    it('should handle setting to array value', () => {
      const tabArray = ['tab1', 'tab2'];
      const result = instanceSidebarReducer(initialState, setSelectedTab(tabArray));

      expect(result.selectedTab).toEqual(tabArray);
    });

    it('should handle very long string value', () => {
      const longString = 'a'.repeat(10000);
      const result = instanceSidebarReducer(initialState, setSelectedTab(longString));

      expect(result.selectedTab).toBe(longString);
    });

    it('should handle special characters in tab value', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab('Tab-@#$%'));

      expect(result.selectedTab).toBe('Tab-@#$%');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state in complex workflow', () => {
      const state = { ...initialState };
      const originalState = JSON.parse(JSON.stringify(state));

      instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));

      expect(state).toEqual(originalState);
    });
  });

  describe('Action Creator', () => {
    it('should create setSelectedTab action with PROPS', () => {
      const action = setSelectedTab(TABS.PROPS);

      expect(action.type).toBe('instanceSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.PROPS);
    });

    it('should create setSelectedTab action with STYLE', () => {
      const action = setSelectedTab(TABS.STYLE);

      expect(action.type).toBe('instanceSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.STYLE);
    });

    it('should create setSelectedTab action with ACTIONS', () => {
      const action = setSelectedTab(TABS.ACTIONS);

      expect(action.type).toBe('instanceSidebar/setSelectedTab');
      expect(action.payload).toBe(TABS.ACTIONS);
    });

    it('should create setSelectedTab action with custom value', () => {
      const action = setSelectedTab('CustomTab');

      expect(action.type).toBe('instanceSidebar/setSelectedTab');
      expect(action.payload).toBe('CustomTab');
    });
  });

  describe('Tab Constants Integration', () => {
    it('should work with all defined TABS constants', () => {
      let state = initialState;

      // Test all available tabs
      const allTabs = Object.values(TABS);

      allTabs.forEach(tab => {
        state = instanceSidebarReducer(state, setSelectedTab(tab));
        expect(state.selectedTab).toBe(tab);
      });
    });

    it('should maintain tab value type', () => {
      const result = instanceSidebarReducer(initialState, setSelectedTab(TABS.STYLE));

      expect(typeof result.selectedTab).toBe(typeof TABS.STYLE);
    });
  });

  describe('Workflow Scenarios', () => {
    it('should handle typical user navigation workflow', () => {
      let state = initialState;

      // User opens sidebar (default PROPS)
      expect(state.selectedTab).toBe(TABS.PROPS);

      // User switches to STYLE
      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      expect(state.selectedTab).toBe(TABS.STYLE);

      // User switches to ACTIONS
      state = instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      expect(state.selectedTab).toBe(TABS.ACTIONS);

      // User goes back to PROPS
      state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));
      expect(state.selectedTab).toBe(TABS.PROPS);
    });

    it('should handle back-and-forth navigation', () => {
      let state = initialState;

      for (let i = 0; i < 5; i++) {
        state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
        state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));
      }

      expect(state.selectedTab).toBe(TABS.PROPS);
    });

    it('should handle reset to default tab', () => {
      let state = initialState;

      state = instanceSidebarReducer(state, setSelectedTab(TABS.STYLE));
      state = instanceSidebarReducer(state, setSelectedTab(TABS.ACTIONS));
      state = instanceSidebarReducer(state, setSelectedTab(TABS.PROPS));

      expect(state.selectedTab).toBe(initialState.selectedTab);
    });
  });
});

