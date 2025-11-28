import { CrmMemberListMock } from '../../ui/mockScreens/CrmMemberListMock';
import { CrmTaskManagerMock } from '../../ui/mockScreens/CrmTaskManagerMock';


export const screenMap = [
  {
    id: 'crm-member-list',
    name: 'Members',
    component: CrmMemberListMock,
  },
  {
    id: 'crm-task-manager',
    name: 'Task Manager',
    component: CrmTaskManagerMock,
  },
];
