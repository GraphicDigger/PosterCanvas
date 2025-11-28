import type { User } from '../types';
import avatarImage from '@/shared/assets/dummy/avatar.png';
import avatarImage1 from '@/shared/assets/dummy/avatar_2.png';
import { ENTITY_KINDS } from '@/shared/constants';

export const users: User[] = [
  {
    id: 'id-user-1',
    kind: ENTITY_KINDS.ACTOR_USER,
    name: 'Kate Wilber',
    avatar: avatarImage,
  },
  {
    id: 'id-user-2',
    kind: ENTITY_KINDS.ACTOR_USER,
    name: 'Mike Wazowski',
    avatar: avatarImage1,
  },
  // {
  //     id: 'id-user-3',
  //     kind: ENTITY_KINDS.ACTOR_USER,
  //     name: 'Max Wilson',
  //     avatar: avatarImage,
  // },
  // {
  //     id: 'id-user-4',
  //     kind: ENTITY_KINDS.ACTOR_USER,
  //     name: 'Mike Wazowski',
  //     avatar: avatarImage,
  // },
  // {
  //     id: 'id-user-5',
  //     kind: ENTITY_KINDS.ACTOR_USER,
  //     name: 'David Brown',
  //     avatar: avatarImage,
  // },
];
