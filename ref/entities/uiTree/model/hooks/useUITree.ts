// ude-frontend-vite-ts/src/features/uiRender/model/hooks/useUITree.js
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';
import {
  selectCompositeEntitiesByOwnership,
  selectAllInstancesFromTree,
  makeSelectCompositeEntitiesByOwnership,
  makeSelectAllInstancesFromTree,
  makeSelectAllNestedElementsFromTree,
} from '../store';
import { useScreens } from '../../../uiScreen';
import { useComponents } from '../../../uiComponent';

interface UITreeProps {
  ownershipType?: string;
  ownerId?: string;
}

export const useUITree = ({ ownershipType, ownerId }: UITreeProps = {}) => {

  const { selectedScreen } = useScreens();
  const { selectedComponent } = useComponents();

  // Получаем дерево UI для выбранного экрана
  const screenUITree = useSelector(
    state => selectCompositeEntitiesByOwnership(state, ENTITY_KINDS.SCREEN, selectedScreen?.id));

  // Получаем дерево UI для выбранного компонента
  const componentUITree = useSelector(
    state => selectCompositeEntitiesByOwnership(state, ENTITY_KINDS.COMPONENT, selectedComponent?.id));

  // TODO: Remove this selector
  const uiTreeByOwnership = useSelector(selectCompositeEntitiesByOwnershipFn);
  //replace with
  const uiTree = useSelector(state => selectCompositeEntitiesByOwnership(state, ownershipType, ownerId));

  // TODO: Remove this selector
  const allInstancesFromTree = useSelector(selectAllInstancesFromTreeFn);
  //replace with
  const instancesFromTree = useSelector(state => selectAllInstancesFromTree(state, ownershipType, ownerId));

  const uiTreeElements = useSelector(makeSelectAllNestedElementsFromTree(ownershipType, ownerId));

  return {

    uiTree,
    instancesFromTree,
    uiTreeElements,

    screenUITree,
    componentUITree,
    uiTreeByOwnership,
    allInstancesFromTree,
  };
};

const selectCompositeEntitiesByOwnershipFn = createSelector(
  [(state) => state],
  (state) => (ownershipType, ownerId) => selectCompositeEntitiesByOwnership(state, ownershipType, ownerId),
);

const selectAllInstancesFromTreeFn = createSelector(
  [(state) => state],
  (state) => (ownershipType, ownerId) => selectAllInstancesFromTree(state, ownershipType, ownerId),
);
