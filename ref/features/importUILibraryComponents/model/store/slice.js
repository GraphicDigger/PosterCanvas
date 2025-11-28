import { createSlice } from '@reduxjs/toolkit';

// Начальное состояние
const initialState = {
  currentStep: 'librarySelection',
  selectedLibraryId: null,
  selectedComponentsIds: [],
};

// Создаем slice
const UILibraryComponentsImporterSlice = createSlice({
  name: 'UILibraryComponentsImporter',
  initialState,
  reducers: {
    // Установка текущего шага
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    // Выбор библиотеки
    setSelectedLibraryId: (state, action) => {
      state.selectedLibraryId = action.payload;
      console.log('selectedLibraryId', state.selectedLibraryId);
    },

    // Установка выбранных компонентов
    setSelectedComponentsIds: (state, action) => {
      state.selectedComponentsIds = action.payload;
      console.log('selectedComponentsIds', state.selectedComponentsIds);
    },

    // Сброс состояния
    resetImporterState: (state) => {
      state.currentStep = 'librarySelection';
      state.selectedLibraryId = null;
      state.selectedComponentsIds = [];
    },
  },
});

// Экспортируем actions и reducer
export const {
  setCurrentStep,
  setSelectedLibraryId,
  setSelectedComponentsIds,
  resetImporterState,
} = UILibraryComponentsImporterSlice.actions;

export default UILibraryComponentsImporterSlice.reducer;
