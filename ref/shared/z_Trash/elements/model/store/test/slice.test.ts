// ===================================================================
// Unit Tests for UiDefaultEntity Slice
// CRITICAL BUSINESS LOGIC - UI Default Entity State Management
// Phase 1, Day 10 - Part 6 (30 tests) - 62% Coverage! 🎯
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { UiDefaultEntityState } from '../../../types';

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

import uiDefaultEntitySlice, {
  setUiDefaultEntities,
  setHoveredUiDefaultEntityId,
  setFocusedUiDefaultEntityId,
  setSelectedUiDefaultEntityId,
  resetSelectedUiDefaultEntity,
  addUiDefaultEntity,
  updateUiDefaultEntity,
  removeUiDefaultEntity,
} from '../slice';

describe('UiDefaultEntity Slice', () => {
  let initialState: UiDefaultEntityState;

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
    it('should set hovered UI default entity ID', () => {
      const state = uiDefaultEntitySlice(initialState, setHoveredUiDefaultEntityId({ id: 'default-1' } as any));
      expect(state.hoveredId).toBe('default-1');
    });

    it('should set focused UI default entity ID', () => {
      const state = uiDefaultEntitySlice(initialState, setFocusedUiDefaultEntityId({ id: 'default-2' } as any));
      expect(state.focusedId).toBe('default-2');
    });

    it('should set selected UI default entity ID', () => {
      const state = uiDefaultEntitySlice(initialState, setSelectedUiDefaultEntityId({ id: 'default-3' } as any));
      expect(state.selectedId).toBe('default-3');
    });

    it('should reset selected UI default entity', () => {
      initialState.selectedId = 'default-1';
      const state = uiDefaultEntitySlice(initialState, resetSelectedUiDefaultEntity());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set UI Default Entities (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set UI Default Entities (Bulk Load)', () => {
    it('should set UI default entities (replace all)', () => {
      const entities = [
        { id: 'default-1', name: 'Button', category: 'input', properties: {} },
        { id: 'default-2', name: 'Input', category: 'input', properties: {} },
      ];

      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));

      expect(state.ids).toEqual(['default-1', 'default-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing entities when setting new ones', () => {
      initialState.entities['default-old'] = { id: 'default-old', name: 'Old' } as any;
      initialState.ids.push('default-old');

      const entities = [{ id: 'default-new', name: 'New', category: 'layout' }];
      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));

      expect(state.entities['default-old']).toBeUndefined();
      expect(state.entities['default-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['default-1'] = { id: 'default-1', name: 'Entity' } as any;
      initialState.ids.push('default-1');

      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting entities', () => {
      initialState.selectedId = 'default-selected';

      const entities = [{ id: 'default-1', name: 'Button', category: 'input' }];
      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));

      expect(state.selectedId).toBe('default-selected');
    });

    it('should handle large number of entities', () => {
      const entities = Array.from({ length: 50 }, (_, i) => ({
        id: `default-${i}`,
        name: `Entity ${i}`,
        category: 'component',
      }));

      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });

    it('should set entities with various categories', () => {
      const entities = [
        { id: 'default-1', name: 'Button', category: 'input', icon: 'button-icon' },
        { id: 'default-2', name: 'Container', category: 'layout', icon: 'box-icon' },
        { id: 'default-3', name: 'Text', category: 'content', icon: 'text-icon' },
      ];

      const state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));

      expect(state.entities['default-1'].category).toBe('input');
      expect(state.entities['default-2'].category).toBe('layout');
      expect(state.entities['default-3'].category).toBe('content');
    });
  });

  // ===================================================================
  // PART 3: Add UI Default Entity (7 tests)
  // ===================================================================

  describe('Add UI Default Entity', () => {
    it('should add UI default entity', () => {
      const entity = {
        id: 'default-1',
        name: 'Button',
        category: 'input',
      };

      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity));

      expect(state.ids).toContain('default-1');
      expect(state.entities['default-1']).toEqual(entity);
    });

    it('should not add duplicate entity', () => {
      initialState.entities['default-1'] = { id: 'default-1', name: 'Existing' } as any;
      initialState.ids.push('default-1');

      const entity = { id: 'default-1', name: 'Duplicate' };
      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing entities when adding new one', () => {
      initialState.entities['default-existing'] = {
        id: 'default-existing',
        name: 'Existing',
      } as any;
      initialState.ids.push('default-existing');

      const entity = { id: 'default-new', name: 'New', category: 'layout' };
      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity));

      expect(state.entities['default-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding entity', () => {
      initialState.selectedId = 'default-selected';

      const entity = { id: 'default-1', name: 'Entity', category: 'input' };
      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity));

      expect(state.selectedId).toBe('default-selected');
    });

    it('should add entity with minimal properties', () => {
      const entity = { id: 'default-1' };
      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity as any));

      expect(state.entities['default-1']).toEqual(entity);
    });

    it('should add entity with full properties', () => {
      const entity = {
        id: 'default-1',
        name: 'Advanced Button',
        category: 'input',
        icon: 'button-icon',
        description: 'A customizable button component',
        properties: {
          variant: 'primary',
          size: 'medium',
          disabled: false,
        },
        defaultStyles: {
          backgroundColor: '#007bff',
          color: '#ffffff',
        },
      };

      const state = uiDefaultEntitySlice(initialState, addUiDefaultEntity(entity as any));

      expect(state.entities['default-1']).toEqual(entity);
    });

    it('should maintain insertion order', () => {
      let state = uiDefaultEntitySlice(initialState, addUiDefaultEntity({ id: 'default-3', name: 'Third' } as any));
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'default-1', name: 'First' } as any));
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'default-2', name: 'Second' } as any));

      expect(state.ids).toEqual(['default-3', 'default-1', 'default-2']);
    });
  });

  // ===================================================================
  // PART 4: Update UI Default Entity (6 tests)
  // ===================================================================

  describe('Update UI Default Entity', () => {
    beforeEach(() => {
      initialState.entities['default-1'] = {
        id: 'default-1',
        name: 'Button',
        category: 'input',
      } as any;
      initialState.ids.push('default-1');
    });

    it('should update entity properties', () => {
      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Advanced Button',
          category: 'input',
          icon: 'button-icon',
        } as any),
      );

      expect(state.entities['default-1'].name).toBe('Advanced Button');
      expect(state.entities['default-1'].icon).toBe('button-icon');
    });

    it('should handle updating non-existent entity', () => {
      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'non-existent',
          name: 'Ghost',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update entity category', () => {
      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Button',
          category: 'interactive',
        } as any),
      );

      expect(state.entities['default-1'].category).toBe('interactive');
    });

    it('should not affect other entities when updating one', () => {
      initialState.entities['default-2'] = {
        id: 'default-2',
        name: 'Other Entity',
      } as any;
      initialState.ids.push('default-2');

      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Updated Button',
          category: 'input',
        } as any),
      );

      expect(state.entities['default-2']).toEqual({
        id: 'default-2',
        name: 'Other Entity',
      });
    });

    it('should not affect UI state when updating entity', () => {
      initialState.selectedId = 'default-1';

      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Updated',
          category: 'input',
        } as any),
      );

      expect(state.selectedId).toBe('default-1');
    });

    it('should handle properties update', () => {
      const state = uiDefaultEntitySlice(
        initialState,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Button',
          category: 'input',
          properties: {
            variant: 'secondary',
            size: 'large',
          },
        } as any),
      );

      expect(state.entities['default-1'].properties).toEqual({
        variant: 'secondary',
        size: 'large',
      });
    });
  });

  // ===================================================================
  // PART 5: Remove UI Default Entity (3 tests)
  // ===================================================================

  describe('Remove UI Default Entity', () => {
    beforeEach(() => {
      initialState.entities = {
        'default-1': { id: 'default-1', name: 'Entity 1' } as any,
        'default-2': { id: 'default-2', name: 'Entity 2' } as any,
      };
      initialState.ids = ['default-1', 'default-2'];
    });

    it('should remove entity', () => {
      const state = uiDefaultEntitySlice(initialState, removeUiDefaultEntity('default-1'));

      expect(state.ids).not.toContain('default-1');
      expect(state.entities['default-1']).toBeUndefined();
      expect(state.entities['default-2']).toBeDefined();
    });

    it('should handle removing non-existent entity', () => {
      const state = uiDefaultEntitySlice(initialState, removeUiDefaultEntity('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other entities', () => {
      const state = uiDefaultEntitySlice(initialState, removeUiDefaultEntity('default-1'));

      expect(state.ids).toContain('default-2');
      expect(state.entities['default-2']).toEqual({
        id: 'default-2',
        name: 'Entity 2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete entity lifecycle', () => {
      let state = uiDefaultEntitySlice(
        initialState,
        addUiDefaultEntity({
          id: 'default-1',
          name: 'Button',
          category: 'input',
        } as any),
      );
      state = uiDefaultEntitySlice(
        state,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Advanced Button',
          category: 'input',
          icon: 'button-icon',
        } as any),
      );
      state = uiDefaultEntitySlice(state, setSelectedUiDefaultEntityId({ id: 'default-1' } as any));
      state = uiDefaultEntitySlice(state, removeUiDefaultEntity('default-1'));

      expect(state.ids).not.toContain('default-1');
      expect(state.selectedId).toBe('default-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const entities = [
        { id: 'default-1', name: 'Button', category: 'input' },
        { id: 'default-2', name: 'Container', category: 'layout' },
      ];

      let state = uiDefaultEntitySlice(initialState, setUiDefaultEntities(entities));
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'default-3', name: 'Text', category: 'content' } as any));
      state = uiDefaultEntitySlice(
        state,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Primary Button',
          category: 'input',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['default-1'].name).toBe('Primary Button');
      expect(state.entities['default-3']).toBeDefined();
    });

    it('should handle UI state changes with entity operations', () => {
      let state = uiDefaultEntitySlice(
        initialState,
        addUiDefaultEntity({ id: 'default-1', name: 'Entity', category: 'input' } as any),
      );
      state = uiDefaultEntitySlice(state, setHoveredUiDefaultEntityId({ id: 'default-1' } as any));
      state = uiDefaultEntitySlice(state, setFocusedUiDefaultEntityId({ id: 'default-1' } as any));
      state = uiDefaultEntitySlice(state, setSelectedUiDefaultEntityId({ id: 'default-1' } as any));
      state = uiDefaultEntitySlice(
        state,
        updateUiDefaultEntity({
          id: 'default-1',
          name: 'Updated Entity',
          category: 'input',
        } as any),
      );

      expect(state.hoveredId).toBe('default-1');
      expect(state.focusedId).toBe('default-1');
      expect(state.selectedId).toBe('default-1');
      expect(state.entities['default-1'].name).toBe('Updated Entity');
    });

    it('should handle component library building', () => {
      let state = uiDefaultEntitySlice(
        initialState,
        addUiDefaultEntity({ id: 'btn-1', name: 'Primary Button', category: 'input' } as any),
      );
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'btn-2', name: 'Secondary Button', category: 'input' } as any));
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'container-1', name: 'Flex Container', category: 'layout' } as any));
      state = uiDefaultEntitySlice(state, addUiDefaultEntity({ id: 'text-1', name: 'Heading', category: 'content' } as any));

      // Update a component
      state = uiDefaultEntitySlice(
        state,
        updateUiDefaultEntity({
          id: 'btn-1',
          name: 'Primary Button',
          category: 'input',
          properties: { variant: 'primary', size: 'large' },
        } as any),
      );

      // Remove unused component
      state = uiDefaultEntitySlice(state, removeUiDefaultEntity('btn-2'));

      expect(state.ids).toHaveLength(3);
      expect(state.entities['btn-1'].properties).toBeDefined();
      expect(state.entities['btn-2']).toBeUndefined();
    });
  });
});

