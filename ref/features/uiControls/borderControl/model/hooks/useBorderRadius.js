import { useCallback, useMemo } from 'react';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { useElement, useElementMutations, STYLE_PROPERTIES, BORDER_RADIUS_PROPERTIES } from '../../../../../entities/uiElement';
import { parseBorder } from '../../lib';
import { useBorder } from './useBorder';

export const useBorderRadius = () => {

  const { focusedElement } = useElement();
  const { updateStyle, removeStyle } = useElementMutations();
  const { styler } = useBorder();
  const {
    borderRadiusValue,
    borderTopLeftRadiusValue,
    borderTopRightRadiusValue,
    borderBottomLeftRadiusValue,
    borderBottomRightRadiusValue,
  } = useBoundVariableValue(focusedElement?.id);

  const hasBorderRadius = useMemo(() => {
    return borderRadiusValue?.value;
  }, [borderRadiusValue?.value]);

  const hasSeparateBorderRadius = useMemo(() => {
    return borderTopLeftRadiusValue || borderTopRightRadiusValue || borderBottomLeftRadiusValue || borderBottomRightRadiusValue;
  }, [borderTopLeftRadiusValue, borderTopRightRadiusValue, borderBottomLeftRadiusValue, borderBottomRightRadiusValue]);

  const { displayValue: displayBorderRadiusValue } = useMemo(() => formatSizeForUI(borderRadiusValue?.value), [borderRadiusValue?.value]);
  const { displayValue: displayBorderTopLeftRadiusValue } = useMemo(() => formatSizeForUI(borderTopLeftRadiusValue?.value), [borderTopLeftRadiusValue?.value]);
  const { displayValue: displayBorderTopRightRadiusValue } = useMemo(() => formatSizeForUI(borderTopRightRadiusValue?.value), [borderTopRightRadiusValue?.value]);
  const { displayValue: displayBorderBottomLeftRadiusValue } = useMemo(() => formatSizeForUI(borderBottomLeftRadiusValue?.value), [borderBottomLeftRadiusValue?.value]);
  const { displayValue: displayBorderBottomRightRadiusValue } = useMemo(() => formatSizeForUI(borderBottomRightRadiusValue?.value), [borderBottomRightRadiusValue?.value]);

  const addBorderRadius = useCallback(() => {
    styler({ borderRadius: '4px' });
  }, [styler]);

  const updateBorderRadius = useCallback((value) => {
    styler({ [STYLE_PROPERTIES.borderRadius]: parseSizeFromUI(value) });
  }, [styler]);

  const updateTopLeftRadius = useCallback((value) => {
    styler({ [STYLE_PROPERTIES.borderTopLeftRadius]: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateTopRightRadius = useCallback((value) => {
    styler({ [STYLE_PROPERTIES.borderTopRightRadius]: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateBottomLeftRadius = useCallback((value) => {
    styler({ [STYLE_PROPERTIES.borderBottomLeftRadius]: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateBorderBottomRightRadius = useCallback((value) => {
    styler({ [STYLE_PROPERTIES.borderBottomRightRadius]: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const removeBorderRadius = useCallback(() => {
    if (!focusedElement?.id) {return;}
    removeStyle(focusedElement.id, BORDER_RADIUS_PROPERTIES);
  }, [focusedElement?.id, removeStyle]);

  const separateBorderRadius = useCallback(() => {
    if (hasSeparateBorderRadius) {
      removeStyle(focusedElement.id, [
        STYLE_PROPERTIES.borderTopLeftRadius,
        STYLE_PROPERTIES.borderTopRightRadius,
        STYLE_PROPERTIES.borderBottomLeftRadius,
        STYLE_PROPERTIES.borderBottomRightRadius,
      ]);
      // updateBorderRadius(borderRadiusValue?.value)
    } else {
      updateStyle(focusedElement.id, {
        [STYLE_PROPERTIES.borderTopLeftRadius]: borderRadiusValue?.value,
        [STYLE_PROPERTIES.borderTopRightRadius]: borderRadiusValue?.value,
        [STYLE_PROPERTIES.borderBottomLeftRadius]: borderRadiusValue?.value,
        [STYLE_PROPERTIES.borderBottomRightRadius]: borderRadiusValue?.value,
      });
    }
  }, [
    focusedElement?.id,
    hasSeparateBorderRadius,
    removeStyle,
    updateStyle,
    updateBorderRadius,
    borderRadiusValue?.value,
  ]);

  // console.log('[useBorderRadius] borderRadiusValue', borderRadiusValue)
  // console.log('[useBorderRadius] displayBorderRadiusValue', displayBorderRadiusValue)

  return {
    hasBorderRadius,
    hasSeparateBorderRadius,

    borderRadius: displayBorderRadiusValue,
    borderTopLeftRadius: displayBorderTopLeftRadiusValue,
    borderTopRightRadius: displayBorderTopRightRadiusValue,
    borderBottomLeftRadius: displayBorderBottomLeftRadiusValue,
    borderBottomRightRadius: displayBorderBottomRightRadiusValue,

    separateBorderRadius,

    addBorderRadius,
    updateBorderRadius,
    removeBorderRadius,
    updateTopLeftRadius,
    updateTopRightRadius,
    updateBottomLeftRadius,
    updateBorderBottomRightRadius,
  };
};
