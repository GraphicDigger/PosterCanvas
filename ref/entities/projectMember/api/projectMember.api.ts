import { projectMembers } from './projectMember.data';
import type { ProjectMember } from '../types';

interface ProjectMemberApi {
    getProjectMembers: () => Promise<ProjectMember[]>;
}

export const projectMemberApi: ProjectMemberApi = {
  getProjectMembers: async () => {
    await new Promise(res => setTimeout(res, 100));
    return projectMembers;
  },
};
