import type { EntityState } from '@reduxjs/toolkit';

export type TaskStatus = 'todo' | 'inProgress' | 'done'; // статус задачи

// Entity Schema
export interface Task {
    id: string;
    kind: string;
    projectId: string;
    status: TaskStatus;

    createdBy: string;
    createdAt: string;
    updatedAt: string;
    responsible: string | null;
    assigneeTo?: string[] | null;

    name: string;
    description?: string;
    dueDate?: string;
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface TaskUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface TaskState extends EntityState<Task, string>, TaskUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface TaskIdPayload {
    id: string | null;
}
