import type { ContextLinkState, ContextLink } from '../../types';
import { contextLinkAdapter } from './slice';

export const actionsQueries = {
  setContextLinks: (state: ContextLinkState, action: { payload: ContextLink[] }) => {
    contextLinkAdapter.setAll(state, action.payload);
  },
};
