// Event handlers for element actions / Обработчики событий для действий с элементами
import type { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { addElement, addElements } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';
import { EventType } from '@/shared/constants';
import type { ElementCreatedPayload } from '@/shared/types';
import { selectCurrentMemberId } from '@/app/sessions/auth';


export const registerElementHandlers = (
  listener: ListenerMiddlewareInstance,
  emit: (type: EventType, payload: any) => void) => {

  listener.startListening({
    matcher: isAnyOf(addElement, addElements),
    effect: async (action, listenerApi) => {
      try {
        const { payload } = action as any;
        const state = listenerApi.getState() as RootState;

        const memberId = selectCurrentMemberId(state);

        const elements = Array.isArray(payload) ? payload : [payload];

        elements.forEach((element: any) => {
          if (element && element.id) {

            const payload: ElementCreatedPayload = {
              entityId: element.id,
              entityKind: ENTITY_KINDS.ELEMENT,
              tag: element.tag,
              createdBy: memberId || '',
              createdByType: ENTITY_KINDS.ACTOR_MEMBER,
              createdAt: new Date().toISOString(),
            };

            if (process.env.NODE_ENV === 'development') {
              console.log(`[ElementHandler] 📦 Event Payload: ${EventType.ELEMENT_CREATED}`,
                payload,
              );
            }

            emit(EventType.ELEMENT_CREATED, payload);

          }
        });
      } catch (error) {
        console.error('[ElementHandler] ❌ Error publishing event to EventBus:', error);
      }
    },
  });

  // Обработчики для добавления элементов и виджетов по умолчанию удалены, так как логика перенесена в хук useElementMutations.js
  // Handlers for adding default elements and widgets removed, logic moved to useElementMutations.js
};
