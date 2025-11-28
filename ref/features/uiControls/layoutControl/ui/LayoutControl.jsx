/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../../app/providers';
import { LayoutFreeIcon, LayoutFlexHIcon, LayoutFlexVIcon, LayoutFlexWrapIcon, OverflowVisibleIcon } from '../../../../shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool, ButtonToolToggle } from '../../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Flex } from './flex/Flex';
import {
  useElement,
  useElementMutations,
  DIRECTION,
  JUSTIFY,
  ALIGN,
  WRAP,
  STYLE_PROPERTIES,
  DISPLAY_PROPERTIES,
} from '../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../entities/binding';
import {
  selectCurrentMode,
  toggleLayoutMode,
  selectMapState,
  selectSpacing,
  selectFlexSettings,
  useLayout,
  useFlex,
} from '../model';


export const LayoutControl = () => {

  const {
    currentMode,
    changeMode,
    isDisplayFlex,
  } = useFlex();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <Stack direction='row' justify='space-between' gap={2}>
          <SectionPanelName>Layout</SectionPanelName>
          {/* <ButtonTool>
              <OverflowVisibleIcon />
          </ButtonTool> */}
          <ButtonToolToggle
            value={currentMode}
            onChange={changeMode}
          >
            <ButtonTool value={DISPLAY_PROPERTIES.block}>
              <LayoutFreeIcon />
            </ButtonTool>
            <ButtonTool value={DIRECTION.row}>
              <LayoutFlexHIcon />
            </ButtonTool>
            <ButtonTool value={DIRECTION.column}>
              <LayoutFlexVIcon />
            </ButtonTool>
            <ButtonTool value={WRAP.wrap}>
              <LayoutFlexWrapIcon />
            </ButtonTool>
          </ButtonToolToggle>
        </Stack>
      </SectionPanelHeader>
      {isDisplayFlex &&
        <SectionPanelBody>
          <Flex />
        </SectionPanelBody>
      }
    </SectionPanel>
  );
};

