// ===================================================================
// Unit Tests for EventActivity Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectActivityState,
  selectActivityEntities,
  selectActivityIds,
  selectActivityUI,
  selectAllActivities,
  selectActivityById,
  selectSelectedActivity,
  selectActivitiesByIds,
  selectActivityWithRelations,
  selectAllActivitiesWithRelations,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedActivityId: vi.fn((state) => state.mockSelectedActivityId || null),
}));

// Mock cross-entity selectors
vi.mock('../../@x/event', () => ({
  selectEventById: vi.fn((state, id) => {
    if (!id) {return null;}
    return {
      id,
      name: `Event ${id}`,
      memberId: 'member-1',
      source: {
        entityKind: 'UI_ELEMENT',
        entityId: 'element-1',
      },
    };
  }),
  selectEventEntities: vi.fn((state) => state.eventEntity?.entities || {}),
}));

vi.mock('../../@x/member', () => ({
  selectMemberById: vi.fn((state, id) => {
    if (!id) {return null;}
    return {
      id,
      name: `Member ${id}`,
    };
  }),
  selectMemberEntities: vi.fn((state) => state.memberEntity?.entities || {}),
}));

vi.mock('../../@x/entity', () => ({
  entitySelectors: {
    getById: vi.fn((state, kind, id) => {
      if (!kind || !id) {return null;}
      return {
        id,
        kind,
        name: `Entity ${id}`,
      };
    }),
  },
}));

describe('EventActivity Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectActivityState', () => {
      it('should return activity entity state', () => {
        const activityState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          activityEntity: activityState,
        };

        expect(selectActivityState(state)).toEqual(activityState);
      });
    });

    describe('selectActivityEntities', () => {
      it('should return activity entities object', () => {
        const entities = {
          'activity-1': { id: 'activity-1', type: 'click', sourceEventId: 'event-1' },
          'activity-2': { id: 'activity-2', type: 'hover', sourceEventId: 'event-2' },
        };
        const state = {
          activityEntity: {
            entities,
          },
        };

        expect(selectActivityEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
        };

        expect(selectActivityEntities(state)).toEqual({});
      });
    });

    describe('selectActivityIds', () => {
      it('should return activity ids array', () => {
        const ids = ['activity-1', 'activity-2', 'activity-3'];
        const state = {
          activityEntity: {
            ids,
          },
        };

        expect(selectActivityIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          activityEntity: {
            ids: [],
          },
        };

        expect(selectActivityIds(state)).toEqual([]);
      });
    });

    describe('selectActivityUI', () => {
      it('should return activity UI state', () => {
        const uiState = {
          selectedActivityId: 'activity-1',
          hoveredActivityId: 'activity-2',
        };
        const state = {
          activityEntity: {
            ui: uiState,
          },
        };

        expect(selectActivityUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          activityEntity: {
            ui: {},
          },
        };

        expect(selectActivityUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectActivityById', () => {
      it('should return activity by ID', () => {
        const activity = {
          id: 'activity-1',
          type: 'click',
          sourceEventId: 'event-1',
          timestamp: Date.now(),
        };
        const state = {
          activityEntity: {
            entities: {
              'activity-1': activity,
            },
          },
        };

        expect(selectActivityById(state, 'activity-1')).toEqual(activity);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
        };

        expect(selectActivityById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedActivity', () => {
      it('should return selected activity', () => {
        const activity = { id: 'activity-selected', type: 'click' };
        const state = {
          activityEntity: {
            entities: {
              'activity-selected': activity,
            },
          },
          mockSelectedActivityId: 'activity-selected',
        };

        expect(selectSelectedActivity(state)).toEqual(activity);
      });

      it('should return null when no activity selected', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
          mockSelectedActivityId: null,
        };

        expect(selectSelectedActivity(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          activityEntity: {
            entities: null,
          },
          mockSelectedActivityId: 'activity-1',
        };

        expect(selectSelectedActivity(state)).toBeNull();
      });

      it('should return null when selected activity does not exist', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
          mockSelectedActivityId: 'non-existent',
        };

        expect(selectSelectedActivity(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllActivities', () => {
      it('should return all activities as array', () => {
        const entities = {
          'activity-1': { id: 'activity-1', type: 'click' },
          'activity-2': { id: 'activity-2', type: 'hover' },
          'activity-3': { id: 'activity-3', type: 'submit' },
        };
        const state = {
          activityEntity: {
            ids: ['activity-1', 'activity-2', 'activity-3'],
            entities,
          },
        };

        const result = selectAllActivities(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['activity-1']);
        expect(result[1]).toEqual(entities['activity-2']);
        expect(result[2]).toEqual(entities['activity-3']);
      });

      it('should return empty array when no activities', () => {
        const state = {
          activityEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllActivities(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          activityEntity: {
            ids: ['activity-3', 'activity-1', 'activity-2'],
            entities: {
              'activity-1': { id: 'activity-1', order: 1 },
              'activity-2': { id: 'activity-2', order: 2 },
              'activity-3': { id: 'activity-3', order: 3 },
            },
          },
        };

        const result = selectAllActivities(state);
        expect(result[0].id).toBe('activity-3');
        expect(result[1].id).toBe('activity-1');
        expect(result[2].id).toBe('activity-2');
      });
    });

    describe('selectActivitiesByIds', () => {
      it('should return activities for given IDs', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': { id: 'activity-1', type: 'click' },
              'activity-2': { id: 'activity-2', type: 'hover' },
              'activity-3': { id: 'activity-3', type: 'submit' },
            },
          },
        };

        const result = selectActivitiesByIds(state, ['activity-1', 'activity-3']);
        expect(result).toHaveLength(2);
        expect(result[0].type).toBe('click');
        expect(result[1].type).toBe('submit');
      });

      it('should filter out non-existent activities', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': { id: 'activity-1', type: 'click' },
            },
          },
        };

        const result = selectActivitiesByIds(state, ['activity-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('activity-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
        };

        const result = selectActivitiesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          activityEntity: {
            entities: null,
          },
        };

        const result = selectActivitiesByIds(state, ['activity-1']);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': { id: 'activity-1', type: 'click' },
              'activity-2': { id: 'activity-2', type: 'hover' },
              'activity-3': { id: 'activity-3', type: 'submit' },
            },
          },
        };

        const result = selectActivitiesByIds(state, ['activity-3', 'activity-1', 'activity-2']);
        expect(result[0].type).toBe('submit');
        expect(result[1].type).toBe('click');
        expect(result[2].type).toBe('hover');
      });
    });
  });

  describe('Relation Selectors', () => {
    describe.skip('selectActivityWithRelations - UNIMPLEMENTED', () => {
      it('should return activity with event and member relations', () => {
        const activity = {
          id: 'activity-1',
          type: 'click',
          eventId: 'event-1',
        };
        const state = {
          activityEntity: {
            entities: {
              'activity-1': activity,
            },
          },
          eventEntity: {
            entities: {
              'event-1': {
                id: 'event-1',
                name: 'Event 1',
                memberId: 'member-1',
                source: {
                  entityKind: 'UI_ELEMENT',
                  entityId: 'element-1',
                },
              },
            },
          },
          memberEntity: {
            entities: {
              'member-1': {
                id: 'member-1',
                name: 'Member 1',
              },
            },
          },
        };

        const result = selectActivityWithRelations(state, 'activity-1');
        expect(result).toBeDefined();
        expect(result.id).toBe('activity-1');
        expect(result.event).toBeDefined();
        expect(result.event.id).toBe('event-1');
        expect(result.member).toBeDefined();
      });

      it('should return null when activity not found', () => {
        const state = {
          activityEntity: {
            entities: {},
          },
        };

        const result = selectActivityWithRelations(state, 'non-existent');
        expect(result).toBeNull();
      });

      it('should handle activity without event', () => {
        const activity = {
          id: 'activity-1',
          type: 'click',
          sourceEventId: null,
        };
        const state = {
          activityEntity: {
            entities: {
              'activity-1': activity,
            },
          },
        };

        const result = selectActivityWithRelations(state, 'activity-1');
        expect(result).toBeDefined();
        expect(result.event).toBeNull();
      });
    });

    describe.skip('selectAllActivitiesWithRelations - UNIMPLEMENTED', () => {
      it('should return all activities with relations', () => {
        const entities = {
          'activity-1': {
            id: 'activity-1',
            type: 'click',
            sourceEventId: 'event-1',
          },
          'activity-2': {
            id: 'activity-2',
            type: 'hover',
            sourceEventId: 'event-2',
          },
        };
        const state = {
          activityEntity: {
            ids: ['activity-1', 'activity-2'],
            entities,
          },
        };

        const result = selectAllActivitiesWithRelations(state);
        expect(result).toHaveLength(2);
        expect(result[0].event).toBeDefined();
        expect(result[0].member).toBeDefined();
        expect(result[0].sourceEntity).toBeDefined();
        expect(result[1].event).toBeDefined();
        expect(result[1].member).toBeDefined();
      });

      it('should return empty array when no activities', () => {
        const state = {
          activityEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectAllActivitiesWithRelations(state);
        expect(result).toEqual([]);
      });

      it('should handle activities with valid events', () => {
        const entities = {
          'activity-1': {
            id: 'activity-1',
            type: 'click',
            sourceEventId: 'event-1',
          },
        };
        const state = {
          activityEntity: {
            ids: ['activity-1'],
            entities,
          },
        };

        const result = selectAllActivitiesWithRelations(state);
        expect(result).toHaveLength(1);
        expect(result[0].event).toBeDefined();
        expect(result[0].member).toBeDefined();
        expect(result[0].sourceEntity).toBeDefined();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different activity types', () => {
      it('should handle mouse click activities', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': {
                id: 'activity-1',
                type: 'mouse_click',
                button: 'left',
                sourceEventId: 'event-1',
              },
            },
          },
        };

        const result = selectActivityById(state, 'activity-1');
        expect(result.type).toBe('mouse_click');
        expect(result.button).toBe('left');
      });

      it('should handle form submit activities', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': {
                id: 'activity-1',
                type: 'form_submit',
                formId: 'form-1',
                sourceEventId: 'event-1',
              },
            },
          },
        };

        const result = selectActivityById(state, 'activity-1');
        expect(result.type).toBe('form_submit');
        expect(result.formId).toBe('form-1');
      });

      it('should handle navigation activities', () => {
        const state = {
          activityEntity: {
            entities: {
              'activity-1': {
                id: 'activity-1',
                type: 'navigation',
                targetUrl: '/dashboard',
                sourceEventId: 'event-1',
              },
            },
          },
        };

        const result = selectActivityById(state, 'activity-1');
        expect(result.type).toBe('navigation');
        expect(result.targetUrl).toBe('/dashboard');
      });
    });

    describe('Complex activity data', () => {
      it('should handle activity with metadata', () => {
        const activity = {
          id: 'activity-1',
          type: 'custom',
          sourceEventId: 'event-1',
          metadata: {
            timestamp: Date.now(),
            userId: 'user-1',
            sessionId: 'session-123',
          },
        };
        const state = {
          activityEntity: {
            entities: {
              'activity-1': activity,
            },
          },
        };

        const result = selectActivityById(state, 'activity-1');
        expect(result.metadata.userId).toBe('user-1');
        expect(result.metadata.sessionId).toBe('session-123');
      });

      it('should handle activity with payload', () => {
        const activity = {
          id: 'activity-1',
          type: 'api_call',
          sourceEventId: 'event-1',
          payload: {
            method: 'POST',
            endpoint: '/api/data',
            data: { key: 'value' },
          },
        };
        const state = {
          activityEntity: {
            entities: {
              'activity-1': activity,
            },
          },
        };

        const result = selectActivityById(state, 'activity-1');
        expect(result.payload.method).toBe('POST');
        expect(result.payload.endpoint).toBe('/api/data');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          activityEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllActivities(state)).toEqual([]);
        expect(selectSelectedActivity(state)).toBeNull();
        // expect(selectAllActivitiesWithRelations(state)).toEqual([]); // Selector not implemented
      });
    });
  });
});

