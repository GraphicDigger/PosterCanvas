// ===================================================================
// Unit Tests for projectMember Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setProjectMembers,
  setHoveredProjectMemberId,
  setFocusedProjectMemberId,
  setSelectedProjectMemberId,
  resetSelectedProjectMember,
  addProjectMember,
  updateProjectMember,
  removeProjectMember,
} from '../slice';

describe('projectMember Redux Slice', () => {
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
      expect(state.selectedId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredProjectMemberId', () => {
      it('should set hovered project member ID', () => {
        const state = reducer(initialState, setHoveredProjectMemberId({ id: 'pm-1' }));

        expect(state.hoveredId).toBe('pm-1');
      });

      it('should update hovered project member ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'pm-1',
        };

        const state = reducer(stateWithHover, setHoveredProjectMemberId({ id: 'pm-2' }));

        expect(state.hoveredId).toBe('pm-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'pm-1',
        };

        const state = reducer(stateWithHover, setHoveredProjectMemberId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedProjectMemberId', () => {
      it('should set focused project member ID', () => {
        const state = reducer(initialState, setFocusedProjectMemberId({ id: 'pm-1' }));

        expect(state.focusedId).toBe('pm-1');
      });

      it('should update focused project member ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'pm-1',
        };

        const state = reducer(stateWithFocus, setFocusedProjectMemberId({ id: 'pm-2' }));

        expect(state.focusedId).toBe('pm-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'pm-1',
        };

        const state = reducer(stateWithFocus, setFocusedProjectMemberId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedProjectMemberId', () => {
      it('should set selected project member ID', () => {
        const state = reducer(initialState, setSelectedProjectMemberId({ id: 'pm-1' }));

        expect(state.selectedId).toBe('pm-1');
      });

      it('should update selected project member ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'pm-1',
        };

        const state = reducer(stateWithSelection, setSelectedProjectMemberId({ id: 'pm-2' }));

        expect(state.selectedId).toBe('pm-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'pm-1',
        };

        const state = reducer(stateWithSelection, setSelectedProjectMemberId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedProjectMember', () => {
      it('should reset selected project member to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'pm-1',
        };

        const state = reducer(stateWithSelection, resetSelectedProjectMember());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'pm-1',
          focusedId: 'pm-2',
          selectedId: 'pm-3',
        };

        const state = reducer(stateWithUI, resetSelectedProjectMember());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('pm-1');
        expect(state.focusedId).toBe('pm-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setProjectMembers', () => {
      it('should set project members from array', () => {
        const members = [
          { id: 'pm1', projectId: 'proj-1', userId: 'user-1', role: 'admin' },
          { id: 'pm2', projectId: 'proj-1', userId: 'user-2', role: 'member' },
        ];

        const state = reducer(initialState, setProjectMembers(members));

        expect(state.ids).toEqual(['pm1', 'pm2']);
        expect(state.entities.pm1).toEqual(members[0]);
        expect(state.entities.pm2).toEqual(members[1]);
      });

      it('should replace existing project members', () => {
        const stateWithMembers = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', role: 'old' } },
        };

        const newMembers = [
          { id: 'new1', role: 'admin' },
          { id: 'new2', role: 'member' },
        ];

        const state = reducer(stateWithMembers, setProjectMembers(newMembers));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newMembers[0]);
      });

      it('should handle empty array', () => {
        const stateWithMembers = {
          ...initialState,
          ids: ['pm1'],
          entities: { pm1: { id: 'pm1', role: 'admin' } },
        };

        const state = reducer(stateWithMembers, setProjectMembers([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting project members', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const members = [{ id: 'pm1', role: 'admin' }];

        const state = reducer(stateWithUI, setProjectMembers(members));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addProjectMember', () => {
      it('should add new project member', () => {
        const member = { id: 'pm1', projectId: 'proj-1', userId: 'user-1', role: 'admin' };

        const state = reducer(initialState, addProjectMember(member));

        expect(state.ids).toContain('pm1');
        expect(state.entities.pm1).toEqual(member);
      });

      it('should add multiple project members', () => {
        let state = initialState;

        state = reducer(state, addProjectMember({ id: 'pm1', role: 'admin' }));
        state = reducer(state, addProjectMember({ id: 'pm2', role: 'member' }));

        expect(state.ids).toEqual(['pm1', 'pm2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate project member if ID already exists', () => {
        const stateWithMember = {
          ...initialState,
          ids: ['pm1'],
          entities: { pm1: { id: 'pm1', role: 'member' } },
        };

        const state = reducer(stateWithMember, addProjectMember({ id: 'pm1', role: 'admin' }));

        expect(state.ids.filter((id: string) => id === 'pm1')).toHaveLength(1);
      });
    });

    describe('updateProjectMember', () => {
      it('should update existing project member', () => {
        const stateWithMember = {
          ...initialState,
          ids: ['pm1'],
          entities: {
            pm1: { id: 'pm1', projectId: 'proj-1', userId: 'user-1', role: 'member' },
          },
        };

        const state = reducer(
          stateWithMember,
          updateProjectMember({ id: 'pm1', role: 'admin' }),
        );

        expect(state.entities.pm1.role).toBe('admin');
        expect(state.entities.pm1.projectId).toBe('proj-1');
      });

      it('should not update non-existent project member', () => {
        const state = reducer(
          initialState,
          updateProjectMember({ id: 'non-existent', role: 'admin' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithMember = {
          ...initialState,
          ids: ['pm1'],
          entities: {
            pm1: { id: 'pm1', projectId: 'proj-1', userId: 'user-1', role: 'member', permissions: ['read'] },
          },
        };

        const state = reducer(
          stateWithMember,
          updateProjectMember({ id: 'pm1', role: 'admin' }),
        );

        expect(state.entities.pm1.role).toBe('admin');
        expect(state.entities.pm1.projectId).toBe('proj-1');
        expect(state.entities.pm1.permissions).toEqual(['read']);
      });
    });

    describe('removeProjectMember', () => {
      it('should remove project member from entities and ids', () => {
        const stateWithMembers = {
          ...initialState,
          ids: ['pm1', 'pm2'],
          entities: {
            pm1: { id: 'pm1', role: 'admin' },
            pm2: { id: 'pm2', role: 'member' },
          },
        };

        const state = reducer(stateWithMembers, removeProjectMember('pm1'));

        expect(state.ids).toEqual(['pm2']);
        expect(state.entities.pm1).toBeUndefined();
        expect(state.entities.pm2).toBeDefined();
      });

      it('should handle removing non-existent project member', () => {
        const state = reducer(initialState, removeProjectMember('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other project members', () => {
        const stateWithMembers = {
          ...initialState,
          ids: ['pm1', 'pm2', 'pm3'],
          entities: {
            pm1: { id: 'pm1' },
            pm2: { id: 'pm2' },
            pm3: { id: 'pm3' },
          },
        };

        const state = reducer(stateWithMembers, removeProjectMember('pm2'));

        expect(state.ids).toEqual(['pm1', 'pm3']);
        expect(state.entities.pm1).toBeDefined();
        expect(state.entities.pm3).toBeDefined();
      });

      it('should preserve UI state when removing project member', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['pm1'],
          entities: { pm1: { id: 'pm1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeProjectMember('pm1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full project member lifecycle', () => {
      let state = initialState;

      // Add project member
      state = reducer(state, addProjectMember({ id: 'pm1', projectId: 'proj-1', userId: 'user-1', role: 'member' }));
      expect(state.ids).toContain('pm1');

      // Select project member
      state = reducer(state, setSelectedProjectMemberId({ id: 'pm1' }));
      expect(state.selectedId).toBe('pm1');

      // Update project member role
      state = reducer(state, updateProjectMember({ id: 'pm1', role: 'admin' }));
      expect(state.entities.pm1.role).toBe('admin');

      // Remove project member
      state = reducer(state, removeProjectMember('pm1'));
      expect(state.entities.pm1).toBeUndefined();
    });

    it('should handle multiple project members with different UI states', () => {
      let state = initialState;

      state = reducer(state, setProjectMembers([
        { id: 'pm1', role: 'admin' },
        { id: 'pm2', role: 'member' },
        { id: 'pm3', role: 'viewer' },
      ]));

      state = reducer(state, setSelectedProjectMemberId({ id: 'pm1' }));
      state = reducer(state, setFocusedProjectMemberId({ id: 'pm2' }));
      state = reducer(state, setHoveredProjectMemberId({ id: 'pm3' }));

      expect(state.selectedId).toBe('pm1');
      expect(state.focusedId).toBe('pm2');
      expect(state.hoveredId).toBe('pm3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addProjectMember({ id: 'pm1', role: 'member' }));
      state = reducer(state, addProjectMember({ id: 'pm2', role: 'viewer' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setProjectMembers)
      state = reducer(state, setProjectMembers([
        { id: 'pm1', role: 'admin' },
        { id: 'pm2', role: 'member' },
        { id: 'pm3', role: 'viewer' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateProjectMember({ id: 'pm1', role: 'owner' }));
      expect(state.entities.pm1.role).toBe('owner');

      // Delete
      state = reducer(state, removeProjectMember('pm2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.pm2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const members = [
        { id: 'pm1', role: 'admin' },
        { id: 'pm2', role: 'member' },
      ];

      const state = reducer(initialState, setProjectMembers(members));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const member = {
        id: 'pm1',
        projectId: 'proj-1',
        userId: 'user-1',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
      };

      const state = reducer(initialState, addProjectMember(member));

      expect(state.entities.pm1).toEqual(member);
      expect(state.entities.pm1.permissions).toEqual(['read', 'write', 'delete']);
    });

    it('should handle project members with complex data', () => {
      const member = {
        id: 'pm1',
        projectId: 'proj-123',
        userId: 'user-456',
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin'],
        metadata: {
          joinedAt: '2024-01-01T00:00:00Z',
          invitedBy: 'user-789',
          status: 'active',
          settings: {
            notifications: true,
            emailDigest: 'daily',
          },
        },
      };

      const state = reducer(initialState, addProjectMember(member));

      expect(state.entities.pm1).toEqual(member);
    });
  });
});

