// ===================================================================
// Unit Tests for VarToken Slice
// CRITICAL BUSINESS LOGIC - Design Token State Management
// Phase 1, Day 2 - Part 1 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import tokenEntitySlice, {
  setTokens,
  setHoveredTokenId,
  setFocusedTokenId,
  setSelectedTokenId,
  addToken,
  updateToken,
  removeToken,
  removeTokensFromCollection,
} from './slice';

describe('VarToken Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredTokenId: null,
        focusedTokenId: null,
        selectedTokenId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered token ID', () => {
      const state = tokenEntitySlice(initialState, setHoveredTokenId('token-1'));
      expect(state.ui.hoveredTokenId).toBe('token-1');
    });

    it('should set focused token ID', () => {
      const state = tokenEntitySlice(initialState, setFocusedTokenId('token-2'));
      expect(state.ui.focusedTokenId).toBe('token-2');
    });

    it('should set selected token ID', () => {
      const state = tokenEntitySlice(initialState, setSelectedTokenId('token-3'));
      expect(state.ui.selectedTokenId).toBe('token-3');
    });
  });

  // ===================================================================
  // PART 2: Set Tokens (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Tokens (Bulk Load)', () => {
    it('should set tokens (replace all)', () => {
      const tokens = [
        { id: 'token-1', name: 'Primary Color', collectionId: 'col-1' },
        { id: 'token-2', name: 'Secondary Color', collectionId: 'col-1' },
      ];

      const state = tokenEntitySlice(initialState, setTokens(tokens));

      expect(state.ids).toEqual(['token-1', 'token-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing tokens when setting new ones', () => {
      initialState.entities['token-old'] = { id: 'token-old', name: 'Old Token' };
      initialState.ids.push('token-old');

      const tokens = [{ id: 'token-new', name: 'New Token', collectionId: 'col-1' }];
      const state = tokenEntitySlice(initialState, setTokens(tokens));

      expect(state.entities['token-old']).toBeUndefined();
      expect(state.entities['token-new']).toBeDefined();
    });

    it('should handle empty array in setTokens', () => {
      initialState.entities['token-1'] = { id: 'token-1', name: 'Token' };
      initialState.ids.push('token-1');

      const state = tokenEntitySlice(initialState, setTokens([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting tokens', () => {
      initialState.ui.hoveredTokenId = 'token-hover';
      initialState.ui.focusedTokenId = 'token-focus';

      const tokens = [{ id: 'token-1', name: 'Token', collectionId: 'col-1' }];
      const state = tokenEntitySlice(initialState, setTokens(tokens));

      expect(state.ui.hoveredTokenId).toBe('token-hover');
      expect(state.ui.focusedTokenId).toBe('token-focus');
    });

    it('should set tokens with complete metadata', () => {
      const tokens = [
        {
          id: 'token-1',
          name: 'Primary Color',
          type: 'color',
          collectionId: 'col-1',
          value: '#0066FF',
          description: 'Primary brand color',
        },
      ];

      const state = tokenEntitySlice(initialState, setTokens(tokens));

      expect(state.entities['token-1'].name).toBe('Primary Color');
      expect(state.entities['token-1'].type).toBe('color');
      expect(state.entities['token-1'].value).toBe('#0066FF');
    });
  });

  // ===================================================================
  // PART 3: Add Token (7 tests)
  // ===================================================================

  describe('Add Token', () => {
    it('should add token with basic properties', () => {
      const token = {
        id: 'token-1',
        name: 'Primary Color',
        collectionId: 'col-1',
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.ids).toContain('token-1');
      expect(state.entities['token-1'].name).toBe('Primary Color');
      expect(state.entities['token-1'].kind).toBe('token');
    });

    it('should generate ID if not provided', () => {
      const token = {
        name: 'Secondary Color',
        collectionId: 'col-1',
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.ids).toHaveLength(1);
      const tokenId = state.ids[0];
      expect(tokenId).toBeTruthy();
      expect(state.entities[tokenId].name).toBe('Secondary Color');
    });

    it('should add token with type', () => {
      const token = {
        id: 'token-1',
        name: 'Font Size Large',
        type: 'dimension',
        collectionId: 'col-1',
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.entities['token-1'].type).toBe('dimension');
    });

    it('should add token with default name if not provided', () => {
      const token = {
        id: 'token-1',
        collectionId: 'col-1',
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.entities['token-1'].name).toBe('Token');
    });

    it('should add token with all metadata', () => {
      const token = {
        id: 'token-1',
        name: 'Primary Color',
        type: 'color',
        collectionId: 'col-1',
        value: '#0066FF',
        description: 'Brand primary color',
        tags: ['primary', 'brand'],
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.entities['token-1'].value).toBe('#0066FF');
      expect(state.entities['token-1'].description).toBe('Brand primary color');
      expect(state.entities['token-1'].tags).toEqual(['primary', 'brand']);
    });

    it('should add multiple tokens sequentially', () => {
      let state = tokenEntitySlice(
        initialState,
        addToken({ id: 'token-1', name: 'Token 1', collectionId: 'col-1' }),
      );
      state = tokenEntitySlice(
        state,
        addToken({ id: 'token-2', name: 'Token 2', collectionId: 'col-1' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['token-1'].name).toBe('Token 1');
      expect(state.entities['token-2'].name).toBe('Token 2');
    });

    it('should handle token with null values', () => {
      const token = {
        id: 'token-1',
        name: 'Empty Token',
        collectionId: 'col-1',
        value: null,
        description: null,
      };

      const state = tokenEntitySlice(initialState, addToken(token));

      expect(state.entities['token-1'].value).toBeNull();
      expect(state.entities['token-1'].description).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: Update Token (6 tests)
  // ===================================================================

  describe('Update Token', () => {
    beforeEach(() => {
      initialState.entities['token-1'] = {
        id: 'token-1',
        name: 'Primary Color',
        type: 'color',
        collectionId: 'col-1',
        value: '#0066FF',
      };
      initialState.ids.push('token-1');
    });

    it('should update token name', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({ id: 'token-1', updates: { name: 'Updated Color' } }),
      );

      expect(state.entities['token-1'].name).toBe('Updated Color');
    });

    it('should update token value', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({ id: 'token-1', updates: { value: '#FF0000' } }),
      );

      expect(state.entities['token-1'].value).toBe('#FF0000');
    });

    it('should update multiple properties at once', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({
          id: 'token-1',
          updates: {
            name: 'Brand Red',
            value: '#FF0000',
            description: 'Error color',
          },
        }),
      );

      expect(state.entities['token-1'].name).toBe('Brand Red');
      expect(state.entities['token-1'].value).toBe('#FF0000');
      expect(state.entities['token-1'].description).toBe('Error color');
    });

    it('should preserve unmodified properties', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({ id: 'token-1', updates: { name: 'New Name' } }),
      );

      expect(state.entities['token-1'].type).toBe('color');
      expect(state.entities['token-1'].collectionId).toBe('col-1');
      expect(state.entities['token-1'].value).toBe('#0066FF');
    });

    it('should handle updating non-existent token', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({ id: 'non-existent', updates: { name: 'Test' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update token type', () => {
      const state = tokenEntitySlice(
        initialState,
        updateToken({ id: 'token-1', updates: { type: 'gradient' } }),
      );

      expect(state.entities['token-1'].type).toBe('gradient');
    });
  });

  // ===================================================================
  // PART 5: Remove Token (4 tests)
  // ===================================================================

  describe('Remove Token', () => {
    beforeEach(() => {
      initialState.entities['token-1'] = {
        id: 'token-1',
        name: 'Primary Color',
        collectionId: 'col-1',
      };
      initialState.entities['token-2'] = {
        id: 'token-2',
        name: 'Secondary Color',
        collectionId: 'col-1',
      };
      initialState.ids = ['token-1', 'token-2'];
    });

    it('should remove token by ID', () => {
      const state = tokenEntitySlice(initialState, removeToken('token-1'));

      expect(state.ids).not.toContain('token-1');
      expect(state.entities['token-1']).toBeUndefined();
      expect(state.entities['token-2']).toBeDefined();
    });

    it('should handle removing last token', () => {
      let state = tokenEntitySlice(initialState, removeToken('token-1'));
      state = tokenEntitySlice(state, removeToken('token-2'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle removing non-existent token', () => {
      const state = tokenEntitySlice(initialState, removeToken('non-existent'));

      expect(state.ids).toHaveLength(2);
      expect(state.entities['token-1']).toBeDefined();
      expect(state.entities['token-2']).toBeDefined();
    });

    it('should not affect UI state when removing token', () => {
      initialState.ui.selectedTokenId = 'token-1';

      const state = tokenEntitySlice(initialState, removeToken('token-2'));

      expect(state.ui.selectedTokenId).toBe('token-1');
    });
  });

  // ===================================================================
  // PART 6: Remove Tokens from Collection (5 tests)
  // ===================================================================

  describe('Remove Tokens from Collection', () => {
    beforeEach(() => {
      initialState.entities = {
        'token-1': { id: 'token-1', name: 'Token 1', collectionId: 'col-1' },
        'token-2': { id: 'token-2', name: 'Token 2', collectionId: 'col-1' },
        'token-3': { id: 'token-3', name: 'Token 3', collectionId: 'col-2' },
        'token-4': { id: 'token-4', name: 'Token 4', collectionId: 'col-2' },
      };
      initialState.ids = ['token-1', 'token-2', 'token-3', 'token-4'];
    });

    it('should remove all tokens from specified collection', () => {
      const state = tokenEntitySlice(initialState, removeTokensFromCollection('col-1'));

      expect(state.ids).toEqual(['token-3', 'token-4']);
      expect(state.entities['token-1']).toBeUndefined();
      expect(state.entities['token-2']).toBeUndefined();
      expect(state.entities['token-3']).toBeDefined();
      expect(state.entities['token-4']).toBeDefined();
    });

    it('should remove all tokens when collection matches', () => {
      const state = tokenEntitySlice(initialState, removeTokensFromCollection('col-2'));

      expect(state.ids).toEqual(['token-1', 'token-2']);
    });

    it('should handle removing from non-existent collection', () => {
      const state = tokenEntitySlice(initialState, removeTokensFromCollection('non-existent'));

      expect(state.ids).toHaveLength(4);
      expect(Object.keys(state.entities)).toHaveLength(4);
    });

    it('should handle removing all tokens from single collection', () => {
      initialState.entities = {
        'token-1': { id: 'token-1', name: 'Token 1', collectionId: 'col-only' },
        'token-2': { id: 'token-2', name: 'Token 2', collectionId: 'col-only' },
      };
      initialState.ids = ['token-1', 'token-2'];

      const state = tokenEntitySlice(initialState, removeTokensFromCollection('col-only'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when removing tokens from collection', () => {
      initialState.ui.selectedTokenId = 'token-3';

      const state = tokenEntitySlice(initialState, removeTokensFromCollection('col-1'));

      expect(state.ui.selectedTokenId).toBe('token-3');
    });
  });
});
