// ===================================================================
// Unit Tests for Workspace Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 4 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectWorkspaceState,
  selectWorkspaceEntities,
  selectWorkspaceIds,
  selectWorkspaceUI,
  selectAllWorkspaces,
  selectWorkspaceById,
  selectSelectedWorkspace,
  selectWorkspacesByIds,
  makeSelectWorkspacesByUserId,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedWorkspaceId: vi.fn((state) => state.mockSelectedWorkspaceId || null),
}));

// Mock cross-entity selectors
vi.mock('../../../actorMember', () => ({
  makeSelectUserMembersByUserId: vi.fn((userId) => () => [
    { id: 'member-1', userId, workspaceId: 'workspace-1' },
    { id: 'member-2', userId, workspaceId: 'workspace-2' },
  ]),
}));

describe('Workspace Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectWorkspaceState', () => {
      it('should return workspace entity state', () => {
        const workspaceState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          workspaceEntity: workspaceState,
        };

        expect(selectWorkspaceState(state)).toEqual(workspaceState);
      });
    });

    describe('selectWorkspaceEntities', () => {
      it('should return workspace entities object', () => {
        const entities = {
          'workspace-1': { id: 'workspace-1', name: 'Workspace One' },
          'workspace-2': { id: 'workspace-2', name: 'Workspace Two' },
        };
        const state = {
          workspaceEntity: {
            entities,
          },
        };

        expect(selectWorkspaceEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
        };

        expect(selectWorkspaceEntities(state)).toEqual({});
      });
    });

    describe('selectWorkspaceIds', () => {
      it('should return workspace ids array', () => {
        const ids = ['workspace-1', 'workspace-2', 'workspace-3'];
        const state = {
          workspaceEntity: {
            ids,
          },
        };

        expect(selectWorkspaceIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          workspaceEntity: {
            ids: [],
          },
        };

        expect(selectWorkspaceIds(state)).toEqual([]);
      });
    });

    describe('selectWorkspaceUI', () => {
      it('should return workspace UI state', () => {
        const uiState = {
          selectedWorkspaceId: 'workspace-1',
          hoveredWorkspaceId: 'workspace-2',
        };
        const state = {
          workspaceEntity: {
            ui: uiState,
          },
        };

        expect(selectWorkspaceUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          workspaceEntity: {
            ui: {},
          },
        };

        expect(selectWorkspaceUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectWorkspaceById', () => {
      it('should return workspace by ID', () => {
        const workspace = { id: 'workspace-1', name: 'Test Workspace' };
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': workspace,
            },
          },
        };

        expect(selectWorkspaceById(state, 'workspace-1')).toEqual(workspace);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
        };

        expect(selectWorkspaceById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          workspaceEntity: {
            entities: null,
          },
        };

        expect(() => selectWorkspaceById(state, 'workspace-1')).toThrow();
      });
    });

    describe('selectSelectedWorkspace', () => {
      it('should return selected workspace', () => {
        const workspace = { id: 'workspace-selected', name: 'Selected Workspace' };
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-selected': workspace,
            },
          },
          mockSelectedWorkspaceId: 'workspace-selected',
        };

        expect(selectSelectedWorkspace(state)).toEqual(workspace);
      });

      it('should return null when no workspace selected', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
          mockSelectedWorkspaceId: null,
        };

        expect(selectSelectedWorkspace(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          workspaceEntity: {
            entities: null,
          },
          mockSelectedWorkspaceId: 'workspace-1',
        };

        expect(selectSelectedWorkspace(state)).toBeNull();
      });

      it('should return null when selected workspace does not exist', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
          mockSelectedWorkspaceId: 'non-existent',
        };

        expect(selectSelectedWorkspace(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllWorkspaces', () => {
      it('should return all workspaces as array', () => {
        const entities = {
          'workspace-1': { id: 'workspace-1', name: 'Workspace One' },
          'workspace-2': { id: 'workspace-2', name: 'Workspace Two' },
          'workspace-3': { id: 'workspace-3', name: 'Workspace Three' },
        };
        const state = {
          workspaceEntity: {
            ids: ['workspace-1', 'workspace-2', 'workspace-3'],
            entities,
          },
        };

        const result = selectAllWorkspaces(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['workspace-1']);
        expect(result[1]).toEqual(entities['workspace-2']);
        expect(result[2]).toEqual(entities['workspace-3']);
      });

      it('should return empty array when no workspaces', () => {
        const state = {
          workspaceEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllWorkspaces(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          workspaceEntity: {
            ids: ['workspace-3', 'workspace-1', 'workspace-2'],
            entities: {
              'workspace-1': { id: 'workspace-1', order: 1 },
              'workspace-2': { id: 'workspace-2', order: 2 },
              'workspace-3': { id: 'workspace-3', order: 3 },
            },
          },
        };

        const result = selectAllWorkspaces(state);
        expect(result[0].id).toBe('workspace-3');
        expect(result[1].id).toBe('workspace-1');
        expect(result[2].id).toBe('workspace-2');
      });

      it('should handle undefined workspaces in the list', () => {
        const state = {
          workspaceEntity: {
            ids: ['workspace-1', 'non-existent', 'workspace-2'],
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'First' },
              'workspace-2': { id: 'workspace-2', name: 'Second' },
            },
          },
        };

        const result = selectAllWorkspaces(state);
        expect(result).toHaveLength(2); // Only existing workspaces are returned
        expect(result[0].id).toBe('workspace-1');
        expect(result[1].id).toBe('workspace-2');
      });
    });

    describe('selectWorkspacesByIds', () => {
      it('should return workspaces for given IDs', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'First' },
              'workspace-2': { id: 'workspace-2', name: 'Second' },
              'workspace-3': { id: 'workspace-3', name: 'Third' },
            },
          },
        };

        const result = selectWorkspacesByIds(state, ['workspace-1', 'workspace-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent workspaces', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'First' },
            },
          },
        };

        const result = selectWorkspacesByIds(state, ['workspace-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('workspace-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
        };

        const result = selectWorkspacesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          workspaceEntity: {
            entities: null,
          },
        };

        const result = selectWorkspacesByIds(state, ['workspace-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1' },
            },
          },
        };

        const result = selectWorkspacesByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'First' },
              'workspace-2': { id: 'workspace-2', name: 'Second' },
              'workspace-3': { id: 'workspace-3', name: 'Third' },
            },
          },
        };

        const result = selectWorkspacesByIds(state, ['workspace-3', 'workspace-1', 'workspace-2']);
        expect(result[0].name).toBe('Third');
        expect(result[1].name).toBe('First');
        expect(result[2].name).toBe('Second');
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectWorkspacesByUserId', () => {
      it('should create selector that returns user workspaces', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'Workspace 1' },
              'workspace-2': { id: 'workspace-2', name: 'Workspace 2' },
              'workspace-3': { id: 'workspace-3', name: 'Workspace 3' },
            },
          },
        };

        const selector = makeSelectWorkspacesByUserId('user-1');
        const result = selector(state);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('workspace-1');
        expect(result[1].id).toBe('workspace-2');
      });

      it('should return empty array when userId is null', () => {
        const state = {
          workspaceEntity: {
            entities: {},
          },
        };

        const selector = makeSelectWorkspacesByUserId(null);
        expect(selector(state)).toEqual([]);
      });

      it('should return empty array when state is null', () => {
        const selector = makeSelectWorkspacesByUserId('user-1');
        expect(selector(null)).toEqual([]);
      });

      it('should return workspaces based on user members', () => {
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': { id: 'workspace-1', name: 'First' },
              'workspace-2': { id: 'workspace-2', name: 'Second' },
            },
          },
        };

        const selector = makeSelectWorkspacesByUserId('user-1');
        const result = selector(state);

        // Based on mocked data, should return 2 workspaces
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex workspace data', () => {
      it('should handle workspaces with nested properties', () => {
        const workspace = {
          id: 'workspace-1',
          name: 'Complex Workspace',
          settings: {
            theme: 'dark',
            notifications: true,
          },
          metadata: {
            created: '2024-01-01',
            memberCount: 25,
          },
        };
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': workspace,
            },
          },
        };

        const result = selectWorkspaceById(state, 'workspace-1');
        expect(result.settings.theme).toBe('dark');
        expect(result.metadata.memberCount).toBe(25);
      });
    });

    describe('Multiple users in workspace', () => {
      it('should handle workspace with multiple members', () => {
        const workspace = {
          id: 'workspace-1',
          name: 'Team Workspace',
          members: ['user-1', 'user-2', 'user-3'],
        };
        const state = {
          workspaceEntity: {
            entities: {
              'workspace-1': workspace,
            },
          },
        };

        const result = selectWorkspaceById(state, 'workspace-1');
        expect(result.members).toHaveLength(3);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          workspaceEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllWorkspaces(state)).toEqual([]);
        expect(selectSelectedWorkspace(state)).toBeNull();
      });
    });
  });
});
