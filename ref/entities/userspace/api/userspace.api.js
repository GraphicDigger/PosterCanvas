import { userspaces } from './userspace.data.js';

export const userspaceApi = {
  getUserspaces: async () => {
    return userspaces;
  },

};
