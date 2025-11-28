import { getGlobalEventBus } from '@/shared/services/eventBus';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    registerElementHandlers,
    registerTaskHandlers,
    registerFocusHandlers,
    registerScreenHandlers,
} from './handlers';


export const eventManagerMiddleware = createListenerMiddleware();

const eventBus = getGlobalEventBus();
const emit = eventBus.emit.bind(eventBus); // Bind context 'this' to eventBus instance / Привязываем контекст 'this' к экземпляру eventBus

registerElementHandlers(eventManagerMiddleware, emit);
registerTaskHandlers(eventManagerMiddleware, emit);
registerFocusHandlers(eventManagerMiddleware);
registerScreenHandlers(eventManagerMiddleware, emit);
