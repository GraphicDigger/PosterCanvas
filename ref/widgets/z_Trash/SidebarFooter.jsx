import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Divider } from '../../../../../shared/uiKit/Divider';


export const SidebarFooter = () => {
  const theme = useTheme();

  return (
    <StyledFooter>
      footer
      <Divider top left color={theme.sys.color.outline.default} />
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 12px 16px;
    width: 100%;
`;
