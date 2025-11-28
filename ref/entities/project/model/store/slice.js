import { createSlice } from '@reduxjs/toolkit';
import { initialUIStates, actionsUIStates } from './actionUIState';
import { initialEntities, actionsQueries } from './actionQueries';
import { actionMutations } from './actionMutation';

const initialState = {
  entities: {},
  ids: [],
  ...initialUIStates,
  ...initialEntities,
  // searchFilter: {
  //     selectedProjectIds: [],
  //     includeComponents: false,
  //     includeElements: false,
  //     currentScreenOnly: false,
  // }
};

const projectEntitySlice = createSlice({
  name: 'projectEntity',
  initialState,
  reducers: {
    ...actionsUIStates,
    ...actionsQueries,
    ...actionMutations,

    // toggleProjectInSearch: (state, action) => {
    //     const projectId = action.payload;
    //     const index = state.searchFilter.selectedProjectIds.indexOf(projectId);

    //     if (index === -1) {
    //         state.searchFilter.selectedProjectIds.push(projectId);
    //     } else {
    //         state.searchFilter.selectedProjectIds.splice(index, 1);
    //     }
    // }
  },
});

export const {
  // UI состояния
  setHoveredProjectId,
  setFocusedProjectId,
  setSelectedProjectId,
  resetSelectedProjectId,

  setProjects,

  addProject,
  updateProject,
  removeProject,
  updateProjectSettings,
  updateProjectDatabaseType,
  updateProjectWorkspace,
  updateProjectStatus,

  // toggleProjectInSearch,
} = projectEntitySlice.actions;

export default projectEntitySlice.reducer;
