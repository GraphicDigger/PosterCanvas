
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setPresetModeValues: (state, action) => {
    const presetModeValues = action.payload;
    state.ids = presetModeValues.map(role => role.id);
    state.entities = presetModeValues.reduce((acc, presetModeValue) => {
      acc[presetModeValue.id] = presetModeValue;
      return acc;
    }, {});
  },
};
