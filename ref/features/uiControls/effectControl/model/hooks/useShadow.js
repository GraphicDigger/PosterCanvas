import { useMemo, useCallback, useState, useEffect } from 'react';
import { PROPERTIES, useElement } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { parseMultipleShadows, formatMultipleShadows } from '../../lib';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { useElementMutations, STYLE_PROPERTIES, PROPERTY_SHADOW } from '../../../../../entities/uiElement';


export const useShadow = () => {

  const { focusedElement } = useElement();
  const { boxShadowValue } = useBoundVariableValue(focusedElement?.id);
  const { updateStyle, removeStyle } = useElementMutations();
  const [inset, setInset] = useState('Outside');
  const [activeShadowIndex, setActiveShadowIndex] = useState(0);

  const parsedShadows = useMemo(() => {
    if (!boxShadowValue?.value) {return [];}
    const parsed = parseMultipleShadows(boxShadowValue?.value);
    return parsed.length > 0 ? parsed : [];
  }, [boxShadowValue?.value]);


  // activeShadow for editing
  const activeShadow = useMemo(() => {
    return parsedShadows[activeShadowIndex] || null;
  }, [parsedShadows, activeShadowIndex]);


  // Обеспечиваем валидный индекс при изменении количества теней
  useMemo(() => {
    if (activeShadowIndex >= parsedShadows.length && parsedShadows.length > 0) {
      setActiveShadowIndex(parsedShadows.length - 1);
    } else if (parsedShadows.length === 0) {
      setActiveShadowIndex(0);
    }
  }, [parsedShadows.length]);


  // Переключение между тенями
  const setActiveShadow = useCallback((index) => {
    if (index >= 0 && index < parsedShadows.length) {
      setActiveShadowIndex(index);
    }
  }, [parsedShadows.length]);


  // display values for all active shadow values
  const shadowDisplayValues = useMemo(() => {
    if (!activeShadow) {return null;}

    return {
      offsetX: formatSizeForUI(activeShadow.offsetX),
      offsetY: formatSizeForUI(activeShadow.offsetY),
      blurRadius: formatSizeForUI(activeShadow.blurRadius),
      spreadRadius: formatSizeForUI(activeShadow.spreadRadius),
    };
  }, [activeShadow]);


  const styler = useCallback((style) => {
    if (!focusedElement?.id) {return;}
    updateStyle(focusedElement.id, style);
  }, [focusedElement?.id, updateStyle]);


  const addShadow = useCallback(() => {
    const newShadow = {
      offsetX: '0',
      offsetY: '4px',
      blurRadius: '4px',
      spreadRadius: '0',
      color: '#000000',
      opacity: 40,
      inset: false,
    };
    const newShadows = [...parsedShadows, newShadow];
    const formatted = formatMultipleShadows(newShadows);
    if (formatted) {
      styler({ boxShadow: formatted });
    }
  }, [styler, parsedShadows]);

  // remove shadow
  const removeShadow = useCallback(() => {
    if (!focusedElement?.id) {return;}
    removeStyle(focusedElement.id, [STYLE_PROPERTIES.boxShadow]);
  }, [focusedElement?.id, removeStyle]);


  // remove shadow by index
  const removeShadowAtIndex = useCallback((index) => {
    if (index < 0 || index >= parsedShadows.length) {return;}

    const newShadows = parsedShadows.filter((_, i) => i !== index);

    if (newShadows.length === 0) {
      removeShadow();
    } else {
      const formatted = formatMultipleShadows(newShadows);
      if (formatted) {
        styler({ boxShadow: formatted });
        // Корректируем активный индекс
        if (activeShadowIndex >= newShadows.length) {
          setActiveShadowIndex(newShadows.length - 1);
        }
      }
    }
  }, [styler, parsedShadows, activeShadowIndex, removeShadow]);


  // update active shadow property
  const updateShadowProperty = useCallback((property, value) => {
    if (!activeShadow || activeShadowIndex >= parsedShadows.length) {return;}

    let processedValue;

    if (property === PROPERTY_SHADOW.inset) {
      processedValue = value;
    } else if (property === PROPERTY_SHADOW.color) {
      processedValue = value;
    } else if (property === PROPERTY_SHADOW.opacity) {
      processedValue = value;
    } else {
      processedValue = value === '' ? null : parseSizeFromUI(value);
    }

    const newShadows = [...parsedShadows];

    newShadows[activeShadowIndex] = {
      ...activeShadow,
      [property]: processedValue,
    };

    const formatted = formatMultipleShadows(newShadows);
    if (formatted) {
      styler({ boxShadow: formatted });
    }
  }, [styler, parsedShadows, activeShadow, activeShadowIndex]);

  const updateShadowInset = useCallback((value) => {
    setInset(value);
    const isInset = value === 'Inside';
    updateShadowProperty(PROPERTY_SHADOW.inset, isInset);
  }, [updateShadowProperty]);

  const updateShadowOffsetX = useCallback((value) => {
    updateShadowProperty(PROPERTY_SHADOW.offsetX, value);
  }, [updateShadowProperty]);

  const updateShadowOffsetY = useCallback((value) => {
    updateShadowProperty(PROPERTY_SHADOW.offsetY, value);
  }, [updateShadowProperty]);

  const updateShadowBlurRadius = useCallback((value) => {
    updateShadowProperty(PROPERTY_SHADOW.blurRadius, value);
  }, [updateShadowProperty]);

  const updateShadowSpreadRadius = useCallback((value) => {
    updateShadowProperty(PROPERTY_SHADOW.spreadRadius, value);
  }, [updateShadowProperty]);

  const updateShadowColor = useCallback((value) => {
    updateShadowProperty(PROPERTY_SHADOW.color, value);
  }, [updateShadowProperty]);

  const updateShadowOpacity = useCallback((value) => {
    let finalValue = value;
    if (value === '' || value === null || value === undefined) {
      finalValue = 100;
    }
    updateShadowProperty(PROPERTY_SHADOW.opacity, finalValue);
  }, [updateShadowProperty]);

  return {
    shadows: parsedShadows,

    activeShadow,
    activeShadowIndex,
    setActiveShadow,

    addShadow,
    removeShadow,
    removeShadowAtIndex,

    // activeShadow values
    shadow: {
      x: shadowDisplayValues?.offsetX.displayValue,
      y: shadowDisplayValues?.offsetY.displayValue,
      blur: shadowDisplayValues?.blurRadius.displayValue,
      spread: shadowDisplayValues?.spreadRadius.displayValue,
      color: activeShadow?.color,
      opacity: activeShadow?.opacity,
    },

    updateShadowOffsetX,
    updateShadowOffsetY,
    updateShadowBlurRadius,
    updateShadowSpreadRadius,
    updateShadowColor,
    updateShadowOpacity,

    inset,
    updateShadowInset,
  };
};
