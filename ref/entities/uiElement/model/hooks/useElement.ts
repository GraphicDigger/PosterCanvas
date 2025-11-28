import { useSelector } from 'react-redux';
import { useFocusEntity } from '../../../uiFocus';
import { useScreens } from '../../../uiScreen';
import {
  selectElementBoundVariablesByElementId,
  selectElementById,
  selectElementBoundTypographyPresetByElementId,
  selectElementAttributesByElementId,
  selectElementCssClassesByElementId,
  selectCanvasByScreenId,
  selectAllElements,
} from '../store';

interface Props {
  id?: string | null;
}

export const useElement = (props: Props = {}) => {

  const elementId = props?.id ?? null;

  const { focusEntity } = useFocusEntity();
  const { selectedScreen } = useScreens();

  const allElements = useSelector(selectAllElements);

  const element = useSelector(state => selectElementById(state, elementId));

  const focusedElement = useSelector(state => selectElementById(state, focusEntity?.id));
  // const isFocusedElement = focusEntity.kind === ENTITY_KINDS.ELEMENT;

  const selectedScreenCanvas = useSelector(state => selectCanvasByScreenId(state, selectedScreen?.id))

  const elementBoundVariables = useSelector(state => selectElementBoundVariablesByElementId(state, focusedElement?.id));
  const elementBoundTypographyPreset = useSelector(state => selectElementBoundTypographyPresetByElementId(state, focusedElement?.id));

  const elementAttributes = useSelector(state => selectElementAttributesByElementId(state, focusedElement?.id));
  const elementCssClasses = useSelector(state => selectElementCssClassesByElementId(state, focusedElement?.id));

  return {

    allElements,

    element,
    focusedElement,
    // isFocusedElement,
    focusedElementId: focusEntity?.id,

    selectedScreenCanvas,

    elementBoundVariables,
    elementBoundTypographyPreset,

    elementAttributes,
    elementCssClasses,

  };
};
