import { EventType } from '@/shared/constants';

export interface Event {
  id: string;
  kind: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  payload: Record<string, any>;
}

export interface ElementCreatedPayload {
  entityId: string;
  entityKind: string;
  tag: string;
  createdBy: string;
  createdByType: string;
  createdAt: string;
}

export interface ComponentCreatedPayload {
  componentId: string;
  name?: string;
  text?: string;
  projectId?: string;
  memberId?: string;
  isCode?: boolean;
}

export interface CodeCreatedPayload {
  codeId: string;
  text?: string;
  projectId?: string;
  memberId?: string;
}

export interface CommentAddedPayload {
  commentId: string;
  text: string;
  authorId?: string;
  projectId?: string;
  sourceEntityId?: string;
  sourceEntityKind?: string;
  taskTitle?: string;
}

export interface TaskCreatedPayload {
  taskId: string;
  title: string;
  projectId?: string;
  assigneeId?: string;
  dueDate?: string;
  memberId?: string;
}

export interface DocumentCreatedPayload {
  documentId: string;
  title?: string;
  projectId?: string;
  memberId?: string;
}

// Redux action payload / Payload для Redux действий
export interface ReduxActionPayload {
  action: {
    type: string;
    payload?: any;
  };
  state: any;
  timestamp?: number;
}

// Type-safe event payload map / Типобезопасная карта payload событий
export interface EventPayloadMap {
  // Redux events / События Redux
  [EventType.REDUX_ACTION]: ReduxActionPayload;
  // Dynamic Redux action types (e.g., "redux.elementEntity/addElement") / Динамические типы Redux действий
  [key: string]: ReduxActionPayload | any;

  // Element events / События элементов
  [EventType.ELEMENT_CREATED]: ElementCreatedPayload;
  [EventType.ELEMENT_UPDATED]: ElementCreatedPayload;
  [EventType.ELEMENT_DELETED]: { elementId: string; projectId?: string };

  // Component events / События компонентов
  [EventType.COMPONENT_CREATED]: ComponentCreatedPayload;
  [EventType.COMPONENT_CREATED_CODE]: ComponentCreatedPayload;
  [EventType.COMPONENT_CREATED_NOCODE]: ComponentCreatedPayload;
  [EventType.COMPONENT_UPDATED]: ComponentCreatedPayload;
  [EventType.COMPONENT_DELETED]: { componentId: string; projectId?: string };

  // Code events / События кода
  [EventType.CODE_CREATED]: CodeCreatedPayload;
  [EventType.CODE_UPDATED]: CodeCreatedPayload;
  [EventType.CODE_DELETED]: { codeId: string; projectId?: string };

  // Comment events / События комментариев
  [EventType.COMMENT_ADDED]: CommentAddedPayload;
  [EventType.COMMENT_ADDED_CODE]: CommentAddedPayload;
  [EventType.COMMENT_ADDED_NOCODE]: CommentAddedPayload;
  [EventType.COMMENT_UPDATED]: CommentAddedPayload;
  [EventType.COMMENT_DELETED]: { commentId: string; projectId?: string };

  // Task events / События задач
  [EventType.TASK_CREATED]: TaskCreatedPayload;
  [EventType.TASK_UPDATED]: TaskCreatedPayload;
  [EventType.TASK_DELETED]: { taskId: string; projectId?: string };
  [EventType.TASK_COMPLETED]: { taskId: string; projectId?: string; memberId?: string };

  // Document events / События документов
  [EventType.DOCUMENT_CREATED]: DocumentCreatedPayload;
  [EventType.DOCUMENT_UPDATED]: DocumentCreatedPayload;
  [EventType.DOCUMENT_DELETED]: { documentId: string; projectId?: string };

}

// Helper type to extract event type from payload map / Вспомогательный тип для извлечения типа события из карты payload
export type EventTypeFromPayloadMap = keyof EventPayloadMap;

// Helper type to get payload type for a specific event / Вспомогательный тип для получения типа payload для конкретного события
export type PayloadForEvent<T extends EventTypeFromPayloadMap> = EventPayloadMap[T];
