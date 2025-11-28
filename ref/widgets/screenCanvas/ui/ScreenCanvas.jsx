/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Stack } from '@/shared/uiKit/Stack';
import { useComments } from '@/entities/comment';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { useScreens } from '@/entities/uiScreen';
import { useUITree } from '@/entities/uiTree';
import { CommentControl } from '@/features/commentControl';
import { UIRenderStrategy } from '@/features/iFrame';
import { ENTITY_KINDS } from '@/shared/constants';

export const ScreenCanvas = () => {

  const { selectedScreenId } = useScreens();
  const { screenUITree } = useUITree();

  return (
    <StyledScreenCanvas>
      <UIRenderStrategy
        ownershipType={ENTITY_KINDS.SCREEN}
        ownerId={selectedScreenId}
      />
      <CommentControl />
    </StyledScreenCanvas>
  );
};

const StyledScreenCanvas = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

