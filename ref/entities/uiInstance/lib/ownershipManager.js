export const ownershipManager = {
  addOwnership(state, instance) {
    const { type, ...ownerData } = instance.ownership;
    const ownerId = Object.values(ownerData)[0];

    if (!state.ownership[type]) {
      state.ownership[type] = {};
    }

    if (!state.ownership[type][ownerId]) {
      state.ownership[type][ownerId] = [];
    }

    if (!state.ownership[type][ownerId].includes(instance.id)) {
      state.ownership[type][ownerId].push(instance.id);
    }
  },

  removeOwnership(state, instance) {
    const { type, ...ownerData } = instance.ownership;
    const ownerId = Object.values(ownerData)[0];

    if (state.ownership[type]?.[ownerId]) {
      state.ownership[type][ownerId] = state.ownership[type][ownerId]
        .filter(id => id !== instance.id);
    }
  },

  clearOwnerships(state) {
    state.ownership = {};
  },
};
