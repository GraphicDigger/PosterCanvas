import { getFileIdByStackBlitzPath } from '../utils/getFileIdByStackBlitzPath';

export const syncStackBlitzToStore = (
  vm,
  files,
  dispatch,
  updateFile,
) => {
  return setInterval(async () => {
    try {
      if (!vm) {return;}

      // Получаем список всех файлов в проекте
      const vmFiles = await vm.getFsSnapshot();

      if (vmFiles) {
        console.log('[StackBlitz] Got file snapshot:', Object.keys(vmFiles));

        // Проверяем изменения в файлах
        for (const [path, content] of Object.entries(vmFiles)) {
          // Находим ID файла в нашей системе
          const fileId = getFileIdByStackBlitzPath(path, files);

          if (fileId && files[fileId] && files[fileId].content !== content) {
            // Обновляем файл в Redux только если содержимое изменилось
            dispatch(updateFile({ path: fileId, content }));
            console.log(`Файл ${fileId} синхронизирован из StackBlitz в Redux`);
          }
        }
      }
    } catch (err) {
      console.error('[StackBlitz] Error checking file changes:', err);
    }
  }, 5000); // Проверяем каждые 5 секунд
};
