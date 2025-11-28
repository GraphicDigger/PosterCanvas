import avatarImage from '../../../shared/assets/dummy/avatar.png';
import avatarImage1 from '../../../shared/assets/dummy/avatar_2.png';
import { ENTITY_KINDS } from '../../../shared/constants';


export const userspaces = [
  {
    id: 'id-userspace-1',
    kind: ENTITY_KINDS.USERSPACE,
    name: 'Kate Wilber',
    avatar: avatarImage,
    workspaceIds: ['id-workspace-1', 'id-workspace-2'],
  },
  {
    id: 'id-userspace-2',
    kind: ENTITY_KINDS.USERSPACE,
    name: 'John Doe',
    avatar: avatarImage1,
    workspaceIds: ['id-workspace-3', 'id-workspace-4'],
  },
];
