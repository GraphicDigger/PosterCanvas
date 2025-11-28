// ===================================================================
// Unit Tests for Project Entity Redux Selectors
// Coverage Target: 95%+
// Week 3 - Day 2 (Selector Testing)
// ===================================================================

import { describe, it, expect } from 'vitest';
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
  selectCurrentDatabaseType,
} from './selectors';

describe('Project Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectProjectState', () => {
      it('should return project entity state', () => {
        const state = {
          projectEntity: {
            ids: ['project-1'],
            entities: {},
            ui: {},
          },
        };

        expect(selectProjectState(state)).toEqual(state.projectEntity);
      });
    });

    describe('selectProjectEntities', () => {
      it('should return project entities object', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'Test Project' },
            },
          },
        };

        expect(selectProjectEntities(state)).toEqual(state.projectEntity.entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        };

        expect(selectProjectEntities(state)).toEqual({});
      });
    });

    describe('selectProjectIds', () => {
      it('should return project ids array', () => {
        const state = {
          projectEntity: {
            ids: ['project-1', 'project-2'],
          },
        };

        expect(selectProjectIds(state)).toEqual(['project-1', 'project-2']);
      });

      it('should return empty array when no ids', () => {
        const state = {
          projectEntity: {
            ids: [],
          },
        };

        expect(selectProjectIds(state)).toEqual([]);
      });
    });

    describe('selectProjectUI', () => {
      it('should return project UI state', () => {
        const state = {
          projectEntity: {
            ui: {
              hoveredProjectId: null,
              focusedProjectId: null,
              selectedProjectId: null,
            },
          },
        };

        expect(selectProjectUI(state)).toEqual(state.projectEntity.ui);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredProjectId', () => {
      it('should return hovered project id', () => {
        const state = {
          projectEntity: {
            ui: { hoveredProjectId: 'project-123' },
          },
        };

        expect(selectHoveredProjectId(state)).toBe('project-123');
      });

      it('should return null when no project is hovered', () => {
        const state = {
          projectEntity: {
            ui: { hoveredProjectId: null },
          },
        };

        expect(selectHoveredProjectId(state)).toBeNull();
      });
    });

    describe('selectFocusedProjectId', () => {
      it('should return focused project id', () => {
        const state = {
          projectEntity: {
            ui: { focusedProjectId: 'project-456' },
          },
        };

        expect(selectFocusedProjectId(state)).toBe('project-456');
      });

      it('should return null when no project is focused', () => {
        const state = {
          projectEntity: {
            ui: { focusedProjectId: null },
          },
        };

        expect(selectFocusedProjectId(state)).toBeNull();
      });
    });

    describe('selectSelectedProjectId', () => {
      it('should return selected project id', () => {
        const state = {
          projectEntity: {
            ui: { selectedProjectId: 'project-789' },
          },
        };

        expect(selectSelectedProjectId(state)).toBe('project-789');
      });

      it('should return null when no project is selected', () => {
        const state = {
          projectEntity: {
            ui: { selectedProjectId: null },
          },
        };

        expect(selectSelectedProjectId(state)).toBeNull();
      });
    });
  });

  describe('Entity Selectors', () => {
    describe('selectProjectById', () => {
      it('should return project by id', () => {
        const state = {
          projectEntity: {
            entities: {
              'project-1': { id: 'project-1', name: 'Test Project' },
            },
          },
        };

        const result = selectProjectById(state, 'project-1');

        expect(result).toEqual({ id: 'project-1', name: 'Test Project' });
      });

      it('should return undefined for non-existent id', () => {
        const state = {
          projectEntity: {
            entities: {},
          },
        };

        const result = selectProjectById(state, 'non-existent');

        expect(result).toBeUndefined();
      });
    });

    describe('selectAllProjects', () => {
      it('should return all projects in order', () => {
        const state = {
          projectEntity: {
            ids: ['project-1', 'project-2', 'project-3'],
            entities: {
              'project-1': { id: 'project-1', name: 'Project 1' },
              'project-2': { id: 'project-2', name: 'Project 2' },
              'project-3': { id: 'project-3', name: 'Project 3' },
            },
          },
        };

        const result = selectAllProjects(state);

        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ id: 'project-1', name: 'Project 1' });
        expect(result[1]).toEqual({ id: 'project-2', name: 'Project 2' });
        expect(result[2]).toEqual({ id: 'project-3', name: 'Project 3' });
      });

      it('should return empty array when no projects', () => {
        const state = {
          projectEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectAllProjects(state);

        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          projectEntity: {
            ids: ['project-3', 'project-1', 'project-2'],
            entities: {
              'project-1': { id: 'project-1' },
              'project-2': { id: 'project-2' },
              'project-3': { id: 'project-3' },
            },
          },
        };

        const result = selectAllProjects(state);

        expect(result.map(p => p.id)).toEqual(['project-3', 'project-1', 'project-2']);
      });
    });
  });

  describe('selectProjectCheckStates', () => {
    it('should return all check states for a project', () => {
      const state = {
        projectEntity: {
          ui: {
            selectedProjectId: 'project-1',
            focusedProjectId: 'project-2',
            hoveredProjectId: 'project-3',
          },
        },
      };

      const result = selectProjectCheckStates(state, 'project-1');

      expect(result).toEqual({
        isSelected: true,
        isFocused: false,
        isHovered: false,
      });
    });

    it('should return all false when project matches none', () => {
      const state = {
        projectEntity: {
          ui: {
            selectedProjectId: 'project-1',
            focusedProjectId: 'project-2',
            hoveredProjectId: 'project-3',
          },
        },
      };

      const result = selectProjectCheckStates(state, 'project-999');

      expect(result).toEqual({
        isSelected: false,
        isFocused: false,
        isHovered: false,
      });
    });

    it('should handle multiple states for same project', () => {
      const state = {
        projectEntity: {
          ui: {
            selectedProjectId: 'project-1',
            focusedProjectId: 'project-1',
            hoveredProjectId: 'project-1',
          },
        },
      };

      const result = selectProjectCheckStates(state, 'project-1');

      expect(result).toEqual({
        isSelected: true,
        isFocused: true,
        isHovered: true,
      });
    });

    it('should handle partially matching states', () => {
      const state = {
        projectEntity: {
          ui: {
            selectedProjectId: 'project-1',
            focusedProjectId: null,
            hoveredProjectId: 'project-1',
          },
        },
      };

      const result = selectProjectCheckStates(state, 'project-1');

      expect(result).toEqual({
        isSelected: true,
        isFocused: false,
        isHovered: true,
      });
    });
  });

  describe('selectSelectedProject', () => {
    it('should return selected project', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'project-1' },
          entities: {
            'project-1': { id: 'project-1', name: 'Selected Project' },
          },
        },
      };

      const result = selectSelectedProject(state);

      expect(result).toEqual({ id: 'project-1', name: 'Selected Project' });
    });

    it('should return null when no project is selected', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: null },
          entities: {},
        },
      };

      const result = selectSelectedProject(state);

      expect(result).toBeNull();
    });

    it('should return undefined when selected project does not exist', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'non-existent' },
          entities: {},
        },
      };

      const result = selectSelectedProject(state);

      expect(result).toBeUndefined();
    });

    it('should handle undefined selectedProjectId', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: undefined },
          entities: {
            'project-1': { id: 'project-1' },
          },
        },
      };

      const result = selectSelectedProject(state);

      expect(result).toBeNull();
    });

    it('should handle empty string selectedProjectId', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: '' },
          entities: {
            'project-1': { id: 'project-1' },
          },
        },
      };

      const result = selectSelectedProject(state);

      expect(result).toBeNull();
    });
  });

  describe('selectProjectsByIds', () => {
    it('should return projects by ids array', () => {
      const state = {
        projectEntity: {
          entities: {
            'project-1': { id: 'project-1', name: 'Project 1' },
            'project-2': { id: 'project-2', name: 'Project 2' },
            'project-3': { id: 'project-3', name: 'Project 3' },
          },
        },
      };

      const result = selectProjectsByIds(state, ['project-1', 'project-3']);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'project-1', name: 'Project 1' });
      expect(result[1]).toEqual({ id: 'project-3', name: 'Project 3' });
    });

    it('should filter out non-existent ids', () => {
      const state = {
        projectEntity: {
          entities: {
            'project-1': { id: 'project-1', name: 'Project 1' },
          },
        },
      };

      const result = selectProjectsByIds(state, ['project-1', 'non-existent']);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'project-1', name: 'Project 1' });
    });

    it('should return empty array when ids is null', () => {
      const state = {
        projectEntity: {
          entities: {
            'project-1': { id: 'project-1' },
          },
        },
      };

      const result = selectProjectsByIds(state, null);

      expect(result).toEqual([]);
    });

    it('should return empty array when ids is undefined', () => {
      const state = {
        projectEntity: {
          entities: {
            'project-1': { id: 'project-1' },
          },
        },
      };

      const result = selectProjectsByIds(state, undefined);

      expect(result).toEqual([]);
    });

    it('should return empty array when entities is null', () => {
      const state = {
        projectEntity: {
          entities: null,
        },
      };

      const result = selectProjectsByIds(state, ['project-1']);

      expect(result).toEqual([]);
    });

    it('should maintain order from ids array', () => {
      const state = {
        projectEntity: {
          entities: {
            'project-1': { id: 'project-1' },
            'project-2': { id: 'project-2' },
            'project-3': { id: 'project-3' },
          },
        },
      };

      const result = selectProjectsByIds(state, ['project-3', 'project-1']);

      expect(result.map(p => p.id)).toEqual(['project-3', 'project-1']);
    });
  });

  describe('selectCurrentDatabaseType', () => {
    it('should return database type from selected project', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'project-1' },
          entities: {
            'project-1': {
              id: 'project-1',
              settings: {
                databaseType: 'postgresql',
              },
            },
          },
        },
      };

      const result = selectCurrentDatabaseType(state);

      expect(result).toBe('postgresql');
    });

    it('should return undefined when no project is selected', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: null },
          entities: {},
        },
      };

      const result = selectCurrentDatabaseType(state);

      expect(result).toBeUndefined();
    });

    it('should return undefined when project has no settings', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'project-1' },
          entities: {
            'project-1': {
              id: 'project-1',
            },
          },
        },
      };

      const result = selectCurrentDatabaseType(state);

      expect(result).toBeUndefined();
    });

    it('should return undefined when settings has no databaseType', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'project-1' },
          entities: {
            'project-1': {
              id: 'project-1',
              settings: {},
            },
          },
        },
      };

      const result = selectCurrentDatabaseType(state);

      expect(result).toBeUndefined();
    });

    it('should handle various database types', () => {
      const databaseTypes = ['mysql', 'mongodb', 'sqlite', 'firebase'];

      databaseTypes.forEach(dbType => {
        const state = {
          projectEntity: {
            ui: { selectedProjectId: 'project-1' },
            entities: {
              'project-1': {
                id: 'project-1',
                settings: {
                  databaseType: dbType,
                },
              },
            },
          },
        };

        const result = selectCurrentDatabaseType(state);
        expect(result).toBe(dbType);
      });
    });

    it('should handle null databaseType', () => {
      const state = {
        projectEntity: {
          ui: { selectedProjectId: 'project-1' },
          entities: {
            'project-1': {
              id: 'project-1',
              settings: {
                databaseType: null,
              },
            },
          },
        },
      };

      const result = selectCurrentDatabaseType(state);

      expect(result).toBeNull();
    });
  });
});

