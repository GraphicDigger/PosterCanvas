import { ENTITY_KINDS } from '@/shared/constants';

export const getContextObject = (
  contextType: string,
  contextId: string,
  entities: any,
) => {
  switch (contextType) {
  case ENTITY_KINDS.DOCUMENT:
    return entities.documentEntities[contextId] || null;
  case ENTITY_KINDS.TASK:
    return entities.taskEntities[contextId] || null;
  case ENTITY_KINDS.CHAT:
    return entities.chatEntities[contextId] || null;
  default:
    return null;
  }
};
