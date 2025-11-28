// Integration Tests - uiScreen TypeScript Migration
import { configureStore } from '@reduxjs/toolkit';
import screenEntityReducer from './model/store/slice';
import {
  setScreens,
  addScreen,
  updateScreen,
  removeScreen,
  setFocusedScreenId,
  setSelectedScreenId,
  setScreenViewType,
  toggleScreenViewType,
} from './model/store/slice';
import {
  selectAllScreens,
  selectScreenById,
  selectScreenCount,
  selectSelectedScreen,
  selectFocusedScreenId,
  selectSelectedScreenId,
  selectScreenViewType,
  selectScreensByKind,
  selectScreensWithPreview,
  selectScreensWithDocumentation,
} from './model/store/selector';
import type { ScreenEntity } from './types';

// Mock screen data
const mockScreens: ScreenEntity[] = [
  {
    id: 'screen-1',
    name: 'Home Screen',
    kind: 'SCREEN',
    preview: 'home-preview-url',
    doc: 'Home screen documentation',
    componentIds: ['comp-1', 'comp-2'],
    elementIds: ['elem-1', 'elem-2'],
    codesIds: ['code-1'],
    wireframeBlockIds: ['block-1'],
  },
  {
    id: 'screen-2',
    name: 'About Screen',
    kind: 'SCREEN',
    preview: 'about-preview-url',
    doc: 'About screen documentation',
    componentIds: ['comp-3'],
    elementIds: ['elem-3', 'elem-4'],
    codesIds: ['code-2'],
    wireframeBlockIds: ['block-2', 'block-3'],
  },
  {
    id: 'screen-3',
    name: 'Contact Screen',
    kind: 'SCREEN',
    // No preview or doc for this screen
    componentIds: ['comp-4'],
    elementIds: ['elem-5'],
    codesIds: ['code-3'],
    wireframeBlockIds: ['block-4'],
  },
];

describe('uiScreen Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        screenEntity: screenEntityReducer,
      },
    });
  });

  describe('Screen Management Integration', () => {
    it('should handle complete screen lifecycle', () => {
      // Initial state
      let state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(0);

      // Set screens
      store.dispatch(setScreens({ screens: mockScreens }));
      state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(3);

      // Add new screen
      store.dispatch(addScreen({
        name: 'New Screen',
        preview: 'new-preview-url',
        doc: 'New screen documentation',
      }));

      state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(4);

      // Update screen
      const screenToUpdate = selectAllScreens(state)[0];
      store.dispatch(updateScreen({
        id: screenToUpdate.id,
        name: 'Updated Screen Name',
        doc: 'Updated documentation',
      }));

      state = store.getState();
      const updatedScreen = selectScreenById(state, screenToUpdate.id);
      expect(updatedScreen?.name).toBe('Updated Screen Name');
      expect(updatedScreen?.doc).toBe('Updated documentation');

      // Remove screen
      const screenToRemove = selectAllScreens(state)[0];
      store.dispatch(removeScreen(screenToRemove.id));

      state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(3);
      expect(selectScreenById(state, screenToRemove.id)).toBeUndefined();
    });

    it('should handle screen selection and focus', () => {
      // Set up screens
      store.dispatch(setScreens({ screens: mockScreens }));

      // Set focused screen
      store.dispatch(setFocusedScreenId('screen-1'));
      let state = store.getState();
      expect(selectFocusedScreenId(state)).toBe('screen-1');

      // Set selected screen
      store.dispatch(setSelectedScreenId('screen-2'));
      state = store.getState();
      expect(selectSelectedScreenId(state)).toBe('screen-2');

      // Verify selected screen
      const selectedScreen = selectSelectedScreen(state);
      expect(selectedScreen?.id).toBe('screen-2');
      expect(selectedScreen?.name).toBe('About Screen');
    });

    it('should handle view type changes', () => {
      // Initial view type
      let state = store.getState();
      expect(selectScreenViewType(state)).toBe('wireframe');

      // Set view type
      store.dispatch(setScreenViewType('preview'));
      state = store.getState();
      expect(selectScreenViewType(state)).toBe('preview');

      // Toggle view type
      store.dispatch(toggleScreenViewType());
      state = store.getState();
      expect(selectScreenViewType(state)).toBe('wireframe');
    });
  });

  describe('Selector Integration', () => {
    beforeEach(() => {
      store.dispatch(setScreens({ screens: mockScreens }));
    });

    it('should correctly filter screens by kind', () => {
      const state = store.getState();
      const screensByKind = selectScreensByKind(state);

      expect(screensByKind['SCREEN']).toHaveLength(3);
      expect(screensByKind['SCREEN'][0].kind).toBe('SCREEN');
    });

    it('should correctly filter screens with preview', () => {
      const state = store.getState();
      const screensWithPreview = selectScreensWithPreview(state);

      expect(screensWithPreview).toHaveLength(2);
      expect(screensWithPreview.every(screen => screen.preview)).toBe(true);
    });

    it('should correctly filter screens with documentation', () => {
      const state = store.getState();
      const screensWithDoc = selectScreensWithDocumentation(state);

      expect(screensWithDoc).toHaveLength(2);
      expect(screensWithDoc.every(screen => screen.doc)).toBe(true);
    });

    it('should handle screen selection by ID', () => {
      const state = store.getState();
      const screen = selectScreenById(state, 'screen-1');

      expect(screen).toBeDefined();
      expect(screen?.name).toBe('Home Screen');
    });

    it('should return undefined for non-existent screen', () => {
      const state = store.getState();
      const screen = selectScreenById(state, 'non-existent');

      expect(screen).toBeUndefined();
    });
  });

  describe('Type Safety Integration', () => {
    it('should maintain type safety across all operations', () => {
      // This test ensures TypeScript compilation succeeds
      const state = store.getState();

      // All selectors should return properly typed values
      const allScreens = selectAllScreens(state);
      const screenCount = selectScreenCount(state);
      const focusedScreenId = selectFocusedScreenId(state);
      const selectedScreenId = selectSelectedScreenId(state);
      const viewType = selectScreenViewType(state);

      // Type assertions to ensure proper typing
      expect(Array.isArray(allScreens)).toBe(true);
      expect(typeof screenCount).toBe('number');
      expect(typeof focusedScreenId === 'string' || focusedScreenId === null).toBe(true);
      expect(typeof selectedScreenId === 'string' || selectedScreenId === null).toBe(true);
      expect(typeof viewType).toBe('string');
    });

    it('should handle complex screen operations with type safety', () => {
      // Set up complex screen
      const complexScreen: ScreenEntity = {
        id: 'complex-screen',
        name: 'Complex Screen',
        kind: 'SCREEN',
        preview: 'complex-preview-url',
        doc: 'Complex screen documentation',
        componentIds: ['comp-1', 'comp-2', 'comp-3'],
        elementIds: ['elem-1', 'elem-2', 'elem-3', 'elem-4'],
        codesIds: ['code-1', 'code-2'],
        wireframeBlockIds: ['block-1', 'block-2', 'block-3'],
      };

      store.dispatch(setScreens({ screens: [complexScreen] }));
      store.dispatch(setSelectedScreenId('complex-screen'));

      const state = store.getState();
      const selectedScreen = selectSelectedScreen(state);

      if (selectedScreen) {
        // Type-safe property access
        expect(selectedScreen.componentIds).toHaveLength(3);
        expect(selectedScreen.elementIds).toHaveLength(4);
        expect(selectedScreen.codesIds).toHaveLength(2);
        expect(selectedScreen.wireframeBlockIds).toHaveLength(3);

        // Type-safe array operations
        const componentCount = selectedScreen.componentIds?.length || 0;
        const elementCount = selectedScreen.elementIds?.length || 0;
        expect(componentCount).toBe(3);
        expect(elementCount).toBe(4);
      }
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle malformed screen data gracefully', () => {
      const malformedScreens = [
        {
          id: 'malformed-screen',
          name: 'Malformed Screen',
          // Missing required fields
        },
      ] as any;

      // This should not crash the application
      expect(() => {
        store.dispatch(setScreens({ screens: malformedScreens }));
      }).not.toThrow();
    });

    it('should handle empty screen responses', () => {
      store.dispatch(setScreens({ screens: [] }));

      const state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(0);
      expect(selectScreenCount(state)).toBe(0);
    });

    it('should handle null/undefined screen operations', () => {
      // Set up screens
      store.dispatch(setScreens({ screens: mockScreens }));

      // Try to update non-existent screen
      store.dispatch(updateScreen({
        id: 'non-existent',
        name: 'Updated Name',
      }));

      // Try to remove non-existent screen
      store.dispatch(removeScreen({ id: 'non-existent' }));

      // State should remain unchanged
      const state = store.getState();
      expect(selectAllScreens(state)).toHaveLength(3);
    });
  });
});
