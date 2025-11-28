// ===================================================================
// Unit Tests for uiScreen Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (MEDIUM IMPACT - 44 lines + actions)
// Risk: LOW (Redux Toolkit, screen state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import screenReducer, {
  setFocusedScreenId,
  setHoveredScreenId,
  setSelectedScreenId,
  setScreens,
  addScreen,
  updateScreen,
  removeScreen,
  setScreenViewType,
  toggleScreenViewType,
} from '../slice';
import { ENTITY_KINDS } from '@/shared/constants';

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-1234',
}));

describe('uiScreen Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      focusedScreenId: null,
      hoveredScreenId: null,
      selectedScreenId: null,
      viewType: 'wireframe',
      wireframe: {
        blocks: [],
        connections: [],
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = screenReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty ids and entities', () => {
      const result = screenReducer(undefined, { type: '@@INIT' });

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should have null UI state values', () => {
      const result = screenReducer(undefined, { type: '@@INIT' });

      expect(result.focusedScreenId).toBeNull();
      expect(result.hoveredScreenId).toBeNull();
      expect(result.selectedScreenId).toBeNull();
    });

    it('should have wireframe as default viewType', () => {
      const result = screenReducer(undefined, { type: '@@INIT' });

      expect(result.viewType).toBe('wireframe');
    });

    it('should have empty wireframe blocks and connections', () => {
      const result = screenReducer(undefined, { type: '@@INIT' });

      expect(result.wireframe.blocks).toEqual([]);
      expect(result.wireframe.connections).toEqual([]);
    });
  });

  describe('UI Actions - setFocusedScreenId', () => {
    it('should set focused screen ID', () => {
      const result = screenReducer(initialState, setFocusedScreenId('screen-1'));

      expect(result.focusedScreenId).toBe('screen-1');
    });

    it('should update focused screen ID', () => {
      const state = {
        ...initialState,
        focusedScreenId: 'screen-1',
      };

      const result = screenReducer(state, setFocusedScreenId('screen-2'));

      expect(result.focusedScreenId).toBe('screen-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        focusedScreenId: 'screen-1',
      };

      const result = screenReducer(state, setFocusedScreenId(null));

      expect(result.focusedScreenId).toBeNull();
    });
  });

  describe('UI Actions - setHoveredScreenId', () => {
    it('should set hovered screen ID', () => {
      const result = screenReducer(initialState, setHoveredScreenId('screen-1'));

      expect(result.hoveredScreenId).toBe('screen-1');
    });

    it('should update hovered screen ID', () => {
      const state = {
        ...initialState,
        hoveredScreenId: 'screen-1',
      };

      const result = screenReducer(state, setHoveredScreenId('screen-2'));

      expect(result.hoveredScreenId).toBe('screen-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        hoveredScreenId: 'screen-1',
      };

      const result = screenReducer(state, setHoveredScreenId(null));

      expect(result.hoveredScreenId).toBeNull();
    });
  });

  describe('UI Actions - setSelectedScreenId', () => {
    it('should set selected screen ID', () => {
      const result = screenReducer(initialState, setSelectedScreenId('screen-1'));

      expect(result.selectedScreenId).toBe('screen-1');
    });

    it('should update selected screen ID', () => {
      const state = {
        ...initialState,
        selectedScreenId: 'screen-1',
      };

      const result = screenReducer(state, setSelectedScreenId('screen-2'));

      expect(result.selectedScreenId).toBe('screen-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        selectedScreenId: 'screen-1',
      };

      const result = screenReducer(state, setSelectedScreenId(null));

      expect(result.selectedScreenId).toBeNull();
    });
  });

  describe('Data Actions - setScreens', () => {
    it('should set single screen', () => {
      const screens = [
        { id: 'screen-1', name: 'Home', kind: ENTITY_KINDS.SCREEN },
      ];

      const result = screenReducer(initialState, setScreens(screens));

      expect(result.ids).toEqual(['screen-1']);
      expect(result.entities['screen-1']).toEqual(screens[0]);
    });

    it('should set multiple screens', () => {
      const screens = [
        { id: 'screen-1', name: 'Home' },
        { id: 'screen-2', name: 'About' },
        { id: 'screen-3', name: 'Contact' },
      ];

      const result = screenReducer(initialState, setScreens(screens));

      expect(result.ids).toEqual(['screen-1', 'screen-2', 'screen-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.entities['screen-1'].name).toBe('Home');
      expect(result.entities['screen-2'].name).toBe('About');
      expect(result.entities['screen-3'].name).toBe('Contact');
    });

    it('should replace existing screens', () => {
      const state = {
        ...initialState,
        ids: ['old-1'],
        entities: { 'old-1': { id: 'old-1', name: 'Old' } },
      };

      const screens = [
        { id: 'screen-1', name: 'New' },
      ];

      const result = screenReducer(state, setScreens(screens));

      expect(result.ids).toEqual(['screen-1']);
      expect(result.entities['old-1']).toBeUndefined();
      expect(result.entities['screen-1']).toEqual(screens[0]);
    });

    it('should handle empty screens array', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: { 'screen-1': { id: 'screen-1', name: 'Screen' } },
      };

      const result = screenReducer(state, setScreens([]));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should handle payload with screens property', () => {
      const payload = {
        screens: [
          { id: 'screen-1', name: 'Home' },
        ],
      };

      const result = screenReducer(initialState, setScreens(payload));

      expect(result.ids).toEqual(['screen-1']);
      expect(result.entities['screen-1'].name).toBe('Home');
    });

    it('should preserve all screen properties', () => {
      const screens = [
        {
          id: 'screen-1',
          name: 'Home',
          kind: ENTITY_KINDS.SCREEN,
          preview: 'preview.png',
          doc: 'Documentation',
          metadata: { created: '2024-01-01' },
        },
      ];

      const result = screenReducer(initialState, setScreens(screens));

      expect(result.entities['screen-1']).toEqual(screens[0]);
      expect(result.entities['screen-1'].preview).toBe('preview.png');
      expect(result.entities['screen-1'].doc).toBe('Documentation');
      expect(result.entities['screen-1'].metadata).toEqual({ created: '2024-01-01' });
    });
  });

  describe('Data Actions - addScreen', () => {
    it('should add screen with default values', () => {
      const result = screenReducer(initialState, addScreen({}));

      expect(result.ids).toHaveLength(1);
      const screenId = result.ids[0];
      expect(result.entities[screenId]).toEqual({
        id: screenId,
        name: 'New Screen',
        kind: ENTITY_KINDS.SCREEN,
        preview: '',
        doc: '',
      });
    });

    it('should add screen with custom name', () => {
      const result = screenReducer(initialState, addScreen({ name: 'Dashboard' }));

      const screenId = result.ids[0];
      expect(result.entities[screenId].name).toBe('Dashboard');
    });

    it('should add screen with custom ID', () => {
      const result = screenReducer(initialState, addScreen({ id: 'custom-id', name: 'Home' }));

      expect(result.ids).toEqual(['custom-id']);
      expect(result.entities['custom-id'].name).toBe('Home');
    });

    it('should add screen with preview and doc', () => {
      const result = screenReducer(initialState, addScreen({
        name: 'Home',
        preview: 'home.png',
        doc: 'Home screen documentation',
      }));

      const screenId = result.ids[0];
      expect(result.entities[screenId].preview).toBe('home.png');
      expect(result.entities[screenId].doc).toBe('Home screen documentation');
    });

    it('should add screen with additional properties', () => {
      const result = screenReducer(initialState, addScreen({
        name: 'Home',
        route: '/home',
        metadata: { created: '2024-01-01' },
      }));

      const screenId = result.ids[0];
      expect(result.entities[screenId].route).toBe('/home');
      expect(result.entities[screenId].metadata).toEqual({ created: '2024-01-01' });
    });

    it('should add screen to existing screens', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home' },
        },
      };

      const result = screenReducer(state, addScreen({ name: 'About' }));

      expect(result.ids).toHaveLength(2);
      expect(result.ids[0]).toBe('screen-1');
      expect(result.entities['screen-1'].name).toBe('Home');
    });

    it('should generate UUID for screen ID when not provided', () => {
      const result = screenReducer(initialState, addScreen({ name: 'Test' }));

      expect(result.ids[0]).toBe('mock-uuid-1234');
      expect(result.entities['mock-uuid-1234']).toBeDefined();
    });

    it('should set SCREEN kind automatically', () => {
      const result = screenReducer(initialState, addScreen({ name: 'Test' }));

      const screenId = result.ids[0];
      expect(result.entities[screenId].kind).toBe(ENTITY_KINDS.SCREEN);
    });
  });

  describe('Data Actions - updateScreen', () => {
    it('should update screen name', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home', kind: ENTITY_KINDS.SCREEN },
        },
      };

      const result = screenReducer(state, updateScreen({
        id: 'screen-1',
        name: 'Updated Home',
      }));

      expect(result.entities['screen-1'].name).toBe('Updated Home');
    });

    it('should update multiple properties', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home', preview: '', doc: '' },
        },
      };

      const result = screenReducer(state, updateScreen({
        id: 'screen-1',
        name: 'New Home',
        preview: 'home.png',
        doc: 'Updated documentation',
      }));

      expect(result.entities['screen-1'].name).toBe('New Home');
      expect(result.entities['screen-1'].preview).toBe('home.png');
      expect(result.entities['screen-1'].doc).toBe('Updated documentation');
    });

    it('should handle non-existent screen gracefully', () => {
      const result = screenReducer(initialState, updateScreen({
        id: 'screen-1',
        name: 'Updated',
      }));

      expect(result.entities['screen-1']).toBeUndefined();
    });

    it('should preserve other properties when updating', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': {
            id: 'screen-1',
            name: 'Home',
            kind: ENTITY_KINDS.SCREEN,
            route: '/home',
            metadata: { created: '2024-01-01' },
          },
        },
      };

      const result = screenReducer(state, updateScreen({
        id: 'screen-1',
        name: 'Updated Home',
      }));

      expect(result.entities['screen-1'].kind).toBe(ENTITY_KINDS.SCREEN);
      expect(result.entities['screen-1'].route).toBe('/home');
      expect(result.entities['screen-1'].metadata).toEqual({ created: '2024-01-01' });
    });

    it('should merge changes with existing screen', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home', preview: 'old.png' },
        },
      };

      const result = screenReducer(state, updateScreen({
        id: 'screen-1',
        preview: 'new.png',
        doc: 'New doc',
      }));

      expect(result.entities['screen-1'].name).toBe('Home');
      expect(result.entities['screen-1'].preview).toBe('new.png');
      expect(result.entities['screen-1'].doc).toBe('New doc');
    });
  });

  describe('Data Actions - removeScreen', () => {
    it('should remove screen from state', () => {
      const state = {
        ...initialState,
        ids: ['screen-1', 'screen-2'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home' },
          'screen-2': { id: 'screen-2', name: 'About' },
        },
      };

      const result = screenReducer(state, removeScreen('screen-1'));

      expect(result.ids).toEqual(['screen-2']);
      expect(result.entities['screen-1']).toBeUndefined();
      expect(result.entities['screen-2']).toBeDefined();
    });

    it('should remove last screen', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home' },
        },
      };

      const result = screenReducer(state, removeScreen('screen-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should handle non-existent screen gracefully', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home' },
        },
      };

      const result = screenReducer(state, removeScreen('screen-2'));

      expect(result.ids).toEqual(['screen-1']);
      expect(result.entities['screen-1']).toBeDefined();
    });

    it('should remove screen from middle of list', () => {
      const state = {
        ...initialState,
        ids: ['screen-1', 'screen-2', 'screen-3'],
        entities: {
          'screen-1': { id: 'screen-1', name: 'Home' },
          'screen-2': { id: 'screen-2', name: 'About' },
          'screen-3': { id: 'screen-3', name: 'Contact' },
        },
      };

      const result = screenReducer(state, removeScreen('screen-2'));

      expect(result.ids).toEqual(['screen-1', 'screen-3']);
      expect(result.entities['screen-2']).toBeUndefined();
    });
  });

  describe('Combined Actions', () => {
    it('should handle add, select, and remove workflow', () => {
      let state = initialState;

      state = screenReducer(state, addScreen({ name: 'Home' }));
      const screenId = state.ids[0];

      state = screenReducer(state, setSelectedScreenId(screenId));
      expect(state.selectedScreenId).toBe(screenId);

      state = screenReducer(state, removeScreen(screenId));
      expect(state.ids).toEqual([]);
      // Note: selectedScreenId is NOT automatically cleared on remove
      expect(state.selectedScreenId).toBe(screenId);
    });

    it('should handle add, update, and select workflow', () => {
      let state = initialState;

      state = screenReducer(state, addScreen({ name: 'Home' }));
      const screenId = state.ids[0];

      state = screenReducer(state, updateScreen({ id: screenId, name: 'Updated Home' }));
      state = screenReducer(state, setSelectedScreenId(screenId));

      expect(state.entities[screenId].name).toBe('Updated Home');
      expect(state.selectedScreenId).toBe(screenId);
    });

    it('should handle setScreens and select workflow', () => {
      let state = initialState;

      const screens = [
        { id: 'screen-1', name: 'Home' },
        { id: 'screen-2', name: 'About' },
      ];

      state = screenReducer(state, setScreens(screens));
      state = screenReducer(state, setSelectedScreenId('screen-1'));
      state = screenReducer(state, setHoveredScreenId('screen-2'));

      expect(state.ids).toHaveLength(2);
      expect(state.selectedScreenId).toBe('screen-1');
      expect(state.hoveredScreenId).toBe('screen-2');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when adding screen', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: { 'screen-1': { id: 'screen-1', name: 'Home' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      screenReducer(state, addScreen({ name: 'About' }));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when updating screen', () => {
      const state = {
        ...initialState,
        ids: ['screen-1'],
        entities: { 'screen-1': { id: 'screen-1', name: 'Home' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      screenReducer(state, updateScreen({ id: 'screen-1', name: 'Updated' }));

      expect(state).toEqual(originalState);
    });
  });
});

