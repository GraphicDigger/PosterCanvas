// ===================================================================
// USE CODES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: code
// Hook: useCodes
// Purpose: Provides access to code entities from Redux store
// Coverage: All codes, selected code, custom codes
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useCodes } from './useCodes';
import * as codeSelectors from '../store/selectors';
import { CODE_TYPES } from '../constants/codeTypes';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllCodes: vi.fn(),
  selectSelectedCode: vi.fn(),
  selectCodesByType: vi.fn(),
}));

vi.mock('../constants/codeTypes', () => ({
  CODE_TYPES: {
    CUSTOM: 'custom',
    JSX: 'jsx',
    CSS: 'css',
    TYPESCRIPT: 'typescript',
  },
}));

describe('useCodes', () => {
  // Mock data
  const mockCodes = [
    { id: 'code-1', type: CODE_TYPES.JSX, content: '<div>Hello</div>', lang: 'jsx' },
    { id: 'code-2', type: CODE_TYPES.CSS, content: '.class {}', lang: 'css' },
    { id: 'code-3', type: CODE_TYPES.CUSTOM, content: 'custom code', lang: 'js' },
    { id: 'code-4', type: CODE_TYPES.CUSTOM, content: 'more custom', lang: 'js' },
  ];

  const mockSelectedCode = mockCodes[0];
  const mockCustomCodes = [mockCodes[2], mockCodes[3]];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === codeSelectors.selectAllCodes) {
        return mockCodes;
      }
      if (selector === codeSelectors.selectSelectedCode) {
        return mockSelectedCode;
      }
      if (typeof selector === 'function') {
        // This is the selectCodesByType call
        return mockCustomCodes;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all codes', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes).toEqual(mockCodes);
      expect(result.current.allCodes).toHaveLength(4);
    });

    it('should return selected code', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.selectedCode).toEqual(mockSelectedCode);
      expect(result.current.selectedCode.id).toBe('code-1');
    });

    it('should return custom codes only', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.customCodes).toEqual(mockCustomCodes);
      expect(result.current.customCodes).toHaveLength(2);
    });

    it('should return all three properties', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current).toHaveProperty('allCodes');
      expect(result.current).toHaveProperty('selectedCode');
      expect(result.current).toHaveProperty('customCodes');
    });

    it('should filter custom codes correctly', () => {
      const { result } = renderHook(() => useCodes());

      result.current.customCodes.forEach(code => {
        expect(code.type).toBe(CODE_TYPES.CUSTOM);
      });
    });
  });

  // ===================================================================
  // CODE TYPE TESTS
  // ===================================================================

  describe('Code Types', () => {
    it('should handle JSX code type', () => {
      const { result } = renderHook(() => useCodes());

      const jsxCode = result.current.allCodes.find(c => c.type === CODE_TYPES.JSX);
      expect(jsxCode).toBeDefined();
      expect(jsxCode.lang).toBe('jsx');
    });

    it('should handle CSS code type', () => {
      const { result } = renderHook(() => useCodes());

      const cssCode = result.current.allCodes.find(c => c.type === CODE_TYPES.CSS);
      expect(cssCode).toBeDefined();
      expect(cssCode.lang).toBe('css');
    });

    it('should handle multiple custom codes', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.customCodes).toHaveLength(2);
      expect(result.current.customCodes[0].type).toBe(CODE_TYPES.CUSTOM);
      expect(result.current.customCodes[1].type).toBe(CODE_TYPES.CUSTOM);
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty codes list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === codeSelectors.selectAllCodes) {
          return [];
        }
        if (selector === codeSelectors.selectSelectedCode) {
          return null;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes).toEqual([]);
      expect(result.current.selectedCode).toBeNull();
      expect(result.current.customCodes).toEqual([]);
    });

    it('should handle no selected code', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === codeSelectors.selectAllCodes) {
          return mockCodes;
        }
        if (selector === codeSelectors.selectSelectedCode) {
          return null;
        }
        if (typeof selector === 'function') {
          return mockCustomCodes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes).toEqual(mockCodes);
      expect(result.current.selectedCode).toBeNull();
      expect(result.current.customCodes).toEqual(mockCustomCodes);
    });

    it('should handle no custom codes', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === codeSelectors.selectAllCodes) {
          return mockCodes;
        }
        if (selector === codeSelectors.selectSelectedCode) {
          return mockSelectedCode;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useCodes());

      expect(result.current.customCodes).toEqual([]);
      expect(result.current.allCodes).toEqual(mockCodes);
      expect(result.current.selectedCode).toEqual(mockSelectedCode);
    });

    it('should handle undefined selected code', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === codeSelectors.selectAllCodes) {
          return mockCodes;
        }
        if (selector === codeSelectors.selectSelectedCode) {
          return undefined;
        }
        if (typeof selector === 'function') {
          return mockCustomCodes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useCodes());

      expect(result.current.selectedCode).toBeUndefined();
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should work with single code', () => {
      const singleCode = [mockCodes[0]];
      useSelector.mockImplementation((selector) => {
        if (selector === codeSelectors.selectAllCodes) {
          return singleCode;
        }
        if (selector === codeSelectors.selectSelectedCode) {
          return singleCode[0];
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes).toHaveLength(1);
      expect(result.current.selectedCode).toEqual(singleCode[0]);
    });

    it('should handle mixed code types', () => {
      const { result } = renderHook(() => useCodes());

      const types = result.current.allCodes.map(c => c.type);
      expect(types).toContain(CODE_TYPES.JSX);
      expect(types).toContain(CODE_TYPES.CSS);
      expect(types).toContain(CODE_TYPES.CUSTOM);
    });

    it('should maintain code content integrity', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes[0].content).toBe('<div>Hello</div>');
      expect(result.current.allCodes[1].content).toBe('.class {}');
      expect(result.current.customCodes[0].content).toBe('custom code');
    });

    it('should maintain code language information', () => {
      const { result } = renderHook(() => useCodes());

      expect(result.current.allCodes[0].lang).toBe('jsx');
      expect(result.current.allCodes[1].lang).toBe('css');
      expect(result.current.customCodes[0].lang).toBe('js');
    });
  });
});

