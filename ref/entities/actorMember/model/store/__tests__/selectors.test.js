// ===================================================================
// Unit Tests for ActorMember Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 2 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectMemberState,
  selectMemberEntities,
  selectMemberIds,
  selectMemberUI,
  selectHoveredMemberId,
  selectFocusedMemberId,
  selectSelectedMemberId,
  selectMemberById,
  selectAllMembers,
  selectMemberCheckStates,
  selectSelectedMember,
  selectMembersById,
  makeSelectMemberById,
  selectMembersByIds,
  makeSelectMembersByIds,
  makeSelectUserMembersByUserId,
  makeSelectMemberByUserIdWorkspaceId,
} from '../selectors';

// Mock cross-entity selectors
vi.mock('@/entities/projectMember', () => ({
  makeSelectProjectIdsByMemberId: vi.fn((memberId) => () => ['project-1', 'project-2']),
}));

vi.mock('@/entities/project', () => ({
  selectProjectsByIds: vi.fn((state, ids) => ids.map(id => ({ id, name: `Project ${id}` }))),
}));

describe('ActorMember Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectMemberState', () => {
      it('should return member entity state', () => {
        const memberState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          memberEntity: memberState,
        };

        expect(selectMemberState(state)).toEqual(memberState);
      });
    });

    describe('selectMemberEntities', () => {
      it('should return member entities object', () => {
        const entities = {
          'member-1': { id: 'member-1', name: 'Member One', userId: 'user-1' },
          'member-2': { id: 'member-2', name: 'Member Two', userId: 'user-2' },
        };
        const state = {
          memberEntity: {
            entities,
          },
        };

        expect(selectMemberEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        expect(selectMemberEntities(state)).toEqual({});
      });
    });

    describe('selectMemberIds', () => {
      it('should return member ids array', () => {
        const ids = ['member-1', 'member-2', 'member-3'];
        const state = {
          memberEntity: {
            ids,
          },
        };

        expect(selectMemberIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          memberEntity: {
            ids: [],
          },
        };

        expect(selectMemberIds(state)).toEqual([]);
      });
    });

    describe('selectMemberUI', () => {
      it('should return member UI state', () => {
        const uiState = {
          hoveredMemberId: 'member-1',
          focusedMemberId: 'member-2',
          selectedMemberId: 'member-3',
        };
        const state = {
          memberEntity: {
            ui: uiState,
          },
        };

        expect(selectMemberUI(state)).toEqual(uiState);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredMemberId', () => {
      it('should return hovered member ID', () => {
        const state = {
          memberEntity: {
            ui: {
              hoveredMemberId: 'member-hovered',
            },
          },
        };

        expect(selectHoveredMemberId(state)).toBe('member-hovered');
      });

      it('should return null when no hovered member', () => {
        const state = {
          memberEntity: {
            ui: {
              hoveredMemberId: null,
            },
          },
        };

        expect(selectHoveredMemberId(state)).toBeNull();
      });
    });

    describe('selectFocusedMemberId', () => {
      it('should return focused member ID', () => {
        const state = {
          memberEntity: {
            ui: {
              focusedMemberId: 'member-focused',
            },
          },
        };

        expect(selectFocusedMemberId(state)).toBe('member-focused');
      });

      it('should return null when no focused member', () => {
        const state = {
          memberEntity: {
            ui: {
              focusedMemberId: null,
            },
          },
        };

        expect(selectFocusedMemberId(state)).toBeNull();
      });
    });

    describe('selectSelectedMemberId', () => {
      it('should return selected member ID', () => {
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: 'member-selected',
            },
          },
        };

        expect(selectSelectedMemberId(state)).toBe('member-selected');
      });

      it('should return null when no selected member', () => {
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: null,
            },
          },
        };

        expect(selectSelectedMemberId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectMemberCheckStates', () => {
      it('should return all check states as true for same member', () => {
        const state = {
          memberEntity: {
            ui: {
              hoveredMemberId: 'member-1',
              focusedMemberId: 'member-1',
              selectedMemberId: 'member-1',
            },
          },
        };

        const result = selectMemberCheckStates(state, 'member-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different member', () => {
        const state = {
          memberEntity: {
            ui: {
              hoveredMemberId: 'member-1',
              focusedMemberId: 'member-2',
              selectedMemberId: 'member-3',
            },
          },
        };

        const result = selectMemberCheckStates(state, 'member-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          memberEntity: {
            ui: {
              hoveredMemberId: 'member-1',
              focusedMemberId: 'member-1',
              selectedMemberId: 'member-2',
            },
          },
        };

        const result = selectMemberCheckStates(state, 'member-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectMemberById', () => {
      it('should return member by ID', () => {
        const member = { id: 'member-1', name: 'Test Member', userId: 'user-1' };
        const state = {
          memberEntity: {
            entities: {
              'member-1': member,
            },
          },
        };

        expect(selectMemberById(state, 'member-1')).toEqual(member);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        expect(selectMemberById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedMember', () => {
      it('should return selected member', () => {
        const member = { id: 'member-selected', name: 'Selected Member' };
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: 'member-selected',
            },
            entities: {
              'member-selected': member,
            },
          },
        };

        expect(selectSelectedMember(state)).toEqual(member);
      });

      it('should return null when no member selected', () => {
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedMember(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: 'member-1',
            },
            entities: null,
          },
        };

        expect(selectSelectedMember(state)).toBeNull();
      });

      it('should return null when selected member does not exist', () => {
        const state = {
          memberEntity: {
            ui: {
              selectedMemberId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedMember(state)).toBeNull();
      });
    });

    describe('selectMembersById', () => {
      it('should return member by ID', () => {
        const member = { id: 'member-1', name: 'Test' };
        const state = {
          memberEntity: {
            entities: {
              'member-1': member,
            },
          },
        };

        expect(selectMembersById(state, 'member-1')).toEqual(member);
      });

      it('should return empty array when id is null', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        expect(selectMembersById(state, null)).toEqual([]);
      });

      it('should return null when member does not exist', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        expect(selectMembersById(state, 'non-existent')).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllMembers', () => {
      it('should return all members as array', () => {
        const entities = {
          'member-1': { id: 'member-1', name: 'Member One' },
          'member-2': { id: 'member-2', name: 'Member Two' },
        };
        const state = {
          memberEntity: {
            ids: ['member-1', 'member-2'],
            entities,
          },
        };

        const result = selectAllMembers(state);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(entities['member-1']);
        expect(result[1]).toEqual(entities['member-2']);
      });

      it('should return empty array when no members', () => {
        const state = {
          memberEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllMembers(state)).toEqual([]);
      });
    });

    describe('selectMembersByIds', () => {
      it('should return members for given IDs', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', name: 'First' },
              'member-2': { id: 'member-2', name: 'Second' },
              'member-3': { id: 'member-3', name: 'Third' },
            },
          },
        };

        const result = selectMembersByIds(state, ['member-1', 'member-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent members', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', name: 'First' },
            },
          },
        };

        const result = selectMembersByIds(state, ['member-1', 'non-existent']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        const result = selectMembersByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          memberEntity: {
            entities: null,
          },
        };

        const result = selectMembersByIds(state, ['member-1']);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectMembersById', () => {
      it('should create selector that returns member by ID', () => {
        const member = { id: 'member-1', name: 'Test Member' };
        const state = {
          memberEntity: {
            entities: {
              'member-1': member,
            },
          },
        };

        const selector = makeSelectMemberById('member-1');
        expect(selector(state)).toEqual(member);
      });

      it('should return empty array when id is null', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        const selector = makeSelectMemberById(null);
        expect(selector(state)).toEqual([]);
      });
    });

    describe('makeSelectMembersByIds', () => {
      it('should create selector that returns members by IDs', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', name: 'First' },
              'member-2': { id: 'member-2', name: 'Second' },
            },
          },
        };

        const selector = makeSelectMembersByIds(['member-1', 'member-2']);
        const result = selector(state);
        expect(result).toHaveLength(2);
      });

      it('should filter out non-existent members', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', name: 'First' },
            },
          },
        };

        const selector = makeSelectMembersByIds(['member-1', 'non-existent']);
        expect(selector(state)).toHaveLength(1);
      });
    });

    describe('makeSelectUserMembersByUserId', () => {
      it('should create selector that returns members for user', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', userId: 'user-1', name: 'First' },
              'member-2': { id: 'member-2', userId: 'user-1', name: 'Second' },
              'member-3': { id: 'member-3', userId: 'user-2', name: 'Third' },
            },
          },
        };

        const selector = makeSelectUserMembersByUserId('user-1');
        const result = selector(state);
        expect(result).toHaveLength(2);
        expect(result.every(m => m.userId === 'user-1')).toBe(true);
      });

      it('should return empty array when no matches', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', userId: 'user-1' },
            },
          },
        };

        const selector = makeSelectUserMembersByUserId('user-2');
        const result = selector(state);
        expect(result).toHaveLength(0);
      });
    });

    describe('makeSelectMemberByUserIdWorkspaceId', () => {
      it('should create selector that finds member by userId and workspaceId', () => {
        const targetMember = { id: 'member-2', userId: 'user-1', workspaceId: 'workspace-1' };
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', userId: 'user-1', workspaceId: 'workspace-2' },
              'member-2': targetMember,
              'member-3': { id: 'member-3', userId: 'user-2', workspaceId: 'workspace-1' },
            },
          },
        };

        const selector = makeSelectMemberByUserIdWorkspaceId('user-1', 'workspace-1');
        expect(selector(state)).toEqual(targetMember);
      });

      it('should return null when no match', () => {
        const state = {
          memberEntity: {
            entities: {
              'member-1': { id: 'member-1', userId: 'user-1', workspaceId: 'workspace-1' },
            },
          },
        };

        const selector = makeSelectMemberByUserIdWorkspaceId('user-2', 'workspace-2');
        expect(selector(state)).toBeNull();
      });

      it('should return null when id is null', () => {
        const state = {
          memberEntity: {
            entities: {},
          },
        };

        const selector = makeSelectMemberByUserIdWorkspaceId(null, 'workspace-1');
        expect(selector(state)).toBeNull();
      });
    });
  });
});

