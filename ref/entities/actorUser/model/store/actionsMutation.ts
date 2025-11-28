import type { PayloadAction } from '@reduxjs/toolkit';
import { userAdapter } from './slice';
import type { UserState, User } from '../../types';

export const actionsMutation = {

  addUser: (state: UserState, action: PayloadAction<User>) => {
    userAdapter.addOne(state, action.payload);
  },

  updateUser: (state: UserState, action: PayloadAction<User>) => {
    userAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeUser: (state: UserState, action: PayloadAction<string>) => {
    userAdapter.removeOne(state, action.payload);
  },

};
