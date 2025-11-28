import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Surface } from '@/shared/uiKit/Surface';
import { selectorScreenSidebar } from '../model';
import { TABS } from '../model';
import {
  LayoutControl,
  LinkControl,
  DataControl,
  ClassControl,
  MasterFontControl,
  MasterComponentControl,
  MasterColorControl,
  MasterCopyControl,
  WireframeControl,
} from '@/features/uiControls';
import { FillPanel } from '../../../features/uiControls';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { Button } from '@/shared/uiKit/Button';
import { SidebarTabs } from './components/SidebarTabs';
import { Divider } from '@/shared/uiKit/Divider';


export const ScreenSidebar = () => {

  const { selectedTab } = useSelector(selectorScreenSidebar);
  

  const panels = useMemo(() => {
    if (selectedTab === TABS.STYLE) {
      return (
        <>
          <LayoutControl />
          <FillPanel />
        </>);
    }
    if (selectedTab === TABS.SETTINGS) {
      return (
        <>
          <LinkControl />
          <DataControl />
          <ClassControl />
          <WireframeControl />
        </>);
    }
    if (selectedTab === TABS.MASTER) {
      return (
        <>
          <MasterFontControl />
          <MasterColorControl />
          <MasterComponentControl />
          <MasterCopyControl />
        </>);
    }
  }, [selectedTab]);

  return (
    <ResizableWrapper width='250px' className='screen-sidebar' side='left'>
      <Surface>
        <SectionPanel>
          <SectionPanelHeader>
            <SectionPanelName>Screen name</SectionPanelName>
            <Button>
              Share
            </Button>
          </SectionPanelHeader>
        </SectionPanel>
        <SidebarTabs />
        {panels}
        <Divider orientation='vertical' top left />
      </Surface>
    </ResizableWrapper>
  );
};
