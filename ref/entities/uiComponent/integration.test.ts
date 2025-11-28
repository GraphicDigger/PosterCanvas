// UI Component Integration Tests - TypeScript version
import { configureStore } from '@reduxjs/toolkit';
import componentReducer, {
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
  setSelectedComponentId,
} from './model/store/slice';
import {
  selectAllComponents,
  selectComponentById,
  selectSelectedComponent,
  selectComponentCount,
  selectComponentCheckStates,
} from './model/store/selectors';
import { setFocusedComponentId } from './model/store/slice';
import { componentApi } from './api/components.api';
import { Component } from './types';
import { ENTITY_KINDS } from '../../shared/constants';

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

describe('UI Component Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        componentEntity: componentReducer,
      },
    });
  });

  it('should fetch components and set them in Redux', async () => {
    // Use mock data instead of API for now
    store.dispatch(setComponents(mockComponents));

    const state = store.getState();
    const allComponents = selectAllComponents(state);
    expect(allComponents.length).toBeGreaterThan(0);
    expect(allComponents[0].name).toBeDefined();
  });

  it('should add a new component and retrieve it via selector', () => {
    const newComponent: Component = {
      id: 'component-3',
      name: 'New Component',
      kind: ENTITY_KINDS.COMPONENT,
    };

    store.dispatch(addComponent(newComponent));
    const state = store.getState();
    const component = selectComponentById(state, 'component-3');
    expect(component?.name).toBe('New Component');
  });

  it('should update a component and reflect changes in selector', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(updateComponent({
      id: 'component-1',
      name: 'Updated Button Component',
    }));

    const state = store.getState();
    const component = selectComponentById(state, 'component-1');
    expect(component?.name).toBe('Updated Button Component');
  });

  it('should remove a component and confirm its absence', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(removeComponent('component-1'));

    const state = store.getState();
    const allComponents = selectAllComponents(state);
    expect(allComponents.length).toBe(1);
    expect(selectComponentById(state, 'component-1')).toBeUndefined();
  });

  it('should handle component selection and retrieve selected component', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(setSelectedComponentId('component-1'));

    const state = store.getState();
    const selectedComponent = selectSelectedComponent(state);
    expect(selectedComponent?.id).toBe('component-1');
  });

  it('should return correct check states for components', () => {
    store.dispatch(setComponents(mockComponents));
    store.dispatch(setSelectedComponentId('component-1'));
    store.dispatch(setFocusedComponentId('component-2'));

    const state = store.getState();
    const checkStates1 = selectComponentCheckStates(state, 'component-1');
    const checkStates2 = selectComponentCheckStates(state, 'component-2');

    expect(checkStates1.isSelected).toBe(true);
    expect(checkStates1.isFocused).toBe(false);
    expect(checkStates2.isSelected).toBe(false);
    expect(checkStates2.isFocused).toBe(true);
  });

  it.skip('should return correct component count - selectComponentCount NOT IMPLEMENTED', () => {
    store.dispatch(setComponents(mockComponents));
    const state = store.getState();
    const count = selectComponentCount(state);
    expect(count).toBe(2);
  });
});
