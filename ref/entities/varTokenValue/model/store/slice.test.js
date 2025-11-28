// ===================================================================
// Unit Tests for VarTokenValue Slice
// CRITICAL BUSINESS LOGIC - Token Value State Management
// Phase 1, Day 3 - Part 3 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import tokenValueEntitySlice, {
  setTokenValues,
  setHoveredTokenValueId,
  setFocusedTokenValueId,
  setSelectedTokenValueId,
  addTokenValue,
  updateTokenValue,
  removeTokenValue,
  removeTokenValues,
  removeTokenValuesByVariableModeId,
} from './slice';

describe('VarTokenValue Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredTokenValueId: null,
        focusedTokenValueId: null,
        selectedTokenValueId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered token value ID', () => {
      const state = tokenValueEntitySlice(
        initialState,
        setHoveredTokenValueId('tv-1'),
      );
      expect(state.ui.hoveredTokenValueId).toBe('tv-1');
    });

    it('should set focused token value ID', () => {
      const state = tokenValueEntitySlice(
        initialState,
        setFocusedTokenValueId('tv-2'),
      );
      expect(state.ui.focusedTokenValueId).toBe('tv-2');
    });

    it('should set selected token value ID', () => {
      const state = tokenValueEntitySlice(
        initialState,
        setSelectedTokenValueId('tv-3'),
      );
      expect(state.ui.selectedTokenValueId).toBe('tv-3');
    });
  });

  // ===================================================================
  // PART 2: Set Token Values (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Token Values (Bulk Load)', () => {
    it('should set token values (replace all)', () => {
      const values = [
        { id: 'tv-1', tokenId: 't-1', variableModeId: 'm-1', value: '#FF0000' },
        { id: 'tv-2', tokenId: 't-1', variableModeId: 'm-2', value: '#00FF00' },
      ];

      const state = tokenValueEntitySlice(initialState, setTokenValues(values));

      expect(state.ids).toEqual(['tv-1', 'tv-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing values when setting new ones', () => {
      initialState.entities['tv-old'] = {
        id: 'tv-old',
        tokenId: 't-old',
        value: 'old',
      };
      initialState.ids.push('tv-old');

      const values = [
        { id: 'tv-new', tokenId: 't-1', variableModeId: 'm-1', value: 'new' },
      ];
      const state = tokenValueEntitySlice(initialState, setTokenValues(values));

      expect(state.entities['tv-old']).toBeUndefined();
      expect(state.entities['tv-new']).toBeDefined();
    });

    it('should handle empty array in setTokenValues', () => {
      initialState.entities['tv-1'] = { id: 'tv-1', value: 'test' };
      initialState.ids.push('tv-1');

      const state = tokenValueEntitySlice(initialState, setTokenValues([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting values', () => {
      initialState.ui.hoveredTokenValueId = 'tv-hover';

      const values = [
        { id: 'tv-1', tokenId: 't-1', variableModeId: 'm-1', value: 'test' },
      ];
      const state = tokenValueEntitySlice(initialState, setTokenValues(values));

      expect(state.ui.hoveredTokenValueId).toBe('tv-hover');
    });

    it('should set values with complete metadata', () => {
      const values = [
        {
          id: 'tv-1',
          tokenId: 't-1',
          variableModeId: 'm-1',
          value: '#FF0000',
          kind: 'token-mode-value',
        },
      ];

      const state = tokenValueEntitySlice(initialState, setTokenValues(values));

      expect(state.entities['tv-1'].value).toBe('#FF0000');
      expect(state.entities['tv-1'].kind).toBe('token-mode-value');
    });
  });

  // ===================================================================
  // PART 3: Add Token Value (7 tests)
  // ===================================================================

  describe('Add Token Value', () => {
    it('should add token value with all properties', () => {
      const value = {
        id: 'tv-1',
        tokenId: 't-1',
        variableModeId: 'm-1',
        value: '#FF0000',
      };

      const state = tokenValueEntitySlice(initialState, addTokenValue(value));

      expect(state.ids).toContain('tv-1');
      expect(state.entities['tv-1'].value).toBe('#FF0000');
      expect(state.entities['tv-1'].kind).toBe('token-mode-value');
    });

    it('should generate ID if not provided', () => {
      const value = {
        tokenId: 't-1',
        variableModeId: 'm-1',
        value: '#00FF00',
      };

      const state = tokenValueEntitySlice(initialState, addTokenValue(value));

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(id).toBeTruthy();
      expect(state.entities[id].value).toBe('#00FF00');
    });

    it('should set value to undefined if not provided', () => {
      const value = {
        id: 'tv-1',
        tokenId: 't-1',
        variableModeId: 'm-1',
      };

      const state = tokenValueEntitySlice(initialState, addTokenValue(value));

      expect(state.entities['tv-1'].value).toBeUndefined();
    });

    it('should add multiple values sequentially', () => {
      let state = tokenValueEntitySlice(
        initialState,
        addTokenValue({
          id: 'tv-1',
          tokenId: 't-1',
          variableModeId: 'm-1',
          value: 'val1',
        }),
      );
      state = tokenValueEntitySlice(
        state,
        addTokenValue({
          id: 'tv-2',
          tokenId: 't-1',
          variableModeId: 'm-2',
          value: 'val2',
        }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['tv-1'].value).toBe('val1');
      expect(state.entities['tv-2'].value).toBe('val2');
    });

    it('should add values for different modes of same token', () => {
      let state = tokenValueEntitySlice(
        initialState,
        addTokenValue({
          id: 'tv-1',
          tokenId: 't-1',
          variableModeId: 'm-light',
          value: '#FFFFFF',
        }),
      );
      state = tokenValueEntitySlice(
        state,
        addTokenValue({
          id: 'tv-2',
          tokenId: 't-1',
          variableModeId: 'm-dark',
          value: '#000000',
        }),
      );

      expect(state.entities['tv-1'].variableModeId).toBe('m-light');
      expect(state.entities['tv-2'].variableModeId).toBe('m-dark');
      expect(state.entities['tv-1'].tokenId).toBe('t-1');
      expect(state.entities['tv-2'].tokenId).toBe('t-1');
    });

    it('should preserve existing values when adding new one', () => {
      initialState.entities['tv-existing'] = {
        id: 'tv-existing',
        tokenId: 't-1',
        value: 'existing',
      };
      initialState.ids.push('tv-existing');

      const state = tokenValueEntitySlice(
        initialState,
        addTokenValue({ id: 'tv-new', tokenId: 't-2', variableModeId: 'm-1', value: 'new' }),
      );

      expect(state.entities['tv-existing']).toBeDefined();
      expect(state.entities['tv-new']).toBeDefined();
    });

    it('should not affect UI state when adding value', () => {
      initialState.ui.selectedTokenValueId = 'tv-selected';

      const state = tokenValueEntitySlice(
        initialState,
        addTokenValue({ id: 'tv-1', tokenId: 't-1', variableModeId: 'm-1', value: 'test' }),
      );

      expect(state.ui.selectedTokenValueId).toBe('tv-selected');
    });
  });

  // ===================================================================
  // PART 4: Update Token Value (6 tests)
  // ===================================================================

  describe('Update Token Value', () => {
    beforeEach(() => {
      initialState.entities['tv-1'] = {
        id: 'tv-1',
        tokenId: 't-1',
        variableModeId: 'm-1',
        value: '#FF0000',
      };
      initialState.ids.push('tv-1');
    });

    it('should update value', () => {
      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({ id: 'tv-1', updates: { value: '#00FF00' } }),
      );

      expect(state.entities['tv-1'].value).toBe('#00FF00');
    });

    it('should update multiple properties at once', () => {
      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({
          id: 'tv-1',
          updates: {
            value: '#0000FF',
            variableModeId: 'm-2',
          },
        }),
      );

      expect(state.entities['tv-1'].value).toBe('#0000FF');
      expect(state.entities['tv-1'].variableModeId).toBe('m-2');
    });

    it('should preserve unmodified properties', () => {
      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({ id: 'tv-1', updates: { value: '#0000FF' } }),
      );

      expect(state.entities['tv-1'].tokenId).toBe('t-1');
      expect(state.entities['tv-1'].variableModeId).toBe('m-1');
    });

    it('should handle updating non-existent value', () => {
      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({ id: 'non-existent', updates: { value: 'test' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update value to null', () => {
      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({ id: 'tv-1', updates: { value: null } }),
      );

      expect(state.entities['tv-1'].value).toBeNull();
    });

    it('should not affect UI state when updating value', () => {
      initialState.ui.selectedTokenValueId = 'tv-selected';

      const state = tokenValueEntitySlice(
        initialState,
        updateTokenValue({ id: 'tv-1', updates: { value: '#0000FF' } }),
      );

      expect(state.ui.selectedTokenValueId).toBe('tv-selected');
    });
  });

  // ===================================================================
  // PART 5: Remove Token Value(s) (5 tests)
  // ===================================================================

  describe('Remove Token Value(s)', () => {
    beforeEach(() => {
      initialState.entities = {
        'tv-1': { id: 'tv-1', tokenId: 't-1', variableModeId: 'm-1', value: 'val1' },
        'tv-2': { id: 'tv-2', tokenId: 't-1', variableModeId: 'm-2', value: 'val2' },
        'tv-3': { id: 'tv-3', tokenId: 't-2', variableModeId: 'm-1', value: 'val3' },
      };
      initialState.ids = ['tv-1', 'tv-2', 'tv-3'];
    });

    it('should remove single token value', () => {
      const state = tokenValueEntitySlice(initialState, removeTokenValue('tv-1'));

      expect(state.ids).not.toContain('tv-1');
      expect(state.entities['tv-1']).toBeUndefined();
      expect(state.entities['tv-2']).toBeDefined();
    });

    it('should remove multiple token values', () => {
      const state = tokenValueEntitySlice(initialState, removeTokenValues(['tv-1', 'tv-2']));

      expect(state.ids).toEqual(['tv-3']);
      expect(state.entities['tv-1']).toBeUndefined();
      expect(state.entities['tv-2']).toBeUndefined();
      expect(state.entities['tv-3']).toBeDefined();
    });

    it('should handle removing non-existent value', () => {
      const state = tokenValueEntitySlice(initialState, removeTokenValue('non-existent'));

      expect(state.ids).toHaveLength(3);
    });

    it('should handle removing empty array', () => {
      const state = tokenValueEntitySlice(initialState, removeTokenValues([]));

      expect(state.ids).toHaveLength(3);
      expect(Object.keys(state.entities)).toHaveLength(3);
    });

    it('should not affect UI state when removing value', () => {
      initialState.ui.selectedTokenValueId = 'tv-3';

      const state = tokenValueEntitySlice(initialState, removeTokenValue('tv-1'));

      expect(state.ui.selectedTokenValueId).toBe('tv-3');
    });
  });

  // ===================================================================
  // PART 6: Remove by Variable Mode (4 tests)
  // ===================================================================

  describe('Remove Token Values by Variable Mode', () => {
    beforeEach(() => {
      initialState.entities = {
        'tv-1': { id: 'tv-1', tokenId: 't-1', variableModeId: 'm-1', value: 'val1' },
        'tv-2': { id: 'tv-2', tokenId: 't-2', variableModeId: 'm-1', value: 'val2' },
        'tv-3': { id: 'tv-3', tokenId: 't-1', variableModeId: 'm-2', value: 'val3' },
        'tv-4': { id: 'tv-4', tokenId: 't-2', variableModeId: 'm-2', value: 'val4' },
      };
      initialState.ids = ['tv-1', 'tv-2', 'tv-3', 'tv-4'];
    });

    it('should remove all values for specified mode', () => {
      const state = tokenValueEntitySlice(
        initialState,
        removeTokenValuesByVariableModeId({ variableModeId: 'm-1' }),
      );

      expect(state.ids).toEqual(['tv-3', 'tv-4']);
      expect(state.entities['tv-1']).toBeUndefined();
      expect(state.entities['tv-2']).toBeUndefined();
      expect(state.entities['tv-3']).toBeDefined();
      expect(state.entities['tv-4']).toBeDefined();
    });

    it('should handle removing all values when mode matches all', () => {
      initialState.entities = {
        'tv-1': { id: 'tv-1', tokenId: 't-1', variableModeId: 'm-only', value: 'val1' },
        'tv-2': { id: 'tv-2', tokenId: 't-2', variableModeId: 'm-only', value: 'val2' },
      };
      initialState.ids = ['tv-1', 'tv-2'];

      const state = tokenValueEntitySlice(
        initialState,
        removeTokenValuesByVariableModeId({ variableModeId: 'm-only' }),
      );

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle removing from non-existent mode', () => {
      const state = tokenValueEntitySlice(
        initialState,
        removeTokenValuesByVariableModeId({ variableModeId: 'non-existent' }),
      );

      expect(state.ids).toHaveLength(4);
      expect(Object.keys(state.entities)).toHaveLength(4);
    });

    it('should preserve UI state when removing by mode', () => {
      initialState.ui.selectedTokenValueId = 'tv-3';

      const state = tokenValueEntitySlice(
        initialState,
        removeTokenValuesByVariableModeId({ variableModeId: 'm-1' }),
      );

      expect(state.ui.selectedTokenValueId).toBe('tv-3');
    });
  });
});

