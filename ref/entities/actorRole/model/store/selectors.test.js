// ===================================================================
// Unit Tests for ActorRole Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 3 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  selectActorRoleState,
  selectActorRoleEntities,
  selectActorRoleIds,
  selectActorRoleUI,
  selectActorRoleById,
  selectAllActorRoles,
  selectActorRoleByActorType,
  selectSelectedActorRole,
  selectSelectedActorRoleIsAgent,
  selectSelectedActorRoleIsMember,
  selectActorRolesByIds,
  selectAgentsRoles,
  selectMembersRoles,
} from './selectors';
import { ACTOR_TYPE } from '../../model';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedActorRoleId: vi.fn((state) => state.mockSelectedRoleId || null),
}));

describe('ActorRole Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectActorRoleState', () => {
      it('should return actorRole entity state', () => {
        const roleState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          actorRoleEntity: roleState,
        };

        expect(selectActorRoleState(state)).toEqual(roleState);
      });
    });

    describe('selectActorRoleEntities', () => {
      it('should return actorRole entities object', () => {
        const entities = {
          'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
          'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
        };
        const state = {
          actorRoleEntity: {
            entities,
          },
        };

        expect(selectActorRoleEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
        };

        expect(selectActorRoleEntities(state)).toEqual({});
      });
    });

    describe('selectActorRoleIds', () => {
      it('should return actorRole ids array', () => {
        const ids = ['role-1', 'role-2', 'role-3'];
        const state = {
          actorRoleEntity: {
            ids,
          },
        };

        expect(selectActorRoleIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          actorRoleEntity: {
            ids: [],
          },
        };

        expect(selectActorRoleIds(state)).toEqual([]);
      });
    });

    describe('selectActorRoleUI', () => {
      it('should return actorRole UI state', () => {
        const uiState = {
          selectedRoleId: 'role-1',
          hoveredRoleId: 'role-2',
        };
        const state = {
          actorRoleEntity: {
            ui: uiState,
          },
        };

        expect(selectActorRoleUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          actorRoleEntity: {
            ui: {},
          },
        };

        expect(selectActorRoleUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectActorRoleById', () => {
      it('should return role by ID', () => {
        const role = { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT };
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': role,
            },
          },
        };

        expect(selectActorRoleById(state, 'role-1')).toEqual(role);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
        };

        expect(selectActorRoleById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          actorRoleEntity: {
            entities: null,
          },
        };

        expect(() => selectActorRoleById(state, 'role-1')).toThrow();
      });
    });

    describe('selectSelectedActorRole', () => {
      it('should return selected role', () => {
        const role = { id: 'role-selected', name: 'Selected Role', actorType: ACTOR_TYPE.AGENT };
        const state = {
          actorRoleEntity: {
            entities: {
              'role-selected': role,
            },
          },
          mockSelectedRoleId: 'role-selected',
        };

        expect(selectSelectedActorRole(state)).toEqual(role);
      });

      it('should return null when no role selected', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: null,
        };

        expect(selectSelectedActorRole(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          actorRoleEntity: {
            entities: null,
          },
          mockSelectedRoleId: 'role-1',
        };

        expect(selectSelectedActorRole(state)).toBeNull();
      });

      it('should return null when selected role does not exist', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: 'non-existent',
        };

        expect(selectSelectedActorRole(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllActorRoles', () => {
      it('should return all roles as array', () => {
        const entities = {
          'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
          'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
          'role-3': { id: 'role-3', name: 'Guest', actorType: ACTOR_TYPE.AGENT },
        };
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3'],
            entities,
          },
        };

        const result = selectAllActorRoles(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['role-1']);
        expect(result[1]).toEqual(entities['role-2']);
        expect(result[2]).toEqual(entities['role-3']);
      });

      it('should return empty array when no roles', () => {
        const state = {
          actorRoleEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllActorRoles(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-3', 'role-1', 'role-2'],
            entities: {
              'role-1': { id: 'role-1', order: 1 },
              'role-2': { id: 'role-2', order: 2 },
              'role-3': { id: 'role-3', order: 3 },
            },
          },
        };

        const result = selectAllActorRoles(state);
        expect(result[0].id).toBe('role-3');
        expect(result[1].id).toBe('role-1');
        expect(result[2].id).toBe('role-2');
      });
    });

    describe('selectActorRolesByIds', () => {
      it('should return roles for given IDs', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'Admin' },
              'role-2': { id: 'role-2', name: 'User' },
              'role-3': { id: 'role-3', name: 'Guest' },
            },
          },
        };

        const result = selectActorRolesByIds(state, ['role-1', 'role-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Admin');
        expect(result[1].name).toBe('Guest');
      });

      it('should filter out non-existent roles', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'Admin' },
            },
          },
        };

        const result = selectActorRolesByIds(state, ['role-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('role-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
        };

        const result = selectActorRolesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          actorRoleEntity: {
            entities: null,
          },
        };

        const result = selectActorRolesByIds(state, ['role-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1' },
            },
          },
        };

        const result = selectActorRolesByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'Admin' },
              'role-2': { id: 'role-2', name: 'User' },
              'role-3': { id: 'role-3', name: 'Guest' },
            },
          },
        };

        const result = selectActorRolesByIds(state, ['role-3', 'role-1', 'role-2']);
        expect(result[0].name).toBe('Guest');
        expect(result[1].name).toBe('Admin');
        expect(result[2].name).toBe('User');
      });
    });
  });

  describe('Actor Type Filter Selectors', () => {
    describe('selectActorRoleByActorType', () => {
      it('should return roles filtered by AGENT type', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
              'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
              'role-3': { id: 'role-3', name: 'Manager', actorType: ACTOR_TYPE.AGENT },
            },
          },
        };

        const result = selectActorRoleByActorType(state, ACTOR_TYPE.AGENT);
        expect(result).toHaveLength(2);
        expect(result.every(r => r.actorType === ACTOR_TYPE.AGENT)).toBe(true);
      });

      it('should return roles filtered by MEMBER type', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
              'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
              'role-3': { id: 'role-3', name: 'Guest', actorType: ACTOR_TYPE.MEMBER },
            },
          },
        };

        const result = selectActorRoleByActorType(state, ACTOR_TYPE.MEMBER);
        expect(result).toHaveLength(2);
        expect(result.every(r => r.actorType === ACTOR_TYPE.MEMBER)).toBe(true);
      });

      it('should return empty array when no roles match type', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
            },
          },
        };

        const result = selectActorRoleByActorType(state, ACTOR_TYPE.MEMBER);
        expect(result).toEqual([]);
      });
    });

    describe('selectAgentsRoles', () => {
      it('should return only AGENT roles', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
              'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
              'role-3': { id: 'role-3', name: 'Manager', actorType: ACTOR_TYPE.AGENT },
            },
          },
        };

        const result = selectAgentsRoles(state);
        expect(result).toHaveLength(2);
        expect(result.every(r => r.actorType === ACTOR_TYPE.AGENT)).toBe(true);
        expect(result[0].name).toBe('Admin');
        expect(result[1].name).toBe('Manager');
      });

      it('should return empty array when no agent roles', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1'],
            entities: {
              'role-1': { id: 'role-1', name: 'User', actorType: ACTOR_TYPE.MEMBER },
            },
          },
        };

        const result = selectAgentsRoles(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when no roles', () => {
        const state = {
          actorRoleEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectAgentsRoles(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectMembersRoles', () => {
      it('should return only MEMBER roles', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
              'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
              'role-3': { id: 'role-3', name: 'Guest', actorType: ACTOR_TYPE.MEMBER },
            },
          },
        };

        const result = selectMembersRoles(state);
        expect(result).toHaveLength(2);
        expect(result.every(r => r.actorType === ACTOR_TYPE.MEMBER)).toBe(true);
        expect(result[0].name).toBe('User');
        expect(result[1].name).toBe('Guest');
      });

      it('should return empty array when no member roles', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
            },
          },
        };

        const result = selectMembersRoles(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when no roles', () => {
        const state = {
          actorRoleEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectMembersRoles(state);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Selected Role Type Checks', () => {
    describe('selectSelectedActorRoleIsAgent', () => {
      it('should return true when selected role is AGENT', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
            },
          },
          mockSelectedRoleId: 'role-1',
        };

        expect(selectSelectedActorRoleIsAgent(state)).toBe(true);
      });

      it('should return false when selected role is MEMBER', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'User', actorType: ACTOR_TYPE.MEMBER },
            },
          },
          mockSelectedRoleId: 'role-1',
        };

        expect(selectSelectedActorRoleIsAgent(state)).toBe(false);
      });

      it('should return false when no role is selected', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: null,
        };

        expect(selectSelectedActorRoleIsAgent(state)).toBe(false);
      });

      it('should handle undefined selected role', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: 'non-existent',
        };

        expect(selectSelectedActorRoleIsAgent(state)).toBe(false);
      });
    });

    describe('selectSelectedActorRoleIsMember', () => {
      it('should return true when selected role is MEMBER', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'User', actorType: ACTOR_TYPE.MEMBER },
            },
          },
          mockSelectedRoleId: 'role-1',
        };

        expect(selectSelectedActorRoleIsMember(state)).toBe(true);
      });

      it('should return false when selected role is AGENT', () => {
        const state = {
          actorRoleEntity: {
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
            },
          },
          mockSelectedRoleId: 'role-1',
        };

        expect(selectSelectedActorRoleIsMember(state)).toBe(false);
      });

      it('should return false when no role is selected', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: null,
        };

        expect(selectSelectedActorRoleIsMember(state)).toBe(false);
      });

      it('should handle undefined selected role', () => {
        const state = {
          actorRoleEntity: {
            entities: {},
          },
          mockSelectedRoleId: 'non-existent',
        };

        expect(selectSelectedActorRoleIsMember(state)).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Mixed actor types', () => {
      it('should correctly separate AGENT and MEMBER roles', () => {
        const state = {
          actorRoleEntity: {
            ids: ['role-1', 'role-2', 'role-3', 'role-4'],
            entities: {
              'role-1': { id: 'role-1', name: 'Admin', actorType: ACTOR_TYPE.AGENT },
              'role-2': { id: 'role-2', name: 'User', actorType: ACTOR_TYPE.MEMBER },
              'role-3': { id: 'role-3', name: 'Manager', actorType: ACTOR_TYPE.AGENT },
              'role-4': { id: 'role-4', name: 'Guest', actorType: ACTOR_TYPE.MEMBER },
            },
          },
        };

        const agents = selectAgentsRoles(state);
        const members = selectMembersRoles(state);

        expect(agents).toHaveLength(2);
        expect(members).toHaveLength(2);
        expect(agents.every(r => r.actorType === ACTOR_TYPE.AGENT)).toBe(true);
        expect(members.every(r => r.actorType === ACTOR_TYPE.MEMBER)).toBe(true);
      });
    });

    describe('Complex role data', () => {
      it('should handle roles with nested permissions', () => {
        const role = {
          id: 'role-1',
          name: 'Super Admin',
          actorType: ACTOR_TYPE.AGENT,
          permissions: {
            read: true,
            write: true,
            delete: true,
          },
          metadata: {
            level: 1,
            department: 'IT',
          },
        };
        const state = {
          actorRoleEntity: {
            ids: ['role-1'],
            entities: {
              'role-1': role,
            },
          },
        };

        const result = selectActorRoleById(state, 'role-1');
        expect(result).toEqual(role);
        expect(result.permissions.delete).toBe(true);
        expect(result.metadata.level).toBe(1);
      });
    });
  });
});

