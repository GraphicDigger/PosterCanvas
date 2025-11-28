import { MODEL_FIELD_TYPES } from '../model';
import { ENTITY_KINDS } from '../../../shared/constants';

export const dataModels = [
  {
    // Default model to demonstrate binding a prop to an array of records from a collection
    // Invisible to the user
    id: 'model0',
    kind: ENTITY_KINDS.DATA_MODEL,
    label: 'Default Model',
    name: 'default',
    isDefault: true,
  },
  {
    id: 'model1',
    kind: ENTITY_KINDS.DATA_MODEL,
    label: 'Member',
    name: 'member',
  },
  {
    id: 'model2',
    kind: ENTITY_KINDS.DATA_MODEL,
    label: 'Role',
    name: 'role',
  },

];
