import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../shared/constants';


export const normalizeComponent = (component, libraryInfo = null) => {
  if (!component) {return null;}

  return {
    id: component.id,
    name: component.name,
    kind: ENTITY_KINDS.COMPONENT,
    metadata: {
      source: 'ui-library',
      originalId: component.id,
      libraryName: libraryInfo?.name || '',
      libraryId: libraryInfo?.id || null,
      libraryVersion: libraryInfo?.version || null,
    },
  };
};
