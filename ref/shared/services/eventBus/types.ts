import { EventType } from '@/shared/constants';
import { type ReactNode } from 'react';

// Re-export for convenience / Реэкспорт для удобства
export { EventType };

export interface EventBusProviderProps {
  children: ReactNode;
}

export type EventHandler<T = any> = (payload: T) => void;
export type Unsubscribe = () => void;

export interface EventEnvelope<T = any> {
  id: string;
  type: EventType;
  payload: T;
  createdAt: string;
  source?: string;
}

// Middleware function type / Тип функции middleware
export type EventMiddleware = (
  type: EventType,
  payload: any,
  next: () => void
) => void;


// Base event source / Базовый источник события
export interface EventSource {
  entityId: string;
  entityKind: string;
}

// Base event trigger / Базовый триггер события
export interface EventTrigger {
  entityId: string;
  entityKind: string;
}
