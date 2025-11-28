import { useMemo } from 'react';
import { ENTITY_KINDS } from '../../../../shared/constants';
import {
  getValidProperty,
  STYLE_PROPERTIES,
  DIRECTION,
  ALIGN,
  POSITION,
  DISPLAY_PROPERTIES,
} from '../../../uiElement';
import { useResolveValue } from './useResolveValue';
import { useDataRecords } from '../../../dataRecord';

// uiId - id element or instance
// variables:
//      token
//      props
//      dataVariable(screen variable, component variable)
//      preset

export const useBoundVariableValue = (uiId) => {

  const { getNormalizedValue, getPreparedValue } = useResolveValue(uiId);
  const { getRecordsByModelId } = useDataRecords();

  const normalizedValues = useMemo(() => {
    if (!uiId) {return {};}
    const normalized = (path) => getNormalizedValue(path);

    const displayValue = normalized(`style.${STYLE_PROPERTIES.display}`);
    const flexDirectionRaw = normalized(`style.${STYLE_PROPERTIES.flexDirection}`);
    let flexDirectionValue = flexDirectionRaw;
    if (displayValue?.value === DISPLAY_PROPERTIES.flex && (!flexDirectionRaw || !flexDirectionRaw?.value)) {
      flexDirectionValue = { value: DIRECTION.row };
    }

    return {
      // instanceOverrideValue: normalized(`override.${ENTITY_KINDS.PROP}`),
      // bindings (in root element)
      elementPresetValue: normalized(`bindings.${ENTITY_KINDS.PRESET_MODE_VALUE}`),
      elementDataVariableValue: normalized(`bindings.${ENTITY_KINDS.DATA_VARIABLE}`),
      elementPropValue: normalized(`bindings.${ENTITY_KINDS.PROP}`),
      // properties.content
      contentValue: normalized('content'),
      // properties.style
      backgroundColorValue: normalized(`style.${STYLE_PROPERTIES.backgroundColor}`),
      backgroundImageValue: normalized(`style.${STYLE_PROPERTIES.backgroundImage}`),
      heightValue: normalized(`style.${STYLE_PROPERTIES.height}`),
      widthValue: normalized(`style.${STYLE_PROPERTIES.width}`),
      displayValue,
      flexDirectionValue,
      flexWrapValue: normalized(`style.${STYLE_PROPERTIES.flexWrap}`),
      justifyContentValue: normalized(`style.${STYLE_PROPERTIES.justifyContent}`),
      alignItemsValue: normalized(`style.${STYLE_PROPERTIES.alignItems}`),
      gapValue: normalized(`style.${STYLE_PROPERTIES.gap}`),
      gapRowValue: normalized(`style.${STYLE_PROPERTIES.gapRow}`),
      gapColumnValue: normalized(`style.${STYLE_PROPERTIES.gapColumn}`),
      paddingValue: normalized(`style.${STYLE_PROPERTIES.padding}`),
      paddingTopValue: normalized(`style.${STYLE_PROPERTIES.paddingTop}`),
      paddingRightValue: normalized(`style.${STYLE_PROPERTIES.paddingRight}`),
      paddingBottomValue: normalized(`style.${STYLE_PROPERTIES.paddingBottom}`),
      paddingLeftValue: normalized(`style.${STYLE_PROPERTIES.paddingLeft}`),
      marginValue: normalized(`style.${STYLE_PROPERTIES.margin}`),
      marginTopValue: normalized(`style.${STYLE_PROPERTIES.marginTop}`),
      marginRightValue: normalized(`style.${STYLE_PROPERTIES.marginRight}`),
      marginBottomValue: normalized(`style.${STYLE_PROPERTIES.marginBottom}`),
      marginLeftValue: normalized(`style.${STYLE_PROPERTIES.marginLeft}`),
      fontSizeValue: normalized(`style.${STYLE_PROPERTIES.fontSize}`),
      fontWeightValue: normalized(`style.${STYLE_PROPERTIES.fontWeight}`),
      fontFamilyValue: normalized(`style.${STYLE_PROPERTIES.fontFamily}`),
      lineHeightValue: normalized(`style.${STYLE_PROPERTIES.lineHeight}`),
      letterSpacingValue: normalized(`style.${STYLE_PROPERTIES.letterSpacing}`),
      textAlignValue: normalized(`style.${STYLE_PROPERTIES.textAlign}`),
      textTransformValue: normalized(`style.${STYLE_PROPERTIES.textTransform}`),
      positionValue: normalized(`style.${STYLE_PROPERTIES.position}`) || { value: POSITION.static },
      topValue: normalized(`style.${STYLE_PROPERTIES.top}`),
      rightValue: normalized(`style.${STYLE_PROPERTIES.right}`),
      bottomValue: normalized(`style.${STYLE_PROPERTIES.bottom}`),
      leftValue: normalized(`style.${STYLE_PROPERTIES.left}`),
      transformValue: normalized(`style.${STYLE_PROPERTIES.transform}`),
      borderValue: normalized(`style.${STYLE_PROPERTIES.border}`),
      borderTopValue: normalized(`style.${STYLE_PROPERTIES.borderTop}`),
      borderBottomValue: normalized(`style.${STYLE_PROPERTIES.borderBottom}`),
      borderLeftValue: normalized(`style.${STYLE_PROPERTIES.borderLeft}`),
      borderRightValue: normalized(`style.${STYLE_PROPERTIES.borderRight}`),
      borderWidthValue: normalized(`style.${STYLE_PROPERTIES.borderWidth}`),
      borderTopWidthValue: normalized(`style.${STYLE_PROPERTIES.borderTopWidth}`),
      borderBottomWidthValue: normalized(`style.${STYLE_PROPERTIES.borderBottomWidth}`),
      borderLeftWidthValue: normalized(`style.${STYLE_PROPERTIES.borderLeftWidth}`),
      borderRightWidthValue: normalized(`style.${STYLE_PROPERTIES.borderRightWidth}`),
      borderColorValue: normalized(`style.${STYLE_PROPERTIES.borderColor}`),
      borderTopColorValue: normalized(`style.${STYLE_PROPERTIES.borderTopColor}`),
      borderBottomColorValue: normalized(`style.${STYLE_PROPERTIES.borderBottomColor}`),
      borderLeftColorValue: normalized(`style.${STYLE_PROPERTIES.borderLeftColor}`),
      borderRightColorValue: normalized(`style.${STYLE_PROPERTIES.borderRightColor}`),
      borderRadiusValue: normalized(`style.${STYLE_PROPERTIES.borderRadius}`),
      borderTopLeftRadiusValue: normalized(`style.${STYLE_PROPERTIES.borderTopLeftRadius}`),
      borderTopRightRadiusValue: normalized(`style.${STYLE_PROPERTIES.borderTopRightRadius}`),
      borderBottomLeftRadiusValue: normalized(`style.${STYLE_PROPERTIES.borderBottomLeftRadius}`),
      borderBottomRightRadiusValue: normalized(`style.${STYLE_PROPERTIES.borderBottomRightRadius}`),
      boxShadowValue: normalized(`style.${STYLE_PROPERTIES.boxShadow}`),

    };
  }, [uiId, getNormalizedValue]);

  const preparedValues = useMemo(() => {
    const prepared = (normalizedValues) => getPreparedValue(normalizedValues);
    return {
      // bindings
      elementPresetValueRender: prepared(normalizedValues.elementPresetValue),
      elementDataVariableValueRender: prepared(normalizedValues.elementDataVariableValue),
      elementPropValueRender: prepared(normalizedValues.elementPropValue),
      // properties.content
      contentValueRender: prepared(normalizedValues.contentValue),
      // properties.style
      backgroundColorRender: prepared(normalizedValues.backgroundColorValue),
      backgroundImageRender: prepared(normalizedValues.backgroundImageValue),
      heightRender: prepared(normalizedValues.heightValue),
      widthRender: prepared(normalizedValues.widthValue),
      displayRender: prepared(normalizedValues.displayValue),
      flexDirectionRender: prepared(normalizedValues.flexDirectionValue),
      flexWrapRender: prepared(normalizedValues.flexWrapValue),
      justifyContentRender: prepared(normalizedValues.justifyContentValue),
      alignItemsRender: prepared(normalizedValues.alignItemsValue),
      gapRender: prepared(normalizedValues.gapValue),
      gapRowRender: prepared(normalizedValues.gapRowValue),
      gapColumnRender: prepared(normalizedValues.gapColumnValue),
      paddingRender: prepared(normalizedValues.paddingValue),
      paddingTopRender: prepared(normalizedValues.paddingTopValue),
      paddingRightRender: prepared(normalizedValues.paddingRightValue),
      paddingBottomRender: prepared(normalizedValues.paddingBottomValue),
      paddingLeftRender: prepared(normalizedValues.paddingLeftValue),
      marginRender: prepared(normalizedValues.marginValue),
      marginTopRender: prepared(normalizedValues.marginTopValue),
      marginRightRender: prepared(normalizedValues.marginRightValue),
      marginBottomRender: prepared(normalizedValues.marginBottomValue),
      marginLeftRender: prepared(normalizedValues.marginLeftValue),
      fontSizeRender: prepared(normalizedValues.fontSizeValue),
      fontWeightRender: prepared(normalizedValues.fontWeightValue),
      fontFamilyRender: prepared(normalizedValues.fontFamilyValue),
      lineHeightRender: prepared(normalizedValues.lineHeightValue),
      letterSpacingRender: prepared(normalizedValues.letterSpacingValue),
      textAlignRender: prepared(normalizedValues.textAlignValue),
      textTransformRender: prepared(normalizedValues.textTransformValue),
      positionRender: prepared(normalizedValues.positionValue),
      topRender: prepared(normalizedValues.topValue),
      rightRender: prepared(normalizedValues.rightValue),
      bottomRender: prepared(normalizedValues.bottomValue),
      leftRender: prepared(normalizedValues.leftValue),
      transformRender: prepared(normalizedValues.transformValue),
      borderRender: prepared(normalizedValues.borderValue),
      borderTopRender: prepared(normalizedValues.borderTopValue),
      borderRightRender: prepared(normalizedValues.borderRightValue),
      borderBottomRender: prepared(normalizedValues.borderBottomValue),
      borderLeftRender: prepared(normalizedValues.borderLeftValue),
      borderWidthRender: prepared(normalizedValues.borderWidthValue),
      borderTopWidthRender: prepared(normalizedValues.borderTopWidthValue),
      borderBottomWidthRender: prepared(normalizedValues.borderBottomWidthValue),
      borderLeftWidthRender: prepared(normalizedValues.borderLeftWidthValue),
      borderRightWidthRender: prepared(normalizedValues.borderRightWidthValue),
      borderColorRender: prepared(normalizedValues.borderColorValue),
      borderTopColorRender: prepared(normalizedValues.borderTopColorValue),
      borderBottomColorRender: prepared(normalizedValues.borderBottomColorValue),
      borderLeftColorRender: prepared(normalizedValues.borderLeftColorValue),
      borderRightColorRender: prepared(normalizedValues.borderRightColorValue),
      borderRadiusRender: prepared(normalizedValues.borderRadiusValue),
      borderTopLeftRadiusRender: prepared(normalizedValues.borderTopLeftRadiusValue),
      borderTopRightRadiusRender: prepared(normalizedValues.borderTopRightRadiusValue),
      borderBottomLeftRadiusRender: prepared(normalizedValues.borderBottomLeftRadiusValue),
      borderBottomRightRadiusRender: prepared(normalizedValues.borderBottomRightRadiusValue),
      boxShadowRender: prepared(normalizedValues.boxShadowValue),
    };
  }, [normalizedValues, getPreparedValue]);

  // —————— RENDER ——————

  const renderedStyles = useMemo(() => {
    const presetStyles = preparedValues.elementPresetValueRender;
    if (presetStyles && typeof presetStyles === 'object' && Object.keys(presetStyles).length > 0) {
      return presetStyles;
    }
    const styles = {};
    const addStyle = (key, value) => {
      const v = getValidProperty(value);
      if (v !== undefined && v !== null) {styles[key] = v;}
    };
    addStyle(STYLE_PROPERTIES.display, preparedValues.displayRender);
    addStyle(STYLE_PROPERTIES.flexDirection, preparedValues.flexDirectionRender);
    addStyle(STYLE_PROPERTIES.flexWrap, preparedValues.flexWrapRender);
    addStyle(STYLE_PROPERTIES.justifyContent, preparedValues.justifyContentRender);
    addStyle(STYLE_PROPERTIES.alignItems, preparedValues.alignItemsRender);
    addStyle(STYLE_PROPERTIES.backgroundColor, preparedValues.backgroundColorRender);
    addStyle(STYLE_PROPERTIES.height, preparedValues.heightRender);
    addStyle(STYLE_PROPERTIES.width, preparedValues.widthRender);
    addStyle(STYLE_PROPERTIES.padding, preparedValues.paddingRender);
    addStyle(STYLE_PROPERTIES.margin, preparedValues.marginRender);
    addStyle(STYLE_PROPERTIES.gap, preparedValues.gapRender);
    addStyle(STYLE_PROPERTIES.gapRow, preparedValues.gapRowRender);
    addStyle(STYLE_PROPERTIES.gapColumn, preparedValues.gapColumnRender);
    addStyle(STYLE_PROPERTIES.paddingTop, preparedValues.paddingTopRender);
    addStyle(STYLE_PROPERTIES.paddingRight, preparedValues.paddingRightRender);
    addStyle(STYLE_PROPERTIES.paddingBottom, preparedValues.paddingBottomRender);
    addStyle(STYLE_PROPERTIES.paddingLeft, preparedValues.paddingLeftRender);
    addStyle(STYLE_PROPERTIES.marginTop, preparedValues.marginTopRender);
    addStyle(STYLE_PROPERTIES.marginRight, preparedValues.marginRightRender);
    addStyle(STYLE_PROPERTIES.marginBottom, preparedValues.marginBottomRender);
    addStyle(STYLE_PROPERTIES.marginLeft, preparedValues.marginLeftRender);
    addStyle(STYLE_PROPERTIES.fontSize, preparedValues.fontSizeRender);
    addStyle(STYLE_PROPERTIES.fontWeight, preparedValues.fontWeightRender);
    addStyle(STYLE_PROPERTIES.fontFamily, preparedValues.fontFamilyRender);
    addStyle(STYLE_PROPERTIES.lineHeight, preparedValues.lineHeightRender);
    addStyle(STYLE_PROPERTIES.letterSpacing, preparedValues.letterSpacingRender);
    addStyle(STYLE_PROPERTIES.textAlign, preparedValues.textAlignRender);
    addStyle(STYLE_PROPERTIES.textTransform, preparedValues.textTransformRender);
    addStyle(STYLE_PROPERTIES.position, preparedValues.positionRender);
    addStyle(STYLE_PROPERTIES.top, preparedValues.topRender);
    addStyle(STYLE_PROPERTIES.right, preparedValues.rightRender);
    addStyle(STYLE_PROPERTIES.bottom, preparedValues.bottomRender);
    addStyle(STYLE_PROPERTIES.left, preparedValues.leftRender);
    addStyle(STYLE_PROPERTIES.transform, preparedValues.transformRender);
    addStyle(STYLE_PROPERTIES.border, preparedValues.borderRender);
    addStyle(STYLE_PROPERTIES.borderTop, preparedValues.borderTopRender);
    addStyle(STYLE_PROPERTIES.borderRight, preparedValues.borderRightRender);
    addStyle(STYLE_PROPERTIES.borderBottom, preparedValues.borderBottomRender);
    addStyle(STYLE_PROPERTIES.borderLeft, preparedValues.borderLeftRender);
    addStyle(STYLE_PROPERTIES.borderWidth, preparedValues.borderWidthRender);
    addStyle(STYLE_PROPERTIES.borderTopWidth, preparedValues.borderTopWidthRender);
    addStyle(STYLE_PROPERTIES.borderBottomWidth, preparedValues.borderBottomWidthRender);
    addStyle(STYLE_PROPERTIES.borderLeftWidth, preparedValues.borderLeftWidthRender);
    addStyle(STYLE_PROPERTIES.borderRightWidth, preparedValues.borderRightWidthRender);
    addStyle(STYLE_PROPERTIES.borderColor, preparedValues.borderColorRender);
    addStyle(STYLE_PROPERTIES.borderTopColor, preparedValues.borderTopColorRender);
    addStyle(STYLE_PROPERTIES.borderBottomColor, preparedValues.borderBottomColorRender);
    addStyle(STYLE_PROPERTIES.borderLeftColor, preparedValues.borderLeftColorRender);
    addStyle(STYLE_PROPERTIES.borderRightColor, preparedValues.borderRightColorRender);
    addStyle(STYLE_PROPERTIES.borderRadius, preparedValues.borderRadiusRender);
    addStyle(STYLE_PROPERTIES.borderTopLeftRadius, preparedValues.borderTopLeftRadiusRender);
    addStyle(STYLE_PROPERTIES.borderTopRightRadius, preparedValues.borderTopRightRadiusRender);
    addStyle(STYLE_PROPERTIES.borderBottomLeftRadius, preparedValues.borderBottomLeftRadiusRender);
    addStyle(STYLE_PROPERTIES.borderBottomRightRadius, preparedValues.borderBottomRightRadiusRender);
    addStyle(STYLE_PROPERTIES.boxShadow, preparedValues.boxShadowRender);

    const bgValue = preparedValues.backgroundImageRender;
    if (typeof bgValue === 'string' && bgValue.trim()) {
      const value = bgValue.trim();
      styles[STYLE_PROPERTIES.backgroundImage] = value.startsWith('url(')
        ? value
        : `url(${value})`;
    }
    return styles;
  }, [preparedValues]);

  const { isFlexDirectionColumn, isAlignItemsStretch } = useMemo(() => ({
    isFlexDirectionColumn: getValidProperty(preparedValues.flexDirectionRender) === DIRECTION.column,
    isAlignItemsStretch: getValidProperty(preparedValues.alignItemsRender) === ALIGN.stretch,
  }), [preparedValues]);

  const renderedContent = useMemo(() => {
    const resolvedValue = preparedValues.contentValueRender;
    const contentData = { src: '', text: '', value: '' };
    if (typeof resolvedValue === 'string') {
      contentData.src = resolvedValue;
      contentData.text = resolvedValue;
      contentData.value = resolvedValue;
    } else if (typeof resolvedValue === 'number') {
      contentData.text = String(resolvedValue);
      contentData.value = String(resolvedValue);
    } else if (typeof resolvedValue === 'object' && resolvedValue && resolvedValue.src) {
      contentData.src = resolvedValue.src;
    }
    return contentData;
  }, [preparedValues]);

  const renderedBoundDataRecords = useMemo(() => {
    const records = preparedValues.elementPropValueRender || preparedValues.elementDataVariableValueRender;
    if (!records) {return null;}
    return records;
  }, [preparedValues]);

  return {
    ...normalizedValues,
    styles: renderedStyles,
    content: renderedContent,
    boundDataRecords: renderedBoundDataRecords,

    isFlexDirectionColumn,
    isAlignItemsStretch,
  };
};

