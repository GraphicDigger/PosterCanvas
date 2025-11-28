import { ID_TO_PATH_MAP } from '../../model';

// Получает path по fileId в StackBlitz
export const getStackBlitzPathByFileId = (fileId) => {
  return ID_TO_PATH_MAP[fileId] || null;
};
