import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle } from '../../../shared/uiKit/ItemCard';
import { TaskIcon } from '../../../shared/assets/icons';

export const TaskCardListItem = ({
  item,
  onClick,
  actionSlot,
}) => {

  const handleClick = () => {
    if (onClick) {onClick();}
  };

  return (
    <ItemCard
      border
      onClick={handleClick}
      actionSlot={actionSlot}
    >
      <CardAvatar size='large' >
        <TaskIcon />
      </CardAvatar>
      <CardTitle>
        {item.title}
      </CardTitle>
      <CardSubtitle>
        {item.member?.firstName} {item.member?.lastName} ⋅ {item.member?.role} ⋅ {item.createdAt}
      </CardSubtitle>
    </ItemCard>
  );
};

