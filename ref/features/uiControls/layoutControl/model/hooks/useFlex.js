import { useMemo, useCallback } from 'react';
import { useBoundVariableValue } from '@/entities/binding';
import { useElement, useElementMutations, DISPLAY_PROPERTIES, DIRECTION, WRAP, STYLE_PROPERTIES, ALIGN } from '@/entities/uiElement';
import { useFocusEntity } from '@/entities/uiFocus';

export const useFlex = () => {

  const { focusEntity } = useFocusEntity();
  const {
    displayValue,
    flexDirectionValue,
    flexWrapValue,
    isAlignItemsStretch,
    isFlexDirectionColumn,
    justifyContentValue,
    alignItemsValue,
    gapValue,
    gapRowValue,
    gapColumnValue,
    paddingValue,
    paddingTopValue,
    paddingRightValue,
    paddingBottomValue,
    paddingLeftValue,
    marginValue,
    marginTopValue,
    marginRightValue,
    marginBottomValue,
    marginLeftValue,
  } = useBoundVariableValue(focusEntity?.id);

  const { updateStyle, removeStyle } = useElementMutations();

  const isDisplayFlex = displayValue?.value === DISPLAY_PROPERTIES.flex;

  const currentMode = useMemo(() => {
    return displayValue?.value === DISPLAY_PROPERTIES.block
      ? DISPLAY_PROPERTIES.block
      : flexWrapValue?.value ? flexWrapValue?.value : flexDirectionValue?.value;
  }, [displayValue?.value, flexDirectionValue?.value, flexWrapValue?.value]);

  const handleChangeMode = (mode) => {
    switch (mode) {
      case DISPLAY_PROPERTIES.block:
        updateStyle(focusEntity?.id, { [STYLE_PROPERTIES.display]: DISPLAY_PROPERTIES.block });
        break;
      case DIRECTION.row:
        removeStyle(focusEntity?.id, [STYLE_PROPERTIES.flexWrap, STYLE_PROPERTIES.gapRow, STYLE_PROPERTIES.gapColumn]);
        updateStyle(focusEntity?.id, {
          [STYLE_PROPERTIES.display]: DISPLAY_PROPERTIES.flex,
          [STYLE_PROPERTIES.flexDirection]: DIRECTION.row,
        });
        break;
      case DIRECTION.column:
        removeStyle(focusEntity?.id, [STYLE_PROPERTIES.flexWrap, STYLE_PROPERTIES.gapRow, STYLE_PROPERTIES.gapColumn]);
        updateStyle(focusEntity?.id, {
          [STYLE_PROPERTIES.display]: DISPLAY_PROPERTIES.flex,
          [STYLE_PROPERTIES.flexDirection]: DIRECTION.column,
        });
        break;
      case WRAP.wrap:
        updateStyle(focusEntity?.id, {
          [STYLE_PROPERTIES.display]: DISPLAY_PROPERTIES.flex,
          [STYLE_PROPERTIES.flexDirection]: DIRECTION.row,
          [STYLE_PROPERTIES.flexWrap]: WRAP.wrap,
          [STYLE_PROPERTIES.gapRow]: '4px',
          [STYLE_PROPERTIES.gapColumn]: '4px',
        });
        break;
    }
  };

  const handleAlignItemsSwitch =  useCallback(() => {
    const align = isAlignItemsStretch ? ALIGN.start : ALIGN.stretch;
    updateStyle(focusEntity?.id, {
      [STYLE_PROPERTIES.alignItems]: align,
    });
  }, [focusEntity?.id, isAlignItemsStretch]);


  return {
    currentMode,
    changeMode: handleChangeMode,
    isDisplayFlex,

    focusEntity,

    updateStyle,
    removeStyle,

    alignItemsSwitch: handleAlignItemsSwitch,
    isAlignItemsStretch,
    isFlexDirectionColumn,

    displayValue,
    flexDirectionValue,
    flexWrapValue,
    justifyContentValue,
    alignItemsValue,

    paddingValue,
    paddingTopValue,
    paddingRightValue,
    paddingBottomValue,
    paddingLeftValue,
    marginValue,
    marginTopValue,
    marginRightValue,
    marginBottomValue,
    marginLeftValue,
  };
};
