import { ENTITY_KINDS } from '@/shared/constants';

export const projects = [
  {
    id: 'id-workspace-1-project-1',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Aurora',
    workspaceId: 'id-workspace-1',
    description: 'Task planning with visual timelines',
    status: 'active',
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-20T14:45:00.000Z',
    settings: {
      databaseType: 'postgresql',
    },
  },
  {
    id: 'id-workspace-1-project-2',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Nebula',
    workspaceId: 'id-workspace-1',
    description: 'Cloud storage for 3D models',
    status: 'active',
    createdAt: '2024-01-10T09:15:00.000Z',
    updatedAt: '2024-01-25T16:20:00.000Z',
    settings: {
      databaseType: 'mongodb',
    },
  },
  {
    id: 'id-workspace-1-project-3',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Monolith',
    workspaceId: 'id-workspace-1',
    description: 'Microservice management tool',
    status: 'development',
    createdAt: '2024-02-01T11:00:00.000Z',
    updatedAt: '2024-02-10T13:30:00.000Z',
    settings: {
      databaseType: 'sql',
    },
  },
  {
    id: 'id-workspace-2-project-4',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Pulse',
    workspaceId: 'id-workspace-2',
    description: 'Server performance monitor',
    status: 'active',
    createdAt: '2024-01-20T08:45:00.000Z',
    updatedAt: '2024-02-05T12:15:00.000Z',
    settings: {
      databaseType: 'sql',
    },
  },
  {
    id: 'id-workspace-2-project-5',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Atlas',
    workspaceId: 'id-workspace-2',
    description: 'Interactive map builder',
    status: 'testing',
    createdAt: '2024-01-25T15:20:00.000Z',
    updatedAt: '2024-02-08T10:40:00.000Z',
    settings: {
      databaseType: 'sql',
    },
  },

  {
    id: 'id-project-6',
    kind: ENTITY_KINDS.PROJECT,
    name: 'Echo. Client feedback platform',
    workspaceId: 'id-workspace-1',
    description: 'Личный портфолио сайт с современным дизайном',
    status: 'completed',
    createdAt: '2024-01-05T14:10:00.000Z',
    updatedAt: '2024-01-18T17:25:00.000Z',
    settings: {
      databaseType: 'sql',
    },
  },
];
