/**
 * Unit Tests for useChangeAction Hook
 *
 * Phase 5 - Week 2 Day 3: Action System Advanced Tests
 *
 * Purpose: Test action management operations (triggers, types, config)
 * Coverage Target: 90%+ for useChangeAction hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Add Trigger Operations (15 tests)
 * 2. Update Trigger Operations (10 tests)
 * 3. Update Action Type Operations (20 tests)
 * 4. Update Action Config Operations (15 tests)
 * 5. Edge Cases & Error Handling (20 tests)
 *
 * Total: 80 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChangeAction } from './useChangeAction';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../../../entities/action', () => ({
  createCustomAction: vi.fn(),
  ACTION_TYPES: {
    CUSTOM_ACTION: 'CUSTOM_ACTION',
    NAVIGATE: 'NAVIGATE',
    SET_VARIABLE: 'SET_VARIABLE',
    API_CALL: 'API_CALL',
  },
  setActionType: vi.fn((payload) => ({ type: 'SET_ACTION_TYPE', payload })),
  ACTION_CONFIG: {
    NAVIGATE: { config: { url: '', target: '_self' } },
    SET_VARIABLE: { config: { variable: '', value: '' } },
    API_CALL: { config: { endpoint: '', method: 'GET' } },
  },
  useActionCrud: vi.fn(),
}));

vi.mock('../../../../entities/uiFocus', () => ({
  useFocusSystem: vi.fn(),
}));

import { useDispatch } from 'react-redux';
import { setActionType, ACTION_CONFIG } from '../../../../entities/action';
import { useActionCrud } from '../../../../entities/action';
import { useFocusSystem } from '../../../../entities/uiFocus';

describe('useChangeAction Hook', () => {
  let mockDispatch: ReturnType<typeof vi.fn>;
  let mockHandleUpdateAction: ReturnType<typeof vi.fn>;
  let mockHandleCreateAction: ReturnType<typeof vi.fn>;
  let mockFocusEntity: any;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockHandleUpdateAction = vi.fn();
    mockHandleCreateAction = vi.fn();
    mockFocusEntity = {
      id: 'entity-1',
      kind: 'element',
    };

    (useDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);

    (useActionCrud as ReturnType<typeof vi.fn>).mockReturnValue({
      handleUpdateAction: mockHandleUpdateAction,
      handleCreateAction: mockHandleCreateAction,
    });

    (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
      focusEntity: mockFocusEntity,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: ADD TRIGGER OPERATIONS (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Add Trigger Operations', () => {
    it('should add trigger with onClick', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onClick',
      });
    });

    it('should add trigger with onChange', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onChange');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onChange',
      });
    });

    it('should add trigger with onSubmit', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onSubmit');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onSubmit',
      });
    });

    it('should add trigger with onLoad', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onLoad');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onLoad',
      });
    });

    it('should add trigger with onHover', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onHover');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onHover',
      });
    });

    it('should not add trigger if no focus entity', () => {
      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: null,
      });

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).not.toHaveBeenCalled();
    });

    it('should not add trigger if focus entity is undefined', () => {
      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: undefined,
      });

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).not.toHaveBeenCalled();
    });

    it('should add trigger with different entity kind', () => {
      mockFocusEntity.kind = 'component';

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'component',
        trigger: 'onClick',
      });
    });

    it('should add trigger with different entity ID', () => {
      mockFocusEntity.id = 'entity-2';

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-2',
        entityKind: 'element',
        trigger: 'onClick',
      });
    });

    it('should handle multiple add trigger calls', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      act(() => {
        result.current.handleAddTrigger('onChange');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledTimes(2);
    });

    it('should add trigger with custom trigger type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onCustomEvent');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onCustomEvent',
      });
    });

    it('should add trigger with empty string', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: '',
      });
    });

    it('should add trigger with null', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger(null as any);
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: null,
      });
    });

    it('should add trigger with very long trigger name', () => {
      const longTrigger = 'on' + 'A'.repeat(1000);
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger(longTrigger);
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: longTrigger,
      });
    });

    it('should add trigger with focus entity having additional properties', () => {
      mockFocusEntity = {
        id: 'entity-1',
        kind: 'element',
        name: 'Button',
        type: 'button',
      };

      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: mockFocusEntity,
      });

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onClick',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: UPDATE TRIGGER OPERATIONS (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Update Trigger Operations', () => {
    it('should update trigger', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', 'onChange');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: 'onChange',
      });
    });

    it('should update trigger to onClick', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', 'onClick');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: 'onClick',
      });
    });

    it('should update trigger to onSubmit', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', 'onSubmit');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: 'onSubmit',
      });
    });

    it('should not update trigger if no action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('', 'onClick');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should not update trigger if action ID is null', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger(null as any, 'onClick');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should not update trigger if action ID is undefined', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger(undefined as any, 'onClick');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should update trigger for different action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-2', 'onLoad');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-2', {
        trigger: 'onLoad',
      });
    });

    it('should handle multiple update trigger calls', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', 'onClick');
      });

      act(() => {
        result.current.handleUpdateTrigger('action-2', 'onChange');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledTimes(2);
    });

    it('should update trigger with null trigger type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', null as any);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: null,
      });
    });

    it('should update trigger with empty string trigger type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', '');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: '',
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: UPDATE ACTION TYPE OPERATIONS (20 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Update Action Type Operations', () => {
    it('should update action type with string type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'NAVIGATE');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'NAVIGATE',
          config: { url: '', target: '_self' },
        },
      });
    });

    it('should update action type with object containing type and config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'NAVIGATE',
          config: { url: '/home', target: '_blank' },
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'NAVIGATE',
          config: { url: '/home', target: '_blank' },
        },
      });
    });

    it('should update action type to SET_VARIABLE', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'SET_VARIABLE');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'SET_VARIABLE',
          config: { variable: '', value: '' },
        },
      });
    });

    it('should update action type to API_CALL', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'API_CALL');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'API_CALL',
          config: { endpoint: '', method: 'GET' },
        },
      });
    });

    it('should update action type with unknown type (empty config)', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'UNKNOWN_TYPE');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'UNKNOWN_TYPE',
          config: {},
        },
      });
    });

    it('should not update action type if no action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('', 'NAVIGATE');
      });

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should not update action type if action ID is null', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType(null as any, 'NAVIGATE');
      });

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should not update action type if action ID is undefined', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType(undefined as any, 'NAVIGATE');
      });

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should update action type for different action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-2', 'NAVIGATE');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-2',
          type: 'NAVIGATE',
          config: { url: '', target: '_self' },
        },
      });
    });

    it('should handle multiple update action type calls', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'NAVIGATE');
      });

      act(() => {
        result.current.handleUpdateActionType('action-2', 'SET_VARIABLE');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should update action type with object having empty config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'CUSTOM_ACTION',
          config: {},
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'CUSTOM_ACTION',
          config: {},
        },
      });
    });

    it('should update action type with object having complex config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'API_CALL',
          config: {
            endpoint: 'https://api.example.com/data',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { key: 'value' },
          },
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'API_CALL',
          config: {
            endpoint: 'https://api.example.com/data',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { key: 'value' },
          },
        },
      });
    });

    it('should update action type with object having null config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'NAVIGATE',
          config: null as any,
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'NAVIGATE',
          config: null,
        },
      });
    });

    it('should update action type with object having undefined config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'NAVIGATE',
          config: undefined as any,
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'NAVIGATE',
          config: undefined,
        },
      });
    });

    it('should update action type with empty string type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', '');
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: '',
          config: {},
        },
      });
    });

    it('should update action type with very long type name', () => {
      const longType = 'ACTION_' + 'A'.repeat(1000);
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', longType);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: longType,
          config: {},
        },
      });
    });

    it('should update action type with object having only type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'NAVIGATE',
        } as any);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'NAVIGATE',
          config: undefined,
        },
      });
    });

    it('should update action type with object having only config', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          config: { url: '/test' },
        } as any);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: undefined,
          config: { url: '/test' },
        },
      });
    });

    it('should handle switching between string and object types', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', 'NAVIGATE');
      });

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'API_CALL',
          config: { endpoint: '/api' },
        });
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should update action type with custom action type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {
          type: 'CUSTOM_ACTION',
          config: { code: 'console.log("test")' },
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: 'CUSTOM_ACTION',
          config: { code: 'console.log("test")' },
        },
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 4: UPDATE ACTION CONFIG OPERATIONS (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Update Action Config Operations', () => {
    it('should update action config field', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'url', '/home');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          url: '/home',
        },
      });
    });

    it('should update action config with different field', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'method', 'POST');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          method: 'POST',
        },
      });
    });

    it('should update action config with number value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'timeout', 5000);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          timeout: 5000,
        },
      });
    });

    it('should update action config with boolean value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'async', true);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          async: true,
        },
      });
    });

    it('should update action config with object value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'headers', { 'Content-Type': 'application/json' });
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          headers: { 'Content-Type': 'application/json' },
        },
      });
    });

    it('should update action config with array value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'params', ['param1', 'param2']);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          params: ['param1', 'param2'],
        },
      });
    });

    it('should update action config with null value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'data', null);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          data: null,
        },
      });
    });

    it('should update action config with undefined value', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'optional', undefined);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          optional: undefined,
        },
      });
    });

    it('should not update action config if no action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('', 'url', '/home');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should not update action config if action ID is null', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig(null as any, 'url', '/home');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should not update action config if action ID is undefined', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig(undefined as any, 'url', '/home');
      });

      expect(mockHandleUpdateAction).not.toHaveBeenCalled();
    });

    it('should update action config for different action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-2', 'endpoint', '/api/data');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-2', {
        config: {
          endpoint: '/api/data',
        },
      });
    });

    it('should handle multiple update action config calls', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'url', '/home');
      });

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'method', 'POST');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledTimes(2);
    });

    it('should update action config with empty string field name', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', '', 'value');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          '': 'value',
        },
      });
    });

    it('should update action config with very long field name', () => {
      const longField = 'field_' + 'A'.repeat(1000);
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', longField, 'value');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          [longField]: 'value',
        },
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 5: EDGE CASES & ERROR HANDLING (20 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Edge Cases & Error Handling', () => {
    it('should handle concurrent operations', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
        result.current.handleUpdateTrigger('action-1', 'onChange');
        result.current.handleUpdateActionType('action-2', 'NAVIGATE');
        result.current.handleUpdateActionConfig('action-3', 'url', '/test');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledTimes(1);
      expect(mockHandleUpdateAction).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });

    it('should handle add trigger when focus entity changes', () => {
      const { result, rerender } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      mockFocusEntity.id = 'entity-2';
      rerender();

      act(() => {
        result.current.handleAddTrigger('onChange');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledTimes(2);
      expect(mockHandleCreateAction).toHaveBeenNthCalledWith(1, {
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'onClick',
      });
      expect(mockHandleCreateAction).toHaveBeenNthCalledWith(2, {
        entityId: 'entity-2',
        entityKind: 'element',
        trigger: 'onChange',
      });
    });

    it('should handle focus entity becoming null', () => {
      const { result, rerender } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: null,
      });
      rerender();

      act(() => {
        result.current.handleAddTrigger('onChange');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledTimes(1);
    });

    it('should handle very long action ID', () => {
      const longActionId = 'action-' + 'x'.repeat(1000);
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger(longActionId, 'onClick');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith(longActionId, {
        trigger: 'onClick',
      });
    });

    it('should handle special characters in action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-$@#%', 'onClick');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-$@#%', {
        trigger: 'onClick',
      });
    });

    it('should handle special characters in trigger type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('on$Custom#Event');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 'on$Custom#Event',
      });
    });

    it('should handle special characters in field name', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'field-$@#', 'value');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          'field-$@#': 'value',
        },
      });
    });

    it('should handle numeric action ID', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger(123 as any, 'onClick');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith(123, {
        trigger: 'onClick',
      });
    });

    it('should handle numeric trigger type', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger(123 as any);
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: 'element',
        trigger: 123,
      });
    });

    it('should handle numeric field name', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 123 as any, 'value');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          123: 'value',
        },
      });
    });

    it('should handle focus entity with missing id', () => {
      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: { kind: 'element' },
      });

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: undefined,
        entityKind: 'element',
        trigger: 'onClick',
      });
    });

    it('should handle focus entity with missing kind', () => {
      (useFocusSystem as ReturnType<typeof vi.fn>).mockReturnValue({
        focusEntity: { id: 'entity-1' },
      });

      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleAddTrigger('onClick');
      });

      expect(mockHandleCreateAction).toHaveBeenCalledWith({
        entityId: 'entity-1',
        entityKind: undefined,
        trigger: 'onClick',
      });
    });

    it('should handle empty object as typeOrConfig', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', {} as any);
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: undefined,
          config: undefined,
        },
      });
    });

    it('should handle array as typeOrConfig', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionType('action-1', ['NAVIGATE'] as any);
      });

      // Arrays are objects, so it will try to destructure
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_ACTION_TYPE',
        payload: {
          actionId: 'action-1',
          type: undefined,
          config: undefined,
        },
      });
    });

    it('should handle function as value in config', () => {
      const mockFn = vi.fn();
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'callback', mockFn);
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          callback: mockFn,
        },
      });
    });

    it('should handle symbol as field name', () => {
      const symbolKey = Symbol('test');
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', symbolKey as any, 'value');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          [symbolKey]: 'value',
        },
      });
    });

    it('should handle rapid sequential operations', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current.handleUpdateActionConfig('action-1', `field${i}`, `value${i}`);
        }
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledTimes(100);
    });

    it('should handle operations with whitespace-only strings', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateTrigger('action-1', '   ');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        trigger: '   ',
      });
    });

    it('should handle operations with newline characters', () => {
      const { result } = renderHook(() => useChangeAction());

      act(() => {
        result.current.handleUpdateActionConfig('action-1', 'code', 'line1\nline2\nline3');
      });

      expect(mockHandleUpdateAction).toHaveBeenCalledWith('action-1', {
        config: {
          code: 'line1\nline2\nline3',
        },
      });
    });
  });
});

