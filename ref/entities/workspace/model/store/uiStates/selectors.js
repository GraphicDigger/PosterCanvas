import { selectWorkspaceUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredWorkspaceId = (state) => selectWorkspaceUI(state).hoveredWorkspaceId;
export const selectFocusedWorkspaceId = (state) => selectWorkspaceUI(state).focusedWorkspaceId;
export const selectSelectedWorkspaceId = (state) => selectWorkspaceUI(state).selectedWorkspaceId;

export const selectWorkspaceCheckStates = createSelector(
  [selectSelectedWorkspaceId, selectFocusedWorkspaceId, selectHoveredWorkspaceId, (_, id) => id],
  (selectedId, focusedId, hoveredId, WorkspaceId) => ({
    isSelected: selectedId === WorkspaceId,
    isFocused: focusedId === WorkspaceId,
    isHovered: hoveredId === WorkspaceId,
  }),
);
