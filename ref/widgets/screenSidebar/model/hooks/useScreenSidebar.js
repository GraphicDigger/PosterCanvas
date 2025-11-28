import { useWireframeBlocks } from '../../../../entities/wireframeBlock';
import { useScreens } from '../../../../entities/uiScreen';

export const useScreenSidebar = () => {

  const { selectedScreen } = useScreens();
  const { hasWireframeBlocks } = useWireframeBlocks(selectedScreen?.id);

  return {
    hasWireframeBlocks,
  };
};
