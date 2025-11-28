import { useMemo } from 'react';
import { useWireframeBlocks, useWireframeBlockMutations } from '../../../../../entities/wireframeBlock';
import { useScreens, useScreenStates } from '../../../../../entities/uiScreen';
import { useWireframeMode } from '../../../../../entities/mode/editorMode';

export const useWireframeControl = () => {

  const { isPreviewMode } = useWireframeMode();
  const { selectedScreen } = useScreens();
  const { handleSelect: handleSelectScreen } = useScreenStates();
  const { getScreenWireframeBlocks, wireframeBlocks } = useWireframeBlocks();

  const {
    deleteWireframeBlock,
    unlinkWireframeBlock,
    linkWireframeBlockToUI,
    createWireframeBlock,
  } = useWireframeBlockMutations();

  const elementBlockId = useMemo(() => {
    return wireframeBlocks?.[0]?.id;
  }, [wireframeBlocks]);

  return {
    handleSelectScreen,
    elementBlockId,
    isPreviewMode,

    createWireframeBlock,
    deleteWireframeBlock,
    unlinkWireframeBlock,
    linkWireframeBlockToUI,
    getScreenWireframeBlocks,
  };
};
