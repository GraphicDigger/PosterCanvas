import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useElementStates } from './useElementStates';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useScreenStates, useScreens } from '../../../uiScreen';
import { ELEMENT_TAGS } from '../constants/elementTags';
import { addElement } from '../store/slice';

export const useBodyElementMutation = () => {
  const dispatch = useDispatch();

  const handleAddBodyElement = (screenId) => {
    const newElement = {
      id: uuidv4(),
      kind: ENTITY_KINDS.ELEMENT,
      ownership: {
        type: ENTITY_KINDS.SCREEN,
        id: screenId,
      },
      tag: ELEMENT_TAGS.BODY,
      properties: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        },
      },
    };

    dispatch(addElement(newElement));
  };

  return {
    addBodyElement: handleAddBodyElement,
  };
};

