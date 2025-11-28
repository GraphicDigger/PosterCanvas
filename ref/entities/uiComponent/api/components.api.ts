// UI Component API - TypeScript version
import { components } from './components.data';
import { Component, ComponentApiResponse } from '../types';

export const componentApi = {
  getComponents: async (): Promise<ComponentApiResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          components: components,
        });
      }, 300);
    });
  },

  getComponentById: async (id: string): Promise<Component | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const component = components.find(comp => comp.id === id);
        resolve(component || null);
      }, 100);
    });
  },

  createComponent: async (component: Omit<Component, 'id'>): Promise<Component> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newComponent: Component = {
          ...component,
          id: `component-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(newComponent);
      }, 200);
    });
  },

  updateComponent: async (id: string, updates: Partial<Component>): Promise<Component | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const component = components.find(comp => comp.id === id);
        if (component) {
          const updatedComponent = {
            ...component,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          resolve(updatedComponent);
        } else {
          resolve(null);
        }
      }, 200);
    });
  },

  deleteComponent: async (id: string): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = components.findIndex(comp => comp.id === id);
        if (index !== -1) {
          components.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 200);
    });
  },
};
