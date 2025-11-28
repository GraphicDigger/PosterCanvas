import React from 'react';
import styled from '@emotion/styled';
import { Checkbox } from '../../../../../shared/uiKit/Checkbox';
import { ListItem } from '../../../../../shared/uiKit/List';

export const BooleanValue = ({ value, onChange }) => {

  return (
    <StyledWrapper>
      <Checkbox
        variant="switch"
        checked={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 28px;
    width: 150px;
    padding: 0;
`;
