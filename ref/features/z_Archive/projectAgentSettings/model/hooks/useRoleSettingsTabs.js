import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAgentRoleSettingsTabs,
  setSelectedAgentRoleSettingsTab,
  resetAgentRoleSettingsTab,
} from '../store';


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
