/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { surfaceColors } from '@/shared/styles';
import { Stack } from '@/shared/uiKit/Stack';
import { useActionsByEntity } from '@/entities/action';
import { useFocusEntity } from '@/entities/uiFocus';
import { ActionControlCanvasCard } from '@/features/actionBuilder';

export const ActionCanvas = () => {

  const theme = useTheme();
  const { focusEntity } = useFocusEntity();
  const { entityActions } = useActionsByEntity(focusEntity?.id, focusEntity?.kind);


  return (
    <Stack className='screen-canvas' >
      <StyledContainer theme={theme}>
        {entityActions?.map(action => (
          <ActionControlCanvasCard
            key={action.id}
            action={action}
          />
        ))}
      </StyledContainer>
    </Stack>
  );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.sys.color.surface};

`;
