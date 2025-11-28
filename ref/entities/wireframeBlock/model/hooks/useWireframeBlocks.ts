import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  makeSelectWireframeBlocksByScreenId,
  selectWireframeBlocks,
  selectSelectedWireframeBlockId,
  selectSelectedWireframeBlock,
} from '../store/selectors';
import { useScreens } from '../../../uiScreen';


interface Props {
  screenId?: string;
}

export const useWireframeBlocks = ({ screenId }: Props = {}) => {

  const { selectedScreen } = useScreens();
  const selectedWireframeBlockId = useSelector(selectSelectedWireframeBlockId);
  const selectedWireframeBlock = useSelector(selectSelectedWireframeBlock);

  const screenIdToUse = screenId || selectedScreen?.id;
  const screenWireframeBlocks = useSelector(makeSelectWireframeBlocksByScreenId(screenIdToUse)) || [];

  const wireframeBlocks = useSelector(selectWireframeBlocks);
  const hasWireframeBlocks = useMemo(() => wireframeBlocks?.length > 0, [wireframeBlocks]);

  return {
    wireframeBlocks,
    screenWireframeBlocks,

    hasWireframeBlocks,

    selectedWireframeBlockId,
    selectedWireframeBlock,
  };
};

