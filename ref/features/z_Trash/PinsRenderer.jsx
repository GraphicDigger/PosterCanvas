/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Pin } from '@/shared/uiKit/Pin';
import { useCommentPin } from '../hooks/useCommentPin';

/**
 * Компонент для отображения всех пинов комментариев
 * Использует хук useCommentPin для получения данных и позиций
 */
export const PinsRenderer = memo(({
  onPinClick,
  selectedCommentId,
  variant = 'added',
}) => {
  const { getAllPinsWithPositions } = useCommentPin();

  return (
    <>
      {getAllPinsWithPositions.map(({ comment, pin, position, isVisible }) => {
        // Если пин не видим, не рендерим его
        if (!isVisible) {
          return null;
        }

        // Определяем, нужно ли абсолютное позиционирование
        const isAbsolute = pin.targetId === 'viewport';

        return (
          <Pin
            key={comment.id}
            variant={variant}
            user={{
              id: comment.userId,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userId}`,
              name: `User ${comment.userId}`,
            }}
            onClick={() => onPinClick?.(comment)}
            isSelected={selectedCommentId === comment.id}
            x={position.left}
            y={position.top}
            absolute={isAbsolute}
            targetId={pin.targetId}
          />
        );
      })}
    </>
  );
});

PinsRenderer.propTypes = {
  onPinClick: PropTypes.func,
  selectedCommentId: PropTypes.string,
  variant: PropTypes.oneOf(['cursor', 'new', 'added', 'selected']),
};
