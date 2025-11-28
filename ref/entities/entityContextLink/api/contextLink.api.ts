import { contextLinks } from './contextLink.data';
import type { ContextLink } from '../types';

interface ContextLinkApi {
    getContextLinks: () => Promise<ContextLink[]>;
}

export const contextLinkApi: ContextLinkApi = {
  getContextLinks: async () => {
    await new Promise(res => setTimeout(res, 100));
    return contextLinks;
  },
};
