import React, { useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '@/shared/uiKit/Surface';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { ComponentIcon } from '@/shared/assets/icons';
import { Tabs } from '@/shared/uiKit/Tabs';
import { Divider } from '@/shared/uiKit/Divider';
import { ENTITY_KINDS } from '@/shared/constants/entityKinds';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { useFocusEntity } from '@/entities/uiFocus';
import { ELEMENT_TYPES } from '@/entities/uiElement';
import { ActionBuilder } from '@/features/actionBuilder';
import {
  LayoutControl,
  SizeControl,
  PositionControl,
  LinkControl,
  DataControl,
  ContentControl,
  VisibilityControl,
  WireframeControl,
} from '@/features/uiControls';

import { useSidebarElement, TABS } from '../model';
import {
  EffectPanel,
  FillPanel,
  TypographyPanel,
  PositionPanel,
  AttributePanel,
  CssClassPanel,
  TagPanel,
  BorderPanel,
} from './components';

export const ElementSidebar = () => {

  const { selectedTab, tabs, tabChange } = useSidebarElement();
  const { focusEntity } = useFocusEntity();

  const content = useMemo(() => {

    if (selectedTab === TABS.STYLE) {
      return (
        <>
          <SizeControl />
          <LayoutControl />
          <PositionPanel />
          {focusEntity?.kind === ENTITY_KINDS.ELEMENT && focusEntity?.type === ELEMENT_TYPES.TEXT && <TypographyPanel />}
          <FillPanel />
          <BorderPanel />
          <EffectPanel />
        </>
      );
    }
    if (selectedTab === TABS.SETTINGS) {
      return (
        <>
          <LinkControl />
          <VisibilityControl />
          <TagPanel />
          <CssClassPanel />
          <DataControl />
          <ContentControl />
          <AttributePanel />
          <WireframeControl />
        </>
      );
    }
    if (selectedTab === TABS.ACTIONS) {
      return (
        <ActionBuilder />
      );
    }
  }, [selectedTab, focusEntity]);

  return (
    <ResizableWrapper className='element-sidebar' data-testid='element-sidebar' side='left'>
      <Surface>
        <SectionPanel >
          <SectionPanelHeader>
            <SectionPanelName>{'Element name'}</SectionPanelName>
            <ButtonTool>
              <ComponentIcon />
            </ButtonTool>
          </SectionPanelHeader>
        </SectionPanel>
        <Stack height={10}>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onChange={tabChange}
            padding={16}
          />
          <Divider bottom left />
        </Stack>
        <Scrollbar>
          {content}
        </Scrollbar>
        <Divider orientation='vertical' top left />
      </Surface>
    </ResizableWrapper>
  );
};
