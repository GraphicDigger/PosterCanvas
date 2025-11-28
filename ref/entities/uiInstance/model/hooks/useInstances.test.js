// ===================================================================
// USE INSTANCES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: uiInstance
// Hooks: useInstances, useInstancesByIds
// Purpose: Provides access to component instances from Redux store
// Coverage: All instances, selected, focused, by screen, by IDs
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useInstances, useInstancesByIds } from './useInstances';
import * as instanceStore from '../store';
import { useScreens } from '../../../uiScreen';
import { useFocusSystem } from '../../../uiFocus';
import { ENTITY_KINDS } from '../../../../shared/constants';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllInstances: vi.fn(),
  selectSelectedInstance: vi.fn(),
  selectInstancesByIds: vi.fn(),
  selectInstancesByScreenId: vi.fn(),
  selectCompositeInstanceById: vi.fn(),
  selectInstanceById: vi.fn(),
}));

vi.mock('../../../uiScreen', () => ({
  useScreens: vi.fn(),
}));

vi.mock('../../../uiFocus', () => ({
  useFocusSystem: vi.fn(),
}));

vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    INSTANCE: 'instance',
    ELEMENT: 'element',
    SCREEN: 'screen',
  },
}));

describe('useInstances', () => {
  // Mock data
  const mockInstances = [
    { id: 'inst-1', componentId: 'comp-1', screenId: 'screen-1' },
    { id: 'inst-2', componentId: 'comp-2', screenId: 'screen-1' },
    { id: 'inst-3', componentId: 'comp-1', screenId: 'screen-2' },
  ];

  const mockSelectedInstance = mockInstances[0];
  const mockFocusedInstance = mockInstances[1];
  const mockSelectedScreen = { id: 'screen-1' };
  const mockFocusEntity = { id: 'inst-2', kind: ENTITY_KINDS.INSTANCE };

  beforeEach(() => {
    vi.clearAllMocks();

    useFocusSystem.mockReturnValue({
      focusEntity: mockFocusEntity,
    });

    useScreens.mockReturnValue({
      selectedScreen: mockSelectedScreen,
    });

    // Mock state for function selectors
    const mockState = {
      uiInstanceEntity: {
        entities: mockInstances.reduce((acc, inst) => {
          acc[inst.id] = inst;
          return acc;
        }, {}),
        ids: mockInstances.map(inst => inst.id),
      },
    };

    // Mock individual selectors
    instanceStore.selectAllInstances.mockReturnValue(mockInstances);
    instanceStore.selectSelectedInstance.mockReturnValue(mockSelectedInstance);
    instanceStore.selectInstancesByIds.mockReturnValue(mockInstances);
    instanceStore.selectInstancesByScreenId.mockReturnValue(mockInstances);
    instanceStore.selectCompositeInstanceById.mockImplementation((state, id) => {
      if (id === mockSelectedInstance.id) {return mockSelectedInstance;}
      if (id === mockFocusedInstance.id) {return mockFocusedInstance;}
      return mockInstances.find(inst => inst.id === id);
    });
    instanceStore.selectInstanceById.mockImplementation((state, id) => {
      return mockInstances.find(inst => inst.id === id);
    });

    // Mock useSelector to return appropriate values
    useSelector.mockImplementation((selector) => {
      if (selector === instanceStore.selectAllInstances) {
        return mockInstances;
      }
      if (selector === instanceStore.selectSelectedInstance) {
        return mockSelectedInstance;
      }
      if (typeof selector === 'function') {
        // For function selectors, return appropriate mock values
        return selector(mockState);
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all instances', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.allInstances).toEqual(mockInstances);
      expect(result.current.allInstances).toHaveLength(3);
    });

    it('should return selected instance', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.selectedInstance).toEqual(mockSelectedInstance);
    });

    it('should return focused instance', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.focusedInstance).toEqual(mockFocusedInstance);
    });

    it('should return isFocusedInstance flag when true', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.isFocusedInstance).toBe(true);
    });

    it('should return isFocusedInstance flag when false', () => {
      useFocusSystem.mockReturnValue({
        focusEntity: { id: 'elem-1', kind: ENTITY_KINDS.ELEMENT },
      });

      const { result } = renderHook(() => useInstances());

      expect(result.current.isFocusedInstance).toBe(false);
    });

    it('should return instanceById function', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.instanceById).toBeDefined();
    });

    it('should return instancesByScreenId function', () => {
      const { result } = renderHook(() => useInstances());

      expect(result.current.instancesByScreenId).toBeDefined();
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should integrate with useFocusSystem', () => {
      const { result } = renderHook(() => useInstances());

      expect(useFocusSystem).toHaveBeenCalled();
      expect(result.current.focusedInstance).toBeDefined();
    });

    it('should integrate with useScreens', () => {
      const { result } = renderHook(() => useInstances());

      expect(useScreens).toHaveBeenCalled();
    });

    it('should handle focus entity kind correctly', () => {
      useFocusSystem.mockReturnValue({
        focusEntity: { id: 'screen-1', kind: ENTITY_KINDS.SCREEN },
      });

      const { result } = renderHook(() => useInstances());

      expect(result.current.isFocusedInstance).toBe(false);
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty instances list', () => {
      useFocusSystem.mockReturnValue({
        focusEntity: { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE },
      });

      useScreens.mockReturnValue({
        selectedScreen: { id: 'screen-1' },
      });

      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === instanceStore.selectAllInstances) {
          return [];
        }
        if (selector === instanceStore.selectSelectedInstance) {
          return null;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount <= 3) {return vi.fn();}
          if (callCount === 4) {return [];} // instancesBySelectedScreen
          if (callCount === 5) {return null;} // focusedInstance
          if (callCount === 6) {return vi.fn();} // compositeInstanceById
          if (callCount === 7) {return null;} // selectedCompositeInstance
          return null; // focusedCompositeInstance
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstances());

      expect(result.current.allInstances).toEqual([]);
    });

    it('should handle no selected screen', () => {
      useFocusSystem.mockReturnValue({
        focusEntity: { id: 'inst-1', kind: ENTITY_KINDS.INSTANCE },
      });

      useScreens.mockReturnValue({
        selectedScreen: null,
      });

      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === instanceStore.selectAllInstances) {
          return mockInstances;
        }
        if (selector === instanceStore.selectSelectedInstance) {
          return mockSelectedInstance;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount <= 3) {return vi.fn();}
          if (callCount === 4) {return [];} // instancesBySelectedScreen (null screen)
          if (callCount === 5) {return mockFocusedInstance;}
          if (callCount === 6) {return vi.fn();}
          if (callCount === 7) {return mockSelectedInstance;}
          return mockFocusedInstance;
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstances());

      expect(result.current).toBeDefined();
    });

    it('should handle no focus entity', () => {
      useFocusSystem.mockReturnValue({
        focusEntity: { kind: null },
      });

      useScreens.mockReturnValue({
        selectedScreen: mockSelectedScreen,
      });

      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === instanceStore.selectAllInstances) {
          return mockInstances;
        }
        if (selector === instanceStore.selectSelectedInstance) {
          return mockSelectedInstance;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount <= 3) {return vi.fn();}
          if (callCount === 4) {return [mockInstances[0], mockInstances[1]];}
          if (callCount === 5) {return null;} // no focused instance
          if (callCount === 6) {return vi.fn();}
          if (callCount === 7) {return mockSelectedInstance;}
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstances());

      expect(result.current.isFocusedInstance).toBe(false);
    });
  });
});

describe('useInstancesByIds', () => {
  const mockInstances = [
    { id: 'inst-1', componentId: 'comp-1' },
    { id: 'inst-2', componentId: 'comp-2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return instances by provided IDs', () => {
      const targetIds = ['inst-1', 'inst-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockInstances;
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstancesByIds(targetIds));

      expect(result.current.instances).toEqual(mockInstances);
      expect(result.current.instances).toHaveLength(2);
    });

    it('should return single instance for single ID', () => {
      const targetIds = ['inst-1'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockInstances[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstancesByIds(targetIds));

      expect(result.current.instances).toHaveLength(1);
      expect(result.current.instances[0].id).toBe('inst-1');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstancesByIds([]));

      expect(result.current.instances).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstancesByIds(['non-existent']));

      expect(result.current.instances).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useInstancesByIds(null));

      expect(result.current.instances).toEqual([]);
    });
  });
});

