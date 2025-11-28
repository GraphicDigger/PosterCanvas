export const actionsMutation = {

  addPreset: (state, action) => {
    const preset = action.payload;

    if (!preset.collectionId) {return;}

    state.entities[preset.id] = {
      ...preset,
    };
    state.ids.push(preset.id);
  },

  updatePreset: (state, action) => {
    const { id, updates } = action.payload;
    if (updates.collectionId === undefined && !state.entities[id]?.collectionId) {return;}
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...updates };
    }
  },
  removePreset: (state, action) => {
    const id = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(presetId => presetId !== id);
  },
  removePresetsFromCollection: (state, action) => {
    const collectionId = action.payload;
    state.ids = state.ids.filter(presetId => state.entities[presetId].collectionId !== collectionId);
    state.entities = Object.fromEntries(
      Object.entries(state.entities).filter(([_, preset]) => preset.collectionId !== collectionId),
    );
    // console.log('[removePresetsFromCollection] state.entities', JSON.stringify(state.entities, null, 2))
  },
  // movePresetToCollection: (state, action) => {
  //     const { presetId, collectionId } = action.payload;
  //     if (state.entities[presetId]) {
  //         state.entities[presetId].collectionId = collectionId;
  //     }
  // }
};
