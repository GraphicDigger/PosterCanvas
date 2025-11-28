import { ENTITY_KINDS } from '../../../shared/constants';
import { PRESET_TYPES } from '../model/constants/presetTypes';

export const presets = [
  {
    id: 'preset-1',
    kind: ENTITY_KINDS.PRESET,
    type: PRESET_TYPES.TYPOGRAPHY,
    name: 'Heading 1',
    collectionId: 'default-typography-preset-collection-1',
  },
  {
    id: 'preset-2',
    kind: ENTITY_KINDS.PRESET,
    type: PRESET_TYPES.TYPOGRAPHY,
    name: 'Heading 2',
    collectionId: 'default-typography-preset-collection-1',
  },
  {
    id: 'preset-3',
    kind: ENTITY_KINDS.PRESET,
    type: PRESET_TYPES.EFFECT,
    name: 'Shadow',
    collectionId: 'preset-collection-2',
  },
];
