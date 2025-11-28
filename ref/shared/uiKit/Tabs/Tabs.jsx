/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Tab } from './Tab';

export const Tabs = ({
  tabs,
  variant = 'underlined',
  selectedTab,
  onChange,
  gap,
  padding,
  ...props
}) => {

  const onTabClick = (tab) => {
    onChange(tab);
  };


  return (
    <StyledTabs gap={gap} padding={padding}>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          variant={variant}
          selected={selectedTab === tab}
          onClick={onTabClick}
          {...props}
        >
          {tab}
        </Tab>
      ))}
    </StyledTabs>
  );
};

const StyledTabs = styled.div`
    align-items: center;
    position: relative;
    display: flex;
    height: 100%;
    gap: ${({ gap }) => gap}px;
    padding-left: ${({ padding }) => padding || '0'}px;
    padding-right: ${({ padding }) => padding || '0'}px; 
`;

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  variant: PropTypes.oneOf(['underlined', 'filled']),
  selectedTab: PropTypes.string,
  onChange: PropTypes.func,
  gap: PropTypes.string,
};
