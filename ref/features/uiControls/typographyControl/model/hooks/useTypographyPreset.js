import { useCallback, useMemo } from 'react';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { formatWeightForUI, parseWeightFromUI } from '../../lib/weightParser';
import { usePresetModeValueMutation, usePresetModeValues } from '../../../../../entities/varPresetModeValue';
import { useVariableModes } from '../../../../../entities/varMode';
import { usePreset } from '../../../../../entities/varPreset';

export const useTypographyPreset = (boundPreset) => {
  const { presetId } = boundPreset;
  const { updatePresetModeValue } = usePresetModeValueMutation();
  const { presetModeValueByPresetIdAndVariableModeId } = usePresetModeValues();
  const { defaultVariableModeByCollectionId } = useVariableModes();
  const { preset } = usePreset(presetId);
  const defaultVariableMode = defaultVariableModeByCollectionId(preset.collectionId);
  const presetModeValue = presetModeValueByPresetIdAndVariableModeId(presetId, defaultVariableMode.id);

  const update = useCallback((style) => {
    updatePresetModeValue(presetId, defaultVariableMode.id, style);
  }, [presetId, updatePresetModeValue]);

  const handleUpdateFontFamily = useCallback((value) => update({ fontFamily: value }), [update]);
  const handleUpdateFontSize = useCallback((value) => update({ fontSize: parseSizeFromUI(value) }), [update]);
  const handleUpdateFontWeight = useCallback((value) => update({ fontWeight: parseWeightFromUI(value) }), [update]);
  const handleUpdateLineHeight = useCallback((value) => update({ lineHeight: parseSizeFromUI(value) }), [update]);
  const handleUpdateLetterSpacing = useCallback((value) => update({ letterSpacing: parseSizeFromUI(value) }), [update]);
  const handleUpdateTextAlign = useCallback((value) => update({ textAlign: value }), [update]);

  const {
    displayValue: displayFontSizeValue,
    placeholder: fontSizePlaceholder,
    isPx: isFontSizePx,
  } = useMemo(() => formatSizeForUI(presetModeValue?.value?.fontSize), [presetModeValue?.value?.fontSize]);

  const {
    displayValue: displayLineHeightValue,
    placeholder: lineHeightPlaceholder,
    isPx: isLineHeightPx,
  } = useMemo(() => formatSizeForUI(presetModeValue?.value?.lineHeight), [presetModeValue?.value?.lineHeight]);

  const {
    displayValue: displayLetterSpacingValue,
    placeholder: letterSpacingPlaceholder,
    isPx: isLetterSpacingPx,
  } = useMemo(() => formatSizeForUI(presetModeValue?.value?.letterSpacing), [presetModeValue?.value?.letterSpacing]);

  const {
    displayValue: displayFontWeightValue,
    placeholder: fontWeightPlaceholder,
    weight: fontWeightNumber,
  } = useMemo(() => formatWeightForUI(presetModeValue?.value?.fontWeight), [presetModeValue?.value?.fontWeight]);

  return {
    fontFamily: presetModeValue?.value?.fontFamily,
    fontWeight: displayFontWeightValue,
    textAlign: presetModeValue?.value?.textAlign,

    fontSize: displayFontSizeValue,
    lineHeight: displayLineHeightValue,
    letterSpacing: displayLetterSpacingValue,

    handleUpdateFontFamily,
    handleUpdateFontSize,
    handleUpdateFontWeight,
    handleUpdateLineHeight,
    handleUpdateLetterSpacing,
    handleUpdateTextAlign,
  };
};
