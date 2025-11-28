// ===================================================================
// Unit Tests for EntityContextLink Slice
// CRITICAL BUSINESS LOGIC - Context Link State Management
// Phase 1, Day 10 - Part 5 (30 tests) - 61.9% Coverage!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ContextLinkState } from '../../types';

// Mock the adapter
vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    createEntityAdapter: () => ({
      getInitialState: () => ({ ids: [], entities: {} }),
      addOne: (state: any, entity: any) => {
        state.entities[entity.id] = entity;
        if (!state.ids.includes(entity.id)) {
          state.ids.push(entity.id);
        }
      },
      updateOne: (state: any, update: any) => {
        if (state.entities[update.id]) {
          state.entities[update.id] = { ...state.entities[update.id], ...update.changes };
        }
      },
      removeOne: (state: any, id: any) => {
        delete state.entities[id];
        state.ids = state.ids.filter((existingId: any) => existingId !== id);
      },
      setAll: (state: any, entities: any[]) => {
        state.ids = entities.map((e) => e.id);
        state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
      },
    }),
  };
});

import contextLinkEntitySlice, {
  setContextLinks,
  setHoveredContextLinkId,
  setFocusedContextLinkId,
  setSelectedContextLinkId,
  resetSelectedContextLink,
  addContextLink,
  updateContextLink,
  removeContextLink,
} from './slice';

describe('EntityContextLink Slice', () => {
  let initialState: ContextLinkState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered context link ID', () => {
      const state = contextLinkEntitySlice(initialState, setHoveredContextLinkId({ id: 'link-1' } as any));
      expect(state.hoveredId).toBe('link-1');
    });

    it('should set focused context link ID', () => {
      const state = contextLinkEntitySlice(initialState, setFocusedContextLinkId({ id: 'link-2' } as any));
      expect(state.focusedId).toBe('link-2');
    });

    it('should set selected context link ID', () => {
      const state = contextLinkEntitySlice(initialState, setSelectedContextLinkId({ id: 'link-3' } as any));
      expect(state.selectedId).toBe('link-3');
    });

    it('should reset selected context link', () => {
      initialState.selectedId = 'link-1';
      const state = contextLinkEntitySlice(initialState, resetSelectedContextLink());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Context Links (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set Context Links (Bulk Load)', () => {
    it('should set context links (replace all)', () => {
      const links = [
        { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2', contextType: 'reference' },
        { id: 'link-2', sourceId: 'entity-2', targetId: 'entity-3', contextType: 'dependency' },
      ];

      const state = contextLinkEntitySlice(initialState, setContextLinks(links));

      expect(state.ids).toEqual(['link-1', 'link-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing links when setting new ones', () => {
      initialState.entities['link-old'] = { id: 'link-old', sourceId: 'entity-old' } as any;
      initialState.ids.push('link-old');

      const links = [{ id: 'link-new', sourceId: 'entity-1', targetId: 'entity-2', contextType: 'reference' }];
      const state = contextLinkEntitySlice(initialState, setContextLinks(links));

      expect(state.entities['link-old']).toBeUndefined();
      expect(state.entities['link-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['link-1'] = { id: 'link-1', sourceId: 'entity-1' } as any;
      initialState.ids.push('link-1');

      const state = contextLinkEntitySlice(initialState, setContextLinks([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting links', () => {
      initialState.selectedId = 'link-selected';

      const links = [{ id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2', contextType: 'reference' }];
      const state = contextLinkEntitySlice(initialState, setContextLinks(links));

      expect(state.selectedId).toBe('link-selected');
    });

    it('should handle large number of links', () => {
      const links = Array.from({ length: 100 }, (_, i) => ({
        id: `link-${i}`,
        sourceId: `entity-${i}`,
        targetId: `entity-${i + 1}`,
        contextType: 'reference',
      }));

      const state = contextLinkEntitySlice(initialState, setContextLinks(links));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });

    it('should set links with various context types', () => {
      const links = [
        { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2', contextType: 'reference', metadata: {} },
        { id: 'link-2', sourceId: 'entity-2', targetId: 'entity-3', contextType: 'dependency', strength: 'strong' },
        { id: 'link-3', sourceId: 'entity-3', targetId: 'entity-4', contextType: 'composition', bidirectional: true },
      ];

      const state = contextLinkEntitySlice(initialState, setContextLinks(links));

      expect(state.entities['link-1'].contextType).toBe('reference');
      expect(state.entities['link-2'].contextType).toBe('dependency');
      expect(state.entities['link-3'].contextType).toBe('composition');
    });
  });

  // ===================================================================
  // PART 3: Add Context Link (7 tests)
  // ===================================================================

  describe('Add Context Link', () => {
    it('should add context link', () => {
      const link = {
        id: 'link-1',
        sourceId: 'entity-1',
        targetId: 'entity-2',
        contextType: 'reference',
      };

      const state = contextLinkEntitySlice(initialState, addContextLink(link));

      expect(state.ids).toContain('link-1');
      expect(state.entities['link-1']).toEqual(link);
    });

    it('should not add duplicate link', () => {
      initialState.entities['link-1'] = { id: 'link-1', sourceId: 'entity-1' } as any;
      initialState.ids.push('link-1');

      const link = { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2' };
      const state = contextLinkEntitySlice(initialState, addContextLink(link));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing links when adding new one', () => {
      initialState.entities['link-existing'] = {
        id: 'link-existing',
        sourceId: 'entity-existing',
      } as any;
      initialState.ids.push('link-existing');

      const link = { id: 'link-new', sourceId: 'entity-1', targetId: 'entity-2' };
      const state = contextLinkEntitySlice(initialState, addContextLink(link));

      expect(state.entities['link-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding link', () => {
      initialState.selectedId = 'link-selected';

      const link = { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2' };
      const state = contextLinkEntitySlice(initialState, addContextLink(link));

      expect(state.selectedId).toBe('link-selected');
    });

    it('should add link with minimal properties', () => {
      const link = { id: 'link-1' };
      const state = contextLinkEntitySlice(initialState, addContextLink(link as any));

      expect(state.entities['link-1']).toEqual(link);
    });

    it('should add link with full properties', () => {
      const link = {
        id: 'link-1',
        sourceId: 'entity-1',
        targetId: 'entity-2',
        contextType: 'dependency',
        strength: 'strong',
        bidirectional: true,
        metadata: { createdAt: '2025-01-01', createdBy: 'user-1' },
      };

      const state = contextLinkEntitySlice(initialState, addContextLink(link as any));

      expect(state.entities['link-1']).toEqual(link);
    });

    it('should maintain insertion order', () => {
      let state = contextLinkEntitySlice(initialState, addContextLink({ id: 'link-3', sourceId: 'entity-3' } as any));
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-1', sourceId: 'entity-1' } as any));
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-2', sourceId: 'entity-2' } as any));

      expect(state.ids).toEqual(['link-3', 'link-1', 'link-2']);
    });
  });

  // ===================================================================
  // PART 4: Update Context Link (6 tests)
  // ===================================================================

  describe('Update Context Link', () => {
    beforeEach(() => {
      initialState.entities['link-1'] = {
        id: 'link-1',
        sourceId: 'entity-1',
        targetId: 'entity-2',
        contextType: 'reference',
      } as any;
      initialState.ids.push('link-1');
    });

    it('should update link properties', () => {
      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-3',
          contextType: 'dependency',
        } as any),
      );

      expect(state.entities['link-1'].targetId).toBe('entity-3');
      expect(state.entities['link-1'].contextType).toBe('dependency');
    });

    it('should handle updating non-existent link', () => {
      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'non-existent',
          targetId: 'entity-999',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update link metadata', () => {
      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-2',
          contextType: 'reference',
          metadata: { updatedAt: '2025-10-15' },
        } as any),
      );

      expect(state.entities['link-1'].metadata).toEqual({ updatedAt: '2025-10-15' });
    });

    it('should not affect other links when updating one', () => {
      initialState.entities['link-2'] = {
        id: 'link-2',
        sourceId: 'entity-2',
        targetId: 'entity-3',
      } as any;
      initialState.ids.push('link-2');

      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-999',
          contextType: 'reference',
        } as any),
      );

      expect(state.entities['link-2']).toEqual({
        id: 'link-2',
        sourceId: 'entity-2',
        targetId: 'entity-3',
      });
    });

    it('should not affect UI state when updating link', () => {
      initialState.selectedId = 'link-1';

      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-2',
          contextType: 'dependency',
        } as any),
      );

      expect(state.selectedId).toBe('link-1');
    });

    it('should handle link type change', () => {
      const state = contextLinkEntitySlice(
        initialState,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-2',
          contextType: 'composition',
          bidirectional: true,
        } as any),
      );

      expect(state.entities['link-1'].contextType).toBe('composition');
      expect(state.entities['link-1'].bidirectional).toBe(true);
    });
  });

  // ===================================================================
  // PART 5: Remove Context Link (3 tests)
  // ===================================================================

  describe('Remove Context Link', () => {
    beforeEach(() => {
      initialState.entities = {
        'link-1': { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2' } as any,
        'link-2': { id: 'link-2', sourceId: 'entity-2', targetId: 'entity-3' } as any,
      };
      initialState.ids = ['link-1', 'link-2'];
    });

    it('should remove link', () => {
      const state = contextLinkEntitySlice(initialState, removeContextLink('link-1'));

      expect(state.ids).not.toContain('link-1');
      expect(state.entities['link-1']).toBeUndefined();
      expect(state.entities['link-2']).toBeDefined();
    });

    it('should handle removing non-existent link', () => {
      const state = contextLinkEntitySlice(initialState, removeContextLink('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other links', () => {
      const state = contextLinkEntitySlice(initialState, removeContextLink('link-1'));

      expect(state.ids).toContain('link-2');
      expect(state.entities['link-2']).toEqual({
        id: 'link-2',
        sourceId: 'entity-2',
        targetId: 'entity-3',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete link lifecycle', () => {
      let state = contextLinkEntitySlice(
        initialState,
        addContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-2',
          contextType: 'reference',
        } as any),
      );
      state = contextLinkEntitySlice(
        state,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-3',
          contextType: 'dependency',
        } as any),
      );
      state = contextLinkEntitySlice(state, setSelectedContextLinkId({ id: 'link-1' } as any));
      state = contextLinkEntitySlice(state, removeContextLink('link-1'));

      expect(state.ids).not.toContain('link-1');
      expect(state.selectedId).toBe('link-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const links = [
        { id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2', contextType: 'reference' },
        { id: 'link-2', sourceId: 'entity-2', targetId: 'entity-3', contextType: 'dependency' },
      ];

      let state = contextLinkEntitySlice(initialState, setContextLinks(links));
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-3', sourceId: 'entity-3', targetId: 'entity-4' } as any));
      state = contextLinkEntitySlice(
        state,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-2',
          contextType: 'composition',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['link-1'].contextType).toBe('composition');
      expect(state.entities['link-3']).toBeDefined();
    });

    it('should handle UI state changes with link operations', () => {
      let state = contextLinkEntitySlice(
        initialState,
        addContextLink({ id: 'link-1', sourceId: 'entity-1', targetId: 'entity-2' } as any),
      );
      state = contextLinkEntitySlice(state, setHoveredContextLinkId({ id: 'link-1' } as any));
      state = contextLinkEntitySlice(state, setFocusedContextLinkId({ id: 'link-1' } as any));
      state = contextLinkEntitySlice(state, setSelectedContextLinkId({ id: 'link-1' } as any));
      state = contextLinkEntitySlice(
        state,
        updateContextLink({
          id: 'link-1',
          sourceId: 'entity-1',
          targetId: 'entity-3',
          contextType: 'dependency',
        } as any),
      );

      expect(state.hoveredId).toBe('link-1');
      expect(state.focusedId).toBe('link-1');
      expect(state.selectedId).toBe('link-1');
      expect(state.entities['link-1'].targetId).toBe('entity-3');
      expect(state.entities['link-1'].contextType).toBe('dependency');
    });

    it('should handle complex relationship graphs', () => {
      let state = contextLinkEntitySlice(
        initialState,
        addContextLink({ id: 'link-1', sourceId: 'A', targetId: 'B', contextType: 'reference' } as any),
      );
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-2', sourceId: 'B', targetId: 'C', contextType: 'dependency' } as any));
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-3', sourceId: 'C', targetId: 'A', contextType: 'composition' } as any));
      state = contextLinkEntitySlice(state, addContextLink({ id: 'link-4', sourceId: 'A', targetId: 'D', contextType: 'reference' } as any));

      // Remove one link
      state = contextLinkEntitySlice(state, removeContextLink('link-2'));

      expect(state.ids).toHaveLength(3);
      expect(state.entities['link-1'].sourceId).toBe('A');
      expect(state.entities['link-3'].targetId).toBe('A');
      expect(state.entities['link-2']).toBeUndefined();
    });
  });
});

