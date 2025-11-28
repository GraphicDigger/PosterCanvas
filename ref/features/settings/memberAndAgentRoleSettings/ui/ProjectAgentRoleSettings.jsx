import React, { useMemo, useState } from 'react';
import { Tabs } from '@/shared/uiKit/Tabs';
import { AGENT_TAB_CONTENT, AGENT_ROLE_SETTINGS_TABS } from './components';
import { Viewer, ViewerWindow, ViewerPanel, ViewerPanelHeader, LeftSlot, ViewerPanelBody } from '@/shared/uiKit/Viewer';
import { AGENT_ROLE_SETTINGS_SECTIONS } from '../model';

export const ProjectAgentRoleSettings = () => {

  const [selectedTab, setSelectedTab] = useState(AGENT_ROLE_SETTINGS_SECTIONS.GENERAL);

  const { settings, tabs } = useMemo(() => {
    const Component = AGENT_TAB_CONTENT[selectedTab];
    return {
      settings: Component ? <Component /> : null,
      tabs: (
        <Tabs
          variant='filled'
          tabs={AGENT_ROLE_SETTINGS_TABS}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
        />
      ),
    };
  }, [selectedTab, setSelectedTab]);

  return (
    <Viewer groupId='agentProjectSettings'>
      <ViewerWindow
        step={1}
        groupId='agentProjectSettings'
      >
        <ViewerPanel anchor='left'>
          <ViewerPanelHeader>
            <LeftSlot>
              {tabs}
            </LeftSlot>
          </ViewerPanelHeader>
          <ViewerPanelBody>
            {settings}
          </ViewerPanelBody>
        </ViewerPanel>
      </ViewerWindow>
    </Viewer>
  );
};
