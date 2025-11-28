import type { PayloadAction } from '@reduxjs/toolkit';
import type { TaskState, TaskIdPayload, TaskUIState } from '../../types';

export const initialUIState: TaskUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredTaskId: (state: TaskState, action: PayloadAction<TaskIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedTaskId: (state: TaskState, action: PayloadAction<TaskIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedTaskId: (state: TaskState, action: PayloadAction<TaskIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedTask: (state: TaskState) => {
    state.selectedId = null;
  },
};

