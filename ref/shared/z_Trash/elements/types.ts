import type { EntityState } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '@/shared/constants';

// Entity Schema
export interface DefaultElement {
    id: string;
    name: string;
    tag: string;
    type: (typeof ENTITY_KINDS.ELEMENT) | (typeof ENTITY_KINDS.WIDGET);
}

// Redux State Schemas

// Состояние UI-взаимодействий (фокус, выбор и т.д.)
export interface DefaultElementsUIState {
    hoveredId: string | null;
    focusedId: string | null;
    selectedId: string | null;
}

// Объединяет в себе нормализованные данные и состояние UI
export interface DefaultElementsState extends EntityState<DefaultElement, string>, DefaultElementsUIState {}

// Полезная нагрузка для экшенов, работающих с ID
export interface DefaultElementsIdPayload {
    id: string | null;
}
