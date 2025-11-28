/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Divider } from '../../../shared/uiKit/Divider';
import { Tabs } from '../../../shared/uiKit/Tabs';

import { setSelectedTab, selectCodeSidebar } from '../model';

export const CodeSidebarTabs = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { selectedTab, tabs } = useSelector(selectCodeSidebar);

  const handleTabChange = (newTab) => {
    dispatch(setSelectedTab(newTab));
  };

  if (!tabs?.length) {return null;}


  return (
    <StyledContainer>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onChange={handleTabChange}
        padding={16}
        tabSpacing={14}
      />
      <Divider bottom left color={theme.sys.color.outline.default} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    position: relative;
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
`;
