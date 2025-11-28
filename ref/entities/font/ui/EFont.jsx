import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { ListItem, ListItemButton, ListItemText, ListItemStartSlot } from '@/shared/uiKit/List';
import { FontIcon } from '@/shared/assets/icons';

export const EFont = ({ name, value }) => {
  const theme = useTheme();


  return (
    <ListItem>
      <ListItemButton>
        <ListItemStartSlot>
          <FontIcon />
        </ListItemStartSlot>
        <StyledItem>
          <ListItemText>
            {name}
          </ListItemText>
          <StyledValue theme={theme}>{value}</StyledValue>
        </StyledItem>
      </ListItemButton>
    </ListItem>
  );
};

const StyledItem = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const StyledValue = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.sys.typography.color.secondary};
`;

