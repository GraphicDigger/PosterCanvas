import { useCallback, useMemo } from 'react';
import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { formatSizeForUI, parseSizeFromUI } from '../../../../../shared/lib';
import { STYLE_PROPERTIES, TRANSFORM } from '../../../../../entities/uiElement';

export const useAbsoluteProperty = () => {

  const { focusedElement } = useElement();
  const { updateStyle, removeStyle } = useElementMutations();
  const {
    topValue,
    rightValue,
    bottomValue,
    leftValue,
    transformValue,
  } = useBoundVariableValue(focusedElement?.id);

  const transform = useMemo(() => {
    const result = {
      translateX: false,
      translateY: false,
      translate: false,
    };
    if (!transformValue?.value) {return result;}
    if (transformValue.value.includes('translateX')) {result.translateX = true;}
    if (transformValue.value.includes('translateY')) {result.translateY = true;}
    if (transformValue.value.includes('translate')) {result.translate = true;}
    return result;
  }, [transformValue]);

  const isHorizontalCenter = useMemo(() => transform.translateX && leftValue?.value === '50%', [transform, leftValue]);
  const isVerticalCenter = useMemo(() => transform.translateY && topValue?.value === '50%', [transform, topValue]);
  const isCenter = useMemo(() => transform.translate && leftValue?.value === '50%' && topValue?.value === '50%', [transform, leftValue, topValue]);


  //helpers
  const update = useCallback((property) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, property);
  }, [focusedElement?.id, updateStyle]);

  const remove = useCallback((arrayProperties) => {
    if (!focusedElement?.id) {return;}
    removeStyle(focusedElement.id, arrayProperties);
  }, [focusedElement?.id, removeStyle]);

  const clearProperties = useCallback(() => {
    remove([STYLE_PROPERTIES.top, STYLE_PROPERTIES.right, STYLE_PROPERTIES.bottom, STYLE_PROPERTIES.left, STYLE_PROPERTIES.transform]);
  }, [remove]);

  const removeVerticalCenter = useCallback(() => {
    const propsToRemove = [STYLE_PROPERTIES.top];
    if (isCenter) {
      update({
        [STYLE_PROPERTIES.transform]: `${TRANSFORM.translateX}(-50%)`,
      });
    } else {
      propsToRemove.push(STYLE_PROPERTIES.transform);
    }
    remove(propsToRemove);
  }, [isCenter, update, remove]);

  const removeHorizontalCenter = useCallback(() => {
    const propsToRemove = [STYLE_PROPERTIES.left];
    if (isCenter) {
      update({
        [STYLE_PROPERTIES.transform]: `${TRANSFORM.translateY}(-50%)`,
      });
    } else {
      propsToRemove.push(STYLE_PROPERTIES.transform);
    }
    remove(propsToRemove);
  }, [isCenter, update, remove]);

  const setCenter = useCallback(() => {
    update({
      [STYLE_PROPERTIES.transform]: `${TRANSFORM.translate}(-50%, -50%)`,
      [STYLE_PROPERTIES.top]: '50%',
      [STYLE_PROPERTIES.left]: '50%',
    });
  }, [update]);

  const setVerticalCenter = useCallback(() => {
    update({
      [STYLE_PROPERTIES.transform]: `${TRANSFORM.translateY}(-50%)`,
      [STYLE_PROPERTIES.top]: '50%',
    });
  }, [update]);

  const setHorizontalCenter = useCallback(() => {
    update({
      [STYLE_PROPERTIES.transform]: `${TRANSFORM.translateX}(-50%)`,
      [STYLE_PROPERTIES.left]: '50%',
    });
  }, [update]);


  //update handlers
  const handleUpdateTopValue = useCallback((value) => {
    if (isVerticalCenter) {
      removeVerticalCenter();
    }
    update({ [STYLE_PROPERTIES.top]: parseSizeFromUI(value) });
  }, [update, isVerticalCenter, removeVerticalCenter]);

  const handleUpdateRightValue = useCallback((value) => {
    if (isHorizontalCenter) {
      removeHorizontalCenter();
    }
    update({ [STYLE_PROPERTIES.right]: parseSizeFromUI(value) });
  }, [update, isHorizontalCenter, removeHorizontalCenter]);

  const handleUpdateBottomValue = useCallback((value) => {
    if (isVerticalCenter) {
      removeVerticalCenter();
    }
    update({ [STYLE_PROPERTIES.bottom]: parseSizeFromUI(value) });
  }, [update, isVerticalCenter, removeVerticalCenter]);

  const handleUpdateLeftValue = useCallback((value) => {
    if (isHorizontalCenter) {
      removeHorizontalCenter();
    }
    update({ [STYLE_PROPERTIES.left]: parseSizeFromUI(value) });
  }, [update, isHorizontalCenter, removeHorizontalCenter]);


  //toggle handlers
  const handleTogglePosition = useCallback((propertyKey) => {
    const keyTop = propertyKey === STYLE_PROPERTIES.top;
    const keyBottom = propertyKey === STYLE_PROPERTIES.bottom;
    const keyLeft = propertyKey === STYLE_PROPERTIES.left;
    const keyRight = propertyKey === STYLE_PROPERTIES.right;
    const keyVerticalCenter = propertyKey === TRANSFORM.translateY;
    const keyHorizontalCenter = propertyKey === TRANSFORM.translateX;

    if (keyVerticalCenter) {
      if (isVerticalCenter || isCenter) {
        removeVerticalCenter();
      } else if (isHorizontalCenter) {
        setCenter();
        remove([STYLE_PROPERTIES.bottom]);
      } else {
        setVerticalCenter();
        remove([STYLE_PROPERTIES.bottom]);
      }
    }

    if (keyHorizontalCenter) {
      if (isHorizontalCenter || isCenter) {
        removeHorizontalCenter();
      } else if (isVerticalCenter) {
        setCenter();
        remove([STYLE_PROPERTIES.right]);
      } else {
        setHorizontalCenter();
        remove([STYLE_PROPERTIES.right]);
      }
    }

    if (keyTop) {
      const hasTop = Boolean(topValue?.value);
      if (hasTop) {
        if (isVerticalCenter || isCenter) {
          removeVerticalCenter();
          update({ [STYLE_PROPERTIES.top]: parseSizeFromUI(0) });
        } else {
          remove([STYLE_PROPERTIES.top]);
        }
      } else {
        if (isVerticalCenter || isCenter) {removeVerticalCenter();}
        update({ [STYLE_PROPERTIES.top]: parseSizeFromUI(0) });
      }
    }

    if (keyBottom) {
      const hasBottom = Boolean(bottomValue?.value);
      if (hasBottom) {
        if (isVerticalCenter || isCenter) {
          removeVerticalCenter();
          update({ [STYLE_PROPERTIES.bottom]: parseSizeFromUI(0) });
        } else {
          remove([STYLE_PROPERTIES.bottom]);
        }
      } else {
        if (isVerticalCenter || isCenter) {removeVerticalCenter();}
        update({ [STYLE_PROPERTIES.bottom]: parseSizeFromUI(0) });
      }
    }

    if (keyLeft) {
      const hasLeft = Boolean(leftValue?.value);
      if (hasLeft) {
        if (isHorizontalCenter || isCenter) {
          removeHorizontalCenter();
          update({ [STYLE_PROPERTIES.left]: parseSizeFromUI(0) });
        } else {
          remove([STYLE_PROPERTIES.left]);
        }
      } else {
        if (isHorizontalCenter || isCenter) {removeHorizontalCenter();}
        update({ [STYLE_PROPERTIES.left]: parseSizeFromUI(0) });
      }
    }

    if (keyRight) {
      const hasRight = Boolean(rightValue?.value);
      if (hasRight) {
        if (isHorizontalCenter || isCenter) {
          removeHorizontalCenter();
          update({ [STYLE_PROPERTIES.right]: parseSizeFromUI(0) });
        } else {
          remove([STYLE_PROPERTIES.right]);
        }
      } else {
        if (isHorizontalCenter || isCenter) {removeHorizontalCenter();}
        update({ [STYLE_PROPERTIES.right]: parseSizeFromUI(0) });
      }
    }

  }, [
    isVerticalCenter,
    isHorizontalCenter,
    isCenter,
    update,
    remove,
    removeVerticalCenter,
    removeHorizontalCenter,
    setCenter,
    setVerticalCenter,
    setHorizontalCenter,
  ]);

  const {
    displayValue: displayTopValue,
    placeholder: topPlaceholder,
  } = useMemo(() => formatSizeForUI(topValue?.value), [topValue]);
  const {
    displayValue: displayRightValue,
    placeholder: rightPlaceholder,
  } = useMemo(() => formatSizeForUI(rightValue?.value), [rightValue]);
  const {
    displayValue: displayBottomValue,
    placeholder: bottomPlaceholder,
  } = useMemo(() => formatSizeForUI(bottomValue?.value), [bottomValue]);
  const {
    displayValue: displayLeftValue,
    placeholder: leftPlaceholder,
  } = useMemo(() => formatSizeForUI(leftValue?.value), [leftValue]);

  return {
    top: {
      value: topValue,
      displayValue: displayTopValue,
      placeholder: topPlaceholder,
    },
    right: {
      value: rightValue,
      displayValue: displayRightValue,
      placeholder: rightPlaceholder,
    },
    bottom: {
      value: bottomValue,
      displayValue: displayBottomValue,
      placeholder: bottomPlaceholder,
    },
    left: {
      value: leftValue,
      displayValue: displayLeftValue,
      placeholder: leftPlaceholder,
    },

    isVerticalCenter,
    isHorizontalCenter,
    isCenter,

    clearProperties,

    togglePosition: handleTogglePosition,

    updateTopValue: handleUpdateTopValue,
    updateRightValue: handleUpdateRightValue,
    updateBottomValue: handleUpdateBottomValue,
    updateLeftValue: handleUpdateLeftValue,
  };
};
