import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '@/shared/constants';
import { useFocusEntity } from '@/entities/uiFocus';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useComponents } from '@/entities/uiComponent';
import { useElement } from '@/entities/uiElement';
import { getElementTypeByTag, useElementMutations, useElementStates } from '@/entities/uiElement';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { UI_ENTITY_TYPE } from '../constants/uiEntityType';
import { useUiDefaultEntitySelectors } from './useUiDefaultEntitySelectors';
import { UiDefaultEntity } from '../../types';


export const useUiDefaultEntityMutation = () => {

  const { focusEntity, setFocused } = useFocusEntity();
  const { isComponentCanvasInDesignMode } = useDesignMode();
  const { isWireframeModeGlobal } = useGlobalModes();
  const { selectedComponentId } = useComponents();
  const { selectedScreenRootElement } = useElement({ id: focusEntity?.id });
  const { addElement, addElements } = useElementMutations();
  const { handleSelect } = useElementStates();
  const { getFlattenElementWithChildrenById, getFlattenWidgetWithChildrenById } = useUiDefaultEntitySelectors();

  const handleAddUiDefaultEntity = useCallback((uiEntity: UiDefaultEntity) => {

    let uiEntities;

    if (uiEntity.type === UI_ENTITY_TYPE.ELEMENT) {
      uiEntities = getFlattenElementWithChildrenById(uiEntity.id);
    }
    if (uiEntity.type === UI_ENTITY_TYPE.WIDGET) {
      uiEntities = getFlattenWidgetWithChildrenById(uiEntity.id);
    }

    let topLevelOwnership;

    if (isWireframeModeGlobal) {
      topLevelOwnership = {
        type: ENTITY_KINDS.ELEMENT,
        id: selectedScreenRootElement.id,
      };
    }

    if (isComponentCanvasInDesignMode) {
      if (focusEntity?.kind === ENTITY_KINDS.ELEMENT) {
        topLevelOwnership = {
          type: ENTITY_KINDS.ELEMENT,
          id: focusEntity.id,
        };
      } else {
        topLevelOwnership = {
          type: ENTITY_KINDS.COMPONENT,
          id: selectedComponentId,
        };
      }
    } else {
      if (focusEntity?.kind === ENTITY_KINDS.ELEMENT) {
        topLevelOwnership = {
          type: ENTITY_KINDS.ELEMENT,
          id: focusEntity.id,
        };
      } else {
        topLevelOwnership = {
          type: ENTITY_KINDS.ELEMENT,
          id: selectedScreenRootElement.id,
        };
      }
    }

    if (!Array.isArray(uiEntities)) {
      const newElement = {
        id: uuidv4(),
        kind: ENTITY_KINDS.ELEMENT,
        // type: elementType,
        ownership: topLevelOwnership,
        ...uiEntities,
      };
      addElement(newElement);
      setFocused({ id: newElement.id, kind: ENTITY_KINDS.ELEMENT, type: elementType });

      return newElement;

    } else {
      // Обработка СОСТАВНОГО элемента
      const idMap = {};
      const elementsToAdd = [];
      let rootElement = null;

      // 1. Обрабатываем корневой элемент (первый в массиве)
      const rootTemplate = uiEntities[0];
      if (rootTemplate) {
        const newRootId = uuidv4();
        idMap[rootTemplate.id] = newRootId;

        const newRoot = {
          ...rootTemplate,
          id: newRootId,
          ownership: topLevelOwnership,
        };
        elementsToAdd.push(newRoot);
        rootElement = newRoot;
      }

      // 2. Обрабатываем дочерние элементы
      for (let i = 1; i < uiEntities.length; i++) {
        const childTemplate = uiEntities[i];
        const newChildId = uuidv4();
        idMap[childTemplate.id] = newChildId;

        const parentOldId = childTemplate.ownership?.id;
        const parentNewId = idMap[parentOldId];

        if (parentNewId) {
          const newChild = {
            ...childTemplate,
            id: newChildId,
            ownership: { ...childTemplate.ownership, id: parentNewId },
          };
          elementsToAdd.push(newChild);
        }
      }

      addElements(elementsToAdd);

      if (rootElement) {
        handleSelect(rootElement.id);
        setFocused({ id: rootElement.id, kind: ENTITY_KINDS.ELEMENT });
        return rootElement;
      }

      return null;

    }
  }, []);


  return {
    addUiDefaultEntity: handleAddUiDefaultEntity,
  };
};
