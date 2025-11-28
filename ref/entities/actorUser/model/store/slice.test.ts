// ===================================================================
// Unit Tests for ActorUser Slice
// CRITICAL BUSINESS LOGIC - User Actor State Management
// Phase 1, Day 9 - Part 1 (30 tests) - FINAL PUSH TO 60%!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { UserState } from '../../types';

// Mock the adapter
vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    createEntityAdapter: () => ({
      getInitialState: () => ({ ids: [], entities: {} }),
      addOne: (state: any, entity: any) => {
        state.entities[entity.id] = entity;
        if (!state.ids.includes(entity.id)) {
          state.ids.push(entity.id);
        }
      },
      updateOne: (state: any, update: any) => {
        if (state.entities[update.id]) {
          state.entities[update.id] = { ...state.entities[update.id], ...update.changes };
        }
      },
      removeOne: (state: any, id: any) => {
        delete state.entities[id];
        state.ids = state.ids.filter((existingId: any) => existingId !== id);
      },
      setAll: (state: any, entities: any[]) => {
        state.ids = entities.map((e) => e.id);
        state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
      },
    }),
  };
});

import userEntitySlice, {
  setUsers,
  setHoveredUserId,
  setFocusedUserId,
  setSelectedUserId,
  resetSelectedUser,
  addUser,
  updateUser,
  removeUser,
} from './slice';

describe('ActorUser Slice', () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered user ID', () => {
      const state = userEntitySlice(initialState, setHoveredUserId({ id: 'user-1' } as any));
      expect(state.hoveredId).toBe('user-1');
    });

    it('should set focused user ID', () => {
      const state = userEntitySlice(initialState, setFocusedUserId({ id: 'user-2' } as any));
      expect(state.focusedId).toBe('user-2');
    });

    it('should set selected user ID', () => {
      const state = userEntitySlice(initialState, setSelectedUserId({ id: 'user-3' } as any));
      expect(state.selectedId).toBe('user-3');
    });

    it('should reset selected user', () => {
      initialState.selectedId = 'user-1';
      const state = userEntitySlice(initialState, resetSelectedUser());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Users (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set Users (Bulk Load)', () => {
    it('should set users (replace all)', () => {
      const users = [
        { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
        { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
      ];

      const state = userEntitySlice(initialState, setUsers(users));

      expect(state.ids).toEqual(['user-1', 'user-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing users when setting new ones', () => {
      initialState.entities['user-old'] = { id: 'user-old', name: 'Old User' } as any;
      initialState.ids.push('user-old');

      const users = [{ id: 'user-new', name: 'New User' }];
      const state = userEntitySlice(initialState, setUsers(users));

      expect(state.entities['user-old']).toBeUndefined();
      expect(state.entities['user-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['user-1'] = { id: 'user-1', name: 'User' } as any;
      initialState.ids.push('user-1');

      const state = userEntitySlice(initialState, setUsers([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting users', () => {
      initialState.selectedId = 'user-selected';

      const users = [{ id: 'user-1', name: 'User' }];
      const state = userEntitySlice(initialState, setUsers(users));

      expect(state.selectedId).toBe('user-selected');
    });

    it('should handle large number of users', () => {
      const users = Array.from({ length: 100 }, (_, i) => ({
        id: `user-${i}`,
        name: `User ${i}`,
        email: `user${i}@example.com`,
      }));

      const state = userEntitySlice(initialState, setUsers(users));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });

    it('should set users with various properties', () => {
      const users = [
        {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          avatar: 'avatar.jpg',
        },
      ];

      const state = userEntitySlice(initialState, setUsers(users));

      expect(state.entities['user-1']).toEqual(users[0]);
    });
  });

  // ===================================================================
  // PART 3: Add User (7 tests)
  // ===================================================================

  describe('Add User', () => {
    it('should add user', () => {
      const user = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      const state = userEntitySlice(initialState, addUser(user));

      expect(state.ids).toContain('user-1');
      expect(state.entities['user-1']).toEqual(user);
    });

    it('should not add duplicate user', () => {
      initialState.entities['user-1'] = { id: 'user-1', name: 'Existing' } as any;
      initialState.ids.push('user-1');

      const user = { id: 'user-1', name: 'Duplicate' };
      const state = userEntitySlice(initialState, addUser(user));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing users when adding new one', () => {
      initialState.entities['user-existing'] = {
        id: 'user-existing',
        name: 'Existing User',
      } as any;
      initialState.ids.push('user-existing');

      const user = { id: 'user-new', name: 'New User' };
      const state = userEntitySlice(initialState, addUser(user));

      expect(state.entities['user-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding user', () => {
      initialState.selectedId = 'user-selected';

      const user = { id: 'user-1', name: 'User' };
      const state = userEntitySlice(initialState, addUser(user));

      expect(state.selectedId).toBe('user-selected');
    });

    it('should add user with minimal properties', () => {
      const user = { id: 'user-1' };
      const state = userEntitySlice(initialState, addUser(user as any));

      expect(state.entities['user-1']).toEqual(user);
    });

    it('should add user with full properties', () => {
      const user = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'developer',
        avatar: 'avatar.jpg',
        createdAt: '2025-01-01',
      };

      const state = userEntitySlice(initialState, addUser(user as any));

      expect(state.entities['user-1']).toEqual(user);
    });

    it('should maintain insertion order', () => {
      let state = userEntitySlice(initialState, addUser({ id: 'user-3', name: 'Third' } as any));
      state = userEntitySlice(state, addUser({ id: 'user-1', name: 'First' } as any));
      state = userEntitySlice(state, addUser({ id: 'user-2', name: 'Second' } as any));

      expect(state.ids).toEqual(['user-3', 'user-1', 'user-2']);
    });
  });

  // ===================================================================
  // PART 4: Update User (7 tests)
  // ===================================================================

  describe('Update User', () => {
    beforeEach(() => {
      initialState.entities['user-1'] = {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
      } as any;
      initialState.ids.push('user-1');
    });

    it('should update user properties', () => {
      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'Jane Doe',
          email: 'john@example.com',
          role: 'admin',
        } as any),
      );

      expect(state.entities['user-1'].name).toBe('Jane Doe');
      expect(state.entities['user-1'].role).toBe('admin');
    });

    it('should handle updating non-existent user', () => {
      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'non-existent',
          name: 'Ghost',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update single property', () => {
      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'Updated Name',
          email: 'john@example.com',
          role: 'user',
        } as any),
      );

      expect(state.entities['user-1'].name).toBe('Updated Name');
    });

    it('should update multiple properties', () => {
      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'New Name',
          email: 'new@example.com',
          role: 'admin',
        } as any),
      );

      expect(state.entities['user-1'].name).toBe('New Name');
      expect(state.entities['user-1'].email).toBe('new@example.com');
      expect(state.entities['user-1'].role).toBe('admin');
    });

    it('should not affect other users when updating one', () => {
      initialState.entities['user-2'] = {
        id: 'user-2',
        name: 'Other User',
      } as any;
      initialState.ids.push('user-2');

      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'Updated',
          email: 'john@example.com',
          role: 'user',
        } as any),
      );

      expect(state.entities['user-2']).toEqual({
        id: 'user-2',
        name: 'Other User',
      });
    });

    it('should not affect UI state when updating user', () => {
      initialState.selectedId = 'user-1';

      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'Updated',
          email: 'john@example.com',
          role: 'user',
        } as any),
      );

      expect(state.selectedId).toBe('user-1');
    });

    it('should handle minimal update', () => {
      const state = userEntitySlice(
        initialState,
        updateUser({
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
        } as any),
      );

      expect(state.entities['user-1']).toBeDefined();
    });
  });

  // ===================================================================
  // PART 5: Remove User (3 tests)
  // ===================================================================

  describe('Remove User', () => {
    beforeEach(() => {
      initialState.entities = {
        'user-1': { id: 'user-1', name: 'User 1' } as any,
        'user-2': { id: 'user-2', name: 'User 2' } as any,
      };
      initialState.ids = ['user-1', 'user-2'];
    });

    it('should remove user', () => {
      const state = userEntitySlice(initialState, removeUser('user-1'));

      expect(state.ids).not.toContain('user-1');
      expect(state.entities['user-1']).toBeUndefined();
      expect(state.entities['user-2']).toBeDefined();
    });

    it('should handle removing non-existent user', () => {
      const state = userEntitySlice(initialState, removeUser('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other users', () => {
      const state = userEntitySlice(initialState, removeUser('user-1'));

      expect(state.ids).toContain('user-2');
      expect(state.entities['user-2']).toEqual({
        id: 'user-2',
        name: 'User 2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete user lifecycle', () => {
      let state = userEntitySlice(
        initialState,
        addUser({
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
        } as any),
      );
      state = userEntitySlice(
        state,
        updateUser({
          id: 'user-1',
          name: 'Jane Doe',
          email: 'john@example.com',
          role: 'admin',
        } as any),
      );
      state = userEntitySlice(state, setSelectedUserId({ id: 'user-1' } as any));
      state = userEntitySlice(state, removeUser('user-1'));

      expect(state.ids).not.toContain('user-1');
      expect(state.selectedId).toBe('user-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const users = [
        { id: 'user-1', name: 'User 1' },
        { id: 'user-2', name: 'User 2' },
      ];

      let state = userEntitySlice(initialState, setUsers(users));
      state = userEntitySlice(state, addUser({ id: 'user-3', name: 'User 3' } as any));
      state = userEntitySlice(
        state,
        updateUser({
          id: 'user-1',
          name: 'Updated User 1',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['user-1'].name).toBe('Updated User 1');
      expect(state.entities['user-3']).toBeDefined();
    });

    it('should handle UI state changes with user operations', () => {
      let state = userEntitySlice(
        initialState,
        addUser({ id: 'user-1', name: 'User' } as any),
      );
      state = userEntitySlice(state, setHoveredUserId({ id: 'user-1' } as any));
      state = userEntitySlice(state, setFocusedUserId({ id: 'user-1' } as any));
      state = userEntitySlice(state, setSelectedUserId({ id: 'user-1' } as any));
      state = userEntitySlice(
        state,
        updateUser({
          id: 'user-1',
          name: 'Updated',
        } as any),
      );

      expect(state.hoveredId).toBe('user-1');
      expect(state.focusedId).toBe('user-1');
      expect(state.selectedId).toBe('user-1');
      expect(state.entities['user-1'].name).toBe('Updated');
    });
  });
});

