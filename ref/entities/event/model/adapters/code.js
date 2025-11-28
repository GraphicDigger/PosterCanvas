import { EventType } from '@/shared/constants';
import { CONTEXT_TYPES } from '../constants/contextTypes';

export const codeEventAdapter = {
  [EventType.CODE_CREATED]: (event, member) => ({
    action: 'created code',
    context: CONTEXT_TYPES.CODE,
  }),
};
