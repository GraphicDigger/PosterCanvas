import { useCallback, useMemo } from 'react';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { useElement, useElementMutations, STYLE_PROPERTIES, BORDER_PROPERTIES } from '../../../../../entities/uiElement';
import { parseBorder, formatBorder } from '../../lib';

export const useBorder = () => {

  const { focusedElement } = useElement();
  const { updateStyle, removeStyle } = useElementMutations();
  const {
    borderValue,
    borderTopValue,
    borderBottomValue,
    borderLeftValue,
    borderRightValue,

    borderWidthValue,
    borderTopWidthValue,
    borderBottomWidthValue,
    borderLeftWidthValue,
    borderRightWidthValue,

    borderColorValue,
    borderTopColorValue,
    borderBottomColorValue,
    borderLeftColorValue,
    borderRightColorValue,
  } = useBoundVariableValue(focusedElement?.id);

  const hasBorder = useMemo(() => {
    return borderValue?.value;
  }, [borderValue?.value]);

  const hasSeparateBorder = useMemo(() => {
    return borderTopWidthValue || borderBottomWidthValue || borderLeftWidthValue || borderRightWidthValue;
  }, [borderTopWidthValue, borderBottomWidthValue, borderLeftWidthValue, borderRightWidthValue]);

  const parsedBorder = useMemo(() => parseBorder(borderValue?.value), [borderValue?.value]); // parse: "1px solid #000000" -> {width: "1px", style: "solid", color: "#000000"}
  const {
    displayValue: displayBorderWidthValue,
    placeholder: borderWidthPlaceholder,
    isPx: isBorderWidthPx,
  } = useMemo(() => formatSizeForUI(parsedBorder?.width), [parsedBorder?.width]);

  const {
    displayValue: displayBorderTopWidthValue,
    placeholder: borderTopWidthPlaceholder,
    isPx: isBorderTopWidthPx,
  } = useMemo(() => formatSizeForUI(borderTopWidthValue?.value), [borderTopWidthValue?.value]);

  const {
    displayValue: displayBorderBottomWidthValue,
    placeholder: borderBottomWidthPlaceholder,
    isPx: isBorderBottomWidthPx,
  } = useMemo(() => formatSizeForUI(borderBottomWidthValue?.value), [borderBottomWidthValue?.value]);

  const {
    displayValue: displayBorderLeftWidthValue,
    placeholder: borderLeftWidthPlaceholder,
    isPx: isBorderLeftWidthPx,
  } = useMemo(() => formatSizeForUI(borderLeftWidthValue?.value), [borderLeftWidthValue?.value]);

  const {
    displayValue: displayBorderRightWidthValue,
    placeholder: borderRightWidthPlaceholder,
    isPx: isBorderRightWidthPx,
  } = useMemo(() => formatSizeForUI(borderRightWidthValue?.value), [borderRightWidthValue?.value]);

  const styler = useCallback((style) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, style);
  }, [focusedElement?.id, updateStyle]);

  const removeBorder = useCallback(() => {
    if (!focusedElement?.id) {return;}
    removeStyle(focusedElement.id, BORDER_PROPERTIES);
  }, [focusedElement?.id, removeStyle]);

  const addBorder = useCallback(() => {
    styler({ border: '1px solid #000000' });
  }, [styler]);

  const updateBorderWidth = useCallback((value) => {
    const currentBorder = parsedBorder || { width: null, style: 'solid', color: '#000000' };
    const newBorder = {
      ...currentBorder,
      width: parseSizeFromUI(value),
    };

    const formattedBorder = formatBorder(newBorder);
    if (formattedBorder) {
      styler({ border: formattedBorder });
    }
  }, [styler, parsedBorder]);

  const updateBorderStyle = useCallback((value) => {
    const currentBorder = parsedBorder || { width: '1px', style: null, color: '#000000' };
    const newBorder = {
      ...currentBorder,
      style: value,
    };
    const formattedBorder = formatBorder(newBorder);
    if (formattedBorder) {
      styler({ border: formattedBorder });
    }
  }, [styler, parsedBorder]);

  const updateBorderColor = useCallback((value) => {
    const currentBorder = parsedBorder || { width: '1px', style: 'solid', color: null };

    const newBorder = {
      ...currentBorder,
      color: value || null,
    };

    const formattedBorder = formatBorder(newBorder);
    if (formattedBorder) {
      styler({ border: formattedBorder });
    }
  }, [styler, parsedBorder]);

  const updateBorderTopWidth = useCallback((value) => {
    styler({ borderTopWidth: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateBorderBottomWidth = useCallback((value) => {
    styler({ borderBottomWidth: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateBorderLeftWidth = useCallback((value) => {
    styler({ borderLeftWidth: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const updateBorderRightWidth = useCallback((value) => {
    styler({ borderRightWidth: parseSizeFromUI(value) || '0px' });
  }, [styler]);

  const separateBorder = useCallback(() => {
    if (hasSeparateBorder) {
      // Удаляем отдельные свойства ширины border
      removeStyle(focusedElement.id, [
        STYLE_PROPERTIES.borderTopWidth,
        STYLE_PROPERTIES.borderBottomWidth,
        STYLE_PROPERTIES.borderLeftWidth,
        STYLE_PROPERTIES.borderRightWidth,
      ]);
    } else {
      const currentWidth = parsedBorder?.width || '1px';
      styler({
        [STYLE_PROPERTIES.borderTopWidth]: currentWidth,
        [STYLE_PROPERTIES.borderBottomWidth]: currentWidth,
        [STYLE_PROPERTIES.borderLeftWidth]: currentWidth,
        [STYLE_PROPERTIES.borderRightWidth]: currentWidth,
      });
    }
  }, [
    focusedElement?.id,
    hasSeparateBorder,
    borderValue?.value,
    parsedBorder?.width,
    removeStyle,
    styler,
  ]);


  return {
    hasBorder,
    hasSeparateBorder,

    border: {
      width: displayBorderWidthValue,
      color: parsedBorder?.color,
      style: parsedBorder?.style,
    },
    borderTopWidth: displayBorderTopWidthValue,
    borderBottomWidth: displayBorderBottomWidthValue,
    borderLeftWidth: displayBorderLeftWidthValue,
    borderRightWidth: displayBorderRightWidthValue,

    displayBorderWidthValue,
    displayBorderTopWidthValue,
    displayBorderBottomWidthValue,
    displayBorderLeftWidthValue,
    displayBorderRightWidthValue,

    styler,
    separateBorder,

    addBorder,
    removeBorder,

    updateBorderWidth,
    updateBorderStyle,
    updateBorderColor,

    updateBorderTopWidth,
    updateBorderBottomWidth,
    updateBorderLeftWidth,
    updateBorderRightWidth,
  };
};
