import { useCallback, useMemo } from 'react';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { formatWeightForUI, parseWeightFromUI } from '../../lib/weightParser';

export const useTypographyStyle = () => {
  const { focusedElement } = useElement();
  const { updateStyle } = useElementMutations();

  const {
    fontSizeValue,
    lineHeightValue,
    letterSpacingValue,
    fontWeightValue,
    fontFamilyValue,
    textAlignValue,
  } = useBoundVariableValue(focusedElement?.id);

  const update = useCallback((style) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, style);
  }, [focusedElement?.id, updateStyle]);

  const { displayValue: displayFontSizeValue } = useMemo(() => formatSizeForUI(fontSizeValue?.value), [fontSizeValue]);
  const { displayValue: displayLineHeightValue } = useMemo(() => formatSizeForUI(lineHeightValue?.value), [lineHeightValue]);
  const { displayValue: displayLetterSpacingValue } = useMemo(() => formatSizeForUI(letterSpacingValue?.value), [letterSpacingValue]);
  const { displayValue: displayFontWeightValue } = useMemo(() => formatWeightForUI(fontWeightValue?.value), [fontWeightValue]);

  const handleUpdateFontFamily = useCallback((value) =>
    update({ fontFamily: value }), [update]);

  const handleUpdateFontWeight = useCallback((value) =>
    update({ fontWeight: parseWeightFromUI(value) }), [update]);

  const handleUpdateFontSize = useCallback((value) =>
    update({ fontSize: parseSizeFromUI(value) }), [update]);

  const handleUpdateLineHeight = useCallback((value) =>
    update({ lineHeight: parseSizeFromUI(value) }), [update]);

  const handleUpdateLetterSpacing = useCallback((value) =>
    update({ letterSpacing: parseSizeFromUI(value) }), [update]);

  const handleUpdateTextAlign = useCallback((value) =>
    update({ textAlign: value }), [update]);

  return {
    fontFamily: fontFamilyValue?.value,
    fontWeight: displayFontWeightValue,
    textAlign: textAlignValue?.value,

    fontSize: displayFontSizeValue,
    lineHeight: displayLineHeightValue,
    letterSpacing: displayLetterSpacingValue,

    updateFontFamily: handleUpdateFontFamily,
    updateFontWeight: handleUpdateFontWeight,
    updateFontSize: handleUpdateFontSize,
    updateLineHeight: handleUpdateLineHeight,
    updateLetterSpacing: handleUpdateLetterSpacing,
    updateTextAlign: handleUpdateTextAlign,
  };
};
