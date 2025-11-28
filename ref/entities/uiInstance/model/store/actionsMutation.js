

export const actionsInstanceMutation = {

  updateInstance: (state, action) => {
    const { id, ...changes } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = {
        ...state.entities[id],
        ...changes,
      };
    }
  },

  updateInstanceStyle: (state, action) => {
    const { id, style } = action.payload;
    const instance = state.entities[id];
    if (!instance) {return;}
    if (!instance.properties) {instance.properties = {};}
    if (!instance.properties.style) {instance.properties.style = {};}

    state.entities[id] = {
      ...instance,
      properties: {
        ...instance.properties,
        style: {
          ...instance.properties?.style,
          ...style,
        },
      },
    };
  },

  updateInstanceProp: (state, action) => {
    const { instanceId, propId, updates } = action.payload;

    const instance = state.entities[instanceId];

    if (!instance) {return;}
    if (!instance.override) {instance.override = {};}
    if (!instance.override.props) {instance.override.props = {};}
    if (!instance.override.props[propId]) {instance.override.props[propId] = {};}

    instance.override.props[propId] = {
      ...instance.override.props[propId],
      ...updates,
    };
  },


};
