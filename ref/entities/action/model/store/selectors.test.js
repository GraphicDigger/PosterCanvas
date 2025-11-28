// ===================================================================
// Unit Tests for Action Entity Redux Selectors
// Coverage Target: 95%+
// Week 3 - Day 1 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectActionState,
  selectActionEntities,
  selectActionIds,
  selectActionUI,
  selectActionRelations,
  selectHoveredActionId,
  selectFocusedActionId,
  selectSelectedActionId,
  selectActionsByEntityId,
  selectAllActions,
  selectActionById,
  selectActionCheckStates,
  selectSelectedAction,
  selectActionsByIds,
  selectCustomActions,
} from './selectors';

// Mock ENTITY_KINDS and ACTION_TYPES to avoid import issues
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    COMPONENT: 'component',
    SCREEN: 'screen',
    ELEMENT: 'element',
    ACTION: 'action',
  },
}));

vi.mock('../constants/actionTypes', () => ({
  ACTION_TYPES: {
    CUSTOM_ACTION: 'custom-action',
  },
}));

describe('Action Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectActionState', () => {
      it('should return action entity state', () => {
        const state = {
          actionEntity: {
            ids: ['action-1'],
            entities: {},
            ui: {},
            relations: {},
          },
        };

        expect(selectActionState(state)).toEqual(state.actionEntity);
      });
    });

    describe('selectActionEntities', () => {
      it('should return action entities object', () => {
        const state = {
          actionEntity: {
            entities: {
              'action-1': { id: 'action-1', name: 'Test Action' },
            },
          },
        };

        expect(selectActionEntities(state)).toEqual(state.actionEntity.entities);
      });
    });

    describe('selectActionIds', () => {
      it('should return action ids array', () => {
        const state = {
          actionEntity: {
            ids: ['action-1', 'action-2'],
          },
        };

        expect(selectActionIds(state)).toEqual(['action-1', 'action-2']);
      });

      it('should return empty array when no ids', () => {
        const state = {
          actionEntity: {
            ids: [],
          },
        };

        expect(selectActionIds(state)).toEqual([]);
      });
    });

    describe('selectActionUI', () => {
      it('should return action UI state', () => {
        const state = {
          actionEntity: {
            ui: {
              hoveredActionId: null,
              focusedActionId: null,
              selectedActionId: null,
            },
          },
        };

        expect(selectActionUI(state)).toEqual(state.actionEntity.ui);
      });
    });

    describe('selectActionRelations', () => {
      it('should return action relations', () => {
        const state = {
          actionEntity: {
            relations: {
              byComponent: {},
              byScreen: {},
              byElement: {},
            },
          },
        };

        expect(selectActionRelations(state)).toEqual(state.actionEntity.relations);
      });
    });
  });

  describe('UI Selectors', () => {
    describe('selectHoveredActionId', () => {
      it('should return hovered action id', () => {
        const state = {
          actionEntity: {
            ui: { hoveredActionId: 'action-123' },
          },
        };

        expect(selectHoveredActionId(state)).toBe('action-123');
      });

      it('should return null when no action is hovered', () => {
        const state = {
          actionEntity: {
            ui: { hoveredActionId: null },
          },
        };

        expect(selectHoveredActionId(state)).toBeNull();
      });
    });

    describe('selectFocusedActionId', () => {
      it('should return focused action id', () => {
        const state = {
          actionEntity: {
            ui: { focusedActionId: 'action-456' },
          },
        };

        expect(selectFocusedActionId(state)).toBe('action-456');
      });

      it('should return null when no action is focused', () => {
        const state = {
          actionEntity: {
            ui: { focusedActionId: null },
          },
        };

        expect(selectFocusedActionId(state)).toBeNull();
      });
    });

    describe('selectSelectedActionId', () => {
      it('should return selected action id', () => {
        const state = {
          actionEntity: {
            ui: { selectedActionId: 'action-789' },
          },
        };

        expect(selectSelectedActionId(state)).toBe('action-789');
      });

      it('should return null when no action is selected', () => {
        const state = {
          actionEntity: {
            ui: { selectedActionId: null },
          },
        };

        expect(selectSelectedActionId(state)).toBeNull();
      });
    });
  });

  describe('Entity Selectors', () => {
    describe('selectActionById', () => {
      it('should return action by id', () => {
        const state = {
          actionEntity: {
            entities: {
              'action-1': { id: 'action-1', name: 'Test Action' },
            },
          },
        };

        const result = selectActionById(state, 'action-1');

        expect(result).toEqual({ id: 'action-1', name: 'Test Action' });
      });

      it('should return undefined for non-existent id', () => {
        const state = {
          actionEntity: {
            entities: {},
          },
        };

        const result = selectActionById(state, 'non-existent');

        expect(result).toBeUndefined();
      });
    });

    describe('selectAllActions', () => {
      it('should return all actions in order', () => {
        const state = {
          actionEntity: {
            ids: ['action-1', 'action-2', 'action-3'],
            entities: {
              'action-1': { id: 'action-1', name: 'Action 1' },
              'action-2': { id: 'action-2', name: 'Action 2' },
              'action-3': { id: 'action-3', name: 'Action 3' },
            },
          },
        };

        const result = selectAllActions(state);

        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ id: 'action-1', name: 'Action 1' });
        expect(result[1]).toEqual({ id: 'action-2', name: 'Action 2' });
        expect(result[2]).toEqual({ id: 'action-3', name: 'Action 3' });
      });

      it('should return empty array when no actions', () => {
        const state = {
          actionEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectAllActions(state);

        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          actionEntity: {
            ids: ['action-3', 'action-1', 'action-2'],
            entities: {
              'action-1': { id: 'action-1' },
              'action-2': { id: 'action-2' },
              'action-3': { id: 'action-3' },
            },
          },
        };

        const result = selectAllActions(state);

        expect(result.map(a => a.id)).toEqual(['action-3', 'action-1', 'action-2']);
      });
    });
  });

  describe('selectActionCheckStates', () => {
    it('should return all check states for an action', () => {
      const state = {
        actionEntity: {
          ui: {
            selectedActionId: 'action-1',
            focusedActionId: 'action-2',
            hoveredActionId: 'action-3',
          },
        },
      };

      const result = selectActionCheckStates(state, 'action-1');

      expect(result).toEqual({
        isSelected: true,
        isFocused: false,
        isHovered: false,
      });
    });

    it('should return all false when action matches none', () => {
      const state = {
        actionEntity: {
          ui: {
            selectedActionId: 'action-1',
            focusedActionId: 'action-2',
            hoveredActionId: 'action-3',
          },
        },
      };

      const result = selectActionCheckStates(state, 'action-999');

      expect(result).toEqual({
        isSelected: false,
        isFocused: false,
        isHovered: false,
      });
    });

    it('should handle multiple states for same action', () => {
      const state = {
        actionEntity: {
          ui: {
            selectedActionId: 'action-1',
            focusedActionId: 'action-1',
            hoveredActionId: 'action-1',
          },
        },
      };

      const result = selectActionCheckStates(state, 'action-1');

      expect(result).toEqual({
        isSelected: true,
        isFocused: true,
        isHovered: true,
      });
    });
  });

  describe('selectSelectedAction', () => {
    it('should return selected action', () => {
      const state = {
        actionEntity: {
          ui: { selectedActionId: 'action-1' },
          entities: {
            'action-1': { id: 'action-1', name: 'Selected Action' },
          },
        },
      };

      const result = selectSelectedAction(state);

      expect(result).toEqual({ id: 'action-1', name: 'Selected Action' });
    });

    it('should return null when no action is selected', () => {
      const state = {
        actionEntity: {
          ui: { selectedActionId: null },
          entities: {},
        },
      };

      const result = selectSelectedAction(state);

      expect(result).toBeNull();
    });

    it('should return null when selected action does not exist', () => {
      const state = {
        actionEntity: {
          ui: { selectedActionId: 'non-existent' },
          entities: {},
        },
      };

      const result = selectSelectedAction(state);

      expect(result).toBeNull();
    });

    it('should handle undefined selectedId', () => {
      const state = {
        actionEntity: {
          ui: { selectedActionId: undefined },
          entities: {
            'action-1': { id: 'action-1' },
          },
        },
      };

      const result = selectSelectedAction(state);

      expect(result).toBeNull();
    });

    it('should handle undefined entities', () => {
      const state = {
        actionEntity: {
          ui: { selectedActionId: 'action-1' },
          entities: undefined,
        },
      };

      const result = selectSelectedAction(state);

      expect(result).toBeNull();
    });
  });

  describe('selectActionsByIds', () => {
    it('should return actions by ids array', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Action 1' },
            'action-2': { id: 'action-2', name: 'Action 2' },
            'action-3': { id: 'action-3', name: 'Action 3' },
          },
        },
      };

      const result = selectActionsByIds(state, ['action-1', 'action-3']);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Action 1' });
      expect(result[1]).toEqual({ id: 'action-3', name: 'Action 3' });
    });

    it('should filter out non-existent ids', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Action 1' },
          },
        },
      };

      const result = selectActionsByIds(state, ['action-1', 'non-existent', 'action-999']);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Action 1' });
    });

    it('should return empty array when ids is null', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1' },
          },
        },
      };

      const result = selectActionsByIds(state, null);

      expect(result).toEqual([]);
    });

    it('should return empty array when ids is undefined', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1' },
          },
        },
      };

      const result = selectActionsByIds(state, undefined);

      expect(result).toEqual([]);
    });

    it('should return empty array when entities is null', () => {
      const state = {
        actionEntity: {
          entities: null,
        },
      };

      const result = selectActionsByIds(state, ['action-1']);

      expect(result).toEqual([]);
    });

    it('should maintain order from ids array', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1' },
            'action-2': { id: 'action-2' },
            'action-3': { id: 'action-3' },
          },
        },
      };

      const result = selectActionsByIds(state, ['action-3', 'action-1', 'action-2']);

      expect(result.map(a => a.id)).toEqual(['action-3', 'action-1', 'action-2']);
    });
  });

  describe('selectActionsByEntityId', () => {
    it('should return actions by component id', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Action 1' },
            'action-2': { id: 'action-2', name: 'Action 2' },
          },
          relations: {
            byComponent: {
              'component-1': ['action-1', 'action-2'],
            },
            byScreen: {},
            byElement: {},
          },
        },
      };

      const result = selectActionsByEntityId(state, 'component-1', 'component');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Action 1' });
      expect(result[1]).toEqual({ id: 'action-2', name: 'Action 2' });
    });

    it('should return actions by screen id', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Screen Action' },
          },
          relations: {
            byComponent: {},
            byScreen: {
              'screen-1': ['action-1'],
            },
            byElement: {},
          },
        },
      };

      const result = selectActionsByEntityId(state, 'screen-1', 'screen');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Screen Action' });
    });

    it('should return actions by element id', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Element Action' },
          },
          relations: {
            byComponent: {},
            byScreen: {},
            byElement: {
              'element-1': ['action-1'],
            },
          },
        },
      };

      const result = selectActionsByEntityId(state, 'element-1', 'element');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Element Action' });
    });

    it('should return empty array when entity has no actions', () => {
      const state = {
        actionEntity: {
          entities: {},
          relations: {
            byComponent: {},
            byScreen: {},
            byElement: {},
          },
        },
      };

      const result = selectActionsByEntityId(state, 'component-999', 'component');

      expect(result).toEqual([]);
    });

    it('should return empty array for unknown entity kind', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1' },
          },
          relations: {
            byComponent: {
              'component-1': ['action-1'],
            },
            byScreen: {},
            byElement: {},
          },
        },
      };

      const result = selectActionsByEntityId(state, 'component-1', 'unknown-kind');

      expect(result).toEqual([]);
    });

    it('should filter out null/undefined actions', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', name: 'Action 1' },
            // action-2 doesn't exist
          },
          relations: {
            byComponent: {
              'component-1': ['action-1', 'action-2', 'action-3'],
            },
            byScreen: {},
            byElement: {},
          },
        },
      };

      const result = selectActionsByEntityId(state, 'component-1', 'component');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'action-1', name: 'Action 1' });
    });
  });

  describe('selectCustomActions', () => {
    it('should return only custom actions', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', kind: 'action', type: 'custom-action', name: 'Custom 1' },
            'action-2': { id: 'action-2', kind: 'action', type: 'other-type', name: 'Other' },
            'action-3': { id: 'action-3', kind: 'action', type: 'custom-action', name: 'Custom 2' },
          },
        },
      };

      const result = selectCustomActions(state);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Custom 1');
      expect(result[1].name).toBe('Custom 2');
    });

    it('should return empty array when no custom actions', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', kind: 'action', type: 'other-type' },
          },
        },
      };

      const result = selectCustomActions(state);

      expect(result).toEqual([]);
    });

    it('should return empty array when entities is empty', () => {
      const state = {
        actionEntity: {
          entities: {},
        },
      };

      const result = selectCustomActions(state);

      expect(result).toEqual([]);
    });

    it('should filter out actions with wrong kind', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', kind: 'other-kind', type: 'custom-action' },
            'action-2': { id: 'action-2', kind: 'action', type: 'custom-action' },
          },
        },
      };

      const result = selectCustomActions(state);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('action-2');
    });

    it('should handle actions with null/undefined kind or type', () => {
      const state = {
        actionEntity: {
          entities: {
            'action-1': { id: 'action-1', kind: null, type: 'custom-action' },
            'action-2': { id: 'action-2', kind: 'action', type: null },
            'action-3': { id: 'action-3', kind: 'action', type: 'custom-action' },
          },
        },
      };

      const result = selectCustomActions(state);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('action-3');
    });
  });
});

