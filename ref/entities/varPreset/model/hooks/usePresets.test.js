// ===================================================================
// USE PRESETS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: varPreset
// Hooks: usePresets, usePreset, useSelectedPreset
// Purpose: Provides access to design presets from Redux store
// Coverage: All presets, selected preset, preset by ID, typography presets
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { usePresets, usePreset, useSelectedPreset } from './usePresets';
import * as presetSelectors from '../store/selectors';
import * as presetCollectionSelectors from '../../@x/presetCollection';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllPresets: vi.fn(),
  selectSelectedPreset: vi.fn(),
  selectTypographyCollectionPresets: vi.fn(),
  selectPresetsByCollectionId: vi.fn(),
  selectPresetById: vi.fn(),
  selectCollectionPresetsAndModes: vi.fn(),
}));

vi.mock('../../@x/presetCollection', () => ({
  selectSelectedPresetCollectionId: vi.fn(),
}));

describe('usePresets', () => {
  // Mock data
  const mockPresets = [
    { id: 'preset-1', name: 'Heading 1', type: 'typography' },
    { id: 'preset-2', name: 'Body Text', type: 'typography' },
    { id: 'preset-3', name: 'Button Style', type: 'style' },
  ];

  const mockSelectedPreset = mockPresets[0];
  const mockSelectedCollectionId = 'collection-1';
  const mockTypographyPresets = [mockPresets[0], mockPresets[1]];
  const mockCollectionPresetsAndModes = {
    presets: mockPresets,
    modes: ['Light', 'Dark'],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    let callCount = 0;
    useSelector.mockImplementation((selector) => {
      if (selector === presetSelectors.selectAllPresets) {
        return mockPresets;
      }
      if (selector === presetCollectionSelectors.selectSelectedPresetCollectionId) {
        return mockSelectedCollectionId;
      }
      if (selector === presetSelectors.selectSelectedPreset) {
        return mockSelectedPreset;
      }
      if (selector === presetSelectors.selectTypographyCollectionPresets) {
        return mockTypographyPresets;
      }
      if (typeof selector === 'function') {
        callCount++;
        // First call: selectCollectionPresetsAndModesFn
        if (callCount === 1) {
          return (collectionId) => mockCollectionPresetsAndModes;
        }
        // Second call: getCollectionPresetsAndModes result
        return mockCollectionPresetsAndModes;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all presets', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current.allPresets).toEqual(mockPresets);
      expect(result.current.allPresets).toHaveLength(3);
    });

    it('should return selected preset', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current.selectedPreset).toEqual(mockSelectedPreset);
      expect(result.current.selectedPreset.id).toBe('preset-1');
    });

    it('should return typography collection presets', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current.typographyCollectionPresets).toEqual(mockTypographyPresets);
      expect(result.current.typographyCollectionPresets).toHaveLength(2);
    });

    it('should return getCollectionPresetsAndModes function', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current.getCollectionPresetsAndModes).toBeDefined();
      expect(typeof result.current.getCollectionPresetsAndModes).toBe('function');
    });

    it('should return collectionPresetsAndModes', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current.collectionPresetsAndModes).toEqual(mockCollectionPresetsAndModes);
      expect(result.current.collectionPresetsAndModes.presets).toHaveLength(3);
    });

    it('should return all five properties', () => {
      const { result } = renderHook(() => usePresets());

      expect(result.current).toHaveProperty('allPresets');
      expect(result.current).toHaveProperty('selectedPreset');
      expect(result.current).toHaveProperty('typographyCollectionPresets');
      expect(result.current).toHaveProperty('getCollectionPresetsAndModes');
      expect(result.current).toHaveProperty('collectionPresetsAndModes');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty preset list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === presetSelectors.selectAllPresets) {
          return [];
        }
        if (selector === presetSelectors.selectSelectedPreset) {
          return null;
        }
        if (selector === presetSelectors.selectTypographyCollectionPresets) {
          return [];
        }
        if (typeof selector === 'function') {
          return () => ({ presets: [], modes: [] });
        }
        return undefined;
      });

      const { result } = renderHook(() => usePresets());

      expect(result.current.allPresets).toEqual([]);
      expect(result.current.selectedPreset).toBeNull();
      expect(result.current.typographyCollectionPresets).toEqual([]);
    });

    it('should handle no selected preset', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === presetSelectors.selectAllPresets) {
          return mockPresets;
        }
        if (selector === presetSelectors.selectSelectedPreset) {
          return null;
        }
        if (selector === presetSelectors.selectTypographyCollectionPresets) {
          return mockTypographyPresets;
        }
        if (selector === presetCollectionSelectors.selectSelectedPresetCollectionId) {
          return mockSelectedCollectionId;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {
            return (collectionId) => mockCollectionPresetsAndModes;
          }
          return mockCollectionPresetsAndModes;
        }
        return undefined;
      });

      const { result } = renderHook(() => usePresets());

      expect(result.current.selectedPreset).toBeNull();
      expect(result.current.allPresets).toEqual(mockPresets);
    });

    it('should handle no typography presets', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === presetSelectors.selectAllPresets) {
          return mockPresets;
        }
        if (selector === presetSelectors.selectSelectedPreset) {
          return mockSelectedPreset;
        }
        if (selector === presetSelectors.selectTypographyCollectionPresets) {
          return [];
        }
        if (selector === presetCollectionSelectors.selectSelectedPresetCollectionId) {
          return mockSelectedCollectionId;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {
            return (collectionId) => mockCollectionPresetsAndModes;
          }
          return mockCollectionPresetsAndModes;
        }
        return undefined;
      });

      const { result } = renderHook(() => usePresets());

      expect(result.current.typographyCollectionPresets).toEqual([]);
    });
  });
});

describe('usePreset', () => {
  const mockPreset = { id: 'preset-5', name: 'Caption', type: 'typography' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return preset by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockPreset;
        }
        return mockPreset;
      });

      const { result } = renderHook(() => usePreset('preset-5'));

      expect(result.current.preset).toEqual(mockPreset);
      expect(result.current.preset.id).toBe('preset-5');
    });

    it('should return presetById function', () => {
      useSelector.mockImplementation((selector) => {
        return mockPreset;
      });

      const { result } = renderHook(() => usePreset('preset-5'));

      expect(result.current).toHaveProperty('presetById');
    });

    it('should handle null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => usePreset('non-existent'));

      expect(result.current.preset).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => usePreset(null));

      expect(result.current.preset).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => usePreset(undefined));

      expect(result.current.preset).toBeNull();
    });
  });
});

describe('useSelectedPreset', () => {
  const mockSelectedPreset = { id: 'preset-10', name: 'Selected Preset', type: 'typography' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return selected preset', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === presetSelectors.selectSelectedPreset) {
          return mockSelectedPreset;
        }
        return undefined;
      });

      const { result } = renderHook(() => useSelectedPreset());

      expect(result.current.selectedPreset).toEqual(mockSelectedPreset);
      expect(result.current.selectedPreset.id).toBe('preset-10');
    });

    it('should handle null selected preset', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === presetSelectors.selectSelectedPreset) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useSelectedPreset());

      expect(result.current.selectedPreset).toBeNull();
    });

    it('should return only selectedPreset property', () => {
      useSelector.mockImplementation((selector) => {
        return mockSelectedPreset;
      });

      const { result } = renderHook(() => useSelectedPreset());

      expect(Object.keys(result.current)).toEqual(['selectedPreset']);
    });
  });
});

