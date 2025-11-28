// ===================================================================
// Unit Tests for sidebarCode Redux Slice
// Widget State Management - Code Sidebar Tab & Type Management
// Push to 70% - Widget Testing (25 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../constants/constants', () => ({
  TABS: {
    ARGUMENTS: 'arguments',
    TEST_DRIVE: 'test-drive',
    AI_CODER: 'ai-coder',
  },
}));

vi.mock('../../../../entities/code', () => ({
  CODE_TYPES: {
    COMPONENT: 'component',
    SCREEN: 'screen',
    CUSTOM: 'custom',
    CODEBASE: 'codebase',
  },
}));

import codeSidebarReducer, {
  setSelectedTab,
  setCodeType,
} from './slice';

describe('sidebarCode Redux Slice - Code Sidebar Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = codeSidebarReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (3 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState).toHaveProperty('selectedTab');
      expect(initialState).toHaveProperty('codeType');
      expect(initialState).toHaveProperty('availableTabs');
    });

    it('should have ARGUMENTS as default selected tab', () => {
      expect(initialState.selectedTab).toBe('arguments');
    });

    it('should have null codeType and empty tabs initially', () => {
      expect(initialState.codeType).toBeNull();
      expect(initialState.availableTabs).toEqual([]);
    });
  });

  // ===================================================================
  // PART 2: setSelectedTab Action (5 tests)
  // ===================================================================

  describe('setSelectedTab Action', () => {
    it('should set selected tab to ARGUMENTS', () => {
      const state = codeSidebarReducer(initialState, setSelectedTab('arguments'));
      expect(state.selectedTab).toBe('arguments');
    });

    it('should set selected tab to TEST_DRIVE', () => {
      const state = codeSidebarReducer(initialState, setSelectedTab('test-drive'));
      expect(state.selectedTab).toBe('test-drive');
    });

    it('should set selected tab to AI_CODER', () => {
      const state = codeSidebarReducer(initialState, setSelectedTab('ai-coder'));
      expect(state.selectedTab).toBe('ai-coder');
    });

    it('should override previous tab selection', () => {
      let state = codeSidebarReducer(initialState, setSelectedTab('arguments'));
      expect(state.selectedTab).toBe('arguments');

      state = codeSidebarReducer(state, setSelectedTab('ai-coder'));
      expect(state.selectedTab).toBe('ai-coder');
    });

    it('should maintain other state when changing tab', () => {
      let state = codeSidebarReducer(initialState, setCodeType('component'));
      const codeType = state.codeType;
      const availableTabs = state.availableTabs;

      state = codeSidebarReducer(state, setSelectedTab('ai-coder'));
      expect(state.codeType).toBe(codeType);
      expect(state.availableTabs).toEqual(availableTabs);
    });
  });

  // ===================================================================
  // PART 3: setCodeType - COMPONENT (4 tests)
  // ===================================================================

  describe('setCodeType - COMPONENT', () => {
    it('should set code type to COMPONENT', () => {
      const state = codeSidebarReducer(initialState, setCodeType('component'));
      expect(state.codeType).toBe('component');
    });

    it('should set available tabs for COMPONENT to [AI_CODER]', () => {
      const state = codeSidebarReducer(initialState, setCodeType('component'));
      expect(state.availableTabs).toEqual(['ai-coder']);
    });

    it('should switch to AI_CODER tab if ARGUMENTS not available for COMPONENT', () => {
      const state = codeSidebarReducer(initialState, setCodeType('component'));
      expect(state.selectedTab).toBe('ai-coder');
    });

    it('should keep current tab if it is in available tabs for COMPONENT', () => {
      let state = codeSidebarReducer(initialState, setSelectedTab('ai-coder'));
      state = codeSidebarReducer(state, setCodeType('component'));
      expect(state.selectedTab).toBe('ai-coder');
    });
  });

  // ===================================================================
  // PART 4: setCodeType - SCREEN (3 tests)
  // ===================================================================

  describe('setCodeType - SCREEN', () => {
    it('should set code type to SCREEN', () => {
      const state = codeSidebarReducer(initialState, setCodeType('screen'));
      expect(state.codeType).toBe('screen');
    });

    it('should set available tabs for SCREEN to [AI_CODER]', () => {
      const state = codeSidebarReducer(initialState, setCodeType('screen'));
      expect(state.availableTabs).toEqual(['ai-coder']);
    });

    it('should switch to first available tab for SCREEN', () => {
      const state = codeSidebarReducer(initialState, setCodeType('screen'));
      expect(state.selectedTab).toBe('ai-coder');
    });
  });

  // ===================================================================
  // PART 5: setCodeType - CUSTOM (4 tests)
  // ===================================================================

  describe('setCodeType - CUSTOM', () => {
    it('should set code type to CUSTOM', () => {
      const state = codeSidebarReducer(initialState, setCodeType('custom'));
      expect(state.codeType).toBe('custom');
    });

    it('should set available tabs for CUSTOM to all three tabs', () => {
      const state = codeSidebarReducer(initialState, setCodeType('custom'));
      expect(state.availableTabs).toEqual(['arguments', 'test-drive', 'ai-coder']);
    });

    it('should keep ARGUMENTS tab selected for CUSTOM (it is available)', () => {
      const state = codeSidebarReducer(initialState, setCodeType('custom'));
      expect(state.selectedTab).toBe('arguments');
    });

    it('should allow switching between all tabs for CUSTOM', () => {
      let state = codeSidebarReducer(initialState, setCodeType('custom'));

      state = codeSidebarReducer(state, setSelectedTab('test-drive'));
      expect(state.selectedTab).toBe('test-drive');

      state = codeSidebarReducer(state, setSelectedTab('ai-coder'));
      expect(state.selectedTab).toBe('ai-coder');

      state = codeSidebarReducer(state, setSelectedTab('arguments'));
      expect(state.selectedTab).toBe('arguments');
    });
  });

  // ===================================================================
  // PART 6: setCodeType - CODEBASE (3 tests)
  // ===================================================================

  describe('setCodeType - CODEBASE', () => {
    it('should set code type to CODEBASE', () => {
      const state = codeSidebarReducer(initialState, setCodeType('codebase'));
      expect(state.codeType).toBe('codebase');
    });

    it('should set available tabs for CODEBASE to [AI_CODER]', () => {
      const state = codeSidebarReducer(initialState, setCodeType('codebase'));
      expect(state.availableTabs).toEqual(['ai-coder']);
    });

    it('should switch to AI_CODER for CODEBASE', () => {
      const state = codeSidebarReducer(initialState, setCodeType('codebase'));
      expect(state.selectedTab).toBe('ai-coder');
    });
  });

  // ===================================================================
  // PART 7: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle code type switching workflow', () => {
      let state = initialState;

      // Start with CUSTOM (has all tabs)
      state = codeSidebarReducer(state, setCodeType('custom'));
      expect(state.availableTabs).toEqual(['arguments', 'test-drive', 'ai-coder']);
      expect(state.selectedTab).toBe('arguments');

      // Select TEST_DRIVE tab
      state = codeSidebarReducer(state, setSelectedTab('test-drive'));
      expect(state.selectedTab).toBe('test-drive');

      // Switch to COMPONENT (only AI_CODER available)
      state = codeSidebarReducer(state, setCodeType('component'));
      expect(state.availableTabs).toEqual(['ai-coder']);
      expect(state.selectedTab).toBe('ai-coder'); // Auto-switched

      // Switch back to CUSTOM
      state = codeSidebarReducer(state, setCodeType('custom'));
      expect(state.selectedTab).toBe('ai-coder'); // Kept because it's available
    });

    it('should handle multiple code type changes', () => {
      let state = initialState;

      const codeTypes = ['component', 'screen', 'custom', 'codebase'];

      codeTypes.forEach(type => {
        state = codeSidebarReducer(state, setCodeType(type));
        expect(state.codeType).toBe(type);
        expect(state.availableTabs.length).toBeGreaterThan(0);
        expect(state.availableTabs).toContain(state.selectedTab);
      });
    });

    it('should maintain state immutability', () => {
      const state1 = codeSidebarReducer(initialState, setCodeType('custom'));
      const state2 = codeSidebarReducer(state1, setSelectedTab('test-drive'));

      expect(state1).not.toBe(state2);
      expect(state1.selectedTab).toBe('arguments');
      expect(state2.selectedTab).toBe('test-drive');
    });
  });
});

