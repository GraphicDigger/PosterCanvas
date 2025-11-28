import { useSelector } from 'react-redux';
import { useGlobalModes, useWireframeMode } from '../../../../entities/mode/editorMode';
import { useWireframeBlocks, useWireframeBlockStates } from '../../../../entities/wireframeBlock';

export const useWireframeSidebar = () => {

  const { setGlobalWireframeMode, setGlobalDesignMode } = useGlobalModes();
  const { handleDeselectWireframeBlock } = useWireframeBlockStates();

  const {
    toggleBlockAndPreviewMode,
    toggleBlockDetailMode,
    setBlockDetailMode,
    resetBlockDetailMode,
    isBlocksMode,
    isPreviewMode,
    toggleBlockDetail,
    isBlockDetailMode,
  } = useWireframeMode();

  const { hasWireframeBlocks } = useWireframeBlocks();

  return {
    // modes
    setGlobalWireframeMode,
    setGlobalDesignMode,
    toggleBlockAndPreviewMode,
    toggleBlockDetailMode,
    setBlockDetailMode,
    resetBlockDetailMode,
    isBlocksMode,
    isPreviewMode,
    isBlockDetailMode,
    hasWireframeBlocks,
    handleDeselectWireframeBlock,
  };
};
