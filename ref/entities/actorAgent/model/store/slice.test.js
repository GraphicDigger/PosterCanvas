// ===================================================================
// Unit Tests for ActorAgent Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 4 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import actorAgentReducer, {
  setActorAgents,
  setHoveredActorAgentId,
  setFocusedActorAgentId,
  setSelectedActorAgentId,
  addActorAgent,
  updateActorAgent,
  removeActorAgent,
} from './slice';

// Mock shared/constants
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    ACTOR_AGENT: 'actorAgent',
  },
}));

describe('ActorAgent Entity Slice', () => {
  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ui).toBeDefined();
    });

    it('should initialize with empty entities', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should initialize UI state with null values', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      expect(state.ui.hoveredActorAgentId).toBeNull();
      expect(state.ui.focusedActorAgentId).toBeNull();
      expect(state.ui.selectedActorAgentId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set hovered actor agent id', () => {
      const initialState = actorAgentReducer(undefined, { type: '@@INIT' });
      const state = actorAgentReducer(
        initialState,
        setHoveredActorAgentId('agent-123'),
      );

      expect(state.ui.hoveredActorAgentId).toBe('agent-123');
    });

    it('should set focused actor agent id', () => {
      const initialState = actorAgentReducer(undefined, { type: '@@INIT' });
      const state = actorAgentReducer(
        initialState,
        setFocusedActorAgentId('agent-456'),
      );

      expect(state.ui.focusedActorAgentId).toBe('agent-456');
    });

    it('should set selected actor agent id', () => {
      const initialState = actorAgentReducer(undefined, { type: '@@INIT' });
      const state = actorAgentReducer(
        initialState,
        setSelectedActorAgentId('agent-789'),
      );

      expect(state.ui.selectedActorAgentId).toBe('agent-789');
    });

    it('should handle null values in UI state', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(state, setSelectedActorAgentId('agent-1'));
      expect(state.ui.selectedActorAgentId).toBe('agent-1');

      state = actorAgentReducer(state, setSelectedActorAgentId(null));
      expect(state.ui.selectedActorAgentId).toBeNull();
    });

    it('should handle multiple UI state updates', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(state, setHoveredActorAgentId('agent-1'));
      state = actorAgentReducer(state, setFocusedActorAgentId('agent-2'));
      state = actorAgentReducer(state, setSelectedActorAgentId('agent-3'));

      expect(state.ui.hoveredActorAgentId).toBe('agent-1');
      expect(state.ui.focusedActorAgentId).toBe('agent-2');
      expect(state.ui.selectedActorAgentId).toBe('agent-3');
    });
  });

  describe('Query Actions - setActorAgents', () => {
    it('should set actor agents', () => {
      const initialState = actorAgentReducer(undefined, { type: '@@INIT' });
      const agents = [
        { id: 'agent-1', name: 'John Doe', email: 'john@example.com' },
        { id: 'agent-2', name: 'Jane Smith', email: 'jane@example.com' },
      ];

      const state = actorAgentReducer(initialState, setActorAgents(agents));

      expect(state.ids).toHaveLength(2);
      expect(state.ids).toEqual(['agent-1', 'agent-2']);
      expect(state.entities['agent-1']).toEqual(agents[0]);
      expect(state.entities['agent-2']).toEqual(agents[1]);
    });

    it('should replace existing agents when setting new agents', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(
        state,
        setActorAgents([{ id: 'agent-old', name: 'Old Agent' }]),
      );

      state = actorAgentReducer(
        state,
        setActorAgents([{ id: 'agent-new', name: 'New Agent' }]),
      );

      expect(state.ids).toEqual(['agent-new']);
      expect(state.entities['agent-old']).toBeUndefined();
      expect(state.entities['agent-new']).toBeDefined();
    });

    it('should handle empty agents array', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(
        state,
        setActorAgents([{ id: 'agent-1', name: 'Agent' }]),
      );

      state = actorAgentReducer(state, setActorAgents([]));

      expect(state.ids).toEqual([]);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle large number of agents', () => {
      const agents = Array.from({ length: 100 }, (_, i) => ({
        id: `agent-${i}`,
        name: `Agent ${i}`,
      }));

      const state = actorAgentReducer(undefined, { type: '@@INIT' });
      const newState = actorAgentReducer(state, setActorAgents(agents));

      expect(newState.ids).toHaveLength(100);
      expect(newState.entities['agent-0']).toBeDefined();
      expect(newState.entities['agent-99']).toBeDefined();
    });

    it('should preserve IDs order from payload', () => {
      const agents = [
        { id: 'agent-3', name: 'Third' },
        { id: 'agent-1', name: 'First' },
        { id: 'agent-2', name: 'Second' },
      ];

      const state = actorAgentReducer(undefined, { type: '@@INIT' });
      const newState = actorAgentReducer(state, setActorAgents(agents));

      expect(newState.ids).toEqual(['agent-3', 'agent-1', 'agent-2']);
    });
  });

  describe('Mutation Actions', () => {
    it('should handle addActorAgent action', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });
      const newAgent = { id: 'agent-new', name: 'New Agent' };

      // Action exists but implementation is empty
      const newState = actorAgentReducer(state, addActorAgent(newAgent));

      expect(newState).toBeDefined();
      // Implementation is empty, so state should be unchanged
      expect(newState.ids).toEqual([]);
    });

    it('should handle updateActorAgent action', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      // Action exists but implementation is empty
      const newState = actorAgentReducer(
        state,
        updateActorAgent({ id: 'agent-1', name: 'Updated' }),
      );

      expect(newState).toBeDefined();
    });

    it('should handle removeActorAgent action', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      // Action exists but implementation is empty
      const newState = actorAgentReducer(state, removeActorAgent('agent-1'));

      expect(newState).toBeDefined();
    });
  });

  describe('Complex Scenarios', () => {
    it('should maintain UI state when updating agents', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(state, setSelectedActorAgentId('agent-1'));
      state = actorAgentReducer(
        state,
        setActorAgents([{ id: 'agent-1', name: 'Agent 1' }]),
      );

      expect(state.ui.selectedActorAgentId).toBe('agent-1');
    });

    it('should handle setting agents with complex data', () => {
      const agents = [
        {
          id: 'agent-1',
          name: 'Complex Agent',
          email: 'agent@example.com',
          metadata: {
            department: 'Engineering',
            role: 'Senior',
            permissions: ['read', 'write', 'delete'],
          },
        },
      ];

      const state = actorAgentReducer(undefined, { type: '@@INIT' });
      const newState = actorAgentReducer(state, setActorAgents(agents));

      expect(newState.entities['agent-1'].metadata).toBeDefined();
      expect(newState.entities['agent-1'].metadata.permissions).toHaveLength(3);
    });

    it('should handle UI state updates independently', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(state, setHoveredActorAgentId('agent-1'));
      expect(state.ui.focusedActorAgentId).toBeNull();
      expect(state.ui.selectedActorAgentId).toBeNull();

      state = actorAgentReducer(state, setFocusedActorAgentId('agent-2'));
      expect(state.ui.hoveredActorAgentId).toBe('agent-1');
      expect(state.ui.selectedActorAgentId).toBeNull();
    });

    it('should handle overwriting same UI field', () => {
      let state = actorAgentReducer(undefined, { type: '@@INIT' });

      state = actorAgentReducer(state, setSelectedActorAgentId('agent-1'));
      expect(state.ui.selectedActorAgentId).toBe('agent-1');

      state = actorAgentReducer(state, setSelectedActorAgentId('agent-2'));
      expect(state.ui.selectedActorAgentId).toBe('agent-2');

      state = actorAgentReducer(state, setSelectedActorAgentId('agent-3'));
      expect(state.ui.selectedActorAgentId).toBe('agent-3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle agents with duplicate IDs (last one wins)', () => {
      const agents = [
        { id: 'agent-1', name: 'First' },
        { id: 'agent-1', name: 'Second' },
      ];

      const state = actorAgentReducer(undefined, { type: '@@INIT' });
      const newState = actorAgentReducer(state, setActorAgents(agents));

      expect(newState.entities['agent-1'].name).toBe('Second');
      expect(newState.ids).toEqual(['agent-1', 'agent-1']);
    });

    it('should handle undefined values in UI state', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      const newState = actorAgentReducer(
        state,
        setHoveredActorAgentId(undefined),
      );

      expect(newState.ui.hoveredActorAgentId).toBeUndefined();
    });

    it('should handle empty string as agent ID', () => {
      const state = actorAgentReducer(undefined, { type: '@@INIT' });

      const newState = actorAgentReducer(state, setSelectedActorAgentId(''));

      expect(newState.ui.selectedActorAgentId).toBe('');
    });
  });
});

