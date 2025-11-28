/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { useAIAssistantVisibility } from '..';
import { AiIcon } from '../../../shared/assets/icons';
import { useTheme } from '@emotion/react';

export const AiAssistantSwitchButton = ({ }) => {
  const theme = useTheme();

  const { toggleAssistant } = useAIAssistantVisibility();

  const handleToggleAssistant = () => {
    toggleAssistant();
  };

  return (
    <StyledAiCoderSwitch>
      <ButtonTool
        customBgColor={theme.ref.color.black90}
        customIconColor={theme.ref.color.white100}
        onClick={handleToggleAssistant}
        variant='filled'
      >
        <AiIcon />
      </ButtonTool>
    </StyledAiCoderSwitch>
  );
};

const StyledAiCoderSwitch = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
`;
