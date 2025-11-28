import { useUiDefaultEntity } from '@/features/uiControls/layerControl';
import { useUiDefaultEntitySelectors } from '@/shared/uiEditorDefaults/elements/model/hooks/useDefaultElementsSelectors';

export const useLayerControl = () => {

  const {
    allDefaultElements,
    divElement,
    paragraphElement
  } = useUiDefaultEntity();

  return {
    allDefaultElements,
    divElement,
    paragraphElement,

  };
};
