import { useCallback, useMemo } from 'react';
import { useElement, useElementMutations, STYLE_PROPERTIES, POSITION } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { POSITION_MODES } from '../constants/positionMode';

export const useChangeProperty = () => {
  const { focusedElement } = useElement();
  const { positionValue } = useBoundVariableValue(focusedElement?.id);
  const { updateStyle, removeStyle } = useElementMutations();

  // console.log(' [useChangeProperty] focusedElement', JSON.stringify(focusedElement?.properties.style, null, 2))

  const currentMode = useMemo(() => {
    if ( positionValue?.value === POSITION.relative)
    {return POSITION_MODES.AUTO;}
    if (positionValue?.value === POSITION.absolute)
    {return POSITION_MODES.FREE;}
    if (positionValue?.value === POSITION.fixed)
    {return POSITION_MODES.FIXED;}
    if (positionValue?.value === POSITION.sticky)
    {return POSITION_MODES.STICKY;}
    return POSITION_MODES.STATIC;
  }, [positionValue?.value]);

  const handleChangeMode = useCallback((mode) => {
    if (!focusedElement?.id) {return;}
    switch (mode) {
    case POSITION_MODES.STATIC:
      updateStyle(focusedElement.id, { [STYLE_PROPERTIES.position]: POSITION.static });
      break;
    case POSITION_MODES.AUTO:
      updateStyle(focusedElement.id, { [STYLE_PROPERTIES.position]: POSITION.relative });
      break;
    case POSITION_MODES.FREE:
      updateStyle(focusedElement.id, { [STYLE_PROPERTIES.position]: POSITION.absolute });
      break;
    case POSITION_MODES.FIXED:
      updateStyle(focusedElement.id, { [STYLE_PROPERTIES.position]: POSITION.fixed });
      break;
    case POSITION_MODES.STICKY:
      updateStyle(focusedElement.id, { [STYLE_PROPERTIES.position]: POSITION.sticky });
      break;
    default:
      break;
    }
  }, [focusedElement?.id, updateStyle]);

  return {
    currentMode,
    changePositionMode: handleChangeMode,
    POSITION_MODES,
  };
};
