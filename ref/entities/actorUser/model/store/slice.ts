import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { UserState, User } from '../../types';

export const userAdapter = createEntityAdapter<User>({});

export const initialEntities = userAdapter.getInitialState();

const initialState: UserState = {
  ...initialEntities,
  ...initialUIState,
};

const userEntitySlice = createSlice({
  name: 'userEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setUsers,

  setHoveredUserId,
  setFocusedUserId,
  setSelectedUserId,
  resetSelectedUser,

  addUser,
  updateUser,
  removeUser,

} = userEntitySlice.actions;

export default userEntitySlice.reducer;
