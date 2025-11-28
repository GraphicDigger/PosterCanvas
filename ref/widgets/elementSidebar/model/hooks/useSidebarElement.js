import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorElementSidebar } from '../store/selector';
import { setSelectedTab } from '../store/slice';
import { useWireframeBlocks } from '../../../../entities/wireframeBlock';
import { useScreens } from '../../../../entities/uiScreen';


export const useSidebarElement = () => {
  const dispatch = useDispatch();
  const { hasWireframeBlocks } = useWireframeBlocks();

  const handleTabChange = (label) => dispatch(setSelectedTab(label));

  const { selectedTab, tabs } = useSelector(selectorElementSidebar);

  return {
    selectedTab,
    tabs,
    tabChange: handleTabChange,

    hasWireframeBlocks,
  };
};
