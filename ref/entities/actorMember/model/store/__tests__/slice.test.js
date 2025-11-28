// ===================================================================
// Unit Tests for actorMember Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (MEDIUM IMPACT - 46 lines, self-contained)
// Risk: LOW (Redux Toolkit, member state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import memberReducer, {
  setHoveredMemberId,
  setFocusedMemberId,
  setSelectedMemberId,
  setMembers,
} from '../slice';

describe('actorMember Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      entities: {},
      ids: [],
      ui: {
        hoveredMemberId: null,
        focusedMemberId: null,
        selectedMemberId: null,
      },
    };

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = memberReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty entities and ids', () => {
      const result = memberReducer(undefined, { type: '@@INIT' });

      expect(result.entities).toEqual({});
      expect(result.ids).toEqual([]);
    });

    it('should have null UI state values', () => {
      const result = memberReducer(undefined, { type: '@@INIT' });

      expect(result.ui.hoveredMemberId).toBeNull();
      expect(result.ui.focusedMemberId).toBeNull();
      expect(result.ui.selectedMemberId).toBeNull();
    });
  });

  describe('UI Actions - setHoveredMemberId', () => {
    it('should set hovered member ID', () => {
      const result = memberReducer(initialState, setHoveredMemberId('member-1'));

      expect(result.ui.hoveredMemberId).toBe('member-1');
    });

    it('should update hovered member ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredMemberId: 'member-1' },
      };

      const result = memberReducer(state, setHoveredMemberId('member-2'));

      expect(result.ui.hoveredMemberId).toBe('member-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredMemberId: 'member-1' },
      };

      const result = memberReducer(state, setHoveredMemberId(null));

      expect(result.ui.hoveredMemberId).toBeNull();
    });

    it('should not affect other UI state', () => {
      const state = {
        ...initialState,
        ui: {
          hoveredMemberId: null,
          focusedMemberId: 'member-2',
          selectedMemberId: 'member-3',
        },
      };

      const result = memberReducer(state, setHoveredMemberId('member-1'));

      expect(result.ui.hoveredMemberId).toBe('member-1');
      expect(result.ui.focusedMemberId).toBe('member-2');
      expect(result.ui.selectedMemberId).toBe('member-3');
    });
  });

  describe('UI Actions - setFocusedMemberId', () => {
    it('should set focused member ID', () => {
      const result = memberReducer(initialState, setFocusedMemberId('member-1'));

      expect(result.ui.focusedMemberId).toBe('member-1');
    });

    it('should update focused member ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedMemberId: 'member-1' },
      };

      const result = memberReducer(state, setFocusedMemberId('member-2'));

      expect(result.ui.focusedMemberId).toBe('member-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedMemberId: 'member-1' },
      };

      const result = memberReducer(state, setFocusedMemberId(null));

      expect(result.ui.focusedMemberId).toBeNull();
    });

    it('should not affect other UI state', () => {
      const state = {
        ...initialState,
        ui: {
          hoveredMemberId: 'member-1',
          focusedMemberId: null,
          selectedMemberId: 'member-3',
        },
      };

      const result = memberReducer(state, setFocusedMemberId('member-2'));

      expect(result.ui.hoveredMemberId).toBe('member-1');
      expect(result.ui.focusedMemberId).toBe('member-2');
      expect(result.ui.selectedMemberId).toBe('member-3');
    });
  });

  describe('UI Actions - setSelectedMemberId', () => {
    it('should set selected member ID', () => {
      const result = memberReducer(initialState, setSelectedMemberId('member-1'));

      expect(result.ui.selectedMemberId).toBe('member-1');
    });

    it('should log selected member ID to console', () => {
      memberReducer(initialState, setSelectedMemberId('member-1'));

      expect(console.log).toHaveBeenCalledWith('selectedMemberId', 'member-1');
    });

    it('should update selected member ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedMemberId: 'member-1' },
      };

      const result = memberReducer(state, setSelectedMemberId('member-2'));

      expect(result.ui.selectedMemberId).toBe('member-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedMemberId: 'member-1' },
      };

      const result = memberReducer(state, setSelectedMemberId(null));

      expect(result.ui.selectedMemberId).toBeNull();
    });

    it('should log null when setting to null', () => {
      vi.clearAllMocks();
      memberReducer(initialState, setSelectedMemberId(null));

      expect(console.log).toHaveBeenCalledWith('selectedMemberId', null);
    });

    it('should not affect other UI state', () => {
      const state = {
        ...initialState,
        ui: {
          hoveredMemberId: 'member-1',
          focusedMemberId: 'member-2',
          selectedMemberId: null,
        },
      };

      const result = memberReducer(state, setSelectedMemberId('member-3'));

      expect(result.ui.hoveredMemberId).toBe('member-1');
      expect(result.ui.focusedMemberId).toBe('member-2');
      expect(result.ui.selectedMemberId).toBe('member-3');
    });
  });

  describe('Data Actions - setMembers', () => {
    it('should set single member', () => {
      const members = [
        { id: 'member-1', name: 'John Doe', role: 'Admin' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-1']);
      expect(result.entities['member-1']).toEqual(members[0]);
    });

    it('should set multiple members', () => {
      const members = [
        { id: 'member-1', name: 'John Doe', role: 'Admin' },
        { id: 'member-2', name: 'Jane Smith', role: 'Editor' },
        { id: 'member-3', name: 'Bob Johnson', role: 'Viewer' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-1', 'member-2', 'member-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.entities['member-1'].name).toBe('John Doe');
      expect(result.entities['member-2'].name).toBe('Jane Smith');
      expect(result.entities['member-3'].name).toBe('Bob Johnson');
    });

    it('should replace existing members', () => {
      const state = {
        ...initialState,
        ids: ['old-1'],
        entities: { 'old-1': { id: 'old-1', name: 'Old Member' } },
      };

      const members = [
        { id: 'member-1', name: 'New Member' },
      ];

      const result = memberReducer(state, setMembers(members));

      expect(result.ids).toEqual(['member-1']);
      expect(result.entities['old-1']).toBeUndefined();
      expect(result.entities['member-1']).toEqual(members[0]);
    });

    it('should handle empty members array', () => {
      const state = {
        ...initialState,
        ids: ['member-1'],
        entities: { 'member-1': { id: 'member-1', name: 'Member' } },
      };

      const result = memberReducer(state, setMembers([]));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should preserve all member properties', () => {
      const members = [
        {
          id: 'member-1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          avatar: 'avatar.png',
          metadata: { joinedAt: '2024-01-01' },
        },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.entities['member-1']).toEqual(members[0]);
      expect(result.entities['member-1'].email).toBe('john@example.com');
      expect(result.entities['member-1'].avatar).toBe('avatar.png');
      expect(result.entities['member-1'].metadata).toEqual({ joinedAt: '2024-01-01' });
    });

    it('should maintain member order in ids array', () => {
      const members = [
        { id: 'member-3', name: 'Third' },
        { id: 'member-1', name: 'First' },
        { id: 'member-2', name: 'Second' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-3', 'member-1', 'member-2']);
    });

    it('should handle members with minimal properties', () => {
      const members = [
        { id: 'member-1' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-1']);
      expect(result.entities['member-1']).toEqual({ id: 'member-1' });
    });

    it('should handle large number of members', () => {
      const members = Array.from({ length: 100 }, (_, i) => ({
        id: `member-${i}`,
        name: `Member ${i}`,
      }));

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toHaveLength(100);
      expect(Object.keys(result.entities)).toHaveLength(100);
      expect(result.entities['member-0'].name).toBe('Member 0');
      expect(result.entities['member-99'].name).toBe('Member 99');
    });
  });

  describe('Combined Actions', () => {
    it('should handle setMembers and select workflow', () => {
      let state = initialState;

      const members = [
        { id: 'member-1', name: 'John Doe' },
        { id: 'member-2', name: 'Jane Smith' },
      ];

      state = memberReducer(state, setMembers(members));
      state = memberReducer(state, setSelectedMemberId('member-1'));

      expect(state.ids).toHaveLength(2);
      expect(state.ui.selectedMemberId).toBe('member-1');
    });

    it('should handle setMembers and multiple UI updates', () => {
      let state = initialState;

      const members = [
        { id: 'member-1', name: 'John Doe' },
        { id: 'member-2', name: 'Jane Smith' },
        { id: 'member-3', name: 'Bob Johnson' },
      ];

      state = memberReducer(state, setMembers(members));
      state = memberReducer(state, setSelectedMemberId('member-1'));
      state = memberReducer(state, setHoveredMemberId('member-2'));
      state = memberReducer(state, setFocusedMemberId('member-3'));

      expect(state.ids).toHaveLength(3);
      expect(state.ui.selectedMemberId).toBe('member-1');
      expect(state.ui.hoveredMemberId).toBe('member-2');
      expect(state.ui.focusedMemberId).toBe('member-3');
    });

    it('should handle clearing selection after setMembers', () => {
      let state = initialState;

      const members = [
        { id: 'member-1', name: 'John Doe' },
      ];

      state = memberReducer(state, setMembers(members));
      state = memberReducer(state, setSelectedMemberId('member-1'));
      state = memberReducer(state, setSelectedMemberId(null));

      expect(state.ui.selectedMemberId).toBeNull();
    });

    it('should handle replacing members while UI state is set', () => {
      let state = initialState;

      const members1 = [
        { id: 'member-1', name: 'John Doe' },
      ];

      state = memberReducer(state, setMembers(members1));
      state = memberReducer(state, setSelectedMemberId('member-1'));

      const members2 = [
        { id: 'member-2', name: 'Jane Smith' },
      ];

      state = memberReducer(state, setMembers(members2));

      expect(state.ids).toEqual(['member-2']);
      expect(state.entities['member-1']).toBeUndefined();
      // Note: selectedMemberId is NOT automatically cleared
      expect(state.ui.selectedMemberId).toBe('member-1');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when setting members', () => {
      const state = {
        ...initialState,
        ids: ['member-1'],
        entities: { 'member-1': { id: 'member-1', name: 'John' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      const members = [
        { id: 'member-2', name: 'Jane' },
      ];

      memberReducer(state, setMembers(members));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when setting UI state', () => {
      const state = {
        ...initialState,
        ui: {
          hoveredMemberId: 'member-1',
          focusedMemberId: null,
          selectedMemberId: null,
        },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      memberReducer(state, setSelectedMemberId('member-2'));

      expect(state).toEqual(originalState);
    });
  });

  describe('Edge Cases', () => {
    it('should handle selecting non-existent member', () => {
      const state = {
        ...initialState,
        ids: ['member-1'],
        entities: { 'member-1': { id: 'member-1', name: 'John' } },
      };

      const result = memberReducer(state, setSelectedMemberId('member-999'));

      expect(result.ui.selectedMemberId).toBe('member-999');
      expect(result.entities['member-999']).toBeUndefined();
    });

    it('should handle members with duplicate IDs (last one wins)', () => {
      const members = [
        { id: 'member-1', name: 'First John' },
        { id: 'member-1', name: 'Second John' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-1', 'member-1']);
      expect(result.entities['member-1'].name).toBe('Second John');
    });

    it('should handle members with special characters in ID', () => {
      const members = [
        { id: 'member-@#$%', name: 'Special Member' },
      ];

      const result = memberReducer(initialState, setMembers(members));

      expect(result.ids).toEqual(['member-@#$%']);
      expect(result.entities['member-@#$%']).toEqual(members[0]);
    });
  });
});

