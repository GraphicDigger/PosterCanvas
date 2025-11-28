// Redux Slice Tests - TypeScript version
import screenEntityReducer, {
  setScreens,
  addScreen,
  updateScreen,
  removeScreen,
  setFocusedScreenId,
  setSelectedScreenId,
  setScreenViewType,
  toggleScreenViewType,
} from './slice';
import type { ScreenState, ScreenEntity } from './types';

describe('uiScreen Entity Redux Slice', () => {
  const initialState: ScreenState = screenEntityReducer(undefined, { type: '@@INIT' });

  const mockScreen: ScreenEntity = {
    id: 'screen-1',
    name: 'Test Screen',
    kind: 'SCREEN',
    preview: 'preview-url',
    doc: 'Screen documentation',
    componentIds: ['comp-1', 'comp-2'],
    elementIds: ['elem-1', 'elem-2'],
    codesIds: ['code-1'],
    wireframeBlockIds: ['block-1'],
  };

  it('should handle initial state', () => {
    expect(screenEntityReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setScreens action', () => {
    const action = setScreens({
      screens: [mockScreen],
    });

    const newState = screenEntityReducer(initialState, action);

    expect(newState.entities).toHaveProperty('screen-1');
    expect(newState.ids).toContain('screen-1');
    expect(newState.entities['screen-1']).toEqual(mockScreen);
  });

  it('should handle addScreen action', () => {
    const action = addScreen({
      name: 'New Screen',
      preview: 'new-preview-url',
      doc: 'New screen documentation',
    });

    const newState = screenEntityReducer(initialState, action);

    expect(newState.ids).toHaveLength(1);
    expect(Object.keys(newState.entities)).toHaveLength(1);

    const addedScreen = Object.values(newState.entities)[0];
    expect(addedScreen.name).toBe('New Screen');
    expect(addedScreen.preview).toBe('new-preview-url');
    expect(addedScreen.doc).toBe('New screen documentation');
  });

  it('should handle updateScreen action', () => {
    const stateWithScreen = {
      ...initialState,
      entities: { 'screen-1': mockScreen },
      ids: ['screen-1'],
    };

    const action = updateScreen({
      id: 'screen-1',
      name: 'Updated Screen Name',
      doc: 'Updated documentation',
    });

    const newState = screenEntityReducer(stateWithScreen, action);

    expect(newState.entities['screen-1'].name).toBe('Updated Screen Name');
    expect(newState.entities['screen-1'].doc).toBe('Updated documentation');
  });

  it('should handle removeScreen action', () => {
    const stateWithScreen = {
      ...initialState,
      entities: { 'screen-1': mockScreen },
      ids: ['screen-1'],
    };

    const action = removeScreen('screen-1');
    const newState = screenEntityReducer(stateWithScreen, action);

    expect(newState.entities).not.toHaveProperty('screen-1');
    expect(newState.ids).not.toContain('screen-1');
  });

  it('should handle setFocusedScreenId action', () => {
    const action = setFocusedScreenId('screen-1');
    const newState = screenEntityReducer(initialState, action);

    expect(newState.focusedScreenId).toBe('screen-1');
  });

  it('should handle setSelectedScreenId action', () => {
    const action = setSelectedScreenId('screen-1');
    const newState = screenEntityReducer(initialState, action);

    expect(newState.selectedScreenId).toBe('screen-1');
  });

  it('should handle setScreenViewType action', () => {
    const action = setScreenViewType('preview');
    const newState = screenEntityReducer(initialState, action);

    expect(newState.viewType).toBe('preview');
  });

  it('should handle toggleScreenViewType action', () => {
    const stateWithWireframe = {
      ...initialState,
      viewType: 'wireframe' as const,
    };

    const action = toggleScreenViewType();
    const newState = screenEntityReducer(stateWithWireframe, action);

    expect(newState.viewType).toBe('preview');
  });

  it('should maintain type safety throughout state updates', () => {
    const action = setScreens({
      screens: [mockScreen],
    });

    const newState = screenEntityReducer(initialState, action);

    // TypeScript should ensure these properties exist and are correctly typed
    expect(typeof newState.entities).toBe('object');
    expect(Array.isArray(newState.ids)).toBe(true);
    expect(typeof newState.focusedScreenId === 'string' || newState.focusedScreenId === null).toBe(true);
    expect(typeof newState.viewType).toBe('string');
  });

  it('should handle complex screen with all properties', () => {
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

    const action = setScreens({
      screens: [complexScreen],
    });

    const newState = screenEntityReducer(initialState, action);

    expect(newState.entities['complex-screen']).toEqual(complexScreen);
    expect(newState.entities['complex-screen'].componentIds).toHaveLength(3);
    expect(newState.entities['complex-screen'].elementIds).toHaveLength(4);
    expect(newState.entities['complex-screen'].codesIds).toHaveLength(2);
    expect(newState.entities['complex-screen'].wireframeBlockIds).toHaveLength(3);
  });
});
