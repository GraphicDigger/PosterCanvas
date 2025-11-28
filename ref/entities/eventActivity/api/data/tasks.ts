import type { Activity } from '@/shared/services/eventActivity';
import { ENTITY_KINDS } from '@/shared/constants';

export const tasks: Activity[] = [
  {
    id: 'activity_008',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_008',
    title: 'Add customizable status tags to deals pipeline',
    text: 'Add customizable status tags to deals pipeline',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-workspace-2-project-4-task-5',
      entityKind: ENTITY_KINDS.TASK,
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_006',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_006',
    title: 'Develop functionality for adding new members to the team',
    text: 'Aurora description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-workspace-1-project-1-task-1',
      entityKind: ENTITY_KINDS.TASK,
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_004',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_004',
    title: 'Client notes feature',
    text: 'Nebula description. The task focuses on developing, testing, and integrating a product with emphasis on stability, scalability, and usability. The goal is to deliver a functional, reliable, and adaptable solution that meets business requirements and user expectations.',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-workspace-1-project-2-task-4',
      entityKind: ENTITY_KINDS.TASK,
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
];
