// ===================================================================
// Unit Tests for Event Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 6 (Selector Testing - Final Push!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectEventState,
  selectEventEntities,
  selectEventIds,
  selectEventUI,
  selectAllEvents,
  selectEventById,
  selectSelectedEvent,
  selectEventsByIds,
} from '../selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedEventId: vi.fn((state) => state.mockSelectedEventId || null),
}));

describe('Event Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectEventState', () => {
      it('should return event entity state', () => {
        const eventState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          eventEntity: eventState,
        };

        expect(selectEventState(state)).toEqual(eventState);
      });
    });

    describe('selectEventEntities', () => {
      it('should return event entities object', () => {
        const entities = {
          'event-1': { id: 'event-1', name: 'Click', type: 'mouse' },
          'event-2': { id: 'event-2', name: 'Hover', type: 'mouse' },
        };
        const state = {
          eventEntity: {
            entities,
          },
        };

        expect(selectEventEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          eventEntity: {
            entities: {},
          },
        };

        expect(selectEventEntities(state)).toEqual({});
      });
    });

    describe('selectEventIds', () => {
      it('should return event ids array', () => {
        const ids = ['event-1', 'event-2', 'event-3'];
        const state = {
          eventEntity: {
            ids,
          },
        };

        expect(selectEventIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          eventEntity: {
            ids: [],
          },
        };

        expect(selectEventIds(state)).toEqual([]);
      });
    });

    describe('selectEventUI', () => {
      it('should return event UI state', () => {
        const uiState = {
          selectedEventId: 'event-1',
          hoveredEventId: 'event-2',
        };
        const state = {
          eventEntity: {
            ui: uiState,
          },
        };

        expect(selectEventUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          eventEntity: {
            ui: {},
          },
        };

        expect(selectEventUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectEventById', () => {
      it('should return event by ID', () => {
        const event = {
          id: 'event-1',
          name: 'Click',
          type: 'mouse',
          handler: 'handleClick',
        };
        const state = {
          eventEntity: {
            entities: {
              'event-1': event,
            },
          },
        };

        expect(selectEventById(state, 'event-1')).toEqual(event);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          eventEntity: {
            entities: {},
          },
        };

        expect(selectEventById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle event with complex properties', () => {
        const event = {
          id: 'event-1',
          name: 'Submit Form',
          type: 'form',
          handler: 'handleSubmit',
          options: {
            preventDefault: true,
            stopPropagation: false,
          },
          metadata: {
            created: '2024-01-01',
          },
        };
        const state = {
          eventEntity: {
            entities: {
              'event-1': event,
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.options.preventDefault).toBe(true);
        expect(result.metadata.created).toBe('2024-01-01');
      });
    });

    describe('selectSelectedEvent', () => {
      it('should return selected event', () => {
        const event = { id: 'event-selected', name: 'Selected Event' };
        const state = {
          eventEntity: {
            entities: {
              'event-selected': event,
            },
            ui: {
              selectedEventId: 'event-selected',
            },
          },
        };

        expect(selectSelectedEvent(state)).toEqual(event);
      });

      it('should return null when no event selected', () => {
        const state = {
          eventEntity: {
            entities: {},
            ui: {
              selectedEventId: null,
            },
          },
        };

        expect(selectSelectedEvent(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          eventEntity: {
            entities: null,
            ui: {
              selectedEventId: 'event-1',
            },
          },
        };

        expect(selectSelectedEvent(state)).toBeNull();
      });

      it('should return null when selected event does not exist', () => {
        const state = {
          eventEntity: {
            entities: {},
            ui: {
              selectedEventId: 'non-existent',
            },
          },
        };

        expect(selectSelectedEvent(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllEvents', () => {
      it('should return all events as array', () => {
        const entities = {
          'event-1': { id: 'event-1', name: 'Click', type: 'mouse' },
          'event-2': { id: 'event-2', name: 'Hover', type: 'mouse' },
          'event-3': { id: 'event-3', name: 'Submit', type: 'form' },
        };
        const state = {
          eventEntity: {
            ids: ['event-1', 'event-2', 'event-3'],
            entities,
          },
        };

        const result = selectAllEvents(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['event-1']);
        expect(result[1]).toEqual(entities['event-2']);
        expect(result[2]).toEqual(entities['event-3']);
      });

      it('should return empty array when no events', () => {
        const state = {
          eventEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllEvents(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          eventEntity: {
            ids: ['event-3', 'event-1', 'event-2'],
            entities: {
              'event-1': { id: 'event-1', order: 1 },
              'event-2': { id: 'event-2', order: 2 },
              'event-3': { id: 'event-3', order: 3 },
            },
          },
        };

        const result = selectAllEvents(state);
        expect(result[0].id).toBe('event-3');
        expect(result[1].id).toBe('event-1');
        expect(result[2].id).toBe('event-2');
      });

      it('should handle undefined events', () => {
        const state = {
          eventEntity: {
            ids: ['event-1', 'non-existent', 'event-2'],
            entities: {
              'event-1': { id: 'event-1', name: 'Click' },
              'event-2': { id: 'event-2', name: 'Hover' },
            },
          },
        };

        const result = selectAllEvents(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectEventsByIds', () => {
      it('should return events for given IDs', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': { id: 'event-1', name: 'Click' },
              'event-2': { id: 'event-2', name: 'Hover' },
              'event-3': { id: 'event-3', name: 'Submit' },
            },
          },
        };

        const result = selectEventsByIds(state, ['event-1', 'event-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Click');
        expect(result[1].name).toBe('Submit');
      });

      it('should filter out non-existent events', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': { id: 'event-1', name: 'Click' },
            },
          },
        };

        const result = selectEventsByIds(state, ['event-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('event-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          eventEntity: {
            entities: {},
          },
        };

        const result = selectEventsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          eventEntity: {
            entities: null,
          },
        };

        const result = selectEventsByIds(state, ['event-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': { id: 'event-1' },
            },
          },
        };

        const result = selectEventsByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': { id: 'event-1', name: 'Click' },
              'event-2': { id: 'event-2', name: 'Hover' },
              'event-3': { id: 'event-3', name: 'Submit' },
            },
          },
        };

        const result = selectEventsByIds(state, ['event-3', 'event-1', 'event-2']);
        expect(result[0].name).toBe('Submit');
        expect(result[1].name).toBe('Click');
        expect(result[2].name).toBe('Hover');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different event types', () => {
      it('should handle mouse events', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': {
                id: 'event-1',
                name: 'Click',
                type: 'mouse',
                button: 'left',
              },
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.type).toBe('mouse');
        expect(result.button).toBe('left');
      });

      it('should handle keyboard events', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': {
                id: 'event-1',
                name: 'KeyPress',
                type: 'keyboard',
                key: 'Enter',
              },
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.type).toBe('keyboard');
        expect(result.key).toBe('Enter');
      });

      it('should handle form events', () => {
        const state = {
          eventEntity: {
            entities: {
              'event-1': {
                id: 'event-1',
                name: 'Submit',
                type: 'form',
                preventDefault: true,
              },
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.type).toBe('form');
        expect(result.preventDefault).toBe(true);
      });
    });

    describe('Complex event configurations', () => {
      it('should handle events with handlers', () => {
        const event = {
          id: 'event-1',
          name: 'Custom Event',
          handler: 'handleCustomEvent',
          params: ['param1', 'param2'],
        };
        const state = {
          eventEntity: {
            entities: {
              'event-1': event,
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.handler).toBe('handleCustomEvent');
        expect(result.params).toHaveLength(2);
      });

      it('should handle events with multiple listeners', () => {
        const event = {
          id: 'event-1',
          name: 'Multi Listener Event',
          listeners: [
            { handler: 'handler1', priority: 1 },
            { handler: 'handler2', priority: 2 },
          ],
        };
        const state = {
          eventEntity: {
            entities: {
              'event-1': event,
            },
          },
        };

        const result = selectEventById(state, 'event-1');
        expect(result.listeners).toHaveLength(2);
        expect(result.listeners[0].priority).toBe(1);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          eventEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllEvents(state)).toEqual([]);
        expect(selectSelectedEvent(state)).toBeNull();
      });
    });
  });
});
