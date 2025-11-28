import { isAnyOf, ListenerMiddlewareInstance } from '@reduxjs/toolkit';
import { setSelectedScreenId, selectSelectedScreenId } from '@/entities/uiScreen';
import { setFocusEntity } from '@/entities/uiFocus';
import { selectCanvasByScreenId } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';
import { resetFocusedElementId, resetSelectedElementId } from '@/entities/uiElement';
import { setFocusedElementId, setSelectedElementId, selectElementById } from '@/entities/uiElement';
import type { RootState } from '@/app/store';


export const registerFocusHandlers = (listener: ListenerMiddlewareInstance) => {
    // Handler for screen selection - focus on root element of selected screen
    // Обработчик выбора экрана - фокус на root элемент выбранного экрана
    listener.startListening({
        matcher: isAnyOf(setSelectedScreenId),
        effect: (action, listenerApi) => {
            const screenId = action.payload;
            if (!screenId) return;

            const state = listenerApi.getState() as RootState;
            const canvas = selectCanvasByScreenId(state, screenId);

            if (canvas) {
                listenerApi.dispatch(setFocusEntity({
                    id: canvas.id,
                    kind: ENTITY_KINDS.CANVAS,
                }));
            }
        },
    });

    // Handler for clearing focus - focus on root element of current screen
    // Обработчик очистки фокуса - фокус на root элемент текущего экрана
    listener.startListening({
        matcher: isAnyOf(resetFocusedElementId, resetSelectedElementId),
        effect: (action, listenerApi) => {
            const state = listenerApi.getState() as RootState;
            const screenId = selectSelectedScreenId(state);
            if (!screenId) return;

            const canvas = selectCanvasByScreenId(state, screenId);

            if (canvas) {
                listenerApi.dispatch(setFocusEntity({
                    id: canvas.id,
                    kind: ENTITY_KINDS.CANVAS,
                }));
            }
        },
    });

    // Handler for element focus - focus on specific element
    // Обработчик фокуса на элементе - фокус на конкретный элемент
    listener.startListening({
        matcher: isAnyOf(setFocusedElementId, setSelectedElementId),
        effect: async (action, listenerApi) => {
            try {
                const elementId = action.payload as string;
                if (!elementId) return;
                const state = listenerApi.getState() as RootState;

                const element = selectElementById(state, elementId);
                
                if (element) {
                    listenerApi.dispatch(
                        setFocusEntity({
                            id: elementId,
                            kind: ENTITY_KINDS.ELEMENT,
                        })
                    );
                }
            } catch (error) {
                console.error(
                    '[FocusHandler] ❌ Error handling element focus:',
                    error
                );
            }
        },
    });
};

