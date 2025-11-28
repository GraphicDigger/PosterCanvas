import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
  ui: {
    hoveredComponentId: null,
    focusedComponentId: null,
    selectedComponentId: null,
  },
};

const componentEntitySlice = createSlice({
  name: 'componentEntity',
  initialState,
  reducers: {
    setHoveredComponentId: (state, action) => {
      state.ui.hoveredComponentId = action.payload;
    },
    setFocusedComponentId: (state, action) => {
      state.ui.focusedComponentId = action.payload;
    },
    setSelectedComponentId: (state, action) => {
      state.ui.selectedComponentId = action.payload;
      console.log('[store] selectedComponentId', state.ui.selectedComponentId);
    },
    resetSelectedComponent: (state) => {
      state.ui.selectedComponentId = null;
    },
    setComponents: (state, action) => {
      const components = action.payload;
      state.entities = {};
      state.ids = [];
      components.forEach(component => {
        state.entities[component.id] = component;
        state.ids.push(component.id);
      });
    },
    addComponent: (state, action) => {
      const component = action.payload;
      if (!state.entities[component.id]) {
        state.entities[component.id] = component;
        state.ids.push(component.id);
      } else {
        state.entities[component.id] = {
          ...state.entities[component.id],
          ...component,
        };
      }
    },
    updateComponent: (state, action) => {
      const { id, ...updates } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = {
          ...state.entities[id],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    removeComponent: (state, action) => {
      const componentId = action.payload;
      if (state.entities[componentId]) {
        delete state.entities[componentId];
        state.ids = state.ids.filter(id => id !== componentId);

        if (state.ui.selectedComponentId === componentId) {
          state.ui.selectedComponentId = null;
        }
      }
    },
  },
});

export const {
  setFocusedComponentId,
  setHoveredComponentId,
  setSelectedComponentId,
  resetSelectedComponent,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} = componentEntitySlice.actions;

export default componentEntitySlice.reducer;
