import avatarImage from '../../../shared/assets/dummy/avatar.png';
import avatarImage2 from '../../../shared/assets/dummy/avatar_1.jpg';
import avatarImage3 from '../../../shared/assets/dummy/avatar_2.png';
import avatarImage4 from '../../../shared/assets/dummy/avatar_3.png';
import avatarImage5 from '../../../shared/assets/dummy/avatar_4.png';
import { ENTITY_KINDS } from '../../../shared/constants';

export const members = [
  {
    id: 'id-user-1-member-1-workspace-1',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-1',
    role: 'Designer',
    workspaceId: 'id-workspace-1',
    // The fields below need to be removed, but for now they are used for the demo database.
    firstName: 'Kate',
    lastName: 'Wilber',
    email: 'kate@example.com',
    avatar: avatarImage,
  },
  {
    id: 'id-user-1-member-2-workspace-2',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-1',
    role: 'Designer',
    workspaceId: 'id-workspace-2',
    // del
    firstName: 'Kate',
    lastName: 'Wilber',
    email: 'kate@example.com',
    avatar: avatarImage,
  },
  {
    id: 'id-user-2-member-1-workspace-2',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-2',
    role: 'Developer',
    workspaceId: 'id-workspace-2',
    // del
    firstName: 'Mike',
    lastName: 'Wazowski',
    email: 'john@example.com',
    avatar: avatarImage3,
  },
  {
    id: 'id-user-3-member-1-workspace-3',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-3',
    role: 'Manager',
    workspaceId: 'id-workspace-3',
    // del
    firstName: 'Max',
    lastName: 'Wilson',
    email: 'max@example.com',
    avatar: avatarImage2,
  },
  {
    id: 'id-user-4-member-1-workspace-4',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-4',
    role: 'Designer',
    workspaceId: 'id-workspace-4',
    // del
    firstName: 'John',
    lastName: 'Doe',
    email: 'mike@example.com',
    avatar: avatarImage3,
  },
  {
    id: 'id-user-5-member-1-workspace-5',
    kind: ENTITY_KINDS.ACTOR_MEMBER,
    userId: 'id-user-5',
    role: 'Developer',
    workspaceId: 'id-workspace-5',
    // del
    firstName: 'David',
    lastName: 'Brown',
    email: 'david@example.com',
    avatar: avatarImage4,
  },
];
