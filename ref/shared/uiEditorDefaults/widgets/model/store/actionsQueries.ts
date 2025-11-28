import type { UiDefaultEntityState, UiDefaultEntity } from '../../types';
import { defaultWidgetsAdapter } from './slice';

export const actionsQueries = {
  setDefaultWidgets: (state: UiDefaultEntityState, action: { payload: UiDefaultEntity[] }) => {
    defaultWidgetsAdapter.setAll(state, action.payload);
  },
};
