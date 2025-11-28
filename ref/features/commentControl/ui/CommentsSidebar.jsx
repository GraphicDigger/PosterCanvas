import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Surface } from '@/shared/uiKit/Surface';
import { usePreviewModes } from '@/entities/mode/editorMode';
import { SearchComment } from '@/features/commentControl/ui/components/SearchComment';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { ToggleRepliesProvider, useCommentSidebar } from '../model';
import { CommentReplyField } from './components/CommentReplyField';
import { CommentAndReplyList } from './components/CommentAndReplyList';

export const CommentsSidebar = () => {

  const {
    isRepliesOpen,
    handleOpenReplies,
    handleCloseReplies,
  } = useCommentSidebar();

  return (
    <ResizableWrapper side='left'>
      <Surface>
        <SearchComment
          isRepliesOpen={isRepliesOpen}
          onCloseReplies={handleCloseReplies}
        />
        <Scrollbar>
          <CommentAndReplyList
            isRepliesOpen={isRepliesOpen}
            onOpenReplies={handleOpenReplies}
          />
        </Scrollbar>
        <StyledWrapper>
          {isRepliesOpen && <CommentReplyField />}
        </StyledWrapper>
      </Surface>
    </ResizableWrapper>
  );
};

const StyledWrapper = styled.div`
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;
