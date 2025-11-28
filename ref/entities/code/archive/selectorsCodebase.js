import { createSelector } from '@reduxjs/toolkit';

// Базовые селекторы
export const selectCodebaseState = (state) => state.codeEntity;
export const selectFiles = (state) => selectCodebaseState(state).files;
export const selectFileTree = (state) => selectCodebaseState(state).fileTree;
export const selectIsCodebaseInitialized = (state) => selectCodebaseState(state).initialized;

// Селектор для получения файла по пути
export const selectFileByPath = createSelector(
  [selectFiles, (_, path) => path],
  (files, path) => {
    if (!files || !path) {return null;}
    return files[path] || null;
  },
);

// Селектор для получения всех файлов как массив
export const selectAllFiles = createSelector(
  [selectFiles],
  (files) => {
    if (!files) {return [];}
    return Object.entries(files).map(([path, file]) => ({
      path,
      ...file,
    }));
  },
);

// Селектор для получения файлов по типу
export const selectFilesByType = createSelector(
  [selectAllFiles, (_, fileType) => fileType],
  (files, fileType) => {
    if (!files || !fileType) {return [];}
    return files.filter(file => file.type === fileType);
  },
);

// Селектор для получения части дерева файлов
export const selectFileTreeBranch = createSelector(
  [selectFileTree, (_, path) => path],
  (fileTree, path) => {
    if (!fileTree || !path) {return null;}

    // Если запрашивается корень
    if (path === '/' || path === '') {
      return fileTree;
    }

    // Разбиваем путь на сегменты
    const segments = path.split('/').filter(Boolean);
    let currentBranch = fileTree;

    // Перемещаемся по сегментам пути
    for (const segment of segments) {
      if (!currentBranch || !currentBranch[segment]) {
        return null;
      }
      currentBranch = currentBranch[segment].children;
    }

    return currentBranch;
  },
);

// Проверка существования файла
export const selectFileExists = createSelector(
  [selectFiles, (_, path) => path],
  (files, path) => {
    if (!files || !path) {return false;}
    return !!files[path];
  },
);

// Получение содержимого файла
export const selectFileContent = createSelector(
  [selectFileByPath],
  (file) => {
    if (!file) {return '';}
    return file.content || '';
  },
);

// Селектор для получения метаданных файла
export const selectFileMetadata = createSelector(
  [selectFileByPath],
  (file) => {
    if (!file) {return null;}
    return file.metadata || null;
  },
);
