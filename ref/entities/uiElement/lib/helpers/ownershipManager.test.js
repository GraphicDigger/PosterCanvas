// ===================================================================
// OWNERSHIP MANAGER - COMPREHENSIVE TESTS
// ===================================================================
// Entity: uiElement
// Manager: ownershipManager
// Purpose: Manage element ownership tracking in Redux state
// Coverage: Add, remove, clear ownership operations
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { ownershipManager } from './ownershipManager';

describe('ownershipManager', () => {
  let state;

  beforeEach(() => {
    state = {
      ownership: {},
    };
  });

  // ===================================================================
  // ADD OWNERSHIP TESTS
  // ===================================================================

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

      expect(state.ownership).toHaveProperty('screen');
      expect(state.ownership.screen).toHaveProperty('screen-1');
      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);
    });

    it('should add ownership to existing type', () => {
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

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);
      expect(state.ownership.screen['screen-2']).toEqual(['elem-2']);
    });

    it('should add multiple elements to same owner', () => {
      const element1 = {
        id: 'elem-1',
        ownership: { type: 'component', componentId: 'comp-1' },
      };
      const element2 = {
        id: 'elem-2',
        ownership: { type: 'component', componentId: 'comp-1' },
      };

      ownershipManager.addOwnership(state, element1);
      ownershipManager.addOwnership(state, element2);

      expect(state.ownership.component['comp-1']).toEqual(['elem-1', 'elem-2']);
    });

    it('should not duplicate element ID if already owned', () => {
      const element = {
        id: 'elem-1',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };

      ownershipManager.addOwnership(state, element);
      ownershipManager.addOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);
    });

    it('should handle multiple ownership types', () => {
      const screenElement = {
        id: 'elem-1',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };
      const componentElement = {
        id: 'elem-2',
        ownership: { type: 'component', componentId: 'comp-1' },
      };

      ownershipManager.addOwnership(state, screenElement);
      ownershipManager.addOwnership(state, componentElement);

      expect(state.ownership).toHaveProperty('screen');
      expect(state.ownership).toHaveProperty('component');
      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);
      expect(state.ownership.component['comp-1']).toEqual(['elem-2']);
    });
  });

  // ===================================================================
  // REMOVE OWNERSHIP TESTS
  // ===================================================================

  describe('removeOwnership', () => {
    beforeEach(() => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1', 'elem-2', 'elem-3'],
        },
        component: {
          'comp-1': ['elem-4', 'elem-5'],
        },
      };
    });

    it('should remove element from ownership', () => {
      const element = {
        id: 'elem-2',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-3']);
    });

    it('should remove only specified element', () => {
      const element = {
        id: 'elem-1',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-2', 'elem-3']);
      expect(state.ownership.component['comp-1']).toEqual(['elem-4', 'elem-5']);
    });

    it('should handle removing non-existent element', () => {
      const element = {
        id: 'elem-999',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2', 'elem-3']);
    });

    it('should handle removing from non-existent owner', () => {
      const element = {
        id: 'elem-1',
        ownership: { type: 'screen', screenId: 'screen-999' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2', 'elem-3']);
    });

    it('should handle removing from non-existent type', () => {
      const element = {
        id: 'elem-1',
        ownership: { type: 'nonexistent', someId: 'id-1' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2', 'elem-3']);
    });

    it('should leave empty array after removing last element', () => {
      const element = {
        id: 'elem-4',
        ownership: { type: 'component', componentId: 'comp-1' },
      };

      ownershipManager.removeOwnership(state, element);

      expect(state.ownership.component['comp-1']).toEqual(['elem-5']);
    });
  });

  // ===================================================================
  // CLEAR OWNERSHIPS TESTS
  // ===================================================================

  describe('clearOwnerships', () => {
    it('should clear all ownerships', () => {
      state.ownership = {
        screen: {
          'screen-1': ['elem-1', 'elem-2'],
        },
        component: {
          'comp-1': ['elem-3'],
        },
      };

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should work with empty ownership', () => {
      state.ownership = {};

      ownershipManager.clearOwnerships(state);

      expect(state.ownership).toEqual({});
    });

    it('should allow adding after clear', () => {
      state.ownership = {
        screen: { 'screen-1': ['elem-1'] },
      };

      ownershipManager.clearOwnerships(state);

      const element = {
        id: 'elem-2',
        ownership: { type: 'component', componentId: 'comp-1' },
      };

      ownershipManager.addOwnership(state, element);

      expect(state.ownership.component['comp-1']).toEqual(['elem-2']);
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should handle complete workflow', () => {
      // Add
      const elem1 = {
        id: 'elem-1',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };
      ownershipManager.addOwnership(state, elem1);
      expect(state.ownership.screen['screen-1']).toEqual(['elem-1']);

      // Add more
      const elem2 = {
        id: 'elem-2',
        ownership: { type: 'screen', screenId: 'screen-1' },
      };
      ownershipManager.addOwnership(state, elem2);
      expect(state.ownership.screen['screen-1']).toEqual(['elem-1', 'elem-2']);

      // Remove one
      ownershipManager.removeOwnership(state, elem1);
      expect(state.ownership.screen['screen-1']).toEqual(['elem-2']);

      // Clear all
      ownershipManager.clearOwnerships(state);
      expect(state.ownership).toEqual({});
    });

    it('should handle multiple owners and types', () => {
      const elements = [
        { id: 'e1', ownership: { type: 'screen', screenId: 's1' } },
        { id: 'e2', ownership: { type: 'screen', screenId: 's1' } },
        { id: 'e3', ownership: { type: 'screen', screenId: 's2' } },
        { id: 'e4', ownership: { type: 'component', componentId: 'c1' } },
      ];

      elements.forEach(el => ownershipManager.addOwnership(state, el));

      expect(state.ownership.screen.s1).toEqual(['e1', 'e2']);
      expect(state.ownership.screen.s2).toEqual(['e3']);
      expect(state.ownership.component.c1).toEqual(['e4']);
    });
  });
});

