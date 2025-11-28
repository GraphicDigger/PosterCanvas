// ===================================================================
// Unit Tests for ActorMember Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 4 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import actorMemberReducer, {
  setMembers,
  setHoveredMemberId,
  setFocusedMemberId,
  setSelectedMemberId,
} from '../slice';

// Mock console.log to avoid cluttering test output
const consoleLogSpy = vi.spyOn(console, 'log');

describe('ActorMember Entity Slice', () => {
  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ui).toBeDefined();
    });

    it('should initialize with empty entities', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should initialize UI state with null values', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      expect(state.ui.hoveredMemberId).toBeNull();
      expect(state.ui.focusedMemberId).toBeNull();
      expect(state.ui.selectedMemberId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set hovered member id', () => {
      const initialState = actorMemberReducer(undefined, { type: '@@INIT' });
      const state = actorMemberReducer(
        initialState,
        setHoveredMemberId('member-123'),
      );

      expect(state.ui.hoveredMemberId).toBe('member-123');
    });

    it('should set focused member id', () => {
      const initialState = actorMemberReducer(undefined, { type: '@@INIT' });
      const state = actorMemberReducer(
        initialState,
        setFocusedMemberId('member-456'),
      );

      expect(state.ui.focusedMemberId).toBe('member-456');
    });

    it('should set selected member id', () => {
      const initialState = actorMemberReducer(undefined, { type: '@@INIT' });

      const state = actorMemberReducer(
        initialState,
        setSelectedMemberId('member-789'),
      );

      expect(state.ui.selectedMemberId).toBe('member-789');
    });

    it('should handle null values in UI state', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(state, setSelectedMemberId('member-1'));
      expect(state.ui.selectedMemberId).toBe('member-1');

      state = actorMemberReducer(state, setSelectedMemberId(null));
      expect(state.ui.selectedMemberId).toBeNull();
    });

    it('should handle multiple UI state updates', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(state, setHoveredMemberId('member-1'));
      state = actorMemberReducer(state, setFocusedMemberId('member-2'));
      state = actorMemberReducer(state, setSelectedMemberId('member-3'));

      expect(state.ui.hoveredMemberId).toBe('member-1');
      expect(state.ui.focusedMemberId).toBe('member-2');
      expect(state.ui.selectedMemberId).toBe('member-3');
    });
  });

  describe('Query Actions - setMembers', () => {
    it('should set members', () => {
      const initialState = actorMemberReducer(undefined, { type: '@@INIT' });
      const members = [
        { id: 'member-1', name: 'Alice Johnson', role: 'Admin' },
        { id: 'member-2', name: 'Bob Smith', role: 'User' },
      ];

      const state = actorMemberReducer(initialState, setMembers(members));

      expect(state.ids).toHaveLength(2);
      expect(state.ids).toEqual(['member-1', 'member-2']);
      expect(state.entities['member-1']).toEqual(members[0]);
      expect(state.entities['member-2']).toEqual(members[1]);
    });

    it('should replace existing members when setting new members', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(
        state,
        setMembers([{ id: 'member-old', name: 'Old Member' }]),
      );

      state = actorMemberReducer(
        state,
        setMembers([{ id: 'member-new', name: 'New Member' }]),
      );

      expect(state.ids).toEqual(['member-new']);
      expect(state.entities['member-old']).toBeUndefined();
      expect(state.entities['member-new']).toBeDefined();
    });

    it('should handle empty members array', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(
        state,
        setMembers([{ id: 'member-1', name: 'Member' }]),
      );

      state = actorMemberReducer(state, setMembers([]));

      expect(state.ids).toEqual([]);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle large number of members', () => {
      const members = Array.from({ length: 100 }, (_, i) => ({
        id: `member-${i}`,
        name: `Member ${i}`,
      }));

      const state = actorMemberReducer(undefined, { type: '@@INIT' });
      const newState = actorMemberReducer(state, setMembers(members));

      expect(newState.ids).toHaveLength(100);
      expect(newState.entities['member-0']).toBeDefined();
      expect(newState.entities['member-99']).toBeDefined();
    });

    it('should preserve IDs order from payload', () => {
      const members = [
        { id: 'member-3', name: 'Third' },
        { id: 'member-1', name: 'First' },
        { id: 'member-2', name: 'Second' },
      ];

      const state = actorMemberReducer(undefined, { type: '@@INIT' });
      const newState = actorMemberReducer(state, setMembers(members));

      expect(newState.ids).toEqual(['member-3', 'member-1', 'member-2']);
    });

    it('should correctly reduce members into entities object', () => {
      const members = [
        { id: 'member-1', name: 'Alice', email: 'alice@test.com' },
        { id: 'member-2', name: 'Bob', email: 'bob@test.com' },
      ];

      const state = actorMemberReducer(undefined, { type: '@@INIT' });
      const newState = actorMemberReducer(state, setMembers(members));

      expect(Object.keys(newState.entities)).toHaveLength(2);
      expect(newState.entities['member-1'].email).toBe('alice@test.com');
      expect(newState.entities['member-2'].email).toBe('bob@test.com');
    });
  });

  describe('Complex Scenarios', () => {
    it('should maintain UI state when updating members', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(state, setSelectedMemberId('member-1'));
      state = actorMemberReducer(
        state,
        setMembers([{ id: 'member-1', name: 'Member 1' }]),
      );

      expect(state.ui.selectedMemberId).toBe('member-1');
    });

    it('should handle setting members with complex data', () => {
      const members = [
        {
          id: 'member-1',
          name: 'Complex Member',
          email: 'member@example.com',
          profile: {
            department: 'Engineering',
            title: 'Senior Developer',
            skills: ['React', 'Node.js', 'TypeScript'],
          },
        },
      ];

      const state = actorMemberReducer(undefined, { type: '@@INIT' });
      const newState = actorMemberReducer(state, setMembers(members));

      expect(newState.entities['member-1'].profile).toBeDefined();
      expect(newState.entities['member-1'].profile.skills).toHaveLength(3);
    });

    it('should handle UI state updates independently', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(state, setHoveredMemberId('member-1'));
      expect(state.ui.focusedMemberId).toBeNull();
      expect(state.ui.selectedMemberId).toBeNull();

      state = actorMemberReducer(state, setFocusedMemberId('member-2'));
      expect(state.ui.hoveredMemberId).toBe('member-1');
      expect(state.ui.selectedMemberId).toBeNull();
    });

    it('should handle overwriting same UI field', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(state, setSelectedMemberId('member-1'));
      expect(state.ui.selectedMemberId).toBe('member-1');

      state = actorMemberReducer(state, setSelectedMemberId('member-2'));
      expect(state.ui.selectedMemberId).toBe('member-2');

      state = actorMemberReducer(state, setSelectedMemberId('member-3'));
      expect(state.ui.selectedMemberId).toBe('member-3');
    });

    it('should handle sequential member updates', () => {
      let state = actorMemberReducer(undefined, { type: '@@INIT' });

      state = actorMemberReducer(
        state,
        setMembers([{ id: 'member-1', name: 'First Set' }]),
      );
      expect(state.ids).toHaveLength(1);

      state = actorMemberReducer(
        state,
        setMembers([
          { id: 'member-1', name: 'Second Set' },
          { id: 'member-2', name: 'New Member' },
        ]),
      );
      expect(state.ids).toHaveLength(2);
      expect(state.entities['member-1'].name).toBe('Second Set');
    });
  });

  describe('Edge Cases', () => {
    it('should handle members with duplicate IDs (last one wins)', () => {
      const members = [
        { id: 'member-1', name: 'First' },
        { id: 'member-1', name: 'Second' },
      ];

      const state = actorMemberReducer(undefined, { type: '@@INIT' });
      const newState = actorMemberReducer(state, setMembers(members));

      expect(newState.entities['member-1'].name).toBe('Second');
      expect(newState.ids).toEqual(['member-1', 'member-1']);
    });

    it('should handle undefined values in UI state', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      const newState = actorMemberReducer(
        state,
        setHoveredMemberId(undefined),
      );

      expect(newState.ui.hoveredMemberId).toBeUndefined();
    });

    it('should handle empty string as member ID', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      const newState = actorMemberReducer(state, setSelectedMemberId(''));

      expect(newState.ui.selectedMemberId).toBe('');
    });

    it('should handle null selectedMemberId', () => {
      const state = actorMemberReducer(undefined, { type: '@@INIT' });

      const newState = actorMemberReducer(state, setSelectedMemberId(null));

      expect(newState.ui.selectedMemberId).toBeNull();
    });
  });
});

