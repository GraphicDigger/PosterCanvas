import type { Activity } from '@/shared/services/eventActivity';
import { ENTITY_KINDS } from '@/shared/constants';

export const components: Activity[] = [
  {
    id: 'activity_001',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_001',
    title: 'Created a Button component in the Alpha project',
    text: ' Created a Button component in the Alpha project',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'button-component-new',
      entityKind: ENTITY_KINDS.COMPONENT,
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_002',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_002',
    title: 'Created a Button component in the Beta project',
    text: 'Created a Button component in the Beta project',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'button-component-new',
      entityKind: ENTITY_KINDS.COMPONENT,
      createdBy: 'id-user-2-member-1-workspace-2',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
  {
    id: 'activity_003',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_003',
    title: 'Consider extracting button styles to a separate styled component for better reusability and cleaner JSX structure.',
    text: 'Consider extracting button styles to a separate styled component for better reusability and cleaner JSX structure.',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'button-component-new',
      entityKind: ENTITY_KINDS.COMPONENT,
      createdBy: 'id-user-5-member-1-workspace-5',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },

  {
    id: 'activity_005',
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: 'event_005',
    title: 'Add contact form',
    text: 'Add contact form',
    updatedAt: '2025-01-01T00:00:00.000Z',
    createdAt: '2025-01-01T00:00:00.000Z',
    source: {
      entityId: 'contact-form-new',
      entityKind: ENTITY_KINDS.COMPONENT,
      createdBy: 'id-user-3-member-1-workspace-3',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
  },
];
