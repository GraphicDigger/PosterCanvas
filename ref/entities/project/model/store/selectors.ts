import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { makeSelectMemberByUserIdWorkspaceId } from '../../../actorMember';
import { makeSelectProjectIdsByMemberId } from '../../../projectMember';


// Base selectors
export const selectProjectState = (state: RootState) => state.projectEntity;
export const selectProjectEntities = (state: RootState) => selectProjectState(state).entities;
export const selectProjectIds = (state: RootState) => selectProjectState(state).ids;
export const selectProjectUI = (state: RootState) => selectProjectState(state).ui;

// UI selectors
export const selectHoveredProjectId = (state: RootState) => selectProjectUI(state).hoveredProjectId;
export const selectFocusedProjectId = (state: RootState) => selectProjectUI(state).focusedProjectId;
export const selectSelectedProjectId = (state: RootState) => selectProjectUI(state).selectedProjectId;

// Entity selectors
export const selectAllProjects = (state: RootState) => selectProjectIds(state).map(id => selectProjectById(state, id));
export const selectProjectById = (state: RootState, id: string) => selectProjectEntities(state)[id];

// check states
export const selectProjectCheckStates = createSelector(
  [selectSelectedProjectId, selectFocusedProjectId, selectHoveredProjectId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ProjectId) => ({
    isSelected: selectedId === ProjectId,
    isFocused: focusedId === ProjectId,
    isHovered: hoveredId === ProjectId,
  }),
);

export const selectSelectedProject = createSelector(
  [selectProjectEntities, selectSelectedProjectId],
  (projects, selectedId) => selectedId ? projects[selectedId] : null,
);

export const selectProjectsByIds = createSelector(
  [selectProjectEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectProjectById = (id: string) => createSelector(
  [selectProjectEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectProjectsByIds = (ids: string[] = []) => createSelector(
  [selectProjectEntities],
  (entities) => ids.map((id) => entities?.[id]).filter(Boolean),
);

export const makeSelectProjectsByWorkspaceId = (workspaceId: string) => createSelector(
  [selectProjectEntities],
  (entities) => {
    if (!workspaceId || !entities) {return [];}
    return Object.values(entities).filter(entity => entity.workspaceId === workspaceId);
  },
);

export const makeSelectProjectsByUserIdWorkspaceId = (userId: string, workspaceId: string) => createSelector(
  [
    selectProjectEntities,
    makeSelectMemberByUserIdWorkspaceId(userId, workspaceId),
  ], (allProjects, workspaceMember) => {
    if (!userId || !allProjects || !workspaceMember) {return [];}
    // Get member project IDs directly from the member entity
    const memberProjectsIds = workspaceMember.projectIds || [];
    const memberProjects = Object.values(allProjects).filter(p => memberProjectsIds.includes(p.id));
    return memberProjects;
  },
);

// get current database type
export const selectCurrentDatabaseType = createSelector(
  [selectSelectedProject],
  (project) => project?.settings?.databaseType,
);
