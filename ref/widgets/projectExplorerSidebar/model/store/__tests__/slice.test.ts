// ===================================================================
// Unit Tests for projectExplorer (explorerSidebar) Redux Slice
// Coverage Target: 100%
// Phase 2 - Push to 50% Coverage (25 lines, TypeScript)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setSubMode,
  resetSubMode,
  setMode,
  resetMode,
  toggleSettings,
  toggleGlobalSearch,
} from '../slice';
import { SIDEBAR_CONTENT } from '../../constants/sidebarContent';
import { TABS } from '../../constants/tabs';
import { PROJECT_SETTINGS_SECTION } from '@/shared/constants';

// ===================================================================
// TYPE DEFINITIONS
// ===================================================================

interface ExplorerSidebarState {
  mode: string;
  subMode: string | null;
}

// ===================================================================
// TESTS
// ===================================================================

describe('projectExplorer (explorerSidebar) Redux Slice (TypeScript)', () => {
  let initialState: ExplorerSidebarState;

  beforeEach(() => {
    initialState = {
      mode: SIDEBAR_CONTENT.MAIN,
      subMode: TABS.PROJECT,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should have correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('mode');
      expect(state).toHaveProperty('subMode');
    });

    it('should initialize with MAIN mode', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
    });

    it('should initialize with PROJECT subMode', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.subMode).toBe(TABS.PROJECT);
    });
  });

  describe('setMode Action', () => {
    it('should set mode to MAIN', () => {
      const state = reducer(initialState, setMode(SIDEBAR_CONTENT.MAIN));

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
    });

    it('should set mode to SETTINGS', () => {
      const state = reducer(initialState, setMode(SIDEBAR_CONTENT.SETTINGS));

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });

    it('should set mode to GLOBAL_SEARCH', () => {
      const state = reducer(initialState, setMode(SIDEBAR_CONTENT.GLOBAL_SEARCH));

      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
    });

    it('should update mode from MAIN to SETTINGS', () => {
      const stateWithMain: ExplorerSidebarState = {
        ...initialState,
        mode: SIDEBAR_CONTENT.MAIN,
      };

      const state = reducer(stateWithMain, setMode(SIDEBAR_CONTENT.SETTINGS));

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });

    it('should preserve subMode when changing mode', () => {
      const stateWithSubMode: ExplorerSidebarState = {
        ...initialState,
        subMode: TABS.ASSETS,
      };

      const state = reducer(stateWithSubMode, setMode(SIDEBAR_CONTENT.SETTINGS));

      expect(state.subMode).toBe(TABS.ASSETS);
    });

    it('should handle custom mode value', () => {
      const customMode = 'CUSTOM_MODE';
      const state = reducer(initialState, setMode(customMode));

      expect(state.mode).toBe(customMode);
    });
  });

  describe('resetMode Action', () => {
    it('should reset to initial state', () => {
      const stateWithSettings: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.SETTINGS,
        subMode: PROJECT_SETTINGS_SECTION.GENERAL,
      };

      const state = reducer(stateWithSettings, resetMode());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should reset mode when already at initial state', () => {
      const state = reducer(initialState, resetMode());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should reset from GLOBAL_SEARCH', () => {
      const stateWithSearch: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.GLOBAL_SEARCH,
        subMode: null,
      };

      const state = reducer(stateWithSearch, resetMode());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });
  });

  describe('setSubMode Action', () => {
    it('should set subMode to PROJECT', () => {
      const state = reducer(initialState, setSubMode(TABS.PROJECT));

      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should set subMode to ASSETS', () => {
      const state = reducer(initialState, setSubMode(TABS.ASSETS));

      expect(state.subMode).toBe(TABS.ASSETS);
    });

    it('should update subMode from PROJECT to ASSETS', () => {
      const stateWithProject: ExplorerSidebarState = {
        ...initialState,
        subMode: TABS.PROJECT,
      };

      const state = reducer(stateWithProject, setSubMode(TABS.ASSETS));

      expect(state.subMode).toBe(TABS.ASSETS);
    });

    it('should set subMode to GENERAL settings', () => {
      const state = reducer(initialState, setSubMode(PROJECT_SETTINGS_SECTION.GENERAL));

      expect(state.subMode).toBe(PROJECT_SETTINGS_SECTION.GENERAL);
    });

    it('should preserve mode when changing subMode', () => {
      const stateWithSettings: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.SETTINGS,
        subMode: TABS.PROJECT,
      };

      const state = reducer(stateWithSettings, setSubMode(PROJECT_SETTINGS_SECTION.MEMBER));

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(state.subMode).toBe(PROJECT_SETTINGS_SECTION.MEMBER);
    });

    it('should handle null subMode', () => {
      const state = reducer(initialState, setSubMode(null));

      expect(state.subMode).toBeNull();
    });
  });

  describe('resetSubMode Action', () => {
    it('should reset subMode to null', () => {
      const stateWithSubMode: ExplorerSidebarState = {
        ...initialState,
        subMode: TABS.ASSETS,
      };

      const state = reducer(stateWithSubMode, resetSubMode());

      expect(state.subMode).toBeNull();
    });

    it('should reset subMode from PROJECT to null', () => {
      const state = reducer(initialState, resetSubMode());

      expect(state.subMode).toBeNull();
    });

    it('should preserve mode when resetting subMode', () => {
      const stateWithSettings: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.SETTINGS,
        subMode: PROJECT_SETTINGS_SECTION.GENERAL,
      };

      const state = reducer(stateWithSettings, resetSubMode());

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(state.subMode).toBeNull();
    });
  });

  describe('toggleSettings Action', () => {
    it('should toggle from MAIN to SETTINGS', () => {
      const stateWithMain: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.MAIN,
        subMode: TABS.PROJECT,
      };

      const state = reducer(stateWithMain, toggleSettings());

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(state.subMode).toBe(PROJECT_SETTINGS_SECTION.GENERAL);
    });

    it('should toggle from SETTINGS to MAIN', () => {
      const stateWithSettings: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.SETTINGS,
        subMode: PROJECT_SETTINGS_SECTION.GENERAL,
      };

      const state = reducer(stateWithSettings, toggleSettings());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should toggle from GLOBAL_SEARCH to MAIN', () => {
      const stateWithSearch: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.GLOBAL_SEARCH,
        subMode: null,
      };

      const state = reducer(stateWithSearch, toggleSettings());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should handle multiple toggles', () => {
      let state = initialState;

      // Toggle to SETTINGS
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);

      // Toggle back to MAIN
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);

      // Toggle to SETTINGS again
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });
  });

  describe('toggleGlobalSearch Action', () => {
    it('should toggle from MAIN to GLOBAL_SEARCH', () => {
      const stateWithMain: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.MAIN,
        subMode: TABS.PROJECT,
      };

      const state = reducer(stateWithMain, toggleGlobalSearch());

      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
    });

    it('should toggle from GLOBAL_SEARCH to MAIN', () => {
      const stateWithSearch: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.GLOBAL_SEARCH,
        subMode: null,
      };

      const state = reducer(stateWithSearch, toggleGlobalSearch());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
    });

    it('should toggle from SETTINGS to MAIN', () => {
      const stateWithSettings: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.SETTINGS,
        subMode: PROJECT_SETTINGS_SECTION.GENERAL,
      };

      const state = reducer(stateWithSettings, toggleGlobalSearch());

      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
    });

    it('should preserve subMode when toggling', () => {
      const stateWithSubMode: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.MAIN,
        subMode: TABS.ASSETS,
      };

      const state = reducer(stateWithSubMode, toggleGlobalSearch());

      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
      expect(state.subMode).toBe(TABS.ASSETS);
    });

    it('should handle multiple toggles', () => {
      let state = initialState;

      // Toggle to GLOBAL_SEARCH
      state = reducer(state, toggleGlobalSearch());
      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);

      // Toggle back to MAIN
      state = reducer(state, toggleGlobalSearch());
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);

      // Toggle to GLOBAL_SEARCH again
      state = reducer(state, toggleGlobalSearch());
      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full mode switching workflow', () => {
      let state = initialState;

      // Start at MAIN
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);

      // Toggle to SETTINGS
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(state.subMode).toBe(PROJECT_SETTINGS_SECTION.GENERAL);

      // Change subMode
      state = reducer(state, setSubMode(PROJECT_SETTINGS_SECTION.MEMBER));
      expect(state.subMode).toBe(PROJECT_SETTINGS_SECTION.MEMBER);

      // Toggle back to MAIN
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should handle search and settings workflow', () => {
      let state = initialState;

      // Toggle to GLOBAL_SEARCH
      state = reducer(state, toggleGlobalSearch());
      expect(state.mode).toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);

      // Toggle to SETTINGS (goes to MAIN first, then SETTINGS)
      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);

      state = reducer(state, toggleSettings());
      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });

    it('should handle mode and subMode changes', () => {
      let state = initialState;

      // Change subMode
      state = reducer(state, setSubMode(TABS.ASSETS));
      expect(state.subMode).toBe(TABS.ASSETS);

      // Change mode
      state = reducer(state, setMode(SIDEBAR_CONTENT.SETTINGS));
      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(state.subMode).toBe(TABS.ASSETS);

      // Reset subMode
      state = reducer(state, resetSubMode());
      expect(state.subMode).toBeNull();

      // Reset mode
      state = reducer(state, resetMode());
      expect(state.mode).toBe(SIDEBAR_CONTENT.MAIN);
      expect(state.subMode).toBe(TABS.PROJECT);
    });

    it('should handle rapid toggles', () => {
      let state = initialState;

      state = reducer(state, toggleSettings());
      state = reducer(state, toggleSettings());
      state = reducer(state, toggleGlobalSearch());
      state = reducer(state, toggleGlobalSearch());
      state = reducer(state, toggleSettings());

      expect(state.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('mode');
      expect(state).toHaveProperty('subMode');
      expect(Object.keys(state)).toHaveLength(2);
    });

    it('should preserve state structure after operations', () => {
      let state = initialState;

      state = reducer(state, toggleSettings());
      state = reducer(state, setSubMode(PROJECT_SETTINGS_SECTION.GENERAL));
      state = reducer(state, toggleGlobalSearch());

      expect(state).toHaveProperty('mode');
      expect(state).toHaveProperty('subMode');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null mode value', () => {
      const state = reducer(initialState, setMode(null as any));

      expect(state.mode).toBeNull();
    });

    it('should handle undefined mode value', () => {
      const state = reducer(initialState, setMode(undefined as any));

      expect(state.mode).toBeUndefined();
    });

    it('should handle empty string mode', () => {
      const state = reducer(initialState, setMode(''));

      expect(state.mode).toBe('');
    });

    it('should handle numeric mode value', () => {
      const state = reducer(initialState, setMode(123 as any));

      expect(state.mode).toBe(123);
    });
  });

  describe('Constants Validation', () => {
    it('should use correct SIDEBAR_CONTENT constants', () => {
      expect(SIDEBAR_CONTENT.MAIN).toBeDefined();
      expect(SIDEBAR_CONTENT.SETTINGS).toBeDefined();
      expect(SIDEBAR_CONTENT.GLOBAL_SEARCH).toBeDefined();
    });

    it('should use correct TABS constants', () => {
      expect(TABS.PROJECT).toBeDefined();
      expect(TABS.ASSETS).toBeDefined();
      expect(TABS.CODES).toBeDefined();
    });

    it('should use correct PROJECT_SETTINGS_SECTION constants', () => {
      expect(PROJECT_SETTINGS_SECTION.GENERAL).toBeDefined();
      expect(PROJECT_SETTINGS_SECTION.MEMBER).toBeDefined();
      expect(PROJECT_SETTINGS_SECTION.AGENT).toBeDefined();
    });

    it('should have different values for different modes', () => {
      expect(SIDEBAR_CONTENT.MAIN).not.toBe(SIDEBAR_CONTENT.SETTINGS);
      expect(SIDEBAR_CONTENT.MAIN).not.toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
      expect(SIDEBAR_CONTENT.SETTINGS).not.toBe(SIDEBAR_CONTENT.GLOBAL_SEARCH);
    });
  });

  describe('Type Safety', () => {
    it('should enforce state structure', () => {
      const state: ExplorerSidebarState = {
        mode: SIDEBAR_CONTENT.MAIN,
        subMode: TABS.PROJECT,
      };

      const newState = reducer(state, setMode(SIDEBAR_CONTENT.SETTINGS));

      expect(newState.mode).toBe(SIDEBAR_CONTENT.SETTINGS);
    });

    it('should handle mode type correctly', () => {
      const state = reducer(initialState, setMode(SIDEBAR_CONTENT.MAIN));

      expect(typeof state.mode).toBe('string');
    });

    it('should handle subMode null type', () => {
      const state = reducer(initialState, resetSubMode());

      expect(state.subMode).toBeNull();
    });
  });
});

