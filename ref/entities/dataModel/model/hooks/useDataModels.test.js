// ===================================================================
// USE DATA MODELS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: dataModel
// Hooks: useDataModels, useDataModel
// Purpose: Provides access to data models from Redux store
// Coverage: All models, selected model, model by ID
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useDataModels, useDataModel } from './useDataModels';
import * as dataModelSelectors from '../store/selectors';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllDataModels: vi.fn(),
  selectSelectedModel: vi.fn(),
  selectDataModelById: vi.fn(),
}));

describe('useDataModels', () => {
  // Mock data
  const mockDataModels = [
    { id: 'model-1', label: 'Users', fields: [] },
    { id: 'model-2', label: 'Products', fields: [] },
    { id: 'model-3', label: 'Orders', fields: [] },
  ];

  const mockSelectedModel = mockDataModels[0];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === dataModelSelectors.selectAllDataModels) {
        return mockDataModels;
      }
      if (selector === dataModelSelectors.selectSelectedModel) {
        return mockSelectedModel;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all data models', () => {
      const { result } = renderHook(() => useDataModels());

      expect(result.current.allModels).toEqual(mockDataModels);
      expect(result.current.allModels).toHaveLength(3);
    });

    it('should return selected model', () => {
      const { result } = renderHook(() => useDataModels());

      expect(result.current.selectedModel).toEqual(mockSelectedModel);
      expect(result.current.selectedModel.id).toBe('model-1');
    });

    it('should return selected model name', () => {
      const { result } = renderHook(() => useDataModels());

      expect(result.current.selectedModelName).toBe('Users');
    });

    it('should return all three properties', () => {
      const { result } = renderHook(() => useDataModels());

      expect(result.current).toHaveProperty('allModels');
      expect(result.current).toHaveProperty('selectedModel');
      expect(result.current).toHaveProperty('selectedModelName');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty models list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === dataModelSelectors.selectAllDataModels) {
          return [];
        }
        if (selector === dataModelSelectors.selectSelectedModel) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useDataModels());

      expect(result.current.allModels).toEqual([]);
      expect(result.current.selectedModel).toBeNull();
      expect(result.current.selectedModelName).toBeUndefined();
    });

    it('should handle no selected model', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === dataModelSelectors.selectAllDataModels) {
          return mockDataModels;
        }
        if (selector === dataModelSelectors.selectSelectedModel) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useDataModels());

      expect(result.current.selectedModel).toBeNull();
      expect(result.current.selectedModelName).toBeUndefined();
      expect(result.current.allModels).toEqual(mockDataModels);
    });
  });
});

describe('useDataModel', () => {
  const mockDataModel = { id: 'model-5', label: 'Categories', fields: [] };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return model by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockDataModel;
        }
        return mockDataModel;
      });

      const { result } = renderHook(() => useDataModel('model-5'));

      expect(result.current.model).toEqual(mockDataModel);
      expect(result.current.model.id).toBe('model-5');
    });

    it('should return modelById function', () => {
      useSelector.mockImplementation((selector) => {
        return mockDataModel;
      });

      const { result } = renderHook(() => useDataModel('model-5'));

      expect(result.current).toHaveProperty('modelById');
    });

    it('should handle null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useDataModel('non-existent'));

      expect(result.current.model).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useDataModel(null));

      expect(result.current.model).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useDataModel(undefined));

      expect(result.current.model).toBeNull();
    });

    it('should return both model properties', () => {
      useSelector.mockImplementation((selector) => {
        return mockDataModel;
      });

      const { result } = renderHook(() => useDataModel('model-5'));

      expect(Object.keys(result.current)).toEqual(['model', 'modelById']);
    });
  });
});

