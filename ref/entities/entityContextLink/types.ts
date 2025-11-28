import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface ContextLink {
    id: string;
    entityId: string; // screen, block, document, chat, state, ...
    entityType: string;
    contextId: string;
    contextType: string; // document, chat, file, link, note
    relation: 'attached' | 'reference' | 'discussion' | 'requirement'; // character of the link
    createdBy: string; // userId
    createdAt: string;
    updatedAt: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface ContextLinkUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface ContextLinkState extends EntityState<ContextLink, string>, ContextLinkUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface ContextLinkIdPayload {
    id: string | null;
}
