import { useState, useCallback } from 'react';

export const useFileList = ({ multiple = false }) => {
  const [files, setFiles] = useState([]);

  // Добавление файлов
  const addFiles = useCallback((newFiles) => {
    const updatedFiles = multiple
      ? [...files, ...newFiles]
      : [newFiles[0]];

    setFiles(updatedFiles);
    return updatedFiles;
  }, [files, multiple]);

  // Удаление файла по индексу
  const removeFile = useCallback((indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    return updatedFiles;
  }, [files]);

  // Сброс списка файлов
  const resetFiles = useCallback(() => {
    setFiles([]);
    return [];
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    resetFiles,
  };
};
