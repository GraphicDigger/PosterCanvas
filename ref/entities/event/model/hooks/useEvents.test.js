// ===================================================================
// EVENT SYSTEM TESTS: Event Hooks
// 🔴 CRITICAL-FIRST STRATEGY - Phase 6 Part 2 🔴
// Event Access, Selection, Filtering
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEvents, useEventsByIds } from './useEvents';
import { useSelector } from 'react-redux';

// Mock Redux hooks
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

// Mock selectors
vi.mock('../store', () => ({
  selectAllEvents: vi.fn(),
  selectSelectedEvent: vi.fn(),
  selectEventsByIds: vi.fn(),
}));

import {
  selectAllEvents,
  selectSelectedEvent,
  selectEventsByIds,
} from '../store';

describe('Event Hooks - CRITICAL BUSINESS LOGIC', () => {

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useSelector to call the selector and return its result
    useSelector.mockImplementation((selector) => selector());
  });

  // ===================================================================
  // Section 1: useEvents Hook (5 tests)
  // ===================================================================

  describe('useEvents Hook', () => {
    it('should return allEvents from selector', () => {
      const mockEvents = [
        { id: 'event-1', type: 'element_created', timestamp: '2025-01-01' },
        { id: 'event-2', type: 'component_created', timestamp: '2025-01-02' },
      ];

      selectAllEvents.mockReturnValue(mockEvents);
      selectSelectedEvent.mockReturnValue(null);

      const { result } = renderHook(() => useEvents());

      expect(result.current.allEvents).toEqual(mockEvents);
      expect(result.current.allEvents).toHaveLength(2);
    });

    it('should return selectedEvent from selector', () => {
      const mockSelectedEvent = {
        id: 'event-1',
        type: 'element_created',
        memberId: 'member-1',
        timestamp: '2025-01-01',
      };

      selectAllEvents.mockReturnValue([]);
      selectSelectedEvent.mockReturnValue(mockSelectedEvent);

      const { result } = renderHook(() => useEvents());

      expect(result.current.selectedEvent).toEqual(mockSelectedEvent);
      expect(result.current.selectedEvent.id).toBe('event-1');
    });

    it('should return empty array when no events', () => {
      selectAllEvents.mockReturnValue([]);
      selectSelectedEvent.mockReturnValue(null);

      const { result } = renderHook(() => useEvents());

      expect(result.current.allEvents).toEqual([]);
      expect(result.current.selectedEvent).toBeNull();
    });

    it('should call selectors', () => {
      selectAllEvents.mockReturnValue([]);
      selectSelectedEvent.mockReturnValue(null);

      renderHook(() => useEvents());

      expect(selectAllEvents).toHaveBeenCalled();
      expect(selectSelectedEvent).toHaveBeenCalled();
    });

    it('should handle large number of events', () => {
      const mockEvents = Array.from({ length: 1000 }, (_, i) => ({
        id: `event-${i}`,
        type: 'element_created',
        timestamp: `2025-01-${i % 30 + 1}`,
      }));

      selectAllEvents.mockReturnValue(mockEvents);
      selectSelectedEvent.mockReturnValue(null);

      const { result } = renderHook(() => useEvents());

      expect(result.current.allEvents).toHaveLength(1000);
      expect(result.current.allEvents[0].id).toBe('event-0');
      expect(result.current.allEvents[999].id).toBe('event-999');
    });
  });

  // ===================================================================
  // Section 2: useEventsByIds Hook (10 tests)
  // ===================================================================

  describe('useEventsByIds Hook', () => {
    beforeEach(() => {
      // Mock useSelector for parametrized selectors
      useSelector.mockImplementation((selectorFn) => {
        if (typeof selectorFn === 'function') {
          return selectorFn({});
        }
        return selectorFn;
      });
    });

    it('should return events for single ID', () => {
      const mockEvents = [
        { id: 'event-1', type: 'element_created' },
      ];

      selectEventsByIds.mockReturnValue(mockEvents);

      const { result } = renderHook(() => useEventsByIds(['event-1']));

      expect(result.current.Events).toEqual(mockEvents);
      expect(result.current.Events).toHaveLength(1);
    });

    it('should return events for multiple IDs', () => {
      const mockEvents = [
        { id: 'event-1', type: 'element_created' },
        { id: 'event-2', type: 'component_created' },
        { id: 'event-3', type: 'code_created' },
      ];

      selectEventsByIds.mockReturnValue(mockEvents);

      const { result } = renderHook(() => useEventsByIds(['event-1', 'event-2', 'event-3']));

      expect(result.current.Events).toEqual(mockEvents);
      expect(result.current.Events).toHaveLength(3);
    });

    it('should return empty array for empty IDs', () => {
      selectEventsByIds.mockReturnValue([]);

      const { result } = renderHook(() => useEventsByIds([]));

      expect(result.current.Events).toEqual([]);
    });

    it('should return empty array for null IDs', () => {
      selectEventsByIds.mockReturnValue([]);

      const { result } = renderHook(() => useEventsByIds(null));

      expect(result.current.Events).toEqual([]);
    });

    it('should return empty array for undefined IDs', () => {
      selectEventsByIds.mockReturnValue([]);

      const { result } = renderHook(() => useEventsByIds(undefined));

      expect(result.current.Events).toEqual([]);
    });

    it('should call selectEventsByIds with state and ids', () => {
      selectEventsByIds.mockReturnValue([]);

      const ids = ['event-1', 'event-2'];
      renderHook(() => useEventsByIds(ids));

      expect(selectEventsByIds).toHaveBeenCalled();
    });

    it('should handle events with different types', () => {
      const mockEvents = [
        { id: 'event-1', type: 'element_created', timestamp: '2025-01-01' },
        { id: 'event-2', type: 'component_created', timestamp: '2025-01-02' },
        { id: 'event-3', type: 'comment_added', timestamp: '2025-01-03' },
        { id: 'event-4', type: 'task_created', timestamp: '2025-01-04' },
      ];

      selectEventsByIds.mockReturnValue(mockEvents);

      const { result } = renderHook(() => useEventsByIds(['event-1', 'event-2', 'event-3', 'event-4']));

      expect(result.current.Events).toHaveLength(4);
      expect(result.current.Events.map(e => e.type)).toEqual([
        'element_created',
        'component_created',
        'comment_added',
        'task_created',
      ]);
    });

    it('should handle events with full payload', () => {
      const mockEvents = [
        {
          id: 'event-1',
          kind: 'event',
          type: 'element_created',
          memberId: 'member-1',
          source: {
            entityId: 'element-1',
            entityKind: 'element',
          },
          payload: {
            text: 'Added a <div> element',
            projectId: 'project-1',
          },
          approved: true,
          timestamp: '2025-01-01T12:00:00Z',
        },
      ];

      selectEventsByIds.mockReturnValue(mockEvents);

      const { result } = renderHook(() => useEventsByIds(['event-1']));

      expect(result.current.Events[0]).toMatchObject({
        id: 'event-1',
        type: 'element_created',
        memberId: 'member-1',
        approved: true,
      });
      expect(result.current.Events[0].source.entityKind).toBe('element');
      expect(result.current.Events[0].payload.text).toBe('Added a <div> element');
    });

    it('should update when IDs change', () => {
      const mockEvents1 = [{ id: 'event-1', type: 'element_created' }];
      const mockEvents2 = [{ id: 'event-2', type: 'component_created' }];

      selectEventsByIds.mockReturnValueOnce(mockEvents1);

      const { result, rerender } = renderHook(
        ({ ids }) => useEventsByIds(ids),
        { initialProps: { ids: ['event-1'] } },
      );

      expect(result.current.Events).toEqual(mockEvents1);

      selectEventsByIds.mockReturnValueOnce(mockEvents2);
      rerender({ ids: ['event-2'] });

      expect(result.current.Events).toEqual(mockEvents2);
    });

    it('should handle large number of event IDs', () => {
      const mockEvents = Array.from({ length: 100 }, (_, i) => ({
        id: `event-${i}`,
        type: 'element_created',
      }));

      selectEventsByIds.mockReturnValue(mockEvents);

      const ids = Array.from({ length: 100 }, (_, i) => `event-${i}`);
      const { result } = renderHook(() => useEventsByIds(ids));

      expect(result.current.Events).toHaveLength(100);
    });
  });
});

