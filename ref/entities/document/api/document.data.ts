import type { Document } from '../types';
import { ENTITY_KINDS } from '@/shared/constants';

export const documents: Document[] = [
  {
    id: 'id-doc-1',
    title: 'Product Requirements Document (PRD)',
    memberId: 'id-member-01',
    kind: ENTITY_KINDS.DOCUMENT,
    projectId: 'id-workspace-1-project-1',
    createdAt: 'June 3, 2024',
    modifiedAt: '2024-03-20',
    content: 'Product Requirements Document (PRD) is a document that describes the product requirements for a project.',
  },
  {
    id: 'id-doc-2',
    title: 'Technical Specification',
    kind: ENTITY_KINDS.DOCUMENT,
    projectId: 'id-workspace-1-project-1',
    memberId: 'id-member-02',
    modifiedAt: '2024-03-19',
    createdAt: 'June 3, 2024',
    content: 'Technical Specification is a document that describes the technical specifications for a project.',
  },
  {
    id: 'id-doc-3',
    title: 'Feature Brief',
    kind: ENTITY_KINDS.DOCUMENT,
    projectId: 'id-workspace-1-project-1',
    memberId: 'id-member-03',
    modifiedAt: '2024-03-18',
    createdAt: 'June 3, 2024',
    content: 'Feature Brief is a document that describes the features for a project.',
  },
  {
    id: 'id-doc-4',
    title: 'Design Guidelines',
    kind: ENTITY_KINDS.DOCUMENT,
    projectId: 'id-workspace-1-project-2',
    memberId: 'id-member-04',
    modifiedAt: '2024-03-17',
    createdAt: 'June 3, 2024',
    content: 'Design Guidelines is a document that describes the design guidelines for a project.',
  },
  {
    id: 'id-doc-5',
    title: 'Architecture Overview',
    kind: ENTITY_KINDS.DOCUMENT,
    projectId: 'id-workspace-1-project-2',
    memberId: 'id-member-05',
    modifiedAt: '2024-03-16',
    createdAt: 'June 3, 2024',
    content: 'Architecture Overview is a document that describes the architecture overview for a project.',
  },

];
