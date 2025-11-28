/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '../../../../shared/uiKit/Divider';
import { Tabs } from '../../../../shared/uiKit/Tabs';
import {
  setSelectedTab,
  selectorScreenSidebar,
  TABS,
} from '../../model';

export const SidebarTabs = () => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const { selectedTab, tabs } = useSelector(selectorScreenSidebar);

  const handleTabChange = (label) => {
    dispatch(setSelectedTab(label));
  };

  return (
    <>
      <div css={css({ height: '40px', position: 'relative' })}>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onChange={handleTabChange}
          padding={16}
        />
        <Divider bottom left color={theme.sys.color.outline.default} />
      </div>
    </>
  );
};
