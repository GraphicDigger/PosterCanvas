import { ENTITY_KINDS } from '../../../shared/constants';
import { Notification, NotificationTypeEnum, NotificationPriorityEnum } from '@/shared/services/eventNotification';
import { EventType } from '@/shared/constants';


export const notifications: Notification[] = [
  // Уведомление о создании компонента для менеджера проекта (event_001)
  {
    id: 'notification_001',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_001',
    eventType: EventType.COMPONENT_CREATED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_001',
      eventType: EventType.COMPONENT_CREATED,
      createdBy: 'id-user-1-member-1-workspace-1',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Иван создал новый компонент PrimaryButton в проекте Alpha',
    text: 'Иван создал новый компонент PrimaryButton в проекте Alpha',
    priority: NotificationPriorityEnum.MEDIUM,
    recipients: ['user_manager', 'user_team_lead'], // исполнитель

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },

  // Уведомление о создании компонента для дизайнера (event_002)
  {
    id: 'notification_002',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_002',
    eventType: EventType.COMPONENT_CREATED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_002',
      eventType: EventType.COMPONENT_CREATED,
      createdBy: 'id-user-2-member-1-workspace-2',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Мария создала новый компонент UserProfileCard в проекте Beta',
    text: 'Мария создала новый компонент UserProfileCard в проекте Beta',
    priority: NotificationPriorityEnum.MEDIUM,
    recipients: ['user_designer', 'user_manager'],

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },

  // Уведомление о комментарии для исполнителя задачи (event_003)
  {
    id: 'notification_003',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_003',
    eventType: EventType.COMMENT_ADDED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_003',
      eventType: EventType.COMMENT_ADDED,
      createdBy: 'id-user-3-member-1-workspace-3',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Алексей прокомментировал вашу задачу: "Отличная работа! Все выглядит хорошо."',
    text: 'Алексей прокомментировал вашу задачу: "Отличная работа! Все выглядит хорошо."',
    priority: NotificationPriorityEnum.HIGH,
    recipients: ['user_task_owner'],

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },

  // Уведомление о комментарии к компоненту для его создателя (event_004)
  {
    id: 'notification_004',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_004',
    eventType: EventType.COMMENT_ADDED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_004',
      eventType: EventType.COMMENT_ADDED,
      createdBy: 'id-user-5-member-1-workspace-5',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Вы оставили комментарий к своему компоненту: "Нужно проверить размеры на мобильных устройствах."',
    text: 'Вы оставили комментарий к своему компоненту: "Нужно проверить размеры на мобильных устройствах."',
    priority: NotificationPriorityEnum.LOW,
    recipients: ['user_123'],

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },

  // Уведомление о назначении задачи (event_005)
  {
    id: 'notification_005',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_005',
    eventType: EventType.TASK_CREATED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_005',
      eventType: EventType.TASK_CREATED,
      createdBy: 'id-user-5-member-1-workspace-5',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Мария назначила вам задачу "Разработать новый компонент Header" в проекте Beta',
    text: 'Мария назначила вам задачу "Разработать новый компонент Header" в проекте Beta',
    priority: NotificationPriorityEnum.HIGH,
    recipients: ['user_123'],

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },

  // Уведомление о назначении задачи (event_006)
  {
    id: 'notification_006',
    kind: ENTITY_KINDS.NOTIFICATION,
    type: NotificationTypeEnum.INFO,
    eventId: 'event_006',
    eventType: EventType.TASK_CREATED,
    createdAt: new Date().toISOString(),

    source: {
      eventId: 'event_006',
      eventType: EventType.TASK_CREATED,
      createdBy: 'id-user-2-member-1-workspace-2',
      createdByType: ENTITY_KINDS.ACTOR_MEMBER,
    },
    title: 'Администратор назначил вам задачу "Провести ревью дизайна страницы настроек" в проекте Gamma',
    text: 'Администратор назначил вам задачу "Провести ревью дизайна страницы настроек" в проекте Gamma',
    priority: NotificationPriorityEnum.HIGH,
    recipients: ['user_789'],

    shownAt: new Date().toISOString(),
    readAt: null,
    dismissedAt: null,
  },
];
