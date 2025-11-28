import { ENTITY_KINDS } from '../../../shared/constants';

export const tokenCollections = [
  {
    id: 'token-color-collection-1',
    kind: ENTITY_KINDS.TOKEN_COLLECTION,
    name: 'Color Tokens',
    variableModeIds: [
      'theme-mode-1-collection-1',
      'theme-mode-2-collection-1',
    ],
  },
  {
    id: 'token-color-collection-2',
    kind: ENTITY_KINDS.TOKEN_COLLECTION,
    name: 'Base Colors',
    variableModeIds: [
      'mode-1-color-token-collection-3',
    ],
  },
  {
    id: 'token-number-collection-3',
    kind: ENTITY_KINDS.TOKEN_COLLECTION,
    name: 'Number Tokens',
    variableModeIds: [
      'mode-1-number-token-collection-4',
    ],
  },
];
