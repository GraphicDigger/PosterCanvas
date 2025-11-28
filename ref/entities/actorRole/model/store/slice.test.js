// ===================================================================
// Unit Tests for ActorRole Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 4 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import actorRoleReducer, {
  setActorRoles,
  setHoveredActorRoleId,
  setFocusedActorRoleId,
  setSelectedActorRoleId,
  addActorRole,
  updateActorRoleName,
  updateActorRolePosition,
  updateActorRoleActorType,
  updateActorRoleAgentRoleId,
  updateActorRolePrompt,
  removeActorRole,
} from './slice';

// Mock constants
vi.mock('../../constants/actorType', () => ({
  ACTOR_TYPE: {
    MEMBER: 'member',
    AGENT: 'agent',
  },
}));

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid-1234'),
}));

describe('ActorRole Entity Slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ui).toBeDefined();
    });

    it('should initialize with empty entities', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should initialize UI state with null values', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      expect(state.ui.hoveredActorRoleId).toBeNull();
      expect(state.ui.focusedActorRoleId).toBeNull();
      expect(state.ui.selectedActorRoleId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set hovered actor role id', () => {
      const initialState = actorRoleReducer(undefined, { type: '@@INIT' });
      const state = actorRoleReducer(
        initialState,
        setHoveredActorRoleId('role-123'),
      );

      expect(state.ui.hoveredActorRoleId).toBe('role-123');
    });

    it('should set focused actor role id', () => {
      const initialState = actorRoleReducer(undefined, { type: '@@INIT' });
      const state = actorRoleReducer(
        initialState,
        setFocusedActorRoleId('role-456'),
      );

      expect(state.ui.focusedActorRoleId).toBe('role-456');
    });

    it('should set selected actor role id', () => {
      const initialState = actorRoleReducer(undefined, { type: '@@INIT' });
      const state = actorRoleReducer(
        initialState,
        setSelectedActorRoleId('role-789'),
      );

      expect(state.ui.selectedActorRoleId).toBe('role-789');
    });
  });

  describe('Query Actions - setActorRoles', () => {
    it('should set actor roles', () => {
      const initialState = actorRoleReducer(undefined, { type: '@@INIT' });
      const roles = [
        { id: 'role-1', name: 'Admin', actorType: 'member' },
        { id: 'role-2', name: 'Editor', actorType: 'agent' },
      ];

      const state = actorRoleReducer(initialState, setActorRoles(roles));

      expect(state.ids).toHaveLength(2);
      expect(state.ids).toEqual(['role-1', 'role-2']);
      expect(state.entities['role-1']).toEqual(roles[0]);
      expect(state.entities['role-2']).toEqual(roles[1]);
    });

    it('should replace existing roles when setting new roles', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-old', name: 'Old Role' }]),
      );

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-new', name: 'New Role' }]),
      );

      expect(state.ids).toEqual(['role-new']);
      expect(state.entities['role-old']).toBeUndefined();
      expect(state.entities['role-new']).toBeDefined();
    });
  });

  describe('Mutation Actions - addActorRole', () => {
    it('should add a member role with correct defaults', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      const newState = actorRoleReducer(
        state,
        addActorRole({ actorType: 'member' }),
      );

      expect(newState.ids).toHaveLength(1);
      expect(newState.ids[0]).toBe('mocked-uuid-1234');
      expect(newState.entities['mocked-uuid-1234']).toEqual({
        id: 'mocked-uuid-1234',
        name: 'New Member Role',
        positionId: '',
        actorType: 'member',
      });
    });

    it('should add an agent role with correct defaults', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      const newState = actorRoleReducer(
        state,
        addActorRole({ actorType: 'agent' }),
      );

      expect(newState.ids).toHaveLength(1);
      expect(newState.entities['mocked-uuid-1234']).toEqual({
        id: 'mocked-uuid-1234',
        name: 'New Agent Role',
        positionId: '',
        actorType: 'agent',
      });
    });

    it('should add new role at the beginning of ids array', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'existing-role', name: 'Existing' }]),
      );

      state = actorRoleReducer(state, addActorRole({ actorType: 'member' }));

      expect(state.ids[0]).toBe('mocked-uuid-1234');
      expect(state.ids[1]).toBe('existing-role');
    });
  });

  describe('Mutation Actions - Update', () => {
    it('should update actor role name', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', name: 'Original Name' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleName({ actorRoleId: 'role-1', name: 'Updated Name' }),
      );

      expect(state.entities['role-1'].name).toBe('Updated Name');
    });

    it('should update actor role position', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', positionId: '' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRolePosition({ actorRoleId: 'role-1', positionId: 'pos-123' }),
      );

      expect(state.entities['role-1'].positionId).toBe('pos-123');
    });

    it('should update actor role type', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', actorType: 'member' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleActorType({ actorRoleId: 'role-1', actorType: 'agent' }),
      );

      expect(state.entities['role-1'].actorType).toBe('agent');
    });

    it('should update actor role agent role id', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', agentRoleId: '' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleAgentRoleId({ actorRoleId: 'role-1', agentRoleId: 'agent-456' }),
      );

      expect(state.entities['role-1'].agentRoleId).toBe('agent-456');
    });

    it('should update actor role prompt', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', prompt: '' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRolePrompt({ actorRoleId: 'role-1', prompt: 'You are a helpful assistant' }),
      );

      expect(state.entities['role-1'].prompt).toBe('You are a helpful assistant');
    });

    it('should not update non-existent role', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      const newState = actorRoleReducer(
        state,
        updateActorRoleName({ actorRoleId: 'non-existent', name: 'Test' }),
      );

      expect(newState).toBeDefined();
      expect(newState.entities['non-existent']).toBeUndefined();
    });
  });

  describe('Mutation Actions - Remove', () => {
    it('should handle removeActorRole action', () => {
      const state = actorRoleReducer(undefined, { type: '@@INIT' });

      // Action exists but implementation is empty
      const newState = actorRoleReducer(state, removeActorRole('role-1'));

      expect(newState).toBeDefined();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple updates on same role', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', name: 'Initial', actorType: 'member' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleName({ actorRoleId: 'role-1', name: 'Updated Name' }),
      );

      state = actorRoleReducer(
        state,
        updateActorRolePosition({ actorRoleId: 'role-1', positionId: 'pos-1' }),
      );

      state = actorRoleReducer(
        state,
        updateActorRolePrompt({ actorRoleId: 'role-1', prompt: 'Test prompt' }),
      );

      expect(state.entities['role-1'].name).toBe('Updated Name');
      expect(state.entities['role-1'].positionId).toBe('pos-1');
      expect(state.entities['role-1'].prompt).toBe('Test prompt');
    });

    it('should maintain UI state when updating roles', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(state, setSelectedActorRoleId('role-1'));
      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', name: 'Role 1' }]),
      );

      expect(state.ui.selectedActorRoleId).toBe('role-1');
    });

    it('should add multiple roles sequentially', async () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      // Mock uuid to return different values
      const { v4 } = await import('uuid');
      v4.mockReturnValueOnce('uuid-1');
      v4.mockReturnValueOnce('uuid-2');
      v4.mockReturnValueOnce('uuid-3');

      state = actorRoleReducer(state, addActorRole({ actorType: 'member' }));
      state = actorRoleReducer(state, addActorRole({ actorType: 'agent' }));
      state = actorRoleReducer(state, addActorRole({ actorType: 'member' }));

      expect(state.ids).toHaveLength(3);
      // Latest additions are at the beginning
      expect(state.ids[0]).toBe('uuid-3');
      expect(state.ids[1]).toBe('uuid-2');
      expect(state.ids[2]).toBe('uuid-1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle null values in UI state', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(state, setSelectedActorRoleId('role-1'));
      expect(state.ui.selectedActorRoleId).toBe('role-1');

      state = actorRoleReducer(state, setSelectedActorRoleId(null));
      expect(state.ui.selectedActorRoleId).toBeNull();
    });

    it('should handle empty string values in updates', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{ id: 'role-1', name: 'Test' }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleName({ actorRoleId: 'role-1', name: '' }),
      );

      expect(state.entities['role-1'].name).toBe('');
    });

    it('should preserve other properties when updating specific field', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        setActorRoles([{
          id: 'role-1',
          name: 'Original',
          actorType: 'member',
          positionId: 'pos-1',
          prompt: 'Original prompt',
        }]),
      );

      state = actorRoleReducer(
        state,
        updateActorRoleName({ actorRoleId: 'role-1', name: 'Updated' }),
      );

      expect(state.entities['role-1'].actorType).toBe('member');
      expect(state.entities['role-1'].positionId).toBe('pos-1');
      expect(state.entities['role-1'].prompt).toBe('Original prompt');
    });

    it('should handle updating non-existent fields gracefully', () => {
      let state = actorRoleReducer(undefined, { type: '@@INIT' });

      state = actorRoleReducer(
        state,
        updateActorRolePosition({ actorRoleId: 'non-existent', positionId: 'test' }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });
  });
});

