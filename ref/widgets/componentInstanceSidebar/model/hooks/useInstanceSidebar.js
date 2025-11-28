import { useWireframeBlocks } from '../../../../entities/wireframeBlock';

export const useInstanceSidebar = () => {

  const { hasWireframeBlocks } = useWireframeBlocks();

  return {
    hasWireframeBlocks,
  };
};
