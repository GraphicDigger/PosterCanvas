import { useState, useCallback, useMemo } from 'react';
import { useFileList } from './useFileList';
import { useFileUploader } from './useFileUploader';

export const useFileUpload = ({
  multiple = false,
  onChange,
  onUpload = null,
  uploadUrl = 'src/upload',
  maxFileSize = 5 * 1024 * 1024,
}) => {
  const [error, setError] = useState(null);

  // Логика работы с файлами (добавление/удаление файлов)
  const {
    files,
    addFiles,
    removeFile,
    resetFiles,
  } = useFileList({ multiple });

  // Логика загрузки файлов на сервер
  const {
    isUploading,
    uploadedFiles,
    uploadFiles,
    removeUploadedFile,
  } = useFileUploader({
    uploadUrl,
    maxFileSize,
    setError,
    multiple,
  });

  // Обработчик выбора файлов
  const handleFileChange = useCallback(async (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Обновляем список файлов
    const newFiles = addFiles(selectedFiles);

    // Вызываем onChange с выбранными файлами
    if (onChange) {
      onChange(multiple ? newFiles : newFiles[0] || null);
    }

    // Если указан обработчик onUpload, загружаем файлы на сервер
    if (onUpload && selectedFiles.length > 0) {
      try {
        const uploaded = await uploadFiles(selectedFiles);

        // Вызываем callback с информацией о загруженных файлах
        onUpload(multiple ? uploaded : uploaded[0] || null);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [multiple, onChange, onUpload, addFiles, uploadFiles]);

  // Обработчик удаления файла
  const handleRemoveFile = useCallback(async (indexToRemove) => {
    // Удаляем файл из списка
    const newFiles = removeFile(indexToRemove);

    // Удаляем файл из списка загруженных файлов
    const newUploadedFiles = removeUploadedFile(indexToRemove);

    // Вызываем onUpload с обновленным списком загруженных файлов
    if (onUpload && newUploadedFiles) {
      onUpload(multiple ? newUploadedFiles : newUploadedFiles[0] || null);
    }

    // Вызываем onChange с обновленным списком файлов
    if (onChange) {
      onChange(multiple ? newFiles : newFiles[0] || null);
    }
  }, [multiple, onChange, onUpload, removeFile, removeUploadedFile]);

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Состояния
    files,
    isUploading,
    uploadedFiles,
    error,

    // Обработчики
    handleFileChange,
    handleRemoveFile,
    clearError,
    resetFiles,

    // Вспомогательные свойства
    hasFiles: files.length > 0,
  };
};
