import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants/entityKinds';
import { selectElementIdsByScreenId } from '../../@x/element';
import { selectInstanceIdsByScreenId } from '../../@x/instance';
import { makeSelectAllElementIdsFromTree, makeSelectAllInstanceIdsFromTree } from '../../@x/uiTree';
import { selectFocusedEntity, selectFocusSystemStates } from '../../@x/uiFocus';
import { selectSelectedScreenId } from '../../../uiScreen/model/store/selector';

// Base selectors
export const selectWireframeBlockState = (state) => state.wireframeBlockEntity;
export const selectWireframeBlockEntities = (state) => selectWireframeBlockState(state).entities;
export const selectWireframeBlockIds = (state) => selectWireframeBlockState(state).ids;
export const selectWireframeBlockUI = (state) => selectWireframeBlockState(state).ui;

// UI selectors
export const selectHoveredWireframeBlockId = (state) => selectWireframeBlockUI(state).hoveredWireframeBlockId;
export const selectFocusedWireframeBlockId = (state) => selectWireframeBlockUI(state).focusedWireframeBlockId;
export const selectSelectedWireframeBlockId = (state) => selectWireframeBlockUI(state).selectedWireframeBlockId;

// Entity selectors
export const selectAllWireframeBlocks = createSelector(
  [selectWireframeBlockEntities, selectWireframeBlockIds],
  (entities, ids) => ids.map(id => entities[id]),
);

export const selectWireframeBlocksByScreenId = createSelector(
  [selectWireframeBlockEntities, (_, screenId) => screenId],
  (entities, screenId) => {
    return Object.values(entities).filter(block => block.screenId === screenId);
  },
);

// check states
export const selectWireframeBlockCheckStates = createSelector(
  [selectSelectedWireframeBlockId, selectFocusedWireframeBlockId, selectHoveredWireframeBlockId, (_, id) => id],
  (selectedId, focusedId, hoveredId, WireframeBlockId) => ({
    isSelected: selectedId === WireframeBlockId,
    isFocused: focusedId === WireframeBlockId,
    isHovered: hoveredId === WireframeBlockId,
  }),
);

// selected WireframeBlock
export const selectSelectedWireframeBlock = createSelector(
  [selectSelectedWireframeBlockId, selectWireframeBlockEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) { return null; }
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectWireframeBlocksByIds = createSelector(
  [selectWireframeBlockEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) { return []; }
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectWireframeBlocksByScreenId = (screenId) => createSelector(
  [
    selectAllWireframeBlocks,
    (state) => state,
  ],
  (allWireframeBlocks, state) => {
    if (!allWireframeBlocks?.length) {return [];}

    const elements = makeSelectAllElementIdsFromTree(ENTITY_KINDS.SCREEN, screenId)(state);
    const instances = makeSelectAllInstanceIdsFromTree(ENTITY_KINDS.SCREEN, screenId)(state);

    const filteredBlocks = allWireframeBlocks.filter(block => {
      const { targetType, targetId } = block;
      return (
        (targetType === ENTITY_KINDS.SCREEN && targetId === screenId) ||
        (targetType === ENTITY_KINDS.ELEMENT && elements.includes(targetId)) ||
        (targetType === ENTITY_KINDS.INSTANCE && instances.includes(targetId))
      );
    });
    // console.log('filteredBlocks', filteredBlocks);
    return filteredBlocks;
  },
);

// Универсальный селектор для wireframe блоков
export const selectWireframeBlocks = createSelector(
  [
    selectAllWireframeBlocks,
    selectFocusSystemStates,
    selectSelectedScreenId,
    (state) => state,
  ],
  (allWireframeBlocks, focusStates, selectedScreenId, state) => {

    const isCanvasFocused = focusStates?.isCanvasFocused;
    const focusEntity = focusStates?.focusEntity;

    const elements = makeSelectAllElementIdsFromTree(ENTITY_KINDS.SCREEN, selectedScreenId)(state);
    const instances = makeSelectAllInstanceIdsFromTree(ENTITY_KINDS.SCREEN, selectedScreenId)(state);

    // Если есть фокус на элементе/инстансе (не на экране), показываем блоки для фокусного элемента
    if (focusEntity && !isCanvasFocused) {
      const filteredBlocks = allWireframeBlocks.filter(block => {
        const { targetType, targetId } = block;
        return (
          (targetType === ENTITY_KINDS.ELEMENT && targetId === focusEntity.id) ||
          (targetType === ENTITY_KINDS.INSTANCE && targetId === focusEntity.id)
        );
      });
      // console.log('filteredElementBlocks', filteredBlocks);
      return filteredBlocks;
    }

    // Если передан selectedScreenId или фокус на экране, показываем блоки для экрана
    const currentScreenId = selectedScreenId || (isCanvasFocused ? focusEntity.focusEntity.id : null);

    if (currentScreenId || !isCanvasFocused) {
      const filteredBlocks = allWireframeBlocks.filter(block => {
        const { targetType, targetId } = block;
        return (
          (targetType === ENTITY_KINDS.SCREEN && targetId === currentScreenId) ||
          (targetType === ENTITY_KINDS.ELEMENT && elements.includes(targetId)) ||
          (targetType === ENTITY_KINDS.INSTANCE && instances.includes(targetId))
        );
      });
      // console.log('filteredScreenBlocks', filteredBlocks);
      return filteredBlocks;
    }
    return [];
  },
);

// export const selectScreenWireframeBlocks = createSelector(
//     [
//         selectAllWireframeBlocks,
//         (state, screenId) => makeSelectAllElementIdsFromTree(ENTITY_KINDS.SCREEN, screenId)(state),
//         (state, screenId) => makeSelectAllInstanceIdsFromTree(ENTITY_KINDS.SCREEN, screenId)(state),
//         (_, screenId) => screenId,
//     ],
//     (allWireframeBlocks, elementIds, instanceIds, screenId) => {

//         const screenBlocks = allWireframeBlocks.filter(block => {
//             const { targetType, targetId } = block
//             return (
//                 (targetType === ENTITY_KINDS.SCREEN && targetId === screenId) ||
//                 (targetType === ENTITY_KINDS.ELEMENT && elementIds.includes(targetId)) ||
//                 (targetType === ENTITY_KINDS.INSTANCE && instanceIds.includes(targetId))
//             );
//         });
//         return screenBlocks
//     }
// );

// export const selectFocusedUIWireframeBlocks = createSelector(
//     [
//         selectAllWireframeBlocks,
//         selectFocusSystemStates
//     ],
//     (allWireframeBlocks, focusEntity) => {
//         if (!focusEntity || focusEntity.focusEntity.kind === ENTITY_KINDS.SCREEN) {
//             return []
//         }

//         return allWireframeBlocks.filter(block => {
//             const { targetType, targetId } = block
//             return (
//                 (targetType === ENTITY_KINDS.ELEMENT && targetId === focusEntity.focusEntity.id) ||
//                 (targetType === ENTITY_KINDS.INSTANCE && targetId === focusEntity.focusEntity.id)
//             );
//         });
//     }
// );
