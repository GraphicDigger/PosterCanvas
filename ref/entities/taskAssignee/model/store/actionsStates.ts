import type { PayloadAction } from '@reduxjs/toolkit';
import type { TaskAssigneeState, TaskAssigneeIdPayload, TaskAssigneeUIState } from '../../types';

export const initialUIState: TaskAssigneeUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredTaskAssigneeId: (state: TaskAssigneeState, action: PayloadAction<TaskAssigneeIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedTaskAssigneeId: (state: TaskAssigneeState, action: PayloadAction<TaskAssigneeIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedTaskAssigneeId: (state: TaskAssigneeState, action: PayloadAction<TaskAssigneeIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedTaskAssignee: (state: TaskAssigneeState) => {
    state.selectedId = null;
  },
};

