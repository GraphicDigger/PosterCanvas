import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const actorAgentEntitySlice = createSlice({
  name: 'actorAgentEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setActorAgents,

  setHoveredActorAgentId,
  setFocusedActorAgentId,
  setSelectedActorAgentId,

  addActorAgent,
  updateActorAgent,
  removeActorAgent,

} = actorAgentEntitySlice.actions;

export default actorAgentEntitySlice.reducer;
