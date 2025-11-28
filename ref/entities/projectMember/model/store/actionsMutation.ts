import type { PayloadAction } from '@reduxjs/toolkit';
import { projectMemberAdapter } from './slice';
import type { ProjectMemberState, ProjectMember } from '../../types';

export const actionsMutation = {

  addProjectMember: (state: ProjectMemberState, action: PayloadAction<ProjectMember>) => {
    projectMemberAdapter.addOne(state, action.payload);
  },

  updateProjectMember: (state: ProjectMemberState, action: PayloadAction<ProjectMember>) => {
    projectMemberAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeProjectMember: (state: ProjectMemberState, action: PayloadAction<string>) => {
    projectMemberAdapter.removeOne(state, action.payload);
  },

};
