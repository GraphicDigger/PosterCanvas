import { useState, useCallback, useEffect } from 'react';

export const useFileUploader = ({
  uploadUrl,
  maxFileSize,
  setError,
  multiple = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Очистка URL-объектов при размонтировании компонента
  useEffect(() => {
    return () => {
      // Освобождаем ресурсы URL.createObjectURL
      uploadedFiles.forEach(file => {
        if (file && file.url && file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [uploadedFiles]);

  // Функция локальной "загрузки" одного файла (создает локальную ссылку)
  const uploadFile = useCallback(async (file) => {
    try {
      // Проверка размера файла
      if (file.size > maxFileSize) {
        throw new Error(`Размер файла превышает ${maxFileSize / (1024 * 1024)} МБ`);
      }

      // Имитация задержки загрузки
      await new Promise(resolve => setTimeout(resolve, 500));

      // Создаем локальную ссылку на файл
      const localUrl = URL.createObjectURL(file);

      // Возвращаем информацию о "загруженном" файле
      return {
        originalFile: file,
        url: localUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        localFile: true, // Флаг для определения, что файл хранится локально
      };
    } catch (err) {
      setError?.(err.message);
      return null;
    }
  }, [maxFileSize, setError]);

  // Функция "загрузки" нескольких файлов
  const uploadFiles = useCallback(async (files) => {
    setIsUploading(true);
    setError?.(null);

    try {
      // Эмулируем загрузку файлов
      const uploadPromises = files.map(uploadFile);
      const uploaded = await Promise.all(uploadPromises);

      // Фильтруем успешно загруженные файлы
      const successfulUploads = uploaded.filter(file => file !== null);

      // Обновляем список загруженных файлов
      const newUploadedFiles = multiple
        ? [...uploadedFiles, ...successfulUploads]
        : successfulUploads;

      setUploadedFiles(newUploadedFiles);

      return newUploadedFiles;
    } catch (err) {
      setError?.(err.message);
      return [];
    } finally {
      setIsUploading(false);
    }
  }, [uploadFile, uploadedFiles, multiple, setError, uploadUrl]);

  // Удаление загруженного файла по индексу
  const removeUploadedFile = useCallback((indexToRemove) => {
    if (uploadedFiles.length === 0) {return null;}

    // Освобождаем URL для удаляемого файла
    const fileToRemove = uploadedFiles[indexToRemove];
    if (fileToRemove && fileToRemove.url && fileToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.url);
    }

    const newUploadedFiles = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(newUploadedFiles);
    return newUploadedFiles;
  }, [uploadedFiles]);

  // Сброс загруженных файлов
  const resetUploadedFiles = useCallback(() => {
    // Освобождаем все URL-объекты
    uploadedFiles.forEach(file => {
      if (file && file.url && file.url.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
      }
    });

    setUploadedFiles([]);
    return [];
  }, [uploadedFiles]);

  return {
    isUploading,
    uploadedFiles,
    uploadFile,
    uploadFiles,
    removeUploadedFile,
    resetUploadedFiles,
  };
};
