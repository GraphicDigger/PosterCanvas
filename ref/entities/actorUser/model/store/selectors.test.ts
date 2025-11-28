// ===================================================================
// Unit Tests for ActorUser Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 4 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectUserState,
  selectUserEntities,
  selectUserIds,
  selectHoveredUserId,
  selectFocusedUserId,
  selectSelectedUserId,
  selectUserCheckStates,
  selectAllUsers,
  selectAllUserIds,
  selectSelectedUser,
  makeSelectUserById,
  makeSelectUsersByIds,
  makeSelectCompositeUserById,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../../actorMember', () => ({
  makeSelectUserMembersByUserId: vi.fn((userId) => () => [
    { id: 'member-1', userId, workspaceId: 'workspace-1' },
    { id: 'member-2', userId, workspaceId: 'workspace-2' },
  ]),
}));

vi.mock('../../../projectMember', () => ({
  selectAllProjectMembers: vi.fn(() => [
    { id: 'pm-1', memberId: 'member-1', projectId: 'project-1' },
    { id: 'pm-2', memberId: 'member-2', projectId: 'project-2' },
  ]),
}));

vi.mock('../../../project', () => ({
  selectProjectEntities: vi.fn(() => ({
    'project-1': { id: 'project-1', name: 'Project One' },
    'project-2': { id: 'project-2', name: 'Project Two' },
  })),
}));

describe('ActorUser Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectUserState', () => {
      it('should return user entity state', () => {
        const userState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          userEntity: userState,
        } as any;

        expect(selectUserState(state)).toEqual(userState);
      });
    });

    describe('selectUserEntities', () => {
      it('should return user entities object', () => {
        const entities = {
          'user-1': { id: 'user-1', name: 'John Doe', email: 'john@test.com' },
          'user-2': { id: 'user-2', name: 'Jane Smith', email: 'jane@test.com' },
        };
        const state = {
          userEntity: {
            entities,
          },
        } as any;

        expect(selectUserEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          userEntity: {
            entities: {},
          },
        } as any;

        expect(selectUserEntities(state)).toEqual({});
      });
    });

    describe('selectUserIds', () => {
      it('should return user ids array', () => {
        const ids = ['user-1', 'user-2', 'user-3'];
        const state = {
          userEntity: {
            ids,
          },
        } as any;

        expect(selectUserIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          userEntity: {
            ids: [],
          },
        } as any;

        expect(selectUserIds(state)).toEqual([]);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredUserId', () => {
      it('should return hovered user ID', () => {
        const state = {
          userEntity: {
            hoveredId: 'user-hovered',
          },
        } as any;

        expect(selectHoveredUserId(state)).toBe('user-hovered');
      });

      it('should return null when no hovered user', () => {
        const state = {
          userEntity: {
            hoveredId: null,
          },
        } as any;

        expect(selectHoveredUserId(state)).toBeNull();
      });
    });

    describe('selectFocusedUserId', () => {
      it('should return focused user ID', () => {
        const state = {
          userEntity: {
            focusedId: 'user-focused',
          },
        } as any;

        expect(selectFocusedUserId(state)).toBe('user-focused');
      });

      it('should return null when no focused user', () => {
        const state = {
          userEntity: {
            focusedId: null,
          },
        } as any;

        expect(selectFocusedUserId(state)).toBeNull();
      });
    });

    describe('selectSelectedUserId', () => {
      it('should return selected user ID', () => {
        const state = {
          userEntity: {
            selectedId: 'user-selected',
          },
        } as any;

        expect(selectSelectedUserId(state)).toBe('user-selected');
      });

      it('should return null when no selected user', () => {
        const state = {
          userEntity: {
            selectedId: null,
          },
        } as any;

        expect(selectSelectedUserId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectUserCheckStates', () => {
      it('should return all check states as true for same user', () => {
        const state = {
          userEntity: {
            hoveredId: 'user-1',
            focusedId: 'user-1',
            selectedId: 'user-1',
          },
        } as any;

        const result = selectUserCheckStates(state, 'user-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different user', () => {
        const state = {
          userEntity: {
            hoveredId: 'user-1',
            focusedId: 'user-2',
            selectedId: 'user-3',
          },
        } as any;

        const result = selectUserCheckStates(state, 'user-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          userEntity: {
            hoveredId: 'user-1',
            focusedId: 'user-1',
            selectedId: 'user-2',
          },
        } as any;

        const result = selectUserCheckStates(state, 'user-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllUsers', () => {
      it('should return all users as array', () => {
        const entities = {
          'user-1': { id: 'user-1', name: 'John Doe' },
          'user-2': { id: 'user-2', name: 'Jane Smith' },
          'user-3': { id: 'user-3', name: 'Bob Johnson' },
        };
        const state = {
          userEntity: {
            ids: ['user-1', 'user-2', 'user-3'],
            entities,
          },
        } as any;

        const result = selectAllUsers(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['user-1']);
        expect(result[1]).toEqual(entities['user-2']);
        expect(result[2]).toEqual(entities['user-3']);
      });

      it('should return empty array when no users', () => {
        const state = {
          userEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllUsers(state)).toEqual([]);
      });

      it('should handle null ids gracefully', () => {
        const state = {
          userEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllUsers(state)).toEqual([]);
      });

      it('should filter out undefined users', () => {
        const state = {
          userEntity: {
            ids: ['user-1', 'non-existent', 'user-2'],
            entities: {
              'user-1': { id: 'user-1', name: 'John' },
              'user-2': { id: 'user-2', name: 'Jane' },
            },
          },
        } as any;

        const result = selectAllUsers(state);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('user-1');
        expect(result[1].id).toBe('user-2');
      });

      it('should maintain order based on ids array', () => {
        const state = {
          userEntity: {
            ids: ['user-3', 'user-1', 'user-2'],
            entities: {
              'user-1': { id: 'user-1', name: 'First' },
              'user-2': { id: 'user-2', name: 'Second' },
              'user-3': { id: 'user-3', name: 'Third' },
            },
          },
        } as any;

        const result = selectAllUsers(state);
        expect(result[0].id).toBe('user-3');
        expect(result[1].id).toBe('user-1');
        expect(result[2].id).toBe('user-2');
      });
    });

    describe('selectAllUserIds', () => {
      it('should return all user IDs', () => {
        const ids = ['user-1', 'user-2', 'user-3'];
        const state = {
          userEntity: {
            ids,
          },
        } as any;

        expect(selectAllUserIds(state)).toEqual(ids);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          userEntity: {
            ids: null,
          },
        } as any;

        expect(selectAllUserIds(state)).toEqual([]);
      });

      it('should return empty array when ids is undefined', () => {
        const state = {
          userEntity: {},
        } as any;

        expect(selectAllUserIds(state)).toEqual([]);
      });
    });
  });

  describe('Selected User Selectors', () => {
    describe('selectSelectedUser', () => {
      it('should return selected user', () => {
        const user = { id: 'user-selected', name: 'Selected User' };
        const state = {
          userEntity: {
            selectedId: 'user-selected',
            entities: {
              'user-selected': user,
            },
          },
        } as any;

        expect(selectSelectedUser(state)).toEqual(user);
      });

      it('should return null when no user selected', () => {
        const state = {
          userEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedUser(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          userEntity: {
            selectedId: 'user-1',
            entities: null,
          },
        } as any;

        expect(selectSelectedUser(state)).toBeNull();
      });

      it('should return null when selected user does not exist', () => {
        const state = {
          userEntity: {
            selectedId: 'non-existent',
            entities: {},
          },
        } as any;

        expect(selectSelectedUser(state)).toBeNull();
      });
    });
  });

  describe('Factory Selectors', () => {
    describe('makeSelectUserById', () => {
      it('should create selector that returns user by ID', () => {
        const user = { id: 'user-1', name: 'Test User', email: 'test@user.com' };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectUserById('user-1');
        expect(selector(state)).toEqual(user);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          userEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectUserById('non-existent');
        expect(selector(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          userEntity: {
            entities: null,
          },
        } as any;

        const selector = makeSelectUserById('user-1');
        expect(selector(state)).toBeNull();
      });

      it('should return null when entities is undefined', () => {
        const state = {
          userEntity: {},
        } as any;

        const selector = makeSelectUserById('user-1');
        expect(selector(state)).toBeNull();
      });
    });

    describe('makeSelectUsersByIds', () => {
      it('should create selector that returns users by IDs', () => {
        const state = {
          userEntity: {
            entities: {
              'user-1': { id: 'user-1', name: 'First' },
              'user-2': { id: 'user-2', name: 'Second' },
              'user-3': { id: 'user-3', name: 'Third' },
            },
          },
        } as any;

        const selector = makeSelectUsersByIds(['user-1', 'user-3']);
        const result = selector(state);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent users', () => {
        const state = {
          userEntity: {
            entities: {
              'user-1': { id: 'user-1', name: 'First' },
            },
          },
        } as any;

        const selector = makeSelectUsersByIds(['user-1', 'non-existent']);
        expect(selector(state)).toHaveLength(1);
      });

      it('should return empty array when ids is empty', () => {
        const state = {
          userEntity: {
            entities: {
              'user-1': { id: 'user-1' },
            },
          },
        } as any;

        const selector = makeSelectUsersByIds([]);
        expect(selector(state)).toEqual([]);
      });

      it('should use empty array as default', () => {
        const state = {
          userEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectUsersByIds();
        expect(selector(state)).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          userEntity: {
            entities: {
              'user-1': { id: 'user-1', name: 'First' },
              'user-2': { id: 'user-2', name: 'Second' },
              'user-3': { id: 'user-3', name: 'Third' },
            },
          },
        } as any;

        const selector = makeSelectUsersByIds(['user-3', 'user-1', 'user-2']);
        const result = selector(state);
        expect(result[0].name).toBe('Third');
        expect(result[1].name).toBe('First');
        expect(result[2].name).toBe('Second');
      });
    });

    describe('makeSelectCompositeUserById', () => {
      it('should return user with members and projects', () => {
        const user = { id: 'user-1', name: 'Test User' };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectCompositeUserById('user-1');
        const result = selector(state);

        expect(result).toBeDefined();
        expect(result?.id).toBe('user-1');
        expect(result?.members).toBeDefined();
        expect(result?.projects).toBeDefined();
      });

      it('should return null when user does not exist', () => {
        const state = {
          userEntity: {
            entities: {},
          },
        } as any;

        const selector = makeSelectCompositeUserById('non-existent');
        expect(selector(state)).toBeNull();
      });

      it('should include user members in result', () => {
        const user = { id: 'user-1', name: 'Test User' };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectCompositeUserById('user-1');
        const result = selector(state);

        expect(result?.members).toHaveLength(2);
        expect(result?.members[0].userId).toBe('user-1');
      });

      it('should include user projects in result', () => {
        const user = { id: 'user-1', name: 'Test User' };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectCompositeUserById('user-1');
        const result = selector(state);

        expect(result?.projects).toHaveLength(2);
        expect(result?.projects[0].name).toBe('Project One');
        expect(result?.projects[1].name).toBe('Project Two');
      });

      it('should preserve original user properties', () => {
        const user = {
          id: 'user-1',
          name: 'Test User',
          email: 'test@user.com',
          metadata: { role: 'admin' },
        };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectCompositeUserById('user-1');
        const result = selector(state);

        expect(result?.name).toBe('Test User');
        expect(result?.email).toBe('test@user.com');
        expect(result?.metadata?.role).toBe('admin');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex user data', () => {
      it('should handle users with nested properties', () => {
        const user = {
          id: 'user-1',
          name: 'Complex User',
          email: 'complex@user.com',
          profile: {
            avatar: 'avatar.jpg',
            bio: 'Test bio',
          },
          settings: {
            theme: 'dark',
            notifications: true,
          },
        };
        const state = {
          userEntity: {
            entities: {
              'user-1': user,
            },
          },
        } as any;

        const selector = makeSelectUserById('user-1');
        const result = selector(state);

        expect(result?.profile?.bio).toBe('Test bio');
        expect(result?.settings?.theme).toBe('dark');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          userEntity: {
            entities: {},
            ids: [],
            hoveredId: null,
            focusedId: null,
            selectedId: null,
          },
        } as any;

        expect(selectAllUsers(state)).toEqual([]);
        expect(selectAllUserIds(state)).toEqual([]);
        expect(selectSelectedUser(state)).toBeNull();
      });
    });
  });
});

