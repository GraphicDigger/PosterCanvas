import avatarImage1 from '../../../shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import avatarImage2 from '../../../shared/assets/dummy/ren-ran-bBiuSdck8tU-unsplash.jpg';
import avatarImage3 from '../../../shared/assets/dummy/martin-blaszkiewicz-kMeQ3zam1ac-unsplash.jpg';
import avatarImage4 from '../../../shared/assets/dummy/chris-nguyen-aTX_bRaOZnA-unsplash.jpg';
import { ENTITY_KINDS } from '../../../shared/constants';

export const workspaces = [
  {
    id: 'id-workspace-1',
    kind: ENTITY_KINDS.WORKSPACE,
    name: 'Workspace 1',
    avatar: avatarImage1,
    // userspaceId: 'id-userspace-1',
  },
  {
    id: 'id-workspace-2',
    kind: ENTITY_KINDS.WORKSPACE,
    name: 'Workspace 2',
    avatar: avatarImage2,
    // userspaceId: 'id-userspace-1',
  },
  {
    id: 'id-workspace-3',
    kind: ENTITY_KINDS.WORKSPACE,
    name: 'Workspace 3',
    avatar: avatarImage3,
    // userspaceId: 'id-userspace-2',
  },
  {
    id: 'id-workspace-4',
    kind: ENTITY_KINDS.WORKSPACE,
    name: 'Workspace 4',
    avatar: avatarImage4,
    // userspaceId: 'id-userspace-2',
  },


];
