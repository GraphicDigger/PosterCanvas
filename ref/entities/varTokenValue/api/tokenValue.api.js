import { tokenValues } from './tokenValue.data.js';

export const tokenValueApi = {
  getTokenValues: async () => {
    return tokenValues;
  },

};
