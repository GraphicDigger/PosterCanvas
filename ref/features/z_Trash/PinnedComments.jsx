/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { useComment, useCommentStates } from '@/entities/comment';
import { useGlobalModes } from '@/entities/mode/editorMode';
import { Pin } from '@/shared/uiKit/Pin';
import { usePreviewModes } from '@/entities/mode/editorMode';
import { getPinPosition } from '../lib';

export const PinnedComments = () => {

  const { allComments, allCommentsWithMembers } = useComment();
  const { isPreviewModeGlobal } = useGlobalModes();
  const { isCommentsInPreviewMode } = usePreviewModes();

  const comments = useMemo(() => {
    return allCommentsWithMembers.map((comment) => {
      return {
        ...comment,
        position: getPinPosition(comment.id),
      };
    });
  }, [allCommentsWithMembers]);

  return (
    <>
      {isPreviewModeGlobal && isCommentsInPreviewMode && (
        <StyledContainer>
          <PinWrapper
            style={{
              left: getPinPosition('newPin').left,
              top: getPinPosition('newPin').top,
            }}
          >
            <Pin variant='new' />
          </PinWrapper>
          {comments.map((comment) => (
            <PinWithState
              key={comment.id}
              comment={comment}
              position={comment.position}
            />
          ))}
        </StyledContainer>
      )}
    </>
  );
};

export const PinWithState = ({ comment, position }) => {

  const { isSelected, handleSelect } = useCommentStates(comment.id);

  return (
    <PinWrapper
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <Pin
        variant='added'
        user={comment.user}
        onClick={() => handleSelect(comment.id)}
        isSelected={isSelected}
      />
    </PinWrapper>
  );
};

const PinWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 1000;
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;
