// UI Component Redux Slice Tests - TypeScript version
import { configureStore } from '@reduxjs/toolkit';
import componentReducer, {
  setHoveredComponentId,
  setFocusedComponentId,
  setSelectedComponentId,
  resetSelectedComponent,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} from './slice';
import { Component } from '../../types';
import { ENTITY_KINDS } from '../../../../shared/constants';

const mockComponents: Component[] = [
  {
    id: 'component-1',
    name: 'Button Component',
    kind: ENTITY_KINDS.COMPONENT,
    artboard: {
      width: '100px',
      height: '40px',
      backgroundColor: '#007bff',
    },
  },
  {
    id: 'component-2',
    name: 'Icon Component',
    kind: ENTITY_KINDS.COMPONENT,
  },
];

describe('componentEntitySlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        componentEntity: componentReducer,
      },
    });
  });

  it('should return the initial state', () => {
    const state = store.getState().componentEntity;
    expect(state.ids).toEqual([]);
    expect(state.entities).toEqual({});
    expect(state.ui.hoveredComponentId).toBeNull();
    expect(state.ui.focusedComponentId).toBeNull();
    expect(state.ui.selectedComponentId).toBeNull();
  });

  it('should handle setHoveredComponentId', () => {
    store.dispatch(setHoveredComponentId('component-1'));
    const state = store.getState().componentEntity;
    expect(state.ui.hoveredComponentId).toBe('component-1');
  });

  it('should handle setFocusedComponentId', () => {
    store.dispatch(setFocusedComponentId('component-1'));
    const state = store.getState().componentEntity;
    expect(state.ui.focusedComponentId).toBe('component-1');
  });

  it('should handle setSelectedComponentId', () => {
    store.dispatch(setSelectedComponentId('component-1'));
    const state = store.getState().componentEntity;
    expect(state.ui.selectedComponentId).toBe('component-1');
  });

  it('should handle resetSelectedComponent', () => {
    store.dispatch(setSelectedComponentId('component-1'));
    store.dispatch(resetSelectedComponent());
    const state = store.getState().componentEntity;
    expect(state.ui.selectedComponentId).toBeNull();
  });

  it('should handle setComponents', () => {
    store.dispatch(setComponents(mockComponents));
    const state = store.getState().componentEntity;
    expect(state.ids).toEqual(['component-1', 'component-2']);
    expect(state.entities['component-1'].name).toBe('Button Component');
    expect(state.entities['component-2'].name).toBe('Icon Component');
  });

  it('should handle addComponent', () => {
    const newComponent: Component = {
      id: 'component-3',
      name: 'New Component',
      kind: ENTITY_KINDS.COMPONENT,
    };

    store.dispatch(addComponent(newComponent));
    const state = store.getState().componentEntity;
    expect(state.ids).toContain('component-3');
    expect(state.entities['component-3'].name).toBe('New Component');
  });

  it('should handle updateComponent', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(updateComponent({
      id: 'component-1',
      name: 'Updated Button Component',
    }));

    const state = store.getState().componentEntity;
    expect(state.entities['component-1'].name).toBe('Updated Button Component');
    expect(state.entities['component-1'].updatedAt).toBeDefined();
  });

  it('should handle removeComponent', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(removeComponent('component-1'));

    const state = store.getState().componentEntity;
    expect(state.ids).not.toContain('component-1');
    expect(state.entities['component-1']).toBeUndefined();
  });

  it('should clear selectedComponentId when removing selected component', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(setSelectedComponentId('component-1'));
    store.dispatch(removeComponent('component-1'));

    const state = store.getState().componentEntity;
    expect(state.ui.selectedComponentId).toBeNull();
  });
});
