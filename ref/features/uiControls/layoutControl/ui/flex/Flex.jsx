/** @jsxImportSource @emotion/react */
import React from 'react';
import { LayoutGapRowIcon, LayoutGapColumnIcon, LayoutFlexRowJustifyBetweenIcon, LayoutFlexRowJustifyAroundIcon, LayoutFlexColumnJustifyBetweenIcon, LayoutFlexColumnJustifyAroundIcon, LayoutFlexColumnAlignItemsStretchIcon, LayoutFlexRowAlignItemsStretchIcon, LayoutFlexReflectionIcon } from '../../../../../shared/assets/icons';
import { Field, TextField, EndSlot } from '../../../../../shared/uiKit/Fields';
import { ButtonTool } from '../../../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../../../shared/uiKit/Stack';
import { Box } from '../../../../../shared/uiKit/Box';
import { SlotBar, LeftSlot, RightSlot } from '../../../../../shared/uiKit/SlotBar';
import { Map } from './FlexMap';
import { Spacing } from './Spacing';
import { useBoundVariableValue } from '../../../../../entities/binding';
import {
  useElement,
  useElementMutations,
  DIRECTION,
  JUSTIFY,
  ALIGN,
  WRAP,
  STYLE_PROPERTIES,
} from '../../../../../entities/uiElement';
import {
  selectDotState,
  selectFlexSettings,
  switchAlignItems,
  setGapRow,
  setGapColumn,
  useFlex,
} from '../../model';
import { Gap } from './Gap';

export const Flex = () => {

  const { alignItemsSwitch, isAlignItemsStretch, isFlexDirectionColumn } = useFlex();

  return (

    <Stack gap={1}>
      <SlotBar
        position='absolute'
        paddingHorizontal={0}
        paddingVertical={0}
      >
        <LeftSlot>
          <ButtonTool>
            <LayoutFlexReflectionIcon />
          </ButtonTool>
        </LeftSlot>
        <RightSlot>
          <ButtonTool
            isSelected={isAlignItemsStretch}
            onClick={alignItemsSwitch}
          >
            {isFlexDirectionColumn ? <LayoutFlexRowAlignItemsStretchIcon /> : <LayoutFlexColumnAlignItemsStretchIcon />}
          </ButtonTool>
        </RightSlot>
      </SlotBar>
      <Spacing>
        <Map />
      </Spacing>
      <Gap />
    </Stack>
  );
};
