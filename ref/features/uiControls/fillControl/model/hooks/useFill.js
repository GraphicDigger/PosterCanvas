import { useCallback, useMemo } from 'react';
import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import {
  formatColorForUI,
  parseColorFromUI,
  hexToRgb,
  hexToHsl,
  rgbToHex,
  rgbToHsl,
  hsbToHex,
  hsbToRgb,
} from '@/shared/lib';
import { COLOR_FORMAT } from '@/shared/constants';
import { useFocusEntity } from '@/entities/uiFocus';


export const useFill = () => {

  const { focusEntity } = useFocusEntity();
  const { updateStyle, removeStyle } = useElementMutations();
  const { backgroundColorValue, backgroundImageValue } = useBoundVariableValue(focusEntity?.id);

  const {
    color: displayColor,
    opacity,
    format: originalFormat,
  } = formatColorForUI(backgroundColorValue?.value);

  const isHexFormat = useMemo(() => originalFormat?.includes(COLOR_FORMAT.HEX), [originalFormat]);
  const isRgbFormat = useMemo(() => originalFormat?.includes(COLOR_FORMAT.RGB), [originalFormat]);
  const isHsbFormat = useMemo(() => originalFormat?.includes(COLOR_FORMAT.HSB), [originalFormat]);

  const currentFormat = useMemo(() => {
    if (isHexFormat) { return 'HEX'; }
    if (isRgbFormat) { return 'RGB'; }
    if (isHsbFormat) { return 'HSB'; }
  }, [isHexFormat, isRgbFormat, isHsbFormat]);

  const colorHexValue = useMemo(() => {
    if (isHexFormat) {return displayColor;}
    if (isRgbFormat && displayColor) {return rgbToHex(displayColor.r, displayColor.g, displayColor.b);}
    if (isHsbFormat && displayColor) {return hsbToHex(displayColor.h, displayColor.s, displayColor.b);}
    return displayColor;
  }, [isHexFormat, isRgbFormat, isHsbFormat, displayColor, rgbToHex, hsbToHex]);

  const handleUpdateColorFormat = useCallback((format) => {
    if (format === 'HEX') {
      if (currentFormat === 'HEX') {return;}
      if (currentFormat === 'RGB' && displayColor) {
        const hex = rgbToHex(displayColor.r, displayColor.g, displayColor.b);
        updateStyle(focusEntity?.id, { backgroundColor: hex });
      }
      if (currentFormat === 'HSB' && displayColor) {
        const hex = hsbToHex(displayColor.h, displayColor.s, displayColor.b);
        // console.log('[ useFill: HSL -> HEX]', hex)
        updateStyle(focusEntity?.id, { backgroundColor: hex });
      }
    }
    if (format === 'RGB') {
      if (currentFormat === 'RGB') {return;}
      if (currentFormat === 'HEX') {
        const rgb = hexToRgb(displayColor);
        updateStyle(focusEntity?.id, { backgroundColor: rgb.str });
      }
      if (currentFormat === 'HSB' && displayColor) {
        const rgb = hsbToRgb(displayColor.h, displayColor.s, displayColor.b);
        // console.log('[ useFill: HSL -> RGB]', rgb)
        updateStyle(focusEntity?.id, { backgroundColor: rgb.str });
      }
    }
    if (format === 'HSB') {
      if (currentFormat === 'HSB') {return;}
      if (currentFormat === 'HEX') {
        const hsl = hexToHsl(displayColor);
        // console.log('[ useFill: HEX -> HSL]', hsl)
        updateStyle(focusEntity?.id, { backgroundColor: hsl.str });
      }
      if (currentFormat === 'RGB' && displayColor) {
        const hsl = rgbToHsl(displayColor.r, displayColor.g, displayColor.b);
        // console.log('[ useFill: RGB -> HSL]', hsl)
        updateStyle(focusEntity?.id, { backgroundColor: hsl.str });
      }
    }
  }, [focusEntity?.id, updateStyle, displayColor]);

  const handleUpdateBackgroundColor = useCallback((displayValue) => {
    if (!focusEntity?.id) {return;}

    // if it's rgb object
    if (typeof displayValue === 'object' && displayValue.r !== undefined) {
      const processedValue = parseColorFromUI(displayValue);
      updateStyle(focusEntity.id, {
        backgroundColor: processedValue,
      });
      return;
    }

    // if it's hsb object
    if (typeof displayValue === 'object' && displayValue.h !== undefined) {
      const processedValue = parseColorFromUI(displayValue);
      console.log('[ useFill: HSB -> HSL]', processedValue);
      updateStyle(focusEntity.id, {
        backgroundColor: processedValue,
      });
      return;
    }

    // if it's string
    const trimmed = typeof displayValue === 'string' ? displayValue.trim() : '';
    const processedValue = trimmed || 'transparent';

    updateStyle(focusEntity.id, {
      backgroundColor: processedValue,
    });
  }, [focusEntity?.id, updateStyle, rgbToHex]);


  // const handleUpdateBackgroundColor = useCallback((value) => {
  //     updateStyle(focusEntity?.id, { backgroundColor: value })
  // }, [focusEntity?.id, updateStyle])

  const handleAddBackgroundColor = useCallback(() => {
    updateStyle(focusEntity?.id, { backgroundColor: '#D9D9D9' });
  }, [focusEntity?.id, updateStyle]);

  return {
    colorHexValue,

    currentFormat,

    isHexFormat,
    isRgbFormat,
    isHsbFormat,

    displayColor,
    opacity,

    backgroundColorValue,
    backgroundImageValue,

    updateBackgroundColor: handleUpdateBackgroundColor,
    addBackgroundColor: handleAddBackgroundColor,

    updateColorFormat: handleUpdateColorFormat,
  };

};
