import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useElementStates } from '../../../uiElement';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useInstanceStates } from '../../../uiInstance';
import { useCurrentInstance } from '../../../../features/iFrame/model/context/InstanceContext';
import { useScreens } from '../../../uiScreen';
import { ELEMENT_TAGS } from '../../../uiElement';
import { setFocusEntity, resetFocusEntity, } from '../store/slice';

export const useRenderEvents = (ui, disableClick = false) => {
  const dispatch = useDispatch();

  const { id, kind, type, tag } = ui;

  const contextInstance = useCurrentInstance();

  const {
    handleSelect: handleSelectElement,
    handleHover: handleHoverElement,
    handleFocus: handleFocusElement,
  } = useElementStates(id);

  const {
    handleSelect: handleSelectInstance,
    handleHover: handleHoverInstance,
    handleFocus: handleFocusInstance,
  } = useInstanceStates(id);

  const { selectedScreenId } = useScreens();

  const handleElementClick = useCallback((e) => {
    if (disableClick) { return; }
    e.stopPropagation();

    // Сначала проверяем, если инстанс находится внутри элемента, выбираем родительский элемент
    if (kind === ENTITY_KINDS.INSTANCE && ui.ownership?.type === ENTITY_KINDS.ELEMENT) {
      const parentElementId = ui.ownership.id;
      handleSelectElement(parentElementId);
      dispatch(setFocusEntity({
        id: parentElementId,
        kind: ENTITY_KINDS.ELEMENT,
        data: { tag },
      }));
    }
    // Сначала проверяем, если инстанс находится внутри элемента, выбираем родительский элемент
    if (kind === ENTITY_KINDS.ELEMENT && tag === ELEMENT_TAGS.BODY) {
      dispatch(setFocusEntity({
        id: selectedScreenId,
        kind: ENTITY_KINDS.SCREEN,
      }));
    }
    // Если элемент находится внутри инстанса, мы выбираем инстанс
    else if (contextInstance && contextInstance.kind === ENTITY_KINDS.INSTANCE) {
      handleSelectInstance(contextInstance.id);
      dispatch(setFocusEntity({
        id: contextInstance.id,
        kind: ENTITY_KINDS.INSTANCE,
      }));
    }
    else {
      // Иначе выбираем сам элемент
      handleSelectElement(id);
      dispatch(setFocusEntity({ id, kind, type, data: { tag } }));
    }
  }, [disableClick, handleSelectInstance, handleSelectElement, dispatch, id, kind, type, contextInstance, ui]);

  const handleElementMouseEnter = useCallback(() => {
    handleHoverElement(id);
  }, [handleHoverElement, id]);

  const handleElementMouseLeave = useCallback(() => {
    handleHoverElement(null);
  }, [handleHoverElement]);

  return {
    onClick: handleElementClick,
    onMouseEnter: handleElementMouseEnter,
    onMouseLeave: handleElementMouseLeave,
  };
};
