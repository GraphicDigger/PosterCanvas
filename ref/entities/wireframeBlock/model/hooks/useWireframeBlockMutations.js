import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addWireframeBlock, removeWireframeBlock, setSelectedWireframeBlockId, updateWireframeBlock } from '../store/slice';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useFocusEntity } from '../../../uiFocus';
import { useElement } from '../../../uiElement';
import { useScreens } from '../../../uiScreen';
import { selectAllWireframeBlocks } from '../store/selectors';
import { useWireframeBlocks } from './useWireframeBlocks';

export const useWireframeBlockMutations = () => {
  const dispatch = useDispatch();

  const { focusEntity } = useFocusEntity();
  const { selectedScreen } = useScreens();
  const { isFocusedBodyElement } = useElement();
  const allWireframeBlocks = useSelector(selectAllWireframeBlocks);
  const { selectedWireframeBlockId } = useWireframeBlocks();

  const createWireframeBlock = useCallback((targetScreenId) => {
    const hasFocusedEntity = focusEntity && (
      !isFocusedBodyElement &&
            (focusEntity.kind === ENTITY_KINDS.ELEMENT || focusEntity.kind === ENTITY_KINDS.INSTANCE)
    );

    if (hasFocusedEntity) {
      // Есть фокус - создаем связанный блок
      // Проверяем, есть ли уже блок для этого элемента/инстанса
      const existingBlocks = allWireframeBlocks.filter(block => {
        const { targetType, targetId } = block;
        return (
          (targetType === ENTITY_KINDS.ELEMENT && targetId === focusEntity.id) ||
                    (targetType === ENTITY_KINDS.INSTANCE && targetId === focusEntity.id)
        );
      });

      // Если блок уже существует, возвращаем его
      if (existingBlocks.length > 0) {
        dispatch(setSelectedWireframeBlockId(existingBlocks[0].id));
        return existingBlocks[0];
      }

      // Создаем новый связанный блок
      const blockName = 'Wireframe Block';
      const newBlock = {
        id: uuidv4(),
        name: blockName,
        kind: ENTITY_KINDS.WIREFRAME_BLOCK,
        targetType: focusEntity.kind,
        targetId: focusEntity.id,
      };

      dispatch(addWireframeBlock(newBlock));
      dispatch(setSelectedWireframeBlockId(newBlock.id));
      return newBlock;

    } else {

      const screenId = targetScreenId || selectedScreen?.id;
      if (!screenId) {return null;}

      const newBlock = {
        id: uuidv4(),
        name: 'New Wireframe Block',
        kind: ENTITY_KINDS.WIREFRAME_BLOCK,
        targetType: ENTITY_KINDS.SCREEN,
        targetId: screenId,
      };

      dispatch(addWireframeBlock(newBlock));
      dispatch(setSelectedWireframeBlockId(newBlock.id));
      return newBlock;
    }
  }, [focusEntity, isFocusedBodyElement, selectedScreen]);


  // Отвязка блока от элемента/инстанса
  const unlinkWireframeBlock = (blockId) => {
    if (!blockId) {return null;}
    // Если есть выбранный экран, привязываем блок к нему
    if (selectedScreen) {
      const changes = {
        targetType: ENTITY_KINDS.SCREEN,
        targetId: selectedScreen.id,
      };
      dispatch(updateWireframeBlock({
        id: blockId,
        changes,
      }));
      return true;
    }
  };


  // delete
  const deleteWireframeBlock = (blockId) => {
    dispatch(setSelectedWireframeBlockId(null));
    dispatch(removeWireframeBlock(blockId));
  };


  // update
  const handleUpdateWireframeBlock = (blockId, changes) => {
    const id = blockId || selectedWireframeBlockId;

    console.log('updateWireframeBlock', id, changes);

    if (!id) {return null;}

    dispatch(updateWireframeBlock({
      id,
      changes,
    }));

    return true;
  };


  // Связывание блока с фокусным элементом и отвязывание всех других блоков
  const linkWireframeBlockToUI = (blockId) => {
    if (!blockId || !focusEntity ||
            (focusEntity.kind !== ENTITY_KINDS.ELEMENT &&
                focusEntity.kind !== ENTITY_KINDS.INSTANCE)) {
      return null;
    }
    // Находим все блоки, связанные с текущим фокусным элементом
    const focusEntityBlocks = allWireframeBlocks.filter(block => {
      const { targetType, targetId } = block;
      return (
        (targetType === ENTITY_KINDS.ELEMENT && targetId === focusEntity.id) ||
                (targetType === ENTITY_KINDS.INSTANCE && targetId === focusEntity.id)
      );
    });
    // Отвязываем все блоки от фокусного элемента, кроме выбранного
    focusEntityBlocks.forEach(block => {
      if (block.id !== blockId) {
        unlinkWireframeBlock(block.id);
      }
    });
    // Привязываем выбранный блок к фокусному элементу
    const changes = {
      targetType: focusEntity.kind,
      targetId: focusEntity.id,
    };
    return handleUpdateWireframeBlock(blockId, changes);
  };

  return {
    createWireframeBlock,
    updateWireframeBlock: handleUpdateWireframeBlock,
    deleteWireframeBlock,

    linkWireframeBlockToUI,
    unlinkWireframeBlock,

  };
};

