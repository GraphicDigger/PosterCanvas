import React, { useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Tabs } from '@/shared/uiKit/Tabs';
import { AGENT_TAB_CONTENT, MEMBER_TAB_CONTENT, useActorRoles } from '@/entities/actorRole';
import { useAgentRoleSettingsTabs, useMemberRoleSettingsTabs } from '../../../../features/projectRoleSettings/model';


export const RoleSettings = () => {
  const { selectedActorRole, isAgentRole, isMemberRole } = useActorRoles();

  if (!selectedActorRole) {return <Stack />;}

  const {
    selectedTab: selectedAgentTab,
    tabs: agentTabs,
    setTab: setAgentTab,
  } = useAgentRoleSettingsTabs();

  const {
    selectedTab: selectedMemberTab,
    tabs: memberTabs,
    setTab: setMemberTab,
  } = useMemberRoleSettingsTabs();

  const { settingList, tabs } = useMemo(() => {

    if (isAgentRole) {
      const SettingList = AGENT_TAB_CONTENT[selectedAgentTab];
      return {
        settingList: SettingList ? <SettingList /> : null,
        tabs: (
          <Tabs
            variant='filled'
            tabs={agentTabs}
            selectedTab={selectedAgentTab}
            onChange={setAgentTab}
          />
        ),
      };
    }

    if (isMemberRole) {
      const SettingList = MEMBER_TAB_CONTENT[selectedMemberTab];
      return {
        settingList: SettingList ? <SettingList /> : null,
        tabs: (
          <Tabs
            variant='filled'
            tabs={memberTabs}
            selectedTab={selectedMemberTab}
            onChange={setMemberTab}
          />
        ),
      };
    }

    return { settingList: null, tabs: null };

  }, [
    isAgentRole,
    isMemberRole,
    selectedAgentTab,
    selectedMemberTab,
    agentTabs,
    memberTabs,
    setAgentTab,
    setMemberTab,
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
          {settingList}
        </Stack>
      </Scrollbar>
    </Stack>
  );
};
