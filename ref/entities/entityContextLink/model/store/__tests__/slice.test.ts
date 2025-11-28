// ===================================================================
// Unit Tests for entityContextLink Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setContextLinks,
  setHoveredContextLinkId,
  setFocusedContextLinkId,
  setSelectedContextLinkId,
  resetSelectedContextLink,
  addContextLink,
  updateContextLink,
  removeContextLink,
} from '../slice';

describe('entityContextLink Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredId).toBeNull();
      expect(state.focusedId).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredContextLinkId', () => {
      it('should set hovered context link ID', () => {
        const state = reducer(initialState, setHoveredContextLinkId({ id: 'link-1' }));

        expect(state.hoveredId).toBe('link-1');
      });

      it('should update hovered context link ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'link-1',
        };

        const state = reducer(stateWithHover, setHoveredContextLinkId({ id: 'link-2' }));

        expect(state.hoveredId).toBe('link-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'link-1',
        };

        const state = reducer(stateWithHover, setHoveredContextLinkId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedContextLinkId', () => {
      it('should set focused context link ID', () => {
        const state = reducer(initialState, setFocusedContextLinkId({ id: 'link-1' }));

        expect(state.focusedId).toBe('link-1');
      });

      it('should update focused context link ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'link-1',
        };

        const state = reducer(stateWithFocus, setFocusedContextLinkId({ id: 'link-2' }));

        expect(state.focusedId).toBe('link-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'link-1',
        };

        const state = reducer(stateWithFocus, setFocusedContextLinkId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedContextLinkId', () => {
      it('should set selected context link ID', () => {
        const state = reducer(initialState, setSelectedContextLinkId({ id: 'link-1' }));

        expect(state.selectedId).toBe('link-1');
      });

      it('should update selected context link ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'link-1',
        };

        const state = reducer(stateWithSelection, setSelectedContextLinkId({ id: 'link-2' }));

        expect(state.selectedId).toBe('link-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'link-1',
        };

        const state = reducer(stateWithSelection, setSelectedContextLinkId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedContextLink', () => {
      it('should reset selected context link to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'link-1',
        };

        const state = reducer(stateWithSelection, resetSelectedContextLink());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'link-1',
          focusedId: 'link-2',
          selectedId: 'link-3',
        };

        const state = reducer(stateWithUI, resetSelectedContextLink());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('link-1');
        expect(state.focusedId).toBe('link-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setContextLinks', () => {
      it('should set context links from array', () => {
        const links = [
          { id: 'l1', sourceId: 'source-1', targetId: 'target-1', type: 'reference' },
          { id: 'l2', sourceId: 'source-2', targetId: 'target-2', type: 'dependency' },
        ];

        const state = reducer(initialState, setContextLinks(links));

        expect(state.ids).toEqual(['l1', 'l2']);
        expect(state.entities.l1).toEqual(links[0]);
        expect(state.entities.l2).toEqual(links[1]);
      });

      it('should replace existing context links', () => {
        const stateWithLinks = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', type: 'old' } },
        };

        const newLinks = [
          { id: 'new1', type: 'new1' },
          { id: 'new2', type: 'new2' },
        ];

        const state = reducer(stateWithLinks, setContextLinks(newLinks));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newLinks[0]);
      });

      it('should handle empty array', () => {
        const stateWithLinks = {
          ...initialState,
          ids: ['l1'],
          entities: { l1: { id: 'l1', type: 'link' } },
        };

        const state = reducer(stateWithLinks, setContextLinks([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting context links', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const links = [{ id: 'l1', type: 'link' }];

        const state = reducer(stateWithUI, setContextLinks(links));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addContextLink', () => {
      it('should add new context link', () => {
        const link = { id: 'l1', sourceId: 'src-1', targetId: 'tgt-1', type: 'reference' };

        const state = reducer(initialState, addContextLink(link));

        expect(state.ids).toContain('l1');
        expect(state.entities.l1).toEqual(link);
      });

      it('should add multiple context links', () => {
        let state = initialState;

        state = reducer(state, addContextLink({ id: 'l1', type: 'link1' }));
        state = reducer(state, addContextLink({ id: 'l2', type: 'link2' }));

        expect(state.ids).toEqual(['l1', 'l2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate context link if ID already exists', () => {
        const stateWithLink = {
          ...initialState,
          ids: ['l1'],
          entities: { l1: { id: 'l1', type: 'original' } },
        };

        const state = reducer(stateWithLink, addContextLink({ id: 'l1', type: 'updated' }));

        expect(state.ids.filter((id: string) => id === 'l1')).toHaveLength(1);
      });
    });

    describe('updateContextLink', () => {
      it('should update existing context link', () => {
        const stateWithLink = {
          ...initialState,
          ids: ['l1'],
          entities: {
            l1: { id: 'l1', sourceId: 'src-1', targetId: 'tgt-1', type: 'reference' },
          },
        };

        const state = reducer(
          stateWithLink,
          updateContextLink({ id: 'l1', type: 'dependency' }),
        );

        expect(state.entities.l1.type).toBe('dependency');
        expect(state.entities.l1.sourceId).toBe('src-1');
      });

      it('should not update non-existent context link', () => {
        const state = reducer(
          initialState,
          updateContextLink({ id: 'non-existent', type: 'test' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithLink = {
          ...initialState,
          ids: ['l1'],
          entities: {
            l1: { id: 'l1', sourceId: 'src-1', targetId: 'tgt-1', type: 'reference', metadata: { created: '2024-01-01' } },
          },
        };

        const state = reducer(
          stateWithLink,
          updateContextLink({ id: 'l1', type: 'dependency' }),
        );

        expect(state.entities.l1.type).toBe('dependency');
        expect(state.entities.l1.sourceId).toBe('src-1');
        expect(state.entities.l1.metadata).toEqual({ created: '2024-01-01' });
      });
    });

    describe('removeContextLink', () => {
      it('should remove context link from entities and ids', () => {
        const stateWithLinks = {
          ...initialState,
          ids: ['l1', 'l2'],
          entities: {
            l1: { id: 'l1', type: 'link1' },
            l2: { id: 'l2', type: 'link2' },
          },
        };

        const state = reducer(stateWithLinks, removeContextLink('l1'));

        expect(state.ids).toEqual(['l2']);
        expect(state.entities.l1).toBeUndefined();
        expect(state.entities.l2).toBeDefined();
      });

      it('should handle removing non-existent context link', () => {
        const state = reducer(initialState, removeContextLink('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other context links', () => {
        const stateWithLinks = {
          ...initialState,
          ids: ['l1', 'l2', 'l3'],
          entities: {
            l1: { id: 'l1' },
            l2: { id: 'l2' },
            l3: { id: 'l3' },
          },
        };

        const state = reducer(stateWithLinks, removeContextLink('l2'));

        expect(state.ids).toEqual(['l1', 'l3']);
        expect(state.entities.l1).toBeDefined();
        expect(state.entities.l3).toBeDefined();
      });

      it('should preserve UI state when removing context link', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['l1'],
          entities: { l1: { id: 'l1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeContextLink('l1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full context link lifecycle', () => {
      let state = initialState;

      // Add context link
      state = reducer(state, addContextLink({ id: 'l1', sourceId: 'src-1', targetId: 'tgt-1', type: 'reference' }));
      expect(state.ids).toContain('l1');

      // Select context link
      state = reducer(state, setSelectedContextLinkId({ id: 'l1' }));
      expect(state.selectedId).toBe('l1');

      // Update context link
      state = reducer(state, updateContextLink({ id: 'l1', type: 'dependency' }));
      expect(state.entities.l1.type).toBe('dependency');

      // Remove context link
      state = reducer(state, removeContextLink('l1'));
      expect(state.entities.l1).toBeUndefined();
    });

    it('should handle multiple context links with different UI states', () => {
      let state = initialState;

      state = reducer(state, setContextLinks([
        { id: 'l1', type: 'reference' },
        { id: 'l2', type: 'dependency' },
        { id: 'l3', type: 'association' },
      ]));

      state = reducer(state, setSelectedContextLinkId({ id: 'l1' }));
      state = reducer(state, setFocusedContextLinkId({ id: 'l2' }));
      state = reducer(state, setHoveredContextLinkId({ id: 'l3' }));

      expect(state.selectedId).toBe('l1');
      expect(state.focusedId).toBe('l2');
      expect(state.hoveredId).toBe('l3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addContextLink({ id: 'l1', type: 'link1' }));
      state = reducer(state, addContextLink({ id: 'l2', type: 'link2' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setContextLinks)
      state = reducer(state, setContextLinks([
        { id: 'l1', type: 'link1-updated' },
        { id: 'l2', type: 'link2-updated' },
        { id: 'l3', type: 'link3' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateContextLink({ id: 'l1', type: 'link1-final' }));
      expect(state.entities.l1.type).toBe('link1-final');

      // Delete
      state = reducer(state, removeContextLink('l2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.l2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const links = [
        { id: 'l1', type: 'link1' },
        { id: 'l2', type: 'link2' },
      ];

      const state = reducer(initialState, setContextLinks(links));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const link = {
        id: 'l1',
        sourceId: 'src-1',
        targetId: 'tgt-1',
        type: 'reference',
        metadata: { strength: 'strong', bidirectional: true },
      };

      const state = reducer(initialState, addContextLink(link));

      expect(state.entities.l1).toEqual(link);
      expect(state.entities.l1.metadata).toEqual({ strength: 'strong', bidirectional: true });
    });

    it('should handle context links with complex data', () => {
      const link = {
        id: 'l1',
        sourceId: 'document-123',
        targetId: 'task-456',
        type: 'reference',
        metadata: {
          created: '2024-01-01T00:00:00Z',
          createdBy: 'user-789',
          strength: 'strong',
          bidirectional: false,
          tags: ['important', 'review'],
          properties: {
            color: 'blue',
            weight: 5,
          },
        },
      };

      const state = reducer(initialState, addContextLink(link));

      expect(state.entities.l1).toEqual(link);
    });
  });
});

