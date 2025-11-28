import { actorPositions } from './actorPosition.data.js';

export const actorPositionApi = {
  getActorPositions: async () => {
    return actorPositions;
  },

};
