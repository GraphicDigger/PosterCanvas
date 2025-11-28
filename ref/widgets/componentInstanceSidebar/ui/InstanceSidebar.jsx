import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '../../../shared/uiKit/Surface';
import { ActionBuilder } from '../../../features/actionBuilder';
import {
  PositionControl,
  SizeControl,
  EffectControl,
  LinkControl,
  VisibilityControl,
  TagControl,
  DataControl,
  AttributeControl,
  PropControl,
  WireframeControl,
} from '../../../features/uiControls';
import { useInstances } from '../../../entities/uiInstance';
import { InstancePropControl } from '../../../features/uiControls';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { ButtonTool, ButtonToolGroup } from '../../../shared/uiKit/ButtonTool';
import { EditIcon, CodeIcon } from '../../../shared/assets/icons';
import { selectorInstanceSidebar, TABS } from '../model';
import { SidebarTabs } from './components/SidebarTabs';

export const InstanceSidebar = () => {

  const { selectedTab } = useSelector(selectorInstanceSidebar);

  const content = useMemo(() => {
    switch (selectedTab) {
    case TABS.PROPS:
      return (
        <>
          <InstancePropControl />
        </>
      );
    case TABS.STYLE:
      return (
        <>
          <SizeControl />
          <PositionControl />
        </>
      );
    case TABS.SETTINGS:
      return (
        <>
          <LinkControl />
          <VisibilityControl />
          <DataControl />
          <AttributeControl />
          <WireframeControl />
        </>
      );
    case TABS.ACTIONS:
      return (
        <>
          <ActionBuilder />
        </>
      );
    default:
      return null;
    }
  }, [selectedTab]);


  return (
    <ResizableWrapper side='left'>
      <Surface>
        <SectionPanel>
          <SectionPanelHeader>
            <SectionPanelName>Instance name</SectionPanelName>
            <ButtonToolGroup fill={false}>
              <ButtonTool>
                <EditIcon />
              </ButtonTool>
              <ButtonTool>
                <CodeIcon />
              </ButtonTool>
            </ButtonToolGroup>
          </SectionPanelHeader>
        </SectionPanel>
        <SidebarTabs />
        {content}
      </Surface>
    </ResizableWrapper>
  );
};
