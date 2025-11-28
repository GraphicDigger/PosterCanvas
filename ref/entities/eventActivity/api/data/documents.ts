import type { Activity } from '@/shared/services/eventActivity';
import { ENTITY_KINDS } from '@/shared/constants';


export const documents: Activity[] = [
  {
    id: 'activity_009',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_009',
    title: 'Technical Specification',
    text: 'Technical Specification',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-doc-2',
      entityKind: ENTITY_KINDS.DOCUMENT,
      createdBy: 'id-user-2-member-1-workspace-2',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_010',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_010',
    title: 'Product Requirements Document (PRD)',
    text: 'Product Requirements Document (PRD)',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-doc-1',
      entityKind: ENTITY_KINDS.DOCUMENT,
      tag: 'prd',
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_007',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_007',
    title: 'Design Guidelines',
    text: 'Design Guidelines',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'id-doc-4',
      entityKind: ENTITY_KINDS.DOCUMENT,
      createdBy: 'id-user-2-member-1-workspace-2',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
];
