import { createSlice } from '@reduxjs/toolkit';
import { SEARCH_AREA } from '../constants/searchArea';

const initialState = {
  searchMode: SEARCH_AREA.PROJECT, // Добавляем режим поиска
  filters: {
    projects: {
      selectedIds: [], // выбранные проекты для поиска
    },
    screens: {
      selectedIds: [], // выбранные экраны
      currentOnly: false, // только текущий экран
    },
    content: {
      includeComponents: false,
      includeElements: false,
      includeImages: false,
      includeText: false,

      includeTasks: false,
      includeDocuments: false,
      includeChats: false,
    },
  },
};

const searchSettingsSlice = createSlice({
  name: 'searchSettings',
  initialState,
  reducers: {
    // Режим поиска
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
      console.log('Search mode changed:', action.payload);
    },

    // Проекты
    toggleProjectInSearch: (state, action) => {
      const projectId = action.payload;
      const selectedIds = state.filters.projects.selectedIds;

      if (selectedIds.includes(projectId)) {
        state.filters.projects.selectedIds = selectedIds.filter(id => id !== projectId);
      } else {
        state.filters.projects.selectedIds = [...selectedIds, projectId];
      }
      // console.log('Selected projects:', state.filters.projects.selectedIds);
    },
    setSearchProjects: (state, action) => {
      state.filters.projects.selectedIds = action.payload;
      // console.log('Search projects set:', action.payload);
    },
    clearSearchProjects: (state) => {
      state.filters.projects.selectedIds = [];
      // console.log('Search projects cleared');
    },

    // Экраны
    toggleScreenInSearch: (state, action) => {
      const screenId = action.payload;
      const selectedIds = state.filters.screens.selectedIds;

      if (selectedIds.includes(screenId)) {
        state.filters.screens.selectedIds = selectedIds.filter(id => id !== screenId);
      } else {
        state.filters.screens.selectedIds = [...selectedIds, screenId];
      }
      // console.log('Selected screens:', state.filters.screens.selectedIds);
    },
    setSearchScreens: (state, action) => {
      state.filters.screens.selectedIds = action.payload;
      // console.log('Search screens set:', action.payload);
    },
    clearSearchScreens: (state) => {
      state.filters.screens.selectedIds = [];
      // console.log('Search screens cleared');
    },
    toggleCurrentScreenOnly: (state) => {
      state.filters.screens.currentOnly = !state.filters.screens.currentOnly;
      // console.log('Current screen only:', state.filters.screens.currentOnly);
    },

    // Контент
    toggleSearchComponents: (state) => {
      state.filters.content.includeComponents = !state.filters.content.includeComponents;
      console.log('Include components:', state.filters.content.includeComponents);
    },
    toggleSearchElements: (state) => {
      state.filters.content.includeElements = !state.filters.content.includeElements;
      console.log('Include elements:', state.filters.content.includeElements);
    },
    toggleSearchImages: (state) => {
      state.filters.content.includeImages = !state.filters.content.includeImages;
      console.log('Include images:', state.filters.content.includeImages);
    },
    toggleSearchText: (state) => {
      state.filters.content.includeText = !state.filters.content.includeText;
      console.log('Include text:', state.filters.content.includeText);
    },
    toggleSearchTasks: (state) => {
      state.filters.content.includeTasks = !state.filters.content.includeTasks;
      console.log('Include tasks:', state.filters.content.includeTasks);
    },
    toggleSearchDocuments: (state) => {
      state.filters.content.includeDocuments = !state.filters.content.includeDocuments;
      console.log('Include documents:', state.filters.content.includeDocuments);
    },
    toggleSearchChats: (state) => {
      state.filters.content.includeChats = !state.filters.content.includeChats;
      console.log('Include chats:', state.filters.content.includeChats);
    },

    // Общие
    setSearchFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      // console.log('Search filters updated:', state.filters);
    },
  },
});

export const {
  // Режим поиска
  setSearchMode,
  // Проекты
  toggleProjectInSearch,
  setSearchProjects,
  clearSearchProjects,
  // Экраны
  toggleScreenInSearch,
  setSearchScreens,
  clearSearchScreens,
  toggleCurrentScreenOnly,
  // Контент
  toggleSearchComponents,
  toggleSearchElements,
  toggleSearchImages,
  toggleSearchText,
  toggleSearchTasks,
  toggleSearchDocuments,
  toggleSearchChats,
  // Общие
  setSearchFilters,
} = searchSettingsSlice.actions;

export default searchSettingsSlice.reducer;
