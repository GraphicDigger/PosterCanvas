// ===================================================================
// Unit Tests for ProjectMember Slice
// CRITICAL BUSINESS LOGIC - Project Member State Management
// Phase 1, Day 10 - Part 4 (30 tests) - 61.5% Coverage!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ProjectMemberState } from '../../types';

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

import projectMemberEntitySlice, {
  setProjectMembers,
  setHoveredProjectMemberId,
  setFocusedProjectMemberId,
  setSelectedProjectMemberId,
  resetSelectedProjectMember,
  addProjectMember,
  updateProjectMember,
  removeProjectMember,
} from './slice';

describe('ProjectMember Slice', () => {
  let initialState: ProjectMemberState;

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
    it('should set hovered project member ID', () => {
      const state = projectMemberEntitySlice(initialState, setHoveredProjectMemberId({ id: 'member-1' } as any));
      expect(state.hoveredId).toBe('member-1');
    });

    it('should set focused project member ID', () => {
      const state = projectMemberEntitySlice(initialState, setFocusedProjectMemberId({ id: 'member-2' } as any));
      expect(state.focusedId).toBe('member-2');
    });

    it('should set selected project member ID', () => {
      const state = projectMemberEntitySlice(initialState, setSelectedProjectMemberId({ id: 'member-3' } as any));
      expect(state.selectedId).toBe('member-3');
    });

    it('should reset selected project member', () => {
      initialState.selectedId = 'member-1';
      const state = projectMemberEntitySlice(initialState, resetSelectedProjectMember());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Project Members (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set Project Members (Bulk Load)', () => {
    it('should set project members (replace all)', () => {
      const members = [
        { id: 'member-1', userId: 'user-1', projectId: 'project-1', role: 'admin' },
        { id: 'member-2', userId: 'user-2', projectId: 'project-1', role: 'developer' },
      ];

      const state = projectMemberEntitySlice(initialState, setProjectMembers(members));

      expect(state.ids).toEqual(['member-1', 'member-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing members when setting new ones', () => {
      initialState.entities['member-old'] = { id: 'member-old', userId: 'user-old' } as any;
      initialState.ids.push('member-old');

      const members = [{ id: 'member-new', userId: 'user-new', projectId: 'project-1', role: 'developer' }];
      const state = projectMemberEntitySlice(initialState, setProjectMembers(members));

      expect(state.entities['member-old']).toBeUndefined();
      expect(state.entities['member-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['member-1'] = { id: 'member-1', userId: 'user-1' } as any;
      initialState.ids.push('member-1');

      const state = projectMemberEntitySlice(initialState, setProjectMembers([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting members', () => {
      initialState.selectedId = 'member-selected';

      const members = [{ id: 'member-1', userId: 'user-1', projectId: 'project-1', role: 'developer' }];
      const state = projectMemberEntitySlice(initialState, setProjectMembers(members));

      expect(state.selectedId).toBe('member-selected');
    });

    it('should handle large number of members', () => {
      const members = Array.from({ length: 50 }, (_, i) => ({
        id: `member-${i}`,
        userId: `user-${i}`,
        projectId: 'project-1',
        role: 'developer',
      }));

      const state = projectMemberEntitySlice(initialState, setProjectMembers(members));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });

    it('should set members with various roles', () => {
      const members = [
        { id: 'member-1', userId: 'user-1', projectId: 'project-1', role: 'admin', joinedAt: '2025-01-01' },
        { id: 'member-2', userId: 'user-2', projectId: 'project-1', role: 'developer', joinedAt: '2025-01-02' },
        { id: 'member-3', userId: 'user-3', projectId: 'project-1', role: 'viewer', joinedAt: '2025-01-03' },
      ];

      const state = projectMemberEntitySlice(initialState, setProjectMembers(members));

      expect(state.entities['member-1'].role).toBe('admin');
      expect(state.entities['member-2'].role).toBe('developer');
      expect(state.entities['member-3'].role).toBe('viewer');
    });
  });

  // ===================================================================
  // PART 3: Add Project Member (7 tests)
  // ===================================================================

  describe('Add Project Member', () => {
    it('should add project member', () => {
      const member = {
        id: 'member-1',
        userId: 'user-1',
        projectId: 'project-1',
        role: 'developer',
      };

      const state = projectMemberEntitySlice(initialState, addProjectMember(member));

      expect(state.ids).toContain('member-1');
      expect(state.entities['member-1']).toEqual(member);
    });

    it('should not add duplicate member', () => {
      initialState.entities['member-1'] = { id: 'member-1', userId: 'user-1' } as any;
      initialState.ids.push('member-1');

      const member = { id: 'member-1', userId: 'user-1', projectId: 'project-1', role: 'developer' };
      const state = projectMemberEntitySlice(initialState, addProjectMember(member));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing members when adding new one', () => {
      initialState.entities['member-existing'] = {
        id: 'member-existing',
        userId: 'user-existing',
      } as any;
      initialState.ids.push('member-existing');

      const member = { id: 'member-new', userId: 'user-new', projectId: 'project-1', role: 'developer' };
      const state = projectMemberEntitySlice(initialState, addProjectMember(member));

      expect(state.entities['member-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding member', () => {
      initialState.selectedId = 'member-selected';

      const member = { id: 'member-1', userId: 'user-1', projectId: 'project-1', role: 'developer' };
      const state = projectMemberEntitySlice(initialState, addProjectMember(member));

      expect(state.selectedId).toBe('member-selected');
    });

    it('should add member with minimal properties', () => {
      const member = { id: 'member-1' };
      const state = projectMemberEntitySlice(initialState, addProjectMember(member as any));

      expect(state.entities['member-1']).toEqual(member);
    });

    it('should add member with full properties', () => {
      const member = {
        id: 'member-1',
        userId: 'user-1',
        projectId: 'project-1',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
        joinedAt: '2025-01-01',
        invitedBy: 'user-0',
      };

      const state = projectMemberEntitySlice(initialState, addProjectMember(member as any));

      expect(state.entities['member-1']).toEqual(member);
    });

    it('should maintain insertion order', () => {
      let state = projectMemberEntitySlice(initialState, addProjectMember({ id: 'member-3', userId: 'user-3' } as any));
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-1', userId: 'user-1' } as any));
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-2', userId: 'user-2' } as any));

      expect(state.ids).toEqual(['member-3', 'member-1', 'member-2']);
    });
  });

  // ===================================================================
  // PART 4: Update Project Member (6 tests)
  // ===================================================================

  describe('Update Project Member', () => {
    beforeEach(() => {
      initialState.entities['member-1'] = {
        id: 'member-1',
        userId: 'user-1',
        projectId: 'project-1',
        role: 'developer',
      } as any;
      initialState.ids.push('member-1');
    });

    it('should update member role', () => {
      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'admin',
        } as any),
      );

      expect(state.entities['member-1'].role).toBe('admin');
    });

    it('should handle updating non-existent member', () => {
      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'non-existent',
          role: 'admin',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update member permissions', () => {
      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'developer',
          permissions: ['read', 'write'],
        } as any),
      );

      expect(state.entities['member-1'].permissions).toEqual(['read', 'write']);
    });

    it('should not affect other members when updating one', () => {
      initialState.entities['member-2'] = {
        id: 'member-2',
        userId: 'user-2',
        role: 'viewer',
      } as any;
      initialState.ids.push('member-2');

      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'admin',
        } as any),
      );

      expect(state.entities['member-2']).toEqual({
        id: 'member-2',
        userId: 'user-2',
        role: 'viewer',
      });
    });

    it('should not affect UI state when updating member', () => {
      initialState.selectedId = 'member-1';

      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'admin',
        } as any),
      );

      expect(state.selectedId).toBe('member-1');
    });

    it('should handle role promotion workflow', () => {
      const state = projectMemberEntitySlice(
        initialState,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'admin',
          promotedAt: '2025-10-15',
        } as any),
      );

      expect(state.entities['member-1'].role).toBe('admin');
      expect(state.entities['member-1'].promotedAt).toBe('2025-10-15');
    });
  });

  // ===================================================================
  // PART 5: Remove Project Member (3 tests)
  // ===================================================================

  describe('Remove Project Member', () => {
    beforeEach(() => {
      initialState.entities = {
        'member-1': { id: 'member-1', userId: 'user-1', role: 'developer' } as any,
        'member-2': { id: 'member-2', userId: 'user-2', role: 'viewer' } as any,
      };
      initialState.ids = ['member-1', 'member-2'];
    });

    it('should remove member', () => {
      const state = projectMemberEntitySlice(initialState, removeProjectMember('member-1'));

      expect(state.ids).not.toContain('member-1');
      expect(state.entities['member-1']).toBeUndefined();
      expect(state.entities['member-2']).toBeDefined();
    });

    it('should handle removing non-existent member', () => {
      const state = projectMemberEntitySlice(initialState, removeProjectMember('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other members', () => {
      const state = projectMemberEntitySlice(initialState, removeProjectMember('member-1'));

      expect(state.ids).toContain('member-2');
      expect(state.entities['member-2']).toEqual({
        id: 'member-2',
        userId: 'user-2',
        role: 'viewer',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete member lifecycle', () => {
      let state = projectMemberEntitySlice(
        initialState,
        addProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'developer',
        } as any),
      );
      state = projectMemberEntitySlice(
        state,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          projectId: 'project-1',
          role: 'admin',
        } as any),
      );
      state = projectMemberEntitySlice(state, setSelectedProjectMemberId({ id: 'member-1' } as any));
      state = projectMemberEntitySlice(state, removeProjectMember('member-1'));

      expect(state.ids).not.toContain('member-1');
      expect(state.selectedId).toBe('member-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const members = [
        { id: 'member-1', userId: 'user-1', role: 'developer' },
        { id: 'member-2', userId: 'user-2', role: 'viewer' },
      ];

      let state = projectMemberEntitySlice(initialState, setProjectMembers(members));
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-3', userId: 'user-3', role: 'developer' } as any));
      state = projectMemberEntitySlice(
        state,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          role: 'admin',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['member-1'].role).toBe('admin');
      expect(state.entities['member-3']).toBeDefined();
    });

    it('should handle UI state changes with member operations', () => {
      let state = projectMemberEntitySlice(
        initialState,
        addProjectMember({ id: 'member-1', userId: 'user-1', role: 'developer' } as any),
      );
      state = projectMemberEntitySlice(state, setHoveredProjectMemberId({ id: 'member-1' } as any));
      state = projectMemberEntitySlice(state, setFocusedProjectMemberId({ id: 'member-1' } as any));
      state = projectMemberEntitySlice(state, setSelectedProjectMemberId({ id: 'member-1' } as any));
      state = projectMemberEntitySlice(
        state,
        updateProjectMember({
          id: 'member-1',
          userId: 'user-1',
          role: 'admin',
        } as any),
      );

      expect(state.hoveredId).toBe('member-1');
      expect(state.focusedId).toBe('member-1');
      expect(state.selectedId).toBe('member-1');
      expect(state.entities['member-1'].role).toBe('admin');
    });

    it('should handle team composition changes', () => {
      let state = projectMemberEntitySlice(
        initialState,
        addProjectMember({ id: 'member-1', userId: 'user-1', role: 'admin' } as any),
      );
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-2', userId: 'user-2', role: 'developer' } as any));
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-3', userId: 'user-3', role: 'developer' } as any));
      state = projectMemberEntitySlice(state, addProjectMember({ id: 'member-4', userId: 'user-4', role: 'viewer' } as any));

      // Promote one developer to admin
      state = projectMemberEntitySlice(
        state,
        updateProjectMember({
          id: 'member-2',
          userId: 'user-2',
          role: 'admin',
        } as any),
      );

      // Remove a member
      state = projectMemberEntitySlice(state, removeProjectMember('member-4'));

      expect(state.ids).toHaveLength(3);
      expect(state.entities['member-2'].role).toBe('admin');
      expect(state.entities['member-4']).toBeUndefined();
    });
  });
});

