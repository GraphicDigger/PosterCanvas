import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface ProjectMember {
    id: string;
    projectId: string;
    memberId: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface ProjectMemberUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface ProjectMemberState extends EntityState<ProjectMember, string>, ProjectMemberUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface ProjectMemberIdPayload {
    id: string | null;
}
