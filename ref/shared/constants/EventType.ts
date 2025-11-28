// Enum for application event types / Enum для типов событий в приложении
export enum EventType {
    // Redux events / События Redux
    REDUX_ACTION = 'redux.*',
    REDUX_ACTION_PREFIX = 'redux.',

    SYSTEM = 'system', //maintenance, platform_update, downtime
    INFO = 'info', // workspace_update, team_joined, project_edit
    SERVICE = 'service', // hr_message, salary_update, legal_notice
    CALENDAR = 'calendar', //meeting_created, calendar_reminder, invite
    SUBSCRIPTIONS = 'subscriptions', //new_follower, unfollowed, subscribed_to
    MANUAL = 'manual',   // Manual event / Событие для уведомлений, созданных вручную

    // Element events / События элементов
    ELEMENT_CREATED = 'element.created',
    ELEMENT_UPDATED = 'element.updated',
    ELEMENT_DELETED = 'element.deleted',

    // Screen events / События экранов
    SCREEN_CREATED = 'screen.created',
    SCREEN_UPDATED = 'screen.updated',
    SCREEN_DELETED = 'screen.deleted',

    // Event events / События событий
    EVENT_CREATED = 'event.created',
    EVENT_UPDATED = 'event.updated',
    EVENT_DELETED = 'event.deleted',

    // Component events / События компонентов
    COMPONENT_CREATED = 'component.created',
    COMPONENT_CREATED_CODE = 'component.created.code',
    COMPONENT_CREATED_NOCODE = 'component.created.nocode',
    COMPONENT_UPDATED = 'component.updated',
    COMPONENT_DELETED = 'component.deleted',

    // Code events / События кода
    CODE_CREATED = 'code.created',
    CODE_UPDATED = 'code.updated',
    CODE_DELETED = 'code.deleted',

    // Comment events / События комментариев
    COMMENT_ADDED = 'comment.added',
    COMMENT_UPDATED = 'comment.updated',
    COMMENT_DELETED = 'comment.deleted',
    COMMENT_ADDED_CODE = 'comment.added.code',
    COMMENT_ADDED_NOCODE = 'comment.added.nocode',

    // Task events / События задач
    TASK_CREATED = 'task.created',
    TASK_UPDATED = 'task.updated',
    TASK_DELETED = 'task.deleted',
    TASK_COMPLETED = 'task.completed',

    // Document events / События документов
    DOCUMENT_CREATED = 'document.created',
    DOCUMENT_UPDATED = 'document.updated',
    DOCUMENT_DELETED = 'document.deleted',

  }

// Type guard для проверки типа события / Type guard to check event type
export const isEventType = (value: string): value is EventType => {
  return Object.values(EventType).includes(value as EventType);
};

// Helper type для извлечения всех значений enum
// Helper type to extract all enum values
export type EventTypeValue = `${EventType}`;
