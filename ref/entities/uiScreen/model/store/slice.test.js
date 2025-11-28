// ===================================================================
// Unit Tests for UIScreen Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 3 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import uiScreenReducer, {
  setScreens,
  setFocusedScreenId,
  setHoveredScreenId,
  setSelectedScreenId,
  addScreen,
  updateScreen,
  removeScreen,
  setScreenViewType,
  toggleScreenViewType,
} from './slice';

// Mock shared/constants to avoid varProp eager evaluation
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    SCREEN: 'screen',
    COMPONENT: 'component',
  },
}));

// Mock screen view types constants
vi.mock('../constants/screenViewTypes', () => ({
  SCREEN_VIEW_TYPES: {
    PREVIEW: 'preview',
    WIREFRAME: 'wireframe',
  },
}));

describe('UIScreen Entity Slice', () => {
  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = uiScreenReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.focusedScreenId).toBeDefined();
      expect(state.hoveredScreenId).toBeDefined();
      expect(state.selectedScreenId).toBeDefined();
    });

    it('should initialize with empty entities', () => {
      const state = uiScreenReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should initialize UI state with null values', () => {
      const state = uiScreenReducer(undefined, { type: '@@INIT' });

      expect(state.focusedScreenId).toBeNull();
      expect(state.hoveredScreenId).toBeNull();
      expect(state.selectedScreenId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set focused screen id', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const state = uiScreenReducer(
        initialState,
        setFocusedScreenId('screen-123'),
      );

      expect(state.focusedScreenId).toBe('screen-123');
    });

    it('should set hovered screen id', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const state = uiScreenReducer(
        initialState,
        setHoveredScreenId('screen-456'),
      );

      expect(state.hoveredScreenId).toBe('screen-456');
    });

    it('should set selected screen id', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const state = uiScreenReducer(
        initialState,
        setSelectedScreenId('screen-789'),
      );

      expect(state.selectedScreenId).toBe('screen-789');
    });
  });

  describe('Query Actions', () => {
    it('should set screens', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const screens = [
        { id: 'screen-1', name: 'Home Screen' },
        { id: 'screen-2', name: 'Profile Screen' },
      ];

      const state = uiScreenReducer(initialState, setScreens(screens));

      expect(state.ids).toHaveLength(2);
      expect(state.ids).toEqual(['screen-1', 'screen-2']);
      expect(state.entities['screen-1']).toEqual(screens[0]);
      expect(state.entities['screen-2']).toEqual(screens[1]);
    });

    it('should replace existing screens when setting new screens', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(
        state,
        setScreens([{ id: 'screen-old', name: 'Old' }]),
      );

      state = uiScreenReducer(
        state,
        setScreens([{ id: 'screen-new', name: 'New' }]),
      );

      expect(state.ids).toEqual(['screen-new']);
      expect(state.entities['screen-old']).toBeUndefined();
      expect(state.entities['screen-new']).toBeDefined();
    });
  });

  describe('Mutation Actions', () => {
    it('should add a screen', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const state = uiScreenReducer(
        initialState,
        addScreen({ id: 'screen-new', name: 'New Screen' }),
      );

      expect(state.ids).toContain('screen-new');
      expect(state.entities['screen-new']).toBeDefined();
      expect(state.entities['screen-new'].name).toBe('New Screen');
    });

    it('should update an existing screen', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(
        state,
        addScreen({ id: 'screen-1', name: 'Original' }),
      );

      state = uiScreenReducer(
        state,
        updateScreen({ id: 'screen-1', name: 'Updated', description: 'New desc' }),
      );

      expect(state.entities['screen-1'].name).toBe('Updated');
      expect(state.entities['screen-1'].description).toBe('New desc');
    });

    it('should remove a screen', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(
        state,
        setScreens([
          { id: 'screen-1', name: 'Screen 1' },
          { id: 'screen-2', name: 'Screen 2' },
        ]),
      );

      state = uiScreenReducer(state, removeScreen('screen-1'));

      expect(state.ids).not.toContain('screen-1');
      expect(state.entities['screen-1']).toBeUndefined();
      expect(state.ids).toContain('screen-2');
    });
  });

  describe('Wireframe View Actions', () => {
    it('should set screen view type', () => {
      const initialState = uiScreenReducer(undefined, { type: '@@INIT' });
      const state = uiScreenReducer(
        initialState,
        setScreenViewType('preview'),
      );

      expect(state.viewType).toBe('preview');
    });

    it('should toggle screen view type', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      // Default is wireframe
      expect(state.viewType).toBe('wireframe');

      // Toggle to preview
      state = uiScreenReducer(state, toggleScreenViewType());
      expect(state.viewType).toBe('preview');

      // Toggle back to wireframe
      state = uiScreenReducer(state, toggleScreenViewType());
      expect(state.viewType).toBe('wireframe');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values in UI state', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(state, setSelectedScreenId('screen-1'));
      expect(state.selectedScreenId).toBe('screen-1');

      state = uiScreenReducer(state, setSelectedScreenId(null));
      expect(state.selectedScreenId).toBeNull();
    });

    it('should handle updating non-existent screen gracefully', () => {
      const state = uiScreenReducer(undefined, { type: '@@INIT' });

      const newState = uiScreenReducer(
        state,
        updateScreen({ id: 'non-existent', name: 'Test' }),
      );

      expect(newState).toBeDefined();
      expect(newState.entities['non-existent']).toBeUndefined();
    });

    it('should handle removing non-existent screen gracefully', () => {
      const state = uiScreenReducer(undefined, { type: '@@INIT' });

      const newState = uiScreenReducer(state, removeScreen('non-existent'));

      expect(newState).toBeDefined();
      expect(newState.ids).toEqual([]);
    });

    it('should handle empty screens array', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(
        state,
        setScreens([{ id: 'screen-1', name: 'Screen 1' }]),
      );

      state = uiScreenReducer(state, setScreens([]));

      expect(state.ids).toEqual([]);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle adding multiple screens sequentially', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(state, addScreen({ id: 'screen-1', name: 'First' }));
      state = uiScreenReducer(state, addScreen({ id: 'screen-2', name: 'Second' }));
      state = uiScreenReducer(state, addScreen({ id: 'screen-3', name: 'Third' }));

      expect(state.ids).toHaveLength(3);
      expect(state.ids).toEqual(['screen-1', 'screen-2', 'screen-3']);
    });

    it('should maintain UI state when updating screens', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(state, setSelectedScreenId('screen-1'));
      state = uiScreenReducer(
        state,
        setScreens([{ id: 'screen-1', name: 'Screen 1' }]),
      );

      expect(state.selectedScreenId).toBe('screen-1');
    });

    it('should handle multiple UI state updates', () => {
      let state = uiScreenReducer(undefined, { type: '@@INIT' });

      state = uiScreenReducer(state, setFocusedScreenId('screen-1'));
      state = uiScreenReducer(state, setHoveredScreenId('screen-2'));
      state = uiScreenReducer(state, setSelectedScreenId('screen-3'));

      expect(state.focusedScreenId).toBe('screen-1');
      expect(state.hoveredScreenId).toBe('screen-2');
      expect(state.selectedScreenId).toBe('screen-3');
    });
  });
});

