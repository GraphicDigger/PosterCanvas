import type { ProjectMemberState, ProjectMember } from '../../types';
import { projectMemberAdapter } from './slice';

export const actionsQueries = {
  setProjectMembers: (state: ProjectMemberState, action: { payload: ProjectMember[] }) => {
    projectMemberAdapter.setAll(state, action.payload);
  },
};
