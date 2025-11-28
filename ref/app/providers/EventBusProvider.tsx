// app/providers/EventBusProvider.tsx
// EventBus Provider for React Context / Провайдер EventBus для React Context

import { FC, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { EventBusContext, getGlobalEventBus, EventBusProviderProps } from '@/shared/services/eventBus';
import { addEvent } from '@/entities/event';
import type { Event } from '@/shared/types';

/**
 * EventBus Provider / Провайдер EventBus
 *
 * Responsibilities / Ответственности:
 * - Provide EventBus instance via Context / Предоставление экземпляра EventBus через Context
 * - Initialize EventBus to automatically dispatch Events to Redux / Инициализация EventBus для автоматической отправки событий в Redux
 */
export const EventBusProvider: FC<EventBusProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const eventBus = useMemo(() => getGlobalEventBus(), []);

  const isDevMode: boolean = process.env.NODE_ENV === 'development';
  const LOG = {
    info: (...msg: any[]) => isDevMode && console.log('[E-BUS-PROVIDER][I]', ...msg),
    warn: (...msg: any[]) => isDevMode && console.warn('[E-BUS-PROVIDER][W]', ...msg),
    error: (...msg: any[]) => isDevMode && console.error('[E-BUS-PROVIDER][E]', ...msg),
  };

  useEffect(() => {
    LOG.info('🚀 Initializing EventBus dispatch integration');

    // Инициализируем EventBus с колбэком, который диспатчит события в Redux
    const cleanup = eventBus.initialize((event: Event) => {
      try {
        dispatch(addEvent(event as any));
        LOG.info(`🟢 Dispatched Event to Redux: ${event.type}`);

      } catch (error) {
        LOG.error('🔴 Error dispatching Event to Redux:', error);
      }
    });

    // Очистка при размонтировании
    return () => {
      LOG.info('🧹 Cleaning up EventBus dispatch integration');
      cleanup();
    };
  }, [dispatch, eventBus]);

  return (
    <EventBusContext.Provider value={eventBus}>
      {children}
    </EventBusContext.Provider>
  );
};

