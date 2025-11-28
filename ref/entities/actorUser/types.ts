import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface User {
    id: string;
    name: string;
    avatar: string;
    kind: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface UserUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface UserState extends EntityState<User, string>, UserUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface UserIdPayload {
    id: string | null;
}
