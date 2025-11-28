import React, { useMemo, useState, useEffect } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Tabs } from '@/shared/uiKit/Tabs';
import { useActorRoles } from '@/entities/actorRole';
import { useAgentRoleSettingsTabs, useMemberRoleSettingsTabs } from '../model';
import { AGENT_TAB_CONTENT, MEMBER_TAB_CONTENT, AGENT_ROLE_SETTINGS_TABS, MEMBER_ROLE_SETTINGS_TABS } from './components';


export const RoleSettings = () => {
  const { selectedActorRole, isAgentRole, isMemberRole } = useActorRoles();

  if (!selectedActorRole) {return <Stack />;}

  const [selectedTab, setSelectedTab] = useState(null);

  useEffect(() => {
    if (isAgentRole && (!selectedTab || !AGENT_ROLE_SETTINGS_TABS.includes(selectedTab))) {
      setSelectedTab(AGENT_ROLE_SETTINGS_TABS[0]);
    } else if (isMemberRole && (!selectedTab || !MEMBER_ROLE_SETTINGS_TABS.includes(selectedTab))) {
      setSelectedTab(MEMBER_ROLE_SETTINGS_TABS[0]);
    }
  }, [isAgentRole, isMemberRole, selectedTab]);

  const { settings, tabs } = useMemo(() => {

    if (isAgentRole) {
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
    }

    if (isMemberRole) {
      const Component = MEMBER_TAB_CONTENT[selectedTab];
      return {
        settings: Component ? <Component /> : null,
        tabs: (
          <Tabs
            variant='filled'
            tabs={MEMBER_ROLE_SETTINGS_TABS}
            selectedTab={selectedTab}
            onChange={setSelectedTab}
          />
        ),
      };
    }

    return { settings: null, tabs: null };

  }, [
    isAgentRole,
    isMemberRole,
    selectedTab,
  ]);

  return (
    <Stack>
      <SlotBar>
        <LeftSlot>
          {tabs}
        </LeftSlot>
      </SlotBar>
      <Scrollbar>
        <Stack
          align='start'
          gap={3}
          paddingTop={6}
          paddingLeft='10%'
          paddingRight='10%'
        >
          {settings}
        </Stack>
      </Scrollbar>
    </Stack>
  );
};
