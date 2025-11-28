import { taskAssignees } from './taskAssignee.data';
import type { TaskAssignee } from '../types';

interface TaskAssigneeApi {
    getTaskAssignees: () => Promise<TaskAssignee[]>;
}

export const taskAssigneeApi: TaskAssigneeApi = {
  getTaskAssignees: async () => {
    await new Promise(res => setTimeout(res, 100));
    return taskAssignees;
  },
};
