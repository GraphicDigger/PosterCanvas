import { actorRoles } from './actorRole.data.js';

export const actorRoleApi = {
  getActorRoles: async () => {
    return actorRoles;
  },

};
