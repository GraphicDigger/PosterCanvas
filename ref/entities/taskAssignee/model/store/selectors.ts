import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { TaskAssignee } from '../../types';

export const selectTaskAssigneeState = (state: RootState) => state.taskAssigneeEntity;
export const selectTaskAssigneeEntities = (state: RootState) => selectTaskAssigneeState(state).entities;
export const selectTaskAssigneeIds = (state: RootState) => selectTaskAssigneeState(state).ids;

export const selectHoveredTaskAssigneeId = (state: RootState) => selectTaskAssigneeState(state).hoveredId;
export const selectFocusedTaskAssigneeId = (state: RootState) => selectTaskAssigneeState(state).focusedId;
export const selectSelectedTaskAssigneeId = (state: RootState) => selectTaskAssigneeState(state).selectedId;

export const selectTaskAssigneeCheckStates = createSelector(
  [selectSelectedTaskAssigneeId, selectFocusedTaskAssigneeId, selectHoveredTaskAssigneeId, (_, id) => id],
  (selectedId, focusedId, hoveredId, TaskAssigneeId) => ({
    isSelected: selectedId === TaskAssigneeId,
    isFocused: focusedId === TaskAssigneeId,
    isHovered: hoveredId === TaskAssigneeId,
  }),
);

export const selectAllTaskAssignees = createSelector(
  [selectTaskAssigneeEntities, selectTaskAssigneeIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as TaskAssignee[],
);

export const selectSelectedTaskAssignee = createSelector(
  [selectSelectedTaskAssigneeId, selectTaskAssigneeEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const makeSelectTaskAssigneeById = (id: string) => createSelector(
  [selectTaskAssigneeEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectTaskAssigneesByIds = (ids: string[] = []) => createSelector(
  [selectTaskAssigneeEntities],
  (entities) => ids.map((id: string) => entities?.[id]).filter(Boolean) as TaskAssignee[],
);

export const makeSelectAssigneeMemberIdsByTaskId = (taskId: string) => createSelector(
  [selectTaskAssigneeEntities],
  (entities) => Object.values(entities)
    .filter((entity: TaskAssignee) => entity.taskId === taskId)
    .map((entity: TaskAssignee) => entity.memberId),
);

export const makeSelectTaskIdsByAssigneeMemberId = (memberId: string) => createSelector(
  [selectTaskAssigneeEntities],
  (entities) => Object.values(entities)
    .filter((entity: TaskAssignee) => entity.memberId === memberId)
    .map((entity: TaskAssignee) => entity.taskId),
);

