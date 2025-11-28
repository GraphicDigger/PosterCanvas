import type { DefaultElementsState, DefaultElement } from '../../types';
import { defaultElementsAdapter } from './slice';

export const actionsQueries = {
  setDefaultElements: (state: DefaultElementsState, action: { payload: DefaultElement[] }) => {
    defaultElementsAdapter.setAll(state, action.payload);
  },
};
