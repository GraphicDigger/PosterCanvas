// ===================================================================
// Unit Tests for Code Slice
// CRITICAL BUSINESS LOGIC - Code Entity State Management
// Phase 1, Day 4 - Part 3 (30 tests) - DAY 4 COMPLETE!
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import codeEntitySlice, {
  setHoveredCodeId,
  setFocusedCodeId,
  setSelectedCodeId,
  resetSelectedCode,
  setCodes,
  updateCode,
  addCode,
} from './slice';

describe('Code Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredCodeId: null,
        focusedCodeId: null,
        selectedCodeId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (8 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered code ID', () => {
      const state = codeEntitySlice(initialState, setHoveredCodeId('code-1'));
      expect(state.ui.hoveredCodeId).toBe('code-1');
    });

    it('should set focused code ID', () => {
      const state = codeEntitySlice(initialState, setFocusedCodeId('code-2'));
      expect(state.ui.focusedCodeId).toBe('code-2');
    });

    it('should set selected code ID', () => {
      const state = codeEntitySlice(initialState, setSelectedCodeId('code-3'));
      expect(state.ui.selectedCodeId).toBe('code-3');
    });

    it('should reset selected code to null', () => {
      initialState.ui.selectedCodeId = 'code-1';

      const state = codeEntitySlice(initialState, resetSelectedCode());

      expect(state.ui.selectedCodeId).toBeNull();
    });

    it('should update multiple UI states independently', () => {
      let state = codeEntitySlice(initialState, setHoveredCodeId('code-1'));
      state = codeEntitySlice(state, setFocusedCodeId('code-2'));
      state = codeEntitySlice(state, setSelectedCodeId('code-3'));

      expect(state.ui.hoveredCodeId).toBe('code-1');
      expect(state.ui.focusedCodeId).toBe('code-2');
      expect(state.ui.selectedCodeId).toBe('code-3');
    });

    it('should clear UI state with null', () => {
      initialState.ui.hoveredCodeId = 'code-1';
      initialState.ui.focusedCodeId = 'code-2';

      let state = codeEntitySlice(initialState, setHoveredCodeId(null));
      state = codeEntitySlice(state, setFocusedCodeId(null));

      expect(state.ui.hoveredCodeId).toBeNull();
      expect(state.ui.focusedCodeId).toBeNull();
    });

    it('should not affect entities when updating UI state', () => {
      initialState.entities['code-1'] = {
        id: 'code-1',
        name: 'Helper Function',
        content: 'function helper() {}',
      };
      initialState.ids.push('code-1');

      const state = codeEntitySlice(initialState, setSelectedCodeId('code-1'));

      expect(state.entities['code-1']).toEqual({
        id: 'code-1',
        name: 'Helper Function',
        content: 'function helper() {}',
      });
    });

    it('should reset selected code without affecting other UI states', () => {
      initialState.ui.hoveredCodeId = 'code-1';
      initialState.ui.focusedCodeId = 'code-2';
      initialState.ui.selectedCodeId = 'code-3';

      const state = codeEntitySlice(initialState, resetSelectedCode());

      expect(state.ui.hoveredCodeId).toBe('code-1');
      expect(state.ui.focusedCodeId).toBe('code-2');
      expect(state.ui.selectedCodeId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Codes (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Codes (Bulk Load)', () => {
    it('should set codes (replace all)', () => {
      const codes = [
        { id: 'code-1', name: 'Function A', content: 'function a() {}' },
        { id: 'code-2', name: 'Function B', content: 'function b() {}' },
      ];

      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.ids).toEqual(['code-1', 'code-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing codes when setting new ones', () => {
      initialState.entities['code-old'] = { id: 'code-old', name: 'Old Code' };
      initialState.ids.push('code-old');

      const codes = [{ id: 'code-new', name: 'New Code', content: 'new()' }];
      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.entities['code-old']).toBeUndefined();
      expect(state.entities['code-new']).toBeDefined();
    });

    it('should handle empty array in setCodes', () => {
      initialState.entities['code-1'] = { id: 'code-1', name: 'Code' };
      initialState.ids.push('code-1');

      const state = codeEntitySlice(initialState, setCodes([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting codes', () => {
      initialState.ui.hoveredCodeId = 'code-hover';
      initialState.ui.focusedCodeId = 'code-focus';

      const codes = [{ id: 'code-1', name: 'Code', content: 'code()' }];
      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.ui.hoveredCodeId).toBe('code-hover');
      expect(state.ui.focusedCodeId).toBe('code-focus');
    });

    it('should set codes with complete metadata', () => {
      const codes = [
        {
          id: 'code-1',
          name: 'Utility Function',
          content: 'export function utility() { return true; }',
          language: 'javascript',
          componentId: 'comp-1',
        },
      ];

      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.entities['code-1'].name).toBe('Utility Function');
      expect(state.entities['code-1'].language).toBe('javascript');
      expect(state.entities['code-1'].componentId).toBe('comp-1');
    });

    it('should handle codes with null values', () => {
      const codes = [
        {
          id: 'code-1',
          name: 'Code',
          content: null,
          language: null,
        },
      ];

      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.entities['code-1'].content).toBeNull();
      expect(state.entities['code-1'].language).toBeNull();
    });

    it('should handle large number of codes', () => {
      const codes = Array.from({ length: 50 }, (_, i) => ({
        id: `code-${i}`,
        name: `Function ${i}`,
        content: `function f${i}() {}`,
      }));

      const state = codeEntitySlice(initialState, setCodes(codes));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });
  });

  // ===================================================================
  // PART 3: Update Code (7 tests)
  // ===================================================================

  describe('Update Code', () => {
    beforeEach(() => {
      initialState.entities['code-1'] = {
        id: 'code-1',
        name: 'Helper Function',
        content: 'function helper() {}',
        language: 'javascript',
      };
      initialState.ids.push('code-1');
    });

    it('should update code (full replacement)', () => {
      const updatedCode = {
        id: 'code-1',
        name: 'Updated Helper',
        content: 'function updated() { return true; }',
        language: 'javascript',
        componentId: 'comp-1',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['code-1']).toEqual(updatedCode);
    });

    it('should replace code completely (not merge)', () => {
      const updatedCode = {
        id: 'code-1',
        name: 'New Name',
        content: 'new content',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['code-1'].language).toBeUndefined();
      expect(state.entities['code-1'].name).toBe('New Name');
      expect(state.entities['code-1'].content).toBe('new content');
    });

    it('should handle updating non-existent code', () => {
      const updatedCode = {
        id: 'non-existent',
        name: 'Test',
        content: 'test()',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['non-existent']).toBeUndefined();
      expect(state.entities['code-1']).toBeDefined();
    });

    it('should update code content', () => {
      const updatedCode = {
        id: 'code-1',
        name: 'Helper Function',
        content: 'function helper() { console.log("updated"); }',
        language: 'javascript',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['code-1'].content).toBe(
        'function helper() { console.log("updated"); }',
      );
    });

    it('should not affect other codes when updating one', () => {
      initialState.entities['code-2'] = {
        id: 'code-2',
        name: 'Other Function',
        content: 'function other() {}',
      };
      initialState.ids.push('code-2');

      const updatedCode = {
        id: 'code-1',
        name: 'Updated Helper',
        content: 'updated',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['code-2']).toEqual({
        id: 'code-2',
        name: 'Other Function',
        content: 'function other() {}',
      });
    });

    it('should not affect UI state when updating code', () => {
      initialState.ui.selectedCodeId = 'code-1';

      const updatedCode = {
        id: 'code-1',
        name: 'Updated',
        content: 'updated',
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.ui.selectedCodeId).toBe('code-1');
    });

    it('should handle updating code with null values', () => {
      const updatedCode = {
        id: 'code-1',
        name: null,
        content: null,
        language: null,
      };

      const state = codeEntitySlice(initialState, updateCode(updatedCode));

      expect(state.entities['code-1'].name).toBeNull();
      expect(state.entities['code-1'].content).toBeNull();
      expect(state.entities['code-1'].language).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: Add Code (5 tests)
  // ===================================================================

  describe('Add Code', () => {
    it('should add new code', () => {
      const newCode = {
        id: 'code-1',
        name: 'New Function',
        content: 'function newFunc() {}',
      };

      const state = codeEntitySlice(initialState, addCode(newCode));

      expect(state.ids).toContain('code-1');
      expect(state.entities['code-1']).toEqual(newCode);
    });

    it('should not add duplicate code ID', () => {
      initialState.entities['code-1'] = {
        id: 'code-1',
        name: 'Existing',
        content: 'existing',
      };
      initialState.ids.push('code-1');

      const newCode = {
        id: 'code-1',
        name: 'Duplicate',
        content: 'duplicate',
      };

      const state = codeEntitySlice(initialState, addCode(newCode));

      expect(state.ids).toHaveLength(1);
      expect(state.entities['code-1'].name).toBe('Existing'); // Original preserved
    });

    it('should add multiple codes sequentially', () => {
      let state = codeEntitySlice(
        initialState,
        addCode({ id: 'code-1', name: 'Code 1', content: 'code1()' }),
      );
      state = codeEntitySlice(
        state,
        addCode({ id: 'code-2', name: 'Code 2', content: 'code2()' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['code-1'].name).toBe('Code 1');
      expect(state.entities['code-2'].name).toBe('Code 2');
    });

    it('should preserve existing codes when adding new one', () => {
      initialState.entities['code-existing'] = {
        id: 'code-existing',
        name: 'Existing',
        content: 'existing',
      };
      initialState.ids.push('code-existing');

      const state = codeEntitySlice(
        initialState,
        addCode({ id: 'code-new', name: 'New', content: 'new' }),
      );

      expect(state.entities['code-existing']).toBeDefined();
      expect(state.entities['code-new']).toBeDefined();
    });

    it('should not affect UI state when adding code', () => {
      initialState.ui.selectedCodeId = 'code-selected';

      const state = codeEntitySlice(
        initialState,
        addCode({ id: 'code-1', name: 'Code', content: 'code()' }),
      );

      expect(state.ui.selectedCodeId).toBe('code-selected');
    });
  });

  // ===================================================================
  // PART 5: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle multiple operations in sequence', () => {
      let state = codeEntitySlice(
        initialState,
        addCode({ id: 'code-1', name: 'Code', content: 'code()' }),
      );
      state = codeEntitySlice(
        state,
        updateCode({
          id: 'code-1',
          name: 'Updated Code',
          content: 'updatedCode()',
        }),
      );
      state = codeEntitySlice(state, setSelectedCodeId('code-1'));

      expect(state.entities['code-1'].name).toBe('Updated Code');
      expect(state.ui.selectedCodeId).toBe('code-1');
    });

    it('should maintain data integrity across bulk and individual operations', () => {
      const codes = [
        { id: 'code-1', name: 'Code 1', content: 'code1()' },
        { id: 'code-2', name: 'Code 2', content: 'code2()' },
      ];

      let state = codeEntitySlice(initialState, setCodes(codes));
      state = codeEntitySlice(
        state,
        addCode({ id: 'code-3', name: 'Code 3', content: 'code3()' }),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['code-1']).toBeDefined();
      expect(state.entities['code-2']).toBeDefined();
      expect(state.entities['code-3']).toBeDefined();
    });

    it('should prevent duplicate additions across bulk and individual operations', () => {
      const codes = [{ id: 'code-1', name: 'Original', content: 'original()' }];

      let state = codeEntitySlice(initialState, setCodes(codes));
      state = codeEntitySlice(
        state,
        addCode({ id: 'code-1', name: 'Duplicate', content: 'duplicate()' }),
      );

      expect(state.ids).toHaveLength(1);
      expect(state.entities['code-1'].name).toBe('Original'); // Original preserved
    });
  });
});
