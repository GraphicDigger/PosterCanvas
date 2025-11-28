import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '@/shared/constants';
import { selectInstanceById } from '../../@x/instance';
import { selectSelectedScreenId } from '../../@x/screen';
import { selectCanvasByScreenId, selectScreenCanvasMap, selectElementById } from '../../@x/element';

export const selectFocusedEntity = (state) => state.focusSystem.focusEntity;

export const selectFocusedEntityWithData = createSelector(
  [selectFocusedEntity, (state) => state],
  (focusEntity, state) => {
    if (!focusEntity || !focusEntity.id || !focusEntity.kind) return null;

    const { id, kind } = focusEntity;

    switch (kind) {
      case ENTITY_KINDS.CANVAS:
        const selectedScreenId = selectSelectedScreenId(state);
        const canvas = selectCanvasByScreenId(state, selectedScreenId);
        if (canvas) return { id, kind, data: canvas };

      case ENTITY_KINDS.ELEMENT:
        return { id, kind, data: selectElementById(state, id) };

      case ENTITY_KINDS.INSTANCE:
        return { id, kind, data: selectInstanceById(state, id) };

      default:
        return null;
    }
  },
);

export const selectFocusSystemStates = createSelector(
  [selectFocusedEntity],
  (focusEntity) => {
    const kind = focusEntity?.kind;
    return {
      focusEntity,
      isCanvasFocused: kind === ENTITY_KINDS.CANVAS,
      isElementFocused: kind === ENTITY_KINDS.ELEMENT,
      isInstanceFocused: kind === ENTITY_KINDS.INSTANCE,
    };
  },
);

// используется при создании нового элемента/ виджета/ экземпляра
export const selectFocusEntityOwnership = createSelector(
  [
    selectFocusedEntity,
    (state) => selectScreenCanvasMap(state),
    (state) => selectSelectedScreenId(state),
  ],
  (focusEntity, canvasMap, selectedScreenId) => {
    const canvas = canvasMap[selectedScreenId];

    // If element is focused, it becomes the parent / Если выделен элемент, он становится родителем
    if (focusEntity?.kind === ENTITY_KINDS.ELEMENT) {
      return { type: ENTITY_KINDS.ELEMENT, id: focusEntity.id };
    }

    // If nothing is focused, screen canvas becomes the parent / Если ничего не выделено, родителем становится canvas экрана
    if (canvas) {
      return { type: ENTITY_KINDS.ELEMENT, id: canvas.id };
    }

    return null;
  }
);





