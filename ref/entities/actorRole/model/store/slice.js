import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const actorRoleEntitySlice = createSlice({
  name: 'actorRoleEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setActorRoles,

  setHoveredActorRoleId,
  setFocusedActorRoleId,
  setSelectedActorRoleId,

  addActorRole,
  updateActorRoleName,
  updateActorRolePosition,
  removeActorRole,
  updateActorRoleAgentRoleId,
  updateActorRoleActorType,
  updateActorRolePrompt,

} = actorRoleEntitySlice.actions;

export default actorRoleEntitySlice.reducer;
