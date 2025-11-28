import { tokenValueAdapter } from './slice';

export const actionsQueries = {

  setTokenValues: (state, action) => {
    tokenValueAdapter.setAll(state, action.payload);
  },
};
