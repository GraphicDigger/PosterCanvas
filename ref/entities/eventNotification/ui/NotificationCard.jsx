import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ItemCard, CardAvatar, CardTitle, CardSubtitle, CardBody, CardFooter } from '@/shared/uiKit/ItemCard';
import { Avatar, AvatarGroup } from '@/shared/uiKit/Avatar';
import { useNotificationStates } from '../model';
import { Button } from '@/shared/uiKit/Button';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { CrossIcon } from '@/shared/assets/icons';
import { NotificationTypeEnum } from '@/shared/services/eventNotification';
import { useTheme } from '@emotion/react';


export const NotificationCard = ({
  notification,
  config,
  onClick,
  size = 'medium',
  border = true,
  onDismiss,
  onRead,
}) => {
  const theme = useTheme();

  const createdByDetail = notification.createdByDetail;

  const {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
  } = useNotificationStates(notification.id);

  const handleClick = () => {
    handleSelect(notification.id);
    // Пользователь открыл уведомление → устанавливаем readAt и удаляем из Redux
    onRead(notification.id);
    if (onClick) { onClick(); }
  };

  const handleActionsClick = () => {
    console.log('show card actions');
  };

  const handleDismiss = (e) => {
    e.stopPropagation(); // Предотвращаем срабатывание handleClick
    // Пользователь закрыл крестиком → устанавливаем dismissedAt
    onDismiss(notification.id);
  };

  const getColorLabel = () => {
    switch (notification.type) {
    case NotificationTypeEnum.SUCCESS:
      return theme.sys.color.success;
    case NotificationTypeEnum.ERROR:
      return theme.sys.color.error;
    case NotificationTypeEnum.WARNING:
      return theme.sys.color.warning;
    case NotificationTypeEnum.INFO:
      return theme.sys.color.info;
    default:
      return theme.sys.color.info;
    }
  };


  return (
    <ItemCard
      onClick={handleClick}
      onActionsClick={handleActionsClick}
      isHovered={isHovered}
      isFocused={isFocused}
      isSelected={isSelected}
      onMouseEnter={() => handleHover(notification.id)}
      onMouseLeave={() => handleHover(null)}
      onFocus={() => handleFocus(notification.id)}
      onBlur={() => handleFocus(null)}
      size={size}
      border={border}
      actionSlot={<ButtonTool onClick={handleDismiss}> <CrossIcon /> </ButtonTool>}
      minWidth={300}
    >
      <CardAvatar>
        <Avatar src={createdByDetail?.avatar} />
      </CardAvatar>
      <CardTitle>
        {createdByDetail?.firstName} {createdByDetail?.lastName}
      </CardTitle>
      <CardSubtitle>
        {notification?.createdAt}
      </CardSubtitle>
      <CardBody>
        {notification?.text}
      </CardBody>
      <CardFooter>
        {config?.actions && config.actions.length > 0 && config.actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button key={action.type} startIcon={<Icon />} color='primary' size='small' onClick={action.onClick}>
              {action.label}
            </Button>
          );
        })}
        <StyledLabel color={getColorLabel()}/>
      </CardFooter>
    </ItemCard>
  );
};

const StyledLabel = styled.p`
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  background-color: ${({ color }) => color};
`;


NotificationCard.propTypes = {
  onClick: PropTypes.func,
};

