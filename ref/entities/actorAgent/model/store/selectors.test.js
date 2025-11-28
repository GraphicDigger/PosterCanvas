// ===================================================================
// Unit Tests for ActorAgent Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 2 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectActorAgentState,
  selectActorAgentEntities,
  selectActorAgentIds,
  selectActorAgentUI,
  selectAllActorAgents,
  selectActorAgentById,
  selectSelectedActorAgent,
  selectActorAgentsByIds,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedActorAgentId: vi.fn((state) => state.mockSelectedAgentId || null),
}));

describe('ActorAgent Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectActorAgentState', () => {
      it('should return actorAgent entity state', () => {
        const agentState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          actorAgentEntity: agentState,
        };

        expect(selectActorAgentState(state)).toEqual(agentState);
      });
    });

    describe('selectActorAgentEntities', () => {
      it('should return actorAgent entities object', () => {
        const entities = {
          'agent-1': { id: 'agent-1', name: 'Agent One', email: 'agent1@test.com' },
          'agent-2': { id: 'agent-2', name: 'Agent Two', email: 'agent2@test.com' },
        };
        const state = {
          actorAgentEntity: {
            entities,
          },
        };

        expect(selectActorAgentEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          actorAgentEntity: {
            entities: {},
          },
        };

        expect(selectActorAgentEntities(state)).toEqual({});
      });
    });

    describe('selectActorAgentIds', () => {
      it('should return actorAgent ids array', () => {
        const ids = ['agent-1', 'agent-2', 'agent-3'];
        const state = {
          actorAgentEntity: {
            ids,
          },
        };

        expect(selectActorAgentIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          actorAgentEntity: {
            ids: [],
          },
        };

        expect(selectActorAgentIds(state)).toEqual([]);
      });
    });

    describe('selectActorAgentUI', () => {
      it('should return actorAgent UI state', () => {
        const uiState = {
          selectedAgentId: 'agent-1',
          hoveredAgentId: 'agent-2',
        };
        const state = {
          actorAgentEntity: {
            ui: uiState,
          },
        };

        expect(selectActorAgentUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          actorAgentEntity: {
            ui: {},
          },
        };

        expect(selectActorAgentUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectActorAgentById', () => {
      it('should return agent by ID', () => {
        const agent = { id: 'agent-1', name: 'Test Agent', email: 'test@agent.com' };
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': agent,
            },
          },
        };

        expect(selectActorAgentById(state, 'agent-1')).toEqual(agent);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          actorAgentEntity: {
            entities: {},
          },
        };

        expect(selectActorAgentById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          actorAgentEntity: {
            entities: null,
          },
        };

        expect(() => selectActorAgentById(state, 'agent-1')).toThrow();
      });
    });

    describe('selectSelectedActorAgent', () => {
      it('should return selected agent', () => {
        const agent = { id: 'agent-selected', name: 'Selected Agent' };
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-selected': agent,
            },
          },
          mockSelectedAgentId: 'agent-selected',
        };

        expect(selectSelectedActorAgent(state)).toEqual(agent);
      });

      it('should return null when no agent selected', () => {
        const state = {
          actorAgentEntity: {
            entities: {},
          },
          mockSelectedAgentId: null,
        };

        expect(selectSelectedActorAgent(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          actorAgentEntity: {
            entities: null,
          },
          mockSelectedAgentId: 'agent-1',
        };

        expect(selectSelectedActorAgent(state)).toBeNull();
      });

      it('should return null when selected agent does not exist', () => {
        const state = {
          actorAgentEntity: {
            entities: {},
          },
          mockSelectedAgentId: 'non-existent',
        };

        expect(selectSelectedActorAgent(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllActorAgents', () => {
      it('should return all agents as array', () => {
        const entities = {
          'agent-1': { id: 'agent-1', name: 'Agent One' },
          'agent-2': { id: 'agent-2', name: 'Agent Two' },
          'agent-3': { id: 'agent-3', name: 'Agent Three' },
        };
        const state = {
          actorAgentEntity: {
            ids: ['agent-1', 'agent-2', 'agent-3'],
            entities,
          },
        };

        const result = selectAllActorAgents(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['agent-1']);
        expect(result[1]).toEqual(entities['agent-2']);
        expect(result[2]).toEqual(entities['agent-3']);
      });

      it('should return empty array when no agents', () => {
        const state = {
          actorAgentEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllActorAgents(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          actorAgentEntity: {
            ids: ['agent-3', 'agent-1', 'agent-2'],
            entities: {
              'agent-1': { id: 'agent-1', order: 1 },
              'agent-2': { id: 'agent-2', order: 2 },
              'agent-3': { id: 'agent-3', order: 3 },
            },
          },
        };

        const result = selectAllActorAgents(state);
        expect(result[0].id).toBe('agent-3');
        expect(result[1].id).toBe('agent-1');
        expect(result[2].id).toBe('agent-2');
      });

      it('should handle undefined agents in the list', () => {
        const state = {
          actorAgentEntity: {
            ids: ['agent-1', 'non-existent', 'agent-2'],
            entities: {
              'agent-1': { id: 'agent-1', name: 'Agent One' },
              'agent-2': { id: 'agent-2', name: 'Agent Two' },
            },
          },
        };

        const result = selectAllActorAgents(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectActorAgentsByIds', () => {
      it('should return agents for given IDs', () => {
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': { id: 'agent-1', name: 'First' },
              'agent-2': { id: 'agent-2', name: 'Second' },
              'agent-3': { id: 'agent-3', name: 'Third' },
            },
          },
        };

        const result = selectActorAgentsByIds(state, ['agent-1', 'agent-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent agents', () => {
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': { id: 'agent-1', name: 'First' },
            },
          },
        };

        const result = selectActorAgentsByIds(state, ['agent-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('agent-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          actorAgentEntity: {
            entities: {},
          },
        };

        const result = selectActorAgentsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          actorAgentEntity: {
            entities: null,
          },
        };

        const result = selectActorAgentsByIds(state, ['agent-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': { id: 'agent-1' },
            },
          },
        };

        const result = selectActorAgentsByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': { id: 'agent-1', name: 'First' },
              'agent-2': { id: 'agent-2', name: 'Second' },
              'agent-3': { id: 'agent-3', name: 'Third' },
            },
          },
        };

        const result = selectActorAgentsByIds(state, ['agent-3', 'agent-1', 'agent-2']);
        expect(result[0].name).toBe('Third');
        expect(result[1].name).toBe('First');
        expect(result[2].name).toBe('Second');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('selectAllActorAgents with missing entities', () => {
      it('should handle partial entity data gracefully', () => {
        const state = {
          actorAgentEntity: {
            ids: ['agent-1', 'agent-2', 'agent-3'],
            entities: {
              'agent-1': { id: 'agent-1', name: 'Agent One' },
              // agent-2 missing
              'agent-3': { id: 'agent-3', name: 'Agent Three' },
            },
          },
        };

        const result = selectAllActorAgents(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toBeDefined();
        expect(result[1]).toBeUndefined();
        expect(result[2]).toBeDefined();
      });
    });

    describe('selectActorAgentById with special characters', () => {
      it('should handle IDs with special characters', () => {
        const agent = { id: 'agent-123-abc_def', name: 'Special ID Agent' };
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-123-abc_def': agent,
            },
          },
        };

        expect(selectActorAgentById(state, 'agent-123-abc_def')).toEqual(agent);
      });
    });

    describe('selectSelectedActorAgent with complex agent data', () => {
      it('should handle agents with nested properties', () => {
        const agent = {
          id: 'agent-1',
          name: 'Complex Agent',
          profile: {
            email: 'complex@agent.com',
            phone: '123-456-7890',
          },
          roles: ['admin', 'user'],
        };
        const state = {
          actorAgentEntity: {
            entities: {
              'agent-1': agent,
            },
          },
          mockSelectedAgentId: 'agent-1',
        };

        const result = selectSelectedActorAgent(state);
        expect(result).toEqual(agent);
        expect(result.profile.email).toBe('complex@agent.com');
        expect(result.roles).toHaveLength(2);
      });
    });
  });
});

