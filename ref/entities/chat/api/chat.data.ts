import type { Chat } from '../types';
import { ENTITY_KINDS } from '@/shared/constants';

export const chats: Chat[] = [
  {
    id: 'chat-1',
    name: 'Dev Chat',
    kind: ENTITY_KINDS.CHAT,
    projectId: '1',
    userId: 'id-member-01', // Sasha Peterson
    lastMessage: 'Last message 1',
    preview: 'Chat 1 preview',
    createdAt: 'June 3, 2024',
    modifiedAt: 'June 3, 2024',
  },
  {
    id: 'chat-2',
    name: 'Design Chat',
    kind: ENTITY_KINDS.CHAT,
    projectId: '1',
    userId: 'id-member-02', // Anna Smith
    lastMessage: 'Last message 2',
    preview: 'Chat 2 preview',
    createdAt: 'June 3, 2024',
    modifiedAt: 'June 3, 2024',
  },
  {
    id: 'chat-3',
    name: 'Business Chat',
    kind: ENTITY_KINDS.CHAT,
    projectId: '2',
    userId: 'id-member-03', // Max Wilson
    lastMessage: 'Last message 3',
    preview: 'Chat 3 preview',
    createdAt: 'June 3, 2024',
    modifiedAt: 'June 3, 2024',
  },
  {
    id: 'chat-4',
    name: 'Marketing Chat',
    kind: ENTITY_KINDS.CHAT,
    projectId: '3',
    userId: 'id-member-04', // Mike Wazowski
    lastMessage: 'Last message 4',
    preview: 'Chat 4 preview',
    createdAt: 'June 3, 2024',
    modifiedAt: 'June 3, 2024',
  },
  {
    id: 'chat-5',
    name: 'HR Chat',
    kind: ENTITY_KINDS.CHAT,
    projectId: '3',
    userId: 'id-member-05', // David Brown
    lastMessage: 'Last message 5',
    preview: 'Chat 5 preview',
    createdAt: 'June 3, 2024',
    modifiedAt: 'June 3, 2024',
  },

];
