import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { ProjectMemberState, ProjectMember } from '../../types';

export const projectMemberAdapter = createEntityAdapter<ProjectMember>({});

export const initialEntities = projectMemberAdapter.getInitialState();

const initialState: ProjectMemberState = {
  ...initialEntities,
  ...initialUIState,
};

const projectMemberEntitySlice = createSlice({
  name: 'projectMemberEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setProjectMembers,

  setHoveredProjectMemberId,
  setFocusedProjectMemberId,
  setSelectedProjectMemberId,
  resetSelectedProjectMember,

  addProjectMember,
  updateProjectMember,
  removeProjectMember,

} = projectMemberEntitySlice.actions;

export default projectMemberEntitySlice.reducer;
