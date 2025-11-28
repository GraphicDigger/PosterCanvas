import { defaultElements } from './defaultElements.data';
import type { DefaultElement } from '../types';

interface DefaultElementsApi {
    getDefaultElements: () => Promise<DefaultElement[]>;
}

export const defaultElementsApi: DefaultElementsApi = {
  getDefaultElements: async () => {
    await new Promise(res => setTimeout(res, 100));
    return defaultElements as DefaultElement[];
  },
};
