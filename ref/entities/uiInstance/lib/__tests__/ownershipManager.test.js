// ===================================================================
// Unit Tests for ownershipManager Utility
// Coverage Target: 100%
// Phase 1 - Utilities (SMALL IMPACT - 32 lines, ownership management)
// Risk: LOW (Pure functions, state mutation helpers)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { ownershipManager } from '../ownershipManager';

describe('ownershipManager Utility', () => {
  let state;

  beforeEach(() => {
    state = {
      ownership: {},
    };
  });

  describe('addOwnership', () => {
    describe('Basic Functionality', () => {
      it('should add ownership for new type and owner', () => {
        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.addOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
        });
      });

      it('should add ownership for existing type, new owner', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-2',
          ownership: {
            type: 'component',
            componentId: 'comp-2',
          },
        };

        ownershipManager.addOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
            'comp-2': ['instance-2'],
          },
        });
      });

      it('should add ownership for existing type and owner', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-2',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.addOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1', 'instance-2'],
          },
        });
      });

      it('should not add duplicate instance ID', () => {
        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.addOwnership(state, instance);
        ownershipManager.addOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
        });
      });
    });

    describe('Multiple Types', () => {
      it('should handle different ownership types', () => {
        const instance1 = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        const instance2 = {
          id: 'instance-2',
          ownership: {
            type: 'screen',
            screenId: 'screen-1',
          },
        };

        ownershipManager.addOwnership(state, instance1);
        ownershipManager.addOwnership(state, instance2);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
          screen: {
            'screen-1': ['instance-2'],
          },
        });
      });

      it('should handle multiple instances across different types', () => {
        const instances = [
          { id: 'inst-1', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'inst-2', ownership: { type: 'component', componentId: 'comp-2' } },
          { id: 'inst-3', ownership: { type: 'screen', screenId: 'screen-1' } },
          { id: 'inst-4', ownership: { type: 'element', elementId: 'elem-1' } },
        ];

        instances.forEach(inst => ownershipManager.addOwnership(state, inst));

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['inst-1'],
            'comp-2': ['inst-2'],
          },
          screen: {
            'screen-1': ['inst-3'],
          },
          element: {
            'elem-1': ['inst-4'],
          },
        });
      });
    });

    describe('Multiple Instances per Owner', () => {
      it('should handle many instances for single owner', () => {
        const instances = Array.from({ length: 10 }, (_, i) => ({
          id: `instance-${i}`,
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        }));

        instances.forEach(inst => ownershipManager.addOwnership(state, inst));

        expect(state.ownership.component['comp-1']).toHaveLength(10);
        expect(state.ownership.component['comp-1']).toEqual(
          Array.from({ length: 10 }, (_, i) => `instance-${i}`),
        );
      });
    });

    describe('Edge Cases', () => {
      it('should handle ownership with special characters in IDs', () => {
        const instance = {
          id: 'instance-@#$%',
          ownership: {
            type: 'component',
            componentId: 'comp-@#$%',
          },
        };

        ownershipManager.addOwnership(state, instance);

        expect(state.ownership.component['comp-@#$%']).toEqual(['instance-@#$%']);
      });

      it('should handle numeric IDs', () => {
        const instance = {
          id: 123,
          ownership: {
            type: 'component',
            componentId: 456,
          },
        };

        ownershipManager.addOwnership(state, instance);

        expect(state.ownership.component[456]).toEqual([123]);
      });
    });
  });

  describe('removeOwnership', () => {
    describe('Basic Functionality', () => {
      it('should remove instance from ownership', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1', 'instance-2'],
          },
        };

        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-2'],
          },
        });
      });

      it('should remove last instance from owner', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': [],
          },
        });
      });

      it('should not error when removing non-existent instance', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-999',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
        });
      });

      it('should not error when removing from non-existent owner', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-999',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
        });
      });

      it('should not error when removing from non-existent type', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1'],
          },
        };

        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'screen',
            screenId: 'screen-1',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-1'],
          },
        });
      });
    });

    describe('Multiple Removals', () => {
      it('should remove multiple instances sequentially', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1', 'instance-2', 'instance-3'],
          },
        };

        const instances = [
          { id: 'instance-1', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'instance-2', ownership: { type: 'component', componentId: 'comp-1' } },
        ];

        instances.forEach(inst => ownershipManager.removeOwnership(state, inst));

        expect(state.ownership).toEqual({
          component: {
            'comp-1': ['instance-3'],
          },
        });
      });

      it('should handle removing all instances', () => {
        state.ownership = {
          component: {
            'comp-1': ['instance-1', 'instance-2'],
          },
        };

        const instances = [
          { id: 'instance-1', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'instance-2', ownership: { type: 'component', componentId: 'comp-1' } },
        ];

        instances.forEach(inst => ownershipManager.removeOwnership(state, inst));

        expect(state.ownership).toEqual({
          component: {
            'comp-1': [],
          },
        });
      });
    });

    describe('Edge Cases', () => {
      it('should handle empty ownership state', () => {
        const instance = {
          id: 'instance-1',
          ownership: {
            type: 'component',
            componentId: 'comp-1',
          },
        };

        ownershipManager.removeOwnership(state, instance);

        expect(state.ownership).toEqual({});
      });
    });
  });

  describe('clearOwnerships', () => {
    it('should clear empty ownership', () => {
      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should clear ownership with single type', () => {
      state.ownership = {
        component: {
          'comp-1': ['instance-1'],
        },
      };

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should clear ownership with multiple types', () => {
      state.ownership = {
        component: {
          'comp-1': ['instance-1', 'instance-2'],
        },
        screen: {
          'screen-1': ['instance-3'],
        },
        element: {
          'elem-1': ['instance-4', 'instance-5', 'instance-6'],
        },
      };

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should be idempotent', () => {
      state.ownership = {
        component: {
          'comp-1': ['instance-1'],
        },
      };

      ownershipManager.clearOwnerships(state);
      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });
  });

  describe('Combined Operations', () => {
    it('should handle add, remove, add workflow', () => {
      const instance = {
        id: 'instance-1',
        ownership: {
          type: 'component',
          componentId: 'comp-1',
        },
      };

      ownershipManager.addOwnership(state, instance);
      expect(state.ownership.component['comp-1']).toEqual(['instance-1']);

      ownershipManager.removeOwnership(state, instance);
      expect(state.ownership.component['comp-1']).toEqual([]);

      ownershipManager.addOwnership(state, instance);
      expect(state.ownership.component['comp-1']).toEqual(['instance-1']);
    });

    it('should handle complex workflow with multiple instances', () => {
      // Add instances
      ownershipManager.addOwnership(state, {
        id: 'inst-1',
        ownership: { type: 'component', componentId: 'comp-1' },
      });

      ownershipManager.addOwnership(state, {
        id: 'inst-2',
        ownership: { type: 'component', componentId: 'comp-1' },
      });

      ownershipManager.addOwnership(state, {
        id: 'inst-3',
        ownership: { type: 'screen', screenId: 'screen-1' },
      });

      expect(state.ownership).toEqual({
        component: {
          'comp-1': ['inst-1', 'inst-2'],
        },
        screen: {
          'screen-1': ['inst-3'],
        },
      });

      // Remove one
      ownershipManager.removeOwnership(state, {
        id: 'inst-1',
        ownership: { type: 'component', componentId: 'comp-1' },
      });

      expect(state.ownership).toEqual({
        component: {
          'comp-1': ['inst-2'],
        },
        screen: {
          'screen-1': ['inst-3'],
        },
      });

      // Clear all
      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should handle add after clear', () => {
      state.ownership = {
        component: {
          'comp-1': ['instance-1'],
        },
      };

      ownershipManager.clearOwnerships(state);
      ownershipManager.addOwnership(state, {
        id: 'instance-2',
        ownership: { type: 'screen', screenId: 'screen-1' },
      });

      expect(state.ownership).toEqual({
        screen: {
          'screen-1': ['instance-2'],
        },
      });
    });
  });

  describe('State Mutation', () => {
    it('should mutate state directly (Redux Toolkit pattern)', () => {
      const originalState = state;

      ownershipManager.addOwnership(state, {
        id: 'instance-1',
        ownership: { type: 'component', componentId: 'comp-1' },
      });

      expect(state).toBe(originalState);
      expect(state.ownership).toBeDefined();
    });
  });
});

