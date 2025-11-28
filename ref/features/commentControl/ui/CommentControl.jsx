/** @jsxImportSource @emotion/react */
import React, { memo, useRef, useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Pin } from '@/shared/uiKit/Pin';
import { getPinPosition } from '../lib';
import { useCommentControl, usePinPlacer, useCommentEditor, useCommentSidebar } from '../model';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';


export const CommentControl = memo(({
  allowPlacement = true, // allow placement new pins
  onPinClick,
}) => {
  const ref = useRef(null);
  const { textComment, handleChangeTextComment, createComment } = useCommentEditor();

  const { controlIsActive, comments, selectedCommentId } = useCommentControl();
  const { handleOpenReplies, handleCloseReplies } = useCommentSidebar();
  const { absolutePinPosition, addPin, setWindowSize, selectComment } = usePinPlacer();

  // // Срабатывает при клике вне пина, но внутри контейнера - показываем сайдбар со всеми комментариями
  // useClickOutside(ref, (event) => {
  //   if (controlIsActive) {
  //     // Проверяем, что клик не по пину
  //     const isPinClick = event.target.closest('[data-pin-component]');
  //     if (!isPinClick) {
  //       handleOpenReplies(); // Показываем сайдбар
  //     }
  //   }
  // });

  // console.log('comments', comments);

  useEffect(() => {
    const handleResizeWindow = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResizeWindow);
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);


  const handleAddPin = useCallback((event) => {
    addPin(event);
    handleCloseReplies(); // закрываем replies при добавлении пина
  }, [addPin, handleCloseReplies]);


  const handleSelectPin = useCallback((commentId) => {
    selectComment(commentId);
    handleOpenReplies();
    if (onPinClick) { onPinClick(); }
  }, [selectComment, onPinClick, handleOpenReplies]);


  const handleCreateComment = useCallback((e) => {
    e.stopPropagation();
    createComment();
  }, [createComment]);

  return (

    <StyledWrapper allowPlacement={allowPlacement}>
      {controlIsActive && (
        <>
          {comments.map((comment) => {
            if (!comment.pin) { return null; }
            const position = getPinPosition(comment.pin, comment.targetId);
            return (
              <Pin
                key={comment.id}
                ref={ref}
                variant="added"
                user={comment.member}
                onClick={() => handleSelectPin(comment.id)}
                isSelected={selectedCommentId === comment.id}
                x={position.x}
                y={position.y}
                absolute={false}
              />
            );
          })}
          <StyledSurface
            controlIsActive={controlIsActive}
            onClick={handleAddPin}
          />
        </>
      )}

      {allowPlacement && absolutePinPosition && (
        <Pin
          variant='new'
          x={absolutePinPosition.x}
          y={absolutePinPosition.y}
          textComment={textComment}
          onChangeTextComment={handleChangeTextComment}
          onSubmit={handleCreateComment}
        />
      )}
    </StyledWrapper>
  );
});

CommentControl.propTypes = {
  allowPlacement: PropTypes.bool,
  onPinClick: PropTypes.func,
};

const StyledWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: ${({ allowPlacement }) => allowPlacement ? 'crosshair' : 'default'};
    pointer-events: none;
`;

const StyledSurface = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({ controlIsActive }) => controlIsActive ? '100' : '-1'};
    pointer-events: ${({ controlIsActive }) => controlIsActive ? 'auto' : 'none'};
`;
