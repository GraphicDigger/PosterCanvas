import { ownershipManager } from '../../lib/ownershipManager';

export const initialInstanceData = {
  ids: [],
  entities: {},
  ownership: {},
};

export const actionsInstanceData = {
  setInstances: (state, action) => {
    const instances = action.payload;
    state.entities = instances.reduce((acc, instance) => {
      acc[instance.id] = instance;
      return acc;
    }, {});
    state.ids = instances.map(instance => instance.id);

    // update ownership
    ownershipManager.clearOwnerships(state);
    instances.forEach(instance => {
      ownershipManager.addOwnership(state, instance);
    });
  },

};
