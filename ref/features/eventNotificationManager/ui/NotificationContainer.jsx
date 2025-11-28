// shared/services/notification/ui/NotificationContainer.tsx
// UI component for displaying notifications / UI компонент для отображения уведомлений

/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useNotifications } from '@/entities/eventNotification';
import { useNotificationServiceActions } from '@/shared/services/eventNotification';
import { NotificationTypeEnum, NotificationPositionEnum, TempNotification } from '@/shared/services/eventNotification';

import { NotificationCard } from '@/entities/eventNotification';
import { NOTIFICATION_CONFIG } from '../config';

export const NotificationContainer = () => {

  const theme = useTheme();
  const { allCompositeNotifications } = useNotifications();
  const { dismiss, read } = useNotificationServiceActions();

  const visibleNotificationsFromRedux = allCompositeNotifications.filter(n => n.shownAt === null);

  if (visibleNotificationsFromRedux.length === 0) {return null;}

  // Обогащаем уведомления конфигурацией из config.ts
  const notifications = visibleNotificationsFromRedux.map(notification => {
    // Получаем конфиг по типу события
    const config = notification.eventType ? NOTIFICATION_CONFIG[notification.eventType] : {};

    return {
      ...notification,
      ...config,
    };
  });

  // Группируем уведомления по позициям
  const groupedByPosition = notifications.reduce((acc, notification) => {
    const position = notification.position || NotificationPositionEnum.TOP_RIGHT;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(notification);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedByPosition).map(([position, notifs]) => (
        <StyledContainer
          key={position}
          position={position}
          theme={theme}
        >
          {notifs.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              config={notification.eventType ? NOTIFICATION_CONFIG[notification.eventType] : {}}
              onDismiss={dismiss}
              onRead={read}
            />
          ))}
        </StyledContainer>
      ))}
    </>
  );
};


const StyledContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.ref.zIndex.layers.modal};
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${({ position }) => getPositionStyles(position)}

  & > * {
    pointer-events: auto;
  }
`;

const getPositionStyles = (position) => {
  const positions = {
    [NotificationPositionEnum.TOP_LEFT]: css`
      top: 20px;
      left: 20px;
    `,
    [NotificationPositionEnum.TOP_CENTER]: css`
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    `,
    [NotificationPositionEnum.TOP_RIGHT]: css`
      top: 20px;
      right: 20px;
    `,
    [NotificationPositionEnum.BOTTOM_LEFT]: css`
      bottom: 20px;
      left: 20px;
    `,
    [NotificationPositionEnum.BOTTOM_CENTER]: css`
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    `,
    [NotificationPositionEnum.BOTTOM_RIGHT]: css`
      bottom: 20px;
      right: 20px;
    `,
  };

  return positions[position] || positions[NotificationPositionEnum.TOP_RIGHT];
};
