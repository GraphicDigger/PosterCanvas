import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { Task } from '../../types';
import { selectMembersById, makeSelectMemberByUserIdWorkspaceId, selectMemberEntities, makeSelectCompositeMembersByIds } from '../@x/actorMember';
import { makeSelectTaskIdsByAssigneeMemberId, makeSelectAssigneeMemberIdsByTaskId } from '../../../taskAssignee';
import { makeSelectProjectById } from '../../../project';
import { selectContextObjectsMap } from '../../../entityContextLink';

export const selectTaskState = (state: RootState) => state.taskEntity;
export const selectTaskEntities = (state: RootState) => selectTaskState(state).entities;
export const selectTaskIds = (state: RootState) => selectTaskState(state).ids;

export const selectHoveredTaskId = (state: RootState) => selectTaskState(state).hoveredId;
export const selectFocusedTaskId = (state: RootState) => selectTaskState(state).focusedId;
export const selectSelectedTaskId = (state: RootState) => selectTaskState(state).selectedId;

export const selectTaskCheckStates = createSelector(
  [selectSelectedTaskId, selectFocusedTaskId, selectHoveredTaskId, (_, id) => id],
  (selectedId, focusedId, hoveredId, TaskId) => ({
    isSelected: selectedId === TaskId,
    isFocused: focusedId === TaskId,
    isHovered: hoveredId === TaskId,
  }),
);

export const selectAllTasks = createSelector(
  [selectTaskEntities, selectTaskIds, (state) => state],
  (entities, ids, state) => {
    return (ids || []).map((id: string) =>
      ({
        ...entities[id],
        member: selectMembersById(state, entities[id].userId) || null,
      })).filter(Boolean) as Task[];
  },
);

export const selectSelectedTask = createSelector(
  [selectSelectedTaskId, selectTaskEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// Simple selectors without make prefix for backward compatibility
export const selectTaskById = (state: RootState, id: string) => selectTaskEntities(state)[id] || null;

export const selectTasksByIds = createSelector(
  [selectTaskEntities, (_, ids: string[]) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectTaskById = (id: string) => createSelector(
  [selectTaskEntities],
  (entities) => {
    const task = entities?.[id] ?? null;
    // console.log('[makeSelectTaskById] task', task);
    return task;
  },
);

export const makeSelectTaskByIds = (ids: string[] = []) => createSelector(
  [selectTaskEntities],
  (entities) => ids.map((id) => entities?.[id]).filter(Boolean),
);

export const makeSelectCompositeTaskByIds = (ids: string[] = []) => createSelector(
  [makeSelectTaskByIds(ids), selectMemberEntities, selectContextObjectsMap, (state) => state],
  (tasks, members, contextObjectsMap, state) => {
    return tasks.map((task) => {
      const assigneesIds = makeSelectAssigneeMemberIdsByTaskId(task.id)(state);
      const enrichedAssignees = makeSelectCompositeMembersByIds(assigneesIds)(state);
      const project = makeSelectProjectById(task.projectId)(state);
      const context = contextObjectsMap[task.id];
      return {
        ...task,
        creatorMember: members[task.createdBy],
        responsibleMember: members[task.responsible],
        assignees: enrichedAssignees,
        project,
        context,
      };
    });
  },
);

export const makeSelectTasksByProjectId = (projectId: string) => createSelector(
  [selectTaskEntities],
  (entities) => Object.values(entities).filter(entity => entity.projectId === projectId),
);

export const makeSelectTasksByCreatorMemberId = (memberId: string) => createSelector(
  [selectTaskEntities],
  (entities) => Object.values(entities).filter(entity => entity.createdBy === memberId),
);

export const makeSelectTasksByResponsibleMemberId = (memberId: string) => createSelector(
  [selectTaskEntities],
  (entities) => Object.values(entities).filter(entity => entity.responsible === memberId),
);

export const makeSelectMemberTasksByUserIdWorkspaceId = (userId: string, workspaceId: string) => createSelector(
  [
    selectTaskEntities,
    makeSelectMemberByUserIdWorkspaceId(userId, workspaceId),
    (state) => state,
  ], (allTasks, workspaceMember, state) => {

    if (!userId || !allTasks || !workspaceMember) {return [];}
    const memberAssignedTaskIds = makeSelectTaskIdsByAssigneeMemberId(workspaceMember?.id)(state);
    const memberCreatedTaskIds = makeSelectTasksByCreatorMemberId(workspaceMember?.id)(state).map(task => task.id);
    const memberResponsibleTaskIds = makeSelectTasksByResponsibleMemberId(workspaceMember?.id)(state).map(task => task.id);
    const memberTaskIds = Array.from(new Set([
      ...memberAssignedTaskIds,
      ...memberCreatedTaskIds,
      ...memberResponsibleTaskIds,
    ]));
    const memberTasks = makeSelectCompositeTaskByIds(memberTaskIds)(state);
    return memberTasks;
  },
);

