import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setUserspaces,
  setHoveredUserspaceId,
  setFocusedUserspaceId,
  setSelectedUserspaceId,
  addUserspace,
  updateUserspace,
  removeUserspace,
} from './slice';

describe('userspace Entity Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredUserspaceId: null,
        focusedUserspaceId: null,
        selectedUserspaceId: null,
      },
    };
  });

  describe('setUserspaces', () => {
    it('should set userspaces with normalized data', () => {
      const userspaces = [
        { id: 'space-1', name: 'My Workspace', ownerId: 'user-1' },
        { id: 'space-2', name: 'Team Workspace', ownerId: 'user-2' },
      ];

      const state = reducer(initialState, setUserspaces(userspaces));

      expect(state.ids).toEqual(['space-1', 'space-2']);
      expect(state.entities['space-1']).toEqual(userspaces[0]);
      expect(state.entities['space-2']).toEqual(userspaces[1]);
    });

    it('should handle empty userspaces array', () => {
      const state = reducer(initialState, setUserspaces([]));

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should replace existing userspaces', () => {
      const existingState = {
        ...initialState,
        ids: ['old-space'],
        entities: { 'old-space': { id: 'old-space', name: 'Old Space' } },
      };

      const newSpaces = [{ id: 'new-space', name: 'New Space' }];
      const state = reducer(existingState, setUserspaces(newSpaces));

      expect(state.ids).toEqual(['new-space']);
      expect(state.entities['old-space']).toBeUndefined();
      expect(state.entities['new-space']).toBeDefined();
    });
  });

  describe('addUserspace', () => {
    it('should be defined but not implemented yet', () => {
      // Note: This action exists but is not implemented (empty function)
      const state = reducer(initialState, addUserspace({ id: 'space-1', name: 'Space' }));

      // State should remain unchanged since the action is empty
      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });
  });

  describe('removeUserspace', () => {
    it('should be defined but not implemented yet', () => {
      const stateWithSpace = {
        ...initialState,
        ids: ['space-1'],
        entities: { 'space-1': { id: 'space-1', name: 'Space' } },
      };

      const state = reducer(stateWithSpace, removeUserspace('space-1'));

      // State should remain unchanged since the action is empty
      expect(state.ids).toContain('space-1');
      expect(state.entities['space-1']).toBeDefined();
    });
  });

  describe('UI state actions', () => {
    it('should set hovered userspace id', () => {
      const state = reducer(initialState, setHoveredUserspaceId('space-1'));
      expect(state.ui.hoveredUserspaceId).toBe('space-1');
    });

    it('should set focused userspace id', () => {
      const state = reducer(initialState, setFocusedUserspaceId('space-2'));
      expect(state.ui.focusedUserspaceId).toBe('space-2');
    });

    it('should set selected userspace id', () => {
      const state = reducer(initialState, setSelectedUserspaceId('space-3'));
      expect(state.ui.selectedUserspaceId).toBe('space-3');
    });

    it('should clear hovered userspace id with null', () => {
      const hoveredState = {
        ...initialState,
        ui: { ...initialState.ui, hoveredUserspaceId: 'space-1' },
      };

      const state = reducer(hoveredState, setHoveredUserspaceId(null));
      expect(state.ui.hoveredUserspaceId).toBeNull();
    });

    it('should clear focused userspace id with null', () => {
      const focusedState = {
        ...initialState,
        ui: { ...initialState.ui, focusedUserspaceId: 'space-1' },
      };

      const state = reducer(focusedState, setFocusedUserspaceId(null));
      expect(state.ui.focusedUserspaceId).toBeNull();
    });

    it('should clear selected userspace id with null', () => {
      const selectedState = {
        ...initialState,
        ui: { ...initialState.ui, selectedUserspaceId: 'space-1' },
      };

      const state = reducer(selectedState, setSelectedUserspaceId(null));
      expect(state.ui.selectedUserspaceId).toBeNull();
    });

    it('should update all UI states independently', () => {
      let state = initialState;

      state = reducer(state, setHoveredUserspaceId('space-1'));
      state = reducer(state, setFocusedUserspaceId('space-2'));
      state = reducer(state, setSelectedUserspaceId('space-3'));

      expect(state.ui.hoveredUserspaceId).toBe('space-1');
      expect(state.ui.focusedUserspaceId).toBe('space-2');
      expect(state.ui.selectedUserspaceId).toBe('space-3');
    });
  });

  describe('updateUserspace', () => {
    it('should be defined but not implemented yet', () => {
      const stateWithSpace = {
        ...initialState,
        ids: ['space-1'],
        entities: {
          'space-1': { id: 'space-1', name: 'Old Name' },
        },
      };

      const state = reducer(stateWithSpace, updateUserspace({
        id: 'space-1',
        changes: { name: 'New Name' },
      }));

      // State should remain unchanged since the action is empty
      expect(state.entities['space-1'].name).toBe('Old Name');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined state gracefully', () => {
      const state = reducer(undefined, { type: 'unknown' });
      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
    });

    it('should not mutate original state', () => {
      const original = { ...initialState };
      reducer(initialState, setSelectedUserspaceId('space-1'));

      expect(initialState).toEqual(original);
    });

    it('should handle rapid state changes', () => {
      let state = initialState;

      state = reducer(state, setUserspaces([
        { id: 's1', name: 'S1' },
        { id: 's2', name: 'S2' },
      ]));

      state = reducer(state, setSelectedUserspaceId('s1'));

      expect(state.ids).toEqual(['s1', 's2']);
      expect(state.ui.selectedUserspaceId).toBe('s1');
    });

    it('should handle userspace with complex structure via setUserspaces', () => {
      const complexSpace = {
        id: 'space-1',
        name: 'Enterprise Workspace',
        ownerId: 'user-1',
        members: ['user-1', 'user-2', 'user-3'],
        settings: { theme: 'dark', notifications: true },
        projects: ['proj-1', 'proj-2'],
      };

      const state = reducer(initialState, setUserspaces([complexSpace]));

      expect(state.entities['space-1']).toEqual(complexSpace);
      expect(state.entities['space-1'].members).toHaveLength(3);
      expect(state.entities['space-1'].projects).toHaveLength(2);
    });

    it('should handle multiple userspaces with setUserspaces', () => {
      const spaces = [
        { id: 's1', name: 'Space1', ownerId: 'user-1' },
        { id: 's2', name: 'Space2', ownerId: 'user-2' },
        { id: 's3', name: 'Space3', ownerId: 'user-1' },
      ];

      const state = reducer(initialState, setUserspaces(spaces));

      expect(state.ids).toHaveLength(3);
      expect(Object.keys(state.entities)).toHaveLength(3);
    });

    it('should preserve UI state when updating data', () => {
      let state = initialState;

      state = reducer(state, setSelectedUserspaceId('s1'));
      state = reducer(state, setHoveredUserspaceId('s2'));

      state = reducer(state, setUserspaces([
        { id: 's1', name: 'Space1' },
        { id: 's2', name: 'Space2' },
      ]));

      // UI state should be preserved
      expect(state.ui.selectedUserspaceId).toBe('s1');
      expect(state.ui.hoveredUserspaceId).toBe('s2');
    });

    it('should handle empty state initialization', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ui.hoveredUserspaceId).toBeNull();
      expect(state.ui.focusedUserspaceId).toBeNull();
      expect(state.ui.selectedUserspaceId).toBeNull();
    });

    it('should allow same userspace to have multiple UI states', () => {
      let state = initialState;

      state = reducer(state, setUserspaces([{ id: 'space-1', name: 'Space' }]));
      state = reducer(state, setHoveredUserspaceId('space-1'));
      state = reducer(state, setFocusedUserspaceId('space-1'));
      state = reducer(state, setSelectedUserspaceId('space-1'));

      expect(state.ui.hoveredUserspaceId).toBe('space-1');
      expect(state.ui.focusedUserspaceId).toBe('space-1');
      expect(state.ui.selectedUserspaceId).toBe('space-1');
    });
  });
});

