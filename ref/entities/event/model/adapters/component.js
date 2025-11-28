import { EventType } from '@/shared/constants';
import { CONTEXT_TYPES } from '../constants/contextTypes';
import { VisibleIcon } from '../../../../shared/assets/icons';

const createBaseData = (event, member, specificData = {}) => {
  return {
    buttonIcon: VisibleIcon,
    buttonText: 'UIEditor',
    approved: event.approved,
    context: CONTEXT_TYPES.NO_CODE,
    ...specificData,
  };
};

export const componentEventAdapter = {
  [EventType.COMPONENT_CREATED_CODE]: (event, member) =>
    createBaseData(event, member, {
      action: 'created component',
      context: CONTEXT_TYPES.CODE,
    }),

  [EventType.COMPONENT_CREATED_NOCODE]: (event, member) =>
    createBaseData(event, member, {
      action: 'created component',
    }),

  [EventType.COMMENT_ADDED_NOCODE]: (event, member) =>
    createBaseData(event, member, {
      action: 'commented on the UI',
    }),

  [EventType.COMMENT_ADDED_CODE]: (event, member) =>
    createBaseData(event, member, {
      action: 'commented on the UI',
      context: CONTEXT_TYPES.CODE,
    }),

};
