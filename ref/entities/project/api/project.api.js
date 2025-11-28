import { projects } from './project.data.js';

export const projectApi = {
  getProjects: async () => {
    return projects;
  },

};
