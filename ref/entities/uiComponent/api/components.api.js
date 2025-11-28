import { components } from './components.data';

export const componentApi = {
  getComponents: () => components,
  getComponentById: (id) => components.find(component => component.id === id) || null,
};
