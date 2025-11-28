// ===================================================================
// Unit Tests for wireframeBlock Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 31 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setHoveredWireframeBlockId,
  setFocusedWireframeBlockId,
  setSelectedWireframeBlockId,
  setWireframeBlocks,
  addWireframeBlock,
  updateWireframeBlock,
  removeWireframeBlock,
} from '../slice';

describe('wireframeBlock Redux Slice', () => {
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

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ui.hoveredWireframeBlockId).toBeNull();
      expect(state.ui.focusedWireframeBlockId).toBeNull();
      expect(state.ui.selectedWireframeBlockId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredWireframeBlockId', () => {
      it('should set hovered wireframe block ID', () => {
        const state = reducer(initialState, setHoveredWireframeBlockId('block-1'));

        expect(state.ui.hoveredWireframeBlockId).toBe('block-1');
      });

      it('should update hovered wireframe block ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithHovered, setHoveredWireframeBlockId('block-2'));

        expect(state.ui.hoveredWireframeBlockId).toBe('block-2');
      });

      it('should clear hovered wireframe block ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithHovered, setHoveredWireframeBlockId(null));

        expect(state.ui.hoveredWireframeBlockId).toBeNull();
      });
    });

    describe('setFocusedWireframeBlockId', () => {
      it('should set focused wireframe block ID', () => {
        const state = reducer(initialState, setFocusedWireframeBlockId('block-1'));

        expect(state.ui.focusedWireframeBlockId).toBe('block-1');
      });

      it('should update focused wireframe block ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithFocused, setFocusedWireframeBlockId('block-2'));

        expect(state.ui.focusedWireframeBlockId).toBe('block-2');
      });

      it('should clear focused wireframe block ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithFocused, setFocusedWireframeBlockId(null));

        expect(state.ui.focusedWireframeBlockId).toBeNull();
      });
    });

    describe('setSelectedWireframeBlockId', () => {
      it('should set selected wireframe block ID', () => {
        const state = reducer(initialState, setSelectedWireframeBlockId('block-1'));

        expect(state.ui.selectedWireframeBlockId).toBe('block-1');
      });

      it('should update selected wireframe block ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithSelected, setSelectedWireframeBlockId('block-2'));

        expect(state.ui.selectedWireframeBlockId).toBe('block-2');
      });

      it('should clear selected wireframe block ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedWireframeBlockId: 'block-1' },
        };

        const state = reducer(stateWithSelected, setSelectedWireframeBlockId(null));

        expect(state.ui.selectedWireframeBlockId).toBeNull();
      });
    });
  });

  describe('Data Actions', () => {
    describe('setWireframeBlocks', () => {
      it('should set wireframe blocks from array', () => {
        const blocks = [
          { id: 'block-1', name: 'Block 1', type: 'container' },
          { id: 'block-2', name: 'Block 2', type: 'text' },
        ];

        const state = reducer(initialState, setWireframeBlocks(blocks));

        expect(state.ids).toEqual(['block-1', 'block-2']);
        expect(state.entities['block-1']).toEqual(blocks[0]);
        expect(state.entities['block-2']).toEqual(blocks[1]);
      });

      it('should replace existing wireframe blocks', () => {
        const stateWithBlocks = {
          ...initialState,
          ids: ['block-old'],
          entities: { 'block-old': { id: 'block-old', name: 'Old' } },
        };

        const newBlocks = [
          { id: 'block-1', name: 'Block 1' },
        ];

        const state = reducer(stateWithBlocks, setWireframeBlocks(newBlocks));

        expect(state.ids).toEqual(['block-1']);
        expect(state.entities['block-old']).toBeUndefined();
        expect(state.entities['block-1']).toEqual(newBlocks[0]);
      });

      it('should handle empty array', () => {
        const stateWithBlocks = {
          ...initialState,
          ids: ['block-1'],
          entities: { 'block-1': { id: 'block-1', name: 'Block 1' } },
        };

        const state = reducer(stateWithBlocks, setWireframeBlocks([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });

    describe('addWireframeBlock', () => {
      it('should add new wireframe block', () => {
        const block = { id: 'block-1', name: 'Block 1', type: 'container' };
        const state = reducer(initialState, addWireframeBlock(block));

        expect(state.ids).toContain('block-1');
        expect(state.entities['block-1']).toEqual(block);
      });

      it('should add multiple wireframe blocks', () => {
        let state = initialState;

        state = reducer(state, addWireframeBlock({ id: 'block-1', name: 'Block 1' }));
        state = reducer(state, addWireframeBlock({ id: 'block-2', name: 'Block 2' }));

        expect(state.ids).toEqual(['block-1', 'block-2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should handle adding block with complex data', () => {
        const block = {
          id: 'block-1',
          name: 'Complex Block',
          type: 'container',
          properties: {
            width: '100%',
            height: '200px',
            backgroundColor: '#fff',
          },
          children: ['block-2', 'block-3'],
        };

        const state = reducer(initialState, addWireframeBlock(block));

        expect(state.entities['block-1']).toEqual(block);
      });
    });

    describe('updateWireframeBlock', () => {
      it('should update existing wireframe block', () => {
        const stateWithBlock = {
          ...initialState,
          ids: ['block-1'],
          entities: { 'block-1': { id: 'block-1', name: 'Original' } },
        };

        const state = reducer(stateWithBlock, updateWireframeBlock({
          id: 'block-1',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['block-1'].name).toBe('Updated');
      });

      it('should partially update wireframe block', () => {
        const stateWithBlock = {
          ...initialState,
          ids: ['block-1'],
          entities: {
            'block-1': {
              id: 'block-1',
              name: 'Block 1',
              type: 'container',
              width: '100px',
            },
          },
        };

        const state = reducer(stateWithBlock, updateWireframeBlock({
          id: 'block-1',
          changes: { width: '200px' },
        }));

        expect(state.entities['block-1'].name).toBe('Block 1');
        expect(state.entities['block-1'].type).toBe('container');
        expect(state.entities['block-1'].width).toBe('200px');
      });

      it('should handle updating non-existent wireframe block', () => {
        const state = reducer(initialState, updateWireframeBlock({
          id: 'non-existent',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });
    });

    describe('removeWireframeBlock', () => {
      it('should remove wireframe block', () => {
        const stateWithBlocks = {
          ...initialState,
          ids: ['block-1', 'block-2'],
          entities: {
            'block-1': { id: 'block-1', name: 'Block 1' },
            'block-2': { id: 'block-2', name: 'Block 2' },
          },
        };

        const state = reducer(stateWithBlocks, removeWireframeBlock('block-1'));

        expect(state.ids).toEqual(['block-2']);
        expect(state.entities['block-1']).toBeUndefined();
        expect(state.entities['block-2']).toBeDefined();
      });

      it('should handle removing non-existent wireframe block', () => {
        const stateWithBlock = {
          ...initialState,
          ids: ['block-1'],
          entities: { 'block-1': { id: 'block-1', name: 'Block 1' } },
        };

        const state = reducer(stateWithBlock, removeWireframeBlock('non-existent'));

        expect(state.ids).toEqual(['block-1']);
        expect(state.entities['block-1']).toBeDefined();
      });

      it('should remove last wireframe block', () => {
        const stateWithBlock = {
          ...initialState,
          ids: ['block-1'],
          entities: { 'block-1': { id: 'block-1', name: 'Block 1' } },
        };

        const state = reducer(stateWithBlock, removeWireframeBlock('block-1'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full wireframe block lifecycle', () => {
      let state = initialState;

      // Add block
      state = reducer(state, addWireframeBlock({ id: 'block-1', name: 'Block 1', type: 'container' }));
      expect(state.ids).toContain('block-1');

      // Select block
      state = reducer(state, setSelectedWireframeBlockId('block-1'));
      expect(state.ui.selectedWireframeBlockId).toBe('block-1');

      // Update block
      state = reducer(state, updateWireframeBlock({ id: 'block-1', changes: { name: 'Updated Block' } }));
      expect(state.entities['block-1'].name).toBe('Updated Block');

      // Remove block
      state = reducer(state, removeWireframeBlock('block-1'));
      expect(state.ids).not.toContain('block-1');
    });

    it('should handle multiple wireframe blocks with UI state', () => {
      let state = initialState;

      // Add multiple blocks
      state = reducer(state, addWireframeBlock({ id: 'block-1', name: 'Block 1' }));
      state = reducer(state, addWireframeBlock({ id: 'block-2', name: 'Block 2' }));
      state = reducer(state, addWireframeBlock({ id: 'block-3', name: 'Block 3' }));

      // Set different UI states
      state = reducer(state, setHoveredWireframeBlockId('block-1'));
      state = reducer(state, setFocusedWireframeBlockId('block-2'));
      state = reducer(state, setSelectedWireframeBlockId('block-3'));

      expect(state.ids).toHaveLength(3);
      expect(state.ui.hoveredWireframeBlockId).toBe('block-1');
      expect(state.ui.focusedWireframeBlockId).toBe('block-2');
      expect(state.ui.selectedWireframeBlockId).toBe('block-3');
    });

    it('should handle batch operations', () => {
      let state = initialState;

      // Batch add
      const blocks = [
        { id: 'block-1', name: 'Block 1' },
        { id: 'block-2', name: 'Block 2' },
        { id: 'block-3', name: 'Block 3' },
      ];

      state = reducer(state, setWireframeBlocks(blocks));
      expect(state.ids).toHaveLength(3);

      // Batch update (simulated)
      state = reducer(state, updateWireframeBlock({ id: 'block-1', changes: { type: 'container' } }));
      state = reducer(state, updateWireframeBlock({ id: 'block-2', changes: { type: 'text' } }));
      state = reducer(state, updateWireframeBlock({ id: 'block-3', changes: { type: 'image' } }));

      expect(state.entities['block-1'].type).toBe('container');
      expect(state.entities['block-2'].type).toBe('text');
      expect(state.entities['block-3'].type).toBe('image');
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
      expect(state.ui).toHaveProperty('hoveredWireframeBlockId');
      expect(state.ui).toHaveProperty('focusedWireframeBlockId');
      expect(state.ui).toHaveProperty('selectedWireframeBlockId');
    });

    it('should handle complex wireframe block data', () => {
      const block = {
        id: 'block-1',
        name: 'Complex Block',
        type: 'container',
        properties: {
          width: '100%',
          height: '200px',
          padding: '10px',
          backgroundColor: '#ffffff',
        },
        children: ['block-2', 'block-3'],
        metadata: {
          created: '2024-01-01',
          modified: '2024-01-15',
        },
      };

      const state = reducer(initialState, addWireframeBlock(block));

      expect(state.entities['block-1']).toEqual(block);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid UI state changes', () => {
      let state = initialState;

      state = reducer(state, setHoveredWireframeBlockId('block-1'));
      state = reducer(state, setHoveredWireframeBlockId('block-2'));
      state = reducer(state, setHoveredWireframeBlockId('block-3'));
      state = reducer(state, setHoveredWireframeBlockId(null));

      expect(state.ui.hoveredWireframeBlockId).toBeNull();
    });

    it('should handle updating then immediately removing block', () => {
      let state = {
        ...initialState,
        ids: ['block-1'],
        entities: { 'block-1': { id: 'block-1', name: 'Original' } },
      };

      state = reducer(state, updateWireframeBlock({ id: 'block-1', changes: { name: 'Updated' } }));
      expect(state.entities['block-1'].name).toBe('Updated');

      state = reducer(state, removeWireframeBlock('block-1'));
      expect(state.entities['block-1']).toBeUndefined();
    });

    it('should handle removing all blocks one by one', () => {
      let state = {
        ...initialState,
        ids: ['block-1', 'block-2', 'block-3'],
        entities: {
          'block-1': { id: 'block-1', name: 'Block 1' },
          'block-2': { id: 'block-2', name: 'Block 2' },
          'block-3': { id: 'block-3', name: 'Block 3' },
        },
      };

      state = reducer(state, removeWireframeBlock('block-1'));
      expect(state.ids).toHaveLength(2);

      state = reducer(state, removeWireframeBlock('block-2'));
      expect(state.ids).toHaveLength(1);

      state = reducer(state, removeWireframeBlock('block-3'));
      expect(state.ids).toHaveLength(0);
      expect(state.entities).toEqual({});
    });
  });
});

