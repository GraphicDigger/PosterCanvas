import { tokenAdapter } from './slice';


export const actionsQueries = {

  setTokens: (state, action) => {
    tokenAdapter.setAll(state, action.payload);
  },

};
