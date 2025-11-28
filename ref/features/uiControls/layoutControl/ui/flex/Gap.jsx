/** @jsxImportSource @emotion/react */
import React, { useMemo, useCallback } from 'react';
import { parseSizeFromUI, formatSizeForUI } from '../../../../../shared/lib';
import { LayoutGapRowIcon, LayoutGapColumnIcon, LayoutFlexRowJustifyBetweenIcon, LayoutFlexRowJustifyAroundIcon, LayoutFlexColumnJustifyBetweenIcon, LayoutFlexColumnJustifyAroundIcon, LayoutFlexColumnAlignItemsStretchIcon, LayoutFlexRowAlignItemsStretchIcon, LayoutFlexReflectionIcon } from '../../../../../shared/assets/icons';
import { Field, TextField, EndSlot } from '../../../../../shared/uiKit/Fields';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../../../shared/uiKit/Stack';
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
import { useFlex } from '../../model';

const GAP = STYLE_PROPERTIES.gap;
const GAP_ROW = STYLE_PROPERTIES.gapRow;
const GAP_COLUMN = STYLE_PROPERTIES.gapColumn;
const JUSTIFY_CONTENT = STYLE_PROPERTIES.justifyContent;

export const Gap = () => {

  const {
    focusEntity,
    flexDirectionValue,
    flexWrapValue,
    justifyContentValue,
    gapValue,
    gapRowValue,
    gapColumnValue,
    updateStyle,
  } = useFlex();


  const isJustifyContent = useMemo(() => justifyContentValue?.value === JUSTIFY.spaceBetween || justifyContentValue?.value === JUSTIFY.spaceAround, [justifyContentValue?.value]);

  const { displayValue: displayGapValue } = useMemo(() => formatSizeForUI(gapValue?.value), [gapValue?.value]);

  const { displayValue: displayGapRowValue } = useMemo(() => formatSizeForUI(gapRowValue?.value), [gapRowValue?.value]);

  const { displayValue: displayGapColumnValue } = useMemo(() => formatSizeForUI(gapColumnValue?.value), [gapColumnValue?.value]);

  const handleGapChange = useCallback((value) => {
    if (justifyContentValue?.value === JUSTIFY.spaceBetween || justifyContentValue?.value === JUSTIFY.spaceAround) {
      updateStyle(focusEntity.id, {
        [GAP]: parseSizeFromUI(value),
        [JUSTIFY_CONTENT]: JUSTIFY.start,
      });
    } else {
      updateStyle(focusEntity.id, { [GAP]: parseSizeFromUI(value) });
    }
  }, [updateStyle, focusEntity.id]);

  const handleGapRowChange = useCallback((value) => {
    updateStyle(focusEntity.id, { [GAP_ROW]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleGapColumnChange = useCallback((value) => {
    updateStyle(focusEntity.id, { [GAP_COLUMN]: parseSizeFromUI(value) });
  }, [updateStyle, focusEntity.id]);

  const handleSetJustifyContent = useCallback((value) => {
    updateStyle(focusEntity.id, { [JUSTIFY_CONTENT]: value });
  }, [updateStyle, focusEntity.id]);

  const endSlot = useMemo(() => {
    const isRow = flexDirectionValue?.value === DIRECTION.row;
    return (
      <EndSlot>
        {justifyContentValue?.value !== JUSTIFY.spaceBetween && (
          <ButtonTool onClick={() => handleSetJustifyContent(JUSTIFY.spaceBetween)}>
            {isRow ? <LayoutFlexRowJustifyBetweenIcon /> : <LayoutFlexColumnJustifyBetweenIcon />}
          </ButtonTool>
        )}
        {justifyContentValue?.value !== JUSTIFY.spaceAround && (
          <ButtonTool onClick={() => handleSetJustifyContent(JUSTIFY.spaceAround)}>
            {isRow ? <LayoutFlexRowJustifyAroundIcon /> : <LayoutFlexColumnJustifyAroundIcon />}
          </ButtonTool>
        )}
      </EndSlot>
    );
  }, [flexDirectionValue?.value, justifyContentValue?.value, gapValue?.value]);


  const gapField = useMemo(() => {

    if (flexWrapValue?.value !== WRAP.wrap) {
      return (
        <Field>
          {flexDirectionValue?.value === DIRECTION.row ? <LayoutGapColumnIcon /> : <LayoutGapRowIcon />}
          <BindVariableToPropertyPicker
            width='fill'
            propertyType={PROPERTY_TYPES.STYLE}
            propertyName={STYLE_PROPERTIES.gap}
            propertyValue={gapValue}
            window={{
              offset: 17,
            }}
          >
            <TextField
              value={isJustifyContent ? '' : displayGapValue}
              placeholder='Auto'
              onChange={handleGapChange}
            >
              {endSlot}
            </TextField>
          </BindVariableToPropertyPicker>
        </Field >
      );
    }

    if (flexWrapValue?.value === WRAP.wrap) {
      return (
        <Stack gap={1}>

          <Field>
            <LayoutGapColumnIcon />
            <BindVariableToPropertyPicker
              width='fill'
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.gapColumn}
              propertyValue={gapColumnValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={isJustifyContent ? '' : displayGapColumnValue}
                placeholder='Auto'
                onChange={handleGapColumnChange}
              >
                {endSlot}
              </TextField>
            </BindVariableToPropertyPicker>
          </Field>
          <Field>
            <LayoutGapRowIcon />
            <BindVariableToPropertyPicker
              width='fill'
              propertyType={PROPERTY_TYPES.STYLE}
              propertyName={STYLE_PROPERTIES.gapRow}
              propertyValue={gapRowValue}
              window={{
                offset: 17,
              }}
            >
              <TextField
                value={isJustifyContent ? '' : displayGapRowValue}
                onChange={handleGapRowChange}
              >
              </TextField>
            </BindVariableToPropertyPicker>
          </Field>
        </Stack>
      );
    }

    return null;
  }, [
    flexDirectionValue,
    flexWrapValue,
    displayGapValue,
    handleGapChange,
  ]);

  return gapField;
};
