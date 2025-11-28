// ===================================================================
// Unit Tests for WireframeBlock Slice
// CRITICAL BUSINESS LOGIC - Wireframe Block State Management
// Phase 1, Day 3 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import wireframeBlockEntitySlice, {
  setWireframeBlocks,
  setHoveredWireframeBlockId,
  setFocusedWireframeBlockId,
  setSelectedWireframeBlockId,
  addWireframeBlock,
  updateWireframeBlock,
  removeWireframeBlock,
} from './slice';

describe('WireframeBlock Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredWireframeBlockId: null,
        focusedWireframeBlockId: null,
        selectedWireframeBlockId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered wireframe block ID', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        setHoveredWireframeBlockId('block-1'),
      );
      expect(state.ui.hoveredWireframeBlockId).toBe('block-1');
    });

    it('should set focused wireframe block ID', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        setFocusedWireframeBlockId('block-2'),
      );
      expect(state.ui.focusedWireframeBlockId).toBe('block-2');
    });

    it('should set selected wireframe block ID', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        setSelectedWireframeBlockId('block-3'),
      );
      expect(state.ui.selectedWireframeBlockId).toBe('block-3');
    });
  });

  // ===================================================================
  // PART 2: Set Wireframe Blocks (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Wireframe Blocks (Bulk Load)', () => {
    it('should set wireframe blocks (replace all)', () => {
      const blocks = [
        { id: 'block-1', name: 'Header', type: 'container' },
        { id: 'block-2', name: 'Content', type: 'grid' },
      ];

      const state = wireframeBlockEntitySlice(initialState, setWireframeBlocks(blocks));

      expect(state.ids).toEqual(['block-1', 'block-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing blocks when setting new ones', () => {
      initialState.entities['block-old'] = { id: 'block-old', name: 'Old Block' };
      initialState.ids.push('block-old');

      const blocks = [{ id: 'block-new', name: 'New Block', type: 'container' }];
      const state = wireframeBlockEntitySlice(initialState, setWireframeBlocks(blocks));

      expect(state.entities['block-old']).toBeUndefined();
      expect(state.entities['block-new']).toBeDefined();
    });

    it('should handle empty array in setWireframeBlocks', () => {
      initialState.entities['block-1'] = { id: 'block-1', name: 'Block' };
      initialState.ids.push('block-1');

      const state = wireframeBlockEntitySlice(initialState, setWireframeBlocks([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting blocks', () => {
      initialState.ui.hoveredWireframeBlockId = 'block-hover';
      initialState.ui.focusedWireframeBlockId = 'block-focus';

      const blocks = [{ id: 'block-1', name: 'Block', type: 'container' }];
      const state = wireframeBlockEntitySlice(initialState, setWireframeBlocks(blocks));

      expect(state.ui.hoveredWireframeBlockId).toBe('block-hover');
      expect(state.ui.focusedWireframeBlockId).toBe('block-focus');
    });

    it('should set blocks with complete metadata', () => {
      const blocks = [
        {
          id: 'block-1',
          name: 'Header',
          type: 'container',
          layout: 'flex',
          children: ['elem-1', 'elem-2'],
        },
      ];

      const state = wireframeBlockEntitySlice(initialState, setWireframeBlocks(blocks));

      expect(state.entities['block-1'].name).toBe('Header');
      expect(state.entities['block-1'].type).toBe('container');
      expect(state.entities['block-1'].layout).toBe('flex');
      expect(state.entities['block-1'].children).toEqual(['elem-1', 'elem-2']);
    });
  });

  // ===================================================================
  // PART 3: Add Wireframe Block (7 tests)
  // ===================================================================

  describe('Add Wireframe Block', () => {
    it('should add block with basic properties', () => {
      const block = {
        id: 'block-1',
        name: 'Header',
        type: 'container',
      };

      const state = wireframeBlockEntitySlice(initialState, addWireframeBlock(block));

      expect(state.ids).toContain('block-1');
      expect(state.entities['block-1'].name).toBe('Header');
    });

    it('should add block with all metadata', () => {
      const block = {
        id: 'block-1',
        name: 'Content Grid',
        type: 'grid',
        columns: 3,
        gap: '20px',
        children: [],
      };

      const state = wireframeBlockEntitySlice(initialState, addWireframeBlock(block));

      expect(state.entities['block-1'].columns).toBe(3);
      expect(state.entities['block-1'].gap).toBe('20px');
      expect(state.entities['block-1'].children).toEqual([]);
    });

    it('should add multiple blocks sequentially', () => {
      let state = wireframeBlockEntitySlice(
        initialState,
        addWireframeBlock({ id: 'block-1', name: 'Header', type: 'container' }),
      );
      state = wireframeBlockEntitySlice(
        state,
        addWireframeBlock({ id: 'block-2', name: 'Footer', type: 'container' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['block-1'].name).toBe('Header');
      expect(state.entities['block-2'].name).toBe('Footer');
    });

    it('should preserve existing blocks when adding new one', () => {
      let state = wireframeBlockEntitySlice(
        initialState,
        addWireframeBlock({ id: 'block-1', name: 'Block 1', type: 'container' }),
      );
      state = wireframeBlockEntitySlice(
        state,
        addWireframeBlock({ id: 'block-2', name: 'Block 2', type: 'grid' }),
      );

      expect(state.entities['block-1']).toBeDefined();
      expect(state.entities['block-2']).toBeDefined();
    });

    it('should not affect UI state when adding block', () => {
      initialState.ui.selectedWireframeBlockId = 'block-selected';

      const state = wireframeBlockEntitySlice(
        initialState,
        addWireframeBlock({ id: 'block-1', name: 'New Block', type: 'container' }),
      );

      expect(state.ui.selectedWireframeBlockId).toBe('block-selected');
    });

    it('should handle block with null values', () => {
      const block = {
        id: 'block-1',
        name: 'Block',
        type: 'container',
        layout: null,
        children: null,
      };

      const state = wireframeBlockEntitySlice(initialState, addWireframeBlock(block));

      expect(state.entities['block-1'].layout).toBeNull();
      expect(state.entities['block-1'].children).toBeNull();
    });

    it('should handle adding duplicate ID (overwrites)', () => {
      let state = wireframeBlockEntitySlice(
        initialState,
        addWireframeBlock({ id: 'block-1', name: 'First', type: 'container' }),
      );
      state = wireframeBlockEntitySlice(
        state,
        addWireframeBlock({ id: 'block-1', name: 'Second', type: 'grid' }),
      );

      expect(state.entities['block-1'].name).toBe('Second');
      expect(state.entities['block-1'].type).toBe('grid');
      expect(state.ids.filter((id) => id === 'block-1')).toHaveLength(2); // ID duplicated in array
    });
  });

  // ===================================================================
  // PART 4: Update Wireframe Block (7 tests)
  // ===================================================================

  describe('Update Wireframe Block', () => {
    beforeEach(() => {
      initialState.entities['block-1'] = {
        id: 'block-1',
        name: 'Header',
        type: 'container',
        layout: 'flex',
      };
      initialState.ids.push('block-1');
    });

    it('should update block name', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'block-1', changes: { name: 'Updated Header' } }),
      );

      expect(state.entities['block-1'].name).toBe('Updated Header');
    });

    it('should update block type', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'block-1', changes: { type: 'grid' } }),
      );

      expect(state.entities['block-1'].type).toBe('grid');
    });

    it('should update multiple properties at once', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({
          id: 'block-1',
          changes: {
            name: 'Main Container',
            type: 'grid',
            columns: 4,
          },
        }),
      );

      expect(state.entities['block-1'].name).toBe('Main Container');
      expect(state.entities['block-1'].type).toBe('grid');
      expect(state.entities['block-1'].columns).toBe(4);
    });

    it('should preserve unmodified properties', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'block-1', changes: { name: 'New Name' } }),
      );

      expect(state.entities['block-1'].type).toBe('container');
      expect(state.entities['block-1'].layout).toBe('flex');
    });

    it('should handle updating non-existent block', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'non-existent', changes: { name: 'Test' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should not affect UI state when updating block', () => {
      initialState.ui.selectedWireframeBlockId = 'block-selected';

      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'block-1', changes: { name: 'Updated' } }),
      );

      expect(state.ui.selectedWireframeBlockId).toBe('block-selected');
    });

    it('should handle updating with null values', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        updateWireframeBlock({ id: 'block-1', changes: { layout: null } }),
      );

      expect(state.entities['block-1'].layout).toBeNull();
    });
  });

  // ===================================================================
  // PART 5: Remove Wireframe Block (5 tests)
  // ===================================================================

  describe('Remove Wireframe Block', () => {
    beforeEach(() => {
      initialState.entities['block-1'] = {
        id: 'block-1',
        name: 'Header',
        type: 'container',
      };
      initialState.entities['block-2'] = {
        id: 'block-2',
        name: 'Footer',
        type: 'container',
      };
      initialState.ids = ['block-1', 'block-2'];
    });

    it('should remove block by ID', () => {
      const state = wireframeBlockEntitySlice(initialState, removeWireframeBlock('block-1'));

      expect(state.ids).not.toContain('block-1');
      expect(state.entities['block-1']).toBeUndefined();
      expect(state.entities['block-2']).toBeDefined();
    });

    it('should handle removing last block', () => {
      let state = wireframeBlockEntitySlice(initialState, removeWireframeBlock('block-1'));
      state = wireframeBlockEntitySlice(state, removeWireframeBlock('block-2'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle removing non-existent block', () => {
      const state = wireframeBlockEntitySlice(
        initialState,
        removeWireframeBlock('non-existent'),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['block-1']).toBeDefined();
      expect(state.entities['block-2']).toBeDefined();
    });

    it('should not affect UI state when removing block', () => {
      initialState.ui.selectedWireframeBlockId = 'block-1';

      const state = wireframeBlockEntitySlice(initialState, removeWireframeBlock('block-2'));

      expect(state.ui.selectedWireframeBlockId).toBe('block-1');
    });

    it('should handle removing and re-adding same ID', () => {
      let state = wireframeBlockEntitySlice(initialState, removeWireframeBlock('block-1'));
      state = wireframeBlockEntitySlice(
        state,
        addWireframeBlock({ id: 'block-1', name: 'New Block 1', type: 'grid' }),
      );

      expect(state.entities['block-1'].name).toBe('New Block 1');
      expect(state.entities['block-1'].type).toBe('grid');
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle multiple operations in sequence', () => {
      let state = wireframeBlockEntitySlice(
        initialState,
        addWireframeBlock({ id: 'block-1', name: 'Header', type: 'container' }),
      );
      state = wireframeBlockEntitySlice(
        state,
        updateWireframeBlock({ id: 'block-1', changes: { layout: 'flex' } }),
      );
      state = wireframeBlockEntitySlice(state, setSelectedWireframeBlockId('block-1'));

      expect(state.entities['block-1'].name).toBe('Header');
      expect(state.entities['block-1'].layout).toBe('flex');
      expect(state.ui.selectedWireframeBlockId).toBe('block-1');
    });

    it('should maintain data integrity across operations', () => {
      const blocks = [
        { id: 'block-1', name: 'Block 1', type: 'container' },
        { id: 'block-2', name: 'Block 2', type: 'grid' },
      ];

      let state = wireframeBlockEntitySlice(initialState, setWireframeBlocks(blocks));
      state = wireframeBlockEntitySlice(
        state,
        updateWireframeBlock({ id: 'block-1', changes: { layout: 'flex' } }),
      );

      expect(state.entities['block-1'].layout).toBe('flex');
      expect(state.entities['block-2'].name).toBe('Block 2');
      expect(state.entities['block-2'].layout).toBeUndefined();
    });

    it('should handle UI state updates independently from data', () => {
      initialState.entities['block-1'] = {
        id: 'block-1',
        name: 'Block',
        type: 'container',
      };
      initialState.ids.push('block-1');

      let state = wireframeBlockEntitySlice(
        initialState,
        setHoveredWireframeBlockId('block-1'),
      );
      state = wireframeBlockEntitySlice(state, setFocusedWireframeBlockId('block-1'));
      state = wireframeBlockEntitySlice(state, setSelectedWireframeBlockId('block-1'));

      expect(state.ui.hoveredWireframeBlockId).toBe('block-1');
      expect(state.ui.focusedWireframeBlockId).toBe('block-1');
      expect(state.ui.selectedWireframeBlockId).toBe('block-1');
      expect(state.entities['block-1']).toBeDefined();
    });
  });
});
