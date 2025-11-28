import { describe, it, expect, beforeEach } from 'vitest';
import { ownershipManager } from '../ownershipManager';

describe('uiElement ownershipManager Helper', () => {
  let state: any;

  beforeEach(() => {
    state = {
      ownership: {},
    };
  });

  describe('addOwnership', () => {
    it('should add ownership for new type and owner', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership).toEqual({
        screen: {
          'screen-1': ['elem-1'],
        },
      });
    });

    it('should add ownership to existing type', () => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-0'],
        },
      };

      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-0', 'elem-1']);
    });

    it('should add ownership for new owner in existing type', () => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1'],
        },
      };

      const element = {
        id: 'elem-2',
        ownership: {
          type: 'screen',
          screenId: 'screen-2',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership.screen).toEqual({
        'screen-1': ['elem-1'],
        'screen-2': ['elem-2'],
      });
    });

    it('should not add duplicate element IDs', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      ownershipManager.addOwnership(state, element);
      ownershipManager.addOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);
    });

    it('should handle component ownership type', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'component',
          componentId: 'comp-1',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership).toEqual({
        component: {
          'comp-1': ['elem-1'],
        },
      });
    });

    it('should handle multiple ownership types', () => {
      const screenElement = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      const componentElement = {
        id: 'elem-2',
        ownership: {
          type: 'component',
          componentId: 'comp-1',
        },
      };

      ownershipManager.addOwnership(state, screenElement);
      ownershipManager.addOwnership(state, componentElement);

      expect(state.ownership).toEqual({
        screen: {
          'screen-1': ['elem-1'],
        },
        component: {
          'comp-1': ['elem-2'],
        },
      });
    });
  });

  describe('removeOwnership', () => {
    beforeEach(() => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1', 'elem-2', 'elem-3'],
          'screen-2': ['elem-4'],
        },
        component: {
          'comp-1': ['elem-5'],
        },
      };
    });

    it('should remove element from ownership', () => {
      const element = {
        id: 'elem-2',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-3']);
    });

    it('should remove last element from owner', () => {
      const element = {
        id: 'elem-4',
        ownership: {
          type: 'screen',
          screenId: 'screen-2',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-2']).toEqual([]);
    });

    it('should handle removing non-existent element', () => {
      const element = {
        id: 'elem-999',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2', 'elem-3']);
    });

    it('should handle removing from non-existent owner', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-999',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2', 'elem-3']);
    });

    it('should handle removing from non-existent type', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'variant',
          variantId: 'var-1',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen).toBeDefined();
      expect(state.ownership.variant).toBeUndefined();
    });

    it('should remove from component ownership', () => {
      const element = {
        id: 'elem-5',
        ownership: {
          type: 'component',
          componentId: 'comp-1',
        },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.component['comp-1']).toEqual([]);
    });
  });

  describe('clearOwnerships', () => {
    it('should clear all ownerships', () => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1', 'elem-2'],
          'screen-2': ['elem-3'],
        },
        component: {
          'comp-1': ['elem-4'],
        },
      };

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should clear empty ownership', () => {
      state.ownership = {};

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should allow adding ownership after clearing', () => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1'],
        },
      };

      ownershipManager.clearOwnerships(state);

      const element = {
        id: 'elem-2',
        ownership: {
          type: 'screen',
          screenId: 'screen-2',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership).toEqual({
        screen: {
          'screen-2': ['elem-2'],
        },
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle element with multiple ownership properties', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
          extraProp: 'ignored',
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership).toEqual({
        screen: {
          'screen-1': ['elem-1'],
        },
      });
    });

    it('should handle ownership with numeric IDs', () => {
      const element = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 123,
        },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership).toEqual({
        screen: {
          '123': ['elem-1'],
        },
      });
    });

    it('should maintain ownership integrity across operations', () => {
      const elem1 = {
        id: 'elem-1',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      const elem2 = {
        id: 'elem-2',
        ownership: {
          type: 'screen',
          screenId: 'screen-1',
        },
      };

      const elem3 = {
        id: 'elem-3',
        ownership: {
          type: 'component',
          componentId: 'comp-1',
        },
      };

      ownershipManager.addOwnership(state, elem1);
      ownershipManager.addOwnership(state, elem2);
      ownershipManager.addOwnership(state, elem3);
      ownershipManager.removeOwnership(state, elem1);

      expect(state.ownership).toEqual({
        screen: {
          'screen-1': ['elem-2'],
        },
        component: {
          'comp-1': ['elem-3'],
        },
      });
    });
  });
});

