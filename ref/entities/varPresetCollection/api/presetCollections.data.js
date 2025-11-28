import { ENTITY_KINDS } from '../../../shared/constants';
import { COLLECTION_TYPES } from '../model';

export const presetCollections = [
  {
    id: 'default-typography-preset-collection-1',
    kind: ENTITY_KINDS.PRESET_COLLECTION,
    type: COLLECTION_TYPES.TYPOGRAPHY,
    name: 'Typography',
    variableModeIds: [
      'breakpoint-mode-1-collection-1',
      'breakpoint-mode-2-collection-1',
      'breakpoint-mode-3-collection-1',
    ],
  },
  {
    id: 'preset-collection-2',
    kind: ENTITY_KINDS.PRESET_COLLECTION,
    name: 'Effects',
    variableModeIds: [
      'mode-1-collection-2',
    ],
  },
];
