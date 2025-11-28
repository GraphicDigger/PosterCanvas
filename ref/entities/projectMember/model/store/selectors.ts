import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { ProjectMember } from '../../types';

export const selectProjectMemberState = (state: RootState) => state.projectMemberEntity;
export const selectProjectMemberEntities = (state: RootState) => selectProjectMemberState(state).entities;
export const selectProjectMemberIds = (state: RootState) => selectProjectMemberState(state).ids;

export const selectHoveredProjectMemberId = (state: RootState) => selectProjectMemberState(state).hoveredId;
export const selectFocusedProjectMemberId = (state: RootState) => selectProjectMemberState(state).focusedId;
export const selectSelectedProjectMemberId = (state: RootState) => selectProjectMemberState(state).selectedId;

export const selectProjectMemberCheckStates = createSelector(
  [selectSelectedProjectMemberId, selectFocusedProjectMemberId, selectHoveredProjectMemberId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ProjectMemberId) => ({
    isSelected: selectedId === ProjectMemberId,
    isFocused: focusedId === ProjectMemberId,
    isHovered: hoveredId === ProjectMemberId,
  }),
);

export const selectAllProjectMembers = createSelector(
  [selectProjectMemberEntities, selectProjectMemberIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as ProjectMember[],
);

export const selectSelectedProjectMember = createSelector(
  [selectSelectedProjectMemberId, selectProjectMemberEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const makeSelectMemberIdsByProjectId = (projectId: string) => createSelector(
  [selectProjectMemberEntities],
  (entities) => Object.values(entities)
    .filter((entity: ProjectMember) => entity.projectId === projectId)
    .map((entity: ProjectMember) => entity.memberId),
);

export const makeSelectProjectIdsByMemberId = (memberId: string) => createSelector(
  [selectProjectMemberEntities],
  (entities) => Object.values(entities)
    .filter((entity: ProjectMember) => entity.memberId === memberId)
    .map((entity: ProjectMember) => entity.projectId),
);
