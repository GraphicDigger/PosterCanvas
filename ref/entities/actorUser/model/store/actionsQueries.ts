import type { UserState, User } from '../../types';
import { userAdapter } from './slice';

export const actionsQueries = {
  setUsers: (state: UserState, action: { payload: User[] }) => {
    userAdapter.setAll(state, action.payload);
  },
};
