
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';
import {
  selectAllInstances,
  selectSelectedInstance,
  selectInstancesByIds,
  selectInstancesByScreenId,
  selectCompositeInstanceById,
  selectInstanceById,
} from '../store';
import { useScreens } from '../../../uiScreen';
import { useFocusEntity } from '../../../uiFocus';


export const useInstances = () => {

  const { focusEntity } = useFocusEntity();
  const { selectedScreen } = useScreens();
  const isFocusedInstance = focusEntity?.kind === ENTITY_KINDS.INSTANCE;

  const allInstances = useSelector(selectAllInstances);

  const instanceById = useSelector(selectInstanceByIdFn);
  const instancesBySelectedScreen = useSelector(state => selectInstancesByScreenId(state, selectedScreen?.id));
  const instancesByScreenId = useSelector(selectInstancesByScreenIdFn);

  const selectedInstance = useSelector(selectSelectedInstance);
  const focusedInstance = useSelector(state => selectInstanceById(state, focusEntity?.id));
  const compositeInstanceById = useSelector(selectCompositeInstanceById);
  const selectedCompositeInstance = useSelector(state => selectCompositeInstanceById(state, selectedInstance?.id));
  const focusedCompositeInstance = useSelector(state => selectCompositeInstanceById(state, focusedInstance?.id));

  return {
    allInstances,
    instanceById,
    selectedInstance: selectedCompositeInstance,
    focusedInstance: focusedCompositeInstance,
    isFocusedInstance,
    instancesByScreenId,
    instancesBySelectedScreen,
  };
};

export const useInstancesByIds = (ids) => {
  const instances = useSelector(state => selectInstancesByIds(state, ids));
  return { instances };
};


const selectInstancesByScreenIdFn = createSelector(
  [(state) => state],
  (state) => (screenId) => selectInstancesByScreenId(state, screenId),
);

const selectInstanceByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectInstanceById(state, id),
);
