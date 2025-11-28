// Event handlers for element actions / Обработчики событий для действий с элементами
import type { ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { addTask } from '@/entities/task';
import { ENTITY_KINDS } from '@/shared/constants';
import { EventType } from '@/shared/constants';
import type { TaskCreatedPayload } from '@/shared/types';
import { selectCurrentMemberId } from '@/app/sessions/auth';

export const registerTaskHandlers = (
  listener: ListenerMiddlewareInstance,
  emit: (type: EventType, payload: any) => void) => {

  listener.startListening({
    matcher: isAnyOf(addTask),
    effect: async (action, listenerApi) => {
      try {
        const { payload } = action as any;
        const taskId = payload.id;
        const state = listenerApi.getState() as RootState;

        const memberId = selectCurrentMemberId(state);

        const taskPayload: TaskCreatedPayload = {
          entityId: taskId,
          entityKind: ENTITY_KINDS.TASK,
          createdBy: memberId || '',
          createdAt: new Date().toISOString(),
        };

        if (process.env.NODE_ENV === 'development') {
          console.log(`[TaskHandler] 📦 Event Payload: ${EventType.TASK_CREATED}`, taskPayload);
        }

        emit(EventType.TASK_CREATED, taskPayload);

      } catch (error) {
        console.error('[ElementHandler] ❌ Error publishing event to EventBus:', error);
      }
    },
  });
};
