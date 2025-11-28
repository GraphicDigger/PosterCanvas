// UI Component Entity - TypeScript exports
export { default as componentEntityReducer } from './model/store/slice';
export { EComponent } from './ui/component/EComponent';

// Export types
export type {
  Component,
  ComponentState,
  ComponentUIState,
  ComponentCheckStates,
  SetComponentsPayload,
  AddComponentPayload,
  UpdateComponentPayload,
  RemoveComponentPayload,
  ComponentApiResponse,
} from './types';

// Export API functions
export { componentApi } from './api/components.api';

// Export selectors
export {
  selectAllComponents,
  selectComponentById,
  selectSelectedComponent,
  selectComponentCount,
  selectComponentNames,
  selectComponentsWithArtboard,
  selectHoveredComponentId,
  selectFocusedComponentId,
  selectSelectedComponentId,
  selectComponentCheckStates,
} from './model/store/selectors';

// Export actions
export {
  setHoveredComponentId,
  setFocusedComponentId,
  setSelectedComponentId,
  resetSelectedComponent,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} from './model/store/slice';

// Export data
export { components } from './api/components.data';
