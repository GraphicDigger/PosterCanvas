import { ENTITY_KINDS } from '../../../../shared/constants';

export const resolveContext = (context) => {
  const contextInstance = context?.kind === ENTITY_KINDS.INSTANCE ? context : null;
  const contextComponent = context?.kind === ENTITY_KINDS.COMPONENT ? context : null;
  return { contextInstance, contextComponent };
};
