import { ENTITY_KINDS } from '@/shared/constants';
import { EventType } from '@/shared/constants';
import type { Event } from '@/shared/types';

export const events: Event[] = [
  // Событие: Компонент создан
  {
    id: 'event_001',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.COMPONENT_CREATED_CODE,
    memberId: 'id-user-1-member-1-workspace-1',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      text: 'Created a Button component in the Alpha project',
      projectId: 'project_alpha',
    },
  },
  {
    id: 'event_002',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.COMPONENT_CREATED_NOCODE,
    memberId: 'id-user-2-member-1-workspace-2',
    approved: false,
    timestamp: 'Jun 21, 2025',
    payload: {
      text: 'Created a Button component in the Beta project',
      projectId: 'project_beta',
    },
  },
  {
    id: 'event_003',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.COMMENT_ADDED_NOCODE,
    memberId: 'id-user-3-member-1-workspace-3',
    approved: false,
    timestamp: 'Jun 21, 2025',
    payload: {
      comment: 'Consider extracting button styles to a separate styled component for better reusability and cleaner JSX structure.',
      projectId: 'project_alpha',
    },
  },
  {
    id: 'event_004',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.COMMENT_ADDED,
    memberId: 'id-user-4-member-1-workspace-4',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      taskTitle: 'Develop functionality for adding new members to the team Develop functionality for adding new members to the team',
      comment: 'We should consider breaking this task into smaller subtasks to improve tracking and responsibility assignment. Also, it might be useful to clarify the acceptance criteria.',
      projectId: 'project_alpha',
    },
  },
  // Событие: Задача создана
  {
    id: 'event_005',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.TASK_CREATED,
    memberId: 'id-user-5-member-1-workspace-5',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Add contact form',
      projectId: 'project_beta',
      assigneeId: 'id-member-01', // ID назначенного исполнителя
      dueDate: '2024-04-10',
    },
  },
  {
    id: 'event_006',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.TASK_CREATED,
    memberId: 'id-member-01',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Develop functionality for adding new members to the team',
      projectId: 'project_gamma',
      assigneeId: 'id-member-03',
      dueDate: '2024-03-28',
    },
  },
  {
    id: 'event_007',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.TASK_CREATED,
    memberId: 'id-workspace-1-project-1-task-3',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Client notes feature',
      projectId: 'project_gamma',
      assigneeId: 'id-member-02',
      dueDate: '2024-04-05',
    },
  },
  {
    id: 'event_008',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.TASK_CREATED,
    memberId: 'id-user-5-member-1-workspace-5',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Add customizable status tags to deals pipeline',
      projectId: 'project_gamma',
      assigneeId: 'id-member-03',
      dueDate: '2024-04-07',
    },
  },
  {
    id: 'event_009',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.TASK_CREATED,
    memberId: 'id-user-5-member-1-workspace-5',
    approved: true,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Enable adding time-stamped notes to client profiles',
      projectId: 'project_gamma',
      assigneeId: 'user_456',
      dueDate: '2024-04-09',
    },
  },
  {
    id: 'event_010',
    kind: ENTITY_KINDS.EVENT,
    type: EventType.DOCUMENT_CREATED,
    memberId: 'id-user-5-member-1-workspace-5',
    approved: false,
    timestamp: 'Jun 21, 2025',
    payload: {
      title: 'Product Requirements Document (PRD)',
      projectId: 'project_alpha',
    },
  },

];
