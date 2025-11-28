// ===================================================================
// Unit Tests for EventActivity Slice
// CRITICAL BUSINESS LOGIC - Activity State Management
// Phase 1, Day 6 - Part 1 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import activityEntitySlice, {
  setActivities,
  setHoveredActivityId,
  setFocusedActivityId,
  setSelectedActivityId,
  resetSelectedActivityId,
  addActivity,
  updateActivity,
  removeActivity,
} from './slice';

describe('EventActivity Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredActivityId: null,
        focusedActivityId: null,
        selectedActivityId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (8 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered activity ID', () => {
      const state = activityEntitySlice(initialState, setHoveredActivityId('act-1'));
      expect(state.ui.hoveredActivityId).toBe('act-1');
    });

    it('should set focused activity ID', () => {
      const state = activityEntitySlice(initialState, setFocusedActivityId('act-2'));
      expect(state.ui.focusedActivityId).toBe('act-2');
    });

    it('should set selected activity ID', () => {
      const state = activityEntitySlice(initialState, setSelectedActivityId('act-3'));
      expect(state.ui.selectedActivityId).toBe('act-3');
    });

    it('should reset selected activity ID to null', () => {
      initialState.ui.selectedActivityId = 'act-1';

      const state = activityEntitySlice(initialState, resetSelectedActivityId());

      expect(state.ui.selectedActivityId).toBeNull();
    });

    it('should update multiple UI states independently', () => {
      let state = activityEntitySlice(initialState, setHoveredActivityId('act-1'));
      state = activityEntitySlice(state, setFocusedActivityId('act-2'));
      state = activityEntitySlice(state, setSelectedActivityId('act-3'));

      expect(state.ui.hoveredActivityId).toBe('act-1');
      expect(state.ui.focusedActivityId).toBe('act-2');
      expect(state.ui.selectedActivityId).toBe('act-3');
    });

    it('should clear UI state with null', () => {
      initialState.ui.hoveredActivityId = 'act-1';
      initialState.ui.focusedActivityId = 'act-2';

      let state = activityEntitySlice(initialState, setHoveredActivityId(null));
      state = activityEntitySlice(state, setFocusedActivityId(null));

      expect(state.ui.hoveredActivityId).toBeNull();
      expect(state.ui.focusedActivityId).toBeNull();
    });

    it('should not affect entities when updating UI state', () => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
      };
      initialState.ids.push('act-1');

      const state = activityEntitySlice(initialState, setSelectedActivityId('act-1'));

      expect(state.entities['act-1']).toEqual({
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
      });
    });

    it('should reset selected activity without affecting other UI states', () => {
      initialState.ui.hoveredActivityId = 'act-1';
      initialState.ui.focusedActivityId = 'act-2';
      initialState.ui.selectedActivityId = 'act-3';

      const state = activityEntitySlice(initialState, resetSelectedActivityId());

      expect(state.ui.hoveredActivityId).toBe('act-1');
      expect(state.ui.focusedActivityId).toBe('act-2');
      expect(state.ui.selectedActivityId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Activities (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Activities (Bulk Load)', () => {
    it('should set activities (replace all)', () => {
      const activities = [
        { id: 'act-1', type: 'comment', userId: 'user-1' },
        { id: 'act-2', type: 'update', userId: 'user-2' },
      ];

      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.ids).toEqual(['act-1', 'act-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing activities when setting new ones', () => {
      initialState.entities['act-old'] = { id: 'act-old', type: 'comment' };
      initialState.ids.push('act-old');

      const activities = [{ id: 'act-new', type: 'update', userId: 'user-1' }];
      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.entities['act-old']).toBeUndefined();
      expect(state.entities['act-new']).toBeDefined();
    });

    it('should handle empty array in setActivities', () => {
      initialState.entities['act-1'] = { id: 'act-1', type: 'comment' };
      initialState.ids.push('act-1');

      const state = activityEntitySlice(initialState, setActivities([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting activities', () => {
      initialState.ui.hoveredActivityId = 'act-hover';
      initialState.ui.focusedActivityId = 'act-focus';

      const activities = [{ id: 'act-1', type: 'comment', userId: 'user-1' }];
      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.ui.hoveredActivityId).toBe('act-hover');
      expect(state.ui.focusedActivityId).toBe('act-focus');
    });

    it('should set activities with complete metadata', () => {
      const activities = [
        {
          id: 'act-1',
          type: 'comment',
          userId: 'user-1',
          eventId: 'event-1',
          timestamp: '2024-01-15T10:00:00Z',
          data: { message: 'Great work!' },
        },
      ];

      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.entities['act-1'].type).toBe('comment');
      expect(state.entities['act-1'].userId).toBe('user-1');
      expect(state.entities['act-1'].eventId).toBe('event-1');
      expect(state.entities['act-1'].data).toEqual({ message: 'Great work!' });
    });

    it('should handle activities with various types', () => {
      const activities = [
        { id: 'act-1', type: 'comment', userId: 'user-1' },
        { id: 'act-2', type: 'update', userId: 'user-2' },
        { id: 'act-3', type: 'create', userId: 'user-3' },
        { id: 'act-4', type: 'delete', userId: 'user-4' },
      ];

      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.entities['act-1'].type).toBe('comment');
      expect(state.entities['act-2'].type).toBe('update');
      expect(state.entities['act-3'].type).toBe('create');
      expect(state.entities['act-4'].type).toBe('delete');
    });

    it('should handle large number of activities', () => {
      const activities = Array.from({ length: 100 }, (_, i) => ({
        id: `act-${i}`,
        type: 'comment',
        userId: `user-${i}`,
      }));

      const state = activityEntitySlice(initialState, setActivities(activities));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });
  });

  // ===================================================================
  // PART 3: Add Activity (10 tests)
  // ===================================================================

  describe('Add Activity', () => {
    it('should add activity with all properties', () => {
      const activity = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
        eventId: 'event-1',
        timestamp: '2024-01-15T10:00:00Z',
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.ids).toContain('act-1');
      expect(state.entities['act-1'].type).toBe('comment');
      expect(state.entities['act-1'].userId).toBe('user-1');
    });

    it('should not add duplicate activity ID', () => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
      };
      initialState.ids.push('act-1');

      const state = activityEntitySlice(
        initialState,
        addActivity({ id: 'act-1', type: 'update', userId: 'user-2' }),
      );

      expect(state.ids).toHaveLength(1);
      expect(state.entities['act-1'].type).toBe('comment'); // Original preserved
    });

    it('should add multiple activities sequentially', () => {
      let state = activityEntitySlice(
        initialState,
        addActivity({ id: 'act-1', type: 'comment', userId: 'user-1' }),
      );
      state = activityEntitySlice(
        state,
        addActivity({ id: 'act-2', type: 'update', userId: 'user-2' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['act-1'].type).toBe('comment');
      expect(state.entities['act-2'].type).toBe('update');
    });

    it('should add activity with minimal properties', () => {
      const activity = {
        id: 'act-1',
        type: 'comment',
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.entities['act-1']).toEqual({
        id: 'act-1',
        type: 'comment',
      });
    });

    it('should add activity with data payload', () => {
      const activity = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
        data: { message: 'Hello', edited: false },
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.entities['act-1'].data).toEqual({
        message: 'Hello',
        edited: false,
      });
    });

    it('should preserve existing activities when adding new one', () => {
      initialState.entities['act-existing'] = {
        id: 'act-existing',
        type: 'comment',
      };
      initialState.ids.push('act-existing');

      const state = activityEntitySlice(
        initialState,
        addActivity({ id: 'act-new', type: 'update', userId: 'user-1' }),
      );

      expect(state.entities['act-existing']).toBeDefined();
      expect(state.entities['act-new']).toBeDefined();
    });

    it('should not affect UI state when adding activity', () => {
      initialState.ui.selectedActivityId = 'act-selected';

      const state = activityEntitySlice(
        initialState,
        addActivity({ id: 'act-1', type: 'comment', userId: 'user-1' }),
      );

      expect(state.ui.selectedActivityId).toBe('act-selected');
    });

    it('should handle activity with null userId', () => {
      const activity = {
        id: 'act-1',
        type: 'system',
        userId: null,
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.entities['act-1'].userId).toBeNull();
    });

    it('should handle activity with eventId', () => {
      const activity = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
        eventId: 'event-123',
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.entities['act-1'].eventId).toBe('event-123');
    });

    it('should handle activity with timestamp', () => {
      const activity = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
        timestamp: new Date().toISOString(),
      };

      const state = activityEntitySlice(initialState, addActivity(activity));

      expect(state.entities['act-1'].timestamp).toBeTruthy();
      expect(typeof state.entities['act-1'].timestamp).toBe('string');
    });
  });

  // ===================================================================
  // PART 4: Mutation Stubs (2 tests)
  // ===================================================================

  describe('Mutation Actions (Stubs)', () => {
    it('should handle updateActivity without error', () => {
      expect(() => {
        activityEntitySlice(
          initialState,
          updateActivity({ id: 'act-1', type: 'updated' }),
        );
      }).not.toThrow();
    });

    it('should handle removeActivity without error', () => {
      expect(() => {
        activityEntitySlice(initialState, removeActivity('act-1'));
      }).not.toThrow();
    });
  });

  // ===================================================================
  // PART 5: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle multiple operations in sequence', () => {
      let state = activityEntitySlice(
        initialState,
        addActivity({ id: 'act-1', type: 'comment', userId: 'user-1' }),
      );
      state = activityEntitySlice(state, setSelectedActivityId('act-1'));

      expect(state.entities['act-1'].type).toBe('comment');
      expect(state.ui.selectedActivityId).toBe('act-1');
    });

    it('should maintain data integrity across operations', () => {
      const activities = [
        { id: 'act-1', type: 'comment', userId: 'user-1' },
        { id: 'act-2', type: 'update', userId: 'user-2' },
      ];

      let state = activityEntitySlice(initialState, setActivities(activities));
      state = activityEntitySlice(
        state,
        addActivity({ id: 'act-3', type: 'create', userId: 'user-3' }),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['act-1']).toBeDefined();
      expect(state.entities['act-2']).toBeDefined();
      expect(state.entities['act-3']).toBeDefined();
    });

    it('should handle UI state updates independently from data', () => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        type: 'comment',
        userId: 'user-1',
      };
      initialState.ids.push('act-1');

      let state = activityEntitySlice(initialState, setHoveredActivityId('act-1'));
      state = activityEntitySlice(state, setFocusedActivityId('act-1'));
      state = activityEntitySlice(state, setSelectedActivityId('act-1'));

      expect(state.ui.hoveredActivityId).toBe('act-1');
      expect(state.ui.focusedActivityId).toBe('act-1');
      expect(state.ui.selectedActivityId).toBe('act-1');
      expect(state.entities['act-1']).toBeDefined();
    });
  });
});
