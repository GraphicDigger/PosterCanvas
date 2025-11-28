import type { TaskAssignee } from '../types';

export const taskAssignees: TaskAssignee[] = [
  {
    id: 'id-taskAssignee-1',
    memberId: 'id-user-1-member-1-workspace-1',
    taskId: 'id-workspace-1-project-1-task-1',
  },
  // {
  //     id: 'id-taskAssignee-2',
  //     memberId: 'id-user-1-member-1-workspace-1',
  //     taskId: 'id-workspace-1-project-1-task-2',
  // },
  {
    id: 'id-taskAssignee-3',
    memberId: 'id-user-1-member-2-workspace-2',
    taskId: 'id-workspace-2-project-4-task-5',
  },
  {
    id: 'id-taskAssignee-4',
    memberId: 'id-user-2-member-1-workspace-2',
    taskId: 'id-workspace-2-project-4-task-5',
  },

];
