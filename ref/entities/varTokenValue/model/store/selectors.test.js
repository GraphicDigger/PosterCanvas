// ===================================================================
// Unit Tests for VarTokenValue Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 6 (Selector Testing - FINAL PUSH TO 1900!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectTokenValueState,
  selectTokenValueEntities,
  selectTokenValueIds,
  selectTokenValueUI,
  selectAllTokenValues,
  selectSelectedTokenValue,
  selectTokenValueById,
  selectTokenValueByTokenId,
  selectTokenValuesByIds,
  selectTokenValuesByVariableModeIdAndTokenIds,
  selectTokenValuesByTokenIds,
  selectTokenValueByTokenIdAndVariableModeId,
} from './selectors';

// Mock UI state selectors
vi.mock('./selectorsStates', () => ({
  selectSelectedTokenValueId: vi.fn((state) => state.mockSelectedTokenValueId || null),
}));

describe('VarTokenValue Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectTokenValueState', () => {
      it('should return token value entity state', () => {
        const tokenValueState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          tokenValueEntity: tokenValueState,
        };

        expect(selectTokenValueState(state)).toEqual(tokenValueState);
      });
    });

    describe('selectTokenValueEntities', () => {
      it('should return token value entities object', () => {
        const entities = {
          'tv-1': { id: 'tv-1', tokenId: 'token-1', value: '#ffffff' },
          'tv-2': { id: 'tv-2', tokenId: 'token-2', value: '#000000' },
        };
        const state = {
          tokenValueEntity: {
            entities,
          },
        };

        expect(selectTokenValueEntities(state)).toEqual(entities);
      });
    });

    describe('selectTokenValueIds', () => {
      it('should return token value ids array', () => {
        const ids = ['tv-1', 'tv-2', 'tv-3'];
        const state = {
          tokenValueEntity: {
            ids,
          },
        };

        expect(selectTokenValueIds(state)).toEqual(ids);
      });
    });

    describe('selectTokenValueUI', () => {
      it('should return token value UI state', () => {
        const uiState = {
          selectedTokenValueId: 'tv-1',
        };
        const state = {
          tokenValueEntity: {
            ui: uiState,
          },
        };

        expect(selectTokenValueUI(state)).toEqual(uiState);
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectTokenValueById', () => {
      it('should return token value by ID', () => {
        const tokenValue = {
          id: 'tv-1',
          tokenId: 'token-1',
          value: '#ffffff',
          variableModeId: 'mode-1',
        };
        const state = {
          tokenValueEntity: {
            entities: {
              'tv-1': tokenValue,
            },
          },
        };

        expect(selectTokenValueById(state, 'tv-1')).toEqual(tokenValue);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          tokenValueEntity: {
            entities: {},
          },
        };

        expect(selectTokenValueById(state, 'non-existent')).toBeNull();
      });

      it('should return null when id is null', () => {
        const state = {
          tokenValueEntity: {
            entities: {},
          },
        };

        expect(selectTokenValueById(state, null)).toBeNull();
      });
    });

    describe('selectSelectedTokenValue', () => {
      it('should return selected token value', () => {
        const tokenValue = { id: 'tv-selected', value: '#ff0000' };
        const state = {
          tokenValueEntity: {
            entities: {
              'tv-selected': tokenValue,
            },
          },
          mockSelectedTokenValueId: 'tv-selected',
        };

        expect(selectSelectedTokenValue(state)).toEqual(tokenValue);
      });

      it('should return null when no token value selected', () => {
        const state = {
          tokenValueEntity: {
            entities: {},
          },
          mockSelectedTokenValueId: null,
        };

        expect(selectSelectedTokenValue(state)).toBeNull();
      });
    });

    describe('selectTokenValueByTokenId', () => {
      it('should return token value by token ID', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2'],
            entities: {
              'tv-1': { id: 'tv-1', tokenId: 'token-1', value: '#ffffff' },
              'tv-2': { id: 'tv-2', tokenId: 'token-2', value: '#000000' },
            },
          },
        };

        const result = selectTokenValueByTokenId(state, 'token-1');
        expect(result).toBeDefined();
        expect(result.tokenId).toBe('token-1');
      });

      it('should return null when tokenId not found', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValueByTokenId(state, 'non-existent');
        expect(result).toBeNull();
      });

      it('should return null when tokenId is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValueByTokenId(state, null);
        expect(result).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllTokenValues', () => {
      it('should return all token values', () => {
        const entities = {
          'tv-1': { id: 'tv-1', tokenId: 'token-1', value: '#ffffff' },
          'tv-2': { id: 'tv-2', tokenId: 'token-2', value: '#000000' },
        };
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2'],
            entities,
          },
        };

        const result = selectAllTokenValues(state);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(entities['tv-1']);
      });

      it('should filter out null values', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'non-existent'],
            entities: {
              'tv-1': { id: 'tv-1', value: '#ffffff' },
            },
          },
        };

        const result = selectAllTokenValues(state);
        expect(result).toHaveLength(1);
      });
    });

    describe('selectTokenValuesByIds', () => {
      it('should return token values for given IDs', () => {
        const state = {
          tokenValueEntity: {
            entities: {
              'tv-1': { id: 'tv-1', value: '#ffffff' },
              'tv-2': { id: 'tv-2', value: '#000000' },
              'tv-3': { id: 'tv-3', value: '#ff0000' },
            },
          },
        };

        const result = selectTokenValuesByIds(state, ['tv-1', 'tv-3']);
        expect(result).toHaveLength(2);
        expect(result[0].value).toBe('#ffffff');
        expect(result[1].value).toBe('#ff0000');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          tokenValueEntity: {
            entities: {},
          },
        };

        const result = selectTokenValuesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should filter out non-existent token values', () => {
        const state = {
          tokenValueEntity: {
            entities: {
              'tv-1': { id: 'tv-1', value: '#ffffff' },
            },
          },
        };

        const result = selectTokenValuesByIds(state, ['tv-1', 'non-existent']);
        expect(result).toHaveLength(1);
      });
    });
  });

  describe('Token-Specific Selectors', () => {
    describe('selectTokenValuesByTokenIds', () => {
      it('should return token values for given token IDs', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2', 'tv-3'],
            entities: {
              'tv-1': { id: 'tv-1', tokenId: 'token-1', value: '#ffffff' },
              'tv-2': { id: 'tv-2', tokenId: 'token-2', value: '#000000' },
              'tv-3': { id: 'tv-3', tokenId: 'token-3', value: '#ff0000' },
            },
          },
        };

        const result = selectTokenValuesByTokenIds(state, ['token-1', 'token-3']);
        expect(result).toHaveLength(2);
        expect(result.every(tv => ['token-1', 'token-3'].includes(tv.tokenId))).toBe(true);
      });

      it('should return empty array when tokenIds is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValuesByTokenIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when allTokenValues is empty', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValuesByTokenIds(state, ['token-1']);
        expect(result).toEqual([]);
      });
    });

    describe('selectTokenValuesByVariableModeIdAndTokenIds', () => {
      it('should return token values filtered by mode and token IDs', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2', 'tv-3'],
            entities: {
              'tv-1': { id: 'tv-1', tokenId: 'token-1', variableModeId: 'mode-1', value: '#ffffff' },
              'tv-2': { id: 'tv-2', tokenId: 'token-2', variableModeId: 'mode-1', value: '#000000' },
              'tv-3': { id: 'tv-3', tokenId: 'token-1', variableModeId: 'mode-2', value: '#ff0000' },
            },
          },
        };

        const result = selectTokenValuesByVariableModeIdAndTokenIds(state, 'mode-1', ['token-1', 'token-2']);
        expect(result).toHaveLength(2);
        expect(result.every(tv => tv.variableModeId === 'mode-1')).toBe(true);
      });

      it('should return empty array when variableModeId is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValuesByVariableModeIdAndTokenIds(state, null, ['token-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when tokenIds is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValuesByVariableModeIdAndTokenIds(state, 'mode-1', null);
        expect(result).toEqual([]);
      });
    });

    describe('selectTokenValueByTokenIdAndVariableModeId', () => {
      it('should return token value by tokenId and variableModeId', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2'],
            entities: {
              'tv-1': {
                id: 'tv-1',
                tokenId: 'token-1',
                variableModeId: 'mode-1',
                value: '#ffffff',
              },
              'tv-2': {
                id: 'tv-2',
                tokenId: 'token-1',
                variableModeId: 'mode-2',
                value: '#000000',
              },
            },
          },
        };

        const result = selectTokenValueByTokenIdAndVariableModeId(state, 'token-1', 'mode-2');
        expect(result).toBeDefined();
        expect(result.id).toBe('tv-2');
        expect(result.value).toBe('#000000');
      });

      it('should return undefined when not found', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValueByTokenIdAndVariableModeId(state, 'token-1', 'mode-1');
        expect(result).toBeUndefined();
      });

      it('should return null when tokenId is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValueByTokenIdAndVariableModeId(state, null, 'mode-1');
        expect(result).toBeNull();
      });

      it('should return null when variableModeId is null', () => {
        const state = {
          tokenValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTokenValueByTokenIdAndVariableModeId(state, 'token-1', null);
        expect(result).toBeNull();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex token value data', () => {
      it('should handle token values with nested properties', () => {
        const tokenValue = {
          id: 'tv-1',
          tokenId: 'token-1',
          variableModeId: 'mode-1',
          value: '#ffffff',
          metadata: {
            created: '2024-01-01',
            type: 'color',
          },
        };
        const state = {
          tokenValueEntity: {
            entities: {
              'tv-1': tokenValue,
            },
          },
        };

        const result = selectTokenValueById(state, 'tv-1');
        expect(result.metadata.type).toBe('color');
      });
    });

    describe('Multiple modes', () => {
      it('should handle token values across multiple modes', () => {
        const state = {
          tokenValueEntity: {
            ids: ['tv-1', 'tv-2', 'tv-3'],
            entities: {
              'tv-1': { id: 'tv-1', tokenId: 'token-1', variableModeId: 'light', value: '#ffffff' },
              'tv-2': { id: 'tv-2', tokenId: 'token-1', variableModeId: 'dark', value: '#000000' },
              'tv-3': { id: 'tv-3', tokenId: 'token-2', variableModeId: 'light', value: '#ff0000' },
            },
          },
        };

        const lightMode = selectTokenValuesByVariableModeIdAndTokenIds(
          state,
          'light',
          ['token-1', 'token-2'],
        );

        expect(lightMode).toHaveLength(2);
        expect(lightMode.every(tv => tv.variableModeId === 'light')).toBe(true);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          tokenValueEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllTokenValues(state)).toEqual([]);
        expect(selectSelectedTokenValue(state)).toBeNull();
      });
    });
  });
});

