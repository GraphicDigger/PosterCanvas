import { EventType } from '@/shared/constants';
import { CONTEXT_TYPES } from '../constants/contextTypes';
import { VisibleIcon } from '../../../../shared/assets/icons';

const createBaseData = (event, member, specificData = {}) => {
  return {
    buttonIcon: VisibleIcon,
    buttonText: 'View Document',
    ...specificData,
  };
};

export const documentEventAdapter = {
  [EventType.DOCUMENT_CREATED]: (event, member) =>
    createBaseData(event, member, {
      action: 'created document',
    }),
};
