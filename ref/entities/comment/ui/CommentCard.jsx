import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle, CardBody, CardFooter } from '@/shared/uiKit/ItemCard';
import { Avatar, AvatarGroup } from '@/shared/uiKit/Avatar';
import { useMembersByIds } from '@/entities/actorMember';
import { useCommentStates, useComment } from '../model';

export const CommentCard = ({ comment, onClick }) => {

  const {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
  } = useCommentStates(comment.id);

  const handleClick = () => {
    handleSelect(comment.id);
    if (onClick) {onClick();}
  };

  const handleActionsClick = () => {
    console.log('show card actions');
  };


  return (
    <ItemCard
      onClick={handleClick}
      onActionsClick={handleActionsClick}
      isHovered={isHovered}
      isFocused={isFocused}
      isSelected={isSelected}
      onMouseEnter={() => handleHover(comment.id)}
      onMouseLeave={() => handleHover(null)}
      onFocus={() => handleFocus(comment.id)}
      onBlur={() => handleFocus(null)}
    >
      <CardAvatar>
        <Avatar
          size="large"
          src={comment.member.avatar}
        />
      </CardAvatar>
      <CardTitle>
        {`${comment.member.firstName} ${comment.member.lastName}`}
      </CardTitle>
      <CardSubtitle>
        {isHovered ? `${comment.createdAt}` : `${comment.member.role}`}
      </CardSubtitle>
      <CardBody>
        {comment?.text}
      </CardBody>
      <CardFooter>
        <AvatarGroup size="small" max={3}>
          {comment.replies.map((reply) => (
            <Avatar
              key={reply.id}
              src={reply.member.avatar}
              size="small"
              border
            />
          ))}
        </AvatarGroup>
      </CardFooter>
    </ItemCard>
  );
};


CommentCard.propTypes = {
  onClick: PropTypes.func,
};

