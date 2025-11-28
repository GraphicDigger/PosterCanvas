import { ENTITY_KINDS } from '../../../shared/constants';
import type { DataModel } from '../types';

export const dataModels: DataModel[] = [
  {
    // Default model to demonstrate binding a prop to an array of records from a collection
    // Invisible to the user
    id: 'model0',
    name: 'default',
    description: 'Default Model',
    fields: [
      {
        id: 'field1',
        name: 'id',
        type: 'string',
        required: true,
        validation: { pattern: '^[a-zA-Z0-9-_]+$' },
      },
      {
        id: 'field2',
        name: 'name',
        type: 'string',
        required: true,
        validation: { min: 1, max: 100 },
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
    version: 1,
    tags: ['default', 'system'],
    metadata: {
      kind: ENTITY_KINDS.DATA_MODEL,
      isDefault: true,
    },
  },
  {
    id: 'model1',
    name: 'member',
    description: 'Member data model',
    fields: [
      {
        id: 'field1',
        name: 'id',
        type: 'string',
        required: true,
        validation: { pattern: '^[a-zA-Z0-9-_]+$' },
      },
      {
        id: 'field2',
        name: 'name',
        type: 'string',
        required: true,
        validation: { min: 1, max: 100 },
      },
      {
        id: 'field3',
        name: 'email',
        type: 'string',
        required: true,
        validation: { pattern: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$' },
      },
      {
        id: 'field4',
        name: 'role',
        type: 'reference',
        required: false,
        metadata: { referenceModel: 'role' },
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
    version: 1,
    tags: ['user', 'member'],
    metadata: {
      kind: ENTITY_KINDS.DATA_MODEL,
    },
  },
  {
    id: 'model2',
    name: 'role',
    description: 'Role data model',
    fields: [
      {
        id: 'field1',
        name: 'id',
        type: 'string',
        required: true,
        validation: { pattern: '^[a-zA-Z0-9-_]+$' },
      },
      {
        id: 'field2',
        name: 'name',
        type: 'string',
        required: true,
        validation: { min: 1, max: 50 },
      },
      {
        id: 'field3',
        name: 'description',
        type: 'string',
        required: false,
        validation: { max: 200 },
      },
      {
        id: 'field4',
        name: 'permissions',
        type: 'array',
        required: false,
        metadata: { itemType: 'string' },
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system',
    isActive: true,
    version: 1,
    tags: ['user', 'role'],
    metadata: {
      kind: ENTITY_KINDS.DATA_MODEL,
    },
  },
];
