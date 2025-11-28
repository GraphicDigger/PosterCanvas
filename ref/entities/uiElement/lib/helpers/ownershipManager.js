export const ownershipManager = {
  addOwnership(state, element) {
    const { type, ...ownerData } = element.ownership;
    const ownerId = Object.values(ownerData)[0];

    if (!state.ownership[type]) {
      state.ownership[type] = {};
    }

    if (!state.ownership[type][ownerId]) {
      state.ownership[type][ownerId] = [];
    }

    if (!state.ownership[type][ownerId].includes(element.id)) {
      state.ownership[type][ownerId].push(element.id);
    }
  },

  removeOwnership(state, element) {
    const { type, ...ownerData } = element.ownership;
    const ownerId = Object.values(ownerData)[0];

    if (state.ownership[type]?.[ownerId]) {
      state.ownership[type][ownerId] = state.ownership[type][ownerId]
        .filter(id => id !== element.id);
    }
  },

  clearOwnerships(state) {
    state.ownership = {};
  },
};
