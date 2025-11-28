import React from 'react';
import styled from '@emotion/styled';
import { useCommentStates } from '@/entities/comment';
import { Pin } from '@/shared/uiKit/Pin';

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
