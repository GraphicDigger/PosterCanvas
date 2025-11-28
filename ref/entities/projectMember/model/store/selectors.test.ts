// ===================================================================
// Unit Tests for ProjectMember Entity Redux Selectors
// Coverage Target: 95%+
// Final Push Phase (Selector Testing - Toward 2,200!)
// ===================================================================

import { describe, it, expect } from 'vitest';
import {
  selectProjectMemberState,
  selectProjectMemberEntities,
  selectProjectMemberIds,
  selectHoveredProjectMemberId,
  selectFocusedProjectMemberId,
  selectSelectedProjectMemberId,
  selectProjectMemberCheckStates,
  selectAllProjectMembers,
  selectSelectedProjectMember,
  makeSelectMemberIdsByProjectId,
  makeSelectProjectIdsByMemberId,
} from './selectors';

describe('ProjectMember Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectProjectMemberState', () => {
      it('should return project member entity state', () => {
        const projectMemberState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          projectMemberEntity: projectMemberState,
        } as any;

        expect(selectProjectMemberState(state)).toEqual(projectMemberState);
      });
    });

    describe('selectProjectMemberEntities', () => {
      it('should return project member entities object', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1', role: 'admin' },
          'pm-2': { id: 'pm-2', projectId: 'project-1', memberId: 'member-2', role: 'viewer' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        expect(selectProjectMemberEntities(state)).toEqual(entities);
      });
    });

    describe('selectProjectMemberIds', () => {
      it('should return project member ids array', () => {
        const ids = ['pm-1', 'pm-2', 'pm-3'];
        const state = {
          projectMemberEntity: {
            ids,
          },
        } as any;

        expect(selectProjectMemberIds(state)).toEqual(ids);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredProjectMemberId', () => {
      it('should return hovered project member ID', () => {
        const state = {
          projectMemberEntity: {
            hoveredId: 'pm-hovered',
          },
        } as any;

        expect(selectHoveredProjectMemberId(state)).toBe('pm-hovered');
      });

      it('should return null when no project member hovered', () => {
        const state = {
          projectMemberEntity: {
            hoveredId: null,
          },
        } as any;

        expect(selectHoveredProjectMemberId(state)).toBeNull();
      });
    });

    describe('selectFocusedProjectMemberId', () => {
      it('should return focused project member ID', () => {
        const state = {
          projectMemberEntity: {
            focusedId: 'pm-focused',
          },
        } as any;

        expect(selectFocusedProjectMemberId(state)).toBe('pm-focused');
      });
    });

    describe('selectSelectedProjectMemberId', () => {
      it('should return selected project member ID', () => {
        const state = {
          projectMemberEntity: {
            selectedId: 'pm-selected',
          },
        } as any;

        expect(selectSelectedProjectMemberId(state)).toBe('pm-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectProjectMemberCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          projectMemberEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectProjectMemberCheckStates(state, 'pm-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when project member is selected', () => {
        const state = {
          projectMemberEntity: {
            selectedId: 'pm-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectProjectMemberCheckStates(state, 'pm-1');
        expect(result.isSelected).toBe(true);
        expect(result.isFocused).toBe(false);
        expect(result.isHovered).toBe(false);
      });

      it('should return isFocused true when project member is focused', () => {
        const state = {
          projectMemberEntity: {
            selectedId: null,
            focusedId: 'pm-2',
            hoveredId: null,
          },
        } as any;

        const result = selectProjectMemberCheckStates(state, 'pm-2');
        expect(result.isFocused).toBe(true);
      });

      it('should return isHovered true when project member is hovered', () => {
        const state = {
          projectMemberEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: 'pm-3',
          },
        } as any;

        const result = selectProjectMemberCheckStates(state, 'pm-3');
        expect(result.isHovered).toBe(true);
      });

      it('should return all true when project member has all states', () => {
        const state = {
          projectMemberEntity: {
            selectedId: 'pm-1',
            focusedId: 'pm-1',
            hoveredId: 'pm-1',
          },
        } as any;

        const result = selectProjectMemberCheckStates(state, 'pm-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllProjectMembers', () => {
      it('should return all project members as array', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
          'pm-2': { id: 'pm-2', projectId: 'project-1', memberId: 'member-2' },
        };
        const state = {
          projectMemberEntity: {
            ids: ['pm-1', 'pm-2'],
            entities,
          },
        } as any;

        const result = selectAllProjectMembers(state);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(entities['pm-1']);
      });

      it('should filter out undefined entries', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
        };
        const state = {
          projectMemberEntity: {
            ids: ['pm-1', 'pm-missing'],
            entities,
          },
        } as any;

        const result = selectAllProjectMembers(state);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          projectMemberEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        const result = selectAllProjectMembers(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectSelectedProjectMember', () => {
      it('should return selected project member', () => {
        const projectMember = { id: 'pm-selected', projectId: 'project-1', memberId: 'member-1' };
        const state = {
          projectMemberEntity: {
            selectedId: 'pm-selected',
            entities: {
              'pm-selected': projectMember,
            },
          },
        } as any;

        expect(selectSelectedProjectMember(state)).toEqual(projectMember);
      });

      it('should return null when no project member selected', () => {
        const state = {
          projectMemberEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedProjectMember(state)).toBeNull();
      });

      it('should return null when selected project member does not exist', () => {
        const state = {
          projectMemberEntity: {
            selectedId: 'pm-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedProjectMember(state)).toBeNull();
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectMemberIdsByProjectId', () => {
      it('should return member IDs for given project', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
          'pm-2': { id: 'pm-2', projectId: 'project-1', memberId: 'member-2' },
          'pm-3': { id: 'pm-3', projectId: 'project-2', memberId: 'member-3' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector = makeSelectMemberIdsByProjectId('project-1');
        const result = selector(state);

        expect(result).toHaveLength(2);
        expect(result).toContain('member-1');
        expect(result).toContain('member-2');
      });

      it('should return empty array when project has no members', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector = makeSelectMemberIdsByProjectId('project-unknown');
        const result = selector(state);

        expect(result).toEqual([]);
      });

      it('should create independent selectors', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
          'pm-2': { id: 'pm-2', projectId: 'project-2', memberId: 'member-2' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector1 = makeSelectMemberIdsByProjectId('project-1');
        const selector2 = makeSelectMemberIdsByProjectId('project-2');

        expect(selector1(state)).toEqual(['member-1']);
        expect(selector2(state)).toEqual(['member-2']);
      });
    });

    describe('makeSelectProjectIdsByMemberId', () => {
      it('should return project IDs for given member', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
          'pm-2': { id: 'pm-2', projectId: 'project-2', memberId: 'member-1' },
          'pm-3': { id: 'pm-3', projectId: 'project-3', memberId: 'member-2' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector = makeSelectProjectIdsByMemberId('member-1');
        const result = selector(state);

        expect(result).toHaveLength(2);
        expect(result).toContain('project-1');
        expect(result).toContain('project-2');
      });

      it('should return empty array when member has no projects', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector = makeSelectProjectIdsByMemberId('member-unknown');
        const result = selector(state);

        expect(result).toEqual([]);
      });

      it('should create independent selectors', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1' },
          'pm-2': { id: 'pm-2', projectId: 'project-2', memberId: 'member-2' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector1 = makeSelectProjectIdsByMemberId('member-1');
        const selector2 = makeSelectProjectIdsByMemberId('member-2');

        expect(selector1(state)).toEqual(['project-1']);
        expect(selector2(state)).toEqual(['project-2']);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Multiple roles', () => {
      it('should handle members with different roles in same project', () => {
        const entities = {
          'pm-1': { id: 'pm-1', projectId: 'project-1', memberId: 'member-1', role: 'admin' },
          'pm-2': { id: 'pm-2', projectId: 'project-1', memberId: 'member-2', role: 'viewer' },
          'pm-3': { id: 'pm-3', projectId: 'project-1', memberId: 'member-3', role: 'editor' },
        };
        const state = {
          projectMemberEntity: {
            entities,
          },
        } as any;

        const selector = makeSelectMemberIdsByProjectId('project-1');
        const result = selector(state);

        expect(result).toHaveLength(3);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          projectMemberEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllProjectMembers(state)).toEqual([]);
        expect(selectSelectedProjectMember(state)).toBeNull();
      });
    });
  });
});

