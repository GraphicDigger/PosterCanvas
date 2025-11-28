import type { Task } from '../types';
import { ENTITY_KINDS } from '@/shared/constants';

export const tasks: Task[] = [
  {
    id: 'id-workspace-1-project-1-task-1',
    kind: ENTITY_KINDS.TASK,
    projectId: 'id-workspace-1-project-1',
    status: 'inProgress',

    createdBy: 'id-user-1-member-1-workspace-1',
    createdAt: 'June 3, 2024',
    updatedAt: 'June 3, 2024',
    responsible: 'id-user-1-member-1-workspace-1',
    assigneeTo: ['id-user-2-member-1-workspace-2'],

    name: 'Develop functionality for adding new members to the team',
    description: 'Aurora description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    dueDate: 'June 3, 2024',
  },
  {
    id: 'id-workspace-1-project-1-task-2',
    kind: ENTITY_KINDS.TASK,
    projectId: 'id-workspace-1-project-1',
    status: 'inProgress',

    createdBy: 'id-user-1-member-1-workspace-1',
    createdAt: 'June 3, 2024',
    updatedAt: 'June 3, 2024',
    responsible: 'id-user-1-member-1-workspace-1',
    assigneeTo: ['id-user-2-member-1-workspace-2'],

    name: 'Add contact form',
    description: 'Aurora description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    dueDate: 'June 3, 2024',
  },
  {
    id: 'id-workspace-1-project-1-task-3',
    kind: ENTITY_KINDS.TASK,
    projectId: 'id-workspace-1-project-1',
    status: 'todo',

    createdBy: 'id-user-1-member-1-workspace-1',
    createdAt: 'June 3, 2024',
    updatedAt: 'June 3, 2024',
    responsible: 'id-user-1-member-1-workspace-1',
    assigneeTo: ['id-user-2-member-1-workspace-2'],

    name: 'Develop functionality for adding new members to the team',
    description: 'Aurora description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    dueDate: 'June 3, 2024',
  },
  {
    id: 'id-workspace-1-project-2-task-4',
    kind: ENTITY_KINDS.TASK,
    projectId: 'id-workspace-1-project-2',
    status: 'inProgress',

    createdBy: 'id-user-2-member-1-workspace-2',
    createdAt: 'June 3, 2024',
    updatedAt: 'June 3, 2024',
    responsible: 'id-user-2-member-1-workspace-2',
    assigneeTo: ['id-user-1-member-1-workspace-1'],

    name: 'Client notes feature',
    description: 'Nebula description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    dueDate: 'June 3, 2024',
  },
  {
    id: 'id-workspace-2-project-4-task-5',
    kind: ENTITY_KINDS.TASK,
    projectId: 'id-workspace-2-project-4',
    status: 'inProgress',

    createdBy: 'id-user-2-member-1-workspace-2',
    createdAt: 'June 3, 2024',
    updatedAt: 'June 3, 2024',
    responsible: 'id-user-2-member-1-workspace-2',
    assigneeTo: ['id-user-1-member-1-workspace-1'],

    name: 'Add customizable status tags to deals pipeline',
    description: 'Pulse description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    dueDate: 'June 3, 2024',
  },

];
