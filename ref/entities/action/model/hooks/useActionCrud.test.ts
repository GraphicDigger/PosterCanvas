// ===================================================================
// Unit Tests for Action CRUD Operations
// CRITICAL BUSINESS LOGIC - Action Registration & Management
// Phase 5, Week 1, Day 5 - Action System (Part 1: 50 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActionCrud } from './useActionCrud';

// Mock Redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../store/slice', () => ({
  createAction: vi.fn((payload) => ({ type: 'actionEntity/createAction', payload })),
  deleteAction: vi.fn((payload) => ({ type: 'actionEntity/deleteAction', payload })),
  updateAction: vi.fn((payload) => ({ type: 'actionEntity/updateAction', payload })),
  createCustomAction: vi.fn((payload) => ({ type: 'actionEntity/createCustomAction', payload })),
}));

vi.mock('../constants/actionTypes', () => ({
  ACTION_TYPES: {
    CUSTOM_ACTION: 'customAction',
    LINK_TO: 'linkTo',
    API_GET: 'apiGet',
  },
}));

import { useDispatch } from 'react-redux';
import { createAction, deleteAction, updateAction, createCustomAction } from '../store/slice';

describe('Action CRUD Operations', () => {
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  // ===================================================================
  // PART 1: Create Action (15 tests)
  // ===================================================================

  describe('Create Action', () => {
    it('should create action for component', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-123',
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/createAction',
          payload: {
            entityId: 'comp-123',
            entityKind: 'component',
            trigger: 'onClick',
          },
        }),
      );
    });

    it('should create action for screen', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'screen-456',
          entityKind: 'screen',
          trigger: 'onMount',
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            entityId: 'screen-456',
            entityKind: 'screen',
            trigger: 'onMount',
          },
        }),
      );
    });

    it('should create action for element', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'elem-789',
          entityKind: 'element',
          trigger: 'onHover',
        });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {
            entityId: 'elem-789',
            entityKind: 'element',
            trigger: 'onHover',
          },
        }),
      );
    });

    it('should create action with onClick trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.trigger).toBe('onClick');
    });

    it('should create action with onMount trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'screen-1',
          entityKind: 'screen',
          trigger: 'onMount',
        });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.trigger).toBe('onMount');
    });

    it('should create action with onHover trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'elem-1',
          entityKind: 'element',
          trigger: 'onHover',
        });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.trigger).toBe('onHover');
    });

    it('should create multiple actions', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'onClick',
        });

        result.current.handleCreateAction({
          entityId: 'comp-2',
          entityKind: 'component',
          trigger: 'onMount',
        });
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should handle rapid action creation', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.handleCreateAction({
            entityId: `comp-${i}`,
            entityKind: 'component',
            trigger: 'onClick',
          });
        }
      });

      expect(mockDispatch).toHaveBeenCalledTimes(10);
    });

    it('should create action with empty entityId', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: '',
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should create action with numeric entityId', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 12345 as any,
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should create action with special characters in entityId', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-!@#$%',
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call createAction action creator', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'onClick',
        });
      });

      expect(createAction).toHaveBeenCalledWith({
        entityId: 'comp-1',
        entityKind: 'component',
        trigger: 'onClick',
      });
    });

    it('should create action with custom trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'onCustomEvent',
        });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.trigger).toBe('onCustomEvent');
    });

    it('should create action with undefined trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: undefined as any,
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should create action with null trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: null as any,
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 2: Update Action (15 tests)
  // ===================================================================

  describe('Update Action', () => {
    it('should update action type', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { type: 'linkTo' });
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/updateAction',
          payload: {
            actionId: 'action-123',
            updates: { type: 'linkTo' },
          },
        }),
      );
    });

    it('should update action name', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { name: 'Navigate Home' });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates.name).toBe('Navigate Home');
    });

    it('should update action config', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', {
          config: { targetScreenId: 'screen-456' },
        });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates.config).toEqual({ targetScreenId: 'screen-456' });
    });

    it('should update action trigger', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { trigger: 'onMount' });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates.trigger).toBe('onMount');
    });

    it('should update multiple properties', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', {
          name: 'API Call',
          type: 'apiGet',
          config: { url: '/api/data' },
        });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates).toEqual({
        name: 'API Call',
        type: 'apiGet',
        config: { url: '/api/data' },
      });
    });

    it('should update with empty updates object', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', {});
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should update with null value', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { type: null });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates.type).toBeNull();
    });

    it('should update with undefined value', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { type: undefined });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should update same action multiple times', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { name: 'Name 1' });
        result.current.handleUpdateAction('action-123', { name: 'Name 2' });
        result.current.handleUpdateAction('action-123', { name: 'Name 3' });
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should update different actions', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-1', { name: 'Action 1' });
        result.current.handleUpdateAction('action-2', { name: 'Action 2' });
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should call updateAction action creator', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', { type: 'linkTo' });
      });

      expect(updateAction).toHaveBeenCalledWith({
        actionId: 'action-123',
        updates: { type: 'linkTo' },
      });
    });

    it('should update with complex config object', () => {
      const { result } = renderHook(() => useActionCrud());

      const complexConfig = {
        url: '/api/users',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { name: 'John', age: 30 },
      };

      act(() => {
        result.current.handleUpdateAction('action-123', { config: complexConfig });
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.updates.config).toEqual(complexConfig);
    });

    it('should update with nested config', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', {
          config: {
            api: {
              endpoint: '/users',
              params: { id: 123 },
            },
          },
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should update with array in config', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleUpdateAction('action-123', {
          config: {
            actions: ['action-1', 'action-2', 'action-3'],
          },
        });
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should handle rapid updates', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        for (let i = 0; i < 20; i++) {
          result.current.handleUpdateAction(`action-${i}`, { name: `Action ${i}` });
        }
      });

      expect(mockDispatch).toHaveBeenCalledTimes(20);
    });
  });

  // ===================================================================
  // PART 3: Delete Action (10 tests)
  // ===================================================================

  describe('Delete Action', () => {
    it('should delete action by ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('action-123');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/deleteAction',
          payload: 'action-123',
        }),
      );
    });

    it('should delete multiple actions', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('action-1');
        result.current.handleDeleteAction('action-2');
        result.current.handleDeleteAction('action-3');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should call deleteAction action creator', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('action-123');
      });

      expect(deleteAction).toHaveBeenCalledWith('action-123');
    });

    it('should delete action with empty string ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should delete action with numeric ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction(12345 as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should delete action with special characters in ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('action-!@#$%');
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should delete action with null ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction(null as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should delete action with undefined ID', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction(undefined as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should handle rapid deletions', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        for (let i = 0; i < 15; i++) {
          result.current.handleDeleteAction(`action-${i}`);
        }
      });

      expect(mockDispatch).toHaveBeenCalledTimes(15);
    });

    it('should delete same action ID multiple times', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleDeleteAction('action-123');
        result.current.handleDeleteAction('action-123');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
  });

  // ===================================================================
  // PART 4: Create Custom Action (10 tests)
  // ===================================================================

  describe('Create Custom Action', () => {
    it('should create custom action', () => {
      const { result } = renderHook(() => useActionCrud());

      let customActionId: string;
      act(() => {
        customActionId = result.current.handleCreateCustomAction();
      });

      expect(mockDispatch).toHaveBeenCalled();
      expect(customActionId!).toMatch(/^custom_action_\d+$/);
    });

    it('should create custom action with unique ID', () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useActionCrud());

      let id1: string, id2: string;
      act(() => {
        id1 = result.current.handleCreateCustomAction();
      });
      vi.advanceTimersByTime(1); // Advance by 1ms to ensure different timestamp
      act(() => {
        id2 = result.current.handleCreateCustomAction();
      });

      expect(id1!).not.toBe(id2!);
      vi.useRealTimers();
    });

    it('should create custom action with CUSTOM_ACTION type', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.type).toBe('customAction');
    });

    it('should create custom action with default label', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.label).toBe('Custom Action');
    });

    it('should create custom action with default code', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.config.code).toContain('function handleCustomAction');
    });

    it('should return custom action ID', () => {
      const { result } = renderHook(() => useActionCrud());

      let actionId: string;
      act(() => {
        actionId = result.current.handleCreateCustomAction();
      });

      expect(actionId!).toBeDefined();
      expect(typeof actionId!).toBe('string');
    });

    it('should call createCustomAction action creator', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
      });

      expect(createCustomAction).toHaveBeenCalled();
    });

    it('should create multiple custom actions', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
        result.current.handleCreateCustomAction();
        result.current.handleCreateCustomAction();
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should create custom action with timestamp-based ID', () => {
      const { result } = renderHook(() => useActionCrud());

      let actionId: string;
      act(() => {
        actionId = result.current.handleCreateCustomAction();
      });

      const timestamp = actionId!.replace('custom_action_', '');
      expect(Number(timestamp)).toBeGreaterThan(0);
    });

    it('should create custom action with example code', () => {
      const { result } = renderHook(() => useActionCrud());

      act(() => {
        result.current.handleCreateCustomAction();
      });

      const call = mockDispatch.mock.calls[0][0];
      expect(call.payload.config.code).toContain('event.target');
      expect(call.payload.config.code).toContain('backgroundColor');
    });
  });
});

