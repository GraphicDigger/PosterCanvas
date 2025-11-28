import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface Document {
    id: string;
    title: string;
    kind: string;
    projectId: string;
    memberId: string;
    createdAt: string;
    modifiedAt?: string;
    content: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface DocumentUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface DocumentState extends EntityState<Document, string>, DocumentUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface DocumentIdPayload {
    id: string | null;
}
