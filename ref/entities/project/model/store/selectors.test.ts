// ===================================================================
// Unit Tests for Project Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 4 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectProjectState,
  selectProjectEntities,
  selectProjectIds,
  selectProjectUI,
  selectHoveredProjectId,
  selectFocusedProjectId,
  selectSelectedProjectId,
  selectAllProjects,
  selectProjectById,
  selectProjectCheckStates,
  selectSelectedProject,
  selectProjectsByIds,
  makeSelectProjectById,
  makeSelectProjectsByIds,
  makeSelectProjectsByWorkspaceId,
  makeSelectProjectsByUserIdWorkspaceId,
  selectCurrentDatabaseType,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../../actorMember', () => ({
  makeSelectMemberByUserIdWorkspaceId: vi.fn((userId, workspaceId) => () => ({
    id: 'member-1',
    userId,
    workspaceId,
  })),
}));

vi.mock('../../../projectMember', () => ({
  makeSelectProjectIdsByMemberId: vi.fn((memberId) => () => ['project-1', 'project-2']),
}));

describe('Project Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectProjectState', () => {
      it('should return project entity state', () => {
        const projectState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          projectEntity: projectState,
        } as any;

        expect(selectProjectState(state)).toEqual(projectState);
      });
    });

    describe('selectProjectEntities', () => {
      it('should return project entities object', () => {
        const entities = {
          'project-1': { id: 'project-1', name: 'Project One', workspaceId: 'ws-1' },
          'project-2': { id: 'project-2', name: 'Project Two', workspaceId: 'ws-2' },
        };
        const state = {
          projectEntity: {
            entities,
          },
        } as any;

        expect(selectProjectEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        expect(selectProjectEntities(state)).toEqual({});
      });
    });

    describe('selectProjectIds', () => {
      it('should return project ids array', () => {
        const ids = ['project-1', 'project-2', 'project-3'];
        const state = {
          projectEntity: {
            ids,
          },
        } as any;

        expect(selectProjectIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          projectEntity: {
            ids: [],
          },
        } as any;

        expect(selectProjectIds(state)).toEqual([]);
      });
    });

    describe('selectProjectUI', () => {
      it('should return project UI state', () => {
        const uiState = {
          hoveredProjectId: 'project-1',
          focusedProjectId: 'project-2',
          selectedProjectId: 'project-3',
        };
        const state = {
          projectEntity: {
            ui: uiState,
          },
        } as any;

        expect(selectProjectUI(state)).toEqual(uiState);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredProjectId', () => {
      it('should return hovered project ID', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: 'project-hovered',
            },
          },
        } as any;

        expect(selectHoveredProjectId(state)).toBe('project-hovered');
      });

      it('should return null when no hovered project', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: null,
            },
          },
        } as any;

        expect(selectHoveredProjectId(state)).toBeNull();
      });
    });

    describe('selectFocusedProjectId', () => {
      it('should return focused project ID', () => {
        const state = {
          projectEntity: {
            ui: {
              focusedProjectId: 'project-focused',
            },
          },
        } as any;

        expect(selectFocusedProjectId(state)).toBe('project-focused');
      });

      it('should return null when no focused project', () => {
        const state = {
          projectEntity: {
            ui: {
              focusedProjectId: null,
            },
          },
        } as any;

        expect(selectFocusedProjectId(state)).toBeNull();
      });
    });

    describe('selectSelectedProjectId', () => {
      it('should return selected project ID', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: 'project-selected',
            },
          },
        } as any;

        expect(selectSelectedProjectId(state)).toBe('project-selected');
      });

      it('should return null when no selected project', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: null,
            },
          },
        } as any;

        expect(selectSelectedProjectId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectProjectCheckStates', () => {
      it('should return all check states as true for same project', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: 'project-1',
              focusedProjectId: 'project-1',
              selectedProjectId: 'project-1',
            },
          },
        } as any;

        const result = selectProjectCheckStates(state, 'project-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different project', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: 'project-1',
              focusedProjectId: 'project-2',
              selectedProjectId: 'project-3',
            },
          },
        } as any;

        const result = selectProjectCheckStates(state, 'project-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: 'project-1',
              focusedProjectId: 'project-1',
              selectedProjectId: 'project-2',
            },
          },
        } as any;

        const result = selectProjectCheckStates(state, 'project-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectProjectById', () => {
      it('should return project by ID', () => {
        const project = { id: 'project-1', name: 'Test Project' };
        const state = {
          projectEntity: {
            entities: {
              'project-1': project,
            },
          },
        } as any;

        expect(selectProjectById(state, 'project-1')).toEqual(project);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        expect(selectProjectById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedProject', () => {
      it('should return selected project', () => {
        const project = { id: 'project-selected', name: 'Selected Project' };
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: 'project-selected',
            },
            entities: {
              'project-selected': project,
            },
          },
        } as any;

        expect(selectSelectedProject(state)).toEqual(project);
      });

      it('should return null when no project selected', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: null,
            },
            entities: {},
          },
        } as any;

        expect(selectSelectedProject(state)).toBeNull();
      });

      it('should return undefined when selected project does not exist', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: 'non-existent',
            },
            entities: {},
          },
        } as any;

        expect(selectSelectedProject(state)).toBeUndefined();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllProjects', () => {
      it('should return all projects as array', () => {
        const entities = {
          'project-1': { id: 'project-1', name: 'Project One' },
          'project-2': { id: 'project-2', name: 'Project Two' },
          'project-3': { id: 'project-3', name: 'Project Three' },
        };
        const state = {
          projectEntity: {
            ids: ['project-1', 'project-2', 'project-3'],
            entities,
          },
        } as any;

        const result = selectAllProjects(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['project-1']);
        expect(result[1]).toEqual(entities['project-2']);
        expect(result[2]).toEqual(entities['project-3']);
      });

      it('should return empty array when no projects', () => {
        const state = {
          projectEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllProjects(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          projectEntity: {
            ids: ['project-3', 'project-1', 'project-2'],
            entities: {
              'project-1': { id: 'project-1', order: 1 },
              'project-2': { id: 'project-2', order: 2 },
              'project-3': { id: 'project-3', order: 3 },
            },
          },
        } as any;

        const result = selectAllProjects(state);
        expect(result[0].id).toBe('project-3');
        expect(result[1].id).toBe('project-1');
        expect(result[2].id).toBe('project-2');
      });
    });

    describe('selectProjectsByIds', () => {
      it('should return projects for given IDs', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'First' },
              'project-2': { id: 'project-2', name: 'Second' },
              'project-3': { id: 'project-3', name: 'Third' },
            },
          },
        } as any;

        const result = selectProjectsByIds(state, ['project-1', 'project-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent projects', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'First' },
            },
          },
        } as any;

        const result = selectProjectsByIds(state, ['project-1', 'non-existent']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        const result = selectProjectsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          projectEntity: {
            entities: null,
          },
        } as any;

        const result = selectProjectsByIds(state, ['project-1']);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectProjectById', () => {
      it('should create selector that returns project by ID', () => {
        const project = { id: 'project-1', name: 'Test Project' };
        const state = {
          projectEntity: {
            entities: {
              'project-1': project,
            },
          },
        } as any;

        const selector = makeSelectProjectById('project-1');
        expect(selector(state)).toEqual(project);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectProjectById('non-existent');
        expect(selector(state)).toBeNull();
      });
    });

    describe('makeSelectProjectsByIds', () => {
      it('should create selector that returns projects by IDs', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'First' },
              'project-2': { id: 'project-2', name: 'Second' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByIds(['project-1', 'project-2']);
        const result = selector(state);
        expect(result).toHaveLength(2);
      });

      it('should filter out non-existent projects', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'First' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByIds(['project-1', 'non-existent']);
        expect(selector(state)).toHaveLength(1);
      });

      it('should use empty array as default', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectProjectsByIds();
        expect(selector(state)).toEqual([]);
      });
    });

    describe('makeSelectProjectsByWorkspaceId', () => {
      it('should create selector that filters projects by workspace', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'Project 1', workspaceId: 'ws-1' },
              'project-2': { id: 'project-2', name: 'Project 2', workspaceId: 'ws-1' },
              'project-3': { id: 'project-3', name: 'Project 3', workspaceId: 'ws-2' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByWorkspaceId('ws-1');
        const result = selector(state);
        expect(result).toHaveLength(2);
        expect(result.every(p => p.workspaceId === 'ws-1')).toBe(true);
      });

      it('should return empty array when no matches', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', workspaceId: 'ws-1' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByWorkspaceId('ws-2');
        expect(selector(state)).toEqual([]);
      });

      it('should return empty array when workspaceId is null', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectProjectsByWorkspaceId(null as any);
        expect(selector(state)).toEqual([]);
      });
    });

    describe('makeSelectProjectsByUserIdWorkspaceId', () => {
      it('should return projects for user in workspace', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'Project 1', workspaceId: 'ws-1' },
              'project-2': { id: 'project-2', name: 'Project 2', workspaceId: 'ws-1' },
              'project-3': { id: 'project-3', name: 'Project 3', workspaceId: 'ws-2' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByUserIdWorkspaceId('user-1', 'ws-1');
        const result = selector(state);

        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      });

      it('should return empty array when userId is null', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectProjectsByUserIdWorkspaceId(null as any, 'ws-1');
        expect(selector(state)).toEqual([]);
      });

      it('should handle workspace with no projects', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'Project 1', workspaceId: 'ws-2' },
            },
          },
        } as any;

        const selector = makeSelectProjectsByUserIdWorkspaceId('user-1', 'ws-1');
        const result = selector(state);

        // Should return projects based on mocked member data
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });

  describe('Specific Feature Selectors', () => {
    describe('selectCurrentDatabaseType', () => {
      it('should return database type from selected project', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: 'project-1',
            },
            entities: {
              'project-1': {
                id: 'project-1',
                name: 'Test',
                settings: {
                  databaseType: 'postgresql',
                },
              },
            },
          },
        } as any;

        expect(selectCurrentDatabaseType(state)).toBe('postgresql');
      });

      it('should return undefined when no project selected', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: null,
            },
            entities: {},
          },
        } as any;

        expect(selectCurrentDatabaseType(state)).toBeUndefined();
      });

      it('should return undefined when project has no settings', () => {
        const state = {
          projectEntity: {
            ui: {
              selectedProjectId: 'project-1',
            },
            entities: {
              'project-1': {
                id: 'project-1',
                name: 'Test',
              },
            },
          },
        } as any;

        expect(selectCurrentDatabaseType(state)).toBeUndefined();
      });

      it('should handle various database types', () => {
        const dbTypes = ['postgresql', 'mysql', 'mongodb', 'sqlite'];

        dbTypes.forEach(dbType => {
          const state = {
            projectEntity: {
              ui: {
                selectedProjectId: 'project-1',
              },
              entities: {
                'project-1': {
                  id: 'project-1',
                  settings: {
                    databaseType: dbType,
                  },
                },
              },
            },
          } as any;

          expect(selectCurrentDatabaseType(state)).toBe(dbType);
        });
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex project data', () => {
      it('should handle projects with nested properties', () => {
        const project = {
          id: 'project-1',
          name: 'Complex Project',
          workspaceId: 'ws-1',
          settings: {
            databaseType: 'postgresql',
            theme: 'dark',
          },
          metadata: {
            created: '2024-01-01',
            tags: ['production', 'api'],
          },
        };
        const state = {
          projectEntity: {
            entities: {
              'project-1': project,
            },
          },
        } as any;

        const selector = makeSelectProjectById('project-1');
        const result = selector(state);

        expect(result?.settings?.theme).toBe('dark');
        expect(result?.metadata?.tags).toHaveLength(2);
      });
    });
  });
});

