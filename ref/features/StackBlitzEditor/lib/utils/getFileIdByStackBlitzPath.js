import { ID_TO_PATH_MAP } from '../../model';

// Возвращает ID файла по пути в StackBlitz
export const getFileIdByStackBlitzPath = (stackBlitzPath, filesMap) => {
  // Используем маппинг из общих констант

  // Проверяем по прямому маппингу
  if (ID_TO_PATH_MAP[stackBlitzPath]) {
    return ID_TO_PATH_MAP[stackBlitzPath];
  }

  // Ищем по содержимому файлов для других файлов
  for (const [id, file] of Object.entries(filesMap)) {
    if (file.path === stackBlitzPath) {
      return id;
    }
  }

  // Если не нашли соответствие, возвращаем путь
  return stackBlitzPath;
};
