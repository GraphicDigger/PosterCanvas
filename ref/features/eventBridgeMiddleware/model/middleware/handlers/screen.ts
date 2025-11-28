// Event handlers for screen actions / Обработчики событий для действий с экранами
import type { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { addScreen } from '@/entities/uiScreen';
import { addElement } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';
import { EventType } from '@/shared/constants';
import type { ElementCreatedPayload } from '@/shared/types';
import { selectCurrentMemberId } from '@/app/sessions/auth';

// Создание canvas элемента для экрана / Create canvas element for screen
const createCanvasElement = (screenId: string) => {
  return {
    id: `canvas-${screenId}`,
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: screenId,
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
    events: {},
  };
};

export const registerScreenHandlers = (
  listener: ListenerMiddlewareInstance,
  emit: (type: EventType, payload: any) => void) => {

  listener.startListening({
    matcher: isAnyOf(addScreen),
    effect: async (action, listenerApi) => {
      try {
        const { payload } = action as any;
        const state = listenerApi.getState() as RootState;

        const memberId = selectCurrentMemberId(state);

        // Получаем ID экрана из payload
        const screenId = payload?.id || (Array.isArray(payload) ? payload[0]?.id : null);

        if (!screenId) {
          console.warn('[ScreenHandler] ⚠️ Screen ID not found in payload');
          return;
        }

        // Создаем canvas элемент для экрана
        const canvasElement = createCanvasElement(screenId);

        // Диспатчим создание canvas элемента
        listenerApi.dispatch(addElement(canvasElement as any));

        // Публикуем событие о создании canvas элемента
        const eventPayload: ElementCreatedPayload = {
          entityId: canvasElement.id,
          entityKind: ENTITY_KINDS.ELEMENT,
          tag: canvasElement.tag,
          createdBy: memberId || '',
          createdByType: ENTITY_KINDS.ACTOR_MEMBER,
          createdAt: new Date().toISOString(),
        };

        if (process.env.NODE_ENV === 'development') {
          console.log(`[ScreenHandler] 📦 Canvas created for screen ${screenId}:`, canvasElement);
          console.log(`[ScreenHandler] 📦 Event Payload: ${EventType.ELEMENT_CREATED}`, eventPayload);
        }
        //TODO: add screen created event to activity
        emit(EventType.ELEMENT_CREATED, eventPayload);

      } catch (error) {
        console.error('[ScreenHandler] ❌ Error creating canvas for screen:', error);
      }
    },
  });

};
