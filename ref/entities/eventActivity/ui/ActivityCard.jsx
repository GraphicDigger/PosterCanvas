import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle, CardBody, CardFooter } from '../../../shared/uiKit/ItemCard';
import { Avatar } from '../../../shared/uiKit/Avatar';
import { Text } from '../../../shared/uiKit/Text';
import { Button } from '../../../shared/uiKit/Button';
import { PlusIcon } from '../../../shared/assets/icons';
import { getAdditionalEventData } from '../@x/event';
import { useEntities } from '../@x/entity';
import { useActivityStates } from '../model';
import { getGlobalEventBus } from '@/shared/services/eventBus';
import { Typography } from '@/shared/uiKit/Typography';

export const ActivityCard = ({
  activity,
  config = null,
  onClick,
  size = 'medium',
  onRead,
  ...props
}) => {

  const id = activity.id;
  const createdByDetail = activity.createdByDetail;
  const event = activity.event;
  const createdAt = activity.createdAt;
  const updatedAt = activity.updatedAt;
  const text = activity.text;
  const notificationId = activity.notificationId;
  const inbox = activity.inbox;
  const actions = config?.actions || [];

  const {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
  } = useActivityStates(activity.id);

  const handleClick = () => {
    handleSelect(activity.id);
    if (onClick) {onClick();}
  };

  const handleRead = useCallback(() => {
    if (onRead && inbox) {onRead(notificationId);}
  }, [notificationId, onRead, inbox]);

  return (

    <ItemCard
      onClick={handleClick}
      onActionsClick={handleRead}
      isHovered={isHovered}
      isFocused={isFocused}
      isSelected={isSelected}
      onMouseEnter={() => handleHover(id)}
      onMouseLeave={() => handleHover(null)}
      onFocus={() => handleFocus(id)}
      onBlur={() => handleFocus(null)}
      size={size}
      {...props}
    >
      <CardAvatar>
        <Avatar src={createdByDetail?.avatar || ''} />
      </CardAvatar>
      <CardTitle>
        {createdByDetail?.firstName} {createdByDetail?.lastName} <StyledSpanTitle>{`${createdByDetail?.role}`}</StyledSpanTitle>
      </CardTitle>
      <CardSubtitle>
        {config?.text} ⋅ {updatedAt}
      </CardSubtitle>
      <CardBody>
        {text}
      </CardBody>
      <CardFooter>
        {actions && actions.length > 0 && actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              startIcon={<Icon />}
              color={inbox ? 'primary' : 'default'}
              size='small'
              onClick={handleRead}
            >
              {action.label}
            </Button>
          );
        })}
      </CardFooter>
    </ItemCard>
  );
};

const StyledSpanTitle = styled.span`
    font-weight: ${({ theme }) => theme.sys.typography.weight.medium};
    color: ${({ theme }) => theme.sys.typography.color.secondary};
`;


ActivityCard.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
};

