import React from 'react';
import styled from '@emotion/styled';
import { Preview } from '../../../../shared/uiKit/Preview';
import { Text } from '../../../../shared/uiKit/Text';

export const PresetPreview = ({
  name,
  value,
  onChange,
}) => {

  return (
    <StyledPreview>
      <Preview backgroundColor={value} size='small' />
      <Text
        editable={true}
        onChange={onChange}
      >
        {name}
      </Text>
    </StyledPreview>
  );
};

const StyledPreview = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

