import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface Chat {
    id: string;
    name: string;
    kind: string;
    projectId: string;
    userId: string;
    lastMessage: string;
    preview: string;
    createdAt: string;
    modifiedAt: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface ChatUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface ChatState extends EntityState<Chat, string>, ChatUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface ChatIdPayload {
    id: string | null;
}
