import { useCallback, useMemo } from 'react';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../entities/binding';
import { formatSize, parseSize } from '../lib';

export const useSizeControl = () => {
  const { focusedElement } = useElement();
  const { widthValue, heightValue } = useBoundVariableValue(focusedElement?.id);
  const { updateStyle } = useElementMutations();

  const update = useCallback((style) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, style);
  }, [focusedElement?.id, updateStyle]);

  const handleUpdateWidth = useCallback((value) => update({ width: parseSize(value) }), [update]);
  const handleUpdateHeight = useCallback((value) => update({ height: parseSize(value) }), [update]);
  const handleSetFitWidth = useCallback(() => update({ width: 'max-content' }), [update]);
  const handleSetFitHeight = useCallback(() => update({ height: 'max-content' }), [update]);
  const handleSetFillWidth = useCallback(() => update({ width: '100%' }), [update]);
  const handleSetFillHeight = useCallback(() => update({ height: '100%' }), [update]);

  const {
    displayValue: displayWidthValue,
    placeholder: widthPlaceholder,
    isPx: isWidthPx,
  } = useMemo(() => formatSize(widthValue?.value), [widthValue?.value]);

  const {
    displayValue: displayHeightValue,
    placeholder: heightPlaceholder,
    isPx: isHeightPx,
  } = useMemo(() => formatSize(heightValue?.value), [heightValue?.value]);

  return {
    widthValue,
    heightValue,
    displayWidthValue,
    widthPlaceholder,
    isWidthPx,
    displayHeightValue,
    heightPlaceholder,
    isHeightPx,
    handleUpdateWidth,
    handleUpdateHeight,
    handleSetFitWidth,
    handleSetFitHeight,
    handleSetFillWidth,
    handleSetFillHeight,
  };
};
