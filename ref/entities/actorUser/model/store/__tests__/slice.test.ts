// ===================================================================
// Unit Tests for actorUser Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setUsers,
  setHoveredUserId,
  setFocusedUserId,
  setSelectedUserId,
  resetSelectedUser,
  addUser,
  updateUser,
  removeUser,
} from '../slice';

describe('actorUser Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredId).toBeNull();
      expect(state.focusedId).toBeNull();
      expect(state.selectedId).toBe('id-user-1'); // Default current user
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredUserId', () => {
      it('should set hovered user ID', () => {
        const state = reducer(initialState, setHoveredUserId({ id: 'user-1' }));

        expect(state.hoveredId).toBe('user-1');
      });

      it('should update hovered user ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'user-1',
        };

        const state = reducer(stateWithHover, setHoveredUserId({ id: 'user-2' }));

        expect(state.hoveredId).toBe('user-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'user-1',
        };

        const state = reducer(stateWithHover, setHoveredUserId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedUserId', () => {
      it('should set focused user ID', () => {
        const state = reducer(initialState, setFocusedUserId({ id: 'user-1' }));

        expect(state.focusedId).toBe('user-1');
      });

      it('should update focused user ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'user-1',
        };

        const state = reducer(stateWithFocus, setFocusedUserId({ id: 'user-2' }));

        expect(state.focusedId).toBe('user-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'user-1',
        };

        const state = reducer(stateWithFocus, setFocusedUserId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedUserId', () => {
      it('should set selected user ID', () => {
        const state = reducer(initialState, setSelectedUserId({ id: 'user-1' }));

        expect(state.selectedId).toBe('user-1');
      });

      it('should update selected user ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'user-1',
        };

        const state = reducer(stateWithSelection, setSelectedUserId({ id: 'user-2' }));

        expect(state.selectedId).toBe('user-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'user-1',
        };

        const state = reducer(stateWithSelection, setSelectedUserId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedUser', () => {
      it('should reset selected user to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'user-1',
        };

        const state = reducer(stateWithSelection, resetSelectedUser());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'user-1',
          focusedId: 'user-2',
          selectedId: 'user-3',
        };

        const state = reducer(stateWithUI, resetSelectedUser());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('user-1');
        expect(state.focusedId).toBe('user-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setUsers', () => {
      it('should set users from array', () => {
        const users = [
          { id: 'u1', name: 'John Doe', email: 'john@example.com' },
          { id: 'u2', name: 'Jane Smith', email: 'jane@example.com' },
        ];

        const state = reducer(initialState, setUsers(users));

        expect(state.ids).toEqual(['u1', 'u2']);
        expect(state.entities.u1).toEqual(users[0]);
        expect(state.entities.u2).toEqual(users[1]);
      });

      it('should replace existing users', () => {
        const stateWithUsers = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', name: 'Old' } },
        };

        const newUsers = [
          { id: 'new1', name: 'New 1' },
          { id: 'new2', name: 'New 2' },
        ];

        const state = reducer(stateWithUsers, setUsers(newUsers));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newUsers[0]);
      });

      it('should handle empty array', () => {
        const stateWithUsers = {
          ...initialState,
          ids: ['u1'],
          entities: { u1: { id: 'u1', name: 'User' } },
        };

        const state = reducer(stateWithUsers, setUsers([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting users', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const users = [{ id: 'u1', name: 'User' }];

        const state = reducer(stateWithUI, setUsers(users));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addUser', () => {
      it('should add new user', () => {
        const user = { id: 'u1', name: 'John Doe', email: 'john@example.com' };

        const state = reducer(initialState, addUser(user));

        expect(state.ids).toContain('u1');
        expect(state.entities.u1).toEqual(user);
      });

      it('should add multiple users', () => {
        let state = initialState;

        state = reducer(state, addUser({ id: 'u1', name: 'User 1' }));
        state = reducer(state, addUser({ id: 'u2', name: 'User 2' }));

        expect(state.ids).toEqual(['u1', 'u2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate user if ID already exists', () => {
        const stateWithUser = {
          ...initialState,
          ids: ['u1'],
          entities: { u1: { id: 'u1', name: 'Original' } },
        };

        const state = reducer(stateWithUser, addUser({ id: 'u1', name: 'Updated' }));

        expect(state.ids.filter((id: string) => id === 'u1')).toHaveLength(1);
      });
    });

    describe('updateUser', () => {
      it('should update existing user', () => {
        const stateWithUser = {
          ...initialState,
          ids: ['u1'],
          entities: {
            u1: { id: 'u1', name: 'Old Name', email: 'old@example.com' },
          },
        };

        const state = reducer(
          stateWithUser,
          updateUser({ id: 'u1', name: 'New Name', email: 'new@example.com' }),
        );

        expect(state.entities.u1.name).toBe('New Name');
        expect(state.entities.u1.email).toBe('new@example.com');
      });

      it('should not update non-existent user', () => {
        const state = reducer(
          initialState,
          updateUser({ id: 'non-existent', name: 'Test' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithUser = {
          ...initialState,
          ids: ['u1'],
          entities: {
            u1: { id: 'u1', name: 'Name', email: 'email@test.com', role: 'admin' },
          },
        };

        const state = reducer(
          stateWithUser,
          updateUser({ id: 'u1', name: 'New Name' }),
        );

        expect(state.entities.u1.name).toBe('New Name');
        expect(state.entities.u1.email).toBe('email@test.com');
        expect(state.entities.u1.role).toBe('admin');
      });
    });

    describe('removeUser', () => {
      it('should remove user from entities and ids', () => {
        const stateWithUsers = {
          ...initialState,
          ids: ['u1', 'u2'],
          entities: {
            u1: { id: 'u1', name: 'User 1' },
            u2: { id: 'u2', name: 'User 2' },
          },
        };

        const state = reducer(stateWithUsers, removeUser('u1'));

        expect(state.ids).toEqual(['u2']);
        expect(state.entities.u1).toBeUndefined();
        expect(state.entities.u2).toBeDefined();
      });

      it('should handle removing non-existent user', () => {
        const state = reducer(initialState, removeUser('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other users', () => {
        const stateWithUsers = {
          ...initialState,
          ids: ['u1', 'u2', 'u3'],
          entities: {
            u1: { id: 'u1' },
            u2: { id: 'u2' },
            u3: { id: 'u3' },
          },
        };

        const state = reducer(stateWithUsers, removeUser('u2'));

        expect(state.ids).toEqual(['u1', 'u3']);
        expect(state.entities.u1).toBeDefined();
        expect(state.entities.u3).toBeDefined();
      });

      it('should preserve UI state when removing user', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['u1'],
          entities: { u1: { id: 'u1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeUser('u1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full user lifecycle', () => {
      let state = initialState;

      // Add user
      state = reducer(state, addUser({ id: 'u1', name: 'John Doe', role: 'user' }));
      expect(state.ids).toContain('u1');

      // Select user
      state = reducer(state, setSelectedUserId({ id: 'u1' }));
      expect(state.selectedId).toBe('u1');

      // Update user role
      state = reducer(state, updateUser({ id: 'u1', role: 'admin' }));
      expect(state.entities.u1.role).toBe('admin');

      // Remove user
      state = reducer(state, removeUser('u1'));
      expect(state.entities.u1).toBeUndefined();
    });

    it('should handle multiple users with different UI states', () => {
      let state = initialState;

      state = reducer(state, setUsers([
        { id: 'u1', name: 'User 1', role: 'admin' },
        { id: 'u2', name: 'User 2', role: 'user' },
        { id: 'u3', name: 'User 3', role: 'guest' },
      ]));

      state = reducer(state, setSelectedUserId({ id: 'u1' }));
      state = reducer(state, setFocusedUserId({ id: 'u2' }));
      state = reducer(state, setHoveredUserId({ id: 'u3' }));

      expect(state.selectedId).toBe('u1');
      expect(state.focusedId).toBe('u2');
      expect(state.hoveredId).toBe('u3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addUser({ id: 'u1', name: 'User 1' }));
      state = reducer(state, addUser({ id: 'u2', name: 'User 2' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setUsers)
      state = reducer(state, setUsers([
        { id: 'u1', name: 'User 1 Updated' },
        { id: 'u2', name: 'User 2 Updated' },
        { id: 'u3', name: 'User 3' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateUser({ id: 'u1', name: 'User 1 Final' }));
      expect(state.entities.u1.name).toBe('User 1 Final');

      // Delete
      state = reducer(state, removeUser('u2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.u2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const users = [
        { id: 'u1', name: 'User 1' },
        { id: 'u2', name: 'User 2' },
      ];

      const state = reducer(initialState, setUsers(users));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const user = {
        id: 'u1',
        name: 'John Doe',
        profile: { avatar: 'url', bio: 'Developer' },
      };

      const state = reducer(initialState, addUser(user));

      expect(state.entities.u1).toEqual(user);
      expect(state.entities.u1.profile).toEqual({ avatar: 'url', bio: 'Developer' });
    });

    it('should handle users with complex data', () => {
      const user = {
        id: 'u1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        profile: {
          avatar: 'https://example.com/avatar.jpg',
          bio: 'Full-stack developer',
          social: {
            twitter: '@johndoe',
            github: 'johndoe',
          },
        },
        settings: {
          theme: 'dark',
          notifications: true,
          language: 'en',
        },
        metadata: {
          created: '2024-01-01T00:00:00Z',
          lastLogin: '2024-01-15T12:00:00Z',
        },
      };

      const state = reducer(initialState, addUser(user));

      expect(state.entities.u1).toEqual(user);
    });
  });
});

