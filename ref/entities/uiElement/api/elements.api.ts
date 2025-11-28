import { elements } from './elements.data';

export const elementApi = {
  getElements: () => {
    return Promise.resolve(elements);
  },

  getElementById: (id) => {
    const element = elements.find(element => element.id === id);
    return Promise.resolve(element);
  },
};
