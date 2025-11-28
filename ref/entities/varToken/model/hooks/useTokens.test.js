// ===================================================================
// USE TOKENS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: varToken
// Hooks: useAllTokens, useTokenById, useColorTokens
// Purpose: Provides access to design tokens from Redux store
// Coverage: All tokens, selected token, token by ID, color tokens
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useAllTokens, useTokenById, useColorTokens } from './useTokens';
import * as tokenSelectors from '../store/selectors';
import { TOKEN_TYPES } from '../constants/tokenTypes';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllTokens: vi.fn(),
  selectSelectedToken: vi.fn(),
  selectTokenById: vi.fn(),
  selectTokensByType: vi.fn(),
  selectIsColorToken: vi.fn(),
}));

vi.mock('../constants/tokenTypes', () => ({
  TOKEN_TYPES: {
    COLOR: 'color',
    FONT: 'font',
    SPACING: 'spacing',
    SIZE: 'size',
  },
}));

describe('useAllTokens', () => {
  // Mock data
  const mockTokens = [
    { id: 'token-1', name: 'Primary Color', type: TOKEN_TYPES.COLOR, value: '#0000FF' },
    { id: 'token-2', name: 'Font Size', type: TOKEN_TYPES.FONT, value: '16px' },
    { id: 'token-3', name: 'Spacing', type: TOKEN_TYPES.SPACING, value: '8px' },
  ];

  const mockSelectedToken = mockTokens[0];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === tokenSelectors.selectAllTokens) {
        return mockTokens;
      }
      if (selector === tokenSelectors.selectSelectedToken) {
        return mockSelectedToken;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all tokens', () => {
      const { result } = renderHook(() => useAllTokens());

      expect(result.current.allTokens).toEqual(mockTokens);
      expect(result.current.allTokens).toHaveLength(3);
    });

    it('should return selected token', () => {
      const { result } = renderHook(() => useAllTokens());

      expect(result.current.selectedToken).toEqual(mockSelectedToken);
      expect(result.current.selectedToken.id).toBe('token-1');
    });

    it('should return both properties', () => {
      const { result } = renderHook(() => useAllTokens());

      expect(result.current).toHaveProperty('allTokens');
      expect(result.current).toHaveProperty('selectedToken');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty token list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === tokenSelectors.selectAllTokens) {
          return [];
        }
        if (selector === tokenSelectors.selectSelectedToken) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useAllTokens());

      expect(result.current.allTokens).toEqual([]);
      expect(result.current.selectedToken).toBeNull();
    });

    it('should handle no selected token', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === tokenSelectors.selectAllTokens) {
          return mockTokens;
        }
        if (selector === tokenSelectors.selectSelectedToken) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useAllTokens());

      expect(result.current.selectedToken).toBeNull();
      expect(result.current.allTokens).toEqual(mockTokens);
    });
  });
});

describe('useTokenById', () => {
  const mockToken = { id: 'token-5', name: 'Accent Color', type: TOKEN_TYPES.COLOR, value: '#FF5733' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return token by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockToken;
        }
        return mockToken;
      });

      const { result } = renderHook(() => useTokenById('token-5'));

      expect(result.current.token).toEqual(mockToken);
      expect(result.current.token.id).toBe('token-5');
    });

    it('should return tokenById function', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockToken;
        }
        return mockToken;
      });

      const { result } = renderHook(() => useTokenById('token-5'));

      expect(result.current).toHaveProperty('tokenById');
    });

    it('should handle null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useTokenById('non-existent'));

      expect(result.current.token).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useTokenById(null));

      expect(result.current.token).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useTokenById(undefined));

      expect(result.current.token).toBeNull();
    });
  });
});

describe('useColorTokens', () => {
  const mockColorTokens = [
    { id: 'token-1', name: 'Primary', type: TOKEN_TYPES.COLOR, value: '#0000FF' },
    { id: 'token-2', name: 'Secondary', type: TOKEN_TYPES.COLOR, value: '#00FF00' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return color tokens', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockColorTokens;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens('#0000FF'));

      expect(result.current.colorTokens).toEqual(mockColorTokens);
      expect(result.current.colorTokens).toHaveLength(2);
    });

    it('should return isColorToken flag when true', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          const result = selector({});
          if (Array.isArray(result)) {
            return mockColorTokens;
          }
          return true;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens('#0000FF'));

      expect(result.current.isColorToken).toBe(true);
    });

    it('should return isColorToken flag when false', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          const result = selector({});
          if (Array.isArray(result)) {
            return mockColorTokens;
          }
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens('not-a-color'));

      expect(result.current.isColorToken).toBe(false);
    });

    it('should return both properties', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          const result = selector({});
          if (Array.isArray(result)) {
            return mockColorTokens;
          }
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens('#0000FF'));

      expect(result.current).toHaveProperty('colorTokens');
      expect(result.current).toHaveProperty('isColorToken');
    });

    it('should handle empty color tokens list', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          callCount++;
          // First call: selectTokensByType returns []
          if (callCount === 1) {return [];}
          // Second call: selectIsColorToken returns false
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens('#0000FF'));

      expect(result.current.colorTokens).toEqual([]);
    });

    it('should handle null color parameter', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          callCount++;
          // First call: selectTokensByType returns []
          if (callCount === 1) {return [];}
          // Second call: selectIsColorToken returns false
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens(null));

      expect(result.current.colorTokens).toEqual([]);
      expect(result.current.isColorToken).toBe(false);
    });

    it('should handle undefined color parameter', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          callCount++;
          // First call: selectTokensByType returns []
          if (callCount === 1) {return [];}
          // Second call: selectIsColorToken returns false
          return false;
        }
        return undefined;
      });

      const { result } = renderHook(() => useColorTokens(undefined));

      expect(result.current.colorTokens).toEqual([]);
      expect(result.current.isColorToken).toBe(false);
    });
  });
});

