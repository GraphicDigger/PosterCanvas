import { ownershipManager } from '../../lib/helpers/ownershipManager';

export const initialElementQuery = {
  ids: [],
  entities: {},
  ownership: {},
};

export const actionsElementQuery = {
  setElements: (state, action) => {
    state.ids = [];
    state.entities = {};
    ownershipManager.clearOwnerships(state);

    action.payload.forEach(element => {
      state.entities[element.id] = element;
      state.ids.push(element.id);
      ownershipManager.addOwnership(state, element);
    });
  },
};
