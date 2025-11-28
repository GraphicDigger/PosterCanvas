export const initialWireframeBlockData = {
  entities: {},
  ids: [],
};

export const actionsWireframeBlockData = {
  setWireframeBlocks: (state, action) => {
    const wireframeBlocks = action.payload;
    state.entities = wireframeBlocks.reduce((acc, wireframeBlock) => {
      acc[wireframeBlock.id] = wireframeBlock;
      return acc;
    }, {});
    state.ids = wireframeBlocks.map(wireframeBlock => wireframeBlock.id);
  },

  addWireframeBlock: (state, action) => {
    const wireframeBlock = action.payload;
    state.entities[wireframeBlock.id] = wireframeBlock;
    state.ids.push(wireframeBlock.id);
  },

  updateWireframeBlock: (state, action) => {
    const { id, changes } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = {
        ...state.entities[id],
        ...changes,
      };
      // console.log('updateWireframeBlock', state.entities[id]);
    }
  },

  removeWireframeBlock: (state, action) => {
    const id = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(blockId => blockId !== id);
  },
};
