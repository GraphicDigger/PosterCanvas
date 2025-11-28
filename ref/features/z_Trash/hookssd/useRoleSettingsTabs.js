import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMemberRoleSettingsTabs,
  selectAgentRoleSettingsTabs,
  setSelectedAgentRoleSettingsTab,
  setSelectedMemberRoleSettingsTab,
  resetAgentRoleSettingsTab,
  resetMemberRoleSettingsTab,
} from '../store';


export const useMemberRoleSettingsTabs = () => {
  const dispatch = useDispatch();

  const { selectedTab, tabs } = useSelector(selectMemberRoleSettingsTabs);

  const setTab = useCallback((tab) => {
    dispatch(setSelectedMemberRoleSettingsTab(tab));
  }, [dispatch]);

  const resetTab = useCallback(() => {
    dispatch(resetMemberRoleSettingsTab());
  }, [dispatch]);

  return {
    selectedTab,
    tabs,
    setTab,
    resetTab,

  };
};

export const useAgentRoleSettingsTabs = () => {
  const dispatch = useDispatch();

  const { selectedTab, tabs } = useSelector(selectAgentRoleSettingsTabs);

  const setTab = useCallback((tab) => {
    dispatch(setSelectedAgentRoleSettingsTab(tab));
  }, [dispatch]);

  const resetTab = useCallback(() => {
    dispatch(resetAgentRoleSettingsTab());
  }, [dispatch]);

  return {
    selectedTab,
    tabs,
    setTab,
    resetTab,
  };
};
