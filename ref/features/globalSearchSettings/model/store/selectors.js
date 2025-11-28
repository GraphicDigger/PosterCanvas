import { createSelector } from '@reduxjs/toolkit';
import { SEARCH_AREA } from '../constants/searchArea';

// Base selectors
export const selectSearchState = (state) => state.searchSettings;
export const selectSearchFilters = (state) => selectSearchState(state).filters;

// Projects filters
export const selectProjectsFilter = (state) => selectSearchFilters(state).projects;
export const selectSelectedProjectIds = (state) => selectProjectsFilter(state).selectedIds;

// Screens filters
export const selectScreensFilter = (state) => selectSearchFilters(state).screens;
export const selectSelectedScreenIds = (state) => selectScreensFilter(state).selectedIds;
export const selectIsCurrentScreenOnly = (state) => selectScreensFilter(state).currentOnly;

// Content filters
export const selectContentFilter = (state) => selectSearchFilters(state).content;
export const selectIncludeComponents = (state) => selectContentFilter(state).includeComponents;
export const selectIncludeElements = (state) => selectContentFilter(state).includeElements;
export const selectIncludeImages = (state) => selectContentFilter(state).includeImages;
export const selectIncludeText = (state) => selectContentFilter(state).includeText;
export const selectIncludeTasks = (state) => selectContentFilter(state).includeTasks;
export const selectIncludeDocuments = (state) => selectContentFilter(state).includeDocuments;
export const selectIncludeChats = (state) => selectContentFilter(state).includeChats;

// Computed selectors
export const selectIsScreenSelected = createSelector(
  [selectSelectedScreenIds, (_, screenId) => screenId],
  (selectedIds, screenId) => selectedIds.includes(screenId),
);

export const selectSearchSettings = createSelector(
  [selectSearchFilters],
  (filters) => ({
    projects: filters.projects,
    screens: filters.screens,
    content: filters.content,
  }),
);

// Search mode selectors
export const selectSearchMode = (state) => selectSearchState(state).searchMode;
export const selectIsProjectMode = createSelector(
  [selectSearchMode],
  (mode) => mode === SEARCH_AREA.PROJECT,
);
export const selectIsWorkspaceMode = createSelector(
  [selectSearchMode],
  (mode) => mode === SEARCH_AREA.WORKSPACE,
);
