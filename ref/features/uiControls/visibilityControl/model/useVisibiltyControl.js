import { useCallback } from 'react';
import { useBoundVariableValue } from '../../../../entities/binding';
import { useElement, useElementMutations, STYLE_PROPERTIES, DISPLAY_PROPERTIES } from '../../../../entities/uiElement';
import { useInstanceMutation, useInstances } from '../../../../entities/uiInstance';


export const useVisibiltyControl = () => {

  const { focusedElement } = useElement();
  const { focusedInstance } = useInstances();
  const { updateStyle } = useElementMutations();
  const { updateInstanceStyle } = useInstanceMutation();
  const { displayValue: elementDisplayValue } = useBoundVariableValue(focusedElement?.id);
  const { displayValue: instanceDisplayValue } = useBoundVariableValue(focusedInstance?.id);

  const elementIsVisible = elementDisplayValue?.value !== DISPLAY_PROPERTIES.none;
  const instanceIsVisible = instanceDisplayValue?.value !== DISPLAY_PROPERTIES.none;

  const handleToggleVisibility = useCallback(() => {
    if (focusedInstance) {
      updateInstanceStyle(focusedInstance.id, {
        [STYLE_PROPERTIES.display]:
                    instanceIsVisible
                      ? DISPLAY_PROPERTIES.none
                      : DISPLAY_PROPERTIES.contents,
      });
    }
    else {
      updateStyle(focusedElement?.id, {
        [STYLE_PROPERTIES.display]:
                    elementIsVisible
                      ? DISPLAY_PROPERTIES.none
                      : DISPLAY_PROPERTIES.flex,
      });
    }
  }, [
    focusedElement?.id,
    focusedInstance?.id,
    instanceIsVisible,
    elementIsVisible,
    updateStyle,
    updateInstanceStyle,
  ]);

  return {
    elementDisplayValue,
    instanceDisplayValue,
    elementIsVisible,
    instanceIsVisible,

    isVisible: focusedInstance ? instanceIsVisible : elementIsVisible,
    displayValue: focusedInstance ? instanceDisplayValue : elementDisplayValue,
    toggleVisibility: handleToggleVisibility,
  };
};
