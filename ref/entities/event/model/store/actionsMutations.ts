export const actionsMutation = {

  addEvent: (state, action) => {
    const event = action.payload;
    if (!state.entities[event.id]) {
      state.ids.push(event.id);
      state.entities[event.id] = event;
    }
  },
};
