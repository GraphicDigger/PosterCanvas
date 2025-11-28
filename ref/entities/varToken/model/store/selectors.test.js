// ===================================================================
// Unit Tests for VarToken Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 2 (Selector Testing)
// ===================================================================

import { describe, it, expect } from 'vitest';
import {
  selectHoveredTokenId,
  selectFocusedTokenId,
  selectSelectedTokenId,
  selectTokenCheckStates,
  selectSelectedToken,
  selectTokensByType,
  selectAllTokens,
  selectTokenById,
  selectTokensByIds,
  selectIsColorToken,
  selectTokensByCollectionId,
} from './selectors';
import { TOKEN_TYPES } from '../constants/tokenTypes';

describe('VarToken Entity Selectors', () => {
  describe('UI State Selectors', () => {
    describe('selectHoveredTokenId', () => {
      it('should return hovered token ID', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: 'token-hovered',
            },
          },
        };

        expect(selectHoveredTokenId(state)).toBe('token-hovered');
      });

      it('should return null when no hovered token', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: null,
            },
          },
        };

        expect(selectHoveredTokenId(state)).toBeNull();
      });
    });

    describe('selectFocusedTokenId', () => {
      it('should return focused token ID', () => {
        const state = {
          tokenEntity: {
            ui: {
              focusedTokenId: 'token-focused',
            },
          },
        };

        expect(selectFocusedTokenId(state)).toBe('token-focused');
      });

      it('should return null when no focused token', () => {
        const state = {
          tokenEntity: {
            ui: {
              focusedTokenId: null,
            },
          },
        };

        expect(selectFocusedTokenId(state)).toBeNull();
      });
    });

    describe('selectSelectedTokenId', () => {
      it('should return selected token ID', () => {
        const state = {
          tokenEntity: {
            ui: {
              selectedTokenId: 'token-selected',
            },
          },
        };

        expect(selectSelectedTokenId(state)).toBe('token-selected');
      });

      it('should return null when no selected token', () => {
        const state = {
          tokenEntity: {
            ui: {
              selectedTokenId: null,
            },
          },
        };

        expect(selectSelectedTokenId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectTokenCheckStates', () => {
      it('should return all check states as true for same token', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: 'token-1',
              focusedTokenId: 'token-1',
              selectedTokenId: 'token-1',
            },
          },
        };

        const result = selectTokenCheckStates(state, 'token-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different token', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: 'token-1',
              focusedTokenId: 'token-2',
              selectedTokenId: 'token-3',
            },
          },
        };

        const result = selectTokenCheckStates(state, 'token-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: 'token-1',
              focusedTokenId: 'token-1',
              selectedTokenId: 'token-2',
            },
          },
        };

        const result = selectTokenCheckStates(state, 'token-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should handle null UI states', () => {
        const state = {
          tokenEntity: {
            ui: {
              hoveredTokenId: null,
              focusedTokenId: null,
              selectedTokenId: null,
            },
          },
        };

        const result = selectTokenCheckStates(state, 'token-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });
    });
  });

  describe('Token Lookup Selectors', () => {
    describe('selectSelectedToken', () => {
      it('should return selected token', () => {
        const token = { id: 'token-selected', name: 'Selected Token', type: TOKEN_TYPES.COLOR };
        const state = {
          tokenEntity: {
            ui: {
              selectedTokenId: 'token-selected',
            },
            entities: {
              'token-selected': token,
            },
          },
        };

        expect(selectSelectedToken(state)).toEqual(token);
      });

      it('should return null when no token selected', () => {
        const state = {
          tokenEntity: {
            ui: {
              selectedTokenId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedToken(state)).toBeNull();
      });

      it('should return undefined when selected token does not exist', () => {
        const state = {
          tokenEntity: {
            ui: {
              selectedTokenId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedToken(state)).toBeUndefined();
      });
    });

    describe('selectTokenById', () => {
      it('should return token by ID', () => {
        const token = { id: 'token-1', name: 'Test Token', type: TOKEN_TYPES.COLOR };
        const state = {
          tokenEntity: {
            entities: {
              'token-1': token,
            },
          },
        };

        expect(selectTokenById(state, 'token-1')).toEqual(token);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          tokenEntity: {
            entities: {},
          },
        };

        expect(selectTokenById(state, 'non-existent')).toBeUndefined();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllTokens', () => {
      it('should return all tokens as array', () => {
        const tokens = {
          'token-1': { id: 'token-1', name: 'Token 1', type: TOKEN_TYPES.COLOR },
          'token-2': { id: 'token-2', name: 'Token 2', type: TOKEN_TYPES.NUMBER },
          'token-3': { id: 'token-3', name: 'Token 3', type: TOKEN_TYPES.STRING },
        };
        const state = {
          tokenEntity: {
            ids: ['token-1', 'token-2', 'token-3'],
            entities: tokens,
          },
        };

        const result = selectAllTokens(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(tokens['token-1']);
        expect(result[1]).toEqual(tokens['token-2']);
        expect(result[2]).toEqual(tokens['token-3']);
      });

      it('should return empty array when no tokens', () => {
        const state = {
          tokenEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllTokens(state)).toEqual([]);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          tokenEntity: {
            ids: null,
            entities: {},
          },
        };

        expect(selectAllTokens(state)).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          tokenEntity: {
            ids: ['token-1'],
            entities: null,
          },
        };

        expect(selectAllTokens(state)).toEqual([]);
      });

      it('should filter out undefined tokens', () => {
        const state = {
          tokenEntity: {
            ids: ['token-1', 'token-non-existent', 'token-2'],
            entities: {
              'token-1': { id: 'token-1', name: 'Token 1' },
              'token-2': { id: 'token-2', name: 'Token 2' },
            },
          },
        };

        const result = selectAllTokens(state);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('token-1');
        expect(result[1].id).toBe('token-2');
      });

      it('should maintain order based on ids array', () => {
        const state = {
          tokenEntity: {
            ids: ['token-3', 'token-1', 'token-2'],
            entities: {
              'token-1': { id: 'token-1', order: 1 },
              'token-2': { id: 'token-2', order: 2 },
              'token-3': { id: 'token-3', order: 3 },
            },
          },
        };

        const result = selectAllTokens(state);
        expect(result[0].id).toBe('token-3');
        expect(result[1].id).toBe('token-1');
        expect(result[2].id).toBe('token-2');
      });
    });

    describe('selectTokensByIds', () => {
      it('should return tokens for given IDs', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', name: 'First' },
              'token-2': { id: 'token-2', name: 'Second' },
              'token-3': { id: 'token-3', name: 'Third' },
            },
          },
        };

        const result = selectTokensByIds(state, ['token-1', 'token-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent tokens', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', name: 'First' },
            },
          },
        };

        const result = selectTokensByIds(state, ['token-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('token-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          tokenEntity: {
            entities: {},
          },
        };

        const result = selectTokensByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids is empty', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1' },
            },
          },
        };

        const result = selectTokensByIds(state, []);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Filter Selectors', () => {
    describe('selectTokensByType', () => {
      it('should return tokens of specific type', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', type: TOKEN_TYPES.COLOR, name: 'Color 1' },
              'token-2': { id: 'token-2', type: TOKEN_TYPES.COLOR, name: 'Color 2' },
              'token-3': { id: 'token-3', type: TOKEN_TYPES.NUMBER, name: 'Number 1' },
            },
          },
        };

        const result = selectTokensByType(state, TOKEN_TYPES.COLOR);
        expect(result).toHaveLength(2);
        expect(result.every(t => t.type === TOKEN_TYPES.COLOR)).toBe(true);
      });

      it('should return empty array for type with no tokens', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', type: TOKEN_TYPES.COLOR },
            },
          },
        };

        const result = selectTokensByType(state, TOKEN_TYPES.NUMBER);
        expect(result).toEqual([]);
      });

      it('should handle empty entities', () => {
        const state = {
          tokenEntity: {
            entities: {},
          },
        };

        const result = selectTokensByType(state, TOKEN_TYPES.COLOR);
        expect(result).toEqual([]);
      });
    });

    describe('selectTokensByCollectionId', () => {
      it('should return tokens for specific collection', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', collectionId: 'collection-1', name: 'Token 1' },
              'token-2': { id: 'token-2', collectionId: 'collection-1', name: 'Token 2' },
              'token-3': { id: 'token-3', collectionId: 'collection-2', name: 'Token 3' },
            },
          },
        };

        const result = selectTokensByCollectionId(state, 'collection-1');
        expect(result).toHaveLength(2);
        expect(result.every(t => t.collectionId === 'collection-1')).toBe(true);
      });

      it('should return empty array for collection with no tokens', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': { id: 'token-1', collectionId: 'collection-1' },
            },
          },
        };

        const result = selectTokensByCollectionId(state, 'collection-non-existent');
        expect(result).toEqual([]);
      });

      it('should handle empty entities', () => {
        const state = {
          tokenEntity: {
            entities: {},
          },
        };

        const result = selectTokensByCollectionId(state, 'collection-1');
        expect(result).toEqual([]);
      });
    });

    describe('selectIsColorToken', () => {
      it('should return true when color token exists with matching value', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': {
                id: 'token-1',
                type: TOKEN_TYPES.COLOR,
                mode: { value: '#FF0000' },
              },
              'token-2': {
                id: 'token-2',
                type: TOKEN_TYPES.COLOR,
                mode: { value: '#00FF00' },
              },
            },
          },
        };

        const result = selectIsColorToken(state, '#FF0000');
        expect(result).toBe(true);
      });

      it('should return false when no matching color token', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': {
                id: 'token-1',
                type: TOKEN_TYPES.COLOR,
                mode: { value: '#FF0000' },
              },
            },
          },
        };

        const result = selectIsColorToken(state, '#0000FF');
        expect(result).toBe(false);
      });

      it('should return false when token type is not COLOR', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': {
                id: 'token-1',
                type: TOKEN_TYPES.NUMBER,
                mode: { value: '#FF0000' },
              },
            },
          },
        };

        const result = selectIsColorToken(state, '#FF0000');
        expect(result).toBe(false);
      });

      it('should handle tokens without mode property', () => {
        const state = {
          tokenEntity: {
            entities: {
              'token-1': {
                id: 'token-1',
                type: TOKEN_TYPES.COLOR,
              },
            },
          },
        };

        const result = selectIsColorToken(state, '#FF0000');
        expect(result).toBe(false);
      });

      it('should handle empty entities', () => {
        const state = {
          tokenEntity: {
            entities: {},
          },
        };

        const result = selectIsColorToken(state, '#FF0000');
        expect(result).toBe(false);
      });
    });
  });
});

