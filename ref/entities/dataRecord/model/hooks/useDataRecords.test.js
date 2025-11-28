// ===================================================================
// USE DATA RECORDS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: dataRecord
// Hooks: useDataRecords, useRecordsByModelId, useRecordsByIds, useRecordById
// Purpose: Provides access to data records from Redux store
// Coverage: All records, selected record, by model, by IDs, field values
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useDataRecords,
  useRecordsByModelId,
  useRecordsByIds,
  useRecordById,
} from './useDataRecords';
import * as recordSelectors from '../store/selectors';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('../store/selectors', () => ({
  selectAllDataRecords: vi.fn(),
  selectSelectedDataRecord: vi.fn(),
  selectDataRecordsByIds: vi.fn(),
  selectRawDataRecordsByModelId: vi.fn(),
  selectDataRecordById: vi.fn(),
  selectDataRecordsByModelId: vi.fn(),
}));

vi.mock('../../../dataModel', () => ({
  useDataModels: vi.fn(() => ({ selectedModel: null })),
}));

describe('useDataRecords', () => {
  // Mock data
  const mockRecords = [
    { id: 'rec-1', modelId: 'model-1', fields: { name: 'John', age: 30 } },
    { id: 'rec-2', modelId: 'model-1', fields: { name: 'Jane', age: 25 } },
    { id: 'rec-3', modelId: 'model-2', fields: { title: 'Product A' } },
  ];

  const mockSelectedRecord = mockRecords[0];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === recordSelectors.selectAllDataRecords) {
        return mockRecords;
      }
      if (selector === recordSelectors.selectSelectedDataRecord) {
        return mockSelectedRecord;
      }
      if (typeof selector === 'function') {
        // Return mock functions for factory selectors
        return vi.fn();
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all data records', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current.allDataRecords).toEqual(mockRecords);
      expect(result.current.allDataRecords).toHaveLength(3);
    });

    it('should return selected data record', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current.selectedDataRecord).toEqual(mockSelectedRecord);
      expect(result.current.selectedDataRecord.id).toBe('rec-1');
    });

    it('should return getRecordFieldValue function', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current.getRecordFieldValue).toBeDefined();
      expect(typeof result.current.getRecordFieldValue).toBe('function');
    });

    it('should return getRecordDisplayValue function', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current.getRecordDisplayValue).toBeDefined();
      expect(typeof result.current.getRecordDisplayValue).toBe('function');
    });

    it('should return getRecordsByModelId function', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current.getRecordsByModelId).toBeDefined();
      expect(typeof result.current.getRecordsByModelId).toBe('function');
    });

    it('should return all expected properties', () => {
      const { result } = renderHook(() => useDataRecords());

      expect(result.current).toHaveProperty('allDataRecords');
      expect(result.current).toHaveProperty('selectedDataRecord');
      expect(result.current).toHaveProperty('getRecordFieldValue');
      expect(result.current).toHaveProperty('getRecordDisplayValue');
      expect(result.current).toHaveProperty('getRecordsByModelId');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty records list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === recordSelectors.selectAllDataRecords) {
          return [];
        }
        if (selector === recordSelectors.selectSelectedDataRecord) {
          return null;
        }
        if (typeof selector === 'function') {
          return vi.fn();
        }
        return undefined;
      });

      const { result } = renderHook(() => useDataRecords());

      expect(result.current.allDataRecords).toEqual([]);
      expect(result.current.selectedDataRecord).toBeNull();
    });

    it('should handle no selected record', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === recordSelectors.selectAllDataRecords) {
          return mockRecords;
        }
        if (selector === recordSelectors.selectSelectedDataRecord) {
          return null;
        }
        if (typeof selector === 'function') {
          return vi.fn();
        }
        return undefined;
      });

      const { result } = renderHook(() => useDataRecords());

      expect(result.current.allDataRecords).toEqual(mockRecords);
      expect(result.current.selectedDataRecord).toBeNull();
    });
  });
});

describe('useRecordsByModelId', () => {
  const mockRawRecords = [
    { id: 'rec-1', modelId: 'model-1', fields: {} },
    { id: 'rec-2', modelId: 'model-1', fields: {} },
  ];

  const mockRecords = [
    { id: 'rec-1', modelId: 'model-1', displayValue: 'Record 1' },
    { id: 'rec-2', modelId: 'model-1', displayValue: 'Record 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return records by model ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          const state = {};
          const result = selector(state);
          if (result === undefined) {
            // First call returns raw records
            return mockRawRecords;
          }
          // Second call returns processed records
          return mockRecords;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordsByModelId('model-1'));

      expect(result.current.rawRecords).toBeDefined();
      expect(result.current.records).toBeDefined();
    });

    it('should handle null model ID', () => {
      useSelector.mockImplementation(() => []);

      const { result } = renderHook(() => useRecordsByModelId(null));

      expect(result.current.rawRecords).toEqual([]);
    });

    it('should handle undefined model ID', () => {
      useSelector.mockImplementation(() => []);

      const { result } = renderHook(() => useRecordsByModelId(undefined));

      expect(result.current.rawRecords).toEqual([]);
    });
  });
});

describe('useRecordsByIds', () => {
  const mockRecords = [
    { id: 'rec-1', name: 'Record 1' },
    { id: 'rec-2', name: 'Record 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return records by provided IDs', () => {
      const targetIds = ['rec-1', 'rec-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockRecords;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordsByIds(targetIds));

      expect(result.current.records).toEqual(mockRecords);
      expect(result.current.records).toHaveLength(2);
    });

    it('should return single record for single ID', () => {
      const targetIds = ['rec-1'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockRecords[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordsByIds(targetIds));

      expect(result.current.records).toHaveLength(1);
      expect(result.current.records[0].id).toBe('rec-1');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordsByIds([]));

      expect(result.current.records).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordsByIds(null));

      expect(result.current.records).toEqual([]);
    });
  });
});

describe('useRecordById', () => {
  const mockRecord = { id: 'rec-5', name: 'Test Record', modelId: 'model-1' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return record by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockRecord;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordById('rec-5'));

      expect(result.current.record).toEqual(mockRecord);
      expect(result.current.record.id).toBe('rec-5');
    });

    it('should return null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordById('non-existent'));

      expect(result.current.record).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordById(null));

      expect(result.current.record).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useRecordById(undefined));

      expect(result.current.record).toBeNull();
    });
  });
});

