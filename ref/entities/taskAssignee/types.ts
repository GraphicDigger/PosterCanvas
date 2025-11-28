import type { EntityState } from '@reduxjs/toolkit';

// Entity Schema
export interface TaskAssignee {
    id: string;
    memberId: string;
    taskId: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface TaskAssigneeUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface TaskAssigneeState extends EntityState<TaskAssignee, string>, TaskAssigneeUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface TaskAssigneeIdPayload {
    id: string | null;
}
