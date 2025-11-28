import { workspaces } from './workspace.data.js';

export const workspaceApi = {
  getWorkspaces: async () => {
    return workspaces;
  },

};
