
export const initialQuery = {
  ids: [],
  entities: {},
};


export const actionsQuery = {

  setPresets: (state, action) => {
    const presets = action.payload;
    state.ids = presets.map(preset => preset.id);
    state.entities = presets.reduce((acc, preset) => {
      acc[preset.id] = preset;
      return acc;
    }, {});
  },

};
