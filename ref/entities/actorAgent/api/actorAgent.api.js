import { actorAgents } from './actorAgent.data.js';

export const actorAgentApi = {
  getActorAgents: async () => {
    return actorAgents;
  },

};
