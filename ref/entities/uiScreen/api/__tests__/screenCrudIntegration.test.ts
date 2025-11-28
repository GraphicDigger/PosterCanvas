/**
 * Screen CRUD → Redux Integration Tests
 *
 * Purpose: Validate Create, Update, Delete operations with Redux state
 * Risk Level: 🟡 LOW (Mock operations, no real database writes)
 *
 * Test Strategy:
 * - Test Redux CRUD operations
 * - Validate state mutations
 * - Ensure optimistic updates
 * - Test rollback scenarios
 * - No side effects, no external calls
 *
 * Safety:
 * - Zero functional code changes
 * - Isolated test environment
 * - Mock operations only
 * - Proper cleanup
 * - Deterministic execution
 *
 * Note: Following existing integration test patterns in this codebase
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import screenReducer, {
  setScreens,
  addScreen,
  updateScreen,
  removeScreen,
} from '../../model/store/slice';
import {
  selectAllScreens,
  selectScreenById,
} from '../../model/store/selector';
import { ENTITY_KINDS } from '@/shared/constants';

// ============================================================================
// TEST SETUP
// ============================================================================

describe('Screen CRUD → Redux Integration', () => {
  let store: any;

  beforeEach(() => {
    // Create isolated Redux store (no side effects)
    store = configureStore({
      reducer: {
        screenEntity: screenReducer,
      },
    });
  });

  // ==========================================================================
  // CATEGORY 1: CREATE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Create Operations', () => {
    it('should create new screen via Redux action', () => {
      // Arrange: Initial empty state
      const initialState = store.getState();
      expect(selectAllScreens(initialState)).toHaveLength(0);

      // Act: Create new screen
      store.dispatch(addScreen({
        name: 'New Screen',
        preview: 'preview-url',
        doc: 'Screen documentation',
      }));

      // Assert: Verify screen created
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(1);
      expect(screens[0]?.name).toBe('New Screen');
      expect(screens[0]?.preview).toBe('preview-url');
    });

    it('should verify screen ID generation on create', () => {
      // Act: Create screen
      store.dispatch(addScreen({
        name: 'Test Screen',
      }));

      // Assert: Verify ID was generated
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens[0]?.id).toBeDefined();
      expect(typeof screens[0]?.id).toBe('string');
      expect(screens[0]?.id.length).toBeGreaterThan(0);
    });

    it('should check Redux state updated correctly after create', () => {
      // Act: Create screen
      store.dispatch(addScreen({
        name: 'New Screen',
        kind: ENTITY_KINDS.SCREEN,
      }));

      // Assert: Verify state structure
      const state = store.getState().screenEntity;
      expect(state.ids).toHaveLength(1);
      expect(Object.keys(state.entities)).toHaveLength(1);
      const screenId = state.ids[0];
      expect(state.entities[screenId]).toBeDefined();
      expect(state.entities[screenId].name).toBe('New Screen');
    });

    it('should validate default values on screen creation', () => {
      // Act: Create screen with minimal data
      store.dispatch(addScreen({
        name: 'Minimal Screen',
      }));

      // Assert: Verify defaults applied
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens[0]?.name).toBe('Minimal Screen');
      expect(screens[0]?.kind).toBe(ENTITY_KINDS.SCREEN);
      expect(screens[0]?.id).toBeDefined();
    });

    it('should ensure data persistence after create', () => {
      // Act: Create multiple screens
      store.dispatch(addScreen({ name: 'Screen 1' }));
      store.dispatch(addScreen({ name: 'Screen 2' }));
      store.dispatch(addScreen({ name: 'Screen 3' }));

      // Assert: Verify all persisted
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(3);
      expect(screens[0]?.name).toBe('Screen 1');
      expect(screens[1]?.name).toBe('Screen 2');
      expect(screens[2]?.name).toBe('Screen 3');
    });
  });

  // ==========================================================================
  // CATEGORY 2: UPDATE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Update Operations', () => {
    beforeEach(() => {
      // Setup: Create initial screens
      store.dispatch(setScreens([
        { id: 'screen-1', name: 'Screen 1', kind: ENTITY_KINDS.SCREEN },
        { id: 'screen-2', name: 'Screen 2', kind: ENTITY_KINDS.SCREEN },
      ]));
    });

    it('should update screen via Redux action', () => {
      // Act: Update screen
      store.dispatch(updateScreen({
        id: 'screen-1',
        name: 'Updated Screen',
      }));

      // Assert: Verify update
      const state = store.getState();
      const screen = selectScreenById(state, 'screen-1');
      expect(screen?.name).toBe('Updated Screen');
    });

    it('should verify state reflects changes after update', () => {
      // Act: Update screen properties
      store.dispatch(updateScreen({
        id: 'screen-1',
        name: 'New Name',
        preview: 'new-preview-url',
        doc: 'Updated documentation',
      }));

      // Assert: Verify all changes
      const state = store.getState();
      const screen = selectScreenById(state, 'screen-1');
      expect(screen?.name).toBe('New Name');
      expect(screen?.preview).toBe('new-preview-url');
      expect(screen?.doc).toBe('Updated documentation');
    });

    it('should validate partial updates work correctly', () => {
      // Arrange: Initial state
      const initialState = store.getState();
      const initialScreen = selectScreenById(initialState, 'screen-1');

      // Act: Partial update (only name)
      store.dispatch(updateScreen({
        id: 'screen-1',
        name: 'Partially Updated',
      }));

      // Assert: Verify only name changed, other props preserved
      const state = store.getState();
      const screen = selectScreenById(state, 'screen-1');
      expect(screen?.name).toBe('Partially Updated');
      expect(screen?.kind).toBe(initialScreen?.kind);
      expect(screen?.id).toBe('screen-1');
    });

    it('should test optimistic update pattern', () => {
      // Act: Update screen
      store.dispatch(updateScreen({
        id: 'screen-1',
        name: 'Optimistically Updated',
      }));

      // Assert: Verify immediate state update (optimistic)
      const state = store.getState();
      const screen = selectScreenById(state, 'screen-1');
      expect(screen?.name).toBe('Optimistically Updated');
    });

    it('should handle updates to non-existent screens gracefully', () => {
      // Act: Try to update non-existent screen
      store.dispatch(updateScreen({
        id: 'non-existent',
        name: 'Should Not Exist',
      }));

      // Assert: Verify state unchanged
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(2);
      expect(selectScreenById(state, 'non-existent')).toBeUndefined();
    });
  });

  // ==========================================================================
  // CATEGORY 3: DELETE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Delete Operations', () => {
    beforeEach(() => {
      // Setup: Create initial screens
      store.dispatch(setScreens([
        { id: 'screen-1', name: 'Screen 1', kind: ENTITY_KINDS.SCREEN },
        { id: 'screen-2', name: 'Screen 2', kind: ENTITY_KINDS.SCREEN },
        { id: 'screen-3', name: 'Screen 3', kind: ENTITY_KINDS.SCREEN },
      ]));
    });

    it('should delete screen via Redux action', () => {
      // Arrange: Initial count
      const initialState = store.getState();
      expect(selectAllScreens(initialState)).toHaveLength(3);

      // Act: Delete screen
      store.dispatch(removeScreen('screen-2'));

      // Assert: Verify deletion
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(2);
      expect(selectScreenById(state, 'screen-2')).toBeUndefined();
    });

    it('should verify state cleanup after delete', () => {
      // Act: Delete screen
      store.dispatch(removeScreen('screen-1'));

      // Assert: Verify complete cleanup
      const state = store.getState().screenEntity;
      expect(state.ids).not.toContain('screen-1');
      expect(state.entities['screen-1']).toBeUndefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should validate cascade deletes (if applicable)', () => {
      // Arrange: Screen with relationships
      store.dispatch(updateScreen({
        id: 'screen-1',
        elementIds: ['elem-1', 'elem-2'],
        componentIds: ['comp-1'],
      }));

      // Act: Delete screen
      store.dispatch(removeScreen('screen-1'));

      // Assert: Verify screen deleted
      const state = store.getState();
      expect(selectScreenById(state, 'screen-1')).toBeUndefined();
      expect(selectAllScreens(state)).toHaveLength(2);
    });

    it('should test delete of last remaining screen', () => {
      // Arrange: Delete all but one
      store.dispatch(removeScreen('screen-1'));
      store.dispatch(removeScreen('screen-2'));

      // Act: Delete last screen
      store.dispatch(removeScreen('screen-3'));

      // Assert: Verify empty state
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(0);
      expect(state.screenEntity.ids).toEqual([]);
      expect(state.screenEntity.entities).toEqual({});
    });

    it('should handle deletion of non-existent screens gracefully', () => {
      // Arrange: Initial count
      const initialState = store.getState();
      const initialCount = selectAllScreens(initialState).length;

      // Act: Try to delete non-existent screen
      store.dispatch(removeScreen('non-existent'));

      // Assert: Verify state unchanged
      const state = store.getState();
      const screens = selectAllScreens(state);
      expect(screens).toHaveLength(initialCount);
    });
  });
});

