/** @jsxImportSource @emotion/react */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { TextField } from '../../../../../shared/uiKit/Fields';
import { SegmentedField } from '../../../../../shared/uiKit/Fields';
import { ActionWrapper, RightAction } from '../../../../../shared/uiKit/ActionWrapper';
import { PlusIcon, MinusIcon } from '../../../../../shared/assets/icons';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import {
  useElement,
  useElementMutations,
  DIRECTION,
  JUSTIFY,
  ALIGN,
  WRAP,
  STYLE_PROPERTIES,
  PROPERTY_TYPES,
} from '../../../../../entities/uiElement';
import { BindVariableToPropertyPicker } from '../../../../../entities/binding';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { parseSpacing } from '../../lib';
import { useFlex } from '../../model';

const PADDING_TOP = STYLE_PROPERTIES.paddingTop;
const PADDING_RIGHT = STYLE_PROPERTIES.paddingRight;
const PADDING_BOTTOM = STYLE_PROPERTIES.paddingBottom;
const PADDING_LEFT = STYLE_PROPERTIES.paddingLeft;
const MARGIN_TOP = STYLE_PROPERTIES.marginTop;
const MARGIN_RIGHT = STYLE_PROPERTIES.marginRight;
const MARGIN_BOTTOM = STYLE_PROPERTIES.marginBottom;
const MARGIN_LEFT = STYLE_PROPERTIES.marginLeft;


export const Spacing = ({ children }) => {

  const {
    focusEntity,
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
    updateStyle,
    removeStyle,
  } = useFlex();

  const marginIsEnabled = useMemo(() => {
    return marginTopValue?.value || marginRightValue?.value || marginBottomValue?.value || marginLeftValue?.value;
  }, [marginTopValue?.value, marginRightValue?.value, marginBottomValue?.value, marginLeftValue?.value]);


  const parsedPadding = useMemo(() => parseSpacing(paddingValue?.value), [paddingValue?.value]);
  const { displayValue: inlinePaddingTop } = useMemo(() => formatSizeForUI(parsedPadding?.top), [parsedPadding?.top]);
  const { displayValue: inlinePaddingRight } = useMemo(() => formatSizeForUI(parsedPadding?.right), [parsedPadding?.right]);
  const { displayValue: inlinePaddingBottom } = useMemo(() => formatSizeForUI(parsedPadding?.bottom), [parsedPadding?.bottom]);
  const { displayValue: inlinePaddingLeft } = useMemo(() => formatSizeForUI(parsedPadding?.left), [parsedPadding?.left]);

  const parsedMargin = useMemo(() => parseSpacing(marginValue?.value), [marginValue?.value]);
  const { displayValue: inlineMarginTop } = useMemo(() => formatSizeForUI(parsedMargin?.top), [parsedMargin?.top]);
  const { displayValue: inlineMarginRight } = useMemo(() => formatSizeForUI(parsedMargin?.right), [parsedMargin?.right]);
  const { displayValue: inlineMarginBottom } = useMemo(() => formatSizeForUI(parsedMargin?.bottom), [parsedMargin?.bottom]);
  const { displayValue: inlineMarginLeft } = useMemo(() => formatSizeForUI(parsedMargin?.left), [parsedMargin?.left]);

  const { displayValue: paddingTop } = useMemo(() => formatSizeForUI(paddingTopValue?.propValue || paddingTopValue?.value), [paddingTopValue]);
  const { displayValue: paddingRight } = useMemo(() => formatSizeForUI(paddingRightValue?.propValue || paddingRightValue?.value), [paddingRightValue]);
  const { displayValue: paddingBottom } = useMemo(() => formatSizeForUI(paddingBottomValue?.propValue || paddingBottomValue?.value), [paddingBottomValue]);
  const { displayValue: paddingLeft } = useMemo(() => formatSizeForUI(paddingLeftValue?.propValue || paddingLeftValue?.value), [paddingLeftValue]);
  const { displayValue: marginTop } = useMemo(() => formatSizeForUI(marginTopValue?.propValue || marginTopValue?.value), [marginTopValue]);
  const { displayValue: marginRight } = useMemo(() => formatSizeForUI(marginRightValue?.propValue || marginRightValue?.value), [marginRightValue]);
  const { displayValue: marginBottom } = useMemo(() => formatSizeForUI(marginBottomValue?.propValue || marginBottomValue?.value), [marginBottomValue]);
  const { displayValue: marginLeft } = useMemo(() => formatSizeForUI(marginLeftValue?.propValue || marginLeftValue?.value), [marginLeftValue]);


  const handlePaddingTop = useCallback((value) => {
    updateStyle(focusEntity.id, { [PADDING_TOP]: parseSizeFromUI(value) }); // парс возвращает с px
  }, [updateStyle, focusEntity.id]);

  const handlePaddingRight = useCallback((value) => {
    updateStyle(focusEntity.id, { [PADDING_RIGHT]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handlePaddingBottom = useCallback((value) => {
    updateStyle(focusEntity.id, { [PADDING_BOTTOM]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handlePaddingLeft = useCallback((value) => {
    updateStyle(focusEntity.id, { [PADDING_LEFT]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleMarginTop = useCallback((value) => {
    updateStyle(focusEntity.id, { [MARGIN_TOP]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleMarginRight = useCallback((value) => {
    updateStyle(focusEntity.id, { [MARGIN_RIGHT]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleMarginBottom = useCallback((value) => {
    updateStyle(focusEntity.id, { [MARGIN_BOTTOM]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleMarginLeft = useCallback((value) => {
    updateStyle(focusEntity.id, { [MARGIN_LEFT]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleSetMargin = () => {
    handleMarginTop(0);
    handleMarginRight(0);
    handleMarginBottom(0);
    handleMarginLeft(0);
  };

  const handleResetMargin = () => {
    removeStyle(focusEntity.id, [MARGIN_TOP, MARGIN_RIGHT, MARGIN_BOTTOM, MARGIN_LEFT]);
  };

  return (
    <Stack direction='row' gap={1} height='fit'>
      {marginIsEnabled
        ?
        <SegmentedField orientation='horizontal'>
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.marginLeft}
            propertyValue={marginLeftValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={marginLeft || inlineMarginLeft}
              placeholder='0'
              onChange={handleMarginLeft}
              alignText='center'
            />
          </BindVariableToPropertyPicker>
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.paddingLeft}
            propertyValue={paddingLeftValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={paddingLeft || inlinePaddingLeft}
              placeholder='0'
              onChange={handlePaddingLeft}
              alignText='center'
            />
          </BindVariableToPropertyPicker>
        </SegmentedField>
        :
        <BindVariableToPropertyPicker
          propertyType={PROPERTY_TYPES.STYLE}
          propertyName={STYLE_PROPERTIES.paddingLeft}
          propertyValue={paddingLeftValue}
          window={{
            offset: 17,
          }}
        >
          <TextField
            value={paddingLeft || inlinePaddingLeft}
            placeholder='0'
            onChange={handlePaddingLeft}
            alignText='center'
          />
        </BindVariableToPropertyPicker>
      }
      <Stack direction='column' gap={1} height='fit' width={60}>
        {marginIsEnabled
          ?
          <SegmentedField orientation='vertical'>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.marginTop}
              propertyValue={marginTopValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={marginTop || inlineMarginTop}
                placeholder='0'
                type="text"
                onChange={handleMarginTop}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.paddingTop}
              propertyValue={paddingTopValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={paddingTop || inlinePaddingTop}
                placeholder='0'
                type="text"
                onChange={handlePaddingTop}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
          </SegmentedField>
          :
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.paddingTop}
            propertyValue={paddingTopValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={paddingTop || inlinePaddingTop}
              placeholder='0'
              type="text"
              onChange={handlePaddingTop}
              alignText='center'
            />
          </BindVariableToPropertyPicker>
        }

        {children}

        {marginIsEnabled
          ?
          <SegmentedField orientation='vertical'>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.paddingBottom}
              propertyValue={paddingBottomValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={paddingBottom || inlinePaddingBottom}
                placeholder='0'
                type="text"
                onChange={handlePaddingBottom}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.marginBottom}
              propertyValue={marginBottomValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={marginBottom || inlineMarginBottom}
                placeholder='0'
                type="text"
                onChange={handleMarginBottom}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
          </SegmentedField>
          :
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.paddingBottom}
            propertyValue={paddingBottomValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={paddingBottom || inlinePaddingBottom}
              placeholder='0'
              type="text"
              onChange={handlePaddingBottom}
              alignText='center'
            />
          </BindVariableToPropertyPicker>
        }
      </Stack>
      <ActionWrapper>
        {marginIsEnabled
          ?
          <SegmentedField orientation='horizontal'>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.paddingRight}
              propertyValue={paddingRightValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={paddingRight || inlinePaddingRight}
                placeholder='0'
                type="text"
                onChange={handlePaddingRight}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
            <BindVariableToPropertyPicker
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.marginRight}
              propertyValue={marginRightValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={marginRight || inlineMarginRight}
                placeholder='0'
                type="text"
                onChange={handleMarginRight}
                alignText='center'
              />
            </BindVariableToPropertyPicker>
          </SegmentedField>
          :
          <BindVariableToPropertyPicker
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.paddingRight}
            propertyValue={paddingRightValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={paddingRight || inlinePaddingRight}
              placeholder='0'
              type="text"
              onChange={handlePaddingRight}
              alignText='center'
            />
          </BindVariableToPropertyPicker>
        }
        <RightAction>
          {!marginIsEnabled
            ?
            <ButtonTool width={16} onClick={handleSetMargin}>
              <PlusIcon />
            </ButtonTool>
            :
            <ButtonTool width={16} onClick={handleResetMargin}>
              <MinusIcon />
            </ButtonTool>
          }
        </RightAction>
      </ActionWrapper>
    </Stack>
  );
};

Spacing.propTypes = {
  children: PropTypes.node.isRequired,
};
